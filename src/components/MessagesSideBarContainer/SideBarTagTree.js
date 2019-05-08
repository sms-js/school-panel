import React, { useState, useEffect } from 'react';
import { Button, Modal, Tree } from 'antd';
import { Droppable } from '../DnD/Droppable';
import {
	generateTreeNodesFunction,
	manipulateTreeNodeItems,
	generateTagMapFunction,
	getTagPath,
	getTagMap,
	generateTreeData
} from '../../screens/private/Messages/helpFunctions';
import TagRClickMenu from './RightClickMenu';
import moment from 'moment';

const { TreeNode } = Tree;

const SideBarTagTree = ({ sendDroppedDataToMessages }) => {
	//tasgArrayFromApi is a data structure similar to the one, which will be received from the API.Only the props: selectable and disable should be added if required. Those porps are used by antd components.
	const tagsArrayFromAPI = [
		{
			key: '5ccc37645ad6ca045cb414545',
			title: 'Saludos de Cumple',
			startDate: '2019-01-01T10:00:00Z',
			endDate: '2019-01-10T14:00:00Z',
			autoAssignTagToIncomingMessage: true,
			status: true,
			selectable: true
		},
		{
			key: '5ccc37855ad6ca045cdsdeb41f74',
			parentTag: '5ccc37645ad6ca045cb414545',
			title: 'Saludos a zona oeste',
			startDate: '2019-01-01T10:00:00Z',
			endDate: '2019-01-10T10:00:00Z',
			status: true,
			selectable: true
		},
		{
			key: '5ccc37855ad6ca045cssaf74',
			parentTag: '5ccc37645ad6ca045cb414545',
			title: 'Saludos a zona SUR',
			startDate: '2019-01-01T10:00:00Z',
			endDate: '2019-01-10T10:00:00Z',
			status: true,
			selectable: true
		},
		{
			key: '5ccc37855ad6caasa74',
			parentTag: '5ccc37855ad6ca045cssaf74',
			title: 'Saludos a zona SUR pero de quilmes',
			startDate: '2019-01-01T10:00:00Z',
			endDate: '2019-01-10T10:00:00Z',
			status: true,
			selectable: true
		},
		{
			key: '5ccc37645ad6ca045cb41f73',
			title: 'Otros Pedidos',
			startDate: '2019-01-01T10:00:00Z',
			endDate: '2019-01-10T14:00:00Z',
			autoAssignTagToIncomingMessage: true,
			status: true
		},
		{
			key: '5ccc37855ad6ca045cb41f74',
			parentTag: '5ccc37645ad6ca045cb41f73',
			title: 'Canciones',
			startDate: '2019-01-01T10:00:00Z',
			endDate: '2019-01-10T10:00:00Z',
			status: true
		},
		{
			key: '5ccc37a65ad6ca045cb41f75',
			parentTag: '5ccc37855ad6ca045cb41f74',
			title: 'Juan Corazon de Leon',
			disabled: false,
			selectable: true,
			status: true,
			startDate: '2019-01-01T10:00:00Z',
			endDate: '2019-01-02T14:00:00Z'
		},
		{
			key: '5ccc37be5ad6ca045cb41f76',
			parentTag: '5ccc37a65ad6ca045cb41f75',
			title: 'hitasos',
			disabled: false,
			selectable: true,
			status: true,
			startDate: '2019-01-01T10:00:00Z',
			endDate: '2019-01-02T14:00:00Z'
		},
		{
			key: '5ccc37da5ad6ca045cb41f78',
			parentTag: '5ccc37be5ad6ca045cb41f76',
			title: 'de los 80',
			disabled: false,
			status: true,
			startDate: '2019-01-01T10:00:00Z',
			endDate: '2019-01-02T14:00:00Z',
			selectable: true
		},
		{
			key: '5ccc37df5ad6ca045cb41f79',
			parentTag: '5ccc37be5ad6ca045cb41f76',
			title: 'de los 70',
			disabled: false,
			status: false,
			startDate: '2015-11-05T10:00:00Z',
			endDate: '2015-12-31T14:00:00Z',
			selectable: true
		}
	];

	let initialGdata = generateTreeData(tagsArrayFromAPI);
	const [ tagsArray, setTagsArray ] = useState(tagsArrayFromAPI);
	const [ gData, setGdata ] = useState(initialGdata);
	const [ expandedKeys, setExpandedKeys ] = useState([ '5ccc37df5ad6ca045cb41f79' ]);
	const [ showModal, setShowModal ] = useState(false);
	const [ mouseCoordinates, setMouseCoordinates ] = useState({});
	const [ rightClickSelectedTag, setRightClickSelectedTag ] = useState({});

	let tagMap = getTagMap(gData);
	console.log('tagMap = ', tagMap);

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
		console.log('itemSelected, key = ', e[0]);
		const selectedTag = getTagPath(e[0], tagMap);
		console.log(selectedTag);
		//sendDroppedDataToMessages(e);//sends id selected TreeNode to Messages Component
	};

	const onDrop = (info) => {
		//console.log(info);
		//sendDroppedDataToMessages(info); //sends dropped element and its (new) parent node to Messages Component
		console.log('onDrop - event = ', info.event);
		console.log('onDrop - node = ', info.node);
		console.log('onDrop - dragNode = ', info.dragNode);
		console.log('onDrop - dragNodesKeys = ', info.dragNodesKeys);
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
		console.log('onDrop / gData = ', gData);
	};

	const rightClickFunction = ({ event, node }) => {
		console.log('rcFct, node = ', node);
		console.log('rcFct, event = ', event);
		console.log('event.clientX = ', event.clientX);
		console.log('event.clientY = ', event.clientY);
		setMouseCoordinates({ mouseX: event.clientX, mouseY: event.clientY });
		getSelectedTagPropsAndSendToRClickMenu(node.props);
		setShowModal((prevState) => !prevState);
	};

	const getSelectedTagPropsAndSendToRClickMenu = (props) => {
		const selectedTag = tagMap[props.eventKey];
		console.log('selected Tag with Right Click = ', selectedTag);
		setRightClickSelectedTag(selectedTag);
	};

	const getNewSelectedTagStateFromModal = (newState) => {
		delete newState.parent;
		const selectedTagIndex = tagsArray.findIndex((el) => el.key == newState.key);
		const newTagsArray = tagsArray;
		const newTag = Object.assign(tagsArray[selectedTagIndex], newState);
		/* depending on users Rights: newTag should API-PATCH
when user changes the tag props using the RCM (status,dates,title,codeword) and clicks on 'ok' the modified tag (named here as newTag) should PATCH the old tag. This step will be added to a later point. 
*/
		newTagsArray[selectedTagIndex] = newTag;
		setTagsArray(newTagsArray);
	};

	return (
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
			{showModal ? (
				<TagRClickMenu
					rightClickSelectedTag={rightClickSelectedTag}
					sendNewSelectedTagStateToTagTree={getNewSelectedTagStateFromModal}
					mouseRightClickPosition={mouseCoordinates}
					resetShowModal={() => setShowModal(false)}
				/>
			) : null}
		</div>
	);
};

export default SideBarTagTree;
