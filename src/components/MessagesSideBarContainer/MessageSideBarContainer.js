import styles from './MessagesSideBarContainer.module.css';
import React from 'react';
import { Layout } from 'antd';
import { MessagesSideBar } from './MessagesSideBar/index';

const { Header, Sider, Content } = Layout;

//<MessagesSideBar {...props} collapsed={false} />
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

export default MessagesSideBarContainer;
