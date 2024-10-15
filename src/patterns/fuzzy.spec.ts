import { describe, expect, it } from 'vitest';
import parser from '../main';

describe('fuzzy', () => {
  it('should handle ignore filler text 1', () => {
    const actual = parser.attempt('On Wed 8 March in the year 2020', 'en-US');
    const expected = { year: 2020, month: 3, day: 8 };
    expect(actual).toEqual(expected);
  });
  it('should default ignore filler text 2', () => {
    const actual = parser.attempt('On Wed 8 March', 'en-US');
    const expected = { month: 3, day: 8 };
    expect(actual).toEqual(expected);
  });
  it('should default ignore filler text 3', () => {
    const actual = parser.attempt(
      'In 1929, the stock market crashed on October 29',
      'en-US'
    );
    const expected = { year: 1929, month: 10, day: 29 };
    expect(actual).toEqual(expected);
  });
  it('should default ignore filler text 4', () => {
    const actual = parser.attempt('2020 foo 31 bar aug', 'en-US');
    const expected = { year: 2020, month: 8, day: 31 };
    expect(actual).toEqual(expected);
  });
  it('should get month alone', () => {
    const actual = parser.attempt('aug', 'en-US');
    const expected = { month: 8 };
    expect(actual).toEqual(expected);
  });
  it('should get day alone', () => {
    const actual = parser.attempt('13', 'en-US');
    const expected = { day: 13 };
    expect(actual).toEqual(expected);
  });
  it('should get day alone', () => {
    const actual = parser.attempt('the 5th', 'en-US');
    const expected = { day: 5 };
    expect(actual).toEqual(expected);
  });
  it('should get timezone alone', () => {
    const actual = parser.attempt('Eastern Daylight Time', 'en-US');
    const expected = { offset: -240 };
    expect(actual).toEqual(expected);
  });
});
