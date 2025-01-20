import defaultLocale from './data/defaultLocale';
import { MaybeValidDate } from './MaybeValidDate/MaybeValidDate';
import getMatcher, { type MatcherResult } from './PatternMatcher/getMatcher';
import runPreprocessors from './runPreprocessors/runPreprocessors';
export type { MatcherResult } from './PatternMatcher/getMatcher';

export function attempt(
  dateStr: string,
  locale = defaultLocale
): MatcherResult {
  const matcher = getMatcher(locale);
  const processed = runPreprocessors(dateStr, locale);
  return matcher.attempt(processed);
}

export function fromObject(parsed: MatcherResult): MaybeValidDate {
  if (parsed.month && parsed.day && parsed.year === undefined) {
    parsed.year = new Date().getFullYear();
  }
  if (parsed.second === 60) {
    // move leap seconds to previous second
    // see https://en.wikipedia.org/wiki/Leap_second#Implementation_differences
    parsed.second = 59;
  }
  const date = new MaybeValidDate(
    parsed.year,
    parsed.month - 1,
    parsed.day,
    parsed.hour || 0,
    parsed.minute || 0,
    parsed.second || 0,
    parsed.millisecond || 0
  );
  if (typeof parsed.offset === 'number') {
    return new MaybeValidDate(date.valueOf() - parsed.offset * 60 * 1000);
  }
  return date;
}

export function fromString(
  dateStr: string,
  locale = defaultLocale
): MaybeValidDate {
  const result = attempt(dateStr, locale);
  const date = result.invalid ? new MaybeValidDate(NaN) : fromObject(result);
  if (!date.isValid()) {
    date.invalid = `Unable to parse date "${dateStr}"`;
  }
  return date;
}

export function fromAny(
  any: string | number | Date,
  locale = defaultLocale
): MaybeValidDate {
  if (any instanceof Date) {
    return new MaybeValidDate(any.valueOf());
  }
  if (typeof any === 'number') {
    return new MaybeValidDate(any);
  }
  return fromString(any, locale);
}

// create functions on Date and window
// @ts-expect-error  Yes, we are extending the global Date object
Date.fromString = MaybeValidDate.fromString = fromString;
// @ts-expect-error  Yes, we are extending the global Date object
Date.fromAny = MaybeValidDate.fromAny = fromAny;

const parser = {
  fromString,
  fromAny,
  fromObject,
  attempt,
};

/* v8 ignore next 3 */
if (typeof window !== 'undefined') {
  window.anyDateParser = parser;
}

export default parser;

// type additions
declare global {
  interface Window {
    anyDateParser: typeof parser;
  }
  interface Date {
    fromString: typeof fromString;
    fromAny: typeof fromAny;
  }
}
