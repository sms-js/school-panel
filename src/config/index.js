// IF U R IN DEV MODE API_DOMAIN IS SET IN DEV.ENV
let API_DOMAIN = process.env.REACT_APP_API_DOMAIN || 'https://api.whatsapp.khem.io/';

// Check if the last index is a /, if not add it:
if (API_DOMAIN.substr(API_DOMAIN.length - 1) !== '/') {
	API_DOMAIN = `${API_DOMAIN}/`;
}

const API_PREFIX = 'api/v1/';

const API_URL = `${API_DOMAIN}api/v1/`;

const LOGIN_URL = 'users/login'; // axios baseURL is ${API_DOMAIN}

const USER_URL = `${API_PREFIX}User/`; // axios baseURL is ${API_DOMAIN}

const MESSAGES_URL = `messages/`;
const TAGS_URL = `tags/`;

const PROFILE_URL = `${API_PREFIX}User/`; // axios baseURL is ${API_DOMAIN}

const RECOVERPASSWORD_URL = `auth/recovery/email/`; // axios baseURL is ${API_DOMAIN}

const GENERATENEWPASSWORD_URL = `auth/recovery/password`; // axios baseURL is ${API_DOMAIN}

const VALIDATETOKEN_URL = `auth/recovery/valid`; // axios baseURL is ${API_DOMAIN}

const SESSION_STORAGE_KEY = 'session';

export {
	API_DOMAIN,
	API_PREFIX,
	API_URL,
	LOGIN_URL,
	PROFILE_URL,
	SESSION_STORAGE_KEY,
	USER_URL,
	RECOVERPASSWORD_URL,
	GENERATENEWPASSWORD_URL,
	VALIDATETOKEN_URL,
	MESSAGES_URL,
	TAGS_URL
};
