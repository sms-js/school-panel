const getInitialState = () => ({
	studentData: {}
});

const reducer = (state, action) => {
	switch (action.type) {
		case 'setStudentData':
			return { ...state, studentData: { ...state.studentData, ...action.payLoad } };
		default:
			return state;
	}
};

export { reducer, getInitialState };
