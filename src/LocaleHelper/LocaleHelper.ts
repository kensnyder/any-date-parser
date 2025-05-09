import buildDigits from '../buildDigits/buildDigits';
import baseLookups from '../data/baseLookups';
import defaultLocale from '../data/defaultLocale';
import { defaultLookup } from '../data/numberingSystems';
import { latn, other } from '../data/templates';
// import units, { UnitStrings } from '../data/units';

// keep track of singletons by locale name
const cache = {};

export default class LocaleHelper {
  /**
   * The locale string
   */
  locale: string;
  /**
   * Lookups for zone, year, meridiem, month, dayname, digit
   */
  lookups: Record<string, any>;
  /**
   * Template variables including MONTHNAME, MONTH, ZONE, etc.
   */
  vars: Record<string, any>;
  /**
   * The numbering system to use (latn=standard arabic digits)
   */
  numberingSystem: string;
  /**
   * The base name of the locale (e.g. en-US)
   */
  baseName: string;
  /**
   * Date options for the locale
   * @property locale: string;
   * @property calendar: string;
   * @property numberingSystem: string;
   * @property timeZone: string;
   * @property hour12?: boolean;
   * @property weekday?: string;
   * @property era?: string;
   * @property year?: string;
   * @property month?: string;
   * @property day?: string;
   * @property hour?: string;
   * @property minute?: string;
   * @property second?: string;
   * @property timeZoneName?: string;
   */
  dateOptions: Intl.ResolvedDateTimeFormatOptions;

  /**
   * Get a singleton instance with the given locale
   * @param locale such as en, en-US, es, fr-FR, etc.
   * @returns
   */
  static factory(locale = defaultLocale): LocaleHelper {
    if (!cache[locale.toLowerCase()]) {
      cache[locale.toLowerCase()] = new LocaleHelper(locale);
    }
    return cache[locale.toLowerCase()];
  }

  /**
   * Create a new instance with the given locale
   * @param locale such as en, en-US, es, fr-FR, etc.
   */
  constructor(locale = defaultLocale) {
    this.locale = locale;
    this.lookups = { ...baseLookups };
    this.vars = { ...latn };
    const fmt = new Intl.NumberFormat(this.locale);
    this.numberingSystem = fmt.resolvedOptions().numberingSystem;
    this.dateOptions = new Intl.DateTimeFormat(this.locale).resolvedOptions();
    this.baseName = new Intl.Locale(this.locale).baseName;
    this.build();
    // console.log('lookups=====>', this.lookups.digit);
  }

  /**
   * Cast a string to an integer, minding numbering system
   * @param digitString  Such as "2020" or "二〇二〇"
   * @returns
   */
  toInt(digitString: string | number): number {
    if (typeof digitString === 'number') {
      return digitString;
    }
    if (typeof digitString !== 'string') {
      return undefined;
    }
    if (this.numberingSystem === 'latn' && !this.baseName.startsWith('zh')) {
      // latin digits can be parsed a tad quicker by using parseInt
      const num = parseInt(digitString, 10);
      if (!isNaN(num)) {
        return num;
      }
    }
    let latnDigitString = '';
    for (let i = 0; i < digitString.length; i++) {
      latnDigitString += String(this.lookups.digit[digitString[i]]);
    }
    return parseInt(latnDigitString, 10);
  }

  millisecondToInt(msString: string | number) {
    if (typeof msString === 'number') {
      return msString;
    }
    if (typeof msString !== 'string') {
      return undefined;
    }
    const digits = msString.slice(0, 3);
    if (digits.length === 1) {
      return this.toInt(digits) * 100;
    } else if (digits.length === 2) {
      return this.toInt(digits) * 10;
    }
    return this.toInt(digits);
  }

  monthNameToInt(monthName: string) {
    if (typeof monthName !== 'string') {
      return undefined;
    }
    const lower = monthName.toLocaleLowerCase(this.locale).replace(/\.$/, '');
    return this.lookups.month[lower] || 12;
  }

  h12ToInt(digitString: string | number, ampm: string) {
    if (typeof digitString !== 'string') {
      return undefined;
    }
    const meridiemOffset = this.lookups.meridiem[ampm?.toLowerCase()] || 0;
    let hourInt = this.toInt(digitString);
    if (hourInt < 12 && meridiemOffset === 12) {
      hourInt += 12;
    }
    if (hourInt === 12 && meridiemOffset === 0) {
      hourInt = 0;
    }
    return hourInt;
  }

  zoneToOffset(zoneName: string) {
    if (typeof zoneName !== 'string') {
      return undefined;
    }
    // remove symbols and numbers (sometimes timezone is in parentheses)
    zoneName = zoneName.replace(/[^a-z\s]/gi, '');
    return this.lookups.zone[zoneName];
  }

  /**
   * Convert an offset string to Numeric minutes (e.g. "-0500", "+5", "+03:30")
   * @param offsetString
   */
  offsetToMinutes(offsetString: string): number {
    if (typeof offsetString !== 'string') {
      return undefined;
    }
    const captured = offsetString.match(/^(?:GMT)?([±−+-])(..?):?(..)?$/);
    if (captured) {
      const [, sign, hours, minutes] = captured;
      return (
        (sign === '-' || sign === '−' ? -1 : 1) *
        (this.toInt(hours) * 60 + this.toInt(minutes || 0))
      );
    }
    return 0;
  }

  /**
   * Build lookups for digits, month names, day names, and meridiems based on the locale
   */
  build() {
    if (this.dateOptions.numberingSystem === 'latn') {
      this.lookups.digit = defaultLookup;
    } else {
      this.buildNumbers();
    }
    if (!/^en/i.test(this.locale)) {
      this.buildMonthNames();
      this.buildDaynames();
      if (!/zh/i.test(this.locale)) {
        this.buildMeridiems();
      }
    }
    // if (this.locale === 'en-US') {
    //   console.log('lookups=====>', this);
    // }
  }

  /**
   * Build lookups for non-arabic digits
   */
  buildNumbers() {
    const { group, lookup } = buildDigits(this.numberingSystem);
    this.lookups.digit = lookup;
    for (const name in other) {
      /* istanbul ignore next */
      if (!other.hasOwnProperty(name)) {
        continue;
      }
      this.vars[name] = other[name].replace(/\*/g, group);
    }
  }

  /**
   * Build lookup for month names
   */
  buildMonthNames() {
    const vars = {};
    const lookup = {};
    if (/^fi/i.test(this.locale)) {
      const months =
        'tammi|helmi|maalis|huhti|touko|kesä|heinä|elo|syys|loka|marras|joulu';
      months.split('|').forEach((month, idx) => {
        ['', 'k', 'kuu', 'kuuta'].forEach((suffix, i) => {
          const maybePeriod = i < 2 ? '\\.?' : '';
          vars[month + suffix + maybePeriod] = true;
          lookup[month + suffix] = idx + 1;
        });
      });
    } else {
      const dates = [];
      const findMonth = item => item.type === 'month';
      for (let monthIdx = 0; monthIdx < 12; monthIdx++) {
        dates.push(new Date(2017, monthIdx, 1));
      }
      const dateStyles = ['full', 'long', 'medium'] as const;
      for (const dateStyle of dateStyles) {
        const format = Intl.DateTimeFormat(this.locale, { dateStyle });
        for (let monthIdx = 0; monthIdx < 12; monthIdx++) {
          const parts = format.formatToParts(dates[monthIdx]);
          let text = parts.find(findMonth).value.toLocaleLowerCase(this.locale);
          if (/^\d+$/.test(text)) {
            // don't consider digits as month names
            continue;
          }
          if (/^ko/i.test(this.locale)) {
            // Korean word for month is sometimes used
            text += '월';
          }
          if (dateStyle === 'medium') {
            // // some languages (including arabic and chinese) don't have a 'medium' size
            // if (/^ar|zh/i.test(this.locale)) {
            //   return;
            // }
            text = text.replace(/\.$/, '');
            vars[`${text}\\.?`] = true;
          } else {
            vars[text] = true;
          }
          lookup[text] = monthIdx + 1;
        }
      }
      const format = Intl.DateTimeFormat(this.locale, { month: 'short' });
      for (let monthIdx = 0; monthIdx < 12; monthIdx++) {
        const parts = format.formatToParts(dates[monthIdx]);
        let text = parts.find(findMonth).value.toLocaleLowerCase(this.locale);
        text = text.replace(/\.$/, '');
        vars[`${text}\\.?`] = true;
        lookup[text] = monthIdx + 1;
      }
    }
    this.vars.MONTHNAME = Object.keys(vars).join('|');
    this.lookups.month = lookup;
  }

  /**
   * Build lookup for day name
   */
  buildDaynames() {
    const dates = [];
    const findDay = item => item.type === 'weekday';
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      // Jan 2017 starts on a sunday
      dates.push(new Date(2017, 0, dayIndex + 1));
    }
    const weekdays = ['long', 'short'] as const;
    const list = [];
    const lookup = {};
    for (const weekday of weekdays) {
      const format = Intl.DateTimeFormat(this.locale, { weekday });
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const parts = format.formatToParts(dates[dayIndex]);
        let text = parts.find(findDay).value.toLocaleLowerCase(this.locale);
        if (weekday === 'short') {
          text = text.replace(/\.$/, '');
          list.push(`${text}\\.?`);
        } else {
          list.push(text);
        }
        lookup[text] = dayIndex;
      }
    }
    this.vars.DAYNAME = list.join('|');
    this.lookups.dayname = lookup;
  }

  /**
   * Build lookup for am/pm
   */
  buildMeridiems() {
    const dates = [new Date(2017, 0, 1), new Date(2017, 0, 1, 23, 0, 0)];
    const findDayPeriod = item => item.type === 'dayPeriod';
    const list = [];
    const lookup = {};
    const format = Intl.DateTimeFormat(this.locale, { timeStyle: 'long' });
    for (let i = 0; i < 2; i++) {
      const parts = format.formatToParts(dates[i]);
      const dayPeriod = parts.find(findDayPeriod);
      if (!dayPeriod) {
        // this locale does not use AM/PM
        return;
      }
      const text = dayPeriod.value.toLocaleLowerCase(this.locale);
      list.push(text);
      lookup[text] = i * 12;
    }
    this.vars.MERIDIEM = list.join('|');
    this.lookups.meridiem = lookup;
  }

  /**
   * Compile template into a RegExp and return it
   * @param template  The template string such as (_YEAR_)-(_MONTH_)-(_DAY_)
   */
  compile(template: string) {
    const regexString = template.replace(/_([A-Z0-9]+)_/g, ($0, $1) => {
      if (!this.vars[$1]) {
        throw new Error(`Template string contains invalid variable _${$1}_`);
      }
      return this.vars[$1];
    });
    return new RegExp(regexString, 'i');
  }
}
