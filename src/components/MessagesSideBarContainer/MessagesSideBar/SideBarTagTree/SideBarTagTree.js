import React, { useState, useEffect } from 'react';
import { Tree } from 'antd';
import { tagsLib } from '../../../../lib/models';
import {
	generateTreeNodesFunction,
	getTagPath,
	getTagMap,
	generateTreeData
} from '../../../../screens/private/Messages/helpFunctions';
import { TagRClickMenu, TagRClickWMenu, testDataFromAPI } from './index';
import moment from 'moment';
import NewTagNameInputField from './RightClickMenu/NewTagNameInputCmp';

const SideBarTagTree = ({ sendDataToMessagesCmp }) => {
	const [tagsArray, setTagsArray] = useState([]);
	const [recycleBinTagsArray, setRecycleBinTagsTagsArray] = useState([]);
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
		loadTags().then(res => {
			setTagsArray(
				res
					.map(el => {
						el.key = el.title == 'Main' ? 'mainTagKey' : el._id;
						return el;
					})
					.filter(el => el.title != 'Recycle Bin')
			);
			setRecycleBinTagsTagsArray(
				res
					.filter(el => el.title == 'Recycle Bin' || el.parentTag == 'recycleBin')
					.map(el => {
						el.key = el.title == 'Recycle Bin' ? 'recycleBin' : el._id;
						return el;
					})
			);
		});
	}, []);

	useEffect(() => {
		//const newTagsTreeData = generateTreeData(tagsArray);
		//setTagsTreeData([...newTagsTreeData]);
		setRecycleBinTreeData(generateTreeData(recycleBinTagsArray));
		//console.log('useEffect/ tagsArray changed / new tagMap = ', getTagMap(tagsTreeDataStructure));
		//console.log('useEffect/ tagsArray changed /new tagsAray = ', tagsArray);
	}, [recycleBinTagsArray]);
	useEffect(() => {
		//const newTagsTreeData = generateTreeData(tagsArray);
		//setTagsTreeData([...newTagsTreeData]);
		setTagsTreeData(generateTreeData(tagsArray));
		//console.log('useEffect/ tagsArray changed / new tagMap = ', getTagMap(tagsTreeDataStructure));
		//console.log('useEffect/ tagsArray changed /new tagsAray = ', tagsArray);
	}, [tagsArray]);

	//test Use Effect can be deleted
	//useEffect(()=>{console.log('UE/ actualSelectedTag = ',actualSelectedTag)},[actualSelectedTag])

	const onSelect = e => {
		//itemSelected key = e[0]
		//console.log('onSelect / e[0]= ', e[0]);
		//@todo: check this double click situation on same item with PG.
		if (e.length == 0) return;
		//e equals to the selected treeNode key
		const params = {
			destinationTag: e[0],
			draggedMessageId: undefined
		};
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
		if (draggedMessageId != '') {
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
		if (draggedMessageId == '' && destinationTag != '' && destinationTag != draggedNode) {
			const tagMap = getTagMap(tagsTreeDataStructure);
			let updatedTagsArray = tagsArray.map(tag => {
				// Reassignate dragged tag
				if (tag.key == draggedNode) {
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
			setTagsArray([...updatedTagsArray]);
		}
	};

	//getting selected tag props and sending them to the RCM
	//tagMap[node.props.eventKey] is the right click selected tag
	const rightClickFunction = ({ event, node }) => {
		console.log('rightClick / node.props =  ', node.props);
		console.log('tagsArray = ', tagsArray);
		const tagMap = getTagMap(tagsTreeDataStructure);
		console.log('tagsTreeDataStructure = ', tagsTreeDataStructure);
		console.log('tagMap = ', tagMap);
		const recycleBinMap = getTagMap(recycleBinTreeDataStructure);
		console.log('recycleBinTreeDataStructure = ', recycleBinTreeDataStructure);
		console.log('recycleBinMap = ', recycleBinMap);
		setMouseCoordinates({ mouseX: event.clientX, mouseY: event.clientY });
		setActualSelectedTag(tagMap[node.props.eventKey] || recycleBinMap[node.props.eventKey]);
		setRecycleBinTagIsSelected(recycleBinMap[node.props.eventKey] != undefined);
		console.log('actualSelectedTag = ', actualSelectedTag);
	};

	/* depending on users Rights: newTag should API-PATCH
		when user changes the tag props using the RCM (status,dates,title,codeword) and clicks on 'ok' the modified tag (named here as newTag) should PATCH the old tag. This step will be added to a later point.*/
	const getNewSelectedTagStateFromModal = newState => {
		delete newState.parent;
		const selectedTagIndex = tagsArray.findIndex(el => el.key == newState.key);
		const newTagsArray = tagsArray;
		const newTag = Object.assign(tagsArray[selectedTagIndex], newState);
		newTagsArray[selectedTagIndex] = newTag;
		setTagsArray(newTagsArray);
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
		let newTagsArray = tagsArray;
		const indexOfParentTag = tagsArray.findIndex(el => el.key == newTag.parentTag);

		//GET new created tag from server: If following line is commented, the tag tree wont update after the new tag is posted.
		//updateTestArray(prevState => !prevState);//this triggers API GET request to fetch all tags from server

		/*
		tag will be created directly under its parentTag.
		modification of tagsArray will reRender cmp and "new tag" will be shown in the tagTree.
		In this case we don't GET the new created tag from API. We just render the object.
		By commenting the setTagsArray... line, the new tag wont be rendered into DOM and user should reload the browser to see the new created tag.
		 */
		newTagsArray.splice(indexOfParentTag, 0, newTag);
		setTagsArray([...newTagsArray]);
	};

	//=====================================================================
	/* following function generates an array with tags keys. When user deletes a specific tag, this function delivers the key  of the selected tag (the tag selected by user to be deleted) and all its children and children's childrens. Input element (focusedTag) should be an object like "actualSelectedTag" {...,key:'sdfasdf',children:[{},{},{key:'...',children:[...]}]} */
	let affectedTagsArray = [];
	const getTagKeyAndItsChildren = focusedTag => {
		affectedTagsArray.push(focusedTag.key);
		focusedTag.children.forEach(el => {
			affectedTagsArray.push(el.key);
			el.children.forEach(childEl => getTagKeyAndItsChildren(childEl));
		});
	};
	//=====================================================================

	const recoverSelectedTag = () => {
		let updatedTag = {
			...actualSelectedTag,
			parentTag: 'mainTagKey',
			selectable: true,
			_id: actualSelectedTag.key,
			tagSentToRecycleBin: false
		};
		delete updatedTag.children;
		delete updatedTag.parent;
		console.log('recoverSelectedTag / updatedTag = ', updatedTag);
		tagsLib.updateTag(updatedTag); //PATCH: updates the modified tag
		//update tagsArray
		const newTagsArray = tagsArray.concat(updatedTag);
		//delete tag from recycleBinTagsArray
		const newRecycleBinTagsArray = recycleBinTagsArray.filter(el => el.key != updatedTag.key);
		//set recycleBinTagsArray
		setRecycleBinTagsTagsArray(newRecycleBinTagsArray);
		//set tagsArray
		setTagsArray(newTagsArray);
	};

	const assignRecycleBinAsParent = () => {
		//getTagKeyAndItsChildren(actualSelectedTag);
		let updatedTag = {
			...actualSelectedTag,
			parentTag: 'recycleBin',
			selectable: true,
			_id: actualSelectedTag.key,
			tagSentToRecycleBin: true
		};
		delete updatedTag.children;
		delete updatedTag.parent;
		//PATCH: updates the modified tag
		tagsLib.updateTag(updatedTag);
		//delete tag from tagsArray
		const newTagsArray = tagsArray.filter(el => el.key != updatedTag.key);
		setTagsArray(newTagsArray);
		//const newRecycleBinArray = recycleBinTagsArray.concat(newRecycleBinElements);
		const newRecycleBinArray = recycleBinTagsArray.concat(updatedTag);
		setRecycleBinTagsTagsArray(newRecycleBinArray);
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
		const newRecycleBinTagsArray = recycleBinTagsArray.filter(el => el.key != updatedTag.key);
		//const newRecycleBinArray = recycleBinTagsArray.concat(newRecycleBinElements);
		setRecycleBinTagsTagsArray(newRecycleBinTagsArray);
	};

	const getSelectedOptionFromRCM = selectedOption => {
		switch (selectedOption.key) {
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
						//autoExpandParent={true}
						//expandedKeys={['5ce2aff7154a1d2c93abd7d3']}
						//defaultExpandParent={true}
						//defaultExpandAll={true}
						//defaultExpandedKeys={['5ce2aff7154a1d2c93abd7d3']}
						//defaultSelectedKeys={['5ce2aff7154a1d2c93abd7d3']}
						//blockNode
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
					<TagRClickMenu
						rightClickSelectedTag={actualSelectedTag}
						sendNewSelectedTagStateToTagTree={getNewSelectedTagStateFromModal}
						mouseRightClickPosition={mouseCoordinates}
						resetShowModal={() => setShowModal(false)}
					/>
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
							//onDragStart={({ node }) => setDraggedNode(node.props.eventKey)}
						>
							{generateTreeNodesFunction(recycleBinTreeDataStructure)}
						</Tree>
					</div>
				</TagRClickWMenu>
			</div>
		</div>
	);
};

export default SideBarTagTree;
