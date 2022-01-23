const fs = require('fs');
const localeList = require('./localeList.js');
const parser = require('../index.js');

const date = new Date();
const results = [date.toJSON()];
const today = toMDY(date);
console.log({ today });
const dateStyles = ['full', 'long', 'medium', 'short'];
const timeStyles = ['full', 'long', 'medium', 'short'];
const dayPeriods = ['narrow', 'short', 'long'];
let i = 0;
let found = 0;
for (const locale of localeList) {
	const fmt = new Intl.NumberFormat(locale);
	const numberSystem = fmt.resolvedOptions().numberingSystem;
	for (const dateStyle of dateStyles) {
		// for (const timeStyle of timeStyles) {
		for (const dayPeriod of dayPeriods) {
			const options = {
				dateStyle,
				// timeStyle,
				// dayPeriod,
			};
			i++;
			const res = new Intl.DateTimeFormat(locale, options).format(date);
			const parsed = parser.attempt(res, locale);
			const ok = toMDY(parsed) === today;
			found += ok ? 1 : 0;
			results.push(
				[
					ok ? '✅' : '❌',
					// `(${toMDY(parsed)} === ${today})`,
					numberSystem,
					locale,
					dateStyle,
					/*timeStyle,*/ dayPeriod,
					res,
				].join(' > ')
			);
		}
		// }
	}
}

fs.writeFileSync(
	`${__dirname}/dates.json`,
	JSON.stringify(results, null, 4),
	'utf-8'
);

function toMDY(d) {
	if (d instanceof Date) {
		return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
	}
	return [d.year, pad(d.month), pad(d.day)].join('-');
}

function pad(n) {
	return (n > 9 ? '' : '0') + n;
}

console.log(`Parsed ${found}/${i} dates ok`);
//
// function log(locale, dateString) {
// 	i++;
// 	const result = parser.attempt(dateString, locale);
// 	if (result.invalid) {
// 		// console.log(`${i} [${locale}]  ${dateString} - ${result.invalid}`);
// 	} else {
// 		found++;
// 	}
// }
