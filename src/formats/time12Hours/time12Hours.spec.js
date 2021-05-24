const parser = require('../../../index.js');

describe('12 hour time', () => {
	it('should handle hours: "8pm"', () => {
		const actual = parser.attempt('8pm');
		const expected = {
			hour: 20,
		};
		expect(actual).toMatchObject(expected);
	});
	it('should handle invalid date: "Foobarbaz at 8pm"', () => {
		const actual = parser.attempt('Foobarbaz at 8pm');
		expect(actual.invalid).toBe('Unable to parse Foobarbaz at 8pm');
	});
	it('should handle dots in "a.m.": "4 a.m."', () => {
		const actual = parser.attempt('4 a.m.');
		const expected = {
			hour: 4,
		};
		expect(actual).toMatchObject(expected);
	});
	it('should handle minutes: "8:15pm"', () => {
		const actual = parser.attempt('8:15pm');
		const expected = {
			hour: 20,
			minute: 15,
		};
		expect(actual).toMatchObject(expected);
	});
	it('should handle seconds: "8:15:14am"', () => {
		const actual = parser.attempt('8:15:14am');
		const expected = {
			hour: 8,
			minute: 15,
			second: 14,
		};
		expect(actual).toMatchObject(expected);
	});
	it('should handle leap seconds: "11:59:60pm"', () => {
		const actual = parser.attempt('11:59:60pm');
		const expected = {
			hour: 23,
			minute: 59,
			second: 60,
		};
		expect(actual).toMatchObject(expected);
	});
	it('should handle dates: "March 14, 2015 9:26pm"', () => {
		const actual = parser.attempt('March 14, 2015 9:26pm');
		const expected = {
			year: 2015,
			month: 3,
			day: 14,
			hour: 21,
			minute: 26,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle dates joined with "at": "March 14, 2015 at 9:26:53 am"', () => {
		const actual = parser.attempt('March 14, 2015 at 9:26:53 am');
		const expected = {
			year: 2015,
			month: 3,
			day: 14,
			hour: 9,
			minute: 26,
			second: 53,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle dates with commas: "4/19/2021, 10:04:02 AM"', () => {
		const actual = parser.attempt('4/19/2021, 10:04:02 AM');
		const expected = {
			year: 2021,
			month: 4,
			day: 19,
			hour: 10,
			minute: 4,
			second: 2,
		};
		expect(actual).toEqual(expected);
	});
});
