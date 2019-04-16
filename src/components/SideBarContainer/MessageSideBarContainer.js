import './side.css';

import React from 'react';
import { Layout } from 'antd';
import MessagesSideBar from 'components/MessagesSideBar';

const { Header, Sider, Content } = Layout;

const SideBarContainer = ({ children, title }) => {
	return (
		<Layout>
			<Sider>
				<MessagesSideBar collapsed={false} />
			</Sider>
			<Layout>
				<Header className="side-bar-container">
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

export default SideBarContainer;
