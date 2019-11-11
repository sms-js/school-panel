import api from 'lib/api';
import { checkStatus } from 'lib/validators/response';
import { STUDENT_URL, USER_URL, PARENT_URL, SCHOOL_URL } from 'config';

// START: ADAPTING USER LIB TO STUDENT LIB ==========================

/**
 * Create student
 *
 * @param {string} id
 * @param {object} data
 */
export const createStudent = async data => {
	try {
		//if (!data.type) data.type = 'student';
		const response = await api.post(STUDENT_URL, data);
		if (!checkStatus(response)) {
			throw new Error('invalid credentials');
		}
		return response;
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
export const updateStudent = async (id, data) => {
	try {
		const response = await api.patch(`${STUDENT_URL}${id}`, data);
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
 * Create parent
 *
 * @param {string} id
 * @param {object} data
 */
export const createParent = async data => {
	try {
		if (!data.type) data.type = 'parent';
		const response = await api.post(PARENT_URL, data);
		if (!checkStatus(response)) {
			throw new Error('invalid credentials');
		}
		return data;
	} catch (error) {
		console.debug(error);
		return false;
	}
};

// END: ADAPTING USER LIB TO STUDENT LIB ============================

/**
 * Get users
 *
 * @param {object} search
 */
export const getUsers = async (search = {}) => {
	try {
		const response = await api.get(`${USER_URL}`);
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
export const getUser = async id => {
	try {
		const response = await api.get(`${USER_URL}${id}`);
		if (!checkStatus(response)) {
			throw new Error('invalid credentials');
		}
		return response.data;
	} catch (error) {
		console.debug(error);
		return false;
	}
};

export const deleteUser = async id => {
	try {
		const response = await api.delete(`${USER_URL}${id}`);
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
 * Update the user data
 *
 * @param {string} id
 * @param {object} data
 */
export const updateUser = async (id, data) => {
	try {
		const response = await api.patch(`${USER_URL}${id}`, data);
		if (!checkStatus(response)) {
			throw new Error('invalid credentials');
		}
		return data;
	} catch (error) {
		console.debug(error);
		return false;
	}
};
