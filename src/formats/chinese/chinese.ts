import Format from '../../Format/Format';
import LocaleHelper from '../../LocaleHelper/LocaleHelper';
import { chineseGroup as d } from '../../data/numberingSystems.js';

let locHelper: LocaleHelper;

// The following languages use the Chinese symbols "年月日" for year, month, and day
// Chinese, Korean, Japanese, and probably others
// https://en.wikipedia.org/wiki/Date_and_time_notation_in_Asia
const chinese = new Format({
  /* prettier-ignore */
  //           $1                         $2                  $3
  template: `^(${d}{4}|${d}{2})\\s*年\\s*(${d}{1,2})\\s*月\\s*(${d}{1,2})\\s*日`,
  handler: function ([, year, month, day]) {
    if (!locHelper) {
      // sometimes zh has numbering system "latn" instead of fullwide or hanidec
      locHelper = new LocaleHelper('zh');
      locHelper.numberingSystem = 'hanidec';
      locHelper.buildNumbers();
    }
    return locHelper.castObject({ year, month, day });
  },
});

export default chinese;
