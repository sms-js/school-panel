import React, { useState, useEffect } from 'react';
import styles from './RightClickWMenu.module.css';
import { Menu, Dropdown } from 'antd';

const TagRClickMenu = ({ sendSelectedOptionToParentCmp, children }) => {
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

export default TagRClickMenu;
