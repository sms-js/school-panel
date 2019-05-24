import api from 'lib/api';
import { checkStatus } from 'lib/validators/response';
import { MESSAGES_URL } from 'config';

/**
 * Get Messages
 *
 * @param {object} params
 * params = {} or undefined ->  api return all messages with status true
 * params = { _id: "54dfas5df44sd5f4asdf", status: true[false] }; -> API returns requested message if match exists
 * params = {status: true[false] } -> API returns all messages with requested status
 **/
export const getMessages = async (params = {}) => {
	try {
		const response = await api.get(`${MESSAGES_URL}`, params);
		if (!checkStatus(response)) {
			throw new Error('invalid credentials');
		}
		return response.data;
	} catch (error) {
		console.debug(error);
		return false;
	}
};

export const updateMessage = async params => {
	try {
		const response = await api.patch(`${MESSAGES_URL}${params._id}`, params);
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
 * @param {object} params
 *
 * params={tags:["tagId","tagId",...], status:true|false}
 */
export const getMessagesByTagsAndStatus = async params => {
	try {
		console.log('test');
		const response = await api.get(`${MESSAGES_URL}search`,  params);
		console.log('test');
		if (!checkStatus(response)) {
			throw new Error('invalid credentials');
		}
		return response.data;
	} catch (error) {
		console.debug(error);
		return false;
	}
};