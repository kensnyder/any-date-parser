const parser = require('../index.js');

function testParser({ name, expected, locales, dates }) {
	describe(name, () => {
		locales.forEach(locale => {
			dates.forEach(date => {
				it(`should handle "${date}" (${locale})`, () => {
					const actual = parser.attempt(date);
					expect(actual).toEqual(expected);
				});
			});
		});
	});
}

module.exports = testParser;
