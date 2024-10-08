import Format from '../../Format/Format';

const timestamp = new Format({
  /* prettier-ignore */
  //           $1        $2        $3        $4       $5      $6          $7          $8
  template: "^(_YEAR4_)-(_MONTH_)-(_DAY_)[T ](_H24_):(_MIN_):(_SEC_)(:?\.(_MS_))?(:? ?(_OFFSET_|Z))?$",
  units: [
    'year',
    'month',
    'day',
    'hour',
    'minute',
    'second',
    'millisecond',
    'offset',
  ],
});

export default timestamp;
