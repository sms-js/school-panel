import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { StudentPersonalData, MotherPersonalData, FatherPersonalData } from './TabsContent';
import { reducer, getInitialState } from './TabsContent/TabsState';
import { studentFields, fatherFields, motherFields } from './TabsContent/personalDataFields';

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

	useEffect(() => {
		console.log('UE');
		console.log('studentData.livesWith');
		setUpParentsAdress();
	}, [state.studentData.livesWith.value]);

	const setUpParentsAdress = () => {
		const { streetName, houseNr, floorNr, flatNr, zipCode } = state.studentData;

		switch (state.studentData.livesWith.value) {
			case 'both':
				dispatch({ type: 'motherAdressEditable', payLoad: false });
				dispatch({ type: 'fatherAdressEditable', payLoad: false });
				dispatch({ type: 'setMotherAdress', payLoad: { streetName, houseNr, floorNr, flatNr, zipCode } });
				dispatch({ type: 'setFatherAdress', payLoad: { streetName, houseNr, floorNr, flatNr, zipCode } });
				break;
			case 'mother':
				dispatch({ type: 'motherAdressEditable', payLoad: false });
				dispatch({ type: 'fatherAdressEditable', payLoad: true });
				dispatch({ type: 'setMotherAdress', payLoad: { streetName, houseNr, floorNr, flatNr, zipCode } });
				break;
			case 'father':
				dispatch({ type: 'motherAdressEditable', payLoad: true });
				dispatch({ type: 'fatherAdressEditable', payLoad: false });
				dispatch({ type: 'setFatherAdress', payLoad: { streetName, houseNr, floorNr, flatNr, zipCode } });
				break;
			case 'alternate':
				dispatch({ type: 'motherAdressEditable', payLoad: false });
				dispatch({ type: 'fatherAdressEditable', payLoad: false });
				break;
			default:
				console.log('livesWith default case');
		}
	};

	const getData = ({ type, payLoad }) => {
		console.log('getData');
		dispatch({ type, payLoad });
	};

	return (
		<Aux>
			{value === 0 && (
				<TabContainer>
					<StudentPersonalData
						studentData={state.studentData}
						dispatchData={getData}
						screenName={'studenPersonalData'}
					/>
				</TabContainer>
			)}
			{value === 1 && (
				<TabContainer>
					<MotherPersonalData
						adressEditable={state.motherAdressEditable}
						motherData={state.motherData}
						screenName={'motherPersonalData'}
					/>
				</TabContainer>
			)}
			{value === 2 && (
				<TabContainer>
					<FatherPersonalData
						adressEditable={state.fatherAdressEditable}
						fatherData={state.fatherData}
						screenName={'fatherPersonalData'}
					/>
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
