// import our Parser
const Parser = require('./src/Parser/Parser.js');
const fromString = require('./src/fromString/fromString.js');
const fromAny = require('./src/fromAny/fromAny.js');
// import our formats
// new folder
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
	.addFormat(time24Hours)
	.addFormat(time12Hours)
	// from most unambiguous and popular to least
	.addFormat(yearMonthDay)
	.addFormat(dayMonthnameYear)
	.addFormat(monthnameDayYear)
	.addFormat(monthDayYear)
	.addFormat(dayMonthYear)
	.addFormat(chinese)
	.addFormat(twitter)
	.addFormat(today)
	.addFormat(ago)
	.addFormat(monthnameDay)
	.addFormat(dayMonthname)
	.addFormat(monthDay)
	.addFormat(dayMonth)
	.addFormat(atSeconds)
	.addFormat(microsoftJson);

Date.fromString = fromString(parser, defaultLocale);
Date.fromAny = fromAny(Date.fromString);

module.exports = parser;

// 	.addParser({
// 		name: 'firstlastdayof',
// 		matcher: /^(first|last) day of (last|this|the|next) (week|month|year)/i,
// 		handler: function (match) {
// 			var firstlast = match[1].toLowerCase();
// 			var lastnext = match[2].toLowerCase();
// 			var monthyear = match[3].toLowerCase();
// 			var date = moment();
// 			if (lastnext == 'last') {
// 				date.subtract(1, monthyear);
// 			} else if (lastnext == 'next') {
// 				date.add(1, monthyear);
// 			}
// 			if (firstlast == 'first') {
// 				return date.startOf(monthyear);
// 			}
// 			return date.endOf(monthyear);
// 		},
// 	});
//
