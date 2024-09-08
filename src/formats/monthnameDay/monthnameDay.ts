import Format from '../../Format/Format';

const monthnameDay = new Format({
  /* prettier-ignore */
  //                                $1             $2
  template: '^(?:(?:_DAYNAME_),? )?(_MONTHNAME_)? (_DAY_)(?:_ORDINAL_)?$',
  units: ['month', 'day'],
});

export default monthnameDay;
