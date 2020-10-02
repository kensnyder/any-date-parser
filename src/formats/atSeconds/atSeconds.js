const Format = require('../../Format/Format.js');

const atSeconds = new Format({
	template: '^@(\\d+)$',
	handler: function (matches) {
		const seconds = parseInt(matches[1], 10);
		const date = new Date(seconds * 1000);
		return {
			year: date.getFullYear(),
			month: date.getMonth() + 1,
			day: date.getDay(),
			hour: date.getHours(),
			minute: date.getMinutes(),
			seconds: date.getSeconds(),
		};
	},
});

module.exports = atSeconds;
