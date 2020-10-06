// import our Parser
const Parser = require('./src/Parser/Parser.js');
// import our formats
// new folder
const atSeconds = require('./src/formats/atSeconds/atSeconds.js');
const microsoftJson = require('./src/formats/microsoftJson/microsoftJson.js');

// old folder
const ago = require('./src/formats/ago.js');
const chinese = require('./src/formats/chinese.js');
const dayMonth = require('./src/formats/dayMonth.js');
const dayMonthname = require('./src/formats/dayMonthname.js');
const dayMonthnameYear = require('./src/formats/dayMonthnameYear.js');
const dayMonthYear = require('./src/formats/dayMonthYear.js');
const defaultLocale = require('./src/defaultLocale/defaultLocale.js');
const monthDay = require('./src/formats/monthDay.js');
const monthDayYear = require('./src/formats/monthDayYear.js');
const monthnameDay = require('./src/formats/monthnameDay.js');
const monthnameDayYear = require('./src/formats/monthnameDayYear/monthnameDayYear.js');
const time12Hours = require('./src/formats/time12Hours/time12Hours.js');
const time24Hours = require('./src/formats/time24Hours.js');
const today = require('./src/formats/today.js');
const twitter = require('./src/formats/twitter.js');
const yearMonthDay = require('./src/formats/yearMonthDay/yearMonthDay.js');

// create a default parser instance and register all the default formats
const parser = new Parser();
parser
	// all formats can have time strings at the end
	// .addFormat(time24Hours)
	.addFormat(time12Hours)
	// from most unambiguous and popular to least
	.addFormat(yearMonthDay)
	// .addFormat(dayMonthnameYear)
	.addFormat(monthnameDayYear)
	// .addFormat(monthDayYear)
	// .addFormat(dayMonthYear)
	// .addFormat(chinese)
	// .addFormat(twitter)
	// .addFormat(today)
	// .addFormat(ago)
	// .addFormat(monthnameDay)
	// .addFormat(dayMonthname)
	// .addFormat(monthDay)
	// .addFormat(dayMonth)
	.addFormat(atSeconds)
	.addFormat(microsoftJson);

module.exports = parser;

// Date.fromString = function(string, locale) {
// 	const r = parser.attempt(string, locale);
// 	if (r.invalid) {
// 		return r;
// 	}
// 	if (!('year' in r) || !r.month || !r.day) {
//
// 	}
// 	return new Date(
// 		r.year || new Date().getFullYear(),
// 		r.month ? r.month - 1 : new Date().getMonth(),
// 		r.day || new Date().getDate(),
// 		r.hour || 0,
// 		r.minute || 0,
// 		r.second || 0,
// 		r.millisecond || 0,
// 	);
// };

//
// 	.addParser({
// 		name: 'in',
// 		template: '^in ([\\d.]+) (_UNIT_)s?$',
// 		handler: function (match) {
// 			return moment().add(parseFloat(match[1]), match[2]);
// 		},
// 	})
// 	.addParser({
// 		name: 'plus',
// 		template: '^([+-]) ?([\\d.]+) ?(_UNIT_)s?$',
// 		handler: function (match) {
// 			var mult = match[1] == '-' ? -1 : 1;
// 			return moment().add(mult * parseFloat(match[2]), match[3]);
// 		},
// 	})
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
