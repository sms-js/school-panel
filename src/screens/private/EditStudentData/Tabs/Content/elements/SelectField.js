import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const SelectField = ({
	defaultValue,
	classes,
	type,
	className,
	handleChange,
	value,
	error,
	elementId,
	label,
	fieldName,
	index,
	userType,
	selectOptions,
	shrinkInputLabel = undefined,
	header
}) => {
	const MenuItems = Object.keys(selectOptions).map(key => <MenuItem key={key} value={key}>{selectOptions[key]}</MenuItem>);

	return (
		<FormControl className={classes.livesWith} required>
			<InputLabel id={'inputLabel_'+fieldName}>{label}</InputLabel>
			<Select
				labelId={elementId}
				id={elementId}
				type={type}
				name={fieldName}
				required
				error={error}
				className={classes.selectEmpty}
				value={value}
				onChange={ev => handleChange(ev.target.value, fieldName, index, userType)}
				margin="dense"
				defaultValue={defaultValue}
				InputLabelProps={{
					shrink: shrinkInputLabel
				}}
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
