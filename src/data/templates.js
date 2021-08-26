const timezoneNames = require('./timezoneNames.js');

const latn = {
	MONTHNAME:
		'january|february|march|april|may|june|july|august|september|october|november|december|jan\\.?|feb\\.?|mar\\.?|apr\\.?|may\\.?|jun\\.?|jul\\.?|aug\\.?|sep\\.?|oct\\.?|nov\\.?|dec\\.?',
	DAYNAME:
		'sunday|monday|tuesday|wednesday|thursday|friday|saturday|sun\\.?|mon\\.?|tue\\.?|wed\\.?|thu\\.?|fri\\.?|sat\\.?',
	ZONE: '\\(?(' + Object.keys(timezoneNames).join('|') + ')\\)?',
	MERIDIEM: '[ap]\\.?m?\\.?',
	ORDINAL: 'st|nd|rd|th|\\.',
	YEAR: '[1-9]\\d{3}|\\d{2}',
	MONTH: '1[0-2]|0?[1-9]',
	MONTH2: '1[0-2]|0[1-9]',
	DAY: '3[01]|[12]\\d|0?[1-9]',
	DAY2: '3[01]|[12]\\d|0[1-9]',
	OFFSET: '[+-][01]?\\d?\\:?(?:[0-5]\\d)?',
	H24: '[01]\\d|2[0-3]',
	H12: '0?[1-9]|1[012]',
	MIN: '[0-5]\\d',
	SEC: '[0-5]\\d|60',
	MS: '\\d{9}|\\d{6}|\\d{1,3}',
	SPACE: '[\\s,-]',
};

const other = {
	...latn,
	YEAR: '*{4}|*{2}',
	MONTH: '*{1,2}',
	MONTH2: '*{2}',
	DAY: '*{1,2}',
	DAY2: '*{2}',
	OFFSET: '[+-]*{1,2}\\:?*{0,2}',
	H24: '*{2}',
	H12: '*{1,2}',
	MIN: '*{2}',
	SEC: '*{2}',
	MS: '*{9}|*{6}|*{3}',
};

module.exports = { latn, other };
