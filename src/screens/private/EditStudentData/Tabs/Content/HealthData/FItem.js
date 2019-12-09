import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

const FItem = ({ name, id, label, value, handleChange, classes }) => {
	return (
		<TextField
			required
			name={name}
			id={id}
			label={label}
			disabled={false}
			className={classes.textField}
			value={value}
			onChange={handleChange}
			margin="normal"
			InputLabelProps={{
				shrink: true
			}}
		></TextField>
	);
};
export default FItem;
