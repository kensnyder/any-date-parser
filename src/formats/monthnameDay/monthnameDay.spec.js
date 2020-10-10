const testDates = require('../../../test-fixtures/testDates.js');
const localeList = require('../../../test-fixtures/localeList.js');

testDates({
	name: 'monthname day',
	expected: { month: 6, day: 28 },
	locales: localeList.filter(l => !/^ar|zh/.test(l)),
	formats: [
		'cccc, MMMM dd',
		'cccc MMMM dd',
		'ccc, MMMM dd',
		'ccc MMMM dd',
		'MMMM dd',
		'MMM dd',
	],
});

testDates({
	name: 'monthname day year',
	expected: { year: 2017, month: 2, day: 28 },
	locales: ['en', 'es', 'de', 'fi', 'fr', 'pt', 'no', 'nl', 'pl'],
	formats: ['MMM dd yy'],
});
