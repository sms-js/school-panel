import React, { useContext } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import SessionContext from 'components/SessionContext';

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
				{/* Authenticated screens menu */}
				<SubMenu
					key="menu-authenticated"
					title={
						<span>
							<Icon type="login" />
							<span>Panel screens</span>
						</span>
					}
				>
					{/* Authenticated screen item *
								
					{/* Authenticated users screens menu */}
					<SubMenu
						key="menu-authenticated-users"
						disabled={session.user.type=='admin'?false:true}
						title={
							<span>
								<Icon type="user" />
								<span>Users</span>
							</span>
						}
					>
						{/* Users list screen item */}
						<Menu.Item key="menu-authenticated-authenticated">
							<Link to="/admin/users">List</Link>
						</Menu.Item>
						{/* User edition screen item */}
				
					</SubMenu>
				</SubMenu>

				{/* Public screens menu */}

				{/* Public screen item */}
					
				{/* Settings menu */}
				<SubMenu
					key="config"
					style={{ position: 'absolute', bottom: 0 }}
					title={
						<span>
							<Icon type="setting" />
							<span>Settings</span>
						</span>
					}
				>
					{/* Profile screen item */}
					<Menu.Item key="menu-home">
						<span>
							<Icon type="user" />
							<span>
								<Link to="/admin/profile">Profile</Link>
							</span>
						</span>
					</Menu.Item>
					{/* Logout item */}
					<Menu.Item key="menu-logout" onClick={() => session.logout()}>
						<Icon type="logout" />
						Logout
					</Menu.Item>
				</SubMenu>
			</Menu>
		</div>
	);
};

export default SideBar;
