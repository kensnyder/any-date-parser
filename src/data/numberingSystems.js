const startCodes = {
	arab: 1632,
	arabext: 1776,
	bali: 6992,
	beng: 2534,
	deva: 2406,
	fullwide: 65296,
	gujr: 2790,
	khmr: 6112,
	knda: 3302,
	laoo: 3792,
	limb: 6470,
	mlym: 3430,
	mong: 6160,
	mymr: 4160,
	orya: 2918,
	tamldec: 3046,
	telu: 3174,
	thai: 3664,
	tibt: 3872,
};

const chineseGroup = '[\uFF10-\uFF19〇一二三四五六七八九\\d]';
const chineseLookup = {
	0: '0',
	1: '1',
	2: '2',
	3: '3',
	4: '4',
	5: '5',
	6: '6',
	7: '7',
	8: '8',
	9: '9',
	'\uFF10': '0',
	'\uFF11': '1',
	'\uFF12': '2',
	'\uFF13': '3',
	'\uFF14': '4',
	'\uFF15': '5',
	'\uFF16': '6',
	'\uFF17': '7',
	'\uFF18': '8',
	'\uFF19': '9',
	〇: '0',
	一: '1',
	二: '2',
	三: '3',
	四: '4',
	五: '5',
	六: '6',
	七: '7',
	八: '8',
	九: '9',
};

const cache = {};

function buildDigits(nsName) {
	if (nsName === 'fullwide' || nsName === 'hanidec') {
		return { group: chineseGroup, lookup: chineseLookup };
	}
	const startCode = startCodes[nsName];
	if (!startCode) {
		return { group: '\\d', lookup: {} };
	}
	const start = String.fromCharCode(startCode);
	const end = String.fromCharCode(startCode + 10);
	const lookup = {};
	for (let i = 0; i < 10; i++) {
		lookup[String.fromCharCode(startCode + i)] = i;
	}
	return {
		group: `[${start}-${end}]`,
		lookup,
	};
}

module.exports = buildDigits;
