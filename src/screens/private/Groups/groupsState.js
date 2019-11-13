const getInitialState = () => {
	return {
		displayMenu1: false,
		displayMenu2: false,
		displayMenu3: false,
		displayMenu4: false,
		showStudents: false
	};
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'displayMenu1':
			return { ...state, displayMenu1: action.payLoad };
		case 'displayMenu2':
			return { ...state, displayMenu2: action.payLoad };
		case 'displayMenu3':
			return { ...state, displayMenu3: action.payLoad };
		case 'displayMenu4':
			return { ...state, displayMenu4: action.payLoad };
		case 'setStudentIsNew':
			return { ...state, incomingStudent: action.payLoad };
		case 'setStudents':
			return { ...state, students: action.payLoad };
		case 'showStudents':
			return { ...state, showStudents: action.payLoad };
		case 'setGrade':
			return { ...state, grade: action.payLoad };
		case 'setOriginGroup':
			return { ...state, originGroup: action.payLoad };
		case 'setDestinationGroup':
			return { ...state, destinationGroup: action.payLoad };
		case 'hideSelectors':
			return {
				...state,
				displayMenu1: false,
				displayMenu2: false,
				displayMenu3: false,
				displayMenu4: false
			};
		default:
			return state;
	}
};

export { reducer, getInitialState };
