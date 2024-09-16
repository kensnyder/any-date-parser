import Format from '../../Format/Format';

const korean = new Format({
  //           $1           $2             $3
  template: `^(_YEAR_)년\\s*(_MONTH_)월\\s*(_DAY_)일`,
  units: ['year', 'month', 'day'],
});

export default korean;
