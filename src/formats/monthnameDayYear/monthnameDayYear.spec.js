const testDates = require('../../../test-fixtures/testDates.js');

testDates({
	name: 'monthname day year',
	expected: { year: 2016, month: 2, day: 24 },
	locales: ['fi-FI'],
	formats: [
		'cccc, MMMM dd yyyy',
		'cccc MMMM dd yyyy',
		'ccc, MMMM dd yyyy',
		'ccc MMMM dd yyyy',
		'MMMM dd yyyy',
		'MMM dd yyyy',
		// 'MMM dd yy',
	],
});
