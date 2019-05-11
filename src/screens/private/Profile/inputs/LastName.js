import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const id = 'user-last-name';
const label = 'Last name';
const fieldName = 'lastName';

const validateField = value => !value;

const LastName = ({ classes, handleChange, value }) => {
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

LastName.propTypes = {
	classes: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired
};

export default LastName;
