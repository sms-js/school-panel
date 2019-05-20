import api from 'lib/api';
import { checkStatus } from 'lib/validators/response';
import { TAGS_URL,MESSAGES_URL } from 'config';

//TAGS_URL = tags/

/**
 * POST a tag
 * @param {object} search
 * params = {} or undefined ->  api return all messages with status true
 * params = { _id: "54dfas5df44sd5f4asdf", status: true[false] }; -> API returns requested message if match exists
 * params = {status: true[false] } -> API returns all messages with requested status
 *  */

export const postTag = async (params) => {
	try {
		const response = await api.post(`${TAGS_URL}posttag`, { params });
		console.log('tagsLib / POST tag / response = ', response);
		if (!checkStatus(response)) {
			throw new Error('invalid credentials');
		}
		return response.data;
	} catch (error) {
		console.debug(error);
		return false;
	}
};

export const getTags = async (params = {"status":true,"orSearch":false}) => {
	try {
		const response = await api.get(`${TAGS_URL}gettags`, { params } );
		if (!checkStatus(response)) {
			throw new Error('invalid credentials');
		}
		return response.data;
	} catch (error) {
		console.debug(error);
		return false;
	}
};

export const updateMessage = async (params) => {
	try {
		const response = await api.patch(`${MESSAGES_URL}updatemessage`, { params } );
		if (!checkStatus(response)) {
			throw new Error('invalid credentials');
		}
		return response.data;
	} catch (error) {
		console.debug(error);
		return false;
	}
};

