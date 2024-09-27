import { MaybeValidDate } from '../MaybeValidDate/MaybeValidDate';

export default function fromObject(obj, defaults = {}): MaybeValidDate {
  const effective = { ...defaults, ...obj };
  if (effective.month && effective.day && effective.year === undefined) {
    effective.year = new Date().getFullYear();
  }
  const date = new MaybeValidDate(
    effective.year,
    effective.month - 1,
    effective.day,
    effective.hour || 0,
    effective.minute || 0,
    effective.second || 0,
    effective.millisecond || 0
  );
  if (typeof effective.offset === 'number') {
    return new MaybeValidDate(date.valueOf() - effective.offset * 60 * 1000);
  }
  return date;
}
