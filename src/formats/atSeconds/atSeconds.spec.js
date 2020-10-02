const parser = require('../../index.js');

describe('atSeconds format', () => {
	it('should handle unix timestamps', () => {
		const actual = parser.attempt('@1601677889');
		const expected = {
			year: 2020,
			month: 10,
			day: 2,
			hour: 22,
			minute: 31,
			second: 29,
		};
		expect(actual).toEqual(expected);
	});
});
