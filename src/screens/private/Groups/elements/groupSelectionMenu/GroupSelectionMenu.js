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

const GroupSelectionMenu = ({ menuLabel, sendDataToParentCmp, data, disableMenu }) => {
	const classes = useStyles();
	const [values, setValues] = useState({
		menuLabel,
		selectedValue: 'notAssigned'
	});

	const inputLabel = useRef(null);
	const [labelWidth, setLabelWidth] = useState(0);
	useEffect(() => {
		setLabelWidth(inputLabel.current.offsetWidth);
	}, []);

	data.sort((a,b)=> {
		var nameA = a.groupCode
		var nameB = b.groupCode
		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}
	});

	console.log('sortedData = ',data)




	function handleChange(event) {
		const newValueSet = {
			menuLabel: event.target.name,
			selectedValue: event.target.value
		};
		setValues(() => Object.assign(newValueSet));
		sendDataToParentCmp(newValueSet);
	}

	//sets menu label
	const menuInputLabel = menuLabel === 'originGroup' ? 'Origin group' : menuLabel === 'groupDefinition' ?'Group definition':'Destination group';

	//sets data of menu
	const menuData = data;

	const menuItems = menuData.map(el => {
		return (
			<MenuItem value={el.groupCode} key={el._id}>
				{el.groupName}
			</MenuItem>
		);
	});

	return (
		<FormControl variant="outlined" className={classes.formControl}>
			<InputLabel ref={inputLabel} htmlFor="handled-group">
				{menuInputLabel}
			</InputLabel>
			<Select
				disabled={disableMenu}
				value={values.selectedValue}
				onChange={handleChange}
				input={<OutlinedInput labelWidth={labelWidth} name={menuLabel} id="handled-group" />}
			>
				<MenuItem value="notAssigned">
					<em>Select Group</em>
				</MenuItem>
				{menuItems}
			</Select>
		</FormControl>
	);
};

export default GroupSelectionMenu;
