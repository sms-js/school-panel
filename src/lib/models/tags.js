import api from 'lib/api';
import { checkStatus } from 'lib/validators/response';
import { TAGS_URL, MESSAGES_URL } from 'config';

//TAGS_URL = tags/

/**
 * POST a tag
 * @param {object} params
 * tags with autoAssignTagToIncomingMessage=true MUST have a startDate and endDate to be automatically assigned to incoming Messages, if the assignment condition gets fulfilled.
 * params= {
 * title:String,
 * [startDate:ISODate,]
 * [endDate:ISODate,]
 * [status: true [|false],]
 * [parentTag:ObjectId,]
 * [codeWord:String,]
 * [autoAssignTagToIncomingMessage:true|false]}
 *  */

export const postTag = async params => {
	try {
		const response = await api.post(`${TAGS_URL}`, params);
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

/**
 * GET tags: default search is set to status true 
 * @param {object} params
 * Tags can be searched by: startDate, endDate, status, title, codeWord.
 * All params props are optional.
 * Default search is an $and search with params={status:true, orSearch:false} 
 * To generate an $or search a params.orSearch must be true
 * params={
	[startDate:ISODate,]
	[endDate:ISODate,]
	[title:String,]
	[codeWord:String,]
	[status:true|false,]
	[orSearch:true|false,]
	[autoAssignTagToIncomingMessage:true|false,]
} 
 */
export const getTags = async (params = { status: true, orSearch: false }) => {
	try {
		const response = await api.get(`${TAGS_URL}`, { params });
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
 * Update Tag
 * @param {object} params
 * params ={should have all tag properties}
 */
export const updateTag = async params => {
	try {
		const response = await api.patch(`${TAGS_URL}${params._id}`, params);
		if (!checkStatus(response)) {
			throw new Error('invalid credentials');
		}
		return response.data;
	} catch (error) {
		console.debug(error);
		return false;
	}
};
