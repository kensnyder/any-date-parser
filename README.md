# any-date-parser

[![NPM Link](https://badgen.net/npm/v/any-date-parser?v=2.0.3)](https://npmjs.com/package/any-date-parser)
[![Language](https://badgen.net/static/language/TS?v=2.0.3)](https://github.com/search?q=repo:kensnyder/any-date-parser++language:TypeScript&type=code)
[![Code Coverage](https://codecov.io/gh/kensnyder/any-date-parser/branch/main/graph/badge.svg?v=2.0.3)](https://codecov.io/gh/kensnyder/any-date-parser)
![2400+ Tests](https://badgen.net/static/tests/2400+/green)
[![Gzipped Size](https://badgen.net/bundlephobia/minzip/any-date-parser?label=minzipped&v=2.0.3)](https://bundlephobia.com/package/any-date-parser@2.0.3)
[![Dependency details](https://badgen.net/bundlephobia/dependency-count/any-date-parser?v=2.0.3)](https://www.npmjs.com/package/any-date-parser?activeTab=dependencies)
[![Tree shakeable](https://badgen.net/bundlephobia/tree-shaking/any-date-parser?v=2.0.3)](https://www.npmjs.com/package/any-date-parser)
[![ISC License](https://badgen.net/github/license/kensnyder/any-date-parser?v=2.0.3)](https://opensource.org/licenses/ISC)

The most comprehensive and accurate date parser for Node and browsers. It uses
`Intl` to provide parsing support for all installed locales.

## Installation

```shell
npm install any-date-parser
```

OR

```html
<script src="https://cdn.jsdelivr.net/npm/any-date-parser@2.0.3/dist/browser-bundle.js"></script>
```

## Table of Contents

1. [Breaking changes](#breaking-changes)
1. [Motivation](#motivation)
1. [Usage](#usage)
1. [Supported formats](#supported-formats)
1. [Locale support](#locale-support)
1. [List of all supported locales](https://github.com/kensnyder/any-date-parser/blob/master/test-fixtures/localeList.ts)
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
- Custom patterns are no longer supported

## Motivation

1. The APIs I consume have a lot of different date formats
1. I want to create REST APIs that accept all major formats
1. I want to handle user-input dates
1. I want to support dates in other languages according to JavaScript's new
   `Intl` global object

## Usage

There are three ways to use `any-date-parser`:

1.) Use the parser object: (Recommended)

- `parser.fromString(string, locale)` - Parses a string and returns a `Date`
  object.
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
- Does not support right-to-left script locales such as `ar` (Arabic) and `he` (Hebrew)

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

- 17:41:28
- 17:41:28Z
- 17:41:28.999Z
- 17:41:28.999999Z
- 17:41:28.999999999Z
- 17:41:28 MST
- 17:41:28 Eastern Daylight Time
- 17:41:28 GMT+03:00
- 17:41:28 GMT-9
- 17:41:28-09:00
- 17:41:28+0900

12 hour time (any date format followed by a 12-hour time expression)

- 9:26:53 am
- 9:26:53 a.m.
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

month day (for locales: ee-TG en-AS,CA,FM,GH,GU,KE,MH,MP,US,VI,WS jp-JP sm-AS,SM)

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
