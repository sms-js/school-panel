import { defaultSession, getSessionFromResponse } from 'lib/session';

const reducer = (state, action) => {
	switch (action.type) {
		case 'add':
			return getSessionFromResponse(action.response);
		case 'updateUser':
			return { ...state, ...action.response };
		case 'logout':
			return defaultSession;
		default:
			throw new Error('Unexpected action');
	}
};

export default reducer;
