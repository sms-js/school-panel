import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import SelectField from './SelectField';

const FormItem = ({
	defaultValue,
	type,
	classes,
	handleChange,
	value,
	error,
	elementId,
	label,
	fieldName,
	validateField,
	index,
	userType,
	shrinkInputLabel = undefined,
	editable = true,
	selectOptions
}) => {
	//adressKeys are edtiable depending on the 'editable' param. All other possible fields should be editable.
	const adressKeys = ['fieldName', 'houseNr', 'floorNr', 'flatNr', 'zipCode', 'streetName'];
	if (adressKeys.indexOf(fieldName) === -1) editable = true;
	if (fieldName) {
		if (type === 'String' || type === 'Date' || type === 'Email') {
			const StringElement = (
				<TextField
					disabled={!editable}
					type={type}
					name={fieldName}
					required
					error={error}
					id={elementId}
					label={label}
					className={classes.textField}
					value={value}
					onChange={ev => handleChange(ev.target.value, fieldName, index, userType, !validateField(ev.target.value))}
					margin="normal"
					defaultValue={defaultValue}
					InputLabelProps={{
						shrink: shrinkInputLabel
					}}
				/>
			);
			return StringElement;
		}

		if (type === 'Select') {
			const SelectElement = (
				<SelectField
					selectOptions={selectOptions}
					userType={userType}
					index={index}
					type={type}
					fieldName={fieldName}
					required
					error={error}
					elementId={elementId}
					label={label}
					classes={classes}
					value={value}
					handleChange={handleChange}
					defaultValue={defaultValue}
					shrinkInputLabel={shrinkInputLabel}
				/>
			);
			return SelectElement;
		}
	}
};

FormItem.propTypes = {
	classes: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	error: PropTypes.bool.isRequired,
	value: PropTypes.string
};

export default FormItem;
