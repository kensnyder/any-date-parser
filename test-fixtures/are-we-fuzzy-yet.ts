import fs from 'node:fs';
import parser, { MatcherResult } from '../src/main';
import localeList from './localeList';

const date = new Date(2020, 0, 31, 1, 31, 20, 789);
const results = [`Using date ${date.toJSON()}`];
const dateStyles = ['full', 'long', 'medium'] as const;
let i = 0;
let found = 0;
for (const locale of localeList) {
  const ymd = {
    year: 2020,
    month: 1,
    day: 31,
  };
  for (const dateStyle of dateStyles) {
    testIt(locale, { dateStyle }, ymd);
    testIt(
      locale,
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
      { dateStyle, timeStyle: 'medium', timeZone: 'UTC' },
      {
        ...ymd,
        hour: 1,
        minute: 31,
      }
    );
    testIt(
      locale,
      { dateStyle, timeStyle: 'short', timeZone: 'UTC' },
      {
        ...ymd,
        hour: 1,
      }
    );
  }
}

fs.writeFileSync(
  `${__dirname}/dates.json`,
  JSON.stringify(results, null, 4),
  'utf-8'
);

function testIt(
  locale: string,
  options: Intl.DateTimeFormatOptions,
  expected: Partial<MatcherResult>
) {
  i++;
  const formatter = new Intl.DateTimeFormat(locale, options);
  const { numberingSystem, calendar } = formatter.resolvedOptions();
  const formatted = formatter.format(date);
  const parsed = parser.attempt(formatted, locale);
  const ok = doesOverlap(parsed, expected);
  found += ok ? 1 : 0;
  results.push(
    [
      ok ? '✅' : '❌',
      numberingSystem,
      calendar,
      locale,
      formatted,
      JSON.stringify(parsed),
    ].join(' > ')
  );
}

function doesOverlap(
  actual: Partial<MatcherResult>,
  expected: Partial<MatcherResult>
) {
  for (const [key, value] of Object.entries(expected)) {
    if (actual[key] !== value) {
      return false;
    }
  }
  return true;
}

console.log(`Parsed ${found}/${i} dates ok`);
