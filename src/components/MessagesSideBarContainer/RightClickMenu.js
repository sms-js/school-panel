import React, { useState, useEffect } from 'react';
import styles from './RightClickMenu.module.css';
import { Popover, Button, Modal, Switch } from 'antd';
import { isAbsolute } from 'path';
import Rangepicker from '../Rangepicker/Index';
import moment from 'moment';

const TagRClickMenu = ({
	resetShowModal,
	mouseRightClickPosition,
	rightClickSelectedTag,
	sendNewSelectedTagStateToTagTree
}) => {
	const [ visible, setVisible ] = useState(true);
	const [ selectedTag, setSelctedTag ] = useState({ ...rightClickSelectedTag });

	const switchChange = () => {
		let newState = { ...selectedTag };
		newState.status = !newState.status;
		setSelctedTag(Object.assign(selectedTag, newState));
		sendNewSelectedTagStateToTagTree(selectedTag);
	};

	const handleOk = (e) => {
		console.log(e);
		setVisible(false);
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

	const TagDates = () => {
		const dateFormat = 'DD/MM/YY HH:mm';
		const startDate = moment(selectedTag.startDate).format('DD/MM/YY HH:mm');
		const endDate = moment(selectedTag.endDate).format('DD/MM/YY HH:mm');

		const pickerDate = [ moment(startDate, dateFormat), moment(endDate, dateFormat) ];
		console.log('pickerDate = ', pickerDate);
		return (
			<div style={styles.tagDates}>
				Time window:<Rangepicker value={pickerDate} />
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
				<TagDates />
				<TagCodeWord />
			</Modal>
		</div>
	);
};

export default TagRClickMenu;
