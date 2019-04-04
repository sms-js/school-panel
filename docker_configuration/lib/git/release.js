const fs = require('fs');

const types = {
	MINOR: 'MINOR',
	MAYOR: 'MAYOR',
	PATCH: 'PATCH'
};

const PACKAGE_VERSION_REGEX = /\"[\d]+\.[\d]+\.[\d]+\"/;
const HTML_VERSION_REGEX = /WHATSAPP PANEL V[\d]+\.[\d]+\.[\d]+/;

const ROOT = __dirname.replace('lib/git', '');
const PACKAGE_FILE = `${ROOT}package.json`;
const HTML_FILE = `${ROOT}client/templates/main/index.html`;

const getVersionNumber = (file, data, regex, type) => {
	const version = data.match(regex);
	if (!Array.isArray(version) || typeof version[0] != 'string') {
		const error = `No version number found at ${file}`;
		console.error(`[lib/git/release, getVersionNumberArray] error:  ${error}`);
		return process.exit(error);
	}
	return type === 'PACKAGE' ? version[0].split('"').join('') : version[0].replace('WHATSAPP PANEL V', '');
};

const getReplacement = (version, type) => {
	const versionArray = version.split('.');
	if (type === types.PATCH) versionArray[2] = parseInt(versionArray[2]) + 1;
	else if (type === types.MINOR) {
		versionArray[1] = parseInt(versionArray[1]) + 1;
		versionArray[2] = 0;
	} else if (type === types.MAYOR) {
		versionArray[0] = parseInt(versionArray[0]) + 1;
		versionArray[1] = 0;
		versionArray[2] = 0;
	}
	return versionArray.join('.');
};

exports.types = types;

exports.upgrade = async type => {
	if (!types[type]) {
		console.error(`[lib/git/release, upgrade] Invalid release type:  ${type}`);
		return process.exit(`Invalid release type: ${type}`);
	}
	try {
		let PACKAGE_DATA = fs.readFileSync(PACKAGE_FILE).toString('utf8');
		const JSON_VERSION_NUMBER = getVersionNumber(PACKAGE_FILE, PACKAGE_DATA, PACKAGE_VERSION_REGEX, 'PACKAGE');
		let HTML_DATA = fs.readFileSync(HTML_FILE).toString('utf8');
		const HTML_VERSION_NUMBER = getVersionNumber(HTML_FILE, HTML_DATA, HTML_VERSION_REGEX, 'HTML');
		const REPLACEMENT = getReplacement(JSON_VERSION_NUMBER, type);
		console.info(`[lib/git/release, upgrade] Info: {
  JSON VERSION NUMBER FOUND: ${JSON_VERSION_NUMBER},
  HTML VERSION NUMBER FOUND: ${HTML_VERSION_NUMBER},
  REPLACEMENT: ${REPLACEMENT}
}`);
		PACKAGE_DATA = PACKAGE_DATA.replace(JSON_VERSION_NUMBER, REPLACEMENT);
		HTML_DATA = HTML_DATA.replace(HTML_VERSION_NUMBER, REPLACEMENT);
		fs.writeFileSync(PACKAGE_FILE, PACKAGE_DATA);
		fs.writeFileSync(HTML_FILE, HTML_DATA);
		console.info(`[lib/git/release, upgrade] version updated to ${REPLACEMENT}`);
		return;
	} catch (error) {
		console.error(error);
		return process.exit(error);
	}
};
