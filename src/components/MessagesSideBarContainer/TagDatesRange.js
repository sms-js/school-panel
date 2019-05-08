import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;

const TagDatesRange = ({ selectedTag, sendNewTagStateToParentCmp }) => {
	const [ selectedTagRange, setSelectedTagRange ] = useState([]);
	const dateFormat = 'YYYY-MM-DD HH:mm';
	const pickerDate = [moment(selectedTag.startDate, dateFormat), moment(selectedTag.endDate, dateFormat)];

	const styles = {
		tagDates: {
			paddingTop: '1%',
			paddingBottom: '1%',
			display: 'flex',
			justifyContent: 'space-between',
			fontWeight: 'bold'
		}
	};


	function onTagRangeChange(dateString) {
		setSelectedTagRange(dateString);
	}

	function onTagRangeOk() {
		//original antD onOK API not working. That's why I have to get the selectedDatesRange over the onChange API.
		let newState = { ...selectedTag };
		newState.startDate = moment(selectedTagRange[0], [ 'DD-MM-YYYY HH:mm' ]).format('YYYY-MM-DDTHH:mm');
		newState.endDate = moment(selectedTagRange[1], [ 'DD-MM-YYYY HH:mm' ]).format('YYYY-MM-DDTHH:mm');
		//setSelectedTag(Object.assign(selectedTag, newState));
		sendNewTagStateToParentCmp(newState);
	}

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

export default TagDatesRange;
