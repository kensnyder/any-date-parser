import testDates from '../../test-fixtures/testDates';

for (let i = 1; i <= 12; i++) {
  testDates({
    name: `monthname day year4 with month=${i}`,
    expected: { year: 2016, month: i, day: 27 },
    locales: ['en', 'es', 'de', 'fi', 'fr', 'pt', 'no', 'nl', 'pl'],
    formats: [
      'cccc, MMMM dd yyyy',
      'cccc MMMM dd yyyy',
      'ccc, MMMM dd yyyy',
      'ccc MMMM dd yyyy',
      'MMMM dd yyyy',
      'MMM dd, yyyy',
      'MMM dd yyyy',
    ],
  });
}

for (let i = 1; i <= 12; i++) {
  testDates({
    name: `monthname day year2 with month=${i}`,
    expected: { year: 2017, month: i, day: 28 },
    locales: ['en', 'es', 'de', 'fi', 'fr', 'pt', 'no', 'nl', 'pl'],
    formats: ['MMM dd, yy'],
  });
}
