import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';

const CodeWordField = ({ sendCodeWordToModal, actualTagCodeWord }) => {
	const handleChange = () => {
		return event => {
			sendCodeWordToModal(event.target.value);
		};
	};
	return (
		<TextField
			defaultValue={actualTagCodeWord}
			autoFocus
			margin="dense"
			id="codeWord"
			label="Code word"
			type="string"
			fullWidth
			onChange={handleChange('codeWord')}
		/>
	);
};

export default CodeWordField;
