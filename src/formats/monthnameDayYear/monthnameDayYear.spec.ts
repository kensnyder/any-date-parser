const testDates = require('../../../test-fixtures/testDates.js');
const localeList = require('../../../test-fixtures/localeList.js');

testDates({
	name: 'monthname day year',
	expected: { year: 2016, month: 3, day: 27 },
	// ar and zh do not have a monthname
	locales: localeList.filter(l => !/^ar|zh/.test(l)),
	formats: [
		'cccc, MMMM dd yyyy',
		'cccc MMMM dd yyyy',
		'ccc, MMMM dd yyyy',
		'ccc MMMM dd yyyy',
		'MMMM dd yyyy',
		'MMM dd, yyyy',
		'MMM dd yyyy',
	],
});
testDates({
	name: 'monthname day year',
	expected: { year: 2017, month: 2, day: 28 },
	locales: ['en', 'es', 'de', 'fi', 'fr', 'pt', 'no', 'nl', 'pl'],
	formats: ['MMM dd yy'],
});
