import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Spin, TreeSelect, Row, Col, Tree } from 'antd';
import styles from './Messages.module.css';
import { MessagesTable, MessagesCards } from './items';
import { Divider } from 'antd';
import { messages as msgLib } from 'lib/models';
import MessageSideBarContainer from '../../../components/SideBarContainer/MessageSideBarContainer';
import moment from 'moment';
import { Droppable } from '../../../components/DnD';
import UsersTable from '../users/UsersList/UsersTable';
import Demo from './TestingDraggableTree';

const confirm = Modal.confirm;

const Messages = () => {
	const [ messages, setMessages ] = useState([]);
	const [ data, setData ] = useState([]);

	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(false);
	const [ showDrop1, setShowDrop1 ] = useState(true);
	const [ showDrop2, setShowDrop2 ] = useState(false);
	const [ containers, setContainers ] = useState({
		drop1: [],
		drop2: [],
		drop3: []
	});
	const [ dummyName, setDummyName ] = useState('pepe');
	const [ dummyBool, setDummyBool ] = useState(false);
	const [ stateValue, setStateValue ] = useState('drop2');

	const [ drop2Comps, setDrop2Comps ] = useState([]);
	const [ drop2Count, setDrop2Count ] = useState(0);
	const [ testArrDrop2, setTestArray ] = useState([]);

	const loadList = async () => {
		const response = await msgLib.getMessages();
		return response;
	};

	//el siguiente useEffect pareciera no estar generando ningun efecto,
	//data = []
	useEffect(() => {
		loadList().then((res) => {
			setData((prevState) => {
				return [ ...prevState, ...res ];
			});
		});
		console.log('useEffect / data == ', data);
	}, []);

	useEffect(
		() => {
			console.log('useEffect Nr2');
			console.log(' data = ', data); //aca data ya tiene los datos
			const dummy = data.map((msg) => ({
				...msg,
				deliveryDate: moment(msg.deliveryDate).format('DD/MM Thh:mm'),
				key: `list_${msg._id}`
			}));

			setMessages((prevState) => {
				return [ ...prevState, ...dummy ];
			});

			console.log('messages = ', messages); //messages es []

			let dummyContainer = {
				drop1: data.map((el) => el._id),
				drop2: [],
				drop3: []
			};
			setContainers(Object.assign(containers, dummyContainer)); //ok
			setDummyBool(true);
		},
		[ data ]
	);

	useEffect(
		() => {
			console.log('dummyBol has changed ');
			console.log('messages = ', messages);
		},
		[ dummyBool ]
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

	//======================DnD Test STARTS HERE ========================

	const updateArrays = (currentDropTarget, transferredElement, updatedDestinationContainer, originContainerName) => {
		console.log('currentDropTarget = ', currentDropTarget);
		console.log('transferredElement = ', transferredElement);
		console.log('updatedDestinationContainer = ', updatedDestinationContainer);
		console.log('originContainer = ', originContainerName);
		let actualOriginContainer = containers[originContainerName];
		console.log('updateArrays / actualOriginContainer = ', actualOriginContainer);
		let updatedOriginContainer = [];
		actualOriginContainer.forEach((el) => {
			if (el != transferredElement) {
				updatedOriginContainer.push(el);
			}
		});

		let newContainer = { ...containers };
		newContainer[originContainerName] = updatedOriginContainer;
		newContainer[currentDropTarget] = updatedDestinationContainer;
		setContainers(Object.assign(containers, newContainer));
		console.log('containers = ', containers);
		//	if (currentDropTarget == 'drop2') ModifyObjectsInDrop2(updatedDestinationContainer);
		generateTestArray(updatedDestinationContainer);
	};

	const changeDropCount = () => {
		setDrop2Count((prevState) => !prevState);
	};
	const ModifyObjectsInDrop2 = ({ testparams }) => {
		let modifiedObjectsArray = testparams.map((el) => <button>{el || 'test'}</button>);
		//changeDropCount();
		return modifiedObjectsArray;
	};

	const generateTestArray = (testparams) => {
		let testArray = testparams.map((el) => <button>{el || 'test'}</button>);
		setTestArray(() => [ ...testArray ]);
	};

	const updateDrop2Count = (params) => {
		setDrop2Count((prevState) => {
			return prevState + params;
		});
	};

	useEffect(
		() => {
			console.log('estoy en useEffect por modificacion de drop2');
		},
		[ drop2Count ]
	);

	const drop = (e) => {
		e.preventDefault();
		const transferredData = e.dataTransfer.getData('transfer');
		console.log('transferred data = ', transferredData);
		const originContainerName = e.dataTransfer.getData('transfer2');
		e.target.appendChild(document.getElementById(transferredData));
		const destinationContainerName = e.currentTarget.id;

		let updatedDestinationContainer = containers[destinationContainerName] || [];

		//prevenir aca que no se pueda auto dropear un objeto druplicando asi un ojeto en un contenedor
		//vi que cuando drageas algo desde drop1 y volves con el objeto sobre eso, te deja droppearlo y lo duplica en el array drop1
		updatedDestinationContainer.push(transferredData);

		updateArrays(destinationContainerName, transferredData, updatedDestinationContainer, originContainerName);
	};

	const allowDrop = (e) => {
		e.preventDefault();
	};
	const droppableStyle = {
		backgroundColor: '#888',
		width: '300px',
		height: '250px',
		margin: '32px',
		border: '1px solid magenta'
	};
	const droppableParams = {
		allowDrop: { allowDrop },
		drop: { drop },
		droppableContainerId: 'drop4',
		droppableContainerStyle: { droppableStyle }
	};
	//======================DnD Test ENDS HERE ==========================
	//======================TREESELECT COMP Test STARTS HERE ==========================

	const treeData = [
		{
			title: 'Node1',
			value: '0-0',
			key: '0-0',
			children: [
				{
					title: 'Child Node2',
					value: 'drop2',
					key: '0-0-1'
				},
				{
					title: 'Child Node3',
					value: 'drop3',
					key: '0-0-2'
				}
			]
		},
		{
			title: 'Node2',
			value: '0-1',
			key: '0-1'
		}
	];

	const preSetStateValue = (value) => {
		console.log(' value es ', value); //0-0-1
		setStateValue(value);
	};

	const TreeSelectTest = (props) => {
		console.log('TreeSelect Test / props =  ', props);
		return (
			<TreeSelect
				style={{ width: 300 }}
				value={props.value}
				dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
				treeData={treeData}
				placeholder="Please select"
				treeDefaultExpandAll
				onChange={(value) => {
					preSetStateValue(value);
				}}
			/>
		);
	};

	const SwitchDroppableArea = ({ allowDrop, drop, showDrop }) => {
		console.log('SwitchDroppableArea props = ', showDrop);
		const dr2 = (
			<div>
				DR 2
				<Droppable allowDrop={allowDrop} drop={drop} id="drop2" style={droppableStyle}>
					{/* 			<ModifyObjectsInDrop2 testparams={containers.drop2} /> */}
					{testArrDrop2}
				</Droppable>
			</div>
		);

		const dr3 = (
			<div>
				DR 3
				<Droppable allowDrop={allowDrop} drop={drop} id="drop3" style={droppableStyle} />
			</div>
		);
		return showDrop == 'drop2' ? dr2 : dr3;
	};

	//======================TREESELECT COMP Test ENDS HERE ==========================

	//--------------------------------------------------------------------------------------

	//--------------------------------------------------------------------------------------

	return (
		<MessageSideBarContainer title="Messages" droppableParams={droppableParams}>
			<div className={styles.mainComponentDiv}>
				----- Messages.js Main comp div starts here ---------
				{/*UnComment following line and comment the MessagesCards Line to display a table with the messages. Actual MessagesTable Element is the MessagesTableTest */}
				{/*<MessagesTable messages={messages} onDelete={onDelete} /> */}
				<Droppable allowDrop={allowDrop} drop={drop} id="drop1" style={{ display: 'flex', flexWrap: 'wrap' }}>
					<MessagesCards messages={messages} onDelete={onDelete} />
				</Droppable>
				<div>
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
				<div>--------------------------------------------------------------------</div>
				<TreeSelectTest value={stateValue} />
				<div>--------------------------------------------------------------------</div>
				<SwitchDroppableArea showDrop={stateValue} allowDrop={allowDrop} drop={drop} />
			</div>

			<div><Demo/></div>
			----- Messages.js Main cmp div ENDS here ---------
		</MessageSideBarContainer>
	);
};

export default Messages;
