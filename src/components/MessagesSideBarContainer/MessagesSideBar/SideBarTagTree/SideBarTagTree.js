import React, { useState, useEffect } from 'react';
import { Tree } from 'antd';
import { tagsLib } from '../../../../lib/models';
import {
	generateTreeNodesFunction,
	getTagPath,
	getTagMap,
	generateTreeData
} from '../../../../screens/private/Messages/helpFunctions';
import { TagRClickMenu, TagRClickWMenu } from './index';
import moment from 'moment';
import NewTagNameInputField from './elements/NewTagNameInputCmp';
import PropTypes from 'prop-types'

const SideBarTagTree = ({ sendDataToMessagesCmp }) => {
	const [tags, setTags] = useState([]);
	const [recycleBinTags, setRecycleBinTagsTags] = useState([]);
	const [tagsTreeDataStructure, setTagsTreeData] = useState([]);
	const [recycleBinTreeDataStructure, setRecycleBinTreeData] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [showNewTagNameInputField, setShowNewTagNameInputField] = useState(false);
	const [recycleBinTagIsSelected, setRecycleBinTagIsSelected] = useState(false);
	const [mouseCoordinates, setMouseCoordinates] = useState({});
	const [actualSelectedTag, setActualSelectedTag] = useState({});
	const [draggedNode, setDraggedNode] = useState();

	const loadTags = async () => {
		const response = await tagsLib.getTags();
		return response;
	};

	useEffect(() => {
		const initTags = async () => {
			const res = await loadTags();
			setTags(
				res
					.map(el => {
						el.key = el.title === 'Main' ? 'mainTagKey' : el._id;
						return el;
					})
					.filter(el => el.title !== 'Recycle Bin')
			);
			setRecycleBinTagsTags(
				res
					.filter(el => el.title === 'Recycle Bin' || el.parentTag === 'recycleBin')
					.map(el => {
						el.key = el.title === 'Recycle Bin' ? 'recycleBin' : el._id;
						return el;
					})
			);
		};

		initTags();
	}, []);

	useEffect(() => {
		setRecycleBinTreeData(generateTreeData(recycleBinTags));
	}, [recycleBinTags]);

	useEffect(() => {
		setTagsTreeData(generateTreeData(tags));
	}, [tags]);

	const onSelect = e => {
		//@todo: check this double click situation on same item with PG.
		if (e.length === 0) return;
		//e equals to the selected treeNode key
		/*
		const params = {
			destinationTag: e[0],
			draggedMessageId: undefined
		};
		*/
		sendDataToMessagesCmp({
			destinationTag: e[0],
			draggedMessageId: undefined
		});
	};

	const onDrop = info => {
		info.event.preventDefault();
		const draggedMessageId = info.event.dataTransfer.getData('draggedMessageId'); //corresponds to dragged message id
		const destinationTag = info.node.props.eventKey; //corresponds to the destination tag id. Eg.: "5ccc37df5ad6ca045cb41f79"
		// draggedMessageId is not empty when a message is dropped from the MessageTable cmp into a tag element.
		if (draggedMessageId !== '') {
			const params = {
				destinationTag,
				draggedMessageId
			};
			sendDataToMessagesCmp(params);
		}
		/*	
		We can drag and drop 2 kind of elements:
		1) Drag a message-element and drop it into a nodeTree element.
		2) Drag a nodeTree element and drop it into another nodeTree element. 
		If situation 2) applies, then following if-statement is true and the (antD) code for handling of nodeTree elements applies. Following code (within the if-block) was delivered with the component and is related to the treeNode elements manipulation.
	*/
		if (draggedMessageId === '' && destinationTag !== '' && destinationTag !== draggedNode) {
			const tagMap = getTagMap(tagsTreeDataStructure);
			let updatedTags = tags.map(tag => {
				// Reassignate dragged tag
				if (tag.key === draggedNode) {
					const newTag = tagMap[tag.key];
					newTag.parentTag = destinationTag;
					newTag.selectable = true;
					delete newTag.parent;
					tagsLib.updateTag(newTag); //PATCH: updates the modified tag
					return newTag;
				}
				// Return unmodified tag
				return tag;
			});
			//this triggers a useEffect operation and updates the DOM.
			setTags([...updatedTags]);
		}
	};

	//getting selected tag props and sending them to the RCM
	//tagMap[node.props.eventKey] is the right click selected tag
	const rightClickFunction = ({ event, node }) => {
		const tagMap = getTagMap(tagsTreeDataStructure);
		const recycleBinMap = getTagMap(recycleBinTreeDataStructure);
		setMouseCoordinates({ mouseX: event.clientX, mouseY: event.clientY });
		setActualSelectedTag(tagMap[node.props.eventKey] || recycleBinMap[node.props.eventKey]);
		setRecycleBinTagIsSelected(recycleBinMap[node.props.eventKey] !== undefined);
	};

	/* depending on users Rights: updatedTag should API-PATCH
		when user changes the tag props using the RCM (status,dates,title,codeword) and clicks on 'ok' the modified tag (named here as newTag) should PATCH the old tag. This step will be added to a later point.*/
	const getNewSelectedTagStateFromModal = params => {
		//when user press on "confirm" the modal closes and we want to set back its state to false (because if not, user has to click twice on edit tag props, to open the modal).
		setShowModal(false);
		let newState = { ...actualSelectedTag, ...params };
		delete newState.parent;
		const selectedTagIndex = tags.findIndex(el => el.key === newState.key);
		const newTags = tags;
		const newTag = Object.assign(tags[selectedTagIndex], newState);
		tagsLib.updateTag(newTag); //PATCH: updates the modified tag
		newTags[selectedTagIndex] = newTag;
		setTags(newTags);
	};

	/*
	generateNewTag gets called when user click generate New Tag in the RCM. It adds a child tag to the selected tag.
	Some considerations: 
	1) User clicks on create new tag.
	2) This new tag could be renamed at that point. Further props edition can be executed with the RCM option edit properties.
	3) After a tag creation or a tag edition, an API request gets sent and the tag object is modified on the DB.
	*/
	const generateNewTag = async newTagTitle => {
		const tagMap = getTagMap(tagsTreeDataStructure);
		/* 
		@todo: tag edition handling should trigger an API request.
		 */
		let newTag = {
			title: newTagTitle,
			parentTag: getTagPath(actualSelectedTag.key, tagMap).reverse()[0],
			startDate: moment(),
			autoAssignTagToIncomingMessage: false,
			status: true,
			selectable: true
		};

		//POST new tag
		const response = await tagsLib.postTag(newTag);
		newTag.key = response._id;
		let newTags = tags;
		const indexOfParentTag = tags.findIndex(el => el.key === newTag.parentTag);

		//GET new created tag from server: If following line is commented, the tag tree wont update after the new tag is posted.
		//updateTestArray(prevState => !prevState);//this triggers API GET request to fetch all tags from server

		/*
		tag will be created directly under its parentTag.
		modification of tags will reRender cmp and "new tag" will be shown in the tagTree.
		In this case we don't GET the new created tag from API. We just render the object.
		By commenting the setTags... line, the new tag wont be rendered into DOM and user should reload the browser to see the new created tag.
		 */
		newTags.splice(indexOfParentTag, 0, newTag);
		setTags([...newTags]);
	};

	//=====================================================================
	/* following function generates an array with tags keys. When user deletes a specific tag, this function delivers the key  of the selected tag (the tag selected by user to be deleted) and all its children and children's childrens. Input element (focusedTag) should be an object like "actualSelectedTag" {...,key:'sdfasdf',children:[{},{},{key:'...',children:[...]}]} */
	//let affectedTags = [];
	/*
	const getTagKeyAndItsChildren = focusedTag => {
		affectedTags.push(focusedTag.key);
		focusedTag.children.forEach(el => {
			affectedTags.push(el.key);
			el.children.forEach(childEl => getTagKeyAndItsChildren(childEl));
		});
	};
	*/
	//=====================================================================

	const recoverSelectedTag = () => {
		let updatedTag = {
			...actualSelectedTag,
			parentTag: actualSelectedTag.formerParentTag,
			selectable: true,
			_id: actualSelectedTag.key,
			tagSentToRecycleBin: false
		};
		delete updatedTag.children;
		delete updatedTag.parent;
		//issue with the following code is that we have to "clean" all affected tags when we send one to the bim.
		//check if parentTag is available in the tags
		//updatedTag.parentTag = tags.findIndex(el => el._id === updatedTag.parentTag) > -1 ? updatedTag.parentTag : 'mainTagKey';

		//for now we will hardcode to parent tag. Every recovered tag will be displayed under main
		updatedTag.parentTag = 'mainTagKey';

		tagsLib.updateTag(updatedTag); //PATCH: updates the modified tag
		//update tags
		const newTags = tags.concat(updatedTag);
		//delete tag from recycleBinTags
		const newRecycleBinTags = recycleBinTags.filter(el => el.key !== updatedTag.key);
		//set recycleBinTags
		setRecycleBinTagsTags(newRecycleBinTags);
		//set tags
		setTags(newTags);
	};

	const assignRecycleBinAsParent = () => {
		//getTagKeyAndItsChildren(actualSelectedTag);
		let updatedTag = {
			...actualSelectedTag,
			formerParentTag: actualSelectedTag.parent.key,
			parentTag: 'recycleBin',
			selectable: true,
			_id: actualSelectedTag.key,
			tagSentToRecycleBin: true
		};
		delete updatedTag.children;
		delete updatedTag.parent;
		//PATCH: updates the modified tag
		tagsLib.updateTag(updatedTag);
		//delete tag from tags
		const newTags = tags.filter(el => el.key !== updatedTag.key);
		setTags(newTags);
		//const newRecycleBinArray = recycleBinTags.concat(newRecycleBinElements);
		const newRecycleBinArray = recycleBinTags.concat(updatedTag);
		setRecycleBinTagsTags(newRecycleBinArray);
	};

	const setTagStatusToFalse = () => {
		//getTagKeyAndItsChildren(actualSelectedTag);
		let updatedTag = {
			...actualSelectedTag,
			parentTag: 'recycleBin',
			selectable: true,
			_id: actualSelectedTag.key,
			tagSentToRecycleBin: true
		};
		//wehn tag status is false, it wont be downloaded from server
		updatedTag.status = false;
		delete updatedTag.children;
		delete updatedTag.parent;
		//PATCH: updates the modified tag
		tagsLib.updateTag(updatedTag);
		//delete tag from recycleBinArray
		const newRecycleBinTags = recycleBinTags.filter(el => el.key !== updatedTag.key);
		setRecycleBinTagsTags(newRecycleBinTags);
	};

	const getSelectedOptionFromRCM = event => {
		switch (event) {
			case 'createNewTag':
				setShowNewTagNameInputField(true);
				break;
			case 'editTagProperties':
				setShowModal(prevState => !prevState);
				break;
			case 'sendTagToBim':
				assignRecycleBinAsParent();
				break;
			case 'recoverTag':
				recoverSelectedTag();
				break;
			case 'setTagStatusToFalse':
				setTagStatusToFalse();
				break;
			default:
				console.log('switch default case');
		}
	};

	const getDataFromChildCmp = newTagTitel => {
		setShowNewTagNameInputField(false);
		//we don't create a tag if users enters one or more empty spaces in the titel input field.
		if (newTagTitel.trim().length > 0) generateNewTag(newTagTitel);
	};

	return (
		<div>
			<TagRClickWMenu
				sendSelectedOptionToParentCmp={getSelectedOptionFromRCM}
				actualSelectedTagTitel={actualSelectedTag.title}
			>
				<div>
					<Tree
						className="draggable-tree"
						draggable
						onDrop={onDrop}
						onSelect={onSelect}
						onRightClick={rightClickFunction}
						onDragStart={({ node }) => setDraggedNode(node.props.eventKey)}
					>
						{generateTreeNodesFunction(tagsTreeDataStructure)}
					</Tree>
				</div>
			</TagRClickWMenu>
			<div>
				{showNewTagNameInputField ? (
					<NewTagNameInputField mouseRightClickPosition={mouseCoordinates} sendDataToParentCmp={getDataFromChildCmp} />
				) : null}
			</div>
			<div>
				{showModal ? (
					<div>
					<TagRClickMenu
						showModal={showModal}
						actualSelectedTag={actualSelectedTag}
						sendNewSelectedTagStateToTagTree={getNewSelectedTagStateFromModal}
						mouseRightClickPosition={mouseCoordinates}
						resetShowModal={() => setShowModal(false)}
						/>
						</div>
				) : null}
			</div>
			<div>
				<TagRClickWMenu
					recycleBinTagIsSelected={recycleBinTagIsSelected}
					actualSelectedTagTitel={actualSelectedTag.title}
					sendSelectedOptionToParentCmp={getSelectedOptionFromRCM}
				>
					<div>
						<Tree
							className="draggable-tree"
							draggable={false}
							onDrop={onDrop}
							onSelect={onSelect}
							onRightClick={rightClickFunction}
						>
							{generateTreeNodesFunction(recycleBinTreeDataStructure)}
						</Tree>
					</div>
				</TagRClickWMenu>
			</div>
		</div>
	);
};

SideBarTagTree.propTypes = {
	sendDataToMessagesCmp: PropTypes.func.isRequired,
};

export default SideBarTagTree;
