const Format = require('../../Format/Format.js');

const dayMonthnameYear = new Format({
	/* prettier-ignore */
	//                                      $1                            $2                    $3
	template: "^(?:(?:_DAYNAME_)(?:_GAP_))?(_DAY_)(?:_ORDINAL_)?(?:_GAP_)(_MONTHNAME_)(?:_GAP_)(_YEAR_)(?:_GAP_)?(?:_DAYNAME_)?$",
	units: ['day', 'month', 'year'],
});

module.exports = dayMonthnameYear;
