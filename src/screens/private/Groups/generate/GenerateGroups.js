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
		dispatch({ type: 'disableMenu2', payLoad: false });
	};

	const getData = info => {
		switch (info.selectorName) {
			case 'gradeSelection':
				switch (info.selectedValue) {
					case 'notAssigned':
						dispatch({ type: 'disableAll' });
						dispatch({ type: 'disableSaveButton', payLoad: true });
						break;
					default:
						//fetch groupTemplates belonging to the selected grade.
						dispatch({ type: 'setGrade', payLoad: info.selectedValue });
						getGroupTemplates(info.selectedValue);
						break;
				}
				break;
			case 'selectedGroupTemplate':
				switch (info.selectedValue) {
					case 'notAssigned':
						dispatch({ type: 'disableSaveButton', payLoad: true });
						dispatch({ type: 'disableMenu3', payLoad: true });
						dispatch({ type: 'hideMessagges' });
						break;
					default:
						dispatch({ type: 'setSelectedGroupTemplate', payLoad: info.selectedValue });
						dispatch({ type: 'disableMenu3', payLoad: false });
				}
				break;
			case 'selectedYear':
				switch (info.selectedValue) {
					case 'notAssigned':
						dispatch({ type: 'hideMessagges' });
						dispatch({ type: 'disableSaveButton', payLoad: true });
						break;
					default:
						dispatch({ type: 'setYear', payLoad: info.selectedValue });
						dispatch({ type: 'disableSaveButton', payLoad: false });
				}
				break;
			default:
				console.log('default switch case');
		}
	};

	const saveGroup = async () => {
		try {
			const { selectedGroupTemplate, year, grade } = state;
			const response = await groupLib.createGroup({ code: selectedGroupTemplate, year, grade });
			if (!response) throw new Error();
			dispatch({ type: 'displaySuccessMessage', payLoad: true });
			dispatch({ type: 'disableSaveButton', payLoad: true });
			console.log(state.successMsg);
		} catch (e) {
			console.log(state.errorMsg);
			dispatch({ type: 'displayErrorMessage', payLoad: true });
		}
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
								dispatchData={getData}
								disableMenu={false}
							/>
							<GroupSelectionMenu
								selectorName={'selectedGroupTemplate'}
								selectorLabel={'Group Name'}
								data={state.groupsTemplates}
								dispatchData={getData}
								disableMenu={state.disableMenu2}
							></GroupSelectionMenu>
							<GroupSelectionMenu
								selectorName={'selectedYear'}
								selectorLabel={'Year'}
								data={years}
								dispatchData={getData}
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
