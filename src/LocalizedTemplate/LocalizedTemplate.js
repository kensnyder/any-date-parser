const baseLookups = require('../data/baseLookups.js');
const baseVars = require('../data/baseVars.js');
const numberingSystems = require('../data/numberingSystems.js');

const cache = {};

const otherNumberVars = {
	YEAR: '*{3}|*{2}',
	MONTH: '*{1,2}',
	MONTH2: '*{2}',
	DAY: '*{1,2}',
	DAY2: '*{2}',
	OFFSET: '[+-]*{1,2}\\:?*{0,2}',
	H24: '*{2}',
	H12: '*{1,2}',
	MIN: '*{2}',
	SEC: '*{2}',
	MS: '*{3}|*{6}|*{9}',
};

class LocalizedTemplate {
	static factory(locale) {
		if (!cache[locale.toLowerCase()]) {
			cache[locale.toLowerCase()] = new LocalizedTemplate(locale);
		}
		return cache[locale.toLowerCase()];
	}
	constructor(locale) {
		this.locale = locale;
		this.isEnglish = /^en/i.test(locale);
		this.vars = { ...baseVars };
		this.lookups = { ...baseLookups };
		if (!this.isEnglish) {
			this.build();
		}
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
		this.buildNumbers();
		this.buildMonthNames();
		this.buildDaynames();
		this.buildMeridiems();
		// console.log('this.vars', this.vars);
	}
	buildNumbers() {
		const fmt = new Intl.NumberFormat(this.locale);
		const nsName = fmt.resolvedOptions().numberingSystem;
		const unicodeRange = numberingSystems[nsName];
		if (unicodeRange) {
			for (const name in otherNumberVars) {
				if (!otherNumberVars.hasOwnProperty(name)) {
					continue;
				}
				this.vars[name] = otherNumberVars[name].replace(/\*/g, unicodeRange);
			}
		}
	}
	buildMonthNames() {
		const dates = [];
		const findMonth = item => item.type === 'month';
		for (let monthIdx = 0; monthIdx < 12; monthIdx++) {
			dates.push(new Date(2017, monthIdx, 1));
		}
		const dateStyles = ['full', 'long', 'medium'];
		const list = [];
		const lookup = {};
		for (const dateStyle of dateStyles) {
			const format = Intl.DateTimeFormat(this.locale, { dateStyle });
			for (let monthIdx = 0; monthIdx < 12; monthIdx++) {
				let text = format.formatToParts(dates[monthIdx]).find(findMonth).value;
				if (dateStyle === 'medium') {
					text = text.replace(/\.$/, '');
					list.push(`${text}\\.`);
				} else {
					list.push(text);
				}
				lookup[text] = monthIdx;
			}
		}
		this.vars.MONTHNAME = list.join('|');
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
				let text = format.formatToParts(dates[dayIndex]).find(findDay).value;
				if (weekday === 'short') {
					text = text.replace(/\.$/, '');
					list.push(`${text}\\.`);
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
		const dates = [new Date(2017, 0, 1), new Date(2017, 0, 1, 23)];
		const findDayPeriod = item => item.type === 'dayPeriod';
		const list = [];
		const lookup = {};
		const format = Intl.DateTimeFormat(this.locale, { timeStyle: 'short' });
		for (let i = 0; i < 2; i++) {
			const text = format
				.formatToParts(dates[0])
				.find(findDayPeriod)
				.value.toLowerCase();
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

module.exports = LocalizedTemplate;
