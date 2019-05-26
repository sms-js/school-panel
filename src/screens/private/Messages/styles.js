export default theme => {
	return {
		tree: {
			[theme.breakpoints.down('md')]: {
				width: '100%',
				marginBottom: theme.spacing(1)
			},
			[theme.breakpoints.up('md')]: {
				float: 'left',
				width: '15%',
				height: '100%',
				marginRight: theme.spacing(1),
				marginBottom: theme.spacing(1)
			}
		},
		tableContainer: {
			[theme.breakpoints.down('md')]: {
				width: '100%'
			},
			[theme.breakpoints.up('md')]: {
				width: '83%',
				float: 'left'
			}
		},
		mainComponentDiv: {
			backgroundColor: 'rgb(173, 189, 187)',
			paddingBottom: '120px',
			boxSizing: 'border-box'
		},
		droppableStyle: {
			backgroundColor: '#888',
			width: '300px',
			height: '250px',
			margin: '32px',
			border: '1px solid magenta'
		}
	};
};
