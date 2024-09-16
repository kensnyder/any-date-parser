import { describe, expect, it, vi } from 'vitest';
import Format from '../Format/Format';
import Parser from './Parser';

describe('Parser', () => {
  it('should set a parser prop on the format', () => {
    const format = {} as Format;
    const parser = new Parser();
    parser.addFormat(format);
    expect(format.parser).toBe(parser);
    expect(parser.formats).toEqual([format]);
  });
  it('should remove format', () => {
    const format = {} as Format;
    const parser = new Parser();
    parser.addFormat(format);
    const result = parser.removeFormat(format);
    expect(result).toBe(true);
    expect(format.parser).toBe(null);
    expect(parser.formats).toEqual([]);
  });
  it('should fail to remove unadded format', () => {
    const format = {} as Format;
    const parser = new Parser();
    const result = parser.removeFormat(format);
    expect(result).toBe(false);
  });
  it('should attempt() a single format', () => {
    const format = { attempt: vi.fn(() => 'foo') } as unknown as Format;
    const parser = new Parser();
    parser.addFormat(format);
    const result = parser.attempt('date', 'locale');
    expect(result).toBe('foo');
    expect(format.attempt).toHaveBeenCalledWith('date', 'locale');
  });
  it('should attempt() 2 formats', () => {
    const format1 = { attempt: vi.fn(() => null) } as unknown as Format;
    const format2 = { attempt: vi.fn(() => 'foo') } as unknown as Format;
    const parser = new Parser();
    parser.addFormat(format1);
    parser.addFormat(format2);
    const result = parser.attempt('date', 'locale');
    expect(result).toBe('foo');
    expect(format1.attempt).toHaveBeenCalledWith('date', 'locale');
    expect(format2.attempt).toHaveBeenCalledWith('date', 'locale');
  });
  it('should return invalid when all attempt()s fail', () => {
    const format = { attempt: vi.fn(() => null) } as unknown as Format;
    const parser = new Parser();
    parser.addFormat(format);
    const result = parser.attempt('baddate', 'locale');
    expect(result.invalid).toMatch(/Unable to parse/);
  });
});
