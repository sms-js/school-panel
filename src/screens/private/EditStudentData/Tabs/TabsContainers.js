import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { StudentPersonalData, ParentPersonalData } from './TabsContent';
import { reducer, getInitialState } from './TabsContent/TabsState';
import { studentLib } from 'lib/models';

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
		setUpParentsAdress();
	}, [state.studentData.livesWith.value]);

	useEffect(() => {
		const postStudent = async () => {
			if (state._idStudent === undefined) {
				const response = await studentLib.createStudent(state.studentData);
				console.log({ response }); //@todo: pasarle el studentId para que el proximo save sea un patch
				setStudentId(response);
			}
			if (state._idStudent) {
				await studentLib.updateStudent(state._idStudent, state.studentData);
			}
		};
		if (state.postStudentData) {
			postStudent();
		}
		return () => {
			dispatch({ type: 'postStudentData', payLoad: false });
		};
	}, [state.postStudentData]);

	const setStudentId = params => {
		if (params.status === 200 && params.data._id) {
			dispatch({ type: 'set_idStudent', payLoad: params.data._id });
		}
	};

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
					<ParentPersonalData
						adressEditable={state.motherAdressEditable}
						parentData={state.motherData}
						screenName={'motherPersonalData'}
						parentType={'mother'}
						dispatchData={getData}
					/>
				</TabContainer>
			)}
			{value === 2 && (
				<TabContainer>
					<ParentPersonalData
						adressEditable={state.fatherAdressEditable}
						parentData={state.fatherData}
						screenName={'fatherPersonalData'}
						parentType={'father'}
						dispatchData={getData}
					/>
				</TabContainer>
			)}
			{value === 3 && <TabContainer>Health DataC</TabContainer>}
			{value === 4 && <TabContainer>Contact NumbersS</TabContainer>}
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
