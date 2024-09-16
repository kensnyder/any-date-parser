import Parser from './src/Parser/Parser';
// import our formats
import ago from './src/formats/ago/ago';
import atSeconds from './src/formats/atSeconds/atSeconds';
import chinese from './src/formats/chinese/chinese';
import dayMonth from './src/formats/dayMonth/dayMonth';
import dayMonthname from './src/formats/dayMonthname/dayMonthname';
import dayMonthnameYear from './src/formats/dayMonthnameYear/dayMonthnameYear';
import dayMonthYear from './src/formats/dayMonthYear/dayMonthYear';
import fuzzy from './src/formats/fuzzy/fuzzy';
import korean from './src/formats/korean/korean';
import microsoftJson from './src/formats/microsoftJson/microsoftJson';
import monthDay from './src/formats/monthDay/monthDay';
import monthDayYear from './src/formats/monthDayYear/monthDayYear';
import monthnameDay from './src/formats/monthnameDay/monthnameDay';
import monthnameDayYear from './src/formats/monthnameDayYear/monthnameDayYear';
import time12Hours from './src/formats/time12Hours/time12Hours';
import time24Hours from './src/formats/time24Hours/time24Hours';
import today from './src/formats/today/today';
import twitter from './src/formats/twitter/twitter';
import yearMonthDay from './src/formats/yearMonthDay/yearMonthDay';
import yearMonthDayWithDots from './src/formats/yearMonthDayWithDots/yearMonthDayWithDots';
import yearMonthDayWithSlashes from './src/formats/yearMonthDayWithSlashes/yearMonthDayWithSlashes';
import yearMonthnameDay from './src/formats/yearMonthnameDay/yearMonthnameDay';

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
Date.fromString = parser.fromString;
// @ts-expect-error  Yes, we are extending the global Date object
Date.fromAny = parser.fromAny;
if (typeof window !== 'undefined') {
  // @ts-expect-error  Yes, we are extending the global window object
  window.anyDateParser = parser;
}

// export our default parser
export default parser;
