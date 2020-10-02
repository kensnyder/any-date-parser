const { DateTime } = require('luxon');
const Format = require('../Format/Format.js');

const ago = new Format({
	template: '^([\\d.]+) (_UNIT_)s? ago$',
	handler: function ([, amount, unit]) {
		return DateTime.local().minus({ [unit]: parseFloat(amount) });
	},
});

module.exports = ago;
