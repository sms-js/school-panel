import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Spin } from 'antd';
import styles from './Messages.module.css';
import { MessagesTable, MessagesCards } from './items';
import { Divider } from 'antd';
import { messages as msgLib } from 'lib/models';
import MessageSideBarContainer from '../../../components/SideBarContainer/MessageSideBarContainer';
import moment from 'moment';
import { Droppable } from '../../../components/DnD';

const confirm = Modal.confirm;

const Messages = () => {
	const [ messages, setMessages ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(false);

	useEffect(() => {
		loadList();
	}, []);

	const loadList = async () => {
		const data = await msgLib.getMessages();
		setLoading(false);
		if (!data) return setError(true);
		setMessages(
			data.map((msg) => ({
				...msg,
				deliveryDate: moment(msg.deliveryDate).format('DD/MM Thh:mm'),
				key: `list_${msg._id}`
			}))
		);

		console.log('messages = ', messages);
	};

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
	const [ containers, setContainers ] = useState({
		drop1: messages.map((el) => el._id),
		drop2: [],
		drop3: []
	});

	const updateArrays = (currentDropTarget, transferredElement, updatedDestinationContainer, originContainerName) => {
		console.log('currentDropTarget = ', currentDropTarget);
		console.log('transferredElement = ', transferredElement);
		console.log('updatedDestinationContainer = ', updatedDestinationContainer);
		console.log('originContainer = ', originContainerName);
		let actualOriginContainer = containers[originContainerName];
		let updatedOriginContainer = [];
		actualOriginContainer.forEach((el) => {
			if (el != transferredElement) {
				updatedOriginContainer.push(el);
			}
		});

		let newContainer = { ...containers };
		newContainer[originContainerName] = updatedOriginContainer;
		newContainer[currentDropTarget] = updatedDestinationContainer;
		setContainers(newContainer);
	};

	const drop = (e) => {
		e.preventDefault();
		const transferredData = e.dataTransfer.getData('transfer');
		const originContainerName = e.dataTransfer.getData('transfer2');
		e.target.appendChild(document.getElementById(transferredData));
		const destinationContainerName = e.currentTarget.id;
		let updatedDestinationContainer = [];
		e.currentTarget.childNodes.forEach((el) => updatedDestinationContainer.push(el.id));

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
	//======================DnD Test ENDS HERE ==========================
	return (
			<MessageSideBarContainer title="Messages">
				<div className={styles.mainComponentDiv}>
					----- Messages.js Main comp div starts here ---------
					{/*UnComment following line and comment the MessagesCards Line to display a table with the messages. Actual MessagesTable Element is the MessagesTableTest */}
					{/*<MessagesTable messages={messages} onDelete={onDelete} /> */}
					<div
						style={{
							border: '2px solid black',
							width: 700,
							height: 200
						}}
					>
						<MessagesCards messages={messages} onDelete={onDelete} />
					</div>
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
					<div>
						<Droppable allowDrop={allowDrop} drop={drop} id="drop1" style={droppableStyle} />
					</div>
					<div>
						<Droppable allowDrop={allowDrop} drop={drop} id="drop3" style={droppableStyle} />
					</div>
				</div>
				----- Messages.js Main cmp div ENDS here ---------
			</MessageSideBarContainer>
	);
};

export default Messages;
