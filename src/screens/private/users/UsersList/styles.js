const styles = theme => {
	return {
		error: {
			...theme.typography.subtitle1,
			color: theme.palette.error.main
		},
		root: {
			width: '100%',
			marginBottom: theme.spacing.unit,
			overflowX: 'auto'
		},
		button: {
			marginBottom: theme.spacing.unit
		},
		buttonLink: {
			color: theme.palette.primary.contrastText
		},
		tableButton: {
			margin: theme.spacing.unit
		},
		table: {
			minWidth: 650
		}
	};
};
export default styles;
