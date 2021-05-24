/**
 * Given a locale string from an operating system or process env, normalize the name
 * @param {String} name  A name such as fr_FR, en-US, en-us.utf-8
 * @returns {String}
 * @see https://github.com/sindresorhus/os-locale/blob/main/index.js for similar code
 */
function normalizeLocale(name) {
	// some systems use underscores
	name = name.replace(/_/g, '-');
	// some systems append strings like .UTF-8
	name = name.replace(/[.:][\w-]*$/, '');
	try {
		return new Intl.Locale(name).baseName;
	} catch (e) {
		return 'en-US';
	}
}

module.exports = normalizeLocale;
