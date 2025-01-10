import { describe, expect, it } from 'vitest';
import parser from '../main';

describe('korean', () => {
  it('should handle no gaps', () => {
    const actual = parser.attempt('2024년09월16일');
    const expected = {
      year: 2024,
      month: 9,
      day: 16,
    };
    expect(actual).toMatchObject(expected);
  });
  it('should handle spaces', () => {
    const actual = parser.attempt('2024년 09월 16일');
    const expected = {
      year: 2024,
      month: 9,
      day: 16,
    };
    expect(actual).toMatchObject(expected);
  });
});
