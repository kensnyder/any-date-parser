const { DateTime, FixedOffsetZone } = require('luxon');
const LocalizedTemplate = require('../LocalizedTemplate/LocalizedTemplate.js');
const Format = require('../Format/Format.js');

// lots of 24h time such as "23:59", "T23:59:59+0700", "23:59:59 GMT-05:00", "23:59:59 CST", "T23:59:59Z"
const time24Hours = new Format({
	/* prettier-ignore */
	//              $1         $2        $3           $4              $5                   $6            $7
	template: '^(?:(.+?)[ T])?(_H24_)\\:(_MIN_)(?:\\:(_SEC_)(?:[\\.,](_MS_))?)? ?(?:GMT)? ?(_OFFSET_)? ?(_ZONE_)?$',
	handler: function (matches, locale) {
		let [, dateExpr, hour, minute, second, millisecond, offset, zone] = matches;
		let dt;
		if (dateExpr) {
			dt = DateTime.fromAny(dateExpr, locale);
			if (!dt.isValid) {
				return false;
			}
		} else {
			dt = DateTime.local();
		}
		if (zone && !offset) {
			const tpl = LocalizedTemplate.factory(locale);
			offset = tpl.vars.ZONE[zone];
			if (offset) {
				zone = FixedOffsetZone.instance(offset);
			} else {
				zone = 'local';
			}
		} else if (offset) {
			const tpl = LocalizedTemplate.factory(locale);
			zone = tpl.offsetToZone(offset);
		} else {
			zone = 'local';
		}
		if (millisecond && millisecond.length > 3) {
			millisecond = millisecond.slice(0, 3);
		}
		if (!second) {
			second = 0;
		}
		if (!millisecond) {
			millisecond = 0;
		}
		return DateTime.fromObject({
			year: dt.year,
			month: dt.month,
			day: dt.day,
			hour,
			minute,
			second,
			millisecond,
			zone,
		});
	},
});

module.exports = time24Hours;
