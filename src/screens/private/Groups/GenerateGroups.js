import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

import DrawerContainer from 'components/DrawerContainer';
import { arrayIsNotEmpty } from 'lib/validators/types';
import { schoolLib } from '../../../lib/models';

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

	const [groups, setGroups] = useState([]);
	const [destinationGroups, setDestinationGroups] = useState([]);

	const getGroupTemplates = async grade => {
		const result = await schoolLib.getGroupTemplates(grade);
		console.log('getInitialGroupValues / result = ', result);
		const groups = result === false ? [] : result;
		setDestinationGroups(groups);
		dispatch({ type: 'displayMenu4', payLoad: true });
	};

	const getData = info => {
		console.log('getData / info = ', info);
		//const newMenuState = { ...state };
		//newMenuState[info.selectorName].selectedValue = info.selectedValue;
		switch (info.selectorName) {
			case 'groupDefinition':
				switch (info.selectedValue) {
					case 'pastYearGroup':
						dispatch({ type: 'hideSelectors' });
						break;
					case 'incomingChildren':
						dispatch({ type: 'hideSelectors' });
						dispatch({ type: 'displayMenu2', payLoad: true });
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
						getGroupTemplates(info.selectedValue);
						dispatch({ type: 'setGrade', payLoad: info.selectedValue });
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
								selectorName={'groupDefinition'}
								selectorLabel={'Group Type'}
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
									data={groups}
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
				<Grid item xs={12}>
					<Paper className={classes.paper}>Transfer element</Paper>
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
