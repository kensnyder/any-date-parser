import defaultLocale from './data/defaultLocale';
import { MaybeValidDate } from './MaybeValidDate/MaybeValidDate';
import getMatcher from './PatternMatcher/getMatcher';

export function attempt(dateStr: string, locale = defaultLocale) {
  const matcher = getMatcher(locale);
  return matcher.attempt(dateStr);
}

export function fromObject(obj, defaults = {}): MaybeValidDate {
  const effective = { ...defaults, ...obj };
  if (effective.month && effective.day && effective.year === undefined) {
    effective.year = new Date().getFullYear();
  }
  const date = new MaybeValidDate(
    effective.year,
    effective.month - 1,
    effective.day,
    effective.hour || 0,
    effective.minute || 0,
    effective.second || 0,
    effective.millisecond || 0
  );
  if (typeof effective.offset === 'number') {
    return new MaybeValidDate(date.valueOf() - effective.offset * 60 * 1000);
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

declare global {
  interface Window {
    anyDateParser: typeof parser;
  }
}
/* v8 ignore next 3 */
if (typeof window !== 'undefined') {
  window.anyDateParser = parser;
}

export default parser;
