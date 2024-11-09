import { describe, expect, it } from 'vitest';
import parser from '../main';

describe('readme claims', () => {
  it('should support 8-digit date', () => {
    const actual = parser.attempt('20160924', 'en-US');
    expect(actual).toEqual({
      year: 2016,
      month: 9,
      day: 24,
    });
  });
  it('should support early dates', () => {
    const actual = parser.attempt('0116-09-24', 'en-US');
    expect(actual).toEqual({
      year: 116,
      month: 9,
      day: 24,
    });
  });
  it('should support high dates', () => {
    const actual = parser.attempt('@8640000000000', 'en-US');
    expect(actual).toEqual({
      year: 275760,
      month: 9,
      day: 13,
      hour: 0,
      minute: 0,
      second: 0,
    });
  });
  it('should support fuzzy', () => {
    const actual = parser.attempt('On Wed 8 March in the year 2020', 'en-US');
    expect(actual).toEqual({
      year: 2020,
      month: 3,
      day: 8,
    });
  });
});
