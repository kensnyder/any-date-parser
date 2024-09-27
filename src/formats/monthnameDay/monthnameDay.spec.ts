import localeList from '../../../test-fixtures/localeList';
import testDates from '../../../test-fixtures/testDates';

testDates({
  name: 'monthname day',
  expected: { month: 6, day: 28 },
  // ar,zh do not have a monthname
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
