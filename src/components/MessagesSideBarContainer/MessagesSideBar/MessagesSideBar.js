import React, { useContext } from 'react';
import { Menu, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import SessionContext from 'components/SessionContext';
import { Droppable } from '../../DnD';
import { SideBarTagTree } from './index';

const SubMenu = Menu.SubMenu;

const MessagesSideBar = ({ collapsed, getDataFromTagTreeSideBar }) => {
	const session = useContext(SessionContext.context);
	return (
		<div style={{ height: '100vh', textAlign: 'left' }}>
			<Menu
				style={{ height: '100%' }}
				defaultSelectedKeys={['1']}
				defaultOpenKeys={['sub1']}
				mode="inline"
				inlineCollapsed={collapsed}
			>
				{/* Home screen item */}
				<Menu.Item key="menu-home">
					<span>
						<Icon type="home" />
						<span>
							<Link to="/admin/home">Home</Link>
						</span>
					</span>
				</Menu.Item>
				{/* <Menu.Item key="menu-messages-list-list">
					<Link to="/messages/display">
						<span>
							<Icon type="wechat" />
							<span>Messages</span>
						</span>
					</Link>
				</Menu.Item> */}
				<SideBarTagTree sendDataToMessagesCmp={getDataFromTagTreeSideBar} />
			</Menu>
		</div>
	);
};

export default MessagesSideBar;
