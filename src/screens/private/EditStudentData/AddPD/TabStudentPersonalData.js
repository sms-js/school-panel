import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import DrawerContainer from 'components/DrawerContainer';
import { TabsBar, TabContent } from '../Tabs/index';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary
	}
}));

const TabStudentPersonalData = () => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	function handleChange(event, newValue) {
		setValue(newValue);
	}
	return (
		<DrawerContainer title="Student: add personal data">
			<TabsBar value={value} handleChange={handleChange} />
			<TabContent value={value} />
		</DrawerContainer>
	);
};

TabStudentPersonalData.propTypes = {
	classes: PropTypes.object.isRequired
};
export default withStyles({ withTheme: true })(TabStudentPersonalData);
