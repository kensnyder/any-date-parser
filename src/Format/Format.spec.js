const Format = require('./Format.js');

describe('Format', () => {
	it('should require units or handler', () => {
		function missingUnitsAndHandler() {
			return new Format({});
		}
		expect(missingUnitsAndHandler).toThrowError();
	});
	it('should require template or matcher', () => {
		function missingTemplateAndRegex() {
			return new Format({ units: [] });
		}
		expect(missingTemplateAndRegex).toThrowError();
	});
	it('should build RegExp from template', () => {
		const format = new Format({ handler: () => {}, template: 'year:_YEAR_' });
		const regex = format.getRegExp();
		expect(regex).toEqual(/year:[1-9]\d{3}|\d{2}/i);
	});
	it('should getMatches()', () => {
		const format = new Format({ handler: () => {}, matcher: /foo:(\d)(\d)/ });
		const matches = [...format.getMatches('foo:42')];
		expect(matches).toEqual(['foo:42', '4', '2']);
	});
	it('should convert numeric matches to Object', () => {
		const format = new Format({
			units: ['year', 'month', 'day'],
			matcher: /./,
		});
		const actual = format.toDateTime([null, '2020', '10', '13']);
		expect(actual).toEqual({ year: 2020, month: 10, day: 13 });
	});
	it('should convert monthname matches to Object', () => {
		const format = new Format({
			units: ['year', 'month', 'day'],
			matcher: /./,
		});
		const actual = format.toDateTime([null, '2020', 'oct', '13']);
		expect(actual).toEqual({ year: 2020, month: 10, day: 13 });
	});
	it('should convert 2-digit years', () => {
		const format = new Format({
			units: ['year', 'month', 'day', 'minute'],
			matcher: /./,
		});
		const actual = format.toDateTime([null, '20', 'october', '13', '59']);
		expect(actual).toEqual({ year: 2020, month: 10, day: 13, minute: 59 });
	});
	it('should attempt to parse', () => {
		const format = new Format({
			matcher: /(\d+)m (\d+)s/,
			units: ['minute', 'second'],
		});
		const actual = format.attempt('56m 22s');
		expect(actual).toEqual({ minute: 56, second: 22 });
	});
	it('should trim()', () => {
		const format = new Format({
			matcher: /^(\d+)s (\d+)ms$/,
			units: ['second', 'millisecond'],
		});
		const actual = format.attempt(' 56s 813ms\t');
		expect(actual).toEqual({ second: 56, millisecond: 813 });
	});
	it('should return now()', () => {
		const format = new Format({ units: [], matcher: /./ });
		expect(format.now()).toBeInstanceOf(Date);
	});
});
