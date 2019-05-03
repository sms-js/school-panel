import React, { useContext } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import SessionContext from 'components/SessionContext';
import Rangepicker from '../components/Rangepicker/Index';
import { Droppable } from '../components/DnD';

const SubMenu = Menu.SubMenu;

const SideBar = ({ collapsed }) => {
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
			</Menu>
		</div>
	);
};

export default SideBar;
