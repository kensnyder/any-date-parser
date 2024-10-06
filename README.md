# any-date-parser

[![NPM Link](https://badgen.net/npm/v/any-date-parser?v=2.0.0)](https://npmjs.com/package/any-date-parser)
[![Language](https://badgen.net/static/language/TS?v=2.0.0)](https://github.com/search?q=repo:kensnyder/any-date-parser++language:TypeScript&type=code)
[![Build Status](https://github.com/kensnyder/any-date-parser/actions/workflows/workflow.yml/badge.svg?v=2.0.0)](https://github.com/kensnyder/any-date-parser/actions)
[![Code Coverage](https://codecov.io/gh/kensnyder/any-date-parser/branch/main/graph/badge.svg?v=2.0.0)](https://codecov.io/gh/kensnyder/any-date-parser)
![2000+ Tests](https://badgen.net/static/tests/2000+/green)
[![Gzipped Size](https://badgen.net/bundlephobia/minzip/any-date-parser?label=minzipped&v=2.0.0)](https://bundlephobia.com/package/any-date-parser@2.0.0)
[![Dependency details](https://badgen.net/bundlephobia/dependency-count/any-date-parser?v=2.0.0)](https://www.npmjs.com/package/any-date-parser?activeTab=dependencies)
[![Tree shakeable](https://badgen.net/bundlephobia/tree-shaking/any-date-parser?v=2.0.0)](https://www.npmjs.com/package/any-date-parser)
[![ISC License](https://badgen.net/github/license/kensnyder/any-date-parser?v=2.0.0)](https://opensource.org/licenses/ISC)

The most comprehensive and accurate date parser for Node and browsers. It uses
`Intl` to provide parsing support for all installed locales.

## Installation

`npm install any-date-parser`

OR

```html
<script src="https://cdn.jsdelivr.net/npm/any-date-parser@2.0.0/dist/browser-bundle.js"></script>
```

## Table of Contents

1. [Breaking changes](#breaking-changes)
1. [Motivation](#motivation)
1. [Usage](#usage)
1. [Supported formats](#supported-formats)
1. [Locale support](#locale-support)
1. [List of all supported locales](https://github.com/kensnyder/any-date-parser/blob/master/test-fixtures/localeList.ts)
1. [Adding custom formats](#adding-custom-formats)
1. [Removing parsing rules](#removing-parsing-rules)
1. [Creating a custom parser](#creating-a-custom-parser)
1. [Unit tests](#unit-tests)
1. [Contributing](#contributing)

## Breaking changes

### Upgrading from v1 => v2

- `fromString` and `fromAny` now return a `MaybeValidDate` instance that is a
  subclass of `Date`. Previously, they returned `Date | { invalid: string; }`.
  `MaybeValidDate` has an `invalid` property if invalid, and an `isValid()`
  function whether valid or not. If in v1 you simply checked for an `invalid`
  property, v2 will behave the same.
- If an input string does not match any known format, it will attempt a fuzzy
  match, looking for date parts individually.

## Motivation

1. The APIs I consume have a lot of different date formats
1. I want to create REST APIs that accept all major formats
1. I want to handle user-input dates
1. I want to support dates in other languages according to JavaScript's new
   `Intl` global object

## Usage

There are three ways to use any-date-parser:

1.) Use the parser object: (Recommended)

- `parser.fromString(string, locale)` - Parses a string and returns a `Date`
  object. It is the same function as in option 1.
- `parser.fromAny(any, locale)` - Return a `Date` object given a `Date`,
  `Number` or string to parse. It is the same function as in option 1.

Example:

```ts
import parser from 'any-date-parser';
parser.fromString('2020-10-15');
// same as new Date(2020, 9, 15, 0, 0, 0, 0)
```

2.) `parser` also has a function `parser.attempt(string, locale)` that
returns an object with one or more integer values for the following keys: year,
month, day, hour, minute, second, millisecond, offset. _Note_ month is returned
as a normal 1-based integer, not the 0-based integer the `Date()` constructor
uses.

Examples:

```ts
import parser from 'any-date-parser';
parser.attempt('15 Oct 2020 at 6pm');
/* returns:
{
  year: 2020,
  month: 10,
  day: 15,
  hour: 18,
}
*/

parser.attempt('Oct 15');
/* returns:
{
  month: 10,
  day: 15,
}
*/

parser.attempt('Hello world');
/* returns:
{ invalid: 'Unable to parse "Hello World"' }
*/

parser.attempt('');
/* returns:
{ invalid: 'Unable to parse "(empty string)"' }
*/
```

3.) Use a new function directly on `Date`:

- `Date.fromString(string, locale)` - Parses a string and returns a `Date`
  object
- `Date.fromAny(any, locale)` - Return a `Date` object given a `Date`, `Number`
  or string to parse

Example:

```ts
import 'any-date-parser';
Date.fromString('2020-10-15');
// same as new Date(2020, 9, 15, 0, 0, 0, 0)
```

4.) There are npm packages that integrate any-date-parser directly into popular
date libraries:

- Luxon: [luxon-parser](http://npmjs.com/packages/luxon-parser)
- DayJS: [dayjs-parser](http://npmjs.com/package/dayjs-parser)
- Moment: [moment-parseplus](http://npmjs.com/package/moment-parseplus)

## Supported formats

Summary:

- 24 hour time
- 12 hour time
- timezone offsets
- timezone abbreviations
- year month day
- year monthname day
- month day year
- monthname day year
- day month year
- day monthname year
- +/-/ago periods
- now/today/yesterday/tomorrow
- Twitter
- Fuzzy

[Exhaustive list of date formats](#exhaustive-list-of-date-formats)

## Locale Support

`any-date-parser` supports any locale that your runtime's
[Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
supports. In browsers that usually means the operating system language. In Node,
that means the compiled language or the icu modules included. For unit tests,
this library uses the [full-icu](https://npmjs.com/package/full-icu) npm package
to make all locales available. That package is heavy and is not included as a
dependency.

This means support for international formats such as:

- `es-MX` - `viernes, 27 de septiembre de 2024, 10:39:50 a.m. GMT-6`
- `bn-BD` - `শুক্রবার, ২৭ সেপ্টেম্বর, ২০২৪ এ ১০:৩৬:১০ AM GMT -৬`
- `el-GR` - `Παρασκευή 27 Σεπτεμβρίου 2024 στις 10:38:16 π.μ. GMT-6`
- `he-IL` - `יום שישי, 27 בספטמבר 2024 בשעה 10:38:53 GMT-6`
- `hi-IN` - `शुक्रवार, 27 सितंबर 2024 को 10:39:13 am GMT-6 बजे`
- `th-TH` - `วันศุกร์ที่ 27 กันยายน พ.ศ. 2567 เวลา 10 นาฬิกา 40 นาที 28 วินาที GMT-6`
- `ta-IN` - `வெள்ளி, 27 செப்டம்பர், 2024 அன்று 10:43:05 AM GMT-6`
- `hu-HU` - `2024. szeptember 27., péntek 10:44:41 GMT-6`

_Note_: For locales that use the Buddhist year (such as `th-TH`),
any-date-parser automatically subtracts 543 years to normalize it to the
Gregorian Calendar year.

Check out the
[list of all supported locales](https://github.com/kensnyder/any-date-parser/blob/master/test-fixtures/localeList.ts)

## Limitations

- Dates with years before 1000 must have 4 digits, i.e. leading zeros.
- any-date-parser cannot parse Dates before 0100 or after 9999 though JavaScript
  support is only limited where milliseconds is between
  `-8640000000000000 through 8640000000000000`, which allows a range of
  `-271821-04-20T00:00:00.000Z through +275760-09-13T00:00:00.000Z`.
- Only English timezone names are supported
- Does not support the Hijri calendar (`islamic-umalqura`)
- Does not support `ar` (Arabic) locales

## Adding custom formats

`any-date-parser` has an `addFormat()` function to add a custom parser.

First, parsers must have `matcher` or `template`.

- `matcher`: A RegExp to match a string
- `template`: A string with template variables such as `_YEAR_` `_MONTH_` etc.
  that will be converted to a regular expression

Second, parsers must have `units` or `handler`.

- `units`: An array of unit strings to fit matches into (year, month, day, etc.)
- `handler`: A function that takes matches and returns an object with keys year,
  month, day etc.

### Example 1: matcher + units

```ts
import parser, { Format } from 'any-date-parser';

parser.addFormat(
  new Format({
    matcher: /^(\d+) days? into month (\d+) in year (\d{4})$/,
    units: ['day', 'month', 'year'],
  })
);
```

Keep in mind that `\d` does not support other numbering system such as Chinese
or Bengali. To support those you can use the `template` option given in
[example 3](#example-3-template--units) and
[example 4](#example-4-template--handler).

### Example 2: matcher + handler

```ts
import parser, { Format } from 'any-date-parser';

parser.addFormat(
  new Format({
    matcher: /^(Q[1-4]) (\d{4})$/, // String such as "Q4 2004"
    handler: function ([, quarter, year]) {
      const monthByQuarter = { Q1: 1, Q2: 4, Q3: 7, Q4: 10 };
      const month = monthByQuarter[quarter];
      return { year, month };
    },
  })
);
```

### Example 3: template + units

```ts
import parser, { Format } from 'any-date-parser';

parser.addFormat(
  new Format({
    template: 'The (_DAY_)(?:_ORDINAL_) day of (_MONTH_), (_YEAR_)',
    units: ['day', 'month', 'year'],
  })
);
```

### Example 4: template + handler

```ts
import parser, { Format } from 'any-date-parser';

parser.addFormat(
  new Format({
    template: '^(Q[1-4]) (_YEAR_)$', // String such as "Q4 2004"
    handler: function ([, quarter, year]) {
      const monthByQuarter = { Q1: 1, Q2: 4, Q3: 7, Q4: 10 };
      const month = monthByQuarter[quarter];
      return { year, month };
    },
  })
);
```

### Removing parsing rules

To remove support for a certain format, use `removeFormat()`

```ts
import parser, { dayMonth, fuzzy } from 'any-date-parser';
import dayMonth from 'any-date-parser';

parser.removeFormat(dayMonth);
parser.removeFormat(fuzzy);
```

All exported formats:

- `time24Hours`
- `time12Hours`
- `yearMonthDayWithDots`
- `yearMonthDay`
- `dayMonthnameYear`
- `monthnameDayYear`
- `monthDayYear`
- `dayMonthYear`
- `chinese`
- `korean`
- `twitter`
- `today`
- `ago`
- `monthnameDay`
- `dayMonthname`
- `monthDay`
- `dayMonth`
- `yearMonthnameDay`
- `yearMonthDayWithSlashes`
- `atSeconds`
- `microsoftJson`
- `fuzzy`

### Creating a custom parser

To create a new parser with a limited list of formats or your own custom
formats, use `new Parser`

```ts
import { Parser, time24Hours, yearMonthDay, ago } from 'any-date-parser';

const myParser = new Parser();
myParser.addFormats([time24Hours, yearMonthDay, ago]);
```

Note that formats will be attempted in the order they were added.

You can convert your custom parser to a function. For example:

```ts
import { Parser, time24Hours, yearMonthDay, ago } from 'any-date-parser';
const myParser = new Parser();
// ....
myParser.addFormats(/*...*/);
// Pass locale if you want to override the detected default
Date.fromString = myParser.exportAsFunction();
Date.fromAny = myParser.exportAsFunctionAny();
```

## Unit tests

You can git checkout `any-date-parser` and run its tests.

- To run tests, run `npm test`
- To check coverage, run `npm run coverage`
- _Note_ - `npm test` will attempt to install `full-icu` and `luxon` globally if
  not present

## Contributing

Contributions are welcome. Please open a GitHub ticket for bugs or feature
requests. Please make a pull request for any fixes or new code you'd like to be
incorporated.

## Exhaustive list of date formats

24 hour time (any date format followed by a 24-hour time expression)

- 2020-10-06 17:41:28
- 2020-10-06T17:41:28Z
- 17:41:28
- 2020-10-06T17:41:28.999Z
- 2020-10-06T17:41:28.999999Z
- 2020-10-06T17:41:28.999999999Z
- 2020-10-06T17:41:28 MST
- 2020-10-06T17:41:28 Eastern Daylight Time
- 2020-10-06T17:41:28 GMT+03:00
- 2020-10-06T17:41:28 GMT-9
- 2020-10-06T17:41:28-09:00
- 2020-10-06T17:41:28+0900

12 hour time (any date format followed by a 12-hour time expression)

- March 14, 2015 at 9:26:53 am
- 14 Mar 2015 9:26:53 a.m.
- 9:26:53am
- 9:26pm
- 9pm

year month day

- 2016-09-24
- 2016-9-24
- 20160924

day monthname year

- Wednesday, 01 January 2020
- Wednesday 01 January 2020
- Wed, 01 January 2020
- Wed 01 January 2020
- 01 January 2020
- 01-January-2020
- 1 Jan 2020
- 1-Jan-2020
- 01 Jan 20
- 1 Jan 20

monthname day year

- Sunday, March 27 2016
- Sunday March 27 2016
- Sun, March 27 2016
- Sun March 27 2016
- March 27 2016
- Mar 27, 2016
- Mar 27 2016

month day year

- 03/14/2020
- 03-14-2020
- 3/14/2020
- 3-14-2020
- 03/14/20
- 03-14-20

day month year

- 14/03/2020
- 14.03.2020
- 14/3/2020
- 14.3.2020
- 14/03/20
- 14.03.20
- 14/3/20
- 14.3.20

relative time

- 5 minutes ago
- -8 months
- in 13 days
- +21 weeks

monthname day

- Sunday, June 28
- Sunday June 28
- Sun, June 28
- Sun June 28
- June 28
- Jun 28

day monthname

- 16 March
- 16 Mar

month day

- 03/14
- 03-14
- 3/14
- 3-14

day month

- 14/03
- 14.03
- 14/3
- 14.3

Twitter

- Fri Apr 09 12:53:54 +0000 2010

unix timestamp

- `@1602604901`

Microsoft JSON date string

- `/Date(1601677889008-0700)/`
- `/Date(1601677889008)/`

chinese

- `2020年09月26日`
- `2020年9月26日`
- `2020 年 9 月 26 日`
- `２０１７年０８月３１日`

fuzzy (some examples)

- `On Wed 8 March in the year 2020`
- `In 1929, the stock market crashed on October 29`
