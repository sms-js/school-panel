import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { isNotEmptyString } from 'lib/validators/types';

const id = 'user-name';
const label = 'Username';
const fieldName = 'username';

const validateField = value => isNotEmptyString(value);

const UserName = ({ classes, handleChange, value, error }) => {
	return (
		<TextField
			name={fieldName}
			required
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

UserName.propTypes = {
	classes: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	error: PropTypes.bool.isRequired,
	value: PropTypes.string
};

export default UserName;
