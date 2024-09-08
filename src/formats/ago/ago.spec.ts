const parser = require('../../../index.js');
const Format = require('../../Format/Format.js');

describe('(amount) (unit) ago', () => {
	beforeAll(() => {
		Format.prototype.now = () =>
			new Date(Date.UTC(2020, 2 /* march */, 1, 15, 16, 0, 200));
	});
	it('should handle "8 years ago"', () => {
		const actual = parser.attempt('8 years ago');
		const expected = {
			year: 2012,
			month: 3,
			day: 1,
			hour: 15,
			minute: 16,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "7 months ago"', () => {
		const actual = parser.attempt('7 months ago');
		const expected = {
			year: 2019,
			month: 8,
			day: 1,
			hour: 15,
			minute: 16,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "2 weeks"', () => {
		const actual = parser.attempt('2 weeks ago');
		const expected = {
			year: 2020,
			month: 2,
			day: 16,
			hour: 15,
			minute: 16,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "2 days ago"', () => {
		const actual = parser.attempt('2 days ago');
		const expected = {
			year: 2020,
			month: 2,
			day: 28,
			hour: 15,
			minute: 16,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "18 hours ago"', () => {
		const actual = parser.attempt('18 hours ago');
		const expected = {
			year: 2020,
			month: 2,
			day: 29,
			hour: 21,
			minute: 16,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "1 minute ago"', () => {
		const actual = parser.attempt('1 minute ago');
		const expected = {
			year: 2020,
			month: 3,
			day: 1,
			hour: 15,
			minute: 15,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "30 seconds ago"', () => {
		const actual = parser.attempt('30 seconds ago');
		const expected = {
			year: 2020,
			month: 3,
			day: 1,
			hour: 15,
			minute: 15,
			second: 30,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "199 milliseconds ago"', () => {
		const actual = parser.attempt('199 milliseconds ago');
		const expected = {
			year: 2020,
			month: 3,
			day: 1,
			hour: 15,
			minute: 16,
			second: 0,
			millisecond: 1,
		};
		expect(actual).toEqual(expected);
	});
});

describe('-(amount) (unit)', () => {
	beforeAll(() => {
		Format.prototype.now = () =>
			new Date(Date.UTC(2020, 2 /* march */, 1, 15, 16, 0, 200));
	});
	it('should handle "-8 years"', () => {
		const actual = parser.attempt('-8 years');
		const expected = {
			year: 2012,
			month: 3,
			day: 1,
			hour: 15,
			minute: 16,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "-7 months"', () => {
		const actual = parser.attempt('-7 months');
		const expected = {
			year: 2019,
			month: 8,
			day: 1,
			hour: 15,
			minute: 16,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "-2 days"', () => {
		const actual = parser.attempt('-2 days');
		const expected = {
			year: 2020,
			month: 2,
			day: 28,
			hour: 15,
			minute: 16,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "-2 weeks"', () => {
		const actual = parser.attempt('-2 weeks');
		const expected = {
			year: 2020,
			month: 2,
			day: 16,
			hour: 15,
			minute: 16,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "-18 hours"', () => {
		const actual = parser.attempt('-18 hours');
		const expected = {
			year: 2020,
			month: 2,
			day: 29,
			hour: 21,
			minute: 16,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "-1 minute"', () => {
		const actual = parser.attempt('-1 minute');
		const expected = {
			year: 2020,
			month: 3,
			day: 1,
			hour: 15,
			minute: 15,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "-30 seconds"', () => {
		const actual = parser.attempt('-30 seconds');
		const expected = {
			year: 2020,
			month: 3,
			day: 1,
			hour: 15,
			minute: 15,
			second: 30,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "-199 milliseconds"', () => {
		const actual = parser.attempt('-199 milliseconds');
		const expected = {
			year: 2020,
			month: 3,
			day: 1,
			hour: 15,
			minute: 16,
			second: 0,
			millisecond: 1,
		};
		expect(actual).toEqual(expected);
	});
});

describe('in (amount) (unit)', () => {
	beforeAll(() => {
		Format.prototype.now = () =>
			new Date(Date.UTC(2020, 2 /* march */, 1, 15, 16, 0, 200));
	});
	it('should handle "in 8 years"', () => {
		const actual = parser.attempt('in 8 years');
		const expected = {
			year: 2028,
			month: 3,
			day: 1,
			hour: 15,
			minute: 16,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "in 17 months"', () => {
		const actual = parser.attempt('in 17 months');
		const expected = {
			year: 2021,
			month: 8,
			day: 1,
			hour: 15,
			minute: 16,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "in 1 week"', () => {
		const actual = parser.attempt('in 1 week');
		const expected = {
			year: 2020,
			month: 3,
			day: 8,
			hour: 15,
			minute: 16,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "in 2 days"', () => {
		const actual = parser.attempt('in 2 days');
		const expected = {
			year: 2020,
			month: 3,
			day: 3,
			hour: 15,
			minute: 16,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "in 18 hours"', () => {
		const actual = parser.attempt('in 18 hours');
		const expected = {
			year: 2020,
			month: 3,
			day: 2,
			hour: 9,
			minute: 16,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "in 1 minute"', () => {
		const actual = parser.attempt('in 1 minute');
		const expected = {
			year: 2020,
			month: 3,
			day: 1,
			hour: 15,
			minute: 17,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "in 30 seconds"', () => {
		const actual = parser.attempt('in 30 seconds');
		const expected = {
			year: 2020,
			month: 3,
			day: 1,
			hour: 15,
			minute: 16,
			second: 30,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "in 199 milliseconds"', () => {
		const actual = parser.attempt('in 199 milliseconds');
		const expected = {
			year: 2020,
			month: 3,
			day: 1,
			hour: 15,
			minute: 16,
			second: 0,
			millisecond: 399,
		};
		expect(actual).toEqual(expected);
	});
});

describe('+(amount) (unit)', () => {
	beforeAll(() => {
		Format.prototype.now = () =>
			new Date(Date.UTC(2020, 2 /* march */, 1, 15, 16, 0, 200));
	});
	it('should handle "+8 years"', () => {
		const actual = parser.attempt('+8 years');
		const expected = {
			year: 2028,
			month: 3,
			day: 1,
			hour: 15,
			minute: 16,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "+17 months"', () => {
		const actual = parser.attempt('+17 months');
		const expected = {
			year: 2021,
			month: 8,
			day: 1,
			hour: 15,
			minute: 16,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "+2 weeks"', () => {
		const actual = parser.attempt('+2 weeks');
		const expected = {
			year: 2020,
			month: 3,
			day: 15,
			hour: 15,
			minute: 16,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "+2 days"', () => {
		const actual = parser.attempt('+2 days');
		const expected = {
			year: 2020,
			month: 3,
			day: 3,
			hour: 15,
			minute: 16,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "+18 hours"', () => {
		const actual = parser.attempt('+18 hours');
		const expected = {
			year: 2020,
			month: 3,
			day: 2,
			hour: 9,
			minute: 16,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "+1 minute"', () => {
		const actual = parser.attempt('+1 minute');
		const expected = {
			year: 2020,
			month: 3,
			day: 1,
			hour: 15,
			minute: 17,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "+30 seconds"', () => {
		const actual = parser.attempt('+30 seconds');
		const expected = {
			year: 2020,
			month: 3,
			day: 1,
			hour: 15,
			minute: 16,
			second: 30,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "+199 milliseconds"', () => {
		const actual = parser.attempt('+199 milliseconds');
		const expected = {
			year: 2020,
			month: 3,
			day: 1,
			hour: 15,
			minute: 16,
			second: 0,
			millisecond: 399,
		};
		expect(actual).toEqual(expected);
	});
});

describe('+(amount)(short unit)', () => {
	beforeAll(() => {
		Format.prototype.now = () =>
			new Date(Date.UTC(2020, 2 /* march */, 1, 15, 16, 0, 200));
	});
	it('should handle "+8y"', () => {
		const actual = parser.attempt('+8y');
		const expected = {
			year: 2028,
			month: 3,
			day: 1,
			hour: 15,
			minute: 16,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "+17M"', () => {
		const actual = parser.attempt('+17M');
		const expected = {
			year: 2021,
			month: 8,
			day: 1,
			hour: 15,
			minute: 16,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "+2w"', () => {
		const actual = parser.attempt('+2w');
		const expected = {
			year: 2020,
			month: 3,
			day: 15,
			hour: 15,
			minute: 16,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "+2d"', () => {
		const actual = parser.attempt('+2d');
		const expected = {
			year: 2020,
			month: 3,
			day: 3,
			hour: 15,
			minute: 16,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "+18h"', () => {
		const actual = parser.attempt('+18h');
		const expected = {
			year: 2020,
			month: 3,
			day: 2,
			hour: 9,
			minute: 16,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "+1m"', () => {
		const actual = parser.attempt('+1m');
		const expected = {
			year: 2020,
			month: 3,
			day: 1,
			hour: 15,
			minute: 17,
			second: 0,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "+30s"', () => {
		const actual = parser.attempt('+30s');
		const expected = {
			year: 2020,
			month: 3,
			day: 1,
			hour: 15,
			minute: 16,
			second: 30,
			millisecond: 200,
		};
		expect(actual).toEqual(expected);
	});
	it('should handle "+199ms"', () => {
		const actual = parser.attempt('+199ms');
		const expected = {
			year: 2020,
			month: 3,
			day: 1,
			hour: 15,
			minute: 16,
			second: 0,
			millisecond: 399,
		};
		expect(actual).toEqual(expected);
	});
});
