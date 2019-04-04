import styles from './Unauthorized.module.css';

import React, { useState } from 'react';
import { Card, PageHeader } from 'antd';
import { Redirect } from 'react-router-dom';

const Unauthorized = props => {
	const [mustReturn, setReturn] = useState(false);

	return mustReturn ? (
		<Redirect to="/" />
	) : (
		<div className={styles['unauthorized-container']}>
			<PageHeader onBack={() => setReturn(true)} title="Error:" subTitle="Unauthorized" />
			<div className={styles['unauthorized-content']}>
				<Card title="Warning" className="unauthorized-card">
					<p>You do not have permissions to access this screen</p>
				</Card>
			</div>
		</div>
	);
};

export default Unauthorized;
