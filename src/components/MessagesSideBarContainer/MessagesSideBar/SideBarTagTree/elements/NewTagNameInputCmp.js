import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types'

const NewTagNameInputField = ({ sendDataToParentCmp, mouseRightClickPosition }) => {

	const getInputValue = e => {
		sendDataToParentCmp(e.target.value);
	};
	const styles = {
		modalPosition: {
			position: 'absolute',
			zIndex: '500',
			top: mouseRightClickPosition.mouseY + 100,
			left: mouseRightClickPosition.mouseX + 20, //modal left position is independent from VP width
			boxShadow: '7px 10px 5px 0px rgba(51,51,51,1)',
			width: '120px',
			height: '25px',
			boxColor: '#8a7e67'
		}
	};

	return (
		<div style={styles.modalPosition}>
			<Input onPressEnter={getInputValue} size="small" placeholder="enter new folder name" />
		</div>
	);
};

NewTagNameInputField.propTypes = {
	mouseRightClickPosition: PropTypes.object.isRequired,
	sendDataToParentCmp: PropTypes.func.isRequired,
};

export default NewTagNameInputField;
