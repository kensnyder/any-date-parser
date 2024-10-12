import LocaleHelper from '../LocaleHelper/LocaleHelper';
import { compile } from '../patterns/patterns';
import PatternMatcher from './PatternMatcher';

type HandlerResult = {
  year?: string | number;
  month?: string | number;
  monthname?: string;
  day?: string | number;
  hour?: string | number;
  minute?: string | number;
  second?: string | number;
  millisecond?: string | number;
  meridiem?: string;
  offset?: string | number;
  zone?: string;
  invalid?: string;
};

type FinalResult = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
  offset: number;
};

const matcherByLocale = {};

export default function getMatcher(locale: string) {
  if (!matcherByLocale[locale]) {
    const helper = LocaleHelper.factory(locale);
    matcherByLocale[locale] = new PatternMatcher<HandlerResult, FinalResult>({
      doneChecker,
      fallback: getFallback(locale),
      patterns: compile(helper),
      formatter: getFormatter(helper),
    });
  }
  return matcherByLocale[locale];
}

function doneChecker(res, input: string) {
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
    const result = {} as FinalResult;
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
  };
}
