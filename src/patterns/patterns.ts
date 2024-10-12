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
  function onlyLocales(locales: string[], handler: any) {
    const twoLetterLocale = helper.baseName.slice(0, 2).toLowerCase();
    return function (matches: string[]) {
      if (locales.includes(twoLetterLocale)) {
        return handler(matches);
      }
      return null;
    };
  }
  return [
    {
      name: 'timestamp',
      regex: helper.compile(
        '^(_YEAR4_)-(_MONTH_)-(_DAY_)[T ](_H24_):(_MIN_):(_SEC_)(:?.(_MS_))?(:? ?(_OFFSET_|Z))?$'
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
      handler: function (match) {
        const now = nowGetter.now();
        const keyword = match[1].toLowerCase();
        switch (keyword) {
          case 'tomorrow':
            // JavaScript automatically handles flowing from one day to the next
            // For example, 31 jan 2020 will auto convert to 1 feb 2020
            now.setUTCDate(now.getUTCDate() + 1);
            break;
          case 'yesterday':
            now.setUTCDate(now.getUTCDate() - 1);
            break;
        }
        const result = {
          year: now.getUTCFullYear(),
          month: now.getUTCMonth() + 1,
          day: now.getUTCDate(),
        } as Record<string, number>;
        if (keyword === 'now') {
          result.hour = now.getUTCHours();
          result.minute = now.getUTCMinutes();
          result.second = now.getUTCSeconds();
          result.millisecond = now.getUTCMilliseconds();
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
      handler: function (matches) {
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
          offset: matches[2] || 0,
        };
      },
    },
    // partial-matching formats
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
      name: 'hms24',
      regex: helper.compile('(_H24_):(_MIN_):(_SEC_)(?:\\.(_MS_))?'),
      handler: handlerWith(['', 'hour', 'minute', 'second', 'millisecond']),
    },
    {
      name: 'hms12',
      regex: helper.compile('(_H12_):(_MIN_):(_SEC_)\\s*(_MERIDIEM_)'),
      handler: handlerWith(['', 'hour', 'minute', 'second', 'meridiem']),
    },
    {
      name: 'hm24',
      regex: helper.compile('(_H24_):(_MIN_)'),
      handler: handlerWith(['', 'hour', 'minute']),
    },
    {
      name: 'hm12',
      regex: helper.compile('(_H12_):(_MIN_)\\s*(_MERIDIEM_)'),
      handler: handlerWith(['', 'hour', 'minute', 'meridiem']),
    },
    {
      name: 'h12',
      regex: helper.compile('(_H12_)\\s*(_MERIDIEM_)'),
      handler: handlerWith(['', 'hour', 'meridiem']),
    },
    {
      name: 'onlyZone',
      regex: helper.compile('_ZONE_'),
      handler: handlerWith(['zone']),
    },
    {
      name: 'year',
      regex: helper.compile('\\b_YEAR4_\\b'),
      handler: handlerWith(['year']),
    },
    {
      name: 'monthnameDay',
      regex: helper.compile('\\b(_MONTHNAME_)[\\s.]*(_DAY_)\\b'),
      handler: handlerWith(['', 'monthname', 'day']),
    },
    {
      name: 'dayMonthname',
      regex: helper.compile('\\b(_DAY_)[\\s.]*(_MONTHNAME_)\\b'),
      handler: handlerWith(['', 'day', 'monthname']),
    },
    {
      name: 'hmsNoMeridiem',
      regex: helper.compile('\\b(_H12_|_H24_)[:.](_MIN_)[:.](_SEC_)\\b'),
      handler: handlerWith(['', 'hour', 'minute', 'second']),
    },
    {
      name: 'hmNoMeridiem',
      regex: helper.compile('\\b(_H12_|_H24_)[:.](_MIN_)\\b'),
      handler: handlerWith(['', 'hour', 'minute']),
    },
    {
      name: 'mdy',
      regex: helper.compile('\\b(_MONTH_)([/-])(_DAY_)\\2(_YEAR_)\\b'),
      handler: onlyLocales(
        mdyLocales,
        handlerWith(['', 'month', '', 'day', 'year'])
      ),
    },
    {
      name: 'dmy',
      regex: helper.compile(
        '\\b(_DAY_)[./\\s-]+(_MONTH_)[./\\s-]+(_YEAR4_)\\b'
      ),
      handler: handlerWith(['', 'day', 'month', 'year']),
    },
    {
      name: 'ymd',
      regex: helper.compile('\\b(_YEAR4_)([.-])(_MONTH_)\\2+(_DAY_)\\b'),
      handler: handlerWith(['', 'year', '', 'month', 'day']),
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
      name: 'day',
      regex: helper.compile('_DAY_'),
      handler: handlerWith(['day']),
    },
  ];
}
