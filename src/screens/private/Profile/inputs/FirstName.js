import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const id = 'user-first-name';
const label = 'First name';
const fieldName = 'firstName';

const validateField = value => !value;

const FirstName = ({ classes, handleChange, value }) => {
	return (
		<TextField
			required
			error={validateField(value)}
			id={id}
			label={label}
			className={classes.textField}
			value={value}
			onChange={handleChange(fieldName)}
			margin="normal"
		/>
	);
};

FirstName.propTypes = {
	classes: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired
};

export default FirstName;
