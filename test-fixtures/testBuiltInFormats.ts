import { describe, expect, it } from 'vitest';
import parser from '../src/main';
import localeList from './localeList';

const dateStyles = ['full', 'long', 'medium'] as const;
export default function testBuiltInFormats(
  dateObj: Date,
  parts: Record<string, any>
) {
  describe(`Built-in formats for ${dateObj.toJSON()}`, () => {
    function testIt(
      locale: string,
      options: Intl.DateTimeFormatOptions,
      expectedSubset: Record<string, any>
    ) {
      if (locale.startsWith('ar')) {
        options.calendar = 'gregory';
      }
      const formatter = new Intl.DateTimeFormat(locale, options);
      const { numberingSystem, calendar } = formatter.resolvedOptions();
      const formatted = formatter.format(dateObj);
      const parsed = parser.attempt(formatted, locale);
      it(`should handle ${numberingSystem} - ${calendar} - ${locale} - ${formatted}`, () => {
        // if (calendar === 'buddhist') {
        //   parsed.year += 543;
        // }
        expect(parsed).toMatchObject(expectedSubset);
      });
    }
    for (const locale of localeList) {
      const ymd = {
        year: parts.year,
        month: parts.month,
        day: parts.day,
      };
      // const fmt = new Intl.NumberFormat(locale);
      // const numberSystem = fmt.resolvedOptions().numberingSystem;
      for (const dateStyle of dateStyles) {
        testIt(locale, { dateStyle }, ymd);
        testIt(
          locale,
          { dateStyle, timeStyle: 'long', timeZone: 'UTC' },
          {
            ...ymd,
            hour: parts.hour,
            minute: parts.minute,
            second: parts.second,
          }
        );
        testIt(
          locale,
          { dateStyle, timeStyle: 'medium', timeZone: 'UTC' },
          {
            ...ymd,
            hour: parts.hour,
            minute: parts.minute,
          }
        );
        testIt(
          locale,
          { dateStyle, timeStyle: 'short', timeZone: 'UTC' },
          {
            ...ymd,
            hour: parts.hour,
          }
        );
      }
    }
  });
}
