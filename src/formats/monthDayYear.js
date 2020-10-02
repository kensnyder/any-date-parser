const Format = require('../Format/Format.js');

const monthDayYear = new Format({
	/* prettier-ignore */
	//           $1       $2      $3        $4
	template: "^(_MONTH_)([\\/-])(_DAY_)\\2(_YEAR_)$",
	units: ['month', null, 'day', 'year'],
});

module.exports = monthDayYear;
