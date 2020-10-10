class Parser {
	/**
	 * Initialize an object with an empty array of registered formats
	 */
	constructor() {
		this.formats = [];
	}

	/**
	 * Register a format object representing a parseable date format
	 * @param {Format} format
	 * @returns {Parser}
	 */
	addFormat(format) {
		this.formats.push(format);
		format.parser = this;
		return this;
	}

	/**
	 * Unregister a format
	 * @param {Format} format
	 * @returns {Boolean}  true if format was found and removed, false if it wasn't registered
	 */
	removeFormat(format) {
		const idx = this.formats.indexOf(format);
		if (idx > -1) {
			const old = this.formats.splice(idx, 1);
			old.parser = null;
			return true;
		}
		return false;
	}

	/**
	 * Attempt to parse a date string
	 * @param {String} date
	 * @param {String|Locale} locale  The name of the locale
	 * @returns {Object}
	 */
	attempt(date, locale) {
		for (const format of this.formats) {
			const dt = format.attempt(date, locale);
			if (dt) {
				return dt;
			}
		}
		// Uh Oh! We don't know that one
		const string = String(date).slice(0, 200);
		return { invalid: `Unable to parse ${string}` };
	}
}

module.exports = Parser;
