const parser = require('../src/index.js');
const localeList = require('../src/data/localeList.js');
const createJestMatcher = require('../src/createJestMatcher/createJestMatcher.js');
// const localeList = ['en-US', 'ar-SA'];

expect.extend({
	toMatchDate: createJestMatcher('yyyy-MM-dd'),
	toMatchDateTime: createJestMatcher('yyyy-MM-dd HH:mm:ssZZ'),
});

const noon = { hour: 12, minute: 0, second: 0, millisecond: 0 };
function testDates({ name, formats, expected, locales }) {
	for (const locale of locales || localeList) {
		describe(`${name} (${locale})`, () => {
			for (const format of formats) {
				const formatted = expectedDate.toFormat(format);
				it(`${formatted} (${format})`, () => {
					const parsedDate = DateTime.fromAny(formatted, { locale });
					const actual = parsedDate.toObject();
					expect(actual).toMatchObject(expected);
				});
			}
		});
	}
}
function xtestDates() {}

//
//
// testDates({
// 	name: 'year month day',
// 	expected: { year: 2020, month: 12, day: 31 },
// 	locales: ['en-US'],
// 	formats: ['yyyy-MM-dd', 'yyyyMMdd'],
// });
//
// testDates({
// 	name: 'year month day with 24h time and milliseconds',
// 	expected: {
// 		year: 2020,
// 		month: 2,
// 		day: 3,
// 		hour: 19,
// 		minute: 58,
// 		second: 47,
// 		millisecond: 99,
// 	},
// 	locales: ['en-US'],
// 	formats: [
// 		"yyyy-MM-dd'T'HH:mm:ss.SSS",
// 		'yyyy-MM-dd HH:mm:ss.SSS',
// 		'yyyy-MM-dd HH:mm:ss,SSS',
// 	],
// });
//
// testDates({
// 	name: 'year month day with 24h time and seconds',
// 	expected: {
// 		year: 2020,
// 		month: 2,
// 		day: 3,
// 		hour: 23,
// 		minute: 48,
// 		second: 27,
// 		millisecond: 0,
// 	},
// 	locales: ['en-US'],
// 	formats: ["yyyy-MM-dd'T'HH:mm:ss", 'yyyy-MM-dd HH:mm:ss'],
// });
//
// testDates({
// 	name: 'year month day with 24h time',
// 	expected: {
// 		year: 2020,
// 		month: 2,
// 		day: 3,
// 		hour: 0,
// 		minute: 59,
// 		second: 0,
// 		millisecond: 0,
// 	},
// 	locales: ['en-US'],
// 	formats: ["yyyy-MM-dd'T'HH:mm", 'yyyy-MM-dd HH:mm'],
// });
//
//
//
