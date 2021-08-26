const Format = require('../../Format/Format.js');
const unitShortcuts = require('../../data/unitShortcuts.js');

const ago = new Format({
	/* prettier-ignore */
	//          $1          $2        $3                                                                                   $4
	matcher: /^(\+|-|in|) ?([\d.]+) ?(years?|months?|weeks?|days?|hours?|minutes?|seconds?|milliseconds?|ms|s|m|h|w|d|M|y)( ago)?$/i,
	handler: function ([, sign, amount, unit, isAgo]) {
		amount = parseFloat(amount);
		if (unit.length <= 2) {
			unit = unitShortcuts[unit];
		} else {
			unit = unit.replace(/s$/, '');
			unit = unit.toLowerCase();
		}
		if (unit === 'week') {
			unit = 'day';
			amount *= 7;
		}
		if (sign === '-' || isAgo) {
			amount *= -1;
		}
		const now = this.now();
		if (unit === 'millisecond') {
			now.setUTCMilliseconds(now.getUTCMilliseconds() + amount);
		} else if (unit === 'second') {
			now.setUTCSeconds(now.getUTCSeconds() + amount);
		} else if (unit === 'minute') {
			now.setUTCMinutes(now.getUTCMinutes() + amount);
		} else if (unit === 'hour') {
			now.setUTCHours(now.getUTCHours() + amount);
		} else if (unit === 'day') {
			now.setUTCDate(now.getUTCDate() + amount);
		} else if (unit === 'month') {
			now.setUTCMonth(now.getUTCMonth() + amount);
		} else if (unit === 'year') {
			now.setUTCFullYear(now.getUTCFullYear() + amount);
		}
		return {
			year: now.getUTCFullYear(),
			month: now.getUTCMonth() + 1,
			day: now.getUTCDate(),
			hour: now.getUTCHours(),
			minute: now.getUTCMinutes(),
			second: now.getUTCSeconds(),
			millisecond: now.getUTCMilliseconds(),
		};
	},
});

module.exports = ago;
