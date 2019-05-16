import React, { useState, useEffect } from 'react';
import { Button, Modal, Tree } from 'antd';
import {MessagesTable } from './items';
import { messages as msgLib } from 'lib/models';
import MessageSideBarContainer from '../../../components/MessagesSideBarContainer/MessageSideBarContainer';
import styles from './Messages.module.css';
import moment from 'moment';

const { TreeNode } = Tree;
const confirm = Modal.confirm;

const Messages = () => {
	const [ messages, setMessages ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ triggerReRender, reRenderDOM ] = useState(false);

	useEffect(
		() => {
			console.log('Messages = ', messages);
		},
		[ messages ]
	);

	const loadList = async () => {
		const response = await msgLib.getMessages();
		return response;
	};

	useEffect(() => {
		loadList().then((res) => {
			const dummy = res.map((msg) => ({
				...msg,
				deliveryDate: moment(msg.deliveryDate).format('DD/MM hh:mm'),
				key: `list_${msg._id}`
			}));

			setMessages((prevState) => {
				return [ ...prevState, ...dummy ];
			});
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

	const getSelectedMessageFromChildCmp = (e) => {
		//e equals to the selected treeNode key
		console.log('Messages/ onSelect, e = ', e);
	};

	const getDataFromTagTreeSideBar = (infoFromTree) => {
		console.log('test Function in Messages!. InfoFromTree = ', infoFromTree);
	};

	return (
		<MessageSideBarContainer title="Messages" getDroppedDataFromTagTreeSideBar={getDataFromTagTreeSideBar}>
			<div>
				<Button
					onClick={() => {
						loadList();
					}}
					type="primary"
					htmlType="button"
					className={styles['login-form-button']}
					size={'small'}
				>
					Load List
				</Button>
			</div>
			<div className={styles.mainComponentDiv}>
				<MessagesTable sendSelectedMessageIdToParentCmp={getSelectedMessageFromChildCmp} messages={messages} onDelete={onDelete} />
			</div>
		</MessageSideBarContainer>
	);
};

export default Messages;