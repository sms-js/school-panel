import { API_DOMAIN, LOGIN_URL, PROFILE_URL } from 'config';
import axios from 'axios';
import { checkStatus } from './validators/response';
import { validLoginResponse } from './validators/user';

const api = axios.create({ baseURL: API_DOMAIN });

/**
 * Set the received JWT token
 *
 * @param {string} AUTH_TOKEN
 */
export const setToken = AUTH_TOKEN => {
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
export const testAuthenticatedRequest = async userId => {
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
		if (!checkStatus(response) || !validLoginResponse(response)) {
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

export default api;
