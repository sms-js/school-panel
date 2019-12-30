import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, InputLabel, FormControl, Select } from '@material-ui/core/';

// const useStyles = makeStyles(theme => ({
// 	root: {
// 		display: 'flex',
// 		flexWrap: 'wrap'
// 	},
// 	formControl: {
// 		margin: theme.spacing(1),
// 		minWidth: 300
// 	},
// 	selectEmpty: {
// 		marginTop: theme.spacing(2)
// 	}
// }));

const SelectField = ({
	defaultValue,
	classes,
	type,
	handleChange,
	value,
	error,
	elementId,
	label,
	fieldName,
	index,
	userType,
	selectOptions,
	shrinkInputLabel = true,
	header
}) => {
	//const classes = useStyles();
	const MenuItems = Object.keys(selectOptions).map(key => (
		<MenuItem key={key} value={key}>
			{selectOptions[key]}
		</MenuItem>
	));

	return (
		<FormControl fullWidth required>
			<InputLabel className={classes.selectInput} id={'inputLabel_' + fieldName}>
				{label}
			</InputLabel>
			<Select
				fullWidth
				id={elementId}
				type={type}
				name={fieldName}
				required
				error={error}
				className={classes.selectInput}
				value={value}
				onChange={ev => handleChange(ev.target.value, fieldName, index, userType)}
				margin="none"
				defaultValue={defaultValue}
			>
				{MenuItems}
			</Select>
		</FormControl>
	);
};

SelectField.propTypes = {
	classes: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	error: PropTypes.bool.isRequired,
	value: PropTypes.string
};

export default SelectField;
