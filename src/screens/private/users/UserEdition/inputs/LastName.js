import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { isNotEmptyString } from 'lib/validators/types';

const id = 'user-last-name';
const label = 'Last name';
const fieldName = 'lastName';

const validateField = value => isNotEmptyString(value);

const LastName = ({ classes, handleChange, value, error }) => {
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

LastName.propTypes = {
	classes: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	error: PropTypes.bool.isRequired,
	value: PropTypes.string
};

export default LastName;
