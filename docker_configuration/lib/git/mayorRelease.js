const release = require('./release');

console.info('[lib/git/mayorRelease, main] Updating package.json and main html MAYOR version number');

release.upgrade(release.types.MAYOR);

process.exit();
