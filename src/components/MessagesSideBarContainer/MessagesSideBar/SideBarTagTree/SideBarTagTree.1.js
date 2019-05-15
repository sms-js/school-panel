import React, { useState, useEffect } from 'react';
import { Tree, Input } from 'antd';
import {
	generateTreeNodesFunction,
	manipulateTreeNodeItems,
	generateTagMapFunction,
	getTagPath,
	getTagMap,
	generateTreeData
} from '../../../../screens/private/Messages/helpFunctions';
import { TagRClickMenu, TagRClickWMenu, tagsArrayFromAPI } from './index';
import moment from 'moment';
import NewTagNameInputField from './RightClickMenu/NewTagNameInputCmp';
//import moment from 'moment';
//import { Droppable } from '../DnD/Droppable';

const { TreeNode } = Tree;

const SideBarTagTree = ({ sendDroppedDataToMessages }) => {
	let initialGdata = generateTreeData(tagsArrayFromAPI);
	// const [ { tagsArray, expandedKeys, mouseCoordinates }, dispatch ] = useReducer(reducer);
	// dispatch('setTags', tagsArrayFromAPI);
	const [tagsArray, setTagsArray] = useState(tagsArrayFromAPI);
	const [gData, setGdata] = useState(initialGdata);
	const [expandedKeys, setExpandedKeys] = useState(['5ccc37df5ad6ca045cb41f79']);
	const [showModal, setShowModal] = useState(false);
	const [showNewTagNameInputField, setShowNewTagNameInputField] = useState(false);
	const [mouseCoordinates, setMouseCoordinates] = useState({});
	const [actualSelectedTag, setActualSelectedTag] = useState({});

	let tagMap = getTagMap(gData);
	//useEffect(() => {}, [ gData ]);

	useEffect(() => {
		let newGData = generateTreeData(tagsArray);
		setGdata(prevState => [...newGData]);
	}, [tagsArray]);

	const onDragEnter = info => {
		console.log('on Drag Enter= onDragOver');
		console.log(info);
		// expandedKeys
		// this.setState({
		//   expandedKeys: info.expandedKeys,
		// });
	};

	const onSelect = e => {
		//e equals to the selected treeNode key
		console.log('itemSelected, key = ', e[0]);
		const selectedTagPath = getTagPath(e[0], tagMap);
		console.log(selectedTagPath);
		//sendDroppedDataToMessages(e);//sends id selected TreeNode to Messages Component
	};

	const onDrop = info => {
		//console.log(info);
		//sendDroppedDataToMessages(info); //sends dropped element and its (new) parent node to Messages Component
		// console.log('onDrop - event = ', info.event);
		// console.log('onDrop - node = ', info.node);
		// console.log('onDrop - dragNode = ', info.dragNode);
		// console.log('onDrop - draggedNodeKeys = ', info.dragNodesKeys); //["id","id","idww"]
		info.event.preventDefault();
		const transferredData = info.event.dataTransfer.getData('transfer');
		console.log('transferred data = ', transferredData);
		const originContainerName = info.event.dataTransfer.getData('transfer2');
		const destinationContainerName = info.node.props.id;

		/* 		
		if (originContainerName != '') {
			manipulateDraggedAndDroppedElement(transferredData, originContainerName, destinationContainerName
		}	
		const elementToRemoveFromParentNode = document.getElementById(transferredData);
		let parentNode = document.getElementById(transferredData).parentNode;
 		*/
		/*
		We can drag and drop 2 kind of elements:
		1) Drag a message-element and drop it into a nodeTree element.
		2) Drag a nodeTree element and drop it into another nodeTree element. 
		If situation 2) applies, then following if-statement is true and the (antD) code for handling of nodeTree elements applies. Following code (within the if-block) was delivered with the component and is related to the treeNode elements manipulation.
		*/
		if (transferredData == '' || originContainerName == '' || destinationContainerName == '') {
			const treeData = manipulateTreeNodeItems(info, gData);
			// if following line is uncommentend, then the tree items became draggable within each other.
			//setGdata((prevState) => [ ...treeData ]);

			tagMap = getTagMap(gData);

			//generate array of dragged tags and assign the new parentTag
			let updatedTagsArray = tagsArray.map((tag) => {
				// Reassignate dragged tag
				if (info.dragNodesKeys.indexOf(tag.key) >= 0) {
					const newTag = tagMap[tag.key];
					newTag.parentTag = newTag.parent.key;
					newTag.selectable = true;
					delete newTag.parent;
					return newTag;
				}
				// Return unmodified tag
				return tag;
			});
			//===========================================================
			//generate array of dragged tags and assign the new parentTag
			const modifiedTags = info.dragNodesKeys.map(draggedElementKey => {
				const newTag = tagMap[draggedElementKey];
				newTag.parentTag = newTag.parent.key;
				newTag.selectable = true;
				delete newTag.parent;
				return newTag;
			});
			let updatedTagsArray = [...tagsArray];
			modifiedTags.forEach(modifiedTagEl => {
				updatedTagsArray.find((tagsArrayEl, index) => {
					if (tagsArrayEl.key == modifiedTagEl.key) {
						updatedTagsArray[index] = modifiedTagEl;
					}
				});
			});
			//============================================================
			//this triggers a useEffect operation
			setTagsArray([...updatedTagsArray]);
		}
	};

	const rightClickFunction = ({ event, node }) => {
		setMouseCoordinates({ mouseX: event.clientX, mouseY: event.clientY });
		getSelectedTagPropsAndSendToRClickMenu(node.props);
		//setShowModal((prevState) => !prevState);
	};

	const getSelectedTagPropsAndSendToRClickMenu = props => {
		const rightClickSelectedTag = tagMap[props.eventKey];
		console.log('selected Tag with Right Click = ', rightClickSelectedTag);
		console.log('tagMap = ', tagMap);
		console.log('selectedTagPath = ', getTagPath(rightClickSelectedTag.key, tagMap));
		setActualSelectedTag(rightClickSelectedTag);
	};

	const getNewSelectedTagStateFromModal = newState => {
		delete newState.parent;
		const selectedTagIndex = tagsArray.findIndex(el => el.key == newState.key);
		const newTagsArray = tagsArray;
		const newTag = Object.assign(tagsArray[selectedTagIndex], newState);

		/* depending on users Rights: newTag should API-PATCH
when user changes the tag props using the RCM (status,dates,title,codeword) and clicks on 'ok' the modified tag (named here as newTag) should PATCH the old tag. This step will be added to a later point. 
*/
		newTagsArray[selectedTagIndex] = newTag;
		setTagsArray(newTagsArray);
	};

	/*
	generateNewTag gets called when user click generate New Tag in the RCM. It adds a child tag to the selected tag.

	Some considerations: 
	1) User clicks on create new tag.
	2) New (child) tag is created with the title 'new tag' in edition mode. 
	3) This new tag could be renamed at that point. Further props edition can be executed with the RCM option edit properties.
	4) When should this tag be sent to API? After definition of new name? In that case we would receive a complete tag tree again? Or should a provisory object be client side created and silently be sent to API?

	*/
	const generateNewTag = title => {
		//newKey will be replaced with some id generator
		const key = getTagPath(actualSelectedTag.key, tagMap).reverse()[0] + 'x';
		const newTag = {
			key,
			title,
			parentTag: getTagPath(actualSelectedTag.key, tagMap).reverse()[0],
			startDate: moment().format('YYYY-MM-DD-THH:mm:ss'),
			endDate: '',
			autoAssignTagToIncomingMessage: false,
			status: true,
			selectable: true,
			newTagStatus: true
		}; //newTagStatus will be used to identify the tags that should be sent to API and dessen Title should be editable.
		let newTagsArray = tagsArray;

		const indexOfParentTag = tagsArray.findIndex(el => el.key === newTag.parentTag);

		//tag will be created directly under its parentTag.
		//modification of tagsArray will reRender cmp and "new tag" will be shown in the tagTree.
		newTagsArray.splice(indexOfParentTag, 0, newTag);
		setTagsArray([...newTagsArray]);
	};

	const getSelectedOptionFromRCM = selectedOption => {
		//if (selectedOption.key == 'createNewTag') generateNewTag();
		if (selectedOption.key == 'createNewTag') setShowNewTagNameInputField(true);
		if (selectedOption.key == 'editTagProperties') {
			setShowModal(prevState => !prevState);
		}
	};

	const getDataFromChildCmp = newTagTitel => {
		console.log('getDataFromChildCmp/ newTagTitel = ', newTagTitel);
		setShowNewTagNameInputField(false);
		if (newTagTitel != '') generateNewTag(newTagTitel);
	};

	return (
		<div>
			<TagRClickWMenu sendSelectedOptionToParentCmp={getSelectedOptionFromRCM}>
				<div>
					<Tree
						className="draggable-tree"
						defaultExpandedKeys={expandedKeys}
						draggable
						blockNode
						onDragEnter={onDragEnter}
						onDrop={onDrop}
						collapsed
						onSelect={onSelect}
						onRightClick={rightClickFunction}
						//treeData={gData}
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
