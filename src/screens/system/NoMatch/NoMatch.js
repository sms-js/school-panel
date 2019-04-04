import styles from './NoMatch.module.css';

import React, { useState } from 'react';
import { Card, PageHeader } from 'antd';
import { Redirect } from 'react-router-dom';

const NoMatch = () => {
	const [mustReturn, setReturn] = useState(false);

	return mustReturn ? (
		<Redirect to="/" />
	) : (
		<div className={styles['no-match-container']}>
			<PageHeader
				onBack={() => setReturn(true)}
				title="Sory:"
				subTitle="The screen you are looking for does not exists"
			/>
			<div className={styles['no-match-content']}>
				<Card title="Warning" className="no-match-card">
					<p>404 - NOT FOUND!!!</p>
				</Card>
			</div>
		</div>
	);
};

export default NoMatch;
