import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import parser from '../main';
import { nowGetter } from './patterns';

describe.skip('now, today, yesterday and tomorrow', () => {
  beforeAll(() => {
    nowGetter.now = () =>
      new Date(Date.UTC(2019, 7 /* august */, 31, 25, 59, 59, 999));
  });
  afterAll(() => {
    nowGetter.now = () => new Date();
  });
  it('should handle "now"', () => {
    const actual = parser.attempt('now');
    const expected = {
      year: 2019,
      month: 8,
      day: 31,
      hour: 23,
      minute: 59,
      second: 59,
      millisecond: 999,
    };
    expect(actual).toEqual(expected);
  });
  it('should handle "today"', () => {
    const actual = parser.attempt('today');
    const expected = {
      year: 2019,
      month: 8,
      day: 31,
    };
    expect(actual).toEqual(expected);
  });
  it('should handle "tomorrow"', () => {
    const actual = parser.attempt('tomorrow');
    const expected = {
      year: 2019,
      month: 9,
      day: 1,
    };
    expect(actual).toEqual(expected);
  });
  it('should handle "yesterday"', () => {
    const actual = parser.attempt('yesterday');
    const expected = {
      year: 2019,
      month: 8,
      day: 30,
    };
    expect(actual).toEqual(expected);
  });
});
