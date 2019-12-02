import green from '@material-ui/core/colors/green';

const styles = theme => {
	return {
		paper: {
			padding: theme.spacing(3),
			textAlign: 'center',
			color: theme.palette.text.secondary
		},
		selectors: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
			width: '100%'
		},
		saveButton: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			width: '100%',
			height: '100%'
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
