import { DateTime, FixedOffsetZone, VERSION } from 'luxon';
import { describe, expect, it } from 'vitest';
import parser from '../src/main';

export default function testDates({ name, formats, expected, locales }) {
  for (const locale of locales) {
    describe(`${name} (${locale}) [luxon v${VERSION}]`, () => {
      for (const format of formats) {
        const { offset, ...forLuxon } = expected;
        let options: { zone?: FixedOffsetZone } = {};
        if (typeof offset === 'number') {
          options = { zone: FixedOffsetZone.instance(expected.offset) };
        }
        const date = DateTime.fromObject(forLuxon, options);
        const formatted = date.toFormat(format, { locale });
        it(`${formatted} (${format})`, () => {
          const actual = parser.attempt(formatted, locale);
          expect(actual).toMatchObject(expected);
        });
      }
    });
  }
}
