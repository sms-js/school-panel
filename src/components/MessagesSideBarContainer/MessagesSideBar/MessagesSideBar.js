import React from 'react';
import { Menu } from 'antd';
import { SideBarTagTree } from './index';
import PropTypes from 'prop-types';

const MessagesSideBar = ({ collapsed, getDataFromTagTreeSideBar }) => {
	return (
		<Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" inlineCollapsed={collapsed}>
			<SideBarTagTree sendDataToMessagesCmp={getDataFromTagTreeSideBar} />
		</Menu>
	);
};

MessagesSideBar.propTypes = {
	collapsed: PropTypes.bool.isRequired,
	getDataFromTagTreeSideBar: PropTypes.func.isRequired,
};

export default MessagesSideBar;
