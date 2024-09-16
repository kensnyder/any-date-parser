import Format from '../../Format/Format';
import LocaleHelper from '../../LocaleHelper/LocaleHelper';

function getTime({ hour, minute, second, ampm, locale }) {
  const helper = LocaleHelper.factory(locale);
  const meridiemOffset = helper.lookups.meridiem[ampm?.toLowerCase()] || 0;
  let hourInt = helper.toInt(hour) + meridiemOffset;
  return {
    hour: hourInt,
    minute: minute ? helper.toInt(minute) : 0,
    second: second ? helper.toInt(second) : 0,
  };
}

// lots of 12h time such as "11:59", "11:59pm", "11:59:33 pm", "11:59:33 p.m."
const time12Hours = new Format({
  /* prettier-ignore */
  //           $1                                   $2          $3           $4                 $5
  template: '^(.*?)(?:_GAP_)?(?:at|on|T|)(?:_GAP_)?(_H12_)(?:\\:(_MIN_)(?:\\:(_SEC_))?)?(?:_GAP_)?(_MERIDIEM_)$',
  handler: function (matches: string[], locale: string) {
    let [, dateExpr, hour, minute, second, ampm] = matches;
    if (dateExpr) {
      const dateResult = this.parser.attempt(dateExpr, locale);
      if (dateResult.invalid) {
        // let other matchers have a chance
        return null;
      }
      const timeResult = getTime({ hour, minute, second, ampm, locale });
      return { ...dateResult, ...timeResult };
    } else {
      return getTime({ hour, minute, second, ampm, locale });
    }
  },
});

export default time12Hours;
