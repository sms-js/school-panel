import React, { useState, useEffect } from 'react';
import styles from './RightClickWMenu.module.css';
import { Menu, Dropdown, Input, Popconfirm, Modal, Button, message } from 'antd';

const TagRClickWMenu = ({ sendSelectedOptionToParentCmp, recycleBinTagIsSelected,actualSelectedTagTitel,children }) => {
	console.log('actualSelectedTagTitel = ',actualSelectedTagTitel)
	const confirmModal = (e) => {
		Modal.confirm({
			title: `Send folder "${actualSelectedTagTitel}" to recycle bin`,
			content: 'Press OK to proceed',
			okText: 'OK',
			cancelText: 'Cancel',
			okButtonProps: { type: 'danger' },
			onOk() {
				message.warning('Folder has been sent to recycle bin');
				sendSelectedOptionToParentCmp(e)
			}
		});
	};

	const menu = (
		<Menu className={styles.testOverlay}>
			<Menu.Item disabled={recycleBinTagIsSelected} onClick={sendSelectedOptionToParentCmp} key="createNewTag">
				Crear carpeta
			</Menu.Item>
			<Menu.Item disabled={recycleBinTagIsSelected} onClick={sendSelectedOptionToParentCmp} key="editTagProperties">
				Editar carpeta
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item disabled={recycleBinTagIsSelected||actualSelectedTagTitel=='Main'} onClick={confirmModal} key="sendTagToBim">
				Borrar carpeta
			</Menu.Item>
			<Menu.Item disabled={!recycleBinTagIsSelected||actualSelectedTagTitel=='Recycle Bin'} onClick={confirmModal} key="recoverTag">
				Recuperar carpeta
			</Menu.Item>
		</Menu>
	);

	return (
		<div>
			<div>
				<Dropdown overlayClassName="styles.testOverlay" overlay={menu} trigger={['contextMenu']}>
					{children}
				</Dropdown>
			</div>
		</div>
	);
};

export default TagRClickWMenu;
