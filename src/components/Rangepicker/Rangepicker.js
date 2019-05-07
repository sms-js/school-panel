import React from 'react';
import styles from './Rangepicker.module.css';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

function onChange(value, dateString) {
	console.log('Selected Time: ', value);
	console.log('Formatted Selected Time: ', dateString);
}

function onOk(value) {
	console.log('onOk: ', value);
}

const Rangepicker = ({value})=>(
	<RangePicker
		showTime={{ format: 'HH:mm' }}
		format="DD-MM-YY HH:mm"
		placeholder={['Start Time', 'End Time']}
		onChange={onChange}
		onOk={onOk}
		size={'small'}
		value={value}
	/>
);

export default Rangepicker;
