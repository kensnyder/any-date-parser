const Format = require('../../Format/Format.js');

// example: "Fri Apr 09 12:53:54 +0000 2010"
const twitter = new Format({
	/* prettier-ignore */
	//                         $1            $2      $3      $4      $5      $6         $7
	template: '^(?:_DAYNAME_) (_MONTHNAME_) (_DAY_) (_H24_):(_MIN_):(_SEC_) (_OFFSET_) (_YEAR_)$',
	units: ['month', 'day', 'hour', 'minute', 'second', 'offset', 'year'],
});

module.exports = twitter;
