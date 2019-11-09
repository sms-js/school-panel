import { studentFields, fatherFields, motherFields } from './personalDataFields';

const getInitialState = () => {
	return {
		studentData: { ...studentFields },
		motherData: { ...motherFields },
		fatherData: { ...fatherFields },
		postStudentData: false
	};
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'set_idStudent':
			return {...state,_idStudent:action.payLoad}
		case 'postStudentData':
			return { ...state, postStudentData: action.payLoad };
		case 'setStudentData':
			return { ...state, studentData: { ...state.studentData, ...action.payLoad } };
		case 'motherAdressEditable':
			return { ...state, motherAdressEditable: action.payLoad };
		case 'fatherAdressEditable':
			return { ...state, fatherAdressEditable: action.payLoad };
		case 'setMotherAdress':
			const { streetName, houseNr, floorNr, flatNr, zipCode } = action.payLoad;
			return { ...state, motherData: { ...state.motherData, streetName, houseNr, floorNr, flatNr, zipCode } };
		case 'setFatherAdress':
			return {
				...state,
				fatherData: {
					...state.fatherData,
					streetName: action.payLoad.streetName,
					houseNr: action.payLoad.houseNr,
					floorNr: action.payLoad.floorNr,
					flatNr: action.payLoad.flatNr,
					zipCode: action.payLoad.zipCode
				}
			};
		default:
			return state;
	}
};

export { reducer, getInitialState };
