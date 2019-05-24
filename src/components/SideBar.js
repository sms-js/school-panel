import React, { useContext } from 'react';
import PropTypes from 'prop-types';
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

				{/* Users list screen item */}
				<Menu.Item disabled={session.user.type === 'admin' ? false : true} key="menu-authenticated-authenticated">
					<Link to="/admin/users">
						<span>
							<Icon type="user" />
							<span>Users</span>
						</span>
					</Link>
				</Menu.Item>

				{/* Messages list screen item */}
				<Menu.Item key="menu-messages-list-list">
					<Link to="/messages/display">
						<span>
							<Icon type="wechat" />
							<span>Messages</span>
						</span>
					</Link>
				</Menu.Item>

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

SideBar.propTypes = {
	collapsed: PropTypes.bool.isRequired
};

export default SideBar;
