import React, { useState, useEffect, useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 300
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	}
}));

const GroupSelectionMenu = ({ selectorLabel, selectorName, dispatchData, data, disableMenu }) => {
	const classes = useStyles();
	const [values, setValues] = useState({
		selectorName,
		selectedValue: 'notAssigned'
	});

	const inputLabel = useRef(null);
	const [labelWidth, setLabelWidth] = useState(0);
	useEffect(() => {
		setLabelWidth(inputLabel.current.offsetWidth);
	}, []);

	function handleChange(event) {
		const newValueSet = {
			selectorName: event.target.name,
			selectedValue: event.target.value
		};
		setValues(() => Object.assign(newValueSet));
		dispatchData(newValueSet);
	}

	const menuItems = data.map(el => {
		const value = el._id ? el._id : el.code;
		return (
			<MenuItem value={value} key={value}>
				{el.text}
			</MenuItem>
		);
	});

	return (
		<FormControl variant="outlined" className={classes.formControl}>
			<InputLabel ref={inputLabel} htmlFor="handled-group">
				{selectorLabel}
			</InputLabel>
			<Select
				disabled={disableMenu}
				value={values.selectedValue}
				onChange={handleChange}
				input={<OutlinedInput labelWidth={labelWidth} name={selectorName} id="handled-group" />}
			>
				<MenuItem value="notAssigned">
					<em>Select an option</em>
				</MenuItem>
				{menuItems}
			</Select>
		</FormControl>
	);
};

export default GroupSelectionMenu;
