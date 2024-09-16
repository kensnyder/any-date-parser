import defaultLocale from '../data/defaultLocale';
import twoDigitYears from '../data/twoDigitYears';
import Format, { type HandlerResult } from '../Format/Format';
import fromAny from '../fromAny/fromAny';
import fromString from '../fromString/fromString';
import LocaleHelper from '../LocaleHelper/LocaleHelper';

export default class Parser {
  Parser: Parser;
  Format = Format;
  LocaleHelper = LocaleHelper;
  defaultLocale = defaultLocale;
  fromString: ReturnType<typeof fromString>;
  fromAny: ReturnType<typeof fromAny>;
  formats: Format[];

  /**
   * Initialize an object with an empty array of registered formats
   */
  constructor() {
    this.Parser = this;
    this.formats = [];
    this.fromString = this.exportAsFunction();
    this.fromAny = this.exportAsFunctionAny();
  }

  /**
   * Register a format object representing a parseable date format
   * @param {Format} format  The Format to add
   * @returns {Parser}
   * @chainable
   */
  addFormat(format: Format): this {
    this.formats.push(format);
    format.parser = this;
    return this;
  }

  /**
   * Register multiple formats
   * @param formats  The array of Formats to add
   * @returns {Parser}
   * @chainable
   */
  addFormats(formats: Format[]): this {
    formats.forEach(format => this.addFormat(format));
    return this;
  }

  /**
   * Unregister a format
   * @param format  The Format to remove
   * @returns  true if format was found and removed, false if it wasn't registered
   */
  removeFormat(format: Format): boolean {
    const idx = this.formats.indexOf(format);
    if (idx > -1) {
      const old = this.formats[idx];
      this.formats.splice(idx, 1);
      old.parser = null;
      return true;
    }
    return false;
  }

  /**
   * Attempt to parse a date string
   * @param dateStr  A parseable date string
   * @param locale  The name of the locale
   * @returns
   */
  attempt(dateStr: string, locale: string = defaultLocale): HandlerResult {
    for (const format of this.formats) {
      if (
        Array.isArray(format.locales) &&
        format.locales.length > 0 &&
        !format.locales.includes(new Intl.Locale(locale).baseName)
      ) {
        // some formats only make sense for certain locales, e.g. month/day/year
        continue;
      }
      const result = format.attempt(dateStr, locale);
      if (result && result.month > 12) {
        continue;
      }
      if (result) {
        if (result.year < 100) {
          result.year = twoDigitYears[result.year];
        }
        return result;
      }
    }
    // Uh Oh! We don't know that one
    let string = String(dateStr).slice(0, 200);
    if (string === '') {
      string = '(empty string)';
    }
    return { invalid: `Unable to parse "${string}"` };
  }

  /**
   * Export this parser as a single function that takes a string
   * @param locale The default locale it should use
   */
  exportAsFunction(locale = defaultLocale) {
    return fromString(this, locale);
  }

  /**
   * Export this parser as a single function that takes a string or Date
   * @param locale  The default locale it should use
   */
  exportAsFunctionAny(locale = defaultLocale) {
    return fromAny(fromString(this, locale));
  }
}
