import Format from '../../Format/Format';
import LocaleHelper from '../../LocaleHelper/LocaleHelper';

const limitToLocales: string[] = [
  'ee-TG', // Togo (Ewe)
  'en-AS', // American Samoa
  'en-CA', // Canada
  'en-FM', // Federated States of Micronesia
  'en-GH', // Ghana
  'en-GU', // Guam
  'en-KE', // Kenya
  'en-KY', // Cayman Islands
  'en-MH', // Marshall Islands
  'en-MP', // Northern Mariana Islands
  'en-US', // United States
  'en-VI', // US Virgin Islands
  'en-WS', // Western Samoa
  'jp-JP', // Japan
  'sm-AS', // American Samoa (Samoan)
  'sm-SM', // Samoa
];

const monthDayYear = new Format({
  //           $1       $2      $3        $4
  template: '^(_MONTH_)(_GAP_)(_DAY_)\\2(_YEAR_)$',
  handler: ([, month, , day, year]: string[], locale: string) => {
    if (!limitToLocales.includes(locale)) {
      // not a wacky m/d/y locale; disallow it
      return null;
    }
    const helper = LocaleHelper.factory(locale);
    return {
      month: helper.toInt(month),
      day: helper.toInt(day),
      year: helper.toInt(year),
    };
  },
  locales: limitToLocales,
});

export default monthDayYear;
