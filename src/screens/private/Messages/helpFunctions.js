import React, { useState } from 'react';
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

function generateRecycleBinTreeNodesFunction(treeData) {
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
function generateTagMapFunction(list, parent, key, title, status, startDate, endDate, codeWord, _id) {
	return (list || []).map(({ children, key, title, status, startDate, endDate, codeWord, _id }) => {
		const node = (tagMap[key] = {
			parent,
			key,
			_id,
			title,
			status,
			startDate,
			endDate,
			codeWord
		});
		node.children = generateTagMapFunction(children, node, _id, key, title, status, startDate, endDate, codeWord);
		return node;
	});
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

const generateTreeData = (tagsArrayFromAPI, tagsWithoutParents = [], firstLoop = true) => {
	//find tags without parents
	tagsWithoutParents =
		firstLoop == true ? tagsArrayFromAPI.filter(el => el.parentTag == undefined) : tagsWithoutParents;
	tagsWithoutParents.map((noParentElement, index) => {
		tagsWithoutParents[index]['children'] = tagsArrayFromAPI.filter(el => el.parentTag == noParentElement.key);
		generateTreeData(tagsArrayFromAPI, tagsWithoutParents[index]['children'], false);
	});
	return tagsWithoutParents;
};

//===========================================================================
export {
	generateTreeNodesFunction,
	manipulateTreeNodeItems,
	generateTagMapFunction,
	getTagPath,
	getTagMap,
	generateTreeData
};
