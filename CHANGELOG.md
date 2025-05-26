## Change Log

### v2.2.0 on 2025-05-26

- Update deps
- Support yyyy/mm/dd

### v2.1.0 on 2025-04-05

- Update deps
- Support "AM/PM" with offset (e.g. "4/19/2021, 10:04:02 AM -04:00")
- Add back in browser-bundle.js for jsDelivr

### v2.0.3 on 2025-01-20

- Properly interpret "12am" as hour 0

### v2.0.2 on 2025-01-20

- Fix return type of attempt()
- Update deps
- Get demo working

### v2.0.1 on 2025-01-10

- Add Timezone name "Coordinated Universal Time"

### v2.0.0 on 2024-11-09

- Rewrite in .ts
- Drop support for custom patterns
- Fuzzy date matching to support more formats
- Support more i18n formats

### v1.6.0 on 2022-01-23

- Support more i18n formats
- Update dev dependencies
- Pin dev dependencies

### v1.5.1 on 2021-09-06

- Support dashes in day-month-year

### v1.5.0 on 2021-09-04

- Support parens around timezone
- Allow 1- and 2-digit milliseconds
- Allow decimals in ago format
- In browsers, export to window
- Fix for handling 12pm on 12-hour parser
- Add demo page (npm run demo)
- Update dev dependencies

### v1.4.6 on 2021-07-28

- Fix typo in readme
- Update dev dependencies

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
