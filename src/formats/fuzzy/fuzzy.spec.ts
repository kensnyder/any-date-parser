import { describe, expect, it } from 'vitest';
import parser from '../../../index';

describe('fuzzy', () => {
  it('should handle ignore filler text 1', () => {
    const actual = parser.attempt('On Wed 8 March in the year 2020');
    const expected = { year: 2020, month: 3, day: 8 };
    expect(actual).toEqual(expected);
  });
  it('should default ignore filler text 2', () => {
    const actual = parser.attempt('On Wed 8 March');
    const expected = { month: 3, day: 8 };
    expect(actual).toEqual(expected);
  });
  it('should default ignore filler text 3', () => {
    const actual = parser.attempt('2020 foo 31 bar 8');
    const expected = { year: 2020, month: 8, day: 31 };
    expect(actual).toEqual(expected);
  });
  it('should get month alone', () => {
    const actual = parser.attempt('aug');
    const expected = { month: 8 };
    expect(actual).toEqual(expected);
  });
  it('should get day alone', () => {
    const actual = parser.attempt('13');
    const expected = { day: 13 };
    expect(actual).toEqual(expected);
  });
  it('should get day alone', () => {
    const actual = parser.attempt('the 5th');
    const expected = { day: 5 };
    expect(actual).toEqual(expected);
  });
  it('should get timezone alone', () => {
    const actual = parser.attempt('Eastern Daylight Time');
    const expected = { offset: -240 };
    expect(actual).toEqual(expected);
  });
});
