import { describe, expect, it } from 'vitest';
import parser from '../../../index';
import localeList from '../../../test-fixtures/localeList';
import testDates from '../../../test-fixtures/testDates';

testDates({
  name: 'day monthname year',
  expected: { year: 2020, month: 1, day: 1 },
  // ar and zh do not have a monthname
  locales: localeList.filter(l => !/^ar|zh|he/.test(l)),
  formats: [
    'cccc, dd MMMM yyyy',
    'cccc dd MMMM yyyy',
    'ccc, dd MMMM yyyy',
    'ccc dd MMMM yyyy',
    'dd MMMM yyyy',
    'dd-MMMM-yyyy',
  ],
});

testDates({
  name: 'day short monthname year',
  expected: { year: 2020, month: 1, day: 1 },
  // ar and zh do not have short monthnames
  locales: localeList.filter(l => !/^ar|zh/.test(l)),
  formats: ['d MMM yyyy', 'd-MMM-yyyy'],
});

testDates({
  name: 'day monthname two digit year',
  expected: { year: 2020, month: 1, day: 1 },
  // non-latin numerals can't handle two-digit years
  locales: localeList.filter(l => !/^ar|zh|bn/.test(l)),
  formats: ['dd MMM yy', 'd MMM yy'],
});

testDates({
  name: 'day ordinal monthname year',
  expected: { year: 2018, month: 10, day: 28 },
  locales: ['en'],
  formats: ["dd'th' MMM yy", "d'th' MMM yy", "dd'th'-MMM-yy", "d'th'-MMM-yy"],
});

describe('dayMonthnameYear', () => {
  it('should handle GitHub issue #11', () => {
    function dateAsISO(dateValue) {
      if (!dateValue) {
        return null;
      }

      let date = null;

      // if it's already a date, just use that.
      if (dateValue instanceof Date) {
        date = dateValue;
      } else if (typeof dateValue === 'string') {
        date = parser.fromString(dateValue);
      }

      // when the date is invalid, it will give you a isNaN true
      if (Number.isNaN(date)) {
        return null;
      }

      try {
        return date.toISOString();
      } catch (error) {
        // maybe RangeError
        return null;
      }
    }
    expect(dateAsISO('Fri, 19 Nov 2021 02:07:18 +0000')).toBe(
      '2021-11-19T02:07:18.000Z'
    );
  });
});
