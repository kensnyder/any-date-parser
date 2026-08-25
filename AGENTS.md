# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`any-date-parser` — zero-dependency TypeScript library that parses a wide range of date strings
(including human input and locale-specific formats) using `Intl` to derive locale data at runtime.
Ships ESM, CJS, a minified browser bundle, and bundled `.d.ts`.

## Commands

```bash
npm test                                   # vitest watch-less run via ./scripts/test.sh run
npm run test-watch                         # vitest watch mode
npm run coverage                           # tests + v8 coverage; npm run view-coverage to open
npm run build                              # clean + dts + esm + cjs + minified browser bundle
npm run demo                               # build, then serve index.html on :5050
npm run are-we-fuzzy-yet                   # bun script: parse-rate report across all locales
npm run lint                               # biome check (format + lint + import order)
npm run format                             # biome check --write
bun scripts/parse.ts "15 Oct 2020"         # ad-hoc: print attempt() output for one string (no npm script)
```

Run a single test file or test name (all args pass through to vitest):

```bash
./scripts/test.sh run src/patterns/fuzzy.spec.ts
./scripts/test.sh run -t "should handle \"8 years ago\""
```

**Always go through `./scripts/test.sh`, not bare `npx vitest`.** The script sets `TZ=UTC`,
points `NODE_ICU_DATA` at a global `full-icu` install, and puts global `node_modules` on
`NODE_PATH` so specs can `import 'luxon'`. It will `npm install -g full-icu luxon@3` if they're
missing. Without full ICU, the ~2400 locale tests silently compare against the wrong locale data.

Formatting and linting are both Biome (`biome.json`, single quotes, 80 cols, import organizing).
`npm run lint` reports; `npm run format` writes fixes. `test-fixtures/dates.json` is excluded because
`are-we-fuzzy-yet` regenerates it with 4-space indent.

## Architecture

Everything flows through one pipeline in `src/main.ts`:

```
attempt(dateStr, locale)
  → runPreprocessors(dateStr, locale)   // locale-specific string rewrites
  → getMatcher(locale).attempt(str)     // per-locale cached PatternMatcher
      → patterns loop (src/patterns/patterns.ts)
      → formatter (LocaleHelper coercions)
  → MatcherResult { year, month, day, hour, minute, second, millisecond, offset }
```

`fromString`/`fromAny`/`fromObject` wrap `attempt` and build a `MaybeValidDate` (a `Date`
subclass with `invalid: string | null` and `isValid()`). `main.ts` has an intentional side
effect: it assigns `Date.fromString`, `Date.fromAny`, and `window.anyDateParser`.

### Locale data is generated, not hardcoded

`LocaleHelper` (`src/LocaleHelper/LocaleHelper.ts`) is a per-locale singleton (`LocaleHelper.factory`).
On construction it interrogates `Intl.DateTimeFormat`/`Intl.NumberFormat` to build, for that locale:
month-name alternations, day-name alternations, meridiem strings, and a digit lookup for non-Latin
numbering systems. Those become regex template _vars_.

Patterns are written as templates with `_VAR_` placeholders (`_YEAR4_`, `_MONTHNAME_`, `_H12_`,
`_OFFSET_`, `_ZONE_`, …) and compiled by `helper.compile()`, which substitutes the vars and throws on
an unknown one. Base var definitions live in `src/data/templates.ts` — `latn` for Latin digits and
`other` where `*` is replaced by the locale's digit character class.

### Pattern order is load-bearing

`compile(helper)` in `src/patterns/patterns.ts` returns an **ordered** array, roughly:

1. Fully-anchored formats (`^...$`): ISO timestamps, chinese, korean, twitter, `today`/`ago`,
   `@seconds`, Microsoft JSON.
2. Partial-match formats: time-of-day, `ymd`/`mdy`/`dmy`, monthname combinations.
3. Loose/fuzzy fallbacks: bare `_YEAR4_`, bare `_MONTHNAME_`, bare `_DAY_`, bare zone/offset.

`PatternMatcher.attempt` walks that list, and on each match **splices the matched text out of the
working string** and merges the handler's fields — but only for keys not already set
(`if (!(key in rawResult))`). So an earlier pattern always beats a later one, and the loose patterns
at the end are what make fuzzy parsing ("In 1929, the stock market crashed on October 29") work.
Reordering or inserting a pattern can change results far from the format you were targeting; run the
whole suite after touching this file.

`doneChecker` stops the loop when the working string is exhausted or every field is filled.
If no pattern matched at all, `fallback` returns `{ invalid: '...' }`.

The `mdy` and `md` patterns are **filtered out** for locales not in `src/data/mdyLocales.ts`, so
`03/14/2020` is month-first only in the US-style locales and day-first elsewhere.

### Where raw strings become numbers

`getFormatter` in `src/PatternMatcher/getMatcher.ts` is the only place coercion happens. Handlers
return raw captured strings plus intermediate keys (`monthname`, `meridiem`, `zone`); the formatter
resolves them via `LocaleHelper` (`monthNameToInt`, `h12ToInt`, `zoneToOffset`, `offsetToMinutes`,
`millisecondToInt`, `toInt`), then applies the two-digit-year table (`src/data/twoDigitYears.ts`)
and subtracts 543 for buddhist-calendar locales.

### Preprocessors

`src/data/preprocessors.ts` maps a two-letter language to find/replace pairs applied before matching —
stripping " de "/" um "/" den ", converting Korean 시/분/초 and Thai นาฬิกา to colons, moving
Chinese/Korean meridiem markers after the digits, and normalizing `HH.MM.SS` to `HH:MM:SS` for
locales that use periods. Adding support for a language that puts words _inside_ a date is usually a
preprocessor change, not a new pattern.

## Tests

Specs are colocated (`src/**/*.spec.ts`); `vitest.config.ts` only includes that glob. Three shared
generators in `test-fixtures/` produce most of the ~2400 cases:

- `testDates.ts` — formats a luxon `DateTime` with a list of luxon format strings × locales, then
  asserts `parser.attempt` round-trips it. Used by the per-format specs.
- `testBuiltInFormats.ts` — sweeps every locale in `localeList.ts` × `Intl.DateTimeFormat`
  dateStyle/timeStyle combinations. Used by `src/main.spec.ts`; this is the broad regression net.
- `testParser.ts` — plain list of input strings → one expected object.

Time-dependent patterns (`today`, `ago`) are tested by overriding the mutable `nowGetter.now`
exported from `src/patterns/patterns.ts` in `beforeAll`, restoring it in `afterAll`.

`src/patterns/readme.spec.ts` pins claims made in README.md — update it when you change documented
behavior.

## Releasing

`dist/` is committed. Bump `version` in `package.json`, run `npm run build`, and update the
`?v=x.y.z` query strings in the README badges and the two CDN URLs in the README install section —
they are hardcoded to the current version. Log the change in `CHANGELOG.md`.
