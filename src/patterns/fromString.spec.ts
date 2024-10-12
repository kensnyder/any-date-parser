import { describe, expect, it, vi } from 'vitest';
import parser from '../main';
import type Parser from '../Parser/Parser';

describe('fromString with spies', () => {
  it('should reset all but day', () => {
    const result = { year: 2020, month: 4, day: 15 };
    const parser = { attempt: vi.fn(() => result) } as unknown as Parser;
    const fromFn = parser.fromString(parser);
    const apr15 = new Date(Date.UTC(2020, 3, 15, 0, 0, 0, 0));
    expect(fromFn('')).toEqual(apr15);
  });
  it('should reset all but hour', () => {
    const result = { year: 2020, month: 2, day: 28, hour: 23 };
    const parser = { attempt: vi.fn(() => result) } as unknown as Parser;
    const fromFn = parser.fromString(parser);
    const feb28 = new Date(Date.UTC(2020, 1, 28, 23, 0, 0, 0));
    expect(fromFn('')).toEqual(feb28);
  });
  it('should reset all but minute', () => {
    const result = { year: 2020, month: 12, day: 4, hour: 23, minute: 14 };
    const parser = { attempt: vi.fn(() => result) } as unknown as Parser;
    const fromFn = parser.fromString(parser);
    const dec4 = new Date(Date.UTC(2020, 11, 4, 23, 14, 0, 0));
    expect(fromFn('')).toEqual(dec4);
  });
  it('should reset all but second', () => {
    const result = {
      year: 2020,
      month: 9,
      day: 8,
      hour: 23,
      minute: 14,
      second: 59,
    };
    const parser = { attempt: vi.fn(() => result) } as unknown as Parser;
    const fromFn = parser.fromString(parser);
    const sep8 = new Date(Date.UTC(2020, 8, 8, 23, 14, 59, 0));
    expect(fromFn('')).toEqual(sep8);
  });
  it('should reset all but millisecond', () => {
    const result = {
      year: 2020,
      month: 7,
      day: 4,
      hour: 23,
      minute: 14,
      second: 59,
      millisecond: 101,
    };
    const parser = { attempt: vi.fn(() => result) } as unknown as Parser;
    const fromFn = parser.fromString(parser);
    const jul4 = new Date(Date.UTC(2020, 6, 4, 23, 14, 59, 101));
    expect(fromFn('')).toEqual(jul4);
  });
  it('should handle negative offset', () => {
    const result = {
      year: 2020,
      month: 6,
      day: 9,
      hour: 19,
      minute: 14,
      second: 59,
      millisecond: 101,
      offset: -60,
    };
    const parser = { attempt: vi.fn(() => result) } as unknown as Parser;
    const fromFn = parser.fromString(parser);
    const jun6 = new Date(Date.UTC(2020, 5, 9, 20, 14, 59, 101));
    expect(fromFn('')).toEqual(jun6);
  });
  it('should handle positive offset', () => {
    const result = {
      year: 2020,
      month: 10,
      day: 31,
      hour: 20,
      minute: 59,
      second: 59,
      millisecond: 101,
      offset: 45,
    };
    const parser = { attempt: vi.fn(() => result) } as unknown as Parser;
    const fromFn = parser.fromString(parser);
    const oct31 = new Date(Date.UTC(2020, 9, 31, 20, 14, 59, 101));
    expect(fromFn('')).toEqual(oct31);
  });
});

describe('fromString with out-of-range values', () => {
  it('should roll over dates like JS', () => {
    const result = parser.fromString('31 feb 2020');
    expect(result).toBeInstanceOf(Date);
    // @ts-ignore  If it isn't a date, this test will exit by now
    expect(result.toISOString()).toEqual('2020-03-02T00:00:00.000Z');
  });
});

describe('fromString with invalid date', () => {
  it('should handle invalid string', () => {
    const result = parser.fromString('moo 4 internet');
    expect(result.isValid()).toBe(false);
    expect(result.invalid).toContain('parse');
  });
  it('should handle empty string', () => {
    const result = parser.fromString('');
    expect(result.isValid()).toBe(false);
    expect(result.invalid).toContain('parse');
  });
  it('should consider NaN invalid', () => {
    // @ts-expect-error  Invalid args for test
    const result = parser.fromString(NaN);
    expect(result.isValid()).toBe(false);
    expect(result.invalid).toContain('parse');
  });
  it('should consider a Number invalid', () => {
    // @ts-expect-error  Invalid args for test
    const result = parser.fromString(5);
    expect(result.isValid()).toBe(false);
    expect(result.invalid).toContain('parse');
  });
  it('should consider undefined invalid', () => {
    const result = parser.fromString(undefined);
    expect(result.isValid()).toBe(false);
    expect(result.invalid).toContain('parse');
  });
  it('should consider an object invalid', () => {
    // @ts-expect-error  Invalid args for test
    const result = parser.fromString({});
    expect(result.isValid()).toBe(false);
    expect(result.invalid).toContain('parse');
  });
});
