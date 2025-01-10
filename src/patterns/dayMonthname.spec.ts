import localeList from '../../test-fixtures/localeList';
import testDates from '../../test-fixtures/testDates';

testDates({
  name: 'day monthname',
  expected: { month: 3, day: 16 },
  // ar and zh do not have a monthname
  locales: localeList.filter(l => !/^ar|zh/.test(l)),
  formats: ['dd MMMM', 'd MMMM'],
});
testDates({
  name: 'day short monthname',
  expected: { month: 3, day: 16 },
  // ar, zh, cz do not have a short monthname
  locales: localeList.filter(l => !/^ar|zh|cs/.test(l)),
  formats: ['dd MMM', 'd MMM'],
});
