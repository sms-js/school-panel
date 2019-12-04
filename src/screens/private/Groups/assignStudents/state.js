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
		// show --------------------------------------------------------------
		case 'displayMenu1':
			return { ...state, displayMenu1: action.payLoad };
		case 'displayMenu2':
			return { ...state, displayMenu2: action.payLoad };
		case 'displayMenu3':
			return { ...state, displayMenu3: action.payLoad };
		case 'displayMenu4':
			return { ...state, displayMenu4: action.payLoad };
		case 'showStudents':
			return { ...state, showStudents: action.payLoad };
		case 'showTransferElement':
			return { ...state, showTransferElement: action.payLoad };
		case 'hideSelectors':
			return {
				...state,
				displayMenu1: false,
				displayMenu2: false,
				displayMenu3: false,
				displayMenu4: false,
				showTransferElement: false
			};
		//set ----------------------------------------------------------------
		case 'setIncomingStudents':
			return { ...state, incomingStudents: action.payLoad };
		case 'setStudents':
			return { ...state, students: action.payLoad };
		case 'setGrade':
			return { ...state, grade: action.payLoad };
		case 'setOriginGroup':
			return { ...state, originGroupCode: action.payLoad };
		case 'setDestinationGroup':
			return { ...state, destinationId: action.payLoad };
		case 'setDestinationGroups':
			return { ...state, destinationGroups: action.payLoad };
		//default ------------------------------------------------------------
		default:
			return state;
	}
};

export { reducer, getInitialState };
