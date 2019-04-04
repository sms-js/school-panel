import React from 'react';
import { Redirect } from 'react-router-dom';
import { SESSION_STORAGE_KEY } from 'config';
import { validUser, validateUserRules } from './validators/user';
import { setToken } from './api';
import storageLib from 'lib/storageLib';
import rules from 'config/rules';
import { isString, isNotEmptyString, keyIsObject, keyisArray, keyExists, getJSONOrValue } from 'lib/validators/types';

// Create a storage object that saves data in the sessionStorage
const storage = new storageLib('session');

const validateSession = stored => {
	if (!stored || !stored.logged || !validUser(stored.user)) return false;
	setToken(`Bearer ${stored.token}`);
	return true;
};

export const storedSession = storage.getItem(SESSION_STORAGE_KEY, validateSession);

export const defaultSession = {
	logged: false,
	token: '',
	user: {}
};

export const getUser = session => {
	return {
		_id: session._id,
		username: session.username,
		first_name: session.first_name,
		last_name: session.last_name,
		status: session.status,
		type: session.type,
		rules: session.rules || []
	};
};

export const removeSession = () => {
	storage.removeItem(SESSION_STORAGE_KEY);
	setToken(null);
};

export const setSession = response => {
	const session = getSessionFromResponse(response);
	storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
	setToken(`Bearer ${response.token}`);
};

export const getSessionFromResponse = response => {
	const session = getJSONOrValue(response);
	if (!session || !validUser(session)) return null;
	return {
		logged: true,
		token: session.token,
		user: getUser(session)
	};
};

const ruleValidationFailed = (user, { name, actions }) => {
	if (!keyExists(user.rules, name)) return true;
	return actions.find(action => !keyExists(user.rules[name], action));
};

const validRule = (ruleName, user) => {
	return (
		// if ruleName is not received (component should be shown)
		!ruleName ||
		// Validate rules
		// Validate if the logged user has the rules object
		(validateUserRules(user) &&
			keyIsObject(rules, ruleName) &&
			keyisArray(rules[ruleName], 'rules') &&
			// If one rule fails, all validation fails
			!rules[ruleName].rules.find(rule => ruleValidationFailed(user, rule)))
	);
};

export const validateRules = (ruleNames, user) => {
	if (!ruleNames || isString(ruleNames, '*')) return true;
	if (isNotEmptyString(ruleNames)) return validRule(ruleNames, user);
	return !ruleNames.find(ruleName => !validRule(ruleName, user));
};

export const validateComponent = (Component, user, props = {}) => {
	return validateRules(props.rules || props.rule, user) ? <Component {...props} /> : <Redirect to="/unauthorized" />;
};
