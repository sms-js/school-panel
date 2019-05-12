import React, { useState, useEffect } from 'react';
import styles from './RightClickWMenu.module.css';
import { Menu, Dropdown, Input, Popconfirm, message } from 'antd';

const TagRClickWMenu = ({ sendSelectedOptionToParentCmp, children }) => {
	function confirm(e) {
		console.log(e);
		message.success('New folder created');
	}

	function cancel(e) {
		console.log(e);
		message.error('Click on No');
	}
	const PopCmp = () => {
		return (
			<Popconfirm
				title={<Input placeholder="new folder name" />}
				onConfirm={confirm}
				onCancel={cancel}
				okText="Yes"
				cancelText="No"
			>
				<a href="#">Delete</a>
			</Popconfirm>
		);
	};
	const menu = (
		<Menu className={styles.testOverlay}>
			<Menu.Item onClick={sendSelectedOptionToParentCmp} key="createNewTag">
				Crear carpeta
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item onClick={sendSelectedOptionToParentCmp} key="editTagProperties">
				Editar carpeta
			</Menu.Item>
		</Menu>
	);

	return (
		<div>
			<Dropdown overlayClassName="styles.testOverlay" overlay={menu} trigger={[ 'contextMenu' ]}>
				{children}
			</Dropdown>
		</div>
	);
};

export default TagRClickWMenu;
