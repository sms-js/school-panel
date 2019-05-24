import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { isNotEmptyString } from 'lib/validators/types';

const id = 'user-type';
const label = 'UserType';
const fieldName = 'type';

const validateField = value => isNotEmptyString(value);

const UserType = ({ classes, handleChange, value, error }) => {
	return (
		<FormControl className={`${classes.formControl} ${classes.textField} ${classes.selectInput}`}>
			<InputLabel htmlFor={fieldName}>{label}</InputLabel>
			<Select
				id={id}
				name={fieldName}
				label={label}
				required
				value={value || ''}
				error={error}
				onChange={ev => handleChange(ev.target.value, !validateField(ev.target.value))}
			>
				<MenuItem value="admin">admin</MenuItem>
				<MenuItem value="userR">read</MenuItem>
				<MenuItem value="userRW">read and write</MenuItem>
			</Select>
		</FormControl>
	);
};

UserType.propTypes = {
	classes: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	error: PropTypes.bool.isRequired,
	value: PropTypes.string
};

export default UserType;
