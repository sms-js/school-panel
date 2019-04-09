import {
	API_DOMAIN,
	LOGIN_URL,
	PROFILE_URL,
	RECOVERPASSWORD_URL,
	GENERATENEWPASSWORD_URL,
	VALIDATETOKEN_URL
} from 'config';
import axios from 'axios';
import { checkStatus } from './validators/response';
import { validLoginResponse } from './validators/user';

const api = axios.create({ baseURL: API_DOMAIN });

/**
 * Set the received JWT token
 *
 * @param {string} AUTH_TOKEN
 */
export const setToken = (AUTH_TOKEN) => {
	if (AUTH_TOKEN) {
		api.defaults.headers.common['Authorization'] = AUTH_TOKEN;
		return;
	}
	delete api.defaults.headers.common['Authorization'];
};

/**
 * Method used only to test JWT token
 *
 * @param {string} userId
 */
export const testAuthenticatedRequest = async (userId) => {
	try {
		const response = await api.get(`${PROFILE_URL}${userId}`);
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
 * Logins the user with the received credentials
 *
 * @param {string} username
 * @param {string} password
 */
export const login = async (username, password) => {
	try {
		const response = await api.post(LOGIN_URL, { username, password });
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
 * Update the user data
 *
 * @param {object} data
 */
export const updateProfile = async (id, data) => {
	try {
		const response = await api.patch(`${PROFILE_URL}${id}`, data);
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
 * Request email with validated link to generate a new password
 *
 * @param {string} emailadress
 */
export const recoverpassword = async (email) => {
	try {
		const response = await api.post(RECOVERPASSWORD_URL, { email });
		console.log(response);
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
 * Send user's defined new password
 *
 * @param {string} password
 */
export const generatenewpassword = async (params) => {
	try {
		console.log('api-client, password = ', params);
		let targetURL = GENERATENEWPASSWORD_URL + '?auth_token=' + params.token;
		delete params.token;
		const response = await api.post(targetURL, params);
		if (!checkStatus(response)) {
			throw new Error('invalid password change process');
		}
		return response.data;
	} catch (error) {
		console.debug(error);
		return false;
	}
};

export const validateToken = async (params) => {
	try {
		let targetURL = VALIDATETOKEN_URL + '?auth_token=' + params.token;
		const response = await api.post(targetURL);
		if (!checkStatus(response)) {
			throw new Error('invalid password change process');
		}
		return response.data;
	} catch (error) {
		console.debug(error);
		return false;
	}
};

export default api;
