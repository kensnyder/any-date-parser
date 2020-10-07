const testParser = require('../../../test-fixtures/testParser.js');

testParser({
	name: 'microsoft format without offset',
	expected: {
		year: 2020,
		month: 10,
		day: 2,
		hour: 22,
		minute: 31,
		second: 29,
		millisecond: 8,
		offset: 0,
	},
	locales: ['en-US'],
	dates: ['/Date(1601677889008)/'],
});
testParser({
	name: 'microsoft format with offset',
	expected: {
		year: 2020,
		month: 10,
		day: 2,
		hour: 22,
		minute: 31,
		second: 29,
		millisecond: 8,
		offset: -420,
	},
	locales: ['en-US'],
	dates: ['/Date(1601677889008-0700)/'],
});
