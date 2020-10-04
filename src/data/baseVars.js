const timezoneNames = require('./timezoneNames.js');

const baseVars = {
	MONTHNAME:
		'january|february|march|april|may|june|july|august|september|october|november|december|jan.?|feb.?|mar.?|apr.?|may.?|jun.?|jul.?|aug.?|sep.?|oct.?|nov.?|dec.?',
	DAYNAME:
		'sunday|monday|tuesday|thursday|friday|saturday|sun.?|mon.?|tue.?|thu.?|fri.?|sat.?',
	ZONE: Object.keys(timezoneNames).join('|'),
	MERIDIEM: '[ap]\\.?m?\\.?',
	UNIT: 'year|month|week|day|hour|minute|second|millisecond',
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
	MS: '\\d{3}|\\d{6}|\\d{9}',
};

module.exports = baseVars;
