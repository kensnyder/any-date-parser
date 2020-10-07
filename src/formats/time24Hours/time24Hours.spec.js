const testDates = require('../../../test-fixtures/testDates.js');

testDates({
	name: '24 hour time',
	locales: ['ar-SA', 'bn-BD', 'bn-IN', 'en-US'],
	expected: {
		year: 2020,
		month: 10,
		day: 6,
		hour: 17,
		minute: 41,
		second: 28,
	},
	formats: ["yyyy-MM-dd'T'HH:mm:ss'Z'"],
});

testDates({
	name: '24 hour time with timezone name - "MST"',
	locales: ['ar-SA', 'bn-BD', 'bn-IN', 'en-US'],
	expected: {
		year: 2020,
		month: 10,
		day: 6,
		hour: 17,
		minute: 41,
		second: 28,
		offset: -420,
	},
	formats: ["yyyy-MM-dd'T'HH:mm:ss 'MST'"],
});

testDates({
	name: '24 hour time with long timezone name - "Eastern Daylight Time"',
	locales: ['ar-SA', 'bn-BD', 'bn-IN', 'en-US'],
	expected: {
		year: 2020,
		month: 10,
		day: 6,
		hour: 17,
		minute: 41,
		second: 28,
		offset: -240,
	},
	formats: ["yyyy-MM-dd'T'HH:mm:ss 'Eastern Daylight Time'"],
});

testDates({
	name: '24 hour time with GMT hours:minutes',
	locales: ['en-US'],
	expected: {
		year: 2020,
		month: 10,
		day: 6,
		hour: 17,
		minute: 41,
		second: 28,
		offset: 180,
	},
	formats: ["yyyy-MM-dd'T'HH:mm:ss 'GMT+03:00'"],
});

testDates({
	name: '24 hour time with GMT hours',
	locales: ['en-US'],
	expected: {
		year: 2020,
		month: 10,
		day: 6,
		hour: 17,
		minute: 41,
		second: 28,
		offset: -540,
	},
	formats: ["yyyy-MM-dd'T'HH:mm:ss 'GMT-9'"],
});

testDates({
	name: '24 hour time with zone -hours:minutes',
	locales: ['en-US'],
	expected: {
		year: 2020,
		month: 10,
		day: 6,
		hour: 17,
		minute: 41,
		second: 28,
		offset: -540,
	},
	formats: ["yyyy-MM-dd'T'HH:mm:ss'-09:00'"],
});

testDates({
	name: '24 hour time with zone +hoursminutes',
	locales: ['en-US'],
	expected: {
		year: 2020,
		month: 10,
		day: 6,
		hour: 17,
		minute: 41,
		second: 28,
		offset: 540,
	},
	formats: ["yyyy-MM-dd'T'HH:mm:ss'+0900'"],
});
