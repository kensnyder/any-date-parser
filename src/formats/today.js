const { DateTime } = require('luxon');
const Format = require('../Format/Format.js');

const today = new Format({
	regex: /^(today|now|tomorrow|yesterday)/i,
	handler: function (match) {
		switch (match[1].toLowerCase()) {
			case 'today':
			case 'now':
				return DateTime.local();
			case 'tomorrow':
				return DateTime.local().plus({ days: 1 });
			case 'yesterday':
				return DateTime.local().minus({ days: 1 });
		}
	},
});

module.exports = today;
