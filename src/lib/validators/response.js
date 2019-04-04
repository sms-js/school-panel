/**
 * Checks if the request response is valid
 *
 * @param {object} response
 */
export const checkStatus = response => {
	// raises an error in case response status is not a success
	if (response.status >= 200 && response.status < 300) {
		// Success status lies between 200 to 300
		return response;
	}
	var error = new Error(response.statusText);
	error.response = response;
	throw error;
};
