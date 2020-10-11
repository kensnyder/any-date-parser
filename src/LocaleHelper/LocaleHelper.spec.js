const LocaleHelper = require('./LocaleHelper.js');

describe('LocaleHelper', () => {
	it('should use singleton pattern', () => {
		const l1 = LocaleHelper.factory('en');
		const l2 = LocaleHelper.factory('en');
		expect(l1).toBe(l2);
	});
	it('should use singleton pattern (case insensitive)', () => {
		const l1 = LocaleHelper.factory('en');
		const l2 = LocaleHelper.factory('En');
		expect(l1).toBe(l2);
	});
	it('should store locale name', () => {
		const l = new LocaleHelper('en-GB');
		expect(l.locale).toBe('en-GB');
	});
	it('should store isEnglish', () => {
		const l = new LocaleHelper('en-GB');
		expect(l.isEnglish).toBe(true);
		const l2 = new LocaleHelper('zh');
		expect(l2.isEnglish).toBe(false);
	});
	it('should cast digit string to number (latn)', () => {
		const l = new LocaleHelper('en');
		expect(l.toInt('314')).toBe(314);
	});
	it('should cast digit string to number (fullwide)', () => {
		const l = new LocaleHelper('zh-u-nu-fullwide');
		expect(l.toInt('３１４')).toBe(314);
	});
	it('should cast digit string to number (hanidec)', () => {
		const l = new LocaleHelper('zh-u-nu-hanidec');
		expect(l.toInt('三一四')).toBe(314);
	});
	it('should build objects from numbers', () => {
		const l = new LocaleHelper('en');
		const units = ['year', 'month', 'offset'];
		const matches = [null, '2020', '10', '+07:30'];
		const expected = { year: 2020, month: 10, offset: 450 };
		expect(l.getObject(units, matches)).toEqual(expected);
	});
	it('should build objects from month name', () => {
		const l = new LocaleHelper('en');
		const units = ['month', 'minute'];
		const matches = [null, 'september', '59'];
		const expected = { month: 9, minute: 59 };
		expect(l.getObject(units, matches)).toEqual(expected);
	});
	it('should build objects from short month name', () => {
		const l = new LocaleHelper('en');
		const units = ['month', 'hour'];
		const matches = [null, 'sep', '23'];
		const expected = { month: 9, hour: 23 };
		expect(l.getObject(units, matches)).toEqual(expected);
	});
	it('should build objects from short month name with period', () => {
		const l = new LocaleHelper('en');
		const units = ['month', 'second'];
		const matches = [null, 'sep.', '00'];
		const expected = { month: 9, second: 0 };
		expect(l.getObject(units, matches)).toEqual(expected);
	});
	it('should build objects from "deva" numbers', () => {
		const l = new LocaleHelper('ar');
		const units = ['year', 'month'];
		const matches = [null, '٢٠١٧', '٦'];
		const expected = { year: 2017, month: 6 };
		expect(l.getObject(units, matches)).toEqual(expected);
	});
});
