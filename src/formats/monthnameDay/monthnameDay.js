const Format = require('../../Format/Format.js');

const monthnameDay = new Format({
	/* prettier-ignore */
	//                                $1             $2
	template: '^(?:(?:_DAYNAME_),? )?(_MONTHNAME_)? (_DAY_)(?:_ORDINAL_)?$',
	units: ['month', 'day'],
});

module.exports = monthnameDay;
