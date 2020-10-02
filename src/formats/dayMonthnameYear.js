const Format = require('../Format/Format.js');

const dayMonthnameYear = new Format({
	/* prettier-ignore */
	//           $1                   $2    $3              $4
	template: "^(_DAY_)(?:_ORDINAL_)?([ -])(_MONTHNAME_)\\2(_YEAR_)$",
	units: ['day', null, 'month', 'year'],
});

module.exports = dayMonthnameYear;
