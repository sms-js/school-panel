import React from 'react';
import styles from './Rangepicker.module.css';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}

function onOk(date) {
	console.log('onOk: ', date);
}

const Rangepicker = ()=>(
	<RangePicker
		showTime={{ format: 'HH:mm' }}
		format="DD-MM-YY HH:mm"
		placeholder={['Start Time', 'End Time']}
		onChange={onChange}
		onOk={onOk}
		size={'small'}
	/>
);

export default Rangepicker;
