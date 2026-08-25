import { describe, expect, it } from 'bun:test';
import parser, { type MatcherResult } from '../src/main';

export type TestParserConfig = {
  /** Label for the describe() block */
  name: string;
  /** The result every date string should parse to */
  expected: MatcherResult;
  /** Locales named in the test title */
  locales: string[];
  /** Date strings to parse */
  dates: string[];
};

export default function testParser({
  name,
  expected,
  locales,
  dates,
}: TestParserConfig) {
  describe(name, () => {
    locales.forEach((locale: string) => {
      dates.forEach((date: string) => {
        it(`should handle "${date}" (${locale})`, () => {
          const actual = parser.attempt(date);
          expect(actual).toEqual(expected);
        });
      });
    });
  });
}
