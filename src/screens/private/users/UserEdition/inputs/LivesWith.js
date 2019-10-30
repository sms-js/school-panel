import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const LivesWith = ({
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
	shrinkInputLabel = undefined
}) => {
	return (
		<FormControl className={classes.livesWith} required>
			<InputLabel id="livesWithLabel">{label}</InputLabel>
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
				margin="normal"
				defaultValue={defaultValue}
				InputLabelProps={{
					shrink: shrinkInputLabel
				}}
			>
				<MenuItem value="">
					<em>None</em>
				</MenuItem>
				<MenuItem value={'both'}>Both parents</MenuItem>
				<MenuItem value={'mother'}>Mother</MenuItem>
				<MenuItem value={'father'}>Father</MenuItem>
				<MenuItem value={'alternate'}>Alternate</MenuItem>
			</Select>
		</FormControl>
	);
};

LivesWith.propTypes = {
	classes: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	error: PropTypes.bool.isRequired,
	value: PropTypes.string
};

export default LivesWith;
