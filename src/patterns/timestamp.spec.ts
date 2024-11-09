import { describe, expect, it } from 'vitest';
import parser from '../main';

describe('timestamp', () => {
  it('should handle timestamp with Z', () => {
    const actual = parser.attempt('2024-10-24T15:10:04.963Z', 'en-US');
    const expected = {
      year: 2024,
      month: 10,
      day: 24,
      hour: 15,
      minute: 10,
      second: 4,
      millisecond: 963,
      offset: 0,
    };
    expect(actual).toMatchObject(expected);
  });
  it('should handle timestamp with offset', () => {
    const actual = parser.attempt('2024-10-24T15:10:04.963+01:00', 'en-US');
    const expected = {
      year: 2024,
      month: 10,
      day: 24,
      hour: 15,
      minute: 10,
      second: 4,
      millisecond: 963,
      offset: 60,
    };
    expect(actual).toMatchObject(expected);
  });
  it('should handle timestamp with GMT', () => {
    const actual = parser.attempt('2024-10-24T15:10:04.963 GMT+8', 'en-US');
    const expected = {
      year: 2024,
      month: 10,
      day: 24,
      hour: 15,
      minute: 10,
      second: 4,
      millisecond: 963,
      offset: 480,
    };
    expect(actual).toMatchObject(expected);
  });
  it('should handle timestamp with TZ name', () => {
    const actual = parser.attempt('2024-10-24T15:10:04.963 MST', 'en-US');
    const expected = {
      year: 2024,
      month: 10,
      day: 24,
      hour: 15,
      minute: 10,
      second: 4,
      millisecond: 963,
      offset: -420,
    };
    expect(actual).toMatchObject(expected);
  });
  it('should handle leap seconds', () => {
    const actual = parser.fromString('2016-12-31T23:59:60.963Z', 'en-US');
    const expected = Date.UTC(2016, 11, 31, 23, 59, 59, 963);
    expect(actual.valueOf()).toBe(expected);
  });
});
