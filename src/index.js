// import our Parser
const Parser = require('./Parser/Parser.js');
// import our formats
const ago = require('./formats/ago.js');
const atSeconds = require('./formats/atSeconds/atSeconds.js');
const chinese = require('./formats/chinese.js');
const dayMonth = require('./formats/dayMonth.js');
const dayMonthname = require('./formats/dayMonthname.js');
const dayMonthnameYear = require('./formats/dayMonthnameYear.js');
const dayMonthYear = require('./formats/dayMonthYear.js');
const defaultLocale = require('./defaultLocale/defaultLocale.js');
const monthDay = require('./formats/monthDay.js');
const monthDayYear = require('./formats/monthDayYear.js');
const monthnameDay = require('./formats/monthnameDay.js');
const monthnameDayYear = require('./formats/monthnameDayYear.js');
const time12Hours = require('./formats/time12Hours.js');
const time24Hours = require('./formats/time24Hours.js');
const today = require('./formats/today.js');
const twitter = require('./formats/twitter.js');
const yearMonthDay = require('./formats/yearMonthDay.js');
// /Date(1198908717056-0700)/
// /Date(1234656000000)/

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
	.addFormat(atSeconds);

module.exports = parser;
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
