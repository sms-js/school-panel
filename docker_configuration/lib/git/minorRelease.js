const release = require('./release');

console.info('[lib/git/minorRelease, main] Updating package.json and main html MINOR version number');

release.upgrade(release.types.MINOR);

process.exit();
