const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: `calc(100% - ${theme.spacing.unit * 2}px)`
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
	success: {
		width: '100%',
		marginTop: '5px',
		marginBottom: '5px',
		marginLeft: '5px',
		fontSize: '15px',
		color: 'green'
	},
	error: {
		width: '100%',
		marginTop: '5px',
		marginBottom: '5px',
		marginLeft: '5px',
		fontSize: '15px',
		color: 'red'
	}
});

export default styles;
