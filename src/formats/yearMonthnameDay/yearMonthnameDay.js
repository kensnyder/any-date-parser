const Format = require('../../Format/Format.js');

const yearMonthnameDay = new Format({
	/* prettier-ignore */
	//           $1      $2     $3              $4
	template: "^(_YEAR_)(_GAP_)(_MONTHNAME_)\\2(_DAY_)(?:_GAP_)?(?:_DAYNAME_)?\\.?$",
	units: ['year', null, 'month', 'day'],
});

module.exports = yearMonthnameDay;
