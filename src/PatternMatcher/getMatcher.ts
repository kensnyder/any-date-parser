import twoDigitYears from '../data/twoDigitYears';
import LocaleHelper from '../LocaleHelper/LocaleHelper';
import { compile } from '../patterns/patterns';
import PatternMatcher from './PatternMatcher';

export type HandlerResult = Partial<{
  year: string | number;
  month: string | number;
  monthname: string;
  day: string | number;
  hour: string | number;
  minute: string | number;
  second: string | number;
  millisecond: string | number;
  meridiem: string;
  offset: string | number;
  zone: string;
  invalid: string;
}>;

export type MatcherResult = Partial<{
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
  offset: number;
  invalid: string;
}>;

const finalFields = [
  'year',
  'month',
  'day',
  'hour',
  'minute',
  'second',
  'millisecond',
  'offset',
];

const matcherByLocale = {};

export default function getMatcher(
  locale: string
): PatternMatcher<HandlerResult, MatcherResult> {
  if (!matcherByLocale[locale]) {
    const helper = LocaleHelper.factory(locale);
    matcherByLocale[locale] = new PatternMatcher<HandlerResult, MatcherResult>({
      doneChecker,
      fallback: getFallback(locale),
      patterns: compile(helper),
      formatter: getFormatter(helper),
    });
  }
  return matcherByLocale[locale];
}

function doneChecker(res: HandlerResult, input: string) {
  return (
    input === '' ||
    /^\s+$/.test(input) ||
    ('year' in res &&
      ('month' in res || 'monthname' in res) &&
      'day' in res &&
      'hour' in res &&
      'minute' in res &&
      'second' in res &&
      'millisecond' in res &&
      ('zone' in res || 'offset' in res))
  );
}

function getFallback(locale: string) {
  return function handleInvalid(input: string) {
    let string = String(input).slice(0, 50);
    if (string === '') {
      string = '(empty string)';
    }
    return { invalid: `Unable to parse "${string}" with locale "${locale}"` };
  };
}

function getFormatter(helper: LocaleHelper) {
  return function format(extracted: HandlerResult) {
    const result = {} as MatcherResult;
    for (const [name, value] of Object.entries(extracted)) {
      if (name === 'monthname') {
        if (value) {
          const month = helper.monthNameToInt(value as string);
          if (month !== undefined) {
            result.month = month;
          }
        }
      } else if (name === 'hour' && extracted.meridiem) {
        const hour = helper.h12ToInt(value, extracted.meridiem);
        if (hour !== undefined) {
          result.hour = hour;
        }
      } else if (name === 'zone') {
        if (value) {
          const offset = helper.zoneToOffset(value as string);
          if (offset !== undefined) {
            result.offset = offset;
          }
        }
      } else if (name === 'offset') {
        const offset = helper.offsetToMinutes(value as string);
        if (offset !== undefined) {
          result.offset = offset;
        }
      } else if (name === 'millisecond') {
        const casted = helper.millisecondToInt(value);
        if (typeof casted === 'number') {
          result.millisecond = casted;
        }
      } else if (finalFields.includes(name)) {
        const casted = helper.toInt(value);
        if (typeof casted === 'number') {
          result[name] = casted;
        }
      }
    }
    if (result.year < 100) {
      result.year = twoDigitYears[result.year];
    }
    if (result.year && helper.dateOptions.calendar === 'buddhist') {
      result.year -= 543;
    }
    return result;
  };
}
