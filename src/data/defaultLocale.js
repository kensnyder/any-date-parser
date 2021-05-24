const normalizeLocale = require('./normalizeLocale.js');

let defaultLocale;
/* istanbul ignore next */
if (typeof navigator !== 'undefined') {
	// browser: locale is on navigator object
	const nav = navigator;
	defaultLocale = Array.isArray(nav.languages)
		? nav.languages[0]
		: nav.language;
} else if (typeof process !== 'undefined') {
	// node: locale is an env var
	const env = process.env;
	defaultLocale = env.LC_ALL || env.LC_MESSAGES || env.LANG || env.LANGUAGE;
}
/* istanbul ignore next */
if (!defaultLocale) {
	defaultLocale = 'en-US';
}

module.exports = normalizeLocale(defaultLocale);
