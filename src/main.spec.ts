import { describe, expect, it } from 'vitest';
import parser, { ago, MaybeValidDate, Parser } from './main';

describe('Parser export', () => {
  it('should match no dates if no formats are added', () => {
    const myParser = new Parser();
    const bad = myParser.fromString('2021-01-01');
    expect(bad.isValid()).toBe(false);
  });
  it('should match when one date format is added', () => {
    const myParser = new Parser();
    myParser.addFormat(ago);
    const good = myParser.fromString('5 minutes ago');
    const bad = myParser.fromString('2021-01-01');
    expect(good.isValid()).toBe(true);
    expect(bad.isValid()).toBe(false);
  });
  it('should allow removing formats', () => {
    parser.removeFormat(ago);
    const bad = parser.fromString('5 minutes ago');
    const good = parser.fromString('2021-01-01');
    expect(bad.isValid()).toBe(false);
    expect(good.isValid()).toBe(true);
    parser.addFormat(ago);
  });
});
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
