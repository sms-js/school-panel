import React from 'react';
import { Menu } from 'antd';
import { SideBarTagTree } from './index';

const MessagesSideBar = ({ collapsed, getDataFromTagTreeSideBar }) => {
	return (
		<Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" inlineCollapsed={collapsed}>
			<SideBarTagTree sendDataToMessagesCmp={getDataFromTagTreeSideBar} />
		</Menu>
	);
};

export default MessagesSideBar;
