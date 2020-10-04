const { DateTime } = require('luxon');
const localeList = require('./localeList.js');
const parser = require('../index.js');

// function testDates({ name, expected, locales, dates }) {
// 	describe(name, () => {
// 		locales.forEach(locale => {
// 			dates.forEach(date => {
// 				it(`should handle "${date}" (${locale})`, () => {
// 					const actual = parser.attempt(date);
// 					expect(actual).toEqual(expected);
// 				});
// 			});
// 		});
// 	});
// }

function testDates({ name, formats, expected, locales }) {
	for (const locale of locales || localeList) {
		describe(`${name} (${locale})`, () => {
			for (const format of formats) {
				const date = DateTime.fromObject(expected);
				const formatted = date.toFormat(format, { locale });
				it(`${formatted} (${format})`, () => {
					const actual = parser.attempt(formatted, locale);
					expect(actual).toMatchObject(expected);
				});
			}
		});
	}
}

module.exports = testDates;
