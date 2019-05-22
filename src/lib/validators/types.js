export const isUndefined = el => typeof el === 'undefined';

export const isNull = el => el === null;

export const isObject = el => !isNull(el) && typeof el === 'object';

export const isBoolean = (el, val) => typeof el === 'boolean' && (isUndefined(val) || el === val);

export const isNumber = (el, number) => typeof el === 'number' && (isUndefined(number) || el === number);

export const isBigger = (el, number) => isNumber(el) && isNumber(number) && el > number;

export const isSmaller = (el, number) => isNumber(el) && isNumber(number) && el < number;

export const isString = (el, str) =>
	typeof el === 'string' && (isUndefined(str) || (isString(str) && el === str) || isArray(str, el));

export const isEmptyString = el => isString(el, '');

export const isNotEmptyString = el => isString(el) && !isEmptyString(el);

export const isFunction = el => typeof el === 'function';

export const isArray = (el, isInArray) => Array.isArray(el) && (isUndefined(isInArray) || el.indexOf(isInArray) >= 0);

export const arrayIsNotEmpty = el => isArray(el) && el.length > 0;

export const hasKey = (el, keyName) => isObject(el) && keyName in el;

export const keyExists = hasKey;

export const keyIsObject = (el, keyName) => isObject(el) && isObject(el[keyName]);

export const keyIsBoolean = (el, keyName, val) => isObject(el) && isBoolean(el[keyName], val);

export const keyIsNumber = (el, keyName) => isObject(el) && isNumber(el[keyName]);

export const keyIsBigger = (el, keyName, number) => isObject(el) && isBigger(el[keyName], number);

export const keyIsSmaller = (el, keyName, number) => isObject(el) && isSmaller(el[keyName], number);

export const keyIsString = (el, keyName, str) => isObject(el) && isString(el[keyName], str);

export const keyIsEmptyString = (el, keyName) => isObject(el) && isEmptyString(el[keyName]);

export const keyIsNotEmptyString = (el, keyName) => isObject(el) && isNotEmptyString(el[keyName]);

export const keyisFunction = (el, keyName) => isObject(el) && isFunction(el[keyName]);

export const keyisArray = (el, keyName, isInArray) => isObject(el) && isArray(el[keyName], isInArray);

export const getJSONOrValue = el => {
	if (isString(el)) {
		try {
			return JSON.parse(el);
		} catch (e) {
			// do nothing
		}
	}
	return el;
};
