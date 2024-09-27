import fs from 'node:fs';
// import parser from '../src/main';
import { Parser, fuzzy } from '../src/main';
import localeList from './localeList';

const parser = new Parser();
parser.addFormat(fuzzy);
const date = new Date(2020, 0, 31, 12, 34, 56, 789);
const results = [`Using date ${date.toJSON()}`];
const today = toMDY(date);
console.log({ today });
const dateStyles = ['full', 'long', 'medium'] as const;
const timeStyles = ['long', 'medium', 'short'] as const;
const dayPeriods = ['narrow', 'short', 'long'] as const;
let i = 0;
let found = 0;
for (const locale of localeList) {
  // if (/^ar|he/.test(locale)) {
  //   // skip right-to-left languages
  //   continue;
  // }
  if (/^ar/.test(locale)) {
    // skip arabic for now
    continue;
  }
  const fmt = new Intl.NumberFormat(locale);
  const numberSystem = fmt.resolvedOptions().numberingSystem;
  for (const dateStyle of dateStyles) {
    testIt(
      locale,
      numberSystem,
      { dateStyle },
      {
        year: 2020,
        month: 1,
        day: 31,
      }
    );
    testIt(
      locale,
      numberSystem,
      { dateStyle, timeStyle: 'long', timeZone: 'UTC' },
      {
        year: 2020,
        month: 1,
        day: 31,
        hour: 12,
        minute: 34,
        second: 56,
      }
    );
    testIt(
      locale,
      numberSystem,
      { dateStyle, timeStyle: 'medium', timeZone: 'UTC' },
      {
        year: 2020,
        month: 1,
        day: 31,
        hour: 12,
        minute: 34,
      }
    );
    testIt(
      locale,
      numberSystem,
      { dateStyle, timeStyle: 'short', timeZone: 'UTC' },
      {
        year: 2020,
        month: 1,
        day: 31,
        hour: 12,
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

function toMDY(d) {
  if (d instanceof Date) {
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
  }
  if (d.year < 100) {
    d.year += 2000;
  }
  return [d.year, pad(d.month), pad(d.day)].join('-');
}

function pad(n) {
  return (n > 9 ? '' : '0') + n;
}

console.log(`Parsed ${found}/${i} dates ok`);
//
// function log(locale, dateString) {
// 	i++;
// 	const result = parser.attempt(dateString, locale);
// 	if (result.invalid) {
// 		// console.log(`${i} [${locale}]  ${dateString} - ${result.invalid}`);
// 	} else {
// 		found++;
// 	}
// }
