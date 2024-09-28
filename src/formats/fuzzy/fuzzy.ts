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
          const offset = helper.lookups.zone[zoneName];
          if (!offset) {
            return null;
          }
          return { offset };
        },
      },
      {
        // time12 must come before time24 because it has MERIDIEM text
        name: 'time12',
        regex: helper.compile(
          '(_H12_)(?::(_MIN_))?(?::(_SEC_))?\\s*(_MERIDIEM_)'
        ),
        handler: ([, hour, min, second, ampm]) => {
          const meridiemOffset =
            helper.lookups.meridiem[ampm?.toLowerCase()] || 0;
          let hourInt = helper.toInt(hour);
          if (hourInt < 12 && meridiemOffset === 12) {
            hourInt += 12;
          }
          return {
            hour: hourInt,
            minute: min ? helper.toInt(min) : 0,
            second: second ? helper.toInt(second) : 0,
          };
        },
      },
      {
        name: 'time24',
        regex: helper.compile('(_H24_):(_MIN_)(?::(_SEC_))?(?:\\.(_MS_))?'),
        handler: ([, hour, min, seconds, ms]) => {
          const result: {
            hour: number;
            minute: number;
            second?: number;
            millisecond?: number;
          } = {
            hour: helper.toInt(hour),
            minute: helper.toInt(min),
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
        name: 'time12noMeridiem',
        regex: helper.compile('(_H12_):(_MIN_)(?::(_SEC_))?'),
        handler: ([, hour, min, second]) => {
          return {
            hour: helper.toInt(hour),
            minute: min ? helper.toInt(min) : 0,
            second: second ? helper.toInt(second) : 0,
          };
        },
      },
      {
        name: 'monthname',
        regex: helper.compile('\\b(_MONTHNAME_)\\b'),
        handler: ([, monthName]) => {
          const lower = monthName.toLocaleLowerCase(locale).replace(/\.$/, '');
          const monthNumber = helper.lookups.month[lower];
          return { month: monthNumber };
        },
      },
      {
        name: 'year4',
        regex: helper.compile('(_YEAR4_)'),
        handler: ([, yearNumber]) => {
          return { year: helper.toInt(yearNumber) };
        },
      },
      {
        // offset must come after times and years to avoid confusion
        name: 'offset',
        regex: helper.compile('\\b(_OFFSET_)\\b'),
        handler: ([offsetString]) => {
          return { offset: helper.offsetToMinutes(offsetString) };
        },
      },
      {
        name: 'monthDay',
        regex: helper.compile('(?:^|\\D)(_MONTH_)\\D+(_DAY_)(?:$|\\D)'),
        handler: ([, month, day], current) => {
          if (current.month > 0) {
            return null;
          }
          return { day: helper.toInt(day), month: helper.toInt(month) };
        },
      },
      {
        name: 'dayMonth',
        regex: helper.compile('(?:^|\\D)(_DAY_)\\D+(_MONTH_)(?:$|\\D)'),
        handler: ([, day, month], current) => {
          if (current.month > 0) {
            return null;
          }
          return { day: helper.toInt(day), month: helper.toInt(month) };
        },
      },
      {
        name: 'daynumber',
        // allow trailing non-number to allow ordinal suffixes
        regex: helper.compile('(?:^|\\D)(_DAY_)(?:$|\\D)'),
        handler: ([, dayNumber]) => {
          return { day: helper.toInt(dayNumber) };
        },
      },
      {
        name: 'unboundMonthname',
        regex: helper.compile('(_MONTHNAME_)'),
        handler: ([, monthName], current) => {
          if (current.month > 0) {
            return null;
          }
          const lower = monthName.toLocaleLowerCase(locale).replace(/\.$/, '');
          const monthNumber = helper.lookups.month[lower];
          return { month: monthNumber };
        },
      },
      // {
      //   name: 'unboundMonthname',
      //   regex: /^.{2,}$/,
      //   handler: ([rest], current) => {
      //     if (current.month > 0) {
      //       return null;
      //     }
      //     for (const [name, month] of Object.entries(helper.lookups.month)) {
      //       if (rest.includes(name)) {
      //         return { month };
      //       }
      //     }
      //     return null;
      //   },
      // },
      // {
      //   name: 'monthnumber',
      //   regex: helper.compile('\\b(_MONTH_)\\b'),
      //   handler: ([monthNumber], alreadyFound) => {
      //     if (alreadyFound.month === undefined) {
      //       return { month: helper.toInt(monthNumber) };
      //     }
      //   },
      // },
    ];
    // if (locale === 'es-ES') {
    //   console.log(extractorsByLocale[locale][1]);
    //   console.log(extractorsByLocale[locale][2]);
    // }
    // extractorsByLocale[locale].forEach(e =>
    //   console.log({ name: e.name, regex: e.regex })
    // );
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
        // if (locale === 'ru-RU' && fullString === '31 января 2020 г.') {
        //   console.log({
        //     workingString,
        //     name: extractor.name,
        //     regex: extractor.regex,
        //     result,
        //   });
        // }
        continue;
      }
      const handled = extractor.handler(match, result);
      if (typeof handled === 'object') {
        Object.assign(result, handled);
        workingString = workingString.replace(match[0], '');
        // if (fullString === 'In 1929, the stock market crashed on October 29') {
        //   console.log({
        //     fullString,
        //     locale,
        //     workingString,
        //     name: extractor.name,
        //     regex: extractor.regex,
        //     result,
        //     match,
        //     handled,
        //   });
        // }
        hasMatch = true;
      }
    }
    if (!hasMatch) {
      return null;
    }
    // if (locale === 'ar-SA') console.log('-----');
    return result;
  },
});

export default fuzzy;
