const Format = require('../Format/Format.js');

const chinese = new Format({
	/* prettier-ignore */
	//           $1        $2         $3
	template: "^(\\d{4}|\\d{2})年(\\d{1,2})月(\\d{1,2})日$",
	units: ['year', 'month', 'day'],
});

module.exports = chinese;
