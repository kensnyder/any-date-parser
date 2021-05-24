const { buildDigits } = require('./numberingSystems.js');

describe('unicode numbering systems', () => {
	it('should build "arab"', () => {
		const actual = buildDigits('arab');
		const expected = {
			group: '[٠-٩]',
			lookup: {
				'٠': 0,
				'١': 1,
				'٢': 2,
				'٣': 3,
				'٤': 4,
				'٥': 5,
				'٦': 6,
				'٧': 7,
				'٨': 8,
				'٩': 9,
			},
		};
		expect(actual).toEqual(expected);
	});
	it('should build "arabext"', () => {
		const actual = buildDigits('arabext');
		const expected = {
			group: '[۰-۹]',
			lookup: {
				'۰': 0,
				'۱': 1,
				'۲': 2,
				'۳': 3,
				'۴': 4,
				'۵': 5,
				'۶': 6,
				'۷': 7,
				'۸': 8,
				'۹': 9,
			},
		};
		expect(actual).toEqual(expected);
	});
	it('should build "bali"', () => {
		const actual = buildDigits('bali');
		const expected = {
			group: '[᭐-᭙]',
			lookup: {
				'᭐': 0,
				'᭑': 1,
				'᭒': 2,
				'᭓': 3,
				'᭔': 4,
				'᭕': 5,
				'᭖': 6,
				'᭗': 7,
				'᭘': 8,
				'᭙': 9,
			},
		};
		expect(actual).toEqual(expected);
	});
	it('should build "beng"', () => {
		const actual = buildDigits('beng');
		const expected = {
			group: '[০-৯]',
			lookup: {
				'০': 0,
				'১': 1,
				'২': 2,
				'৩': 3,
				'৪': 4,
				'৫': 5,
				'৬': 6,
				'৭': 7,
				'৮': 8,
				'৯': 9,
			},
		};
		expect(actual).toEqual(expected);
	});
	it('should build "deva"', () => {
		const actual = buildDigits('deva');
		const expected = {
			group: '[०-९]',
			lookup: {
				'०': 0,
				'१': 1,
				'२': 2,
				'३': 3,
				'४': 4,
				'५': 5,
				'६': 6,
				'७': 7,
				'८': 8,
				'९': 9,
			},
		};
		expect(actual).toEqual(expected);
	});
	it('should build "fullwide" and "hanidec"', () => {
		const actual = buildDigits('fullwide');
		const hanidec = buildDigits('hanidec');
		const expected = {
			group: '[０１２３４５６７８９〇一二三四五六七八九\\d]',
			lookup: {
				0: 0,
				1: 1,
				2: 2,
				3: 3,
				4: 4,
				5: 5,
				6: 6,
				7: 7,
				8: 8,
				9: 9,
				'０': 0,
				'１': 1,
				'２': 2,
				'３': 3,
				'４': 4,
				'５': 5,
				'６': 6,
				'７': 7,
				'８': 8,
				'９': 9,
				〇: 0,
				一: 1,
				二: 2,
				三: 3,
				四: 4,
				五: 5,
				六: 6,
				七: 7,
				八: 8,
				九: 9,
			},
		};
		expect(actual).toEqual(expected);
		expect(hanidec).toEqual(expected);
	});
	it('should build "gujr"', () => {
		const actual = buildDigits('gujr');
		const expected = {
			group: '[૦-૯]',
			lookup: {
				'૦': 0,
				'૧': 1,
				'૨': 2,
				'૩': 3,
				'૪': 4,
				'૫': 5,
				'૬': 6,
				'૭': 7,
				'૮': 8,
				'૯': 9,
			},
		};
		expect(actual).toEqual(expected);
	});
	it('should build "khmr"', () => {
		const actual = buildDigits('khmr');
		const expected = {
			group: '[០-៩]',
			lookup: {
				'០': 0,
				'១': 1,
				'២': 2,
				'៣': 3,
				'៤': 4,
				'៥': 5,
				'៦': 6,
				'៧': 7,
				'៨': 8,
				'៩': 9,
			},
		};
		expect(actual).toEqual(expected);
	});
	it('should build "knda"', () => {
		const actual = buildDigits('knda');
		const expected = {
			group: '[೦-೯]',
			lookup: {
				'೦': 0,
				'೧': 1,
				'೨': 2,
				'೩': 3,
				'೪': 4,
				'೫': 5,
				'೬': 6,
				'೭': 7,
				'೮': 8,
				'೯': 9,
			},
		};
		expect(actual).toEqual(expected);
	});
	it('should build "laoo"', () => {
		const actual = buildDigits('laoo');
		const expected = {
			group: '[໐-໙]',
			lookup: {
				'໐': 0,
				'໑': 1,
				'໒': 2,
				'໓': 3,
				'໔': 4,
				'໕': 5,
				'໖': 6,
				'໗': 7,
				'໘': 8,
				'໙': 9,
			},
		};
		expect(actual).toEqual(expected);
	});
	it('should build "latn"', () => {
		const actual = buildDigits('latn');
		const expected = {
			group: '\\d',
			lookup: {
				0: 0,
				1: 1,
				2: 2,
				3: 3,
				4: 4,
				5: 5,
				6: 6,
				7: 7,
				8: 8,
				9: 9,
				'０': 0,
				'１': 1,
				'２': 2,
				'３': 3,
				'４': 4,
				'５': 5,
				'６': 6,
				'７': 7,
				'８': 8,
				'９': 9,
				〇: 0,
				一: 1,
				二: 2,
				三: 3,
				四: 4,
				五: 5,
				六: 6,
				七: 7,
				八: 8,
				九: 9,
			},
		};
		expect(actual).toEqual(expected);
	});
	it('should build "limb"', () => {
		const actual = buildDigits('limb');
		const expected = {
			group: '[᥆-᥏]',
			lookup: {
				'᥆': 0,
				'᥇': 1,
				'᥈': 2,
				'᥉': 3,
				'᥊': 4,
				'᥋': 5,
				'᥌': 6,
				'᥍': 7,
				'᥎': 8,
				'᥏': 9,
			},
		};
		expect(actual).toEqual(expected);
	});
	it('should build "mlym"', () => {
		const actual = buildDigits('mlym');
		const expected = {
			group: '[൦-൯]',
			lookup: {
				'൦': 0,
				'൧': 1,
				'൨': 2,
				'൩': 3,
				'൪': 4,
				'൫': 5,
				'൬': 6,
				'൭': 7,
				'൮': 8,
				'൯': 9,
			},
		};
		expect(actual).toEqual(expected);
	});
	it('should build "mong"', () => {
		const actual = buildDigits('mong');
		const expected = {
			group: '[᠐-᠙]',
			lookup: {
				'᠐': 0,
				'᠑': 1,
				'᠒': 2,
				'᠓': 3,
				'᠔': 4,
				'᠕': 5,
				'᠖': 6,
				'᠗': 7,
				'᠘': 8,
				'᠙': 9,
			},
		};
		expect(actual).toEqual(expected);
	});
	it('should build "mymr"', () => {
		const actual = buildDigits('mymr');
		const expected = {
			group: '[၀-၉]',
			lookup: {
				'၀': 0,
				'၁': 1,
				'၂': 2,
				'၃': 3,
				'၄': 4,
				'၅': 5,
				'၆': 6,
				'၇': 7,
				'၈': 8,
				'၉': 9,
			},
		};
		expect(actual).toEqual(expected);
	});
	it('should build "orya"', () => {
		const actual = buildDigits('orya');
		const expected = {
			group: '[୦-୯]',
			lookup: {
				'୦': 0,
				'୧': 1,
				'୨': 2,
				'୩': 3,
				'୪': 4,
				'୫': 5,
				'୬': 6,
				'୭': 7,
				'୮': 8,
				'୯': 9,
			},
		};
		expect(actual).toEqual(expected);
	});
	it('should build "tamldec"', () => {
		const actual = buildDigits('tamldec');
		const expected = {
			group: '[௦-௯]',
			lookup: {
				'௦': 0,
				'௧': 1,
				'௨': 2,
				'௩': 3,
				'௪': 4,
				'௫': 5,
				'௬': 6,
				'௭': 7,
				'௮': 8,
				'௯': 9,
			},
		};
		expect(actual).toEqual(expected);
	});
	it('should build "telu"', () => {
		const actual = buildDigits('telu');
		const expected = {
			group: '[౦-౯]',
			lookup: {
				'౦': 0,
				'౧': 1,
				'౨': 2,
				'౩': 3,
				'౪': 4,
				'౫': 5,
				'౬': 6,
				'౭': 7,
				'౮': 8,
				'౯': 9,
			},
		};
		expect(actual).toEqual(expected);
	});
	it('should build "thai"', () => {
		const actual = buildDigits('thai');
		const expected = {
			group: '[๐-๙]',
			lookup: {
				'๐': 0,
				'๑': 1,
				'๒': 2,
				'๓': 3,
				'๔': 4,
				'๕': 5,
				'๖': 6,
				'๗': 7,
				'๘': 8,
				'๙': 9,
			},
		};
		expect(actual).toEqual(expected);
	});
	it('should build "tibt"', () => {
		const actual = buildDigits('tibt');
		const expected = {
			group: '[༠-༩]',
			lookup: {
				'༠': 0,
				'༡': 1,
				'༢': 2,
				'༣': 3,
				'༤': 4,
				'༥': 5,
				'༦': 6,
				'༧': 7,
				'༨': 8,
				'༩': 9,
			},
		};
		expect(actual).toEqual(expected);
	});
});
