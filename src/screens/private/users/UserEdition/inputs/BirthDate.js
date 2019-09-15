import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { isNotEmptyString } from 'lib/validators/types';

const validateField = value => isNotEmptyString(value);

const BirthDate = ({ classes, handleChange, value, error, elementId, label, fieldName }) => {
	return (
		<TextField
			type="date"
			name={fieldName}
			required
			error={error}
			id={elementId}
			label={label}
			className={classes.textField}
			value={value}
			onChange={ev => handleChange(ev.target.value, !validateField(ev.target.value))}
			margin="normal"
			InputLabelProps={{
				shrink: true
			}}
			defaultValue="2010-01-01"
		/>
	);
};

BirthDate.propTypes = {
	classes: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	error: PropTypes.bool.isRequired,
	value: PropTypes.string
};

export default BirthDate;
