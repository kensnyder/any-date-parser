import Format, { HandlerResult } from '../../Format/Format';
import LocaleHelper from '../../LocaleHelper/LocaleHelper';
import { mdyLocales } from '../../data/mdyLocales';

const extractorsByLocale = {};

export function full24Extractor(helper: LocaleHelper) {
  return {
    regex: helper.compile(
      '(?:^|[\\sT])(_H24_):(_MIN_):(_SEC_)(?:\\.(_MS_))?(Z)?$'
    ),
    matches: ['', 'hour', 'minute', 'second', 'millisecond', 'zone'],
    replaceWith: '',
  };
}

export function zone24Extractor(helper: LocaleHelper) {
  return {
    regex: helper.compile(
      '(_H24_):(_MIN_):(_SEC_)(?:\\.(_MS_))?[\\s\\[(]*(_ZONE_)?[\\s\\])]*$'
    ),
    matches: ['', 'hour', 'minute', 'second', 'millisecond', 'zone'],
    replaceWith: '',
  };
}

export function hms24Extractor(helper: LocaleHelper) {
  return {
    regex: helper.compile('(_H24_):(_MIN_):(_SEC_)(?:\\.(_MS_))?'),
    matches: ['', 'hour', 'minute', 'second', 'millisecond'],
    replaceWith: '',
  };
}

export function hms12Extractor(helper: LocaleHelper) {
  return {
    regex: helper.compile('(_H12_):(_MIN_):(_SEC_)\\s*(_MERIDIEM_)'),
    matches: ['', 'hour', 'minute', 'second', 'meridiem'],
    replaceWith: '',
  };
}

export function hm24Extractor(helper: LocaleHelper) {
  return {
    regex: helper.compile('(_H24_):(_MIN_)'),
    matches: ['', 'hour', 'minute'],
    replaceWith: '',
  };
}

export function hm12Extractor(helper: LocaleHelper) {
  return {
    regex: helper.compile('(_H12_):(_MIN_)\\s*(_MERIDIEM_)'),
    matches: ['', 'hour', 'minute', 'meridiem'],
    replaceWith: '',
  };
}

export function h12Extractor(helper: LocaleHelper) {
  return {
    regex: helper.compile('(_H12_)\\s*(_MERIDIEM_)'),
    matches: ['', 'hour', 'meridiem'],
    replaceWith: '',
  };
}

export function onlyZoneExtractor(helper: LocaleHelper) {
  return {
    regex: helper.compile('(_ZONE_)'),
    matches: ['zone'],
    replaceWith: '',
  };
}

export function yearExtractor(helper: LocaleHelper) {
  return {
    regex: helper.compile('\\b(_YEAR4_)\\b'),
    matches: ['', 'year'],
    replaceWith: '',
  };
}

export function monthnameDayExtractor(helper: LocaleHelper) {
  return {
    regex: helper.compile('\\b(_MONTHNAME_)[\\s.]*(_DAY_)\\b'),
    matches: ['', 'monthname', 'day'],
    replaceWith: '',
  };
}

export function dayMonthnameExtractor(helper: LocaleHelper) {
  return {
    regex: helper.compile('\\b(_DAY_)[\\s.]*(_MONTHNAME_)\\b'),
    matches: ['', 'day', 'monthname'],
    replaceWith: '',
  };
}

export function hmsNoMeridiemExtractor(helper: LocaleHelper) {
  return {
    regex: helper.compile('\\b(_H12_|_H24_)[:.](_MIN_)[:.](_SEC_)\\b'),
    matches: ['', 'hour', 'minute', 'second'],
    replaceWith: '',
  };
}

export function hmNoMeridiemExtractor(helper: LocaleHelper) {
  return {
    regex: helper.compile('\\b(_H12_|_H24_)[:.](_MIN_)\\b'),
    matches: ['', 'hour', 'minute'],
    replaceWith: '',
  };
}

export function mdyExtractor(helper: LocaleHelper) {
  return {
    regex: helper.compile('\\b(_MONTH_)([/-])(_DAY_)\\2(_YEAR_)\\b'),
    matches: ['', 'month', '', 'day', 'year'],
    locales: mdyLocales,
    replaceWith: '',
  };
}

export function dmyExtractor(helper: LocaleHelper) {
  return {
    regex: helper.compile('\\b(_DAY_)[./\\s-]+(_MONTH_)[./\\s-]+(_YEAR4_)\\b'),
    matches: ['', 'day', 'month', 'year'],
    replaceWith: '',
  };
}

export function ymdExtractor(helper: LocaleHelper) {
  return {
    regex: helper.compile('\\b(_YEAR4_)([.-])(_MONTH_)\\2+(_DAY_)\\b'),
    matches: ['', 'year', '', 'month', 'day'],
    replaceWith: '',
  };
}

export function yearLooseExtractor(helper: LocaleHelper) {
  return {
    regex: helper.compile('(_YEAR4_)'),
    matches: ['', 'year'],
    replaceWith: '',
  };
}

export function dayMonthnameLooseExtractor(helper: LocaleHelper) {
  return {
    regex: helper.compile('(_DAY_)[\\s.]*(_MONTHNAME_)'),
    matches: ['', 'day', 'monthname'],
    replaceWith: '',
  };
}

export function monthnameDayLooseExtractor(helper: LocaleHelper) {
  return {
    regex: helper.compile('(_MONTHNAME_)[\\s.]*(_DAY_)'),
    matches: ['', 'monthname', 'day'],
    replaceWith: '',
  };
}

export function monthnameExtractor(helper: LocaleHelper) {
  return {
    regex: helper.compile('(_MONTHNAME_)'),
    matches: ['', 'monthname'],
    replaceWith: '',
  };
}

export function dayExtractor(helper: LocaleHelper) {
  return {
    regex: helper.compile('(_DAY_)'),
    matches: ['', 'day'],
    replaceWith: '',
  };
}

export function getExtractors(locale: string) {
  if (!extractorsByLocale[locale]) {
    const helper = LocaleHelper.factory(locale);
    // if (locale === 'bn-IN') {
    //   console.log(helper.lookups.month, helper.vars);
    // }
    extractorsByLocale[locale] = [
      full24Extractor(helper),
      zone24Extractor(helper),
      hms12Extractor(helper),
      hms24Extractor(helper),
      hmsNoMeridiemExtractor(helper),
      hm12Extractor(helper),
      hm24Extractor(helper),
      hmNoMeridiemExtractor(helper),
      h12Extractor(helper),
      onlyZoneExtractor(helper),
      yearExtractor(helper),
      dayMonthnameExtractor(helper),
      monthnameDayExtractor(helper),
      mdyExtractor(helper),
      dmyExtractor(helper),
      ymdExtractor(helper),
      yearLooseExtractor(helper),
      dayMonthnameLooseExtractor(helper),
      monthnameDayLooseExtractor(helper),
      monthnameExtractor(helper),
      dayExtractor(helper),
    ];
    // if (locale === 'zh-TW') {
    //   console.log('))))))))))))))', extractorsByLocale[locale][1]);
    //   console.log('))))))))))))))', extractorsByLocale[locale][2]);
    // }
    // extractorsByLocale[locale].forEach(e =>
    //   console.log({ name: e.name, regex: e.regex })
    // );
  }
  return extractorsByLocale[locale];
}

type Extracted = {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
  millisecond?: number;
  offset?: number;
  monthname?: string;
  meridiem?: string;
};

const fuzzy = new Format({
  matcher: /^.+$/,
  handler: function ([fullString], locale: string) {
    if (locale === 'bn-IN') {
      console.log('> ' + fullString);
    }
    const helper = LocaleHelper.factory(locale);
    function isDone(res) {
      return (
        'year' in res &&
        'month' in res &&
        'day' in res &&
        'hour' in res &&
        'minute' in res &&
        'second' in res &&
        'millisecond' in res &&
        'offset' in res
      );
    }
    function toResult(extracted: Extracted) {
      const result: HandlerResult = {};
      for (const [name, value] of Object.entries(extracted)) {
        if (name === 'monthname') {
          result.month = helper.monthNameToInt(value as string);
        } else if (name === 'hour' && extracted.meridiem) {
          result.hour = helper.h12ToInt(value, extracted.meridiem);
        } else if (name === 'zone') {
          result.offset = helper.zoneToOffset(value as string);
        } else if (name === 'offset') {
          result.offset = helper.offsetToMinutes(value as string);
        } else {
          result[name] = helper.toInt(value);
        }
      }
      return result;
    }
    let hasMatch = false;
    let workingString = fullString;
    const extracted: Extracted = {};
    for (const extractor of getExtractors(locale)) {
      // if (
      //   locale === 'bn-IN' &&
      //   fullString === 'শুক্রবার ৩১ জানুয়ারী ২০২০ এ ১:৩১:২০ AM UTC'
      // ) {
      //   console.log('---');
      //   console.log(extractor.regex);
      //   console.log(workingString);
      // }
      if (extractor.locales && !extractor.locales.includes(locale)) {
        continue;
      }
      const match = fullString.match(extractor.regex);
      if (!match) {
        continue;
      }
      for (let i = 0, len = match.length; i < len; i++) {
        const part = match[i];
        const name = extractor.matches[i];
        if (name && part !== '' && part !== undefined && !(name in extracted)) {
          extracted[name] = part;
          hasMatch = true;
        }
      }
      if (isDone(extracted)) {
        return extracted;
      }
      if (extractor.replaceWith) {
        workingString = workingString.replace(
          extractor.regex,
          extractor.replaceWith
        );
        workingString = workingString.trim();
      }
      if (workingString === '') {
        return extracted;
      }
    }
    if (!hasMatch) {
      return null;
    }
    return toResult(extracted);
  },
});

export default fuzzy;
