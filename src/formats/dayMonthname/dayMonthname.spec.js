const testDates = require('../../../test-fixtures/testDates.js');
const localeList = require('../../../test-fixtures/localeList.js');

testDates({
	name: 'day monthname',
	expected: { month: 3, day: 16 },
	// ar and zh do not have a monthname
	locales: localeList.filter(l => !/^ar|zh/.test(l)),
	formats: ['dd MMMM', 'd MMMM', 'dd MMM', 'd MMM'],
});
