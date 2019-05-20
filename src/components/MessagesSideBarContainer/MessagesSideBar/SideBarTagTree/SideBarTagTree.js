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
	//const [expandedKeys, setExpandedKeys] = useState(['5ccc37df5ad6ca045cb41f79']);
	const [tagsArray, setTagsArray] = useState([]);
	const [gData, setGdata] = useState(generateTreeData(tagsArray));
	const [showModal, setShowModal] = useState(false);
	const [showNewTagNameInputField, setShowNewTagNameInputField] = useState(false);
	const [mouseCoordinates, setMouseCoordinates] = useState({});
	const [actualSelectedTag, setActualSelectedTag] = useState({});
	const [draggedNode, setDraggedNode] = useState();
	let tagMap = getTagMap(gData);

	const loadTags = async () => {
		const response = await tagsLib.getTags();
		return response;
	};

	useEffect(() => {
		loadTags().then(res => {
			setTagsArray(
				res.map(el => {
					el.key = el.title == 'Main' ? 'mainTagKey' : el._id;
					return el;
				})
			);
		});
	}, []);

	useEffect(() => {
		let newGData = generateTreeData(tagsArray);
		setGdata(prevState => [...newGData]);
		console.log('useEffect/ tagsArray changed / new tagMap = ', getTagMap(gData));
		console.log('useEffect/ tagsArray changed /new tagsAray = ', tagsArray);
	}, [tagsArray]);

	const onSelect = e => {
		console.log('testing tagsArray = ', tagsArray);
		//@todo: check this double click situation on same item with PG.
		if (e.length == 0) return;
		//e equals to the selected treeNode key
		//itemSelected key = e[0]
		const selectedTagPath = getTagPath(e[0], tagMap);
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
		if (draggedMessageId == '' && destinationTag != '' && destinationTag!=draggedNode) {
			tagMap = getTagMap(gData);
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
		setMouseCoordinates({ mouseX: event.clientX, mouseY: event.clientY });
		setActualSelectedTag(tagMap[node.props.eventKey]);
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

	const getSelectedOptionFromRCM = selectedOption => {
		if (selectedOption.key == 'createNewTag') setShowNewTagNameInputField(true);
		if (selectedOption.key == 'editTagProperties') {
			setShowModal(prevState => !prevState);
		}
	};

	const getDataFromChildCmp = newTagTitel => {
		setShowNewTagNameInputField(false);
		//we don't create a tag if users enters one or more empty spaces in the titel input field.
		if (newTagTitel.trim().length > 0) generateNewTag(newTagTitel);
	};

	return (
		<div>
			<TagRClickWMenu sendSelectedOptionToParentCmp={getSelectedOptionFromRCM}>
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
						{generateTreeNodesFunction(gData)}
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
		</div>
	);
};

export default SideBarTagTree;
