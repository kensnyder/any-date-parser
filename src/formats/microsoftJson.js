const Format = require('../Format/Format.js');

const atSeconds = new Format({
	template: '^/Date\\((\\d+)([+-]\\d{4})?\\)$',
	handler: function (matches) {
		const milliseconds = parseInt(matches[1], 10);
		const date = new Date(milliseconds);
		return {
			year: date.getFullYear(),
			month: date.getMonth() + 1,
			day: date.getDay(),
			hour: date.getHours(),
			minute: date.getMinutes(),
			seconds: date.getSeconds(),
			milliseconds: date.getMilliseconds(),
			offset: matches[2] || 0,
		};
	},
});

module.exports = atSeconds;
