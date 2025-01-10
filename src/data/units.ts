const units = [
  'year',
  'month',
  'day',
  'hour',
  'minute',
  'second',
  'millisecond',
];

export default units;

export type UnitStrings = (typeof units)[number];
