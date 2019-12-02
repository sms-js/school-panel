import api from 'lib/api';
import { checkStatus } from 'lib/validators/response';
import { SCHOOL_URL, GROUPS_URL, STUDENT_URL } from 'config';

/**
 * Get GroupsTemplates
 *
 * @param {object} params

 **/
export const getGroupTemplates = async grade => {
	try {
		const response = await api.get(`${GROUPS_URL}templates/${grade}`);
		if (!checkStatus(response)) {
			throw new Error('invalid credentials');
		}
		return response.data;
	} catch (error) {
		console.debug(error);
		return false;
	}
};

export const getGroups = async grade => {
	try {
		const response = await api.get(`${GROUPS_URL}${grade}`);
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
 * get INCOMING Students for group building
 * @param {object} params
 * params = {incomingStudent,grade};
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

export const createGroup = async params => {
	try {
		const response = await api.post(`${GROUPS_URL}`, params);
		if (!checkStatus(response)) {
			throw new Error('invalid credentials');
		}
		return response.data;
	} catch (error) {
		return false;
	}
};
