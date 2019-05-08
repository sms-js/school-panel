import React, { useState, useEffect } from 'react';
import styles from './RightClickMenu.module.css';
import { Popover, Button, Modal, Switch, DatePicker } from 'antd';
import { isAbsolute } from 'path';
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
	const [ selectedTag, setSelctedTag ] = useState({ ...rightClickSelectedTag });

	const switchChange = () => {
		let newState = { ...selectedTag };
		newState.status = !newState.status;
		setSelctedTag(Object.assign(selectedTag, newState));
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

	const TagRangeDates = () => {
		const [ selectedTagRange, setSelectedTagRange ] = useState([]);
		const dateFormat = 'YYYY-MM-DD HH:mm';
		function onTagRangeChange( dateString) {
			setSelectedTagRange(dateString);
		}
		function onTagRangeOk() {
			//original antD onOK API not working. That's why I have to get the selectedDatesRange over the onChange API.
			let newState = { ...selectedTag };
			newState.startDate = moment(selectedTagRange[0], [ 'DD-MM-YYYY HH:mm' ]).format('YYYY-MM-DDTHH:mm');
			newState.endDate = moment(selectedTagRange[1], [ 'DD-MM-YYYY HH:mm' ]).format('YYYY-MM-DDTHH:mm');
			setSelctedTag(Object.assign(selectedTag, newState));
		}
		const pickerDate = [ moment(selectedTag.startDate, dateFormat), moment(selectedTag.endDate, dateFormat) ];
		return (
			<div style={styles.tagDates}>
				Time window:
				<RangePicker
					showTime={{ format: 'HH:mm' }}
					format="DD-MM-YYYY HH:mm"
					placeholder={[ 'Start Time', 'End Time' ]}
					onChange={onTagRangeChange}
					onOk={onTagRangeOk}
					size={'small'}
					defaultValue={pickerDate}
				/>
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
				<TagRangeDates />
				<TagCodeWord />
			</Modal>
		</div>
	);
};

export default TagRClickMenu;
