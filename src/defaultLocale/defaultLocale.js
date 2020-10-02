let defaultLocale = 'en-US';
if (typeof navigator !== 'undefined') {
	const nav = navigator;
	defaultLocale = Array.isArray(nav.languages)
		? nav.languages[0]
		: nav.language;
} else if (typeof process !== 'undefined') {
	const env = process.env;
	defaultLocale = env.LC_ALL || env.LC_MESSAGES || env.LANG || env.LANGUAGE;
}

module.exports = defaultLocale;
