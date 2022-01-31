const fromString = require('./fromString.js');

describe('fromString', () => {
	it('should return invalid dates', () => {
		const invalid = { invalid: 'foo' };
		const parser = { attempt: jest.fn(() => invalid) };
		const fromFn = fromString(parser);
		expect(fromFn()).toBe(invalid);
	});
	it('should default to Jan 1', () => {
		const result = { year: 2020 };
		const parser = { attempt: jest.fn(() => result) };
		const fromFn = fromString(parser);
		const jan1 = new Date(Date.UTC(2020, 0, 1, 0, 0, 0, 0));
		expect(fromFn()).toEqual(jan1);
	});
	it('should default to 1st of month', () => {
		const result = { year: 2020, month: 5 };
		const parser = { attempt: jest.fn(() => result) };
		const fromFn = fromString(parser);
		const may1 = new Date(Date.UTC(2020, 4, 1, 0, 0, 0, 0));
		expect(fromFn()).toEqual(may1);
	});
	it('should reset all but day', () => {
		const result = { year: 2020, month: 4, day: 15 };
		const parser = { attempt: jest.fn(() => result) };
		const fromFn = fromString(parser);
		const apr15 = new Date(Date.UTC(2020, 3, 15, 0, 0, 0, 0));
		expect(fromFn()).toEqual(apr15);
	});
	it('should reset all but hour', () => {
		const result = { year: 2020, month: 2, day: 28, hour: 23 };
		const parser = { attempt: jest.fn(() => result) };
		const fromFn = fromString(parser);
		const feb28 = new Date(Date.UTC(2020, 1, 28, 23, 0, 0, 0));
		expect(fromFn()).toEqual(feb28);
	});
	it('should reset all but minute', () => {
		const result = { year: 2020, month: 12, day: 4, hour: 23, minute: 14 };
		const parser = { attempt: jest.fn(() => result) };
		const fromFn = fromString(parser);
		const dec4 = new Date(Date.UTC(2020, 11, 4, 23, 14, 0, 0));
		expect(fromFn()).toEqual(dec4);
	});
	it('should reset all but second', () => {
		const result = {
			year: 2020,
			month: 9,
			day: 8,
			hour: 23,
			minute: 14,
			second: 59,
		};
		const parser = { attempt: jest.fn(() => result) };
		const fromFn = fromString(parser);
		const sep8 = new Date(Date.UTC(2020, 8, 8, 23, 14, 59, 0));
		expect(fromFn()).toEqual(sep8);
	});
	it('should reset all but millisecond', () => {
		const result = {
			year: 2020,
			month: 7,
			day: 4,
			hour: 23,
			minute: 14,
			second: 59,
			millisecond: 101,
		};
		const parser = { attempt: jest.fn(() => result) };
		const fromFn = fromString(parser);
		const jul4 = new Date(Date.UTC(2020, 6, 4, 23, 14, 59, 101));
		expect(fromFn()).toEqual(jul4);
	});
	it('should handle negative offset', () => {
		const result = {
			year: 2020,
			month: 6,
			day: 9,
			hour: 19,
			minute: 14,
			second: 59,
			millisecond: 101,
			offset: -60,
		};
		const parser = { attempt: jest.fn(() => result) };
		const fromFn = fromString(parser);
		const jun6 = new Date(Date.UTC(2020, 5, 9, 20, 14, 59, 101));
		expect(fromFn()).toEqual(jun6);
	});
	it('should handle positive offset', () => {
		const result = {
			year: 2020,
			month: 10,
			day: 31,
			hour: 20,
			minute: 59,
			second: 59,
			millisecond: 101,
			offset: 45,
		};
		const parser = { attempt: jest.fn(() => result) };
		const fromFn = fromString(parser);
		const oct31 = new Date(Date.UTC(2020, 9, 31, 20, 14, 59, 101));
		expect(fromFn()).toEqual(oct31);
	});
});
