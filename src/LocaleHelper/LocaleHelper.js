const baseLookups = require('../data/baseLookups.js');
const { latn, other } = require('../data/templates.js');
const buildDigits = require('../data/numberingSystems.js');

const cache = {};

class LocaleHelper {
	static factory(locale = 'en-US') {
		if (!cache[locale.toLowerCase()]) {
			cache[locale.toLowerCase()] = new LocaleHelper(locale);
		}
		return cache[locale.toLowerCase()];
	}
	constructor(locale = 'en-US') {
		this.locale = locale;
		this.isEnglish = /^en/i.test(locale);
		this.lookups = { ...baseLookups };
		if (this.isEnglish) {
			this.vars = { ...latn };
			this.numberingSystem = 'latn';
		} else {
			this.vars = { ...latn };
			const fmt = new Intl.NumberFormat(this.locale);
			this.numberingSystem = fmt.resolvedOptions().numberingSystem;
			this.build();
		}
		// console.log({
		// 	numberingSystem: this.numberingSystem,
		// 	month: this.lookups.month,
		// 	dayname: this.lookups.dayname,
		// 	MONTHNAME: this.vars.MONTHNAME,
		// 	DAYNAME: this.vars.DAYNAME,
		// });
	}
	toInt(digitString) {
		if (this.numberingSystem === 'latn') {
			return parseInt(digitString, 10);
		}
		let latn = '';
		for (let i = 0; i < digitString.length; i++) {
			latn += String(this.lookups.digit[digitString[i]]);
		}
		return parseInt(latn, 10);
	}
	build() {
		if (this.numberingSystem !== 'latn') {
			this.buildNumbers();
		}
		this.buildMonthNames();
		this.buildDaynames();
		this.buildMeridiems();
	}
	buildNumbers() {
		const nsName = this.numberingSystem;
		const { group, lookup } = buildDigits(nsName);
		this.lookups.digit = lookup;
		for (const name in other) {
			if (!other.hasOwnProperty(name)) {
				continue;
			}
			this.vars[name] = other[name].replace(/\*/g, group);
		}
	}
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
					// if (/^\d+$/.test(text)) {
					// 	// sometimes "medium" yields just a number
					// 	continue;
					// }
					if (dateStyle === 'medium') {
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
	offsetToMinutes(offsetString) {
		const captured = offsetString.match(/^([+-])(..?):?(..)?$/);
		let offsetMinutes;
		if (captured) {
			const [, sign, hours, minutes] = captured;
			offsetMinutes =
				(sign === '-' ? -1 : 1) *
				(this.toInt(hours) * 60 + this.toInt(minutes || 0));
		}
		return offsetMinutes;
	}
	compile(template) {
		const regexString = template.replace(/_([A-Z0-9]+)_/g, ($0, $1) => {
			if (!this.vars[$1]) {
				throw new Error(`Template string contains invalid variable _${$1}_`);
			}
			return this.vars[$1];
		});
		// console.log({ regexString });
		return new RegExp(regexString, 'i');
	}
}

module.exports = LocaleHelper;
