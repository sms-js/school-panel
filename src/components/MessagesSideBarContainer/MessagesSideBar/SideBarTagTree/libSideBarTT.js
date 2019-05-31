import React, { useReducer } from 'react';
import { tagsLib } from '../../../../lib/models';
import { Tree } from 'antd';
const { TreeNode } = Tree;

/**
 * Recursive function asdfdsfdsd
 *
 * @param {array} treeData [{children: [{key, title, disabled, selectable}]
 *
 * @returns {object} antd structure needed for tree render
 */
function generateTreeNodesFunction(treeData) {
	const resultTest = treeData.map(item => {
		if (item.children && item.children.length) {
			return (
				<TreeNode
					key={item.key}
					title={item.title}
					disabled={item.disabled || false}
					selectable={item.selectable || true}
					id={item.id}
				>
					{generateTreeNodesFunction(item.children)}
				</TreeNode>
			);
		}
		return (
			<TreeNode
				key={item.key}
				title={item.title}
				disabled={item.disabled || false}
				selectable={item.selectable || false}
				id={item.id}
			/>
		);
	});
	return resultTest;
}

/**
 *
 * @param {*} treeData
 * @param {*} key
 * @param {*} callback
 */
const loop = (treeData, key, callback) => {
	treeData.forEach((item, index, arr) => {
		if (item.key === key) return callback(item, index, arr);
		if (item.children) return loop(item.children, key, callback);
	});
};

function manipulateTreeNodeItems(info, gData) {
	//= Following block corresponds to original antD code to handle dragged treeNode elements====
	const dropKey = info.node.props.eventKey;
	const dragKey = info.dragNode.props.eventKey;
	const dropPos = info.node.props.pos.split('-');
	const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
	/** */

	const treeData = [...gData];

	// Find dragObject
	let dragObj;
	loop(treeData, dragKey, (item, index, arr) => {
		arr.splice(index, 1);
		dragObj = item;
	});
	// paso tal cosa asdsad
	if (!info.dropToGap) {
		// Drop on the content
		loop(treeData, dropKey, item => {
			item.children = item.children || [];
			// where to insert
			item.children.push(dragObj);
		});
		return treeData;
	}
	// asdasd asd asd
	if (
		(info.node.props.children || []).length > 0 && // Has children
		info.node.props.expanded && // Is expanded
		dropPosition === 1 // On the bottom gap
	) {
		loop(treeData, dropKey, item => {
			item.children = item.children || [];
			// where to insert
			item.children.unshift(dragObj);
		});
		return treeData;
	}
	// asdasdasd
	let ar;
	let i;
	loop(treeData, dropKey, (item, index, arr) => {
		ar = arr;
		i = index;
	});
	if (dropPosition === -1) {
		ar.splice(i, 0, dragObj);
	} else {
		ar.splice(i + 1, 0, dragObj);
	}

	return treeData;

	//==== End of antD code======================================================================
}

let tagMap = {};
function generateTagMapFunction(list, parent, key, title, status, startDate, endDate, codeWord, _id, formerParentTag) {
	return (list || []).map(
		({
			children,
			key,
			title,
			status,
			startDate,
			endDate,
			codeWord,
			_id,
			formerParentTag,
			autoAssignTagToIncomingMessage
		}) => {
			const node = (tagMap[key] = {
				parent,
				key,
				_id,
				title,
				status,
				startDate,
				endDate,
				codeWord,
				formerParentTag,
				autoAssignTagToIncomingMessage
			});
			node.children = generateTagMapFunction(
				children,
				node,
				_id,
				key,
				title,
				status,
				startDate,
				endDate,
				codeWord,
				formerParentTag,
				autoAssignTagToIncomingMessage
			);
			return node;
		}
	);
}

const getTagMap = (list, parent) => {
	tagMap = {};
	generateTagMapFunction(list, parent);
	return tagMap;
};

const getTagPath = (key, tagMap) => {
	const path = [];
	let current = tagMap[key];
	while (current) {
		path.unshift(current.key);
		current = current.parent;
	}
	return path;
};

//===========================================================================

const generateTreeData = (tagsFromAPI, tagsWithoutParents = [], firstLoop = true) => {
	//find tags without parents
	tagsWithoutParents = firstLoop === true ? tagsFromAPI.filter(el => el.parentTag === undefined) : tagsWithoutParents;
	tagsWithoutParents.forEach((noParentElement, index) => {
		tagsWithoutParents[index]['children'] = tagsFromAPI.filter(el => el.parentTag === noParentElement.key);
		generateTreeData(tagsFromAPI, tagsWithoutParents[index]['children'], false);
	});
	return tagsWithoutParents;
};

//==========================================================================
const fetchTags = async () => {
	const res = await tagsLib.getTags();
	const tags = res
		.map(el => {
			el.key = el.title === 'Main' ? 'mainTagKey' : el._id;
			return el;
		})
		.filter(el => el.title !== 'Recycle Bin');

	const recycleBinTags = res
		.filter(el => el.title === 'Recycle Bin' || el.parentTag === 'recycleBin')
		.map(el => {
			el.key = el.title === 'Recycle Bin' ? 'recycleBin' : el._id;
			return el;
		});
	const tagsTreeDataStructure = generateTreeData(tags);
	const recycleBinTreeDataStructure = generateTreeData(recycleBinTags);
	const dispatchTags = { type: 'setTags', payLoad: tags };
	const dispatchRecycleBinTags = { type: 'setRecycleBinTags', payLoad: recycleBinTags };
	const dispatchTagsTreeDataStructure = { type: 'setTagsTreeData', payLoad: tagsTreeDataStructure };
	const dispatchRecycleBinTreeDataStructure = { type: 'setRecycleBinTreeData', payLoad: recycleBinTreeDataStructure };
	return { dispatchTags, dispatchRecycleBinTags, dispatchTagsTreeDataStructure, dispatchRecycleBinTreeDataStructure };
};

const recoverSelectedTagLib = (actualSelectedTag, tags, recycleBinTags) => {
	let updatedTag = {
		...actualSelectedTag,
		parentTag: actualSelectedTag.formerParentTag,
		selectable: true,
		_id: actualSelectedTag.key,
		tagSentToRecycleBin: false
	};
	delete updatedTag.children;
	delete updatedTag.parent;

	//issue with the following code is that we have to "clean" all affected tags when we send one to the bim. For now we will hardcode to parent tag. Every recovered tag will be displayed under main

	//check if parentTag is available in the tags
	//updatedTag.parentTag = tags.findIndex(el => el._id === updatedTag.parentTag) > -1 ? updatedTag.parentTag : 'mainTagKey';

	updatedTag.parentTag = 'mainTagKey';

	tagsLib.updateTag(updatedTag); //PATCH: updates the modified tag
	//update tags
	const newTags = tags.concat(updatedTag);
	//delete tag from recycleBinTags
	const newRecycleBinTags = recycleBinTags.filter(el => el.key !== updatedTag.key);
	//set recycleBinTags
	const dispatchRecycleBinTags = { type: 'setRecycleBinTags', payLoad: newRecycleBinTags };
	const dispatchRecycleBinTreeDataStructure = {
		type: 'setRecycleBinTreeData',
		payLoad: generateTreeData(newRecycleBinTags)
	};
	//set tags
	const dispatchTags = { type: 'setTags', payLoad: newTags };
	//renders DOM
	const dispatchTagsTreeDataStructure = { type: 'setTagsTreeData', payLoad: generateTreeData(newTags) };

	return { dispatchTags, dispatchRecycleBinTags, dispatchTagsTreeDataStructure, dispatchRecycleBinTreeDataStructure };
};

const assignRecycleBinAsParentLib = (actualSelectedTag, tags, recycleBinTags) => {
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
	tagsLib.updateTag(updatedTag);
	const newTags = tags.filter(el => el.key !== updatedTag.key);
	const newRecycleBinTags = recycleBinTags.concat(updatedTag);
	const dispatchTags = { type: 'setTags', payLoad: newTags };
	const dispatchTagsTreeDataStructure = { type: 'setTagsTreeData', payLoad: generateTreeData(newTags) };
	const dispatchRecycleBinTags = { type: 'setRecycleBinTags', payLoad: newRecycleBinTags };
	const dispatchRecycleBinTreeDataStructure = {
		type: 'setRecycleBinTreeData',
		payLoad: generateTreeData(newRecycleBinTags)
	};
	return { dispatchTags, dispatchRecycleBinTags, dispatchTagsTreeDataStructure, dispatchRecycleBinTreeDataStructure };
};

const removeTagFromReycleBinLib = (actualSelectedTag, recycleBinTags) => {
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
	const newRecycleBinTags = recycleBinTags.filter(el => el.key !== updatedTag.key);
	const dispatchRecycleBinTags = { type: 'setRecycleBinTags', payLoad: newRecycleBinTags };
	const dispatchRecycleBinTreeDataStructure = {
		type: 'setRecycleBinTreeData',
		payLoad: generateTreeData(newRecycleBinTags)
	};
	return { dispatchRecycleBinTags, dispatchRecycleBinTreeDataStructure };
};


const reducerFunction = (state, action) => {
	switch (action.type) {
		case 'setShowModal':
			return { ...state, showModal: !state.showModal };
		case 'setShowNewTagNameInputFieldToTrue':
			return { ...state, showNewTagNameInputField: true };
		case 'setShowNewTagNameInputFieldToFalse':
			return { ...state, showNewTagNameInputField: false };
		case 'setRecycleBinTagIsSelected':
			return { ...state, recycleBinTagIsSelected: action.payLoad };
		case 'setTagsTreeData':
			return { ...state, tagsTreeDataStructure: action.payLoad };
		case 'setMouseCoordinates':
			return { ...state, mouseCoordinates: action.payLoad };
		case 'setActualSelectedTag':
			return { ...state, actualSelectedTag: action.payLoad };
		case 'setDraggedNode':
			return { ...state, draggedNode: action.payLoad };
		case 'setTags':
			return { ...state, tags: action.payLoad };
		case 'setRecycleBinTags':
			return { ...state, recycleBinTags: action.payLoad };
		case 'setRecycleBinTreeData':
			return { ...state, recycleBinTreeDataStructure: action.payLoad };
			// folloing cases belong to the RightClickMenu component: 'setShowModal' case belongs to RightClickMenu and SideBarTagTree component
		case 'closeMenu':
			return { open: false };
		case 'setShowTagDatesRange':
			return { ...state, autoAssignTagToIncomingMessage: action.payLoad }
		case 'setCodeWord':
			return { ...state, codeWord: action.payLoad }
		case 'setRange':
			return {...state,range:action.payLoad}
		default:
			console.log('reducer function - default case - returning state');
			return state;
	}
};

export {
	generateTreeNodesFunction,
	manipulateTreeNodeItems,
	generateTagMapFunction,
	getTagPath,
	getTagMap,
	generateTreeData,
	fetchTags,
	reducerFunction,
	recoverSelectedTagLib,
	assignRecycleBinAsParentLib,
	removeTagFromReycleBinLib
};
