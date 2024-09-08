import Format from '../../Format/Format';

const yearMonthDayWithDots = new Format({
  /* prettier-ignore */
  //           $1             $2              $3
  // template: "^(_YEAR_)\\.\\s*(_MONTH_)\\.\\s*(_DAY_)\\.?\\s*(_DAYNAME_)?\\.?$",
  template: "^(_YEAR_)\\. (_MONTH_)\\. (_DAY_)\\.",
  units: ['year', 'month', 'day'],
});

export default yearMonthDayWithDots;
