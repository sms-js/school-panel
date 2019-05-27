import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Modal } from 'antd';
import DrawerContainer from 'components/DrawerContainer';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { MessagesTable } from './items';
import { msgLib } from 'lib/models';
import { MessagesSideBar } from 'components/MessagesSideBarContainer/MessagesSideBar';
import styles from './styles.js';
import { arrayIsNotEmpty } from 'lib/validators/types';
import PropTypes from 'prop-types';

const confirm = Modal.confirm;

const Messages = ({ classes }) => {
	// messages (array) => messages in their original state
	// mainScreenMessages => modified messages
	const [mainScreenMessages, setMainScreenMessages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [triggerReRender] = useState(false);
	//const [selectedTag, setSelectedTag] = useState(undefined);

	const loadList = async () => {
		//only messages with status=true will be retrieved from API.
		// If specified messages with status=false can also be retrieved. See API documentation.
		//@todo: API should retrieve messages with status true AND no tags.
		const response = await msgLib.getMessages();
		return response;
	};

	const getMessagesByTagsAndStatus = async params => {
		const response = await msgLib.getMessagesByTagsAndStatus(params);
		return response;
	};

	useEffect(() => {
		const initList = async () => {
			const res = await loadList();
			// Main screen: messages with status=true and with no tags.
			const requestedMessages = res
				.filter(msg => !arrayIsNotEmpty(msg.tags))
				.map(msg => {
					//msg.deliveryDate = moment(msg.deliveryDate).format('DD/MM hh:mm');
					return { ...msg, _key: `${msg._id}` };
				});
			setMainScreenMessages([...requestedMessages]);
			//console.log('mainScreenMessages = ', mainScreenMessages);
			setLoading(false);
		};
		initList();
	}, []);

	useEffect(() => {}, [triggerReRender]);

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

	// Fets clicked message from MessageTable component
	const getSelectedMessageFromChildCmp = e => {
		console.log('Messages/ onSelect, e = ', e);
	};

	const dragMessageToDestinationTag = ({ destinationTag, draggedMessageId }) => {
		const destinationTagArray = destinationTag === 'mainTagKey' ? [] : [destinationTag];
		const dragMessageIndex = mainScreenMessages.findIndex(message => message._id === draggedMessageId);
		const draggedMessage = mainScreenMessages.splice(dragMessageIndex, 1)[0];
		draggedMessage.tags = destinationTagArray;
		msgLib.updateMessage(draggedMessage);
		setMainScreenMessages([...mainScreenMessages]);
	};

	const getTaggedMessages = async selectedTag => {
		const params = { tags: [selectedTag], status: true };
		const res = await getMessagesByTagsAndStatus(params);
		const requestedMessages = res.map(msg => {
			//msg.deliveryDate = moment(msg.deliveryDate).format('DD/MM hh:mm');
			return { ...msg, _key: `${msg._id}` };
		});
		setMainScreenMessages([...requestedMessages]);
	};

	const getDataFromTagTreeSideBar = ({ destinationTag, draggedMessageId }) => {
		if (destinationTag && draggedMessageId) {
			const draggedMessage = mainScreenMessages.find(msg => {
				return msg._id === draggedMessageId;
			});
			// User shouldn't be able to drag a message from and to the same tag
			const tags = arrayIsNotEmpty(draggedMessage.tags) ? draggedMessage.tags : [];
			if ((!tags[0] && destinationTag === 'mainTagKey') || tags[0] === destinationTag) {
				return;
			}
			dragMessageToDestinationTag({ destinationTag, draggedMessageId });
		}
		if (destinationTag && !draggedMessageId) {
			getTaggedMessages(destinationTag);
		}
	};

	return (
		<DrawerContainer title="Messages">
			<Paper className={classes.tree}>
				<MessagesSideBar getDataFromTagTreeSideBar={getDataFromTagTreeSideBar} collapsed={false} />
			</Paper>
			<Paper className={classes.tableContainer}>
				{loading && <LinearProgress />}
				<MessagesTable
					sendSelectedMessageIdToParentCmp={getSelectedMessageFromChildCmp}
					messages={mainScreenMessages}
					onDelete={onDelete}
				/>
			</Paper>
		</DrawerContainer>
	);
};

Messages.propTypes = {
	classes: PropTypes.object.isRequired
}
export default withStyles(styles, { withTheme: true })(Messages);
