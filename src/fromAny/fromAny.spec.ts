import { describe, expect, it, vi } from 'vitest';
import fromAny from './fromAny';

describe('fromAny', () => {
  it('should return Date objects as is', () => {
    const spy = vi.fn();
    const fromFn = fromAny(spy);
    const now = new Date();
    const actual = fromFn(now);
    expect(+actual).toBe(+now);
    expect(spy).not.toHaveBeenCalled();
  });
  it('should return milliseconds as Date object', () => {
    const spy = vi.fn();
    const fromFn = fromAny(spy);
    const now = new Date();
    const actual = fromFn(now.getTime());
    expect(actual).toBeInstanceOf(Date);
    expect(+actual).toBe(+now);
    expect(spy).not.toHaveBeenCalled();
  });
  it('should otherwise invoke fromString', () => {
    const spy = vi.fn();
    const fromFn = fromAny(spy);
    fromFn('my string', 'en');
    expect(spy).toHaveBeenCalledWith('my string', 'en');
  });
});
