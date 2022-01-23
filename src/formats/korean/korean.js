const Format = require('../../Format/Format.js');

const korean = new Format({
	/* prettier-ignore */
	//           $1                 $2                   $3
	template: `^(_YEAR_)년(?:_GAP_)?(_MONTH_)월(?:_GAP_)?(_DAY_)일(?:_GAP_)?(?:_DAYNAME_)?$`,
	units: ['year', 'month', 'day'],
});

module.exports = korean;
