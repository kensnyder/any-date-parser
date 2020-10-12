const LocaleHelper = require('../LocaleHelper/LocaleHelper.js');
const defaultLocale = require('../data/defaultLocale.js');

/**
 * Represents a parsable date format
 */
class Format {
	/**
	 * Given a definition, create a parsable format
	 * @param {String} template  A template for RegExp that can handle multiple languages
	 * @param {RegExp} regex  An actual RegExp to match against
	 * @param {Array} units  If the template or RegExp match exact units, you can define the units
	 * @param {Function} handler  A flexible alternative to units; must return an object
	 */
	constructor({ template = null, regex = null, units = null, handler = null }) {
		if (!Array.isArray(units) && typeof handler !== 'function') {
			throw new Error(
				'new Format must receive a "units" array or "handler" function'
			);
		}
		if (typeof template !== 'string' && !(regex instanceof RegExp)) {
			throw new Error(
				'new Format must receive a "template" string or "regex" RegExp'
			);
		}
		this.template = template;
		this.units = units;
		this.regex = regex;
		this.handler = handler;
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
			}
			// console.log({ tpl: this.template, regex: this.regexByLocale[locale] });
			return this.regexByLocale[locale];
		}
		return this.regex;
	}

	/**
	 * Run this format's RegExp against the given string
	 * @param {String} string  The date string
	 * @param {String} locale  The language locale such as en-US, pt-BR, zh, es, etc.
	 * @returns {Array|null}  Array of matches or null on non-match
	 */
	getMatches(string, locale = defaultLocale) {
		return string.match(this.getRegExp(locale));
	}

	/**
	 * Given matches against this RegExp, convert to object
	 * @param {String[]} matches  An array of matched parts
	 * @param {String} locale  The language locale such as en-US, pt-BR, zh, es, etc.
	 * @returns {Object}  Object which may contain year, month, day, hour, minute, second, millisecond, offset, invalid
	 */
	toDateTime(matches, locale = defaultLocale) {
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
	 * @param {String} string  The date string
	 * @param {String} locale  The language locale such as en-US, pt-BR, zh, es, etc.
	 * @returns {Object|null}  Null if format can't handle this string, Object for result or error
	 */
	attempt(string, locale = defaultLocale) {
		const matches = this.getMatches(string, locale);
		if (matches) {
			const dt = this.toDateTime(matches, locale);
			if (dt && !dt.invalid) {
				return dt;
			}
		}
		return null;
	}

	/**
	 * Return the current date (used to support unit testing)
	 * @returns {Date}
	 */
	now() {
		return new Date();
	}
}

module.exports = Format;
