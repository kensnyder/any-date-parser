import { describe, expect, it } from 'vitest';
import testBuiltInFormats from '../test-fixtures/testBuiltInFormats';
import { MaybeValidDate } from './MaybeValidDate/MaybeValidDate';
import parser from './main';

describe('parser.attempt', () => {
  it('should return object with relevant keys', () => {
    const res = parser.attempt('Oct 15');
    expect(res).toEqual({ month: 10, day: 15 });
  });
  it('should return empty object if given a non-date', () => {
    const res = parser.attempt('Hello world');
    expect(res.invalid).toMatch(/Unable to parse/);
  });
  it('should return empty object if given an empty string', () => {
    const res = parser.attempt('');
    expect(res.invalid).toMatch(/Unable to parse/);
  });
});
describe('Date.fromString', () => {
  it('should be attached to built-in Date', () => {
    // @ts-ignore
    const res = Date.fromString('Oct 15 2021');
    expect(res).toEqual(new Date(2021, 9, 15));
  });
});
describe('Date.fromAny', () => {
  it('should be attached to built-in Date', () => {
    // @ts-ignore
    const res = Date.fromAny('Oct 15 2021');
    expect(res).toEqual(new Date(2021, 9, 15));
  });
});
describe('MaybeValidDate', () => {
  it('should return MaybeValidDate for valid dates', () => {
    const res = parser.fromAny('Oct 15 2021');
    expect(res).toBeInstanceOf(Date);
    expect(res).toBeInstanceOf(MaybeValidDate);
    expect(res.invalid).toBe(null);
    expect(res.isValid()).toBe(true);
  });
  it('should return MaybeValidDate for invalid dates', () => {
    const res = parser.fromAny('foobar');
    expect(res).toBeInstanceOf(Date);
    expect(res).toBeInstanceOf(MaybeValidDate);
    expect(res.invalid).toMatch(/Unable to parse/);
    expect(res.isValid()).toBe(false);
  });
});

// Test every format that the Intl.DateTimeFormat constructor can produce
testBuiltInFormats(new Date(2021, 0, 31, 1, 31, 21, 789), {
  year: 2021,
  month: 1,
  day: 31,
  hour: 1,
  minute: 31,
  second: 21,
  millisecond: 789,
});
