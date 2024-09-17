import { describe, expect, it } from 'vitest';
import parser from '../src/main';

export default function testParser({ name, expected, locales, dates }) {
  describe(name, () => {
    locales.forEach(locale => {
      dates.forEach(date => {
        it(`should handle "${date}" (${locale})`, () => {
          const actual = parser.attempt(date);
          expect(actual).toEqual(expected);
        });
      });
    });
  });
}
