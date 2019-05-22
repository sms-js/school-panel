import React, { useState, useEffect } from 'react';
import styles from './RightClickWMenu.module.css';
import { Menu, Dropdown, Input, Popconfirm, Modal, Button, message } from 'antd';

const TagRClickWMenu = ({ sendSelectedOptionToParentCmp, recycleBinTagIsSelected,actualSelectedTagTitel,children }) => {
	console.log('actualSelectedTagTitel = ', actualSelectedTagTitel)
	
	const modalText = {
		sendTagToBim: 'Send to recycle bin',
		recoverTag: 'Send back to Main list',
		setTagStatusToFalse: 'Delete',
	}

	const confirmModal = (e) => {
		Modal.confirm({
			title: `Folder: "${actualSelectedTagTitel}"`,
			content: modalText[e.key],
			okText: 'OK',
			cancelText: 'Cancel',
			okButtonProps: { type: 'danger' },
			onOk() {
				message.warning('Process succesful');
				sendSelectedOptionToParentCmp(e)
			}
		});
	};

	const menu = (
		<Menu className={styles.testOverlay}>
			<Menu.Item disabled={recycleBinTagIsSelected} onClick={sendSelectedOptionToParentCmp} key="createNewTag">
				New folder
			</Menu.Item>
			<Menu.Item disabled={recycleBinTagIsSelected} onClick={sendSelectedOptionToParentCmp} key="editTagProperties">
				Edit folder
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item disabled={recycleBinTagIsSelected||actualSelectedTagTitel=='Main'} onClick={confirmModal} key="sendTagToBim">
				send to recycle Bin
			</Menu.Item>
			<Menu.Item disabled={!recycleBinTagIsSelected||actualSelectedTagTitel=='Recycle Bin'} onClick={confirmModal} key="recoverTag">
				Recover Folder
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item disabled={!recycleBinTagIsSelected||actualSelectedTagTitel=='Recycle Bin'} onClick={confirmModal} key="setTagStatusToFalse">
				Delete folder
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
