import styles from './Example.module.css';

import React, { useState } from 'react';
import { Card, PageHeader } from 'antd';
import { Redirect } from 'react-router-dom';

const Example = () => {
	const [mustReturn, setReturn] = useState(false);

	return mustReturn ? (
		<Redirect to="/" />
	) : (
		<div className={styles['public-container']}>
			<PageHeader
				onBack={() => setReturn(true)}
				title="Example screen"
				subTitle="This is an example of a public screen (no authentication needed)"
			/>
			<div className={styles['public-content']}>
				<Card title="Example Screen" className="public-card">
					<p>PUBLIC EXAMPLE SCREEN!!!</p>
				</Card>
			</div>
		</div>
	);
};

export default Example;
