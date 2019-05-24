import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const id = 'user-email';
const label = 'Email';
const fieldName = 'email';

const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateField = (value = '') => re.test(String(value).toLowerCase());

const Email = ({ classes, handleChange, value, error }) => {
	return (
		<TextField
			name={fieldName}
			required
			type="email"
			error={error}
			id={id}
			label={label}
			className={classes.textField}
			value={value}
			onChange={ev => handleChange(ev.target.value, !validateField(ev.target.value))}
			margin="normal"
		/>
	);
};

Email.propTypes = {
	classes: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	error: PropTypes.bool.isRequired,
	value: PropTypes.string
};

export default Email;
