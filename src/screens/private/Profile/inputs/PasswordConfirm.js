import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const id = 'user-password-confirm';
const label = 'Confirm password';
const fieldName = 'passwordConfirm';

const validateField = (value, password) => !value || value.length < 4 || value !== password;

const PasswordConfirm = ({ classes, handleChange, value, password }) => {
	return (
		<TextField
			required
			error={validateField(value, password)}
			id={id}
			label={label}
			className={classes.textField}
			value={value}
			onChange={handleChange(fieldName)}
			margin="normal"
			type="password"
		/>
	);
};

PasswordConfirm.propTypes = {
	classes: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired
};

export default PasswordConfirm;
