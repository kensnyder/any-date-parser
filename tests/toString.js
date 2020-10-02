const formatString = '{year} {month.digits} {day.digits}';
const formatString = '{year} {long.month} {day.digits}';
function toString(locale, date, formatString) {
	const d = new Intl.DateTimeFormat(locale, {});
}
