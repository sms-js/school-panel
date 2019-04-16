import api from 'lib/api';
import { checkStatus } from 'lib/validators/response';
import { MESSAGES_URL } from 'config';
//MESSAGES_URL = mdata/
/**
 * Get Messages
 *
 * @param {object} search
 * params = {} or undefined ->  api return all messages with status true
 * params = { _id: "54dfas5df44sd5f4asdf", status: true[false] }; -> API returns requested message if match exists
 * params = {status: true[false] } -> API returns all messages with requested status
 *  */
export const getMessages = async (params = {}) => {
	try {
		const response = await api.get(`${MESSAGES_URL}getmessage`, { params } );
		if (!checkStatus(response)) {
			throw new Error('invalid credentials');
		}
		return response.data;
	} catch (error) {
		console.debug(error);
		return false;
	}
};

/**
 * Get user data
 *
 * @param {string} id
 */
export const getUser = async (id) => {
	try {
		const response = await api.get(`${MESSAGES_URL}${id}`);
		if (!checkStatus(response)) {
			throw new Error('invalid credentials');
		}
		return response.data;
	} catch (error) {
		console.debug(error);
		return false;
	}
};

export const deleteUser = async (id) => {
	try {
		const response = await api.delete(`${MESSAGES_URL}${id}`);
		if (!checkStatus(response)) {
			throw new Error('invalid credentials');
		}
		return true;
	} catch (error) {
		console.debug(error);
		return false;
	}
};

/**
 * Create user
 *
 * @param {string} id
 * @param {object} data
 */
export const createUser = async (data) => {
	try {
		if (!data.type) data.type = 'admin';
		const response = await api.post(MESSAGES_URL, data);
		if (!checkStatus(response)) {
			throw new Error('invalid credentials');
		}
		return data;
	} catch (error) {
		console.debug(error);
		return false;
	}
};

/**
 * Update the user data
 *
 * @param {string} id
 * @param {object} data
 */
export const updateUser = async (id, data) => {
	try {
		const response = await api.patch(`${MESSAGES_URL}${id}`, data);
		if (!checkStatus(response)) {
			throw new Error('invalid credentials');
		}
		return data;
	} catch (error) {
		console.debug(error);
		return false;
	}
};
