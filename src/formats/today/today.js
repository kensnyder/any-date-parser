const Format = require('../../Format/Format.js');

const today = new Format({
	regex: /^(today|now|tomorrow|yesterday)/i,
	handler: function (match) {
		const now = this.now();
		switch (match[1].toLowerCase()) {
			case 'tomorrow':
				// JavaScript automatically handles flowing from one day to the next
				// For example, 2020-1-32 will auto convert to 2020-2-1
				now.setUTCDate(now.getUTCDate() + 1);
				break;
			case 'yesterday':
				now.setUTCDate(now.getUTCDate() - 1);
				break;
		}
		return {
			year: now.getUTCFullYear(),
			month: now.getUTCMonth() + 1,
			day: now.getUTCDate(),
		};
	},
});

module.exports = today;
