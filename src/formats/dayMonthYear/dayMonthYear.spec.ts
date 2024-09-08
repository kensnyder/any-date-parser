const testDates = require('../../../test-fixtures/testDates.js');

testDates({
	name: 'day month year',
	expected: { year: 2020, month: 3, day: 3 },
	locales: ['en-US'],
	formats: [
		'dd/MM/yyyy',
		'dd.MM.yyyy',
		'dd/M/yyyy',
		'dd.M.yyyy',
		'd/M/yyyy',
		'd.M.yyyy',
		'dd/MM/yy',
		'dd.MM.yy',
	],
});
