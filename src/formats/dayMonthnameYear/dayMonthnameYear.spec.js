const testDates = require('../../../test-fixtures/testDates.js');
const localeList = require('../../../test-fixtures/localeList.js');

testDates({
	name: 'day monthname year',
	expected: { year: 2020, month: 1, day: 1 },
	locales: localeList.filter(l => !/^ar/.test(l)),
	formats: [
		'cccc, dd MMMM yyyy',
		'cccc dd MMMM yyyy',
		'ccc, dd MMMM yyyy',
		'ccc dd MMMM yyyy',
		'dd MMMM yyyy',
		'dd-MMMM-yyyy',
		'd MMM yyyy',
		'd-MMM-yyyy',
	],
});
testDates({
	name: 'day monthname year',
	expected: { year: 1999, month: 8, day: 31 },
	locales: ['en', 'es', 'de', 'fi', 'fr', 'pt', 'no', 'nl', 'pl'],
	formats: ['dd MMM yy', 'd MMM yy'],
});
testDates({
	name: 'day monthname year',
	expected: { year: 2018, month: 10, day: 28 },
	locales: ['en'],
	formats: ["dd'th' MMM yy", "d'th' MMM yy", "dd'th'-MMM-yy", "d'th'-MMM-yy"],
});
