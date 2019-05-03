import React, { useState, useEffect } from 'react';
import { Button, Modal, Tree } from 'antd';
import { MessagesTable, MessagesCards } from './items';
import { messages as msgLib } from 'lib/models';
import { Droppable } from '../../../components/DnD';
import { generateTreeNodesFunction, manipulateTreeNodeItems } from './helpFunctions';
import MessageSideBarContainer from '../../../components/SideBarContainer/MessageSideBarContainer';
import styles from './Messages.module.css';
import Rangepicker from '../../../components/Rangepicker/Index';
import moment from 'moment';

//import { Divider,Form,Spin,TreeSelect, Row, Col, } from 'antd';
//import UsersTable from '../users/UsersList/UsersTable';
//import Demo from './TestingDraggableTree';

const { TreeNode } = Tree;
const confirm = Modal.confirm;

const Messages = () => {
	const [ error, setError ] = useState(false);
	const [ showDrop1, setShowDrop1 ] = useState(true);
	const [ showDrop2, setShowDrop2 ] = useState(false);
	const [ stateValue, setStateValue ] = useState('drop2');
	const [ drop2Comps, setDrop2Comps ] = useState([]);
	const [ dummyName, setDummyName ] = useState('pepe');
	const [ drop2Count, setDrop2Count ] = useState(0);

	const [ expandedKeys, setExpandedKeys ] = useState([ 'level-0-0-2' ]);
	const [ messages, setMessages ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ dropIdContainers, setDropIdContainers ] = useState({
		drop1: [],
		drop2: [],
		drop3: []
	});
	const [ triggerReRender, reRenderDOM ] = useState(false);

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

	const tagsContainersInitialValue = {
		'ID-Level-0': [],
		'ID-Level-0-0': [],
		'ID-Level-0-0-0': [],
		'ID-Level-0-0-1': [],
		'ID-Level-0-0-2': []
	};
	const [ tagsContainers, setTagsContainers ] = useState(tagsContainersInitialValue);

	useEffect(() => {
		console.log('Messages = ', messages);
	},[messages])

	const loadList = async () => {
		const response = await msgLib.getMessages();
		return response;
	};

	useEffect(() => {
		loadList().then((res) => {
			const dummy = res.map((msg) => ({
				...msg,
				deliveryDate: moment(msg.deliveryDate).format('DD/MM Thh:mm'),
				key: `list_${msg._id}`
			}));

			setMessages((prevState) => {
				return [ ...prevState, ...dummy ];
			});
			console.log('messages = ', messages); //messages es []
			let dummyContainer = {
				drop1: res.map((el) => el._id),
				drop2: [],
				drop3: []
			};
			setDropIdContainers(Object.assign(dropIdContainers, dummyContainer)); //ok
		});
	}, []);

	useEffect(
		() => {
			console.log('triggerReRender has changed ');
			console.log('messages = ', messages);
		},
		[ triggerReRender ]
	);

	const onDelete = async (id) => {
		const msg = messages.find((msg) => msg._id === id);
		confirm({
			title: 'Do you want to delete these item?',
			content: `${msg._id}  will be deleted, are you sure?`,
			async onOk() {
				setLoading(true);
				//const success = await userLib.deleteUser(id);
				//if (success) setMessages(messages.filter((msg) => msg._id !== id));
				//else setError(true);
				setLoading(false);
			},
			onCancel() {}
		});
	};

	//======================DnD Test STARTS HERE ====================================================

	const updateDropIdContainers = (
		currentDropTarget,
		transferredElement,
		updatedDestinationContainer,
		originContainerName
	) => {
		console.log('currentDropTarget = ', currentDropTarget);
		console.log('transferredElement = ', transferredElement);
		console.log('updatedDestinationContainer = ', updatedDestinationContainer);
		console.log('originContainer = ', originContainerName);
		let originContainer = dropIdContainers[originContainerName];
		console.log('updateDropIdContainers / originContainer = ', originContainer);
		let newContainer = { ...dropIdContainers };
		newContainer[originContainerName] = originContainer.filter((el) => el != transferredElement);
		newContainer[currentDropTarget] = updatedDestinationContainer;
		setDropIdContainers(Object.assign(dropIdContainers, newContainer));
		console.log('dropIdContainers = ', dropIdContainers);
	};

	const drop = (e) => {
		e.preventDefault();
		const transferredData = e.dataTransfer.getData('transfer');
		console.log('transferred data = ', transferredData);
		const originContainerName = e.dataTransfer.getData('transfer2');
		e.target.appendChild(document.getElementById(transferredData));
		const destinationContainerName = e.currentTarget.id;
		let updatedDestinationContainer = dropIdContainers[destinationContainerName] || [];
		//prevenir aca que no se pueda auto dropear un objeto druplicando asi un ojeto en un contenedor
		//vi que cuando drageas algo desde drop1 y volves con el objeto sobre eso, te deja droppearlo y lo duplica en el array drop1
		updatedDestinationContainer.push(transferredData);
		updateDropIdContainers(destinationContainerName, transferredData, updatedDestinationContainer, originContainerName);
	};

	const allowDrop = (e) => {
		e.preventDefault();
	};

	//======================DnD Test ENDS HERE ======================================================

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
	};

	const manipulateDraggedAndDroppedElement = (
		elementToRemoveFromOriginContainer,
		originContainerName,
		destinationContainerName
	) => {
		console.log('elementToRemoveFromOriginContainer = ', elementToRemoveFromOriginContainer);
		console.log('originContainerName = ', originContainerName);

		//removing dragged and dropped itemId from its origin id's container.
		let newContainer = { ...dropIdContainers };
		newContainer[originContainerName] = dropIdContainers[originContainerName].filter(
			(el) => el != elementToRemoveFromOriginContainer
		);
		setDropIdContainers(Object.assign(dropIdContainers, newContainer));
		console.log('dropIdContainers = ', dropIdContainers);

		//assigning dragged and dropped itemId to the the tagContainer of destination
		let newTagContainer = { ...tagsContainers };
		newTagContainer[destinationContainerName].push(elementToRemoveFromOriginContainer);
		setTagsContainers(Object.assign(tagsContainers, newTagContainer));
		console.log('updated tagsContainers = ', tagsContainers);

		//removing dragged and dropped message from message container. This will trigger a useEffect, rendering DOM without the dragged message
		const newMessages = messages.filter((el) => el._id != elementToRemoveFromOriginContainer);
		setMessages(newMessages);
		console.log('messages = ', messages);
		reRenderDOM((prevState) => !prevState);
	};

	const onDrop = (info) => {
		console.log(info);
		info.event.preventDefault();
		const transferredData = info.event.dataTransfer.getData('transfer');
		console.log('transferred data = ', transferredData);
		const originContainerName = info.event.dataTransfer.getData('transfer2');
		const destinationContainerName = info.node.props.id;

		if (originContainerName != '')
			manipulateDraggedAndDroppedElement(transferredData, originContainerName, destinationContainerName);

		//const elementToRemoveFromParentNode = document.getElementById(transferredData);
		//let parentNode = document.getElementById(transferredData).parentNode;
		/*
			We can drag and drop to kind of elements:
			1) Drag a message-element and drop it into a nodeTree element.
			2) Drag a nodeTree element and drop it into another nodeTree element. 
			If situation 2) applies, then following if-statement is true and the (antD) code for handling of nodeTree elements applies. Following code (within the if-block) was delivered with the component and is related to the treeNode elements manipulation.
		*/
		if (transferredData == '' || originContainerName == '' || destinationContainerName == '') {
			const treeData = manipulateTreeNodeItems(info, gData);
			// if following line is uncommentend, then the tree items became draggable within each other.
			setGdata((prevState) => [ ...treeData ]);
		}
	};

	return (
		<MessageSideBarContainer title="Messages">
			<div className={styles.mainComponentDiv}>
				{/*UnComment following line and comment the MessagesCards Line to display a table with the messages. Actual MessagesTable Element is the MessagesTableTest */}
				<MessagesTable messages={messages} onDelete={onDelete} />
				{/*<Droppable allowDrop={allowDrop} drop={drop} id="drop1" style={{ display: 'flex', flexWrap: 'wrap' }}>
					<MessagesCards messages={messages} onDelete={onDelete} /> 
				</Droppable>*/}
				<div style={{ paddingTop: '150px' }}>
					<Button
						onClick={() => {
							loadList();
						}}
						type="primary"
						htmlType="button"
						className={styles['login-form-button']}
					>
						Load List
					</Button>
				</div>
			</div>
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
		</MessageSideBarContainer>
	);
};

export default Messages;
