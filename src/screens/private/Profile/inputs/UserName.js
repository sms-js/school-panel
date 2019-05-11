import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const id = 'user-name';
const label = 'Username';
const fieldName = 'username';

const validateField = value => !value;

const UserName = ({ classes, handleChange, value }) => {
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

UserName.propTypes = {
	classes: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired
};

export default UserName;
