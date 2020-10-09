const testDates = require('../../../test-fixtures/testDates.js');

testDates({
	name: 'month day year',
	expected: { year: 2020, month: 3, day: 14 },
	locales: ['en-US'],
	formats: [
		'MM/dd/yyyy',
		'MM-dd-yyyy',
		'M/dd/yyyy',
		'M-dd-yyyy',
		'MM/dd/yy',
		'MM-dd-yy',
	],
});
