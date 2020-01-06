import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import DrawerContainer from 'components/DrawerContainer';

import { arrayIsNotEmpty } from 'lib/validators/types';
import { groupLib } from 'lib/models';
import { grades, years } from 'lib/keyValues';

import GroupSelectionMenu from '../assignStudents/elements/groupSelectionMenu/GroupSelectionMenu';
import { reducer, getInitialState } from './state';
import styles from './styles';

const GenerateGroups = ({ classes }) => {
	const [state, dispatch] = useReducer(reducer, getInitialState());

	const getGroupTemplates = async grade => {
		const response = await groupLib.getGroupTemplates(grade);
		const groups = response === false ? [] : response;
		dispatch({ type: 'setTemplates', payLoad: groups });
		dispatch({ type: 'disableMenu2', payLoad: groups.length == 0 ? true : false });
	};

	const saveGroup = async () => {
		try {
			const { selectedGroupTemplate, year, grade } = state;
			const response = await groupLib.createGroup({ value: selectedGroupTemplate, year, grade });
			if (!response) throw new Error();
			dispatch({ type: 'displaySuccessMessage', payLoad: true });
			dispatch({ type: 'disableSaveButton', payLoad: true });
			console.log(state.successMsg);
		} catch (e) {
			console.log(state.errorMsg);
			dispatch({ type: 'displayErrorMessage', payLoad: true });
		}
	};

	const handleGradeSelection = event => {
		dispatch({ type: 'setSelectedGroupTemplate', payLoad: 'notAssigned' });
		dispatch({ type: 'disableSaveButton', payLoad: true });
		dispatch({ type: 'setGrade', payLoad: event.target.value });
		dispatch({ type: 'disableMenu3', payLoad: true });
		getGroupTemplates(event.target.value);
	};

	const handleTemplateSelection = event => {
		if (event.target.value === 'notAssigned') {
			dispatch({ type: 'disableSaveButton', payLoad: true });
			dispatch({ type: 'disableMenu3', payLoad: true });
			dispatch({ type: 'hideMessagges' });
			return;
		}
		dispatch({ type: 'setSelectedGroupTemplate', payLoad: event.target.value });
		dispatch({ type: 'disableMenu3', payLoad: false });
	};

	const handleYearSelection = event => {
		if (event.target.value === 'notAssigned') {
			dispatch({ type: 'hideMessagges' });
			dispatch({ type: 'disableSaveButton', payLoad: true });
		}
		dispatch({ type: 'setYear', payLoad: event.target.value });
		dispatch({ type: 'disableSaveButton', payLoad: false });
	};

	return (
		<DrawerContainer title="Generate Groups">
			<Grid container spacing={3}>
				<Grid item xs={10}>
					<Paper className={classes.selectors}>
						<div>
							<GroupSelectionMenu
								selectorName={'gradeSelection'}
								selectorLabel={'Grade Selection'}
								data={grades}
								selectedValue={state.grade}
								handleChange={handleGradeSelection}
								disableMenu={false}
							/>
							<GroupSelectionMenu
								selectorName={'selectedGroupTemplate'}
								selectorLabel={'Group Name'}
								data={state.groupsTemplates}
								selectedValue={state.selectedGroupTemplate}
								handleChange={handleTemplateSelection}
								disableMenu={state.disableMenu2}
							></GroupSelectionMenu>
							<GroupSelectionMenu
								selectorName={'selectedYear'}
								selectorLabel={'Year'}
								selectedValue={state.year}
								data={years}
								handleChange={handleYearSelection}
								disableMenu={state.disableMenu3}
							/>
						</div>
					</Paper>
				</Grid>
				<Grid item xs={2}>
					<Paper className={classes.saveButton}>
						<div>
							<Button
								onClick={() => saveGroup()}
								variant="contained"
								color="secondary"
								disabled={state.disableSaveButton}
							>
								Save Group
							</Button>
						</div>
					</Paper>
				</Grid>

				<Grid item xs={12}>
					<Paper className={classes.paper}>Groups Generation</Paper>
				</Grid>
				<Grid item xs={12}>
					<Paper className={classes.paper}>Command buttons</Paper>
				</Grid>
			</Grid>
			{state.displaySuccessMessage && <span className={classes.success}>{state.successMsg}</span>}
			{state.displayErrorMessage && <span className={classes.error}>{state.errorMsg}</span>}
		</DrawerContainer>
	);
};

// GenerateGroups.propTypes = {
// 	classes: PropTypes.object.isRequired
// };
export default withStyles(styles)(GenerateGroups);
