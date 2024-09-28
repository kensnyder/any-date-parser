import testDates from '../../../test-fixtures/testDates';

testDates({
  name: 'year month day',
  expected: { year: 2016, month: 9, day: 24 },
  locales: ['en-US'],
  formats: ['yyyy-MM-dd', 'yyyy-M-dd', 'yyyy-MM-d', 'yyyy-M-d'],
});
