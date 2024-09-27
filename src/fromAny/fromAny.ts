import { MaybeValidDate } from '../MaybeValidDate/MaybeValidDate';

export default function fromAny(
  fromString: (str: string, locale?: string) => MaybeValidDate,
  defaultLocale?: string
) {
  return function fromAnyFunction(
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
  };
}
