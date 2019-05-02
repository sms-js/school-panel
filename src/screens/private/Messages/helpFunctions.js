import React, { useState } from 'react';
import { Tree } from 'antd';
const { TreeNode } = Tree;


function generateTreeNodesFunction(treeData) {
	const resultTest = treeData.map((item) => {
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

function manipulateTreeNodeItems(info, gData) {
	//= Following block corresponds to original antD code to handle dragged treeNode elements====
	const dropKey = info.node.props.eventKey;
	const dragKey = info.dragNode.props.eventKey;
	const dropPos = info.node.props.pos.split('-');
	const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
	/** */
	const loop = (treeData, key, callback) => {
		treeData.forEach((item, index, arr) => {
			if (item.key === key) {
				return callback(item, index, arr);
			}
			if (item.children) {
				return loop(item.children, key, callback);
			}
		});
	};
	const treeData = [ ...gData ];

	// Find dragObject
	let dragObj;
	loop(treeData, dragKey, (item, index, arr) => {
		arr.splice(index, 1);
		dragObj = item;
	});

	if (!info.dropToGap) {
		// Drop on the content
		loop(treeData, dropKey, (item) => {
			item.children = item.children || [];
			// where to insert
			item.children.push(dragObj);
		});
	} else if (
		(info.node.props.children || []).length > 0 && // Has children
		info.node.props.expanded && // Is expanded
		dropPosition === 1 // On the bottom gap
	) {
		loop(treeData, dropKey, (item) => {
			item.children = item.children || [];
			// where to insert
			item.children.unshift(dragObj);
		});
	} else {
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
	}
	return treeData;

	//==== End of antD code======================================================================
}

export { generateTreeNodesFunction, manipulateTreeNodeItems };
