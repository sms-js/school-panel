import styles from './SideBarContainer.module.css';

import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import SideBar from 'components/SideBar';

const { Header, Sider, Content } = Layout;

const SideBarContainer = ({ children, title }) => {
	return (
		<Layout>
			<Sider>
				<SideBar collapsed={false} />
			</Sider>
			<Layout>
				<Header className={styles['side-bar-container']}>
					<h2>{title}</h2>
				</Header>
				<Content
					style={{
						margin: '24px 16px',
						padding: 24,
						background: '#fff',
						minHeight: 280
					}}
				>
					{children}
				</Content>
			</Layout>
		</Layout>
	);
};

SideBarContainer.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.string.isRequired
};
export default SideBarContainer;
