const { DateTime } = require('luxon');
const LocalizedTemplate = require('../LocalizedTemplate/LocalizedTemplate.js');
const Format = require('../Format/Format.js');

// lots of 12h time such as "11:59", "11:59pm", "11:59:33 pm", "11:59:33 p.m."
const time12Hours = new Format({
	/* prettier-ignore */
	//              $1     $2           $3           $4           $5
	template: '^(?:(.+) )?(_H12_)(?:\\:(_MIN_)(?:\\:(_SEC_))?)? ?(_AMPM_)$',
	handler: function (matches, locale) {
		let [, dateExpr, hour, minute, second, ampm] = matches;
		let dt;
		if (dateExpr) {
			dt = DateTime.fromAny(dateExpr, locale);
			if (!dt.isValid) {
				return false;
			}
		} else {
			dt = DateTime.local();
		}
		if (!second) {
			second = 0;
		}
		if (!minute) {
			minute = 0;
		}
		const tpl = LocalizedTemplate.factory(locale);
		if (tpl.isEnglish) {
			if (/^p/i.test(ampm)) {
				hour = parseFloat(hour) + 12;
			}
		} else if (ampm && tpl.lookups.meridiem[ampm.toLowerCase()] === 12) {
			hour = parseFloat(hour) + 12;
		}
		return DateTime.fromObject({
			year: dt.year,
			month: dt.month,
			day: dt.day,
			hour,
			minute,
			second,
		});
	},
});

module.exports = time12Hours;
