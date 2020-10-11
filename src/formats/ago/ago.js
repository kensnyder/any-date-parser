const Format = require('../../Format/Format.js');

const ago = new Format({
	//        $1         $2    $3                                                    $4
	regex: /^(\+|-|in |)(\d+) (year|month|week|day|hour|minute|second|millisecond)s?( ago)?$/i,
	handler: function ([, sign, amount, unit, ago]) {
		amount = parseFloat(amount);
		unit = unit.toLowerCase();
		if (sign === '-' || ago) {
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
		const result = {};
		switch (unit) {
			case 'millisecond':
				result.millisecond = now.getUTCMilliseconds();
			case 'second':
				result.second = now.getUTCSeconds();
			case 'minute':
				result.minute = now.getUTCMinutes();
			case 'hour':
				result.hour = now.getUTCHours();
			case 'day':
				result.day = now.getUTCDate();
			case 'month':
				result.month = now.getUTCMonth() + 1;
			case 'year':
				result.year = now.getUTCFullYear();
		}
		return result;
	},
});

module.exports = ago;
