import testDates from '../../test-fixtures/testDates';

testDates({
  name: 'monthname day',
  expected: { month: 6, day: 28 },
  locales: ['en', 'es', 'de', 'fi', 'fr', 'pt', 'no', 'nl', 'pl'],
  formats: [
    'cccc, MMMM dd',
    'cccc MMMM dd',
    'ccc, MMMM dd',
    'ccc MMMM dd',
    'MMMM dd',
  ],
});

testDates({
  name: 'short monthname day',
  expected: { month: 6, day: 28 },
  locales: ['en-US'],
  formats: ['MMM dd'],
});
