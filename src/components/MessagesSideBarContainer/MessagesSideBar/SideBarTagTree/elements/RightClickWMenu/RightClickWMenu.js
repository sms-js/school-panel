import React, { useState } from 'react';
import styles from './RightClickWMenu.module.css';
import { Menu, Dropdown } from 'antd';
import ConfirmationModal from './elements/ConfirmationModal';
import PropTypes from 'prop-types';

const TagRClickWMenu = ({
	sendSelectedOptionToParentCmp,
	recycleBinTagIsSelected,
	actualSelectedTagTitel,
	children
}) => {
	const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
	const [muiModalContent, setMuiModalContent] = useState({ title: actualSelectedTagTitel, content: '' });
	const modalText = {
		sendTagToBim: 'Send to recycle bin ?',
		recoverTag: 'Send back to Main list ?',
		setTagStatusToFalse: 'Delete from recycle bin ?'
	};
	const [actualKey, setActualKey] = useState();

	const openModal = e => {
		const content = modalText[e.key];
		const newModalText = { title: actualSelectedTagTitel, content: content };
		setMuiModalContent(newModalText);
		setActualKey(e.key);
		setOpenConfirmationModal(true);
	};

	const handleModalConfirm = props => {
		setOpenConfirmationModal(false);
		if (props) sendSelectedOptionToParentCmp(actualKey);
	};
	//for confirmations without modal such as: edit folder and new folder
	const handleConfirmation = e => {
		sendSelectedOptionToParentCmp(e.key);
	};

	const menu = (
		<div>
			<Menu className={styles.testOverlay}>
				<Menu.Item disabled={recycleBinTagIsSelected} onClick={handleConfirmation} key="createNewTag">
					New folder
				</Menu.Item>
				<Menu.Item disabled={recycleBinTagIsSelected} onClick={handleConfirmation} key="editTagProperties">
					Edit folder
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item
					disabled={recycleBinTagIsSelected || actualSelectedTagTitel === 'Main'}
					onClick={openModal}
					key="sendTagToBim"
				>
					Send to recycle Bin
				</Menu.Item>
				<Menu.Item
					disabled={!recycleBinTagIsSelected || actualSelectedTagTitel === 'Recycle Bin'}
					onClick={openModal}
					key="recoverTag"
				>
					Recover Folder
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item
					disabled={!recycleBinTagIsSelected || actualSelectedTagTitel === 'Recycle Bin'}
					onClick={openModal}
					key="setTagStatusToFalse"
				>
					Delete folder
				</Menu.Item>
			</Menu>
			{openConfirmationModal ? (
				<ConfirmationModal
					handleModalConfirm={handleModalConfirm}
					modalContent={muiModalContent.content}
					modalTitle={muiModalContent.title}
				/>
			) : null}
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

TagRClickWMenu.propTypes = {
	sendSelectedOptionToParentCmp: PropTypes.func.isRequired,
	recycleBinTagIsSelected: PropTypes.bool,
	actualSelectedTagTitel: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default TagRClickWMenu;
