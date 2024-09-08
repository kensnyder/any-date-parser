const testDates = require('../../../test-fixtures/testDates.js');

testDates({
	name: 'month day',
	expected: { month: 3, day: 14 },
	locales: ['en-US'],
	formats: ['MM/dd', 'MM-dd', 'M/dd', 'M-dd'],
});
