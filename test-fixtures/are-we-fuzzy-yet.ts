import fs from 'node:fs';
// import parser from '../src/main';
import { Parser, fuzzy } from '../src/main';
import localeList from './localeList';

const parser = new Parser();
parser.addFormat(fuzzy);
const date = new Date(2020, 0, 31, 1, 31, 20, 789);
const results = [`Using date ${date.toJSON()}`];
const today = toMDY(date);
console.log({ today });
const dateStyles = ['full', 'long', 'medium'] as const;
let i = 0;
let found = 0;
for (const locale of localeList) {
  const ymd = /^ar/.test(locale)
    ? // hijri calendar
      {
        year: 1441,
        month: 3,
        day: 6,
      }
    : // gregorian calendar
      {
        year: 2020,
        month: 1,
        day: 31,
      };
  const fmt = new Intl.NumberFormat(locale);
  const numberSystem = fmt.resolvedOptions().numberingSystem;
  for (const dateStyle of dateStyles) {
    testIt(locale, numberSystem, { dateStyle }, ymd);
    testIt(
      locale,
      numberSystem,
      { dateStyle, timeStyle: 'long', timeZone: 'UTC' },
      {
        ...ymd,
        hour: 1,
        minute: 31,
        second: 20,
      }
    );
    testIt(
      locale,
      numberSystem,
      { dateStyle, timeStyle: 'medium', timeZone: 'UTC' },
      {
        ...ymd,
        hour: 1,
        minute: 31,
      }
    );
    testIt(
      locale,
      numberSystem,
      { dateStyle, timeStyle: 'short', timeZone: 'UTC' },
      {
        ...ymd,
        hour: 1,
      }
    );
  }
  // for (const dayPeriod of dayPeriods) {
  //   testIt(locale, numberSystem, { dayPeriod });
  // }
}

fs.writeFileSync(
  `${__dirname}/dates.json`,
  JSON.stringify(results, null, 4),
  'utf-8'
);

function testIt(locale: string, numberSystem: string, options, expected) {
  i++;
  const formatted = new Intl.DateTimeFormat(locale, options).format(date);
  const parsed = parser.attempt(formatted, locale);
  const ok = doesOverlap(parsed, expected);
  found += ok ? 1 : 0;
  results.push(
    [
      ok ? '✅' : '❌',
      numberSystem,
      locale,
      formatted,
      JSON.stringify(parsed),
    ].join(' > ')
  );
}

function doesOverlap(
  actual: Record<string, any>,
  expected: Record<string, any>
) {
  for (const [key, value] of Object.entries(expected)) {
    if (actual[key] !== value) {
      return false;
    }
  }
  return true;
}

function toMDY(d: Date | { year: number; month: number; day: number }) {
  if (d instanceof Date) {
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
  }
  if (d.year < 100) {
    d.year += 2000;
  }
  return [d.year, pad(d.month), pad(d.day)].join('-');
}

function pad(n: number) {
  return (n > 9 ? '' : '0') + n;
}

console.log(`Parsed ${found}/${i} dates ok`);
