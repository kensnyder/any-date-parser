import Format, { HandlerResult } from '../../Format/Format';
import LocaleHelper from '../../LocaleHelper/LocaleHelper';

const extractorsByLocale = {};

export function getExtractors(locale: string) {
  if (!extractorsByLocale[locale]) {
    const helper = LocaleHelper.factory(locale);
    extractorsByLocale[locale] = [
      {
        name: 'zonename',
        regex: helper.compile('\\b(_ZONE_)\\b'),
        handler: ([zoneName]) => {
          return { offset: helper.lookups.zone[zoneName] };
        },
      },
      {
        name: 'offset',
        regex: helper.compile('\\b(_OFFSET_)\\b'),
        handler: ([offsetString]) => {
          return { offset: helper.offsetToMinutes(offsetString) };
        },
      },
      {
        name: 'time12',
        regex: helper.compile(
          '\\b(_H12_)(?::(_MIN_))?(?::(_SEC_))?(_MERIDIEM_)\\b'
        ),
        handler: ([, h12, min, second, ampm]) => {
          const meridiemOffset =
            helper.lookups.meridiem[ampm?.toLowerCase()] || 0;
          let hourInt = helper.toInt(h12) + meridiemOffset;
          return {
            hour: hourInt,
            minute: min ? helper.toInt(min) : 0,
            second: second ? helper.toInt(second) : 0,
          };
        },
      },
      {
        name: 'time24',
        regex: helper.compile(
          '\\b(_H24_):(_MIN_)(?::(_SEC_))?(?:\\.(_MS_))?\\b'
        ),
        handler: ([, hour, min, seconds, ms]) => {
          const result = {
            hour: helper.toInt(hour),
            minute: helper.toInt(min),
            second: undefined,
            millisecond: undefined,
          };
          if (seconds) {
            result.second = helper.toInt(seconds);
          }
          if (ms) {
            result.millisecond = helper.toInt(ms);
          }
          return result;
        },
      },
      {
        name: 'monthname',
        regex: helper.compile('\\b(_MONTHNAME_)\\b'),
        handler: ([monthName]) => {
          const monthNumber =
            helper.lookups.month[monthName.toLocaleLowerCase(locale)];
          if (monthNumber === undefined) {
            return null;
          }
          return { month: monthNumber };
        },
      },
      {
        name: 'daynumber',
        // allow trailing non-number to allow ordinal suffixes
        regex: helper.compile('\\b(_DAY_)(\\b|\\D)'),
        handler: ([, dayNumber]) => {
          return { day: helper.toInt(dayNumber) };
        },
      },
      {
        name: 'monthnumber',
        regex: helper.compile('\\b(_MONTH_)\\b'),
        handler: ([monthNumber], alreadyFound) => {
          if (alreadyFound.month === undefined) {
            return { month: helper.toInt(monthNumber) };
          }
        },
      },
      {
        name: 'year4',
        regex: helper.compile('\\b(_YEAR4_)\\b'),
        handler: ([yearNumber]) => {
          return { year: helper.toInt(yearNumber) };
        },
      },
    ];
  }
  return extractorsByLocale[locale];
}

const fuzzy = new Format({
  matcher: /^.+$/,
  handler: function ([fullString], locale: string) {
    let workingString = fullString;
    const result: HandlerResult = {};
    let hasMatch = false;
    for (const extractor of getExtractors(locale)) {
      const match = workingString.match(extractor.regex);
      if (!match) {
        continue;
      }
      const handled = extractor.handler(match, result);
      if (typeof handled === 'object') {
        Object.assign(result, handled);
        workingString = workingString.replace(extractor.regex, '');
        hasMatch = true;
      }
    }
    if (!hasMatch) {
      return null;
    }
    return result;
  },
});

export default fuzzy;
