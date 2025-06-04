import { describe, expect, it } from 'vitest';
import defaultLocale from '../data/defaultLocale';
import getMatcher from './getMatcher';

describe('formatter.format', () => {
  const matcher = getMatcher(defaultLocale);

  it.each([
    ['00', 2000],
    ['51', 2051],
    ['52', 1952],
    ['99', 1999],
    ['1363', 1363],
    ['2000', 2000],
  ])('format year: %s => %s', (input: string, expected: number) => {
    const actual = matcher.formatter({ year: input });
    expect(actual).toEqual({
      year: expected,
    });
  });

  it.each([
    ['January', 1],
    ['Jan', 1],
    // Default to December if not recognized
    ['NotAMonth', 12],
    ['', undefined],
  ])(
    'format monthname "%s" => %s',
    (input: string, expected: number | undefined) => {
      const actual = matcher.formatter({ monthname: input });
      expect(actual.month).toBe(expected);
    }
  );

  it.each([
    // 12-hour format with meridiem
    [{ hour: '12', meridiem: 'AM' }, 0],
    [{ hour: '12', meridiem: 'PM' }, 12],
    [{ hour: '01', meridiem: 'AM' }, 1],
    [{ hour: '11', meridiem: 'PM' }, 23],
    [{ hour: '00', meridiem: 'AM' }, 0],
    [{ hour: '00', meridiem: 'PM' }, 12],
    // 24-hour format (no meridiem)
    [{ hour: '0' }, 0],
    [{ hour: '12' }, 12],
    [{ hour: '23' }, 23],
    // Invalid meridiem, toInt by default
    [{ hour: '13', meridiem: 'XX' }, 13],
    // Missing hour
    [{ meridiem: 'AM' }, undefined],
  ])(
    'format hour %j => %s',
    (input: Record<string, string>, expected: number | undefined) => {
      const actual = matcher.formatter(input);
      expect(actual.hour).toBe(expected);
    }
  );

  it.each([
    ['UTC', 0],
    ['GMT', 0],
    ['ACT', 480],
    ['Central Standard Time', -360],
    ['invalidZone', undefined],
    ['', undefined],
  ])('format zone "%s" => %s', (input: string, expected: number) => {
    const actual = matcher.formatter({ zone: input });
    expect(actual.offset).toBe(expected);
  });

  it.each([
    ['+02:00', 120],
    ['-05:30', -330],
    ['+00:00', 0],
    ['+0000', 0],
    ['-0100', -60],
    ['+14:00', 840],
    ['-12:00', -720],
    ['+2', 120],
    ['-3', -180],
    ['Z', 0],
    ['invalid', 0],
    ['', 0],
    [undefined, undefined],
  ])(
    'format offset "%s" => %s',
    (input: string | undefined, expected: number | undefined) => {
      const actual = matcher.formatter({ offset: input });
      expect(actual.offset).toBe(expected);
    }
  );

  it.each([
    ['0', 0],
    ['001', 1],
    ['123', 123],
    ['999', 999],
    [undefined, undefined],
  ])(
    'format millisecond "%s" => %s',
    (input: string | undefined, expected: number | undefined) => {
      const actual = matcher.formatter({ millisecond: input });
      expect(actual.millisecond).toBe(expected);
    }
  );

  it('format all fields', () => {
    const actual = matcher.formatter({
      year: '2020',
      month: '12',
      day: '31',
      hour: '23',
      minute: '59',
      second: '58',
      millisecond: '999',
      offset: '+01:00',
    });
    expect(actual).toEqual({
      year: 2020,
      month: 12,
      day: 31,
      hour: 23,
      minute: 59,
      second: 58,
      millisecond: 999,
      offset: 60,
    });
  });

  it('format year for Buddhist calendar', () => {
    const matcherBuddhist = getMatcher('th-TH');
    const actual = matcherBuddhist.formatter({ year: '2566' });
    expect(actual.year).toBe(2023);
  });
});
