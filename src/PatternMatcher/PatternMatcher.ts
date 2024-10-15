// import fs from 'node:fs';

function log(str: string) {
  if (str.includes('03/03')) {
    console.log(str);
  }
  // fs.appendFileSync('workingString.txt', str + '\n', 'utf-8');
}

type Pattern<Result> = {
  name: string;
  regex: RegExp;
  handler: (matches: string[]) => Result | null;
};

type DoneChecker<Result> = (result: Result, workingString: string) => boolean;
type Fallback<Result> = (input: string) => Result;
type Formatter<Result, FinalResult> = (result: Result) => FinalResult;
type Init<Result, FinalResult> = {
  doneChecker: DoneChecker<Result>;
  fallback: Fallback<Result>;
  patterns: Pattern<Result>[];
  formatter: Formatter<Result, FinalResult>;
};

export default class PatternMatcher<
  Result extends Record<string, any>,
  FinalResult extends Record<string, any>,
> {
  doneChecker: DoneChecker<Result>;
  fallback: Fallback<Result>;
  patterns: Pattern<Result>[];
  formatter: Formatter<Result, FinalResult>;
  constructor({
    doneChecker,
    fallback,
    patterns,
    formatter,
  }: Init<Result, FinalResult>) {
    this.doneChecker = doneChecker;
    this.fallback = fallback;
    this.patterns = patterns;
    this.formatter = formatter;
  }
  attempt(input: string) {
    if (typeof input !== 'string') {
      return this.fallback(input);
    }
    log(`\n---- attempt input "${input}" ----`);
    let workingString = input.trim();
    const rawResult = {} as Result;
    let hadMatch = false;
    for (const pattern of this.patterns) {
      const matches = workingString.match(pattern.regex);
      if (!matches) {
        // log(
        //   `no match => "${input}" > "${workingString}" [${pattern.name}] ${pattern.regex}`
        // );
        continue;
      }
      hadMatch = true;
      const result = pattern.handler(matches);
      if (result) {
        for (const [key, value] of Object.entries(result)) {
          if (!(key in rawResult) && value !== undefined) {
            (rawResult as Record<string, any>)[key] = value;
          }
        }
        log(
          `yes match=> "${input}" > "${workingString}" [${pattern.name}] ${pattern.regex} > ${JSON.stringify(matches)}`
        );
        workingString =
          workingString.slice(0, matches.index) +
          workingString.slice(matches.index + matches[0].length + 1);
        workingString = workingString.trim();
        log(`new strng=> "${input}" > "${workingString}"`);
        if (this.doneChecker(rawResult, workingString)) {
          log(`done here => "${input}" > ${JSON.stringify(rawResult)}`);
          break;
        }
      } else {
        log(
          `no result=> "${input}" > "${workingString}" [${pattern.name}] ${pattern.regex}`
        );
      }
    }
    return hadMatch ? this.formatter(rawResult) : this.fallback(input);
  }
  testOne(name: string, input: string) {
    const pattern = this.patterns.find(p => p.name === name);
    if (!pattern) {
      return null;
    }
    const matches = input.match(pattern.regex);
    if (!matches) {
      return null;
    }
    return pattern.handler(matches);
  }
}
