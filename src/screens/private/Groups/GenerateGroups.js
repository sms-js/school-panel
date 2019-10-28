import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import DrawerContainer from 'components/DrawerContainer';
import { arrayIsNotEmpty } from 'lib/validators/types';
import { schoolLib } from '../../../lib/models';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

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

	const groupTypes = ['originGroup', 'destinationGroup_1', 'destinationGroup_2'];
	const [groups, setGroups] = useState([]);
	const [currentYear, setCurrentYear] = useState('2019');
	const groupDefinition = [
		{ groupCode: 'incomingChildren', groupName: 'Incoming children', _id: 'incomingChildren' },
		{ groupCode: 'pastYearGroup', groupName: 'Past Year', _id: 'pastYearGroup' }
	];
	const [disable, setDisableMenu] = useState({
		originGroup: true,
		destinationGroup: true
	});

	const [menuState, setMenuState] = useState({
		groupDefinition: { state: true, selectedValue: '' },
		originGroup: { state: false, selectedValue: '' },
		destinationGroup: { state: false, selectedValue: '', groupsData: [] }
	});

	const getInitialGroupValues = async () => {
		const result = await schoolLib.getGroups();
		console.log('getInitialGroupValues / result = ', result);
		setGroups(result);
		const actualMenuState = { ...menuState };
		actualMenuState.destinationGroup.groupsData = result;
		setMenuState(Object.assign(menuState, actualMenuState));
	};

	useEffect(() => {
		getInitialGroupValues();
	}, []);

	useEffect(() => {
		//console.log('UE - [menuState] = ', menuState);
	}, [menuState]);

	//info={menuLabel: "groupDefinition", selectedValue: "incomingChildren"}
	const getDataFromChildCmp = info => {
		console.log('getDataFromChildCmp / info = ', info);
		const newMenuState = { ...menuState };
		newMenuState[info.menuLabel].selectedValue = info.selectedValue;
		switch (info.menuLabel) {
			case 'groupDefinition':
				switch (info.selectedValue) {
					case 'pastYearGroup':
						newMenuState.originGroup.state = true;
						newMenuState.destinationGroup.state = false;
						break;
					case 'incomingChildren':
						newMenuState.destinationGroup.state = true;
						newMenuState.originGroup.state = false;
						newMenuState.destinationGroup.groupsData = groups;
						break;
					case 'notAssigned':
						newMenuState.destinationGroup.state = false;
						newMenuState.originGroup.state = false;
						break;
					default:
						console.log('default switch case');
				}
				break;
			case 'originGroup':
				switch (info.selectedValue) {
					case 'notAssigned':
						newMenuState.destinationGroup.state = false;
						newMenuState.originGroup.state = false;
						break;
					default:
						newMenuState.destinationGroup.state = true;
						const selectedOriginGroupLevel = groups.find(el => {
							return info.selectedValue == el.groupCode;
						}).groupLevel;
						newMenuState.destinationGroup.groupsData = groups.filter(el => el.groupLevel > selectedOriginGroupLevel);
						setMenuState(Object.assign(menuState, newMenuState));
						break;
				}
				break;
			default:
				console.log('default switch case');
		}
		console.log('newMenuState = ', newMenuState);
		setMenuState(newMenuState);
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
								menuLabel={'groupDefinition'}
								data={groupDefinition}
								sendDataToParentCmp={getDataFromChildCmp}
							/>
							{menuState['originGroup'].state ? (
								<GroupSelectionMenu
									menuLabel={'originGroup'}
									data={groups}
									sendDataToParentCmp={getDataFromChildCmp}
									disableMenu={!menuState['originGroup'].state}
								/>
							) : null}
							{menuState['destinationGroup'].state ? (
								<GroupSelectionMenu
									menuLabel={'destinationGroup'}
									data={menuState['destinationGroup'].groupsData}
									sendDataToParentCmp={getDataFromChildCmp}
									disableMenu={!menuState['destinationGroup'].state}
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
