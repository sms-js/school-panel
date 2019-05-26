const styles = theme => {
	return {
		error: {
			...theme.typography.subtitle1,
			color: theme.palette.error.main
		},
		root: {
			width: '100%',
			marginBottom: theme.spacing(1),
			overflowX: 'auto'
		},
		button: {
			marginBottom: theme.spacing(1)
		},
		buttonLink: {
			color: theme.palette.primary.contrastText
		},
		tableButton: {
			margin: theme.spacing(1)
		},
		table: {
			minWidth: 650
		}
	};
};
export default styles;
