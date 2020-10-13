const testDates = require('../../../test-fixtures/testDates.js');
const parser = require('../../../index.js');

// latn digits
testDates({
	name: 'chinese',
	expected: { year: 2020, month: 9, day: 26 },
	locales: ['en-US'],
	formats: ['yyyy年MM月dd日', 'yyyy年M月d日', 'yyyy 年 M 月 d 日'],
});

// fullwide digits
// ０１２３４５６７８９
describe('chinese with full-width digits', () => {
	it('should handle date', () => {
		const actual = parser.attempt('２０１７年０８月３１日');
		const expected = { year: 2017, month: 8, day: 31 };
		expect(actual).toEqual(expected);
	});
});

// hanidec digits
// 〇一二三四五六七八九
describe('chinese with full-width digits', () => {
	it('should handle date', () => {
		const actual = parser.attempt('二〇一七年〇八月三一日');
		const expected = { year: 2017, month: 8, day: 31 };
		expect(actual).toEqual(expected);
	});
});
