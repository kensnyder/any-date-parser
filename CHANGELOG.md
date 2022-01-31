## Change Log

### v1.5.2 on 2022-01-31

- Fixes GitHub issue #12
- Avoid overflowing when month has too many days
- When year, month or day are missing, default to 2000, Jan, 1 respectively

### v1.5.1 on 2021-09-06

- Support dashes in day-month-year

### v1.5.0 on 2021-09-04

- Support parens around timezone
- Allow 1- and 2-digit milliseconds
- Allow decimals in ago format
- In browsers, export to window
- Fix for handling 12pm on 12-hour parser
- Add demo page (npm run demo)
- Update dependencies

### v1.4.6 on 2021-07-28

- Fix typo in readme
- Update dependencies

### v1.4.5 on 2021-05-25

- Fix link to full-icu
- Generate index.d.ts for TypeScript support

### v1.4.3 on 2021-05-23

- Provide a way to export a parser as a function: `parser.exportAsFunction()`
  and `parser.exportAsFunctionAny()`
  [Addresses #7](https://github.com/kensnyder/any-date-parser/issues/7)

### v1.4.2 on 2021-05-23

- Normalize default locales like `en_US` and `en-US.UTF-8` -
  [Fixes #3](https://github.com/kensnyder/any-date-parser/issues/3)

### v1.4.1 on 2021-05-23

- Support commas between date parts -
  [Fixes #2](https://github.com/kensnyder/any-date-parser/issues/2)

### v1.4.0 on 2021-05-23

- Added support for other whitespace characters between date parts
- Improved docs
- Improved test scripts to auto install luxon and full-icu if not present
- Fixed bug in numbering system RegExp
- Support restricting parsers to a list of locales
- Restrict monthDayYear to `en-US` and similar locales

_... incomplete history_

### v1.0.0 on 2020-02-20

- Initial release
