import { getJSONOrValue, isObject } from 'lib/validators/types';

/**
 * Local or session storage wrapper
 */
class storageLib {
	/**
	 * Local or session storage wrapper
	 *
	 * @param {string} type Type of storage (local or session)
	 */
	constructor(type) {
		this.type = type;
	}

	storage = {
		local: localStorage,
		session: sessionStorage
	};

	/**
	 * Returns the name of the nth key in the list, or null if n is greater
	 * than or equal to the number of key/value pairs in the object.
	 *
	 * @param {string} key
	 * @param {function} validator if received it will return null if validation fails
	 *
	 * @returns {any}
	 */
	getItem = (key, validator) => {
		let value = this.storage[this.type].getItem(key);
		if (!value) return null;
		value = getJSONOrValue(value);
		if (validator) return validator(value) ? value : null;
		return value;
	};

	setItem = (key, value) => {
		if (!value) throw new Error('cannot save empty value to storage');
		if (isObject(value)) value = JSON.stringify(value);
		this.storage[this.type].setItem(key, value);
	};

	removeItem = key => this.storage[this.type].removeItem(key);
}

export default storageLib;
