import { describe, expect, it } from 'bun:test';
import {
  type DateObjectUnits,
  DateTime,
  FixedOffsetZone,
  VERSION,
} from 'luxon';
import parser from '../src/main';

export type TestDatesConfig = {
  /** Label for the describe() block */
  name: string;
  /** luxon format strings to render the expected date with */
  formats: string[];
  /** The date parts every rendering should parse back to */
  expected: DateObjectUnits & { offset?: number };
  /** Locales to run each format against */
  locales: string[];
};

export default function testDates({
  name,
  formats,
  expected,
  locales,
}: TestDatesConfig) {
  for (const locale of locales) {
    const calendar = Intl.DateTimeFormat(locale).resolvedOptions().calendar;
    describe(`${name} (${locale}) [luxon v${VERSION}]`, () => {
      for (const format of formats) {
        const { offset, ...forLuxon } = expected;
        let options: { zone?: FixedOffsetZone } = {};
        if (typeof offset === 'number') {
          options = { zone: FixedOffsetZone.instance(offset) };
        }
        const date = DateTime.fromObject(forLuxon, options);
        const formatted = date.toFormat(format, { locale });
        it(`${formatted} (${format})`, () => {
          const actual = parser.attempt(formatted, locale);
          if (calendar === 'buddhist' && actual.year !== undefined) {
            actual.year += 543;
          }
          expect(actual).toMatchObject(expected);
        });
      }
    });
  }
}
