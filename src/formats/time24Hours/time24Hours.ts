import Format from '../../Format/Format';
import LocaleHelper from '../../LocaleHelper/LocaleHelper';
import timezoneNames from '../../data/timezoneNames';

// lots of 24h time such as "23:59", "T23:59:59+0700", "23:59:59 GMT-05:00", "23:59:59 CST", "T23:59:59Z"
const time24Hours = new Format({
  /* prettier-ignore */
  //           $1                               $2        $3           $4              $5                                $6                 $7
  template: '^(.*?)(?:_GAP_)?(?:at|on|T|)(?:_GAP_)?(_H24_)\\:(_MIN_)(?:\\:(_SEC_)(?:[\\.,](_MS_))?)?(?:_GAP_)?(?:GMT)?(?:_GAP_)?(_OFFSET_)?(?:_GAP_)?(_ZONE_)?$',
  handler: function (matches, locale) {
    let [, dateExpr, hour, minute, second, millisecond, offset, zone] = matches;
    let result: {
      invalid?: boolean;
      hour: number;
      minute: number;
      second?: number;
      millisecond?: number;
      offset?: number;
    } = {
      hour,
      minute,
    };
    if (dateExpr) {
      result = this.parser.attempt(dateExpr, locale);
      if (result.invalid) {
        return result;
      }
    }
    if (second) {
      result.second = second;
    }
    if (millisecond && millisecond.length > 3) {
      result.millisecond = millisecond.slice(0, 3);
    } else if (millisecond) {
      result.millisecond = millisecond;
    }
    if (zone && !offset && zone in timezoneNames) {
      result.offset = timezoneNames[zone];
    } else if (offset) {
      const locHelper = LocaleHelper.factory(locale);
      result.offset = locHelper.offsetToMinutes(offset);
    }
    return result;
  },
});

export default time24Hours;
