const testParser = require('../../../test-fixtures/testParser.js');

testParser({
	name: 'year month day',
	expected: {
		year: 2020,
		month: 10,
		day: 2,
		hour: 22,
		minute: 31,
		second: 29,
	},
	locales: ['en-US'],
	dates: ['@1601677889'],
});
