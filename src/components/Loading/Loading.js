import React from 'react';
import { Spin } from 'antd';
import './loading.css';

const Loading = () => {
	return (
		<div className="loading-container">
			<Spin />
		</div>
	);
};

export default Loading;
