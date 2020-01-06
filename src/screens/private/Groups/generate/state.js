const getInitialState = () => {
	return {
		disableMenu1: true,
		disableMenu2: true,
		disableMenu3: true,
		disableMenu4: true,
		disableSaveButton: true,
		displaySuccessMessage: false,
		displayErrorMessage: false,
		successMsg: 'Sucess: Group has been created',
		errorMsg: 'Error: Group could not be created',
		groupsTemplates: [],
		year: 'notAssigned',
		grade: 'notAssigned',
		selectedGroupTemplate: 'notAssigned'
	};
};

const reducer = (state, action) => {
	switch (action.type) {
		// show --------------------------------------------------------------
		case 'disableMenu1':
			return { ...state, disableMenu1: action.payLoad };
		case 'disableMenu2':
			return { ...state, disableMenu2: action.payLoad };
		case 'disableMenu3':
			return { ...state, disableMenu3: action.payLoad };
		case 'disableMenu4':
			return { ...state, disableMenu4: action.payLoad };
		case 'displaySuccessMessage':
			return { ...state, displaySuccessMessage: action.payLoad };
		case 'displayErrorMessage':
			return { ...state, displayErrorMessage: action.payLoad };
		case 'disableAll':
			return {
				...state,
				disableMenu1: true,
				disableMenu2: true,
				disableMenu3: true,
				disableMenu4: true,
				displaySuccessMessage: false,
				displayErrorMessage: false
			};
		case 'hideMessages':
			return {
				...state,
				displaySuccessMessage: false,
				displayErrorMessage: false
			};
		//set ----------------------------------------------------------------
		case 'setYear':
			return { ...state, year: action.payLoad };
		case 'setGrade':
			return { ...state, grade: action.payLoad };
		case 'setTemplates':
			return { ...state, groupsTemplates: action.payLoad };
		case 'setSelectedGroupTemplate':
			return { ...state, selectedGroupTemplate: action.payLoad };

		//disable ------------------------------------------------------------
		case 'disableSaveButton':
			return { ...state, disableSaveButton: action.payLoad };
		//default ------------------------------------------------------------
		default:
			return state;
	}
};

export { reducer, getInitialState };
