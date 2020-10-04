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

// testDates({
// 	name: 'monthname day',
// 	expected: { year: now.year, month: 6, day: 28 },
// 	formats: [
// 		'cccc, MMMM dd',
// 		'cccc MMMM dd',
// 		'ccc, MMMM dd',
// 		'ccc MMMM dd',
// 		'MMMM dd',
// 		'MMM dd',
// 	],
// });
//
// testDates({
// 	name: 'month day year',
// 	expected: { year: 2020, month: 3, day: 14 },
// 	locales: ['en-US'],
// 	formats: [
// 		'MM/dd/yyyy',
// 		'MM-dd-yyyy',
// 		'M/dd/yyyy',
// 		'M-dd-yyyy',
// 		'MM/dd/yy',
// 		'MM-dd-yy',
// 	],
// });
//
// testDates({
// 	name: 'month day',
// 	expected: { year: now.year, month: 3, day: 14 },
// 	locales: ['en-US'],
// 	formats: ['MM/dd', 'MM-dd', 'M/dd', 'M-dd'],
// });
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
// testDates({
// 	name: 'day month year',
// 	expected: { year: 2020, month: 3, day: 3 },
// 	locales: ['en-US'],
// 	formats: [
// 		'dd/MM/yyyy',
// 		'dd.MM.yyyy',
// 		'dd/M/yyyy',
// 		'dd.M.yyyy',
// 		'd/M/yyyy',
// 		'd.M.yyyy',
// 		'dd/MM/yy',
// 		'dd.MM.yy',
// 	],
// });
//
// testDates({
// 	name: 'day month',
// 	expected: { year: now.year, month: 3, day: 3 },
// 	locales: ['en-US'],
// 	formats: ['dd/MM', 'dd.MM', 'dd/M', 'dd.M', 'd/M', 'd.M'],
// });
//
// testDates({
// 	name: 'day monthname year',
// 	expected: { year: 2020, month: 3, day: 9 },
// 	formats: [
// 		'dd-LLLL-yyyy',
// 		'dd LLLL yyyy',
// 		'dd-LLL-yyyy',
// 		'dd LLL yyyy',
// 		'd LLLL yyyy',
// 		'd LLL yyyy',
// 		'dd LLLL yy',
// 		'dd LLL yy',
// 		'd LLLL yy',
// 		'd LLL yy',
// 	],
// });
//
// testDates({
// 	name: 'day monthname year',
// 	expected: { year: now.year, month: 12, day: 25 },
// 	formats: ['dd-LLLL', 'dd LLLL', 'dd-LLL', 'dd LLL', 'd LLLL', 'd LLL'],
// });
//
// testDates({
// 	name: 'chinese',
// 	expected: { year: 2020, month: 9, day: 26 },
// 	locales: ['zh-CN'],
// 	formats: ['yyyy年MM月dd日', 'yyyy年M月d日'],
// });
//
// testDates({
// 	name: '@unix',
// 	expected: { year: 2020, month: 9, day: 26 },
// 	locales: ['en-US'],
// 	formats: ['@X'],
// });
//
// describe('twitter time', () => {
// 	it('should handle "Fri Apr 09 12:53:54 +0000 2010"', () => {
// 		const actual = DateTime.fromAny('Fri Apr 09 12:53:54 +0000 2010');
// 		const expected = DateTime.fromObject({
// 			month: 4,
// 			day: 9,
// 			hour: 12,
// 			minute: 53,
// 			second: 54,
// 			year: 2010,
// 			zone: 'utc',
// 		});
// 		expect(actual).toMatchDateTime(expected);
// 	});
// 	it('should handle "Fri Apr 09 12:53:54 -0130 2010"', () => {
// 		const actual = DateTime.fromAny('Fri Apr 09 12:53:54 -0130 2010');
// 		const expected = DateTime.fromObject({
// 			month: 4,
// 			day: 9,
// 			hour: 12,
// 			minute: 53,
// 			second: 54,
// 			year: 2010,
// 			zone: FixedOffsetZone.instance(-90),
// 		});
// 		expect(actual).toMatchDateTime(expected);
// 	});
// });
//
// describe('(amount) (unit) ago', () => {
// 	it('should handle "8 years ago"', () => {
// 		const actual = DateTime.fromAny('8 years ago');
// 		const expected = DateTime.local().minus({ years: 8 });
// 		expect(actual).toMatchDateTime(expected);
// 	});
// 	it('should handle "12 days ago"', () => {
// 		const actual = DateTime.fromAny('12 days ago');
// 		const expected = DateTime.local().minus({ days: 12 });
// 		expect(actual).toMatchDateTime(expected);
// 	});
// 	it('should handle "5 hours ago"', () => {
// 		const actual = DateTime.fromAny('5 hours ago');
// 		const expected = DateTime.local().minus({ hours: 5 });
// 		expect(actual).toMatchDateTime(expected);
// 	});
// 	it('should handle "1 minute ago"', () => {
// 		const actual = DateTime.fromAny('1 minute ago');
// 		const expected = DateTime.local().minus({ minute: 1 });
// 		expect(actual).toMatchDateTime(expected);
// 	});
// 	it('should handle "2 seconds ago"', () => {
// 		const actual = DateTime.fromAny('2 seconds ago');
// 		const expected = DateTime.local().minus({ second: 2 });
// 		expect(actual).toMatchDateTime(expected);
// 	});
// });
//
// describe('now, today, yesterday and tomorrow', () => {
// 	it('should handle "now"', () => {
// 		const actual = DateTime.fromAny('now');
// 		const expected = DateTime.local();
// 		expect(actual).toMatchDate(expected);
// 	});
// 	it('should handle "today"', () => {
// 		const actual = DateTime.fromAny('today');
// 		const expected = DateTime.local();
// 		expect(actual).toMatchDate(expected);
// 	});
// 	it('should handle "tomorrow"', () => {
// 		const actual = DateTime.fromAny('tomorrow');
// 		const expected = DateTime.local().plus({ days: 1 });
// 		expect(actual).toMatchDate(expected);
// 	});
// 	it('should handle "yesterday"', () => {
// 		const actual = DateTime.fromAny('yesterday');
// 		const expected = DateTime.local().minus({ days: 1 });
// 		expect(actual).toMatchDate(expected);
// 	});
// });
//
// describe('24h time', () => {
// 	it('should handle "23:12"', () => {
// 		const actual = DateTime.fromAny('23:12');
// 		const expected = DateTime.local().set({
// 			hour: 23,
// 			minute: 12,
// 			second: 0,
// 			millisecond: 0,
// 		});
// 		expect(actual).toMatchDateTime(expected);
// 	});
// 	it('should handle "23:12:55"', () => {
// 		const actual = DateTime.fromAny('23:12:55');
// 		const expected = DateTime.local().set({
// 			hour: 23,
// 			minute: 12,
// 			second: 55,
// 			millisecond: 0,
// 		});
// 		expect(actual).toMatchDateTime(expected);
// 	});
// 	it('should handle "23:12:55.089"', () => {
// 		const actual = DateTime.fromAny('23:12:55.089');
// 		const expected = DateTime.local().set({
// 			hour: 23,
// 			minute: 12,
// 			second: 55,
// 			millisecond: 89,
// 		});
// 		expect(actual).toMatchDateTime(expected);
// 	});
// 	it('should handle "23:12:55.123456"', () => {
// 		const actual = DateTime.fromAny('23:12:55.123456');
// 		const expected = DateTime.local().set({
// 			hour: 23,
// 			minute: 12,
// 			second: 55,
// 			millisecond: 123,
// 		});
// 		expect(actual).toMatchDateTime(expected);
// 	});
// 	it('should handle "23:12:55.123456789"', () => {
// 		const actual = DateTime.fromAny('23:12:55.123456789');
// 		const expected = DateTime.local().set({
// 			hour: 23,
// 			minute: 12,
// 			second: 55,
// 			millisecond: 123,
// 		});
// 		expect(actual).toMatchDateTime(expected);
// 	});
// });
//
// describe('12 hour time', () => {
// 	it('should handle "8pm"', () => {
// 		const actual = DateTime.fromAny('8pm');
// 		const expected = DateTime.local().set({
// 			hour: 20,
// 			minute: 0,
// 			second: 0,
// 			millisecond: 0,
// 		});
// 		expect(actual).toMatchDateTime(expected);
// 	});
// 	it('should handle "8:15pm"', () => {
// 		const actual = DateTime.fromAny('8:15pm');
// 		const expected = DateTime.local().set({
// 			hour: 20,
// 			minute: 15,
// 			second: 0,
// 			millisecond: 0,
// 		});
// 		expect(actual).toMatchDateTime(expected);
// 	});
// 	it('should handle "8:15:59pm"', () => {
// 		const actual = DateTime.fromAny('8:15:59pm');
// 		const expected = DateTime.local().set({
// 			hour: 20,
// 			minute: 15,
// 			second: 59,
// 			millisecond: 0,
// 		});
// 		expect(actual).toMatchDateTime(expected);
// 	});
// });
