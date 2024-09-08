const { DateTime, FixedOffsetZone } = require('luxon');
const parser = require('../index.js');

function testDates({ name, formats, expected, locales }) {
	for (const locale of locales) {
		describe(`${name} (${locale})`, () => {
			for (const format of formats) {
				const luxonObj = { ...expected };
				if (typeof luxonObj.offset === 'number') {
					luxonObj.zone = FixedOffsetZone.instance(expected.offset);
					luxonObj.offset = undefined;
				}
				const date = DateTime.fromObject(luxonObj);
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
