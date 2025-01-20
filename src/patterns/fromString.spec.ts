import { describe, expect, it } from 'vitest';
import parser from '../main';

describe('fromString with out-of-range values', () => {
  it('should roll over dates like JS', () => {
    const result = parser.fromString('31 feb 2020', 'en-US');
    // console.log('----- rollover', parser.attempt('31 feb 2020'));
    expect(result).toBeInstanceOf(Date);
    // @ts-ignore  If it isn't a date, this test will exit by now
    expect(result.toISOString()).toEqual('2020-03-02T00:00:00.000Z');
  });
});

describe('fromString with invalid date', () => {
  it('should handle invalid string', () => {
    const result = parser.fromString('moo 4 internet', 'en-US');
    expect(result.isValid()).toBe(false);
    expect(result.invalid).toMatch(/unable to parse/i);
  });
  it('should handle empty string', () => {
    const result = parser.fromString('', 'en-US');
    expect(result.isValid()).toBe(false);
    expect(result.invalid).toMatch(/unable to parse/i);
  });
  it('should consider NaN invalid', () => {
    // @ts-expect-error  Invalid args for test
    const result = parser.fromString(NaN, 'en-US');
    expect(result.isValid()).toBe(false);
    expect(result.invalid).toMatch(/unable to parse/i);
  });
  it('should consider a Number invalid', () => {
    // @ts-expect-error  Invalid args for test
    const result = parser.fromString(5, 'en-US');
    expect(result.isValid()).toBe(false);
    expect(result.invalid).toMatch(/unable to parse/i);
  });
  it('should consider undefined invalid', () => {
    const result = parser.fromString(undefined, 'en-US');
    expect(result.isValid()).toBe(false);
    expect(result.invalid).toMatch(/unable to parse/i);
  });
  it('should consider an object invalid', () => {
    // @ts-expect-error  Invalid args for test
    const result = parser.fromString({}, 'en-US');
    expect(result.isValid()).toBe(false);
    expect(result.invalid).toMatch(/unable to parse/i);
  });
});
