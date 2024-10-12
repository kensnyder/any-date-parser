import { describe, expect, it } from 'vitest';
import parser from '../main';

describe('fromAny', () => {
  it('should return Date objects as is', () => {
    const now = new Date();
    const actual = parser.fromAny(now);
    expect(+actual).toBe(+now);
  });
  it('should return milliseconds as Date object', () => {
    const now = new Date();
    const actual = parser.fromAny(now.getTime());
    expect(actual).toBeInstanceOf(Date);
    expect(+actual).toBe(+now);
  });
});
