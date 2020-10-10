const Format = require('../../Format/Format.js');

const monthDay = new Format({
	/* prettier-ignore */
	//           $1                 $2
	template: "^(_MONTH_)(?:[\\/-])(_DAY_)$",
	units: ['month', 'day'],
});

module.exports = monthDay;
