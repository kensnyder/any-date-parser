import LocaleHelper from '../LocaleHelper/LocaleHelper';
import Parser from '../Parser/Parser';
import defaultLocale from '../data/defaultLocale';
import removeFillerWords from '../removeFillerWords/removeFillerWords';

export type HandlerResult = {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
  millisecond?: number;
  offset?: number;
  invalid?: string;
};

export type Bounds = {
  lower: string;
  upper: string;
  inclusive: boolean;
  strict: boolean;
};

export type LocaleOrBounds =
  | string
  | {
      locale?: string;
      bounds?: Bounds;
    };

/**
 * Represents a parsable date format
 */
export default class Format {
  template: string;
  units: string[];
  matcher: RegExp;
  handler: (matches: string[], locale: string) => HandlerResult;
  locales: string[];
  regexByLocale: Record<string, RegExp>;
  parser: Parser | undefined;
  /**
   * Given a definition, create a parsable format
   * @param {Object} definition  The format definition
   * @property {String} template  A template for RegExp that can handle multiple languages
   * @property {RegExp} matcher  An actual RegExp to match against
   * @property {Array} units  If the template or RegExp match exact units, you can define the units
   * @property {Function} handler  A flexible alternative to units; must return an object
   * @property {Array} locales  A list of locales that this format should be restricted to
   */
  constructor({
    template = null,
    matcher = null,
    units = null,
    handler = null,
    locales = null,
  }) {
    if (!Array.isArray(units) && typeof handler !== 'function') {
      throw new Error(
        'new Format must receive a "units" array or "handler" function'
      );
    }
    if (typeof template !== 'string' && !(matcher instanceof RegExp)) {
      throw new Error(
        'new Format must receive a "template" string or "matcher" RegExp'
      );
    }
    /**
     * @type {String} template  A template for RegExp that can handle multiple languages
     */
    this.template = template;

    /**
     * @type {Array} units  If the template or RegExp match exact units, you can define the units
     */
    this.units = units;

    /**
     * @type {RegExp} matcher  An actual RegExp to match against
     */
    this.matcher = matcher;

    /**
     * @type {Function} handler  A flexible alternative to units; must return an object
     */
    this.handler = handler;

    /**
     * @type {String[]} locales  A list of locales that this format should be restricted to
     */
    this.locales = locales;

    /**
     * A cache of RegExp indexed by locale name
     * @type {Object}
     */
    this.regexByLocale = {};
  }

  /**
   * Build the RegExp from the template for a given locale
   * @param {String} locale  The language locale such as en-US, pt-BR, zh, es, etc.
   * @returns {RegExp}  A RegExp that matches when this format is recognized
   */
  getRegExp(locale = defaultLocale) {
    if (this.template) {
      if (!this.regexByLocale[locale]) {
        this.regexByLocale[locale] = LocaleHelper.factory(locale).compile(
          this.template
        );
        //console.log([locale, this.regexByLocale[locale]]);
      }
      // if (locale.slice(0, 2) === 'zh') {
      // 	console.log(this.template, this.regexByLocale[locale]);
      // }
      return this.regexByLocale[locale];
    }
    return this.matcher;
  }

  /**
   * Run this format's RegExp against the given string
   * @param dateStr  The date string
   * @param locale  The language locale such as en-US, pt-BR, zh, es, etc.
   * @returns  Array of matches or null on non-match
   */
  getMatches(dateStr: string, locale = defaultLocale): string[] | null {
    return dateStr.match(this.getRegExp(locale));
  }

  /**
   * Given matches against this RegExp, convert to object
   * @param matches  An array of matched parts
   * @param locale  The language locale such as en-US, pt-BR, zh, es, etc.
   * @returns Object which may contain year, month, day, hour, minute, second, millisecond, offset, invalid
   */
  toDateTime(matches: string[], locale = defaultLocale) {
    const locHelper = LocaleHelper.factory(locale);
    if (this.units) {
      return locHelper.getObject(this.units, matches);
    }
    const dt = this.handler(matches, locale);
    if (!dt || dt.invalid) {
      return dt;
    }
    return locHelper.castObject(dt);
  }

  /**
   * Attempt to parse a string in this format
   * @param strDate  The date string
   * @param locale  The language locale such as en-US, pt-BR, zh, es, etc.
   * @returns {Object|null}  Null if format can't handle this string, Object for result or error
   */
  attempt(
    strDate: string,
    locale: LocaleOrBounds = defaultLocale
  ): HandlerResult {
    let effectiveLocale = locale;
    const bounds = {
      lower: '0001-01-01T00:00:00',
      upper: '9999-12-31T23:59:59',
      inclusive: true,
      strict: false,
    };
    if (typeof locale === 'object') {
      effectiveLocale = locale.locale || defaultLocale;
      Object.assign(bounds, locale.bounds || {});
    }
    strDate = removeFillerWords(String(strDate), locale).trim();
    const matches = this.getMatches(strDate, effectiveLocale);
    if (matches) {
      const dt = this.toDateTime(matches, effectiveLocale);
      if (dt instanceof Date && !this.isInRange(dt, bounds) && bounds.strict) {
        const inclusive = bounds.inclusive ? 'inclusive' : 'not inclusive';
        return {
          invalid: `Date not in range ${bounds.lower} to ${bounds.upper} ${inclusive}`,
        };
      }
      return dt || null;
    }
    return null;
  }

  isInRange(date: Date, bounds: Bounds) {
    const dateStr = date.toJSON();
    if (bounds.inclusive) {
      return dateStr >= bounds.lower && dateStr <= bounds.upper;
    }
    return dateStr > bounds.lower && dateStr < bounds.upper;
  }

  /**
   * Return the current date (used to support unit testing)
   * @returns {Date}
   */
  now() {
    return new Date();
  }
}
