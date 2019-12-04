import api from 'lib/api';
import { checkStatus } from 'lib/validators/response';
import { STUDENT_URL, USER_URL, PARENT_URL, SCHOOL_URL } from 'config';

//GET --------------------------------------------------------------------

/**
 * get INCOMING Students for group building
 * @param {object} params
 * params = {incomingStudents,grade};
 */
export const getIncomingStudentsForGroups = async params => {
	try {
		//if (!data.type) data.type = 'student';
		const response = await api.get(`${STUDENT_URL}groups`, { params });
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

//PATCH ------------------------------------------------------------------

/**
 * Update the user data
 *
 * @param {string} id
 * @param {object} data
 */
export const updateStudent = async (id, data) => {
	try {
		const response = await api.patch(`${STUDENT_URL}update/${id}`, data);
		if (!checkStatus(response)) {
			throw new Error('invalid credentials');
		}
		return data;
	} catch (error) {
		console.debug(error);
		return false;
	}
};

export const attachGroupToStudent = async data => {
	try {
		const response = await api.patch(`${STUDENT_URL}attachgroup`, data);
		if (!checkStatus(response)) {
			throw new Error('invalid PATCH params');
		}
	} catch (error) {
		console.debug(error);
		return false;
	}
};

//POST -------------------------------------------------------------------

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

// DELETE ----------------------------------------------------------------
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
