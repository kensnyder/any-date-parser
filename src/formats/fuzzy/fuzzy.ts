import Format, { HandlerResult } from '../../Format/Format';
import LocaleHelper from '../../LocaleHelper/LocaleHelper';

const extractorsByLocale = {};

export function getExtractors(locale: string) {
  if (!extractorsByLocale[locale]) {
    const helper = LocaleHelper.factory(locale);
    extractorsByLocale[locale] = [
      {
        name: 'zonename',
        regex: helper.compile('(_ZONE_)'),
        handler: ([zoneName]) => {
          return { offset: helper.lookups.zone[zoneName] };
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
        // offset must come after times because it can be confused for a time
        name: 'offset',
        regex: helper.compile('(_OFFSET_)\\b'),
        handler: ([offsetString]) => {
          return { offset: helper.offsetToMinutes(offsetString) };
        },
      },
      {
        name: 'monthname',
        regex: helper.compile('(_MONTHNAME_)'),
        handler: ([, monthName]) => {
          const lower = monthName.toLocaleLowerCase(locale).replace(/\.$/, '');
          const monthNumber = helper.lookups.month[lower];
          if (monthNumber === undefined) {
            console.log('fuzzy monthname not found', monthName);
            return null;
          }
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
        // if (
        //   locale === 'bn-IN' &&
        //   fullString === 'শুক্রবার, ৩১ জানুয়ারী, ২০২০ এ ১২:৩৪:৫৬ PM'
        // ) {
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
        // if (locale === 'ar-SA') {
        //   console.log({
        //     fullString,
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
