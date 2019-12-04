import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

import DrawerContainer from 'components/DrawerContainer';
import { arrayIsNotEmpty } from 'lib/validators/types';
import { groupLib, studentLib } from 'lib/models';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { grades, groupTypes } from 'lib/keyValues';
import { reducer, getInitialState } from './state';
import { GroupSelectionMenu, TransferElement } from './elements';

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

const AssignStudents = () => {
	const classes = useStyles();
	const [state, dispatch] = useReducer(reducer, getInitialState());

	const getGroups = async grade => {
		const response = await groupLib.getGroups(grade);
		//console.log({ response });
		const groups = response === false ? [] : response;
		dispatch({ type: 'setDestinationGroups', payLoad: groups });
		dispatch({ type: 'displayMenu4', payLoad: true });
	};

	const getIncomingStudents = async grade => {
		const params = {
			incomingStudent: state.incomingStudents,
			grade
		};
		const response = await studentLib.getIncomingStudentsForGroups(params);
		const students = response === false ? [] : response;
		dispatch({ type: 'setStudents', payLoad: students });
		dispatch({ type: 'showStudents', payLoad: true });
	};

	const addToGroup = async ({ assign }) => {
		console.log({ assign });
		//add student to group. set incoming to false
		const response = studentLib.attachGroupToStudent({ students: assign, _id: state.destinationId });
	};
	const removeFromGroup = async ({ remove }) => {
		console.log({ remove });
	};

	const getData = info => {
		//console.log('getData / info = ', info);

		switch (info.selectorName) {
			case 'studentTypeDefinition':
				switch (info.selectedValue) {
					case 'pastYearGroup':
						dispatch({ type: 'hideSelectors' });
						dispatch({ type: 'setIncomingStudents', payLoad: false });
						break;
					case 'incomingStudents':
						dispatch({ type: 'hideSelectors' });
						dispatch({ type: 'displayMenu2', payLoad: true });
						dispatch({ type: 'setIncomingStudents', payLoad: true });
						break;
					case 'notAssigned':
						dispatch({ type: 'hideSelectors' });
						break;
					default:
						console.log('default switch case');
				}
				break;

			case 'originGroup':
				switch (info.selectedValue) {
					case 'notAssigned':
						dispatch({ type: 'hideSelectors' });
						break;
					default:
						break;
				}
				break;

			case 'gradeSelection':
				switch (info.selectedValue) {
					case 'notAssigned':
						dispatch({ type: 'displayMenu4', payLoad: false });
						dispatch({ type: 'showTransferElement', payLoad: false });
						break;
					default:
						//fetch groupTemplates belonging to the selected grade.
						dispatch({ type: 'setGrade', payLoad: info.selectedValue });
						getGroups(info.selectedValue);
						getIncomingStudents(info.selectedValue);
						dispatch({ type: 'showTransferElement', payLoad: false });
						break;
				}
				break;

			case 'destinationGroup':
				switch (info.selectedValue) {
					case 'notAssigned':
						dispatch({ type: 'showTransferElement', payLoad: false });
						break;
					default:
						dispatch({ type: 'setDestinationGroup', payLoad: info.selectedValue });
						dispatch({ type: 'showTransferElement', payLoad: true });
						console.log({ state });
				}
				break;

			default:
				console.log('default switch case');
		}
	};

	return (
		<DrawerContainer title="Assign Students">
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Paper
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							width: '100%'
						}}
					>
						<div>
							<GroupSelectionMenu
								selectorName={'studentTypeDefinition'}
								selectorLabel={'Group'}
								data={groupTypes}
								dispatchData={getData}
								disableMenu={false}
							/>
							{state.displayMenu2 ? (
								<GroupSelectionMenu
									selectorName={'gradeSelection'}
									selectorLabel={'Grade Selection'}
									data={grades}
									dispatchData={getData}
									disableMenu={false}
								/>
							) : null}
							{state.displayMenu3 ? (
								<GroupSelectionMenu
									selectorName={'originGroup'}
									selectorLabel={'Group of origin'}
									handleName={'originGroup'}
									data={[]}
									dispatchData={getData}
									disableMenu={false}
								/>
							) : null}
							{state.displayMenu4 ? (
								<GroupSelectionMenu
									selectorName={'destinationGroup'}
									selectorLabel={'Group of destination'}
									data={state.destinationGroups}
									dispatchData={getData}
									disableMenu={false}
								/>
							) : null}
						</div>
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						{state.showTransferElement ? (
							<TransferElement
								sourceStudents={state.students}
								destinationGroupCode={state.destinationGroup}
								destinationGroupStudents={[]}
								addToGroup={addToGroup}
								removeFromGroup={removeFromGroup}
							/>
						) : null}
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<Paper className={classes.paper}>Command buttons</Paper>
				</Grid>
			</Grid>
		</DrawerContainer>
	);
};

AssignStudents.propTypes = {
	classes: PropTypes.object.isRequired
};
export default withStyles({ withTheme: true })(AssignStudents);
