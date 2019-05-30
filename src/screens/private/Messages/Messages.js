import React, { useState, useEffect } from 'react';
import DrawerContainer from 'components/DrawerContainer';
import { MessagesTable } from './elements';
import { msgLib } from 'lib/models';
import { MessagesSideBar } from 'components/MessagesSideBarContainer/MessagesSideBar';
import styles from './styles.js';
import { arrayIsNotEmpty } from 'lib/validators/types';
import PropTypes from 'prop-types';

import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


const Messages = ({ classes }) => {
	// messages (array) => messages in their original state
	// mainScreenMessages => modified messages
	const [mainScreenMessages, setMainScreenMessages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedTag,setSelectedTag]=useState()

	const loadList = async () => {
		//only messages with status=true will be retrieved from API.
		// If specified messages with status=false can also be retrieved. See API documentation.
		const response = await msgLib.getMessages();
		return response;
	};

	useEffect(() => {
		const initList = async () => {
			const res = await loadList();
			// Main screen: messages with status=true and with no tags.
			const requestedMessages = res
				.filter(msg => !arrayIsNotEmpty(msg.tags))
				.map(msg => {
					return { ...msg, _key: `${msg._id}` };
				});
			setMainScreenMessages([...requestedMessages]);
			setLoading(false);
		};
		initList();
	}, []);

	useEffect(() => {
		getTaggedMessages()
	},[selectedTag])

	const dragMessageToDestinationTag = ({ destinationTag, draggedMessageId }) => {
		const destinationTagArray = destinationTag === 'mainTagKey' ? [] : [destinationTag];
		const dragMessageIndex = mainScreenMessages.findIndex(message => message._id === draggedMessageId);
		const draggedMessage = mainScreenMessages.splice(dragMessageIndex, 1)[0];
		draggedMessage.tags = destinationTagArray;
		msgLib.updateMessage(draggedMessage);
		setMainScreenMessages([...mainScreenMessages]);
	};

	const getTaggedMessages = async () => {
		const params = { tags: [selectedTag], status: true };
		const res = await await msgLib.getMessagesByTagsAndStatus(params);
		const requestedMessages = res.map(msg => {
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
			setSelectedTag(()=>destinationTag);
		}
	};

	const deleteMessage = (msgKey) => {
		const msgIndex = mainScreenMessages.findIndex(el => el._id == msgKey);
		const messageToDelete = mainScreenMessages.splice(msgIndex, 1)[0];
		messageToDelete.status = false;
		msgLib.updateMessage(messageToDelete);
		setMainScreenMessages([...mainScreenMessages]);
	}

	return (
		<DrawerContainer title="Messages">
			<Paper className={classes.tree}>
				<MessagesSideBar getDataFromTagTreeSideBar={getDataFromTagTreeSideBar} collapsed={false} />
			</Paper>
			<Paper className={classes.tableContainer}>
				{loading && <LinearProgress />}
				<MessagesTable
					messages={mainScreenMessages}
					deleteMessage={deleteMessage}
				/>
			</Paper>
		</DrawerContainer>
	);
};

Messages.propTypes = {
	classes: PropTypes.object.isRequired
}
export default withStyles(styles, { withTheme: true })(Messages);
