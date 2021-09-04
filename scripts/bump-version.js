const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

// get unit where $0=node, $1=bump-version.js, $2={major|minor|patch}
const unit = process.argv[2];

// validate unit
if (!/^major|minor|patch/i.test(unit)) {
	console.log('$1 must be "major", "minor" or "patch"');
	process.exit(1);
}
// build paths
const packageJsonPath = path.resolve(__dirname, '../package.json');
const readmePath = path.resolve(__dirname, '../README.md');
// read file contents
const packageJson = fs.readFileSync(packageJsonPath, 'utf8');
const readme = fs.readFileSync(readmePath, 'utf8');
// read current version
const packageData = JSON.parse(packageJson);
const oldVersionString = packageData.version;
if (!/^(\d+)\.(\d)+\.(\d+)$/.test(oldVersionString)) {
	console.log(
		`version in package.json must contain major, minor, and patch. Value was "${oldVersionString}"`
	);
	process.exit(1);
}
const [major, minor, patch] = oldVersionString.split('.');
let newMajor = major;
let newMinor = minor;
let newPatch = patch;
// bump version
if (unit === 'major') {
	newMajor = parseInt(major, 10) + 1;
	newMinor = 0;
	newPatch = 0;
} else if (unit === 'minor') {
	newMinor = parseInt(minor, 10) + 1;
	newPatch = 0;
} else if (unit === 'patch') {
	newPatch = parseInt(patch, 10) + 1;
}
// prepare replacement
const oldVersionRegExp = new RegExp(`${major}\\.${minor}\\.${patch}`, 'g');
const newVersionString = `${newMajor}.${newMinor}.${newPatch}`;
console.log(`Bumping version from ${oldVersionString} to ${newVersionString}`);
// update file contents
const newPackageJson = packageJson.replace(oldVersionRegExp, newVersionString);
const newReadme = readme.replace(oldVersionRegExp, newVersionString);
console.log(`Saving ${packageJsonPath}`);
fs.writeFileSync(packageJsonPath, newPackageJson, 'utf8');
console.log(`Saving ${readmePath}`);
fs.writeFileSync(readmePath, newReadme, 'utf8');
// update package-lock
console.log('Updating package-lock.json');
execSync('npm i');
// build browser bundle
console.log('Building dist/browser-bundle.js');
execSync('npm run build');
// yay
console.log('DONE');
