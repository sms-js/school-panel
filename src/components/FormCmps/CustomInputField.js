import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

const CssTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: 'brown'
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: 'grey'
			},
			'&:hover fieldset': {
				borderColor: 'black'
			},
			'&.Mui-focused fieldset': {
				borderColor: 'blue'
			}
		}
	}
})(TextField);

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	margin: {
		margin: theme.spacing(1)
	}
}));

/**
 * 
 * @param {} param 
 * { sendDataToParentCmp, placeHolder, idValue,fieldName }
 */
const CustomInputField = ({ sendDataToParentCmp, label, id,name,required,error,value }) => {
	const classes = useStyles();

	const handleChange = () => {
		return event => {
			//if (event.which == 13) console.log(event.target.value);
			sendDataToParentCmp({ data: event.target.value, id: event.target.id });
		};
	};

	return (
		<div className={classes.root}>
			<CssTextField
				className={classes.margin}
				label={label}
				variant="outlined"
				id={id}
				onKeyDown={handleChange()}
				onChange={handleChange()}
				name={name}
				required={required}
				error={error}
				value={value}

			/>
		</div>
	);
};
export default CustomInputField;
