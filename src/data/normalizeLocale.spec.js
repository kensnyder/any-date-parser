const normalizeLocale = require('./normalizeLocale.js');

describe('normalizeLocale', () => {
	it('should ignore .UTF-8', () => {
		const normalized = normalizeLocale('en-US.UTF-8');
		expect(normalized).toEqual('en-US');
	});
	it('should ignore .utf-8', () => {
		const normalized = normalizeLocale('en-US.utf-8');
		expect(normalized).toEqual('en-US');
	});
	it('should ignore :utf-8', () => {
		const normalized = normalizeLocale('en-US:utf-8');
		expect(normalized).toEqual('en-US');
	});
	it('should convert underscores', () => {
		const normalized = normalizeLocale('en_US');
		expect(normalized).toEqual('en-US');
	});
	it('should fall back to en-US on invalid locales', () => {
		const normalized = normalizeLocale('foobar 9000');
		expect(normalized).toEqual('en-US');
	});
});
