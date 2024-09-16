import type { DateOrInvalid } from '../fromString/fromString';

export default function fromAny(
  fromString: (str: string, locale?: string) => DateOrInvalid,
  defaultLocale?: string
) {
  return function fromAnyFunction(
    any: string | number | Date,
    locale = defaultLocale
  ): DateOrInvalid {
    if (any instanceof Date) {
      return any;
    }
    if (typeof any === 'number') {
      return new Date(any);
    }
    return fromString(any, locale);
  };
}
