import fromObject from '../fromObject/fromObject';
import { MaybeValidDate } from '../MaybeValidDate/MaybeValidDate';
import type Parser from '../Parser/Parser';

export default function fromString(parser: Parser, defaultLocale?: string) {
  return function fromStringFunction(
    dateStr: string,
    locale = defaultLocale
  ): MaybeValidDate {
    const parsed = parser.attempt(dateStr, locale);
    const date = parsed.invalid ? new MaybeValidDate(NaN) : fromObject(parsed);
    if (!date.isValid()) {
      date.invalid = `Unable to parse date "${dateStr}"`;
    }
    return date;
  };
}
