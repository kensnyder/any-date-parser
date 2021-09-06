const Format = require('../../Format/Format.js');

const dayMonthYear = new Format({
	/* prettier-ignore */
	//           $1     $2        $3          $4
	template: "^(_DAY_)([\\/. -])(_MONTH_)\\2(_YEAR_)$",
	units: ['day', null, 'month', 'year'],
});

module.exports = dayMonthYear;
