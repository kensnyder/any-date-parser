import Format from '../../Format/Format';

const dayMonthname = new Format({
  /* prettier-ignore */
  //           $1                       $2
  template: "^(_DAY_)(?:_ORDINAL_)?[ -](_MONTHNAME_)$",
  units: ['day', 'month'],
});

export default dayMonthname;
