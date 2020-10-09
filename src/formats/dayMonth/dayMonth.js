const Format = require('../../Format/Format.js');

const dayMonth = new Format({
	/* prettier-ignore */
	//           $1            $2
	template: "^(_DAY_)[\\/. ](_MONTH_)$",
	units: ['day', 'month'],
});

module.exports = dayMonth;
