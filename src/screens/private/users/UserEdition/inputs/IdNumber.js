import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { isNotEmptyString, isNumber } from 'lib/validators/types';

const validateField = value => isNotEmptyString(value) && isNumber(value);

const IdNumber = ({ classes, handleChange, value, error, elementId, label, fieldName }) => {
	return (
		<TextField
			name={fieldName}
			required
			error={error}
			id={elementId}
			label={label}
			className={classes.textField}
			value={value}
			onChange={ev => handleChange(ev.target.value, !validateField(ev.target.value))}
			margin="normal"
		/>
	);
};

IdNumber.propTypes = {
	classes: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	error: PropTypes.bool.isRequired,
	value: PropTypes.string
};

export default IdNumber;
