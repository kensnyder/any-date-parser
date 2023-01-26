// import our main modules
const Parser = require('./src/Parser/Parser.js');
const Format = require('./src/Format/Format.js');
const LocaleHelper = require('./src/LocaleHelper/LocaleHelper.js');
// import our formats
const atSeconds = require('./src/formats/atSeconds/atSeconds.js');
const microsoftJson = require('./src/formats/microsoftJson/microsoftJson.js');
const ago = require('./src/formats/ago/ago.js');
const chinese = require('./src/formats/chinese/chinese.js');
const dayMonth = require('./src/formats/dayMonth/dayMonth.js');
const dayMonthname = require('./src/formats/dayMonthname/dayMonthname.js');
const dayMonthnameYear = require('./src/formats/dayMonthnameYear/dayMonthnameYear.js');
const dayMonthYear = require('./src/formats/dayMonthYear/dayMonthYear.js');
const defaultLocale = require('./src/data/defaultLocale.js');
const monthDay = require('./src/formats/monthDay/monthDay.js');
const monthDayYear = require('./src/formats/monthDayYear/monthDayYear.js');
const monthnameDay = require('./src/formats/monthnameDay/monthnameDay.js');
const monthnameDayYear = require('./src/formats/monthnameDayYear/monthnameDayYear.js');
const time12Hours = require('./src/formats/time12Hours/time12Hours.js');
const time24Hours = require('./src/formats/time24Hours/time24Hours.js');
const today = require('./src/formats/today/today.js');
const twitter = require('./src/formats/twitter/twitter.js');
const yearMonthDay = require('./src/formats/yearMonthDay/yearMonthDay.js');

// create a default parser instance and register all the default formats
const parser = new Parser();
parser
	// all formats can have time strings at the end
	.addFormats([
		time24Hours,
		time12Hours,
		// from most unambiguous and popular to least
		yearMonthDay,
		dayMonthnameYear,
		monthnameDayYear,
		monthDayYear,
		dayMonthYear,
		chinese,
		twitter,
		today,
		ago,
		monthnameDay,
		dayMonthname,
		monthDay,
		dayMonth,
		atSeconds,
		microsoftJson,
	]);

// make it easy to consume our other main modules and functions
parser.Parser = Parser;
parser.Format = Format;
parser.LocaleHelper = LocaleHelper;
parser.defaultLocale = defaultLocale;

// create functions on Date
parser.fromString = Date.fromString = parser.exportAsFunction();
parser.fromAny = Date.fromAny = parser.exportAsFunctionAny();

if (typeof window !== 'undefined') {
	/* istanbul ignore next */
	window.anyDateParser = parser;
}

// export our default parser
module.exports = parser;
