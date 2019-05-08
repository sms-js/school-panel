import React, { useState, useEffect } from 'react';
import styles from './RightClickMenu.module.css';
import { Popover, Button, Modal, Switch, DatePicker } from 'antd';
import { isAbsolute } from 'path';
import TagDatesRange from './TagDatesRange';

//import Rangepicker from '../Rangepicker/Index';
import moment from 'moment';
const { RangePicker } = DatePicker;

const TagRClickMenu = ({
	resetShowModal,
	mouseRightClickPosition,
	rightClickSelectedTag,
	sendNewSelectedTagStateToTagTree
}) => {
	const [ visible, setVisible ] = useState(true);
	const [ selectedTag, setSelectedTag ] = useState({ ...rightClickSelectedTag });

	const switchChange = () => {
		let newState = { ...selectedTag };
		newState.status = !newState.status;
		setSelectedTag(Object.assign(selectedTag, newState));
	};

	const getNewTagStateFromChildCmp = (newState) => {
		console.log('getNewTagStateFromTagDatesRangeCmp, data =', newState);
		setSelectedTag(Object.assign(selectedTag, newState));
	};

	const handleOk = (e) => {
		console.log(e);
		setVisible(false);
		sendNewSelectedTagStateToTagTree(selectedTag);
		resetShowModal();
	};

	const handleCancel = (e) => {
		console.log(e);
		setVisible(false);
		resetShowModal();
	};

	const modalPosition = {
		position: 'absolute',
		top: mouseRightClickPosition.mouseY - 100,
		left: '220px' //modal left position is independent from VP width
	};

	const styles = {
		tagStatus: {
			border: '0px red solid',
			display: 'flex',
			justifyContent: 'space-between',
			fontWeight: 'bold'
		},
		tagDates: {
			paddingTop: '1%',
			paddingBottom: '1%',
			display: 'flex',
			justifyContent: 'space-between',
			fontWeight: 'bold'
		}
	};

	const TagStatus = () => {
		return (
			<div style={styles.tagStatus}>
				<div>Status:</div>
				<Switch defaultChecked={selectedTag.status} onChange={switchChange} />
			</div>
		);
	};

	const TagCodeWord = () => (
		<div style={styles.tagStatus}>
			<div>Code word:</div>
			<div>{selectedTag.codeWord != undefined ? selectedTag.codeWord : 'no code word assigned'}</div>
		</div>
	);

	return (
		<div>
			<Modal title={selectedTag.title} visible={visible} onOk={handleOk} onCancel={handleCancel} style={modalPosition}>
				<TagStatus />
				<TagDatesRange sendNewTagStateToParentCmp={getNewTagStateFromChildCmp} selectedTag={selectedTag} />
				<TagCodeWord />
			</Modal>
		</div>
	);
};

export default TagRClickMenu;
