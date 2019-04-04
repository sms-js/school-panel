import { isObject, isString, keyIsObject, isBoolean } from 'lib/validators/types';

export const validateUserRules = (user = {}) => keyIsObject(user, 'rules');

export const validUser = (user = {}) => {
	return (
		isObject(user) &&
		isString(user._id) &&
		isString(user.username) &&
		isString(user.first_name) &&
		isString(user.last_name) &&
		isString(user.status, ['isactive', 'inactive']) &&
		isString(user.type) &&
		isObject(user.rules)
	);
};

export const validLoginResponse = (response = {}) => {
	//{"success":true,"token":"JWT_TOKEN","_id":"USER_ID","username":"admin","first_name":"admin","last_name":"admin","status":"isactive","type":"admin","rules":{"Entity":{"delete":true,"update":true,"create":true,"read":true,"list":true},"Category":{"delete":true,"update":true,"create":true,"read":true,"list":true},"User":{"delete":true,"update":true,"create":true,"read":true,"list":true}}}
	return (
		keyIsObject(response, 'data') &&
		isBoolean(response.data.success) &&
		isString(response.data.token) &&
		validUser(response.data)
	);
};
