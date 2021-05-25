const baseLookups = require('../data/baseLookups.js');
const { latn, other } = require('../data/templates.js');
const { buildDigits } = require('../data/numberingSystems.js');
const defaultLocale = require('../data/defaultLocale.js');
const units = require('../data/units.js');

// keep track of singletons by locale name
const cache = {};

class LocaleHelper {
	/**
	 * Get a singleton instance with the given locale
	 * @param {String} locale such as en, en-US, es, fr-FR, etc.
	 * @returns {LocaleHelper}
	 */
	static factory(locale = defaultLocale) {
		if (!cache[locale.toLowerCase()]) {
			cache[locale.toLowerCase()] = new LocaleHelper(locale);
		}
		return cache[locale.toLowerCase()];
	}

	/**
	 * Create a new instance with the given locale
	 * @param {String} locale such as en, en-US, es, fr-FR, etc.
	 */
	constructor(locale = defaultLocale) {
		/**
		 * The locale string
		 * @type {String}
		 */
		this.locale = locale;
		/**
		 * Lookups for zone, year, meridiem, month, dayname, digit
		 * @type {Object} lookups
		 */
		this.lookups = { ...baseLookups };
		/**
		 * Template variables including MONTHNAME, MONTH, ZONE, etc.
		 * @type {Object} vars
		 */
		this.vars = { ...latn };
		const fmt = new Intl.NumberFormat(this.locale);
		/**
		 * The numbering system to use (latn=standard arabic digits)
		 * @type {String} numberingSystem
		 */
		this.numberingSystem = fmt.resolvedOptions().numberingSystem;
		this.build();
		// console.log({
		// 	numberingSystem: this.numberingSystem,
		// 	month: this.lookups.month,
		// 	dayname: this.lookups.dayname,
		// 	MONTHNAME: this.vars.MONTHNAME,
		// 	DAYNAME: this.vars.DAYNAME,
		// });
	}

	/**
	 * Cast a string to an integer, minding numbering system
	 * @param {String|Number} digitString  Such as "2020" or "二〇二〇"
	 * @returns {Number}
	 */
	toInt(digitString) {
		if (typeof digitString === 'number') {
			return digitString;
		}
		if (this.numberingSystem === 'latn') {
			return parseInt(digitString, 10);
		}
		let latn = '';
		for (let i = 0; i < digitString.length; i++) {
			latn += String(this.lookups.digit[digitString[i]]);
		}
		return parseInt(latn, 10);
	}

	/**
	 * Build lookups for digits, month names, day names, and meridiems based on the locale
	 */
	build() {
		if (this.numberingSystem !== 'latn') {
			this.buildNumbers();
		}
		if (!/^en/i.test(this.locale)) {
			this.buildMonthNames();
			this.buildDaynames();
			this.buildMeridiems();
		}
	}

	/**
	 * Build lookups for digits
	 */
	buildNumbers() {
		const nsName = this.numberingSystem;
		const { group, lookup } = buildDigits(nsName);
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
			const dateStyles = ['full', 'long', 'medium'];
			for (const dateStyle of dateStyles) {
				const format = Intl.DateTimeFormat(this.locale, { dateStyle });
				for (let monthIdx = 0; monthIdx < 12; monthIdx++) {
					const parts = format.formatToParts(dates[monthIdx]);
					let text = parts.find(findMonth).value.toLowerCase();
					if (/^ko/i.test(this.locale)) {
						// Korean word for month is sometimes used
						text += '월';
					}
					if (dateStyle === 'medium') {
						// some languages (including arabic and chinese) don't have a 'medium' size
						if (/^ar|zh/i.test(this.locale)) {
							return;
						}
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
				let text = parts.find(findMonth).value.toLowerCase();
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
			dates.push(new Date(2017, 0, dayIndex + 1));
		}
		const weekdays = ['long', 'short'];
		const list = [];
		const lookup = {};
		for (const weekday of weekdays) {
			const format = Intl.DateTimeFormat(this.locale, { weekday });
			for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
				const parts = format.formatToParts(dates[dayIndex]);
				let text = parts.find(findDay).value.toLowerCase();
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
	 * Build lookup for meridiems (e.g. AM/PM)
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
			const text = dayPeriod.value.toLowerCase();
			list.push(text);
			lookup[text] = i * 12;
		}
		this.vars.MERIDIEM = list.join('|');
		this.lookups.meridiem = lookup;
	}

	/**
	 * Given a list of unit names and matches, build result object
	 * @param {Array} units  Unit names such as "year", "month" and "millisecond"
	 * @param {Array} matches  The values matched by a Format's RegExp
	 * @returns {Object}
	 */
	getObject(units, matches) {
		const object = {};
		units.forEach((unit, i) => {
			if (!unit) {
				return;
			}
			let match = matches[i + 1];
			match = match.toLowerCase();
			match = match.replace(/\.$/, '');
			if (unit === 'offset') {
				object.offset = this.offsetToMinutes(match);
			} else if (this.lookups[unit]) {
				object[unit] = this.lookups[unit][match] || this.toInt(match);
			} else {
				object[unit] = this.toInt(match);
			}
		});
		return object;
	}

	/**
	 * Take a response object and cast each unit to Number
	 * @param {Object} object  An object with one or more units
	 * @returns {Object}  An object with same units but Numeric
	 */
	castObject(object) {
		const casted = {};
		units.forEach(unit => {
			if (unit in object) {
				casted[unit] = this.toInt(object[unit]);
			}
		});
		if (typeof object.offset === 'string') {
			casted.offset = this.offsetToMinutes(object.offset);
		} else if (typeof object.offset === 'number') {
			casted.offset = object.offset;
		}
		return casted;
	}

	/**
	 * Convert an offset string to Numeric minutes (e.g. "-0500", "+5", "+03:30")
	 * @param {String} offsetString
	 * @returns {Number}
	 */
	offsetToMinutes(offsetString) {
		const captured = offsetString.match(/^([+-])(..?):?(..)?$/);
		if (captured) {
			const [, sign, hours, minutes] = captured;
			return (
				(sign === '-' ? -1 : 1) *
				(this.toInt(hours) * 60 + this.toInt(minutes || 0))
			);
		}
		return 0;
	}

	/**
	 * Compile template into a RegExp and return it
	 * @param {String} template  The template string
	 * @returns {RegExp}
	 */
	compile(template) {
		const regexString = template.replace(/_([A-Z0-9]+)_/g, ($0, $1) => {
			if (!this.vars[$1]) {
				throw new Error(`Template string contains invalid variable _${$1}_`);
			}
			return this.vars[$1];
		});
		return new RegExp(regexString, 'i');
	}
}

module.exports = LocaleHelper;
