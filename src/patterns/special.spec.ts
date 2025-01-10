import { describe, expect, it } from 'vitest';
import parser from '../main';

describe('special', () => {
  it('should 1', () => {
    const actual = parser.attempt('03.03.20', 'da-DK');
    expect(actual).toEqual({
      day: 3,
      month: 3,
      year: 2020,
    });
  });
  // it('should 2', () => {
  //   const actual = parser.attempt('3.3.2020', 'zh-TW');
  //   expect(actual).toEqual({
  //     year: 2020,
  //     month: 3,
  //     day: 3,
  //   });
  // });
});
