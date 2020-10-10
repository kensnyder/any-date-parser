const testDates = require('../../../test-fixtures/testDates.js');
const localeList = require('../../../test-fixtures/localeList.js');

testDates({
	name: 'day monthname year',
	expected: { year: 2020, month: 1, day: 1 },
	// ar and zh do not have a monthname
	locales: localeList.filter(l => !/^ar|zh/.test(l)),
	formats: [
		'cccc, dd MMMM yyyy',
		'cccc dd MMMM yyyy',
		'ccc, dd MMMM yyyy',
		'ccc dd MMMM yyyy',
		'dd MMMM yyyy',
		'dd-MMMM-yyyy',
	],
});
testDates({
	name: 'day short monthname year',
	expected: { year: 2020, month: 1, day: 1 },
	// ar and zh do not have short monthnames
	locales: localeList.filter(l => !/^ar|zh/.test(l)),
	formats: ['d MMM yyyy', 'd-MMM-yyyy'],
});
testDates({
	name: 'day monthname two digit year',
	expected: { year: 2020, month: 1, day: 1 },
	// non-latin numerals can't handle two-digit years
	locales: localeList.filter(l => !/^ar|zh|bn/.test(l)),
	formats: ['dd MMM yy', 'd MMM yy'],
});

testDates({
	name: 'day ordinal monthname year',
	expected: { year: 2018, month: 10, day: 28 },
	locales: ['en'],
	formats: ["dd'th' MMM yy", "d'th' MMM yy", "dd'th'-MMM-yy", "d'th'-MMM-yy"],
});
