import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import PropTypes from 'prop-types';

const NewTagNameInputField = ({ sendDataToParentCmp, mouseRightClickPosition }) => {
	const CssTextField = withStyles({
		root: {
			'& label.Mui-focused': {
				color: 'green'
			},
			'& .MuiInput-underline:after': {
				borderBottomColor: 'green'
			},
			'& .MuiOutlinedInput-root': {
				'& fieldset': {
					borderColor: 'red'
				},
				'&:hover fieldset': {
					borderColor: 'blue'
				},
				'&.Mui-focused fieldset': {
					borderColor: 'green'
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
			position: 'absolute',
			zIndex: '500',
			margin: theme.spacing(1),
			boxShadow: '22px 21px 11px 3px rgba(0, 0, 0, 0.75)',
			//top: mouseRightClickPosition.mouseY + 100,
			left: mouseRightClickPosition.mouseX + 20, //modal left position is independent from VP width
			backgroundColor: '#eaedf2'
		}
	}));

	const classes = useStyles();

	const handleChange = () => {
		return event => {
			if (event.which == 13) sendDataToParentCmp(event.target.value);
		};
	};

	return (
		<CssTextField
			onKeyDown={handleChange('folderName')}
			onChange={handleChange('folderName')}
			className={classes.margin}
			label="Folder Name"
			variant="outlined"
			id="folderName"
		/>
	);
};

NewTagNameInputField.propTypes = {
	mouseRightClickPosition: PropTypes.object.isRequired,
	sendDataToParentCmp: PropTypes.func.isRequired
};

export default NewTagNameInputField;
