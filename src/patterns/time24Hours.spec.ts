import testDates from '../../test-fixtures/testDates';

testDates({
  name: '24 hour time',
  locales: ['bn-BD', 'bn-IN', 'en-US'],
  expected: {
    year: 2020,
    month: 10,
    day: 6,
    hour: 17,
    minute: 41,
    second: 28,
  },
  formats: ['yyyy-MM-dd HH:mm:ss'],
});
testDates({
  name: '24 hour time',
  locales: ['bn-BD', 'bn-IN', 'en-US'],
  expected: {
    year: 2020,
    month: 10,
    day: 6,
    hour: 17,
    minute: 41,
    second: 28,
  },
  formats: ["yyyy-MM-dd'T'HH:mm:ss'Z'"],
});
testDates({
  name: '24 hour time with no date',
  locales: ['en-US'],
  expected: {
    hour: 17,
    minute: 41,
    second: 28,
  },
  formats: ['HH:mm:ss'],
});
testDates({
  name: '24 hour time with milliseconds',
  locales: ['en-US'],
  expected: {
    year: 2020,
    month: 10,
    day: 6,
    hour: 17,
    minute: 41,
    second: 28,
    millisecond: 999,
  },
  formats: ["yyyy-MM-dd'T'HH:mm:ss.999'Z'"],
});
testDates({
  name: '24 hour time with 2-digit milliseconds',
  locales: ['en-US'],
  expected: {
    year: 2020,
    month: 10,
    day: 6,
    hour: 17,
    minute: 41,
    second: 28,
    millisecond: 990,
  },
  formats: ["yyyy-MM-dd'T'HH:mm:ss.99'Z'"],
});
testDates({
  name: '24 hour time with 1-digit milliseconds',
  locales: ['en-US'],
  expected: {
    year: 2020,
    month: 10,
    day: 6,
    hour: 17,
    minute: 41,
    second: 28,
    millisecond: 900,
  },
  formats: ["yyyy-MM-dd'T'HH:mm:ss.9'Z'"],
});
testDates({
  name: '24 hour time with microseconds',
  locales: ['en-US'],
  expected: {
    year: 2020,
    month: 10,
    day: 6,
    hour: 17,
    minute: 41,
    second: 28,
    millisecond: 999,
  },
  formats: ["yyyy-MM-dd'T'HH:mm:ss.999999'Z'"],
});
testDates({
  name: '24 hour time with nanoseconds',
  locales: ['en-US'],
  expected: {
    year: 2020,
    month: 10,
    day: 6,
    hour: 17,
    minute: 41,
    second: 28,
    millisecond: 999,
  },
  formats: ["yyyy-MM-dd'T'HH:mm:ss.999999999'Z'"],
});

testDates({
  name: '24 hour time with timezone name - "MST"',
  locales: ['bn-BD', 'bn-IN', 'en-US'],
  expected: {
    year: 2020,
    month: 10,
    day: 6,
    hour: 17,
    minute: 41,
    second: 28,
    offset: -420,
  },
  formats: ["yyyy-MM-dd'T'HH:mm:ss 'MST'"],
});

testDates({
  name: '24 hour time with long timezone name - "Eastern Daylight Time"',
  locales: ['bn-BD', 'bn-IN', 'en-US'],
  expected: {
    year: 2020,
    month: 10,
    day: 6,
    hour: 17,
    minute: 41,
    second: 28,
    offset: -240,
  },
  formats: ["yyyy-MM-dd'T'HH:mm:ss 'Eastern Daylight Time'"],
});

testDates({
  name: '24 hour time with GMT hours:minutes',
  locales: ['en-US'],
  expected: {
    year: 2020,
    month: 10,
    day: 6,
    hour: 17,
    minute: 41,
    second: 28,
    offset: 180,
  },
  formats: ["yyyy-MM-dd'T'HH:mm:ss 'GMT+03:00'"],
});

testDates({
  name: '24 hour time with GMT hours:minutes and tz name',
  locales: ['en-US'],
  expected: {
    year: 2020,
    month: 10,
    day: 6,
    hour: 17,
    minute: 41,
    second: 28,
    offset: -300,
  },
  formats: ["yyyy-MM-dd'T'HH:mm:ss 'GMT-05:00 (Eastern Daylight Time)'"],
});

testDates({
  name: '24 hour time with GMT offset hours',
  locales: ['en-US'],
  expected: {
    year: 2020,
    month: 10,
    day: 6,
    hour: 17,
    minute: 41,
    second: 28,
    offset: -540,
  },
  formats: ["yyyy-MM-dd'T'HH:mm:ss 'GMT-9'"],
});

testDates({
  name: '24 hour time with offset -hours:minutes',
  locales: ['en-US'],
  expected: {
    year: 2020,
    month: 10,
    day: 6,
    hour: 17,
    minute: 41,
    second: 28,
    offset: -540,
  },
  formats: ["yyyy-MM-dd'T'HH:mm:ss'-09:00'"],
});

testDates({
  name: '24 hour time with offset +hoursminutes',
  locales: ['en-US'],
  expected: {
    year: 2020,
    month: 10,
    day: 6,
    hour: 17,
    minute: 41,
    second: 28,
    offset: 540,
  },
  formats: ["yyyy-MM-dd'T'HH:mm:ss'+0900'"],
});

testDates({
  name: '24 hour time with offset using U+2212 minus sign',
  locales: ['en-US'],
  expected: {
    year: 2020,
    month: 10,
    day: 6,
    hour: 17,
    minute: 41,
    second: 28,
    offset: -540,
  },
  formats: ["yyyy-MM-dd'T'HH:mm:ss'−09:00'"],
});

testDates({
  name: '24 hour time with offset using U+00B1 plus-minus sign',
  locales: ['en-US'],
  expected: {
    year: 2020,
    month: 10,
    day: 6,
    hour: 17,
    minute: 41,
    second: 28,
    offset: 0,
  },
  formats: ["yyyy-MM-dd'T'HH:mm:ss'±00:00'"],
});
