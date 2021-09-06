# any-date-parser

[![NPM Link](https://img.shields.io/npm/v/any-date-parser?v=1.5.1)](https://npm.com/package/any-date-parser)
[![Minified Size](https://badgen.net/bundlephobia/min/react)](https://bundlephobia.com/package/any-date-parser@1.5.1)
[![Build Status](https://travis-ci.org/kensnyder/any-date-parser.svg?branch=master&v=1.5.1)](https://travis-ci.org/kensnyder/any-date-parser)
[![Code Coverage](https://codecov.io/gh/kensnyder/any-date-parser/branch/master/graph/badge.svg?v=1.5.1)](https://codecov.io/gh/kensnyder/any-date-parser)
[![ISC License](https://img.shields.io/npm/l/any-date-parser.svg?v=1.5.1)](https://opensource.org/licenses/ISC)

Parse a wide range of date formats including human-input dates.

Supports Node, IE11+ and evergreen browsers.

## Installation

`npm install any-date-parser`

OR

```html
<script src="https://cdn.jsdelivr.net/npm/any-date-parser@1.5.1/dist/browser-bundle.js"></script>
```

## Table of Contents

1. [Motivation](#motivation)
1. [Usage](#usage)
1. [Supported formats](#supported-formats)
1. [Locale support](#locale-support)
1. [Adding custom formats](#adding-custom-formats)
1. [Removing parsing rules](#removing-parsing-rules)
1. [Creating a custom parser](#creating-a-custom-parser)
1. [Unit tests](#unit-tests)
1. [Contributing](#contributing)

## Motivation

1. The APIs I consume have a lot of different date formats
1. I want to create REST APIs that accept all major formats
1. I want to handle user-input dates
1. I want to support dates in other languages according to JavaScript's new
   `Intl` global object

## Usage

There are three ways to use any-date-parser:

1.) Use a new function directly on `Date`:

- `Date.fromString(string, locale)` - Parses a string and returns a `Date`
  object
- `Date.fromAny(any, locale)` - Return a `Date` object given a `Date`, `Number`
  or string to parse

Example:

```js
require('any-date-parser');
Date.fromString('2020-10-15');
// same as new Date(2020, 9, 15, 0, 0, 0, 0)
```

2.) Use the parser object:

- `parser.fromString(string, locale)` - Parses a string and returns a `Date`
  object. It is the same function as in option 1.
- `parser.fromAny(any, locale)` - Return a `Date` object given a `Date`,
  `Number` or string to parse. It is the same function as in option 1.

Example:

```js
const parser = require('any-date-parser');
parser.fromString('2020-10-15');
// same as new Date(2020, 9, 15, 0, 0, 0, 0)
```

3.) It also exports `parser` with function `parser.attempt(string, locale)` that
returns an object with one or more integer values for the following keys: year,
month, day, hour, minute, second, millisecond, offset. Example:

```js
const parser = require('any-date-parser');
parser.attempt('15 Oct 2020 at 6pm');
// returns:
{
  year: 2020,
  month: 10,
  day: 15,
  hour: 18,
}
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

[Exhaustive list of date formats](#exhaustive-list-of-date-formats)

## Locale Support

any-date-parser supports any locale that your runtime's `Intl` (ECMAScript
Internationalization API) supports. In browsers that usually means the operating
system language. In Node, that means the compiled language or the icu modules
included. For unit tests, this library uses the
[full-icu](https://npmjs.com/package/full-icu) npm package to make all locales
available. That package is heavy and is not included as a dependency.

## Adding custom formats

any-date-parser has an `addFormat()` function to add a custom parser.

First, parsers must have `matcher` or `template`.

- `matcher`: A RegExp to match a string
- `template`: A string with template variables such as `_YEAR_` `_MONTH_` etc.
  that will be converted to a regular expression

Second, parsers must have `units` or `handler`.

- `units`: An array of unit strings to fit matches into (year, month, day, etc.)
- `handler`: A function that takes matches and returns an object with keys year,
  month, day etc.

### Example 1: matcher + units

```js
const parser,
	{ Format } = require('any-date-parser');

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

```js
const parser,
	{ Format } = require('any-date-parser');

parser.addFormat(
	new Format({
		matcher: /^Q([1-4]) (\d{4})$/,
		handler: function ([, quarter, year]) {
			const monthByQuarter = { 1: 1, 2: 4, 3: 7, 4: 10 };
			const month = monthByQuarter[quarter];
			return { year, month };
		},
	})
);
```

### Example 3: template + units

```js
const parser,
	{ Format } = require('any-date-parser');

parser.addFormat(
	new Format({
		template: 'The (_DAY_)(?:_ORDINAL_) day of (_MONTH_), (_YEAR_)',
		units: ['day', 'month', 'year'],
	})
);
```

### Example 4: template + handler

```js
const parser,
	{ Format } = require('any-date-parser');

parser.addFormat(
	new Format({
		template: '^Q([1-4]) (_YEAR_)$',
		handler: function ([, quarter, year]) {
			const monthByQuarter = { 1: 1, 2: 4, 3: 7, 4: 10 };
			const month = monthByQuarter[quarter];
			return { year, month };
		},
	})
);
```

### Removing parsing rules

To remove support for a certain format, use `removeFormat()`

```js
const parser = require('any-date-parser');
const dayMonth = require('any-date-parser/src/formats/dayMonth/dayMonth.js');

parser.removeFormat(dayMonth);
```

### Creating a custom parser

To create a new parser with a limited list of formats or your own custom
formats, use `new Parser`

```js
const { Parser } = require('any-date-parser');
const time24Hours = require('any-date-parser/src/formats/time24Hours/time24Hours.js');
const yearMonthDay = require('any-date-parser/src/formats/yearMonthDay/yearMonthDay.js');
const ago = require('any-date-parser/src/formats/ago/ago.js');

const parser = new Parser();
parser.addFormats([time24Hours, yearMonthDay, ago]);
```

You can convert your custom parser to a function. For example:

```js
const { Parser } = require('any-date-parser');
const parser = new Parser();
// ....
parser.addFormats(/*...*/);
// Pass locale if you want to override the detected default
Date.fromString = parser.exportAsFunction();
Date.fromAny = parser.exportAsFunctionAny();
```

## Unit tests

`any-date-parser` has 100% code coverage.

### Testing

- To run tests, run `npm test`
- To check coverage, run `npm run coverage`
- _Note_ - npm test will attempt to install full-icu and luxon globally if not
  present

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
