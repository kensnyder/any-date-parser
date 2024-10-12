import testDates from '../../test-fixtures/testDates';

testDates({
  name: 'day month',
  expected: { month: 3, day: 3 },
  locales: ['en-US'],
  formats: ['dd/MM', 'dd.MM', 'dd/M', 'dd.M', 'd/M', 'd.M'],
});
