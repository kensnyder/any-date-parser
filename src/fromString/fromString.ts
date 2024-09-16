import type Parser from '../Parser/Parser';

export type DateOrInvalid = Date | { invalid: string };

export default function fromString(parser: Parser, defaultLocale?: string) {
  return function fromStringFunction(
    dateStr: string,
    locale = defaultLocale
  ): DateOrInvalid {
    // let effectiveLocale = locale;
    // const bounds = {
    // 	lower: '0001-01-01T00:00:00',
    // 	upper: '9999-12-31T23:59:59',
    // 	inclusive: true,
    // 	strict: false,
    // };
    // if (typeof locale === 'object') {
    // 	effectiveLocale = locale.locale || defaultLocale;
    // 	Object.assign(bounds, locale.bounds || {});
    // }
    // string = removeFillerWords(String(string), locale).trim();
    // const matches = this.getMatches(string, locale);
    // if (matches) {
    // 	const dt = this.toDateTime(matches, locale);
    // 	const dtDate = this.dt
    // 	if (dtDate instanceof Date && !this.isInRange(dtDate, bounds) && bounds.strict) {
    // 		const inclusive = bounds.inclusive ? 'inclusive' : 'not inclusive';
    // 		return { invalid: `Date not in range ${bounds.lower} to ${bounds.upper} ${inclusive}`, bounds };
    // 	}
    // 	return dt || null;
    // }
    // return null;

    const parsed = parser.attempt(dateStr, locale);
    if (parsed.invalid) {
      return { invalid: parsed.invalid };
    }
    if (parsed.month && parsed.day && parsed.year === undefined) {
      parsed.year = new Date().getFullYear();
    }
    if (!(parsed.month && parsed.day && parsed.year)) {
      parsed.invalid = `Unable to parse date "${dateStr}"`;
    }
    if (parsed.invalid) {
      return { invalid: parsed.invalid };
    }
    const date = new Date(parsed.year, parsed.month - 1, parsed.day);
    // default to first unit for time components
    date.setUTCHours(parsed.hour || 0);
    date.setUTCMinutes(parsed.minute || 0);
    date.setUTCSeconds(parsed.second || 0);
    date.setUTCMilliseconds(parsed.millisecond || 0);
    if (typeof parsed.offset === 'number') {
      return new Date(date.valueOf() - parsed.offset * 60 * 1000);
    }
    return date;
  };
}
