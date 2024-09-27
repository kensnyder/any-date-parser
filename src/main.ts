import timezoneNames from './data/timezoneNames';
import { MaybeValidDate } from './MaybeValidDate/MaybeValidDate';
import Parser from './Parser/Parser';
// import our formats
import ago from './formats/ago/ago';
import atSeconds from './formats/atSeconds/atSeconds';
import chinese from './formats/chinese/chinese';
import dayMonth from './formats/dayMonth/dayMonth';
import dayMonthname from './formats/dayMonthname/dayMonthname';
import dayMonthnameYear from './formats/dayMonthnameYear/dayMonthnameYear';
import dayMonthYear from './formats/dayMonthYear/dayMonthYear';
import fuzzy from './formats/fuzzy/fuzzy';
import korean from './formats/korean/korean';
import microsoftJson from './formats/microsoftJson/microsoftJson';
import monthDay from './formats/monthDay/monthDay';
import monthDayYear from './formats/monthDayYear/monthDayYear';
import monthnameDay from './formats/monthnameDay/monthnameDay';
import monthnameDayYear from './formats/monthnameDayYear/monthnameDayYear';
import time12Hours from './formats/time12Hours/time12Hours';
import time24Hours from './formats/time24Hours/time24Hours';
import today from './formats/today/today';
import twitter from './formats/twitter/twitter';
import yearMonthDay from './formats/yearMonthDay/yearMonthDay';
import yearMonthDayWithDots from './formats/yearMonthDayWithDots/yearMonthDayWithDots';
import yearMonthDayWithSlashes from './formats/yearMonthDayWithSlashes/yearMonthDayWithSlashes';
import yearMonthnameDay from './formats/yearMonthnameDay/yearMonthnameDay';

// create a default parser instance and register all the default formats
const parser = new Parser();
parser
  // all formats can have time strings at the end
  .addFormats([
    time24Hours,
    time12Hours,
    // from most unambiguous and popular to least
    yearMonthDayWithDots,
    yearMonthDay,
    dayMonthnameYear,
    monthnameDayYear,
    monthDayYear,
    dayMonthYear,
    chinese,
    korean,
    twitter,
    today,
    ago,
    monthnameDay,
    dayMonthname,
    monthDay,
    dayMonth,
    yearMonthnameDay,
    yearMonthDayWithSlashes,
    atSeconds,
    microsoftJson,
    fuzzy,
  ]);

// create functions on Date and window
// @ts-expect-error  Yes, we are extending the global Date object
Date.fromString = MaybeValidDate.fromString = parser.fromString;
// @ts-expect-error  Yes, we are extending the global Date object
Date.fromAny = MaybeValidDate.fromAny = parser.fromAny;
/* v8 ignore next 4 */
if (typeof window !== 'undefined') {
  // @ts-expect-error  Yes, we are extending the global window object
  window.anyDateParser = parser;
}

// export our default parser
export default parser;

export {
  ago,
  atSeconds,
  chinese,
  dayMonth,
  dayMonthname,
  dayMonthnameYear,
  dayMonthYear,
  fuzzy,
  korean,
  MaybeValidDate,
  microsoftJson,
  monthDay,
  monthDayYear,
  monthnameDay,
  monthnameDayYear,
  Parser,
  time12Hours,
  time24Hours,
  timezoneNames,
  today,
  twitter,
  yearMonthDay,
  yearMonthDayWithDots,
  yearMonthDayWithSlashes,
  yearMonthnameDay,
};
