import React, { useContext } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import SessionContext from 'components/SessionContext';
import Rangepicker from '../Rangepicker/Index';
import { Droppable } from '../DnD';
import SideBarTagTree from './SideBarTagTree';

const SubMenu = Menu.SubMenu;

const MessagesSideBar = ({ collapsed, getDroppedDataFromTagTreeSideBar }) => {
	const session = useContext(SessionContext.context);
	return (
		<div style={{ height: '100vh', textAlign: 'left' }}>
			<Menu
				style={{ height: '100%' }}
				defaultSelectedKeys={[ '1' ]}
				defaultOpenKeys={[ 'sub1' ]}
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
				<Menu.Item key="menu-messages-list-list">
					<Link to="/messages/display">
						<span>
							<Icon type="wechat" />
							<span>Messages</span>
						</span>
					</Link>
				</Menu.Item>
				<SideBarTagTree getDroppedDataFromTagTreeSideBar={getDroppedDataFromTagTreeSideBar} />
			</Menu>
		</div>
	);
};

export default MessagesSideBar;
