import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Spin } from 'antd';
import styles from './Messages.module.css';
import { MessagesTable, MessagesCards } from './items';
import { Divider } from 'antd';
import { messages as msgLib } from 'lib/models';
import MessageSideBarContainer from '../../../components/SideBarContainer/MessageSideBarContainer';
import Rangepicker from '../../../components/Rangepicker/Index';
import moment from 'moment';

const confirm = Modal.confirm;

const Messages = () => {
	const [ messages, setMessages ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(false);

	useEffect(() => {
		loadList();
	}, []);

	useEffect(() => {
		console.log('Messages = ', messages);
	},[messages])

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

	return (
		<MessageSideBarContainer title="Messages">
			<div className={styles.mainComponentDiv}>
				{/*(Un)Comment following line and (un)comment the MessagesCards Line to display a table with the messages.*/}
				<MessagesTable messages={messages} onDelete={onDelete} />
				{/*<MessagesCards messages={messages} onDelete={onDelete} />*/}
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
			</div>
		</MessageSideBarContainer>
	);
};

export default Messages;
