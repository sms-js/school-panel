export default theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(3),
		overflowX: 'auto'
	},
	table: {
		tableLayout: 'fixed',
		width: '100%',
		'& td': {
			overflow: 'scroll'
		}
	}
});
