import React, { useState, useEffect } from 'react';
import { Input } from 'antd';

const NewTagNameInputField = ({ sendDataToParentCmp, mouseRightClickPosition }) => {
	const getInputValue = (e) => {
		console.log('etInputValue/ e.target.value = ', e.target.value);
		sendDataToParentCmp(e.target.value);
	};
	const styles = {
		modalPosition: {
			position: 'absolute',
			zIndex:'500',
			top: mouseRightClickPosition.mouseY+100,
			left: mouseRightClickPosition.mouseX+20, //modal left position is independent from VP width
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

export default NewTagNameInputField;
