import Format from '../../Format/Format';

const dayMonthYear = new Format({
  /* prettier-ignore */
  //           $1     $2     $3          $4
  template: "^(_DAY_)(_GAP_)(_MONTH_)\\2(_YEAR_)$",
  units: ['day', null, 'month', 'year'],
});

export default dayMonthYear;
