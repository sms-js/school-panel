import green from '@material-ui/core/colors/green';

const styles = theme => {
	return {
		container: {
			display: 'flex',
			flexWrap: 'wrap'
		},
		textField: {
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1),
			width: `calc(100% - ${theme.spacing(2)}px)`
		},
		dense: {
			marginTop: 19
		},
		menu: {
			width: 200
		},
		form: {
			padding: '15px'
		},
		button: {
			margin: '5px'
		},
		selectInput: {
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(1)
		},
		success: {
			...theme.typography.subtitle1,
			color: green[100],
			width: '100%'
		},
		error: {
			...theme.typography.subtitle1,
			color: theme.palette.error[theme.palette.type],
			width: '100%'
		}
	};
};

export default styles;