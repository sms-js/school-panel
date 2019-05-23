import React, { useState, useEffect } from 'react';
import { Button, Modal, Tree } from 'antd';
import { MessagesTable } from './items';
import { messages as msgLib } from 'lib/models';
import MessageSideBarContainer from '../../../components/MessagesSideBarContainer/MessageSideBarContainer';
import styles from './Messages.module.css';
import moment from 'moment';
//const { TreeNode } = Tree;
const confirm = Modal.confirm;

const Messages = () => {
	//messages (array) will contain the messages in their original state (as retrieved from API) before any modification
	//mainScreenMessages corresponds to the modification of messages and its content will be rendered.
	const [mainScreenMessages, setMainScreenMessages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [triggerReRender, reRenderDOM] = useState(false);
	const [selectedTag, setSelectedTag] = useState(undefined);

	const loadList = async () => {
		//only messages with status=true will be retrieved from API. If specified messages with status=false can also be retrieved. See API documentation.
		//@todo: API should retrieve messages with status true AND no tags.
		const response = await msgLib.getMessages();
		return response;
	};
	const getMessagesByTagsAndStatus = async params => {
		const response = await msgLib.getMessagesByTagsAndStatus(params);
		return response;
	};

	useEffect(() => {
		loadList().then(res => {
			/*
			we dont want to display a message in the main screen when: message has a tag or message status is false (not the case with the previous API request). If the message has already a tag assigned, then it will be displayed, when the correspondent tag (in the tagTree) is selected. Only messages with status=true and with no tags should be displayed.
			the if condition (msg.messageData.tags == undefined || msg.messageData.tags.length == 0||msg.messageData.tags[0]=="") will be changed (to a later point) into (msg.messageData.tags == undefined || msg.messageData.tags.length == 0)
			*/
			const requestedMessages = res.filter(msg => {
				if (msg.messageData.tags == undefined || msg.messageData.tags.length == 0) {
					msg.deliveryDate = moment(msg.deliveryDate);//.format('DD/MM hh:mm');
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

	const dragMessageToDestinationTag = ({ destinationTag, draggedMessageId }) => {
		const destinationTagArray = destinationTag == 'mainTagKey' ? [] : [destinationTag];
		const newManipulatedMessages = mainScreenMessages.filter(msg => {
			if (msg._id == draggedMessageId) {
				const modifiedMsg = { ...msg };
				if (modifiedMsg.messageData.tags == undefined) {
					modifiedMsg.messageData.tags = destinationTagArray;
				} else {
					/* following line means: when a message is dragged from one tag into another it gets the second tag appended, hence the message can be visualized in both tags. 
					@todo: in this case the message should be shown in the origin tag after dragging.Actually it can be visualized in the origin tag when user clicks origin tag after dragging message into destination tag.*/
					// modifiedMsg.messageData.tags = modifiedMsg.messageData.tags.concat(destinationTagArray);

					//message wont belong to several tags at the same tag. It gets only the dragdestination tag.
					modifiedMsg.messageData.tags = destinationTagArray;
				}
				//API: replace original message object with the modified message, which has the assigned tag
				msgLib.updateMessage(modifiedMsg);
			} else {
				//we return the messages which have not been affected by the dragging action
				return msg;
			}
		});
		setMainScreenMessages([...newManipulatedMessages]);
	};

	const getTaggedMessages = selectedTag => {
		const params = { tagsArray: [selectedTag], status: true };
		getMessagesByTagsAndStatus(params).then(res => {
			const requestedMessages = res.map(msg => {
				msg.deliveryDate = moment(msg.deliveryDate);//.format('DD/MM hh:mm');
				return { ...msg, _key: `${msg._id}` };
			});
			setMainScreenMessages([...requestedMessages]);
			console.log('mainScreenMessages = ', mainScreenMessages);
		});
	};

	const getDataFromTagTreeSideBar = ({ destinationTag, draggedMessageId }) => {
		console.log('getDataFromTagTreeCmp / destinationTag, draggedMessageId = ', destinationTag, draggedMessageId);
		if (destinationTag != undefined && draggedMessageId != undefined) {
			//user should not be able to drag a message from tag X into tag X. In such a case we do not manipulate the rendered messages.
			const draggedMessage = mainScreenMessages.filter(msg => {
				if (msg._id == draggedMessageId) return msg;
			});
			if (
				draggedMessage[0].messageData.tags[0] == destinationTag ||
				(draggedMessage[0].messageData.tags[0] == undefined && destinationTag == 'mainTagKey')
			) {
				return; //we dont want to proceed with drag process
			}
			dragMessageToDestinationTag({ destinationTag, draggedMessageId });
		}
		if (destinationTag != undefined && draggedMessageId == undefined) {
			getTaggedMessages(destinationTag);
		}
	};

	return (
		<MessageSideBarContainer title="Messages" getDataFromTagTreeSideBar={getDataFromTagTreeSideBar}>
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
