import React, { useState, useEffect } from 'react';
import { Button, Modal, Tree } from 'antd';
import { Droppable } from '../DnD/Droppable';
import { generateTreeNodesFunction, manipulateTreeNodeItems } from '../../screens/private/Messages/helpFunctions';

const { TreeNode } = Tree;

const SideBarTagTree = ({ getDroppedDataFromTagTreeSideBar }) => {
	const initialGdata = [
		{
			key: 'level-0',
			title: 'Tlevel-0',
			id: 'ID-Level-0',
			children: [
				{
					key: 'level-0-0',
					title: 'Tlevel-0-0',
					id: 'ID-Level-0-0',
					children: [
						{ key: 'level-0-0-0', title: 'Tlevel-0-0-0', id: 'ID-Level-0-0-0', disabled: false, selectable: true },
						{ key: 'level-0-0-1', title: 'Tlevel-0-0-1', id: 'ID-Level-0-0-1', selectable: true },
						{ key: 'level-0-0-2', title: 'Tlevel-0-0-2', id: 'ID-Level-0-0-2', selectable: true }
					]
				}
			]
		}
	];

	const [ gData, setGdata ] = useState(initialGdata);
	const [ expandedKeys, setExpandedKeys ] = useState([ 'level-0-0-2' ]);

	const onDragEnter = (info) => {
		console.log('on Drag Enter= onDragOver');
		console.log(info);
		// expandedKeys
		// this.setState({
		//   expandedKeys: info.expandedKeys,
		// });
	};

	const onSelect = (e) => {
		//e equals to the selected treeNode key
		console.log('itemSelected, params = ', e);
		getDroppedDataFromTagTreeSideBar(e);
	};

	const onDrop = (info) => {
		console.log(info);
		getDroppedDataFromTagTreeSideBar(info);

		info.event.preventDefault();
		const transferredData = info.event.dataTransfer.getData('transfer');
		console.log('transferred data = ', transferredData);
		const originContainerName = info.event.dataTransfer.getData('transfer2');
		const destinationContainerName = info.node.props.id;

		/* 		if (originContainerName != '') manipulateDraggedAndDroppedElement(transferredData, originContainerName, destinationContainerName);
 */
		//const elementToRemoveFromParentNode = document.getElementById(transferredData);
		//let parentNode = document.getElementById(transferredData).parentNode;

		if (transferredData == '' || originContainerName == '' || destinationContainerName == '') {
			/*
		We can drag and drop to kind of elements:
		1) Drag a message-element and drop it into a nodeTree element.
		2) Drag a nodeTree element and drop it into another nodeTree element. 
		If situation 2) applies, then following if-statement is true and the (antD) code for handling of nodeTree elements applies. Following code (within the if-block) was delivered with the component and is related to the treeNode elements manipulation.
	*/
			const treeData = manipulateTreeNodeItems(info, gData);
			// if following line is uncommentend, then the tree items became draggable within each other.
			setGdata((prevState) => [ ...treeData ]);
		}
	};

	return (
		<Tree
			className="draggable-tree"
			defaultExpandedKeys={expandedKeys}
			draggable
			blockNode
			onDragEnter={onDragEnter}
			onDrop={onDrop}
			collapsed
			onSelect={onSelect}
		>
			{generateTreeNodesFunction(gData)}
		</Tree>
	);
};

export default SideBarTagTree;
