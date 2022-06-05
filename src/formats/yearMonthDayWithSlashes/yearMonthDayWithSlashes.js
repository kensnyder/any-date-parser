const Format = require('../../Format/Format.js');

const yearMonthDayWithSlashes = new Format({
	/* prettier-ignore */
	//           $1         $2          $3
	template: "^(_YEAR_)\\/(_MONTH_)\\/(_DAY_) ?(_DAYNAME_)?\\.?$",
	units: ['year', 'month', 'day'],
});

module.exports = yearMonthDayWithSlashes;
