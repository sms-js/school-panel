import React, { useState, useEffect } from 'react';
import { Button, Modal, Tree } from 'antd';
import { MessagesTable } from './items';
import { messages as msgLib } from 'lib/models';
import MessageSideBarContainer from '../../../components/MessagesSideBarContainer/MessageSideBarContainer';
import styles from './Messages.module.css';
import moment from 'moment';

const { TreeNode } = Tree;
const confirm = Modal.confirm;

const Messages = () => {
	//messages (array) will contain the messages in their original state (as retrieved from API) before any modification
	const [messages, setMessages] = useState([]);
	//mainScreenMessages corresponds to the modification of messages and its content will be rendered.
	const [mainScreenMessages, setMainScreenMessages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [triggerReRender, reRenderDOM] = useState(false);

	useEffect(() => {
		console.log('mainScreenMessages = ', mainScreenMessages);
	}, [mainScreenMessages]);

	const loadList = async () => {
		//only messages with status=true will be retrieved from API. If specified messages with status=false can also be retrieved. See API documentation.
		//@todo: API should retrieve messages with status true AND no tags.
		const response = await msgLib.getMessages();
		return response;
	};

	useEffect(() => {
		loadList().then(res => {
			setMessages(() => {
				return [...res];
			});

			/*
			we dont want to display a message in the main screen when: message as a tag or message status is false (not the case with the previous API request). If the message has already a tag assigned, then it will be displayed, when the correspondent tag (in the tagTree) is selected. Only messages with status=true and with no tags should be displayed.
			the if condition (msg.messageData.tags == undefined || msg.messageData.tags.length == 0||msg.messageData.tags[0]=="") will be changed (to a later point) into (msg.messageData.tags == undefined || msg.messageData.tags.length == 0)
			*/
			const requestedMessages = res.filter(msg => {
				if (msg.messageData.tags == undefined || msg.messageData.tags.length == 0 || msg.messageData.tags[0] == '') {
					msg.deliveryDate = moment(msg.deliveryDate).format('DD/MM hh:mm');
					return { ...msg, _key: `${msg._id}` };
				}
			});
			setMainScreenMessages([...requestedMessages]);
			console.log('mainScreenMessages = ', mainScreenMessages);
		});
	}, []);

	useEffect(() => {
		console.log('triggerReRender has changed ');
	}, [triggerReRender]);

	const onDelete = async id => {
		const msg = mainScreenMessages.find(msg => msg._id === id);
		confirm({
			title: 'Do you want to delete these item?',
			content: `${msg._id}  will be deleted, are you sure?`,
			async onOk() {
				setLoading(true);
				//const success = await userLib.deleteUser(id);
				//if (success) setMainScreenMessages(mainScreenMessages.filter((msg) => msg._id !== id));
				//else setError(true);
				setLoading(false);
			},
			onCancel() {}
		});
	};

	//gets clicked message from MessageTable component
	const getSelectedMessageFromChildCmp = e => {
		//e equals to the selected treeNode key
		console.log('Messages/ onSelect, e = ', e);
	};

	//@todo: when a message is dragged into a tag, the tagId should be added to message, sent to API and deleted from the actual mainScreenMessages array. Now we will just delete the affected object and re render to simulate this situation.
	const getDataFromTagTreeSideBar = ({ destinationTag, draggedMessageId }) => {
		//console.log('test Function in Messages!. destinationTag = ', destinationTag);
		//console.log('test Function in Messages!. draggedMessageId = ', draggedMessageId);
		const newManipulatedMessages = mainScreenMessages.filter(msg => {
			if (msg._id == draggedMessageId) {
				const modifiedMsg = { ...msg };
				modifiedMsg.tags = modifiedMsg.tags != undefined ? [...modifiedMsg.tags, destinationTag] : [destinationTag];
				//send modifiedMsg to API
			} else {
				//we return the messages which have not been affected by the dragging action
				return msg;
			}
		});
		console.log('newManiMessages = ', newManipulatedMessages);
		setMainScreenMessages([...newManipulatedMessages]);
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
				<MessagesTable
					sendSelectedMessageIdToParentCmp={getSelectedMessageFromChildCmp}
					messages={mainScreenMessages}
					onDelete={onDelete}
				/>
			</div>
		</MessageSideBarContainer>
	);
};

export default Messages;
