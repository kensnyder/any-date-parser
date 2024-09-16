import Format, { type HandlerResult } from '../../Format/Format';
import LocaleHelper from '../../LocaleHelper/LocaleHelper';
import timezoneNames from '../../data/timezoneNames';

// lots of 24h time such as "23:59", "T23:59:59+0700", "23:59:59 GMT-05:00", "23:59:59 CST", "T23:59:59Z"
const time24Hours = new Format({
  /* prettier-ignore */
  //           $1                                   $2        $3           $4             $5                                    $6                    $7
  template: '^(.*?)(?:_GAP_)?(?:at|on|T|)(?:_GAP_)?(_H24_)\\:(_MIN_)(?:\\:(_SEC_)(?:[\\.,](_MS_))?)?(?:_GAP_)?(?:GMT)?(?:_GAP_)?(_OFFSET_)?(?:_GAP_)?(_ZONE_)?$',
  handler: function (matches: string[], locale: string) {
    const helper = LocaleHelper.factory(locale);
    let [, dateExpr, hour, minute, second, millisecond, offset, zone] = matches;
    let result: HandlerResult = {
      hour: helper.toInt(hour),
      minute: helper.toInt(minute),
    };
    if (dateExpr) {
      const dateResult = this.parser.attempt(dateExpr, locale);
      if (dateResult.invalid) {
        // let other matchers have a chance
        return null;
      }
      Object.assign(result, dateResult);
    }
    if (second) {
      result.second = helper.toInt(second);
    }
    if (millisecond && millisecond.length > 3) {
      result.millisecond = helper.toInt(millisecond.slice(0, 3));
    } else if (millisecond) {
      result.millisecond = helper.toInt(millisecond);
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
