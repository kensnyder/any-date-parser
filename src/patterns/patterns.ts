import LocaleHelper from '../LocaleHelper/LocaleHelper';
import { mdyLocales } from '../data/mdyLocales';
import { chineseGroup as d } from '../data/numberingSystems';
import unitShortcuts from '../data/unitShortcuts';

export const nowGetter = {
  now: () => new Date(),
};

export function handlerWith(units: string[]) {
  return function handler(matches: string[]) {
    const result: Record<string, any> = {};
    for (let i = 0, len = units.length; i < len; i++) {
      const unit = units[i];
      if (unit) {
        result[unit] = matches[i];
      }
    }
    return result;
  };
}

export function compile(helper: LocaleHelper) {
  const patterns = [
    {
      name: 'timestampWithOffset',
      regex: helper.compile(
        '^(_YEAR4_)-(_MONTH_)-(_DAY_)[T ](_H24_):(_MIN_):(_SEC_)(?:.(_MS_))? ?(_OFFSET_|Z)?$'
      ),
      handler: handlerWith([
        '',
        'year',
        'month',
        'day',
        'hour',
        'minute',
        'second',
        'millisecond',
        'offset',
      ]),
    },
    {
      name: 'timestampWithZone',
      regex: helper.compile(
        '^(_YEAR4_)-(_MONTH_)-(_DAY_)[T ](_H24_):(_MIN_):(_SEC_)(?:.(_MS_))?\\s*(_ZONE_)$'
      ),
      handler: handlerWith([
        '',
        'year',
        'month',
        'day',
        'hour',
        'minute',
        'second',
        'millisecond',
        'zone',
      ]),
    },
    {
      name: 'timestampWithOffsetAndZone',
      regex: helper.compile(
        '^(_YEAR4_)-(_MONTH_)-(_DAY_)[T ](_H24_):(_MIN_):(_SEC_)(?:.(_MS_))? (_OFFSET_|Z)\\s*(_ZONE_)$'
      ),
      handler: handlerWith([
        '',
        'year',
        'month',
        'day',
        'hour',
        'minute',
        'second',
        'millisecond',
        'offset',
      ]),
    },
    {
      name: 'chinese',
      regex: helper.compile(
        `^(${d}{2,4})\\s*年\\s*(${d}{1,2})\\s*月\\s*(${d}{1,2})\\s*日$`
      ),
      handler: handlerWith(['', 'year', 'month', 'day']),
    },
    {
      name: 'korean',
      regex: helper.compile('^(_YEAR_)년\\s*(_MONTH_)월\\s*(_DAY_)일$'),
      handler: handlerWith(['', 'year', 'month', 'day']),
    },
    {
      name: 'twitter',
      regex:
        /^(?:sun|mon|tue|wed|thu|fri|sat) (jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec) (\d{2}) (\d{2}):(\d{2}):(\d{2}) ([+-]\d{4}) (\d{4})$/i,
      handler: handlerWith([
        '',
        'monthname',
        'day',
        'hour',
        'minute',
        'second',
        'offset',
        'year',
      ]),
    },
    {
      name: 'today',
      regex: /^(now|today|tomorrow|yesterday)$/i,
      handler: function (match: string[]) {
        const now = nowGetter.now();
        const aDay = 24 * 60 * 60 * 1000;
        const keyword = match[0].toLowerCase();
        const toAdd = {
          now: 0,
          today: 0,
          tomorrow: aDay,
          yesterday: -1 * aDay,
        }[keyword];
        if (toAdd !== 0) {
          now.setTime(now.getTime() + toAdd);
        }
        const result = {
          year: now.getFullYear(),
          month: now.getMonth() + 1,
          day: now.getDate(),
        };
        if (keyword === 'now') {
          return {
            ...result,
            hour: now.getHours(),
            minute: now.getMinutes(),
            second: now.getSeconds(),
            millisecond: now.getMilliseconds(),
          };
        }
        return result;
      },
    },
    {
      name: 'ago',
      regex:
        /^(\+|-|in|) ?([\d.]+) ?(years?|months?|weeks?|days?|hours?|minutes?|seconds?|milliseconds?|ms|s|m|h|w|d|M|y)( ago)?$/i,
      handler: function ([, sign, amount, unit, isAgo]) {
        amount = parseFloat(amount);
        if (unit.length <= 2) {
          unit = unitShortcuts[unit];
        } else {
          unit = unit.replace(/s$/, '');
          unit = unit.toLowerCase();
        }
        if (unit === 'week') {
          unit = 'day';
          amount *= 7;
        }
        if (sign === '-' || isAgo) {
          amount *= -1;
        }
        const now = nowGetter.now();
        if (unit === 'millisecond') {
          now.setUTCMilliseconds(now.getUTCMilliseconds() + amount);
        } else if (unit === 'second') {
          now.setUTCSeconds(now.getUTCSeconds() + amount);
        } else if (unit === 'minute') {
          now.setUTCMinutes(now.getUTCMinutes() + amount);
        } else if (unit === 'hour') {
          now.setUTCHours(now.getUTCHours() + amount);
        } else if (unit === 'day') {
          now.setUTCDate(now.getUTCDate() + amount);
        } else if (unit === 'month') {
          now.setUTCMonth(now.getUTCMonth() + amount);
        } else if (unit === 'year') {
          now.setUTCFullYear(now.getUTCFullYear() + amount);
        }
        return {
          year: now.getUTCFullYear(),
          month: now.getUTCMonth() + 1,
          day: now.getUTCDate(),
          hour: now.getUTCHours(),
          minute: now.getUTCMinutes(),
          second: now.getUTCSeconds(),
          millisecond: now.getUTCMilliseconds(),
        };
      },
    },
    {
      name: 'atSeconds',
      regex: /^@(\d+)$/,
      handler: function (matches: string[]) {
        const seconds = parseInt(matches[1], 10);
        const date = new Date(seconds * 1000);
        return {
          year: date.getUTCFullYear(),
          month: date.getUTCMonth() + 1,
          day: date.getUTCDate(),
          hour: date.getUTCHours(),
          minute: date.getUTCMinutes(),
          second: date.getUTCSeconds(),
        };
      },
    },
    {
      name: 'microsoftJson',
      regex: /^\/Date\((\d+)([+-]\d{4})?\)\/$/,
      handler: function (matches: string[]) {
        const milliseconds = parseInt(matches[1], 10);
        const date = new Date(milliseconds);
        return {
          year: date.getUTCFullYear(),
          month: date.getUTCMonth() + 1,
          day: date.getUTCDate(),
          hour: date.getUTCHours(),
          minute: date.getUTCMinutes(),
          second: date.getUTCSeconds(),
          millisecond: date.getUTCMilliseconds(),
          offset: matches[2],
        };
      },
    },
    //
    // partial-matching formats
    //
    {
      name: 'full24',
      regex: helper.compile(
        '(?:^|[\\sT])(_H24_):(_MIN_):(_SEC_)(?:\\.(_MS_))?(Z)?$'
      ),
      handler: handlerWith([
        '',
        'hour',
        'minute',
        'second',
        'millisecond',
        'zone',
      ]),
    },
    {
      name: 'zone24',
      regex: helper.compile(
        '(_H24_):(_MIN_):(_SEC_)(?:\\.(_MS_))?[\\s\\[(]*(_ZONE_)?[\\s\\])]*$'
      ),
      handler: handlerWith([
        '',
        'hour',
        'minute',
        'second',
        'millisecond',
        'zone',
      ]),
    },
    {
      name: 'hms12WithOffset',
      regex: helper.compile(
        '(_H12_):(_MIN_):(_SEC_)\\s*(_MERIDIEM_)\\s*(_OFFSET_)'
      ),
      handler: handlerWith([
        '',
        'hour',
        'minute',
        'second',
        'meridiem',
        'offset',
      ]),
    },
    {
      name: 'hms12',
      regex: helper.compile('(_H12_):(_MIN_):(_SEC_)\\s*(_MERIDIEM_)'),
      handler: handlerWith(['', 'hour', 'minute', 'second', 'meridiem']),
    },
    {
      name: 'hms24',
      regex: helper.compile('(_H24_):(_MIN_):(_SEC_)(?:\\.(_MS_))?'),
      handler: handlerWith(['', 'hour', 'minute', 'second', 'millisecond']),
    },
    {
      name: 'hm12',
      regex: helper.compile('(_H12_):(_MIN_)\\s*(_MERIDIEM_)'),
      handler: handlerWith(['', 'hour', 'minute', 'meridiem']),
    },
    {
      name: 'hm24',
      regex: helper.compile('(_H24_):(_MIN_)'),
      handler: handlerWith(['', 'hour', 'minute']),
    },
    {
      name: 'h12',
      regex: helper.compile('(_H12_)\\s*(_MERIDIEM_)'),
      handler: handlerWith(['', 'hour', 'meridiem']),
    },
    {
      name: '8digit',
      regex: /^((?:19|20)\d{2})(\d{2})(\d{2})$/,
      handler: handlerWith(['', 'year', 'month', 'day']),
    },
    {
      name: 'yearMonthnameDay',
      regex: helper.compile(
        '(_YEAR4_)[\\s.-]+(_MONTHNAME_)[\\s,.-]+(_DAY_)(_ORDINAL_)?'
      ),
      handler: handlerWith(['', 'year', 'monthname', 'day']),
    },
    {
      name: 'dayMonthnameYear',
      regex: helper.compile(
        '(_DAY_)(_ORDINAL_)?[\\s.-]*(_MONTHNAME_)[\\s,.-]+(_YEAR_)'
      ),
      handler: handlerWith(['', 'day', '', 'monthname', 'year']),
    },
    {
      name: 'monthnameDayYear',
      regex: helper.compile(
        '(_MONTHNAME_)[\\s.-]*(_DAY_)(_ORDINAL_)?[\\s,.-]+(_YEAR_)'
      ),
      handler: handlerWith(['', 'monthname', 'day', '', 'year']),
    },
    {
      name: 'dayMonthname',
      regex: helper.compile('\\b(_DAY_)(_ORDINAL_)?[\\s.-]*(_MONTHNAME_)\\b'),
      handler: handlerWith(['', 'day', '', 'monthname']),
    },
    {
      name: 'monthnameDay',
      regex: helper.compile('\\b(_MONTHNAME_)[\\s.-]*(_DAY_)(_ORDINAL_)?\\b'),
      handler: handlerWith(['', 'monthname', 'day']),
    },
    {
      name: 'hmsNoMeridiem',
      regex: helper.compile('\\b(_H12_|_H24_):(_MIN_):(_SEC_)\\b'),
      handler: handlerWith(['', 'hour', 'minute', 'second']),
    },
    {
      name: 'hmNoMeridiem',
      regex: helper.compile('\\b(_H12_|_H24_):(_MIN_)\\b'),
      handler: handlerWith(['', 'hour', 'minute']),
    },
    {
      name: 'ymd',
      regex: helper.compile('(_YEAR4_)([.-])(_MONTH_)\\2+(_DAY_)'),
      handler: handlerWith(['', 'year', '', 'month', 'day']),
    },
    {
      name: 'mdy',
      regex: helper.compile('(_MONTH_)([/-])(_DAY_)\\2(_YEAR_)'),
      handler: handlerWith(['', 'month', '', 'day', 'year']),
    },
    {
      name: 'dmy',
      regex: helper.compile(
        '(_DAY_)(?:_ORDINAL_)?[./\\s-]+(_MONTH_)[./\\s-]+(_YEAR_)'
      ),
      handler: handlerWith(['', 'day', 'month', 'year']),
    },
    {
      name: 'yearLoose',
      regex: helper.compile('_YEAR4_'),
      handler: handlerWith(['year']),
    },
    {
      name: 'dayMonthnameLoose',
      regex: helper.compile('(_DAY_)[\\s.]*(_MONTHNAME_)'),
      handler: handlerWith(['', 'day', 'monthname']),
    },
    {
      name: 'monthnameDayLoose',
      regex: helper.compile('(_MONTHNAME_)[\\s.]*(_DAY_)'),
      handler: handlerWith(['', 'monthname', 'day']),
    },
    {
      name: 'monthname',
      regex: helper.compile('_MONTHNAME_'),
      handler: handlerWith(['monthname']),
    },
    {
      name: 'year4',
      regex: helper.compile('_YEAR4_'),
      handler: handlerWith(['year']),
    },
    {
      name: 'md',
      regex: helper.compile('(_MONTH_)[/-](_DAY_)'),
      handler: handlerWith(['', 'month', 'day']),
    },
    {
      name: 'dm',
      regex: helper.compile('(_DAY_)(?:_ORDINAL_)?[./\\s-]+(_MONTH_)'),
      handler: handlerWith(['', 'day', 'month']),
    },
    {
      name: 'day',
      regex: helper.compile('_DAY_'),
      handler: handlerWith(['day']),
    },
    {
      name: 'year2',
      regex: helper.compile('_YEAR2_'),
      handler: handlerWith(['year']),
    },
    {
      name: 'onlyZone',
      regex: helper.compile('_ZONE_'),
      handler: handlerWith(['zone']),
    },
    {
      name: 'onlyOffset',
      regex: helper.compile('_OFFSET_'),
      handler: handlerWith(['offset']),
    },
  ];
  // console.log(
  //   'patterns.ts',
  //   patterns.filter(p => p.name.includes('timestampWithOffsetAndZone'))
  // );
  const twoLetterLocale = helper.baseName.slice(0, 5);
  // remove mdy except for certain locales
  if (mdyLocales.includes(twoLetterLocale)) {
    return patterns;
  }
  return patterns.filter(p => !['mdy', 'md'].includes(p.name));
}
