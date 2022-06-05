const defaultLocale = require('../data/defaultLocale.js');
const removeFillerWords = require('../removeFillerWords/removeFillerWords.js');

function fromString(parser, defaultLocale) {
	return function fromStringFunction(string, locale = defaultLocale) {
		// let effectiveLocale = locale;
		// const bounds = {
		// 	lower: '0001-01-01T00:00:00',
		// 	upper: '9999-12-31T23:59:59',
		// 	inclusive: true,
		// 	strict: false,
		// };
		// if (typeof locale === 'object') {
		// 	effectiveLocale = locale.locale || defaultLocale;
		// 	Object.assign(bounds, locale.bounds || {});
		// }
		// string = removeFillerWords(String(string), locale).trim();
		// const matches = this.getMatches(string, locale);
		// if (matches) {
		// 	const dt = this.toDateTime(matches, locale);
		// 	const dtDate = this.dt
		// 	if (dtDate instanceof Date && !this.isInRange(dtDate, bounds) && bounds.strict) {
		// 		const inclusive = bounds.inclusive ? 'inclusive' : 'not inclusive';
		// 		return { invalid: `Date not in range ${bounds.lower} to ${bounds.upper} ${inclusive}`, bounds };
		// 	}
		// 	return dt || null;
		// }
		// return null;

		const parsed = parser.attempt(string, locale);
		if (parsed.invalid) {
			return parsed;
		}
		const date = new Date();
		// default to current year, month and day
		if (typeof parsed.year === 'number') {
			date.setUTCFullYear(parsed.year);
		}
		if (typeof parsed.month === 'number') {
			date.setUTCMonth(parsed.month - 1);
		}
		if (typeof parsed.day === 'number') {
			date.setUTCDate(parsed.day);
		}
		// default to first unit for time components
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
