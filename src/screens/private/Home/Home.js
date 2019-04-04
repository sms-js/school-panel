import styles from './Home.module.css';

import React from 'react';
import SideBarContainer from 'components/SideBarContainer';

const Home = () => {
	return (
		<SideBarContainer title="Home">
			<div className={styles['home-container']}>
				<h1>Khemlabs React Panel</h1>
				<img src="https://khemlabs.com/img/logo-brand.png" alt="Khemlabs React Panel" />
			</div>
		</SideBarContainer>
	);
};

export default Home;
