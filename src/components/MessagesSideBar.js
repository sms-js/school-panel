import React, { useContext } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import SessionContext from 'components/SessionContext';
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

				<SubMenu
					key="menu-handle-messages"
					title={
						<span>
							<Icon type="hdd" />
							<span>Handle Messages</span>
						</span>
					}
				>
					{/* Authenticated screen item *
								
					{/* Authenticated users screens menu */}
					<SubMenu
						key="menu-main-option-1"
						disabled={session.user.type == 'admin' ? false : true}
						title={
							<span>
								<Icon type="folder-open" />
								<span>Main Option 1</span>
							</span>
						}
					>
			
						<Menu.Item key="menu-main-option-1-2">
							<div>Option 2</div>
						</Menu.Item>
						<Menu.Item key="menu-main-option-1-3">
							<div>Option 3</div>
						</Menu.Item>
						<Menu.Item key="menu-main-option-1-4">
							<div>Option 4</div>
						</Menu.Item>
					</SubMenu>
					<SubMenu
						key="menu-main-option-2"
						disabled={session.user.type == 'admin' ? false : true}
						title={
							<span>
								<Icon type="folder-open" />
								<span>Main Option 2</span>
							</span>
						}
					>
						<Menu.Item key="menu-main-option-2-1">
							<div>Option 1</div>
						</Menu.Item>
						<Menu.Item key="menu-main-option-2-2">
							<div>Option 2</div>
						</Menu.Item>
						<Menu.Item key="menu-main-option-2-3">
							<div>Option 3</div>
						</Menu.Item>
						<Menu.Item key="menu-main-option-2-4">
							<div>Option 4</div>
						</Menu.Item>
					</SubMenu>
				</SubMenu>
			</Menu>
		</div>
	);
};

export default SideBar;
