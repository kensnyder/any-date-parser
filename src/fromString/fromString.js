function fromString(parser, defaultLocale) {
	return function fromString(string, locale = defaultLocale) {
		const parsed = parser.attempt(string, locale);
		if (parsed.invalid) {
			return parsed;
		}
		const date = new Date();
		if (parsed.year) {
			date.setUTCFullYear(parsed.year);
		}
		date.setUTCMonth(parsed.month ? parsed.month - 1 : 0);
		date.setUTCDate(parsed.day || 1);
		date.setUTCHours(parsed.hour || 0);
		date.setUTCMinutes(parsed.minute || 0);
		date.setUTCSeconds(parsed.second || 0);
		date.setUTCMilliseconds(parsed.millisecond || 0);
		if (typeof parsed.offset === 'number') {
			return new Date(date - parsed.offset * 60 * 1000);
		}
		return date;
	};
}

module.exports = fromString;
