import { describe, expect, it } from 'bun:test';
import parser from '../main';

describe('special', () => {
  it('should handle dd.mm.yy in german', () => {
    const actual = parser.attempt('05.03.20', 'da-DK');
    expect(actual).toEqual({
      day: 5,
      month: 3,
      year: 2020,
    });
  });
  it('should ignore Temporal-style brackets', () => {
    const actual = parser.attempt('2025-08-21T12:34:56+00:00[UTC]');
    expect(actual).toEqual({
      year: 2025,
      month: 8,
      day: 21,
      hour: 12,
      minute: 34,
      second: 56,
      offset: 0,
    });
  });
});
