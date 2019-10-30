import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { StudentPersonalData, MotherPersonalData, FatherPersonalData } from './TabsContent';
import { reducer, getInitialState } from './TabsContent/TabsState';

import Aux from '../../../../components/AUX/Aux';
const TabContainer = props => {
	return (
		<Typography component="div" style={{ padding: 8 * 1 }}>
			{props.children}
		</Typography>
	);
};
const TabsContainers = ({ value }) => {
	const [state, dispatch] = useReducer(reducer, getInitialState());

	const getData = ({ type, payLoad }) => {
		console.log('getData');
		dispatch({ type, payLoad });
	};

	useEffect(() => {
		console.log('UE');
		console.log({ state });
	}, [state]);

	return (
		<Aux>
			{value === 0 && (
				<TabContainer>
					<StudentPersonalData dispatchData={getData} screenName={'studenPersonalData'} />
				</TabContainer>
			)}
			{value === 1 && (
				<TabContainer>
					<MotherPersonalData screenName={'studenPersonalData'} />
				</TabContainer>
			)}
			{value === 2 && (
				<TabContainer>
					<FatherPersonalData screenName={'studenPersonalData'} />
				</TabContainer>
			)}
			{value === 3 && <TabContainer>Health Datax</TabContainer>}
			{value === 4 && <TabContainer>Contact Numbers</TabContainer>}
			{value === 5 && <TabContainer>Authorizations</TabContainer>}
			{value === 6 && <TabContainer>Emergency Data Set</TabContainer>}
			{value === 7 && <TabContainer>Item Six</TabContainer>}
			{value === 8 && <TabContainer>Item Seven</TabContainer>}
		</Aux>
	);
};

export default TabsContainers;

TabContainer.propTypes = {
	children: PropTypes.node.isRequired
};
