import testDates from '../../../test-fixtures/testDates';

testDates({
  name: 'month day',
  expected: { month: 3, day: 14 },
  locales: ['en-US'],
  formats: ['MM/dd', 'MM-dd', 'M/dd', 'M-dd'],
});
