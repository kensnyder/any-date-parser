const LocaleHelper = require('../../LocaleHelper/LocaleHelper.js');
const Format = require('../../Format/Format.js');

// lots of 12h time such as "11:59", "11:59pm", "11:59:33 pm", "11:59:33 p.m."
const time12Hours = new Format({
	/* prettier-ignore */
	//           $1                               $2                 $3           $4                 $5
	template: '^(.*?)_SPACE_*(?:at|on|T|)_SPACE_*(_H12_|_H24_)(?:\\:(_MIN_)(?:\\:(_SEC_))?)?_SPACE_*(_MERIDIEM_)$',
	handler: function (matches, locale) {
		let [, dateExpr, hour, minute, second, ampm] = matches;
		let result = {};
		if (dateExpr) {
			result = this.parser.attempt(dateExpr, locale);
			if (result.invalid) {
				// let other matchers have a chance
				return null;
			}
		}
		const tpl = LocaleHelper.factory(locale);
		if (ampm) {
			const offset = tpl.lookups.meridiem[ampm.toLowerCase()] || 0;
			hour = parseFloat(hour);
			if (hour === 12) {
				hour = offset;
			} else if (hour > 12 && offset === 12) {
				hour += 0;
			} else {
				hour += offset;
			}
		}
		result.hour = hour;
		if (minute) {
			result.minute = minute;
		}
		if (second) {
			result.second = second;
		}
		return result;
	},
});

module.exports = time12Hours;
