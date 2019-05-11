import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const id = 'user-password';
const label = 'Password';
const fieldName = 'password';

const validateField = (value, confirm) => !value || value.length < 4 || value !== confirm;

const Password = ({ classes, handleChange, value, confirm }) => {
	return (
		<TextField
			required
			error={validateField(value, confirm)}
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

Password.propTypes = {
	classes: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired
};

export default Password;
