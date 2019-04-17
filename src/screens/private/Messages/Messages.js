import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Spin } from 'antd';
import styles from './Messages.module.css';
import { MessagesTable, MessagesCards } from './items';
import { Divider } from 'antd';
import { messages as msgLib } from 'lib/models';
import MessageSideBarContainer from '../../../components/SideBarContainer/MessageSideBarContainer';
import moment from 'moment';

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
			</div>
			----- Messages.js Main cmp div ENDS here ---------
		</MessageSideBarContainer>
	);
};

export default Messages;
