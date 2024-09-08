const fromAny = require('./fromAny.js');

describe('fromAny', () => {
	it('should return Date objects as is', () => {
		const spy = jest.fn();
		const fromFn = fromAny(spy);
		const now = new Date();
		expect(fromFn(now)).toBe(now);
		expect(spy).not.toHaveBeenCalled();
	});
	it('should return milliseconds as Date object', () => {
		const spy = jest.fn();
		const fromFn = fromAny(spy);
		const now = new Date();
		const actual = fromFn(now.getTime());
		expect(actual).toBeInstanceOf(Date);
		expect(+actual).toBe(+now);
		expect(spy).not.toHaveBeenCalled();
	});
	it('should otherwise invoke fromString', () => {
		const spy = jest.fn();
		const fromFn = fromAny(spy);
		fromFn('my string', 'en');
		expect(spy).toHaveBeenCalledWith('my string', 'en');
	});
});
