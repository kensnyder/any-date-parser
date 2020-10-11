const parser = require('../../../index.js');

describe('twitter time', () => {
	it('should handle "Fri Apr 09 12:53:54 +0000 2010"', () => {
		const actual = parser.attempt('Fri Apr 09 12:53:54 +0000 2010');
		const expected = {
			month: 4,
			day: 9,
			hour: 12,
			minute: 53,
			second: 54,
			year: 2010,
			offset: 0,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "Fri Apr 16 22:53:54 -0130 2017"', () => {
		const actual = parser.attempt('Fri Apr 16 22:53:54 -0130 2017');
		const expected = {
			month: 4,
			day: 16,
			hour: 22,
			minute: 53,
			second: 54,
			year: 2017,
			offset: -90,
		};
		expect(actual).toEqual(expected);
	});
});
