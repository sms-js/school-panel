import { studentFields, fatherFields, motherFields, healthData } from './Content/personalDataFields';

const getInitialState = () => {
	return {
		studentData: { ...studentFields },
		motherData: { ...motherFields },
		fatherData: { ...fatherFields },
		healthData: { ...healthData },
		postStudentData: false,
		profileError: false,
		successMsg: false
	};
};

const reducer = (state, action) => {
	switch (action.type) {
		//HEALTH DATA
		case 'company':
			const company = {
				...state.healthData.company,
				value: action.payLoad
			};
			return { ...state, healthData: { ...state.healthData, company } };
		case 'affiliateNumber':
			const affiliateNumber = {
				...state.healthData.affiliateNumber,
				value: action.payLoad
			};
			return { ...state, healthData: { ...state.healthData, affiliateNumber } };
		case 'allergies':
			const allergies = {
				...state.healthData.allergies,
				value: action.payLoad
			};
			return { ...state, healthData: { ...state.healthData, allergies } };

		case 'serverError':
			return { ...state, profileError: action.payLoad };
		case 'setSucessMsg':
			return { ...state, successMsg: action.payLoad };
		case 'set_idStudent':
			return { ...state, _idStudent: action.payLoad };
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
