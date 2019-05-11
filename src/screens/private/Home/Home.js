import styles from './Home.module.css';

import React from 'react';
import DrawerContainer from 'components/DrawerContainer';

const Home = () => {
	return (
		<DrawerContainer title="Home">
			<div className={styles['home-container']}>
				<h1>Khemlabs React Panel</h1>
				<img src="https://khemlabs.com/img/logo-brand.png" alt="Khemlabs React Panel" />
			</div>
		</DrawerContainer>
	);
};

export default Home;
