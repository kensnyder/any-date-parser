import Format from '../../Format/Format';
import LocaleHelper from '../../LocaleHelper/LocaleHelper';

// lots of 12h time such as "11:59", "11:59pm", "11:59:33 pm", "11:59:33 p.m."
const time12Hours = new Format({
  /* prettier-ignore */
  //           $1                               $2                 $3           $4                 $5
  template: '^(.*?)(?:_GAP_)?(?:at|on|T|)(?:_GAP_)?(_H12_|_H24_)(?:\\:(_MIN_)(?:\\:(_SEC_))?)?(?:_GAP_)?(_MERIDIEM_)$',
  handler: function (matches, locale) {
    let [, dateExpr, hour, minute, second, ampm] = matches;
    let result: {
      invalid?: boolean;
      hour?: number;
      minute?: number;
      second?: number;
    } = {};
    if (dateExpr) {
      result = this.parser.attempt(dateExpr, locale);
      if (result.invalid) {
        // let other matchers have a chance
        return null;
      }
    }
    const tpl = LocaleHelper.factory(locale);
    if (ampm) {
      const offset = tpl.lookups.meridiem[ampm.toLocaleLowerCase(locale)] || 0;
      hour = parseFloat(hour);
      if (hour === 12) {
        hour = offset;
      } else if (hour > 12 && offset === 12) {
        hour += 0;
      } else {
        hour += offset;
      }
    }
    result.hour = hour;
    if (minute) {
      result.minute = minute;
    }
    if (second) {
      result.second = second;
    }
    return result;
  },
});

export default time12Hours;
