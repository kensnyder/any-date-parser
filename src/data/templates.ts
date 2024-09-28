import timezoneNames from './timezoneNames';

export const latn = {
  MONTHNAME:
    'january|february|march|april|may|june|july|august|september|october|november|december|jan\\.?|feb\\.?|mar\\.?|apr\\.?|may\\.?|jun\\.?|jul\\.?|aug\\.?|sep\\.?|oct\\.?|nov\\.?|dec\\.?',
  DAYNAME:
    'sunday|monday|tuesday|wednesday|thursday|friday|saturday|sun\\.?|mon\\.?|tue\\.?|wed\\.?|thu\\.?|fri\\.?|sat\\.?',
  ZONE: '\\(?(' + Object.keys(timezoneNames).join('|') + ')\\)?',
  MERIDIEM: '(am|pm|a.m.|p.m.)',
  ORDINAL: 'st|nd|rd|th|\\.',
  YEAR: '\\d{4}|\\d{2}',
  YEAR4: '\\d{4}',
  YEAR6: '-\\d{6}|\\+?\\d{5,6}',
  MONTH: '1[0-2]|0?[1-9]',
  MONTH2: '1[0-2]|0[1-9]',
  DAY: '3[01]|[12]\\d|0?[1-9]',
  DAY2: '3[01]|[12]\\d|0[1-9]',
  OFFSET: '[±−+-][01]?\\d\\:?(?:[0-5]\\d)|GMT[±−+-]\\d{1,2}',
  H24: '[01]\\d|2[0-3]',
  H12: '0?[1-9]|1[012]',
  MIN: '[0-5]\\d',
  // Leap seconds cause 60 seconds in a minute
  SEC: '[0-5]\\d|60',
  MS: '\\d{9}|\\d{6}|\\d{1,3}',
  GAP: '[\\s/.,-]{1,}',
};

export const other = {
  ...latn,
  YEAR: '*{4}|*{2}',
  YEAR4: '*{4}',
  YEAR6: '-*{6}|\\+?*{5,6}',
  MONTH: '*{1,2}',
  MONTH2: '*{2}',
  DAY: '*{1,2}',
  DAY2: '*{2}',
  OFFSET: '[±−+-]*{1,2}:?*{2}|GMT[±−+-]*{1,2}',
  H24: '*{2}',
  H12: '*{1,2}',
  MIN: '*{2}',
  SEC: '*{2}',
  MS: '*{9}|*{6}|*{3}',
};
