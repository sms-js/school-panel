const release = require('./release');

console.info('[lib/git/patchRelease, main] Updating package.json and main html PATCH version number');

release.upgrade(release.types.PATCH);

process.exit();
