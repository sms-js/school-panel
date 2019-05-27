import styles from './MessagesSideBarContainer.module.css';
import React from 'react';
import { Layout } from 'antd';
import { MessagesSideBar } from './MessagesSideBar/index';
import PropTypes from 'prop-types';
const { Header, Sider, Content } = Layout;

const MessagesSideBarContainer = ({ children, title, getDataFromTagTreeSideBar }) => {
	return (
		<Layout>
			<Sider>
				<MessagesSideBar getDataFromTagTreeSideBar={getDataFromTagTreeSideBar} collapsed={false} />
			</Sider>
			<Layout>
				<Header className={styles['side-bar-container']}>
					<h2>{title}</h2>
				</Header>
				<Content>{children}</Content>
			</Layout>
		</Layout>
	);
};

MessagesSideBarContainer.propTypes = {
	title: PropTypes.string.isRequired,
	getDataFromTagTreeSideBar: PropTypes.func.isRequired,
	children: PropTypes.object.isRequired
};

export default MessagesSideBarContainer;
