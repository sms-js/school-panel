import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

import DrawerContainer from 'components/DrawerContainer';
import { arrayIsNotEmpty } from 'lib/validators/types';
import { schoolLib, studentLib } from '../../../../lib/models';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { grades, groupTypes } from 'lib/keyValues';
import { reducer, getInitialState } from '../assignStudents/groupsState';
import { GroupSelectionMenu, TransferElement } from '../assignStudents/elements';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary
	}
}));

const GenerateGroups = () => {
	const classes = useStyles();

	return (
		<DrawerContainer title="Generate Groups">
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Paper className={classes.paper}>Groups Generation</Paper>
				</Grid>
				<Grid item xs={12}>
					<Paper className={classes.paper}>Command buttons</Paper>
				</Grid>
			</Grid>
		</DrawerContainer>
	);
};

GenerateGroups.propTypes = {
	classes: PropTypes.object.isRequired
};
export default withStyles({ withTheme: true })(GenerateGroups);
