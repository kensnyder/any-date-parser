// 2-digit years: 1951 through 2050
const twoDigitYears = {};
for (let i = 1; i < 100; i++) {
	const key = (i < 9 ? '0' : '') + i;
	twoDigitYears[key] = i + (i > 51 ? 1900 : 2000);
}

module.exports = twoDigitYears;
