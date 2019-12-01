import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

import DrawerContainer from 'components/DrawerContainer';
import { arrayIsNotEmpty } from 'lib/validators/types';
import { schoolLib, studentLib } from '../../../lib/models';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { grades, groupTypes } from 'lib/keyValues';
import { reducer, getInitialState } from './groupsState';
import GroupSelectionMenu from './elements/groupSelectionMenu/GroupSelectionMenu';

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
	const [state, dispatch] = useReducer(reducer, getInitialState());
	const [destinationGroups, setDestinationGroups] = useState([]);

	const getGroupTemplates = async grade => {
		const response = await schoolLib.getGroupTemplates(grade);
		const groups = response === false ? [] : response;
		setDestinationGroups(groups);
		dispatch({ type: 'displayMenu4', payLoad: true });
	};

	const getIncomingStudents = async grade => {
		const params = {
			incomingStudent: state.incomingStudent,
			grade
		};
		const response = await studentLib.getIncomingStudentsForGroups(params);
		const students = response === false ? [] : response;
		dispatch({ type: 'setStudents', payLoad: students });
		dispatch({ type: 'showStudents', payLoad: true });
	};

	const getData = info => {
		//console.log('getData / info = ', info);

		switch (info.selectorName) {
			case 'studentTypeDefinition':
				switch (info.selectedValue) {
					case 'pastYearGroup':
						dispatch({ type: 'hideSelectors' });
						dispatch({ type: 'setStudentIsNew', payLoad: false });
						break;
					case 'studentIsNew':
						dispatch({ type: 'hideSelectors' });
						dispatch({ type: 'displayMenu2', payLoad: true });
						dispatch({ type: 'setStudentIsNew', payLoad: true });
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
						break;
					default:
						//fetch groupTemplates belonging to the selected grade.
						dispatch({ type: 'setGrade', payLoad: info.selectedValue });
						getGroupTemplates(info.selectedValue);
						getIncomingStudents(info.selectedValue);
						break;
				}
				break;

			default:
				console.log('default switch case');
		}
	};

	return (
		<DrawerContainer title="Generate new group">
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
									data={destinationGroups}
									dispatchData={getData}
									disableMenu={false}
								/>
							) : null}
						</div>
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper className={classes.paper}>Transfer element 1</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper className={classes.paper}>Transfer element 2</Paper>
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
