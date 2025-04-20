import { describe, expect, it } from 'vitest';
import parser from '../main';

describe('12 hour time', () => {
  it('should handle 12am', () => {
    const actual = parser.attempt('12am', 'en-US');
    const expected = {
      hour: 0,
    };
    expect(actual).toMatchObject(expected);
  });
  it('should handle hours: "8pm"', () => {
    const actual = parser.attempt('8pm', 'en-US');
    const expected = {
      hour: 20,
    };
    expect(actual).toMatchObject(expected);
  });
  it('should handle invalid date: "Foobarbaz at 8pm"', () => {
    const actual = parser.attempt('Foobarbaz at 8pm', 'en-US');
    expect(actual).toEqual({ hour: 20 });
  });
  it('should handle dots in "a.m.": "4 a.m."', () => {
    const actual = parser.attempt('4 a.m.', 'en-US');
    const expected = {
      hour: 4,
    };
    expect(actual).toMatchObject(expected);
  });
  it('should handle minutes: "8:15pm"', () => {
    const actual = parser.attempt('8:15pm', 'en-US');
    const expected = {
      hour: 20,
      minute: 15,
    };
    expect(actual).toMatchObject(expected);
  });
  it('should handle seconds: "8:15:14am"', () => {
    const actual = parser.attempt('8:15:14am', 'en-US');
    const expected = {
      hour: 8,
      minute: 15,
      second: 14,
    };
    expect(actual).toMatchObject(expected);
  });
  it('should handle leap seconds: "11:59:60pm"', () => {
    const actual = parser.attempt('11:59:60pm', 'en-US');
    const expected = {
      hour: 23,
      minute: 59,
      second: 60,
    };
    expect(actual).toMatchObject(expected);
  });
  it('should handle dates: "March 14, 2015 9:26pm"', () => {
    const actual = parser.attempt('March 14, 2015 9:26pm', 'en-US');
    const expected = {
      year: 2015,
      month: 3,
      day: 14,
      hour: 21,
      minute: 26,
    };
    expect(actual).toEqual(expected);
  });
  it('should handle dates joined with "at": "March 14, 2015 at 9:26:53 am"', () => {
    const actual = parser.attempt('March 14, 2015 at 9:26:53 am', 'en-US');
    const expected = {
      year: 2015,
      month: 3,
      day: 14,
      hour: 9,
      minute: 26,
      second: 53,
    };
    expect(actual).toEqual(expected);
  });
  it('should handle dates with commas: "4/19/2021, 10:04:02 AM"', () => {
    const actual = parser.attempt('4/19/2021, 10:04:02 AM', 'en-US');
    const expected = {
      year: 2021,
      month: 4,
      day: 19,
      hour: 10,
      minute: 4,
      second: 2,
    };
    expect(actual).toEqual(expected);
  });
  it('should capture offsets: "4/19/2021, 10:04:02 AM -04:00"', () => {
    const actual = parser.attempt('4/19/2021, 10:04:02 AM -04:00', 'en-US');
    const expected = {
      year: 2021,
      month: 4,
      day: 19,
      hour: 10,
      minute: 4,
      second: 2,
      offset: -240,
    };
    expect(actual).toEqual(expected);
  });
  it('should capture zone names: "4/19/2021, 10:04:02 AM UTC"', () => {
    const actual = parser.attempt('4/19/2021, 10:04:02 AM UTC', 'en-US');
    const expected = {
      year: 2021,
      month: 4,
      day: 19,
      hour: 10,
      minute: 4,
      second: 2,
      offset: 0,
    };
    expect(actual).toEqual(expected);
  });
});
