import React, { useState, useEffect } from 'react';
import styles from './RightClickWMenu.module.css';
import { Menu, Dropdown } from 'antd';
import ConfirmationModal from './elements/ConfirmationModal';

const TagRClickWMenu = ({ sendSelectedOptionToParentCmp, recycleBinTagIsSelected,actualSelectedTagTitel,children }) => {
	console.log('actualSelectedTagTitel = ', actualSelectedTagTitel)
	const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
	const [muiModalContent, setMuiModalContent] = useState({title:actualSelectedTagTitel,content:''});
	
	const modalText = {
		sendTagToBim: 'Send to recycle bin ?',
		recoverTag: 'Send back to Main list ?',
		setTagStatusToFalse: 'Delete from recycle bin ?',
	}
	const [actualKey, setActualKey] = useState();

	const openModal = (e) => {
		const content = modalText[e.key];
		const newModalText = { title: actualSelectedTagTitel, content: content };
		setMuiModalContent(newModalText);
		setActualKey(e.key);
		setOpenConfirmationModal(true);
	}

	const handleModalConfirm = (props) => {
		setOpenConfirmationModal(false);
		if (props) sendSelectedOptionToParentCmp(actualKey);
	}
	
	const menu = (
		<div>
		<Menu className={styles.testOverlay}>
			<Menu.Item disabled={recycleBinTagIsSelected} onClick={sendSelectedOptionToParentCmp} key="createNewTag">
				New folder
			</Menu.Item>
			<Menu.Item disabled={recycleBinTagIsSelected} onClick={sendSelectedOptionToParentCmp} key="editTagProperties">
				Edit folder
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item disabled={recycleBinTagIsSelected||actualSelectedTagTitel=='Main'} onClick={openModal} key="sendTagToBim">
				Send to recycle Bin
			</Menu.Item>
			<Menu.Item disabled={!recycleBinTagIsSelected||actualSelectedTagTitel=='Recycle Bin'} onClick={openModal} key="recoverTag">
				Recover Folder
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item disabled={!recycleBinTagIsSelected||actualSelectedTagTitel=='Recycle Bin'} onClick={openModal} key="setTagStatusToFalse">
				Delete folder
			</Menu.Item>
			</Menu>
			{openConfirmationModal ? <ConfirmationModal
				handleModalConfirm={handleModalConfirm}
				modalContent={muiModalContent.content}
				modalTitle={muiModalContent.title}></ConfirmationModal> : null}
			</div>
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
