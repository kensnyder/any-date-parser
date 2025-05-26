import testDates from '../../test-fixtures/testDates';

testDates({
  name: 'year month day',
  expected: { year: 2016, month: 9, day: 24 },
  locales: ['en-US'],
  formats: ['yyyy-MM-dd', 'yyyy-M-dd', 'yyyy-MM-d', 'yyyy-M-d'],
});

// Test for year month day with slashes
// See https://github.com/kensnyder/any-date-parser/issues/44
testDates({
  name: 'year month day slashes',
  expected: { year: 2016, month: 9, day: 24 },
  locales: ['en-US'],
  formats: ['yyyy/MM/dd', 'yyyy/M/dd', 'yyyy/MM/d', 'yyyy/M/d'],
});
