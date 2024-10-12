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
  FinalResult = any,
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
    let workingString = input.trim();
    const finalResult = {} as Result;
    let hadMatch = false;
    for (const pattern of this.patterns) {
      const matches = input.match(pattern.regex);
      if (!matches) {
        continue;
      }
      hadMatch = true;
      const result = pattern.handler(matches);
      if (result) {
        Object.assign(finalResult, result);
        workingString =
          workingString.slice(0, matches.index) +
          workingString.slice(matches.index + matches[0].length);
        workingString = workingString.trim();
        if (this.doneChecker(finalResult, workingString)) {
          break;
        }
      }
    }
    return hadMatch ? this.formatter(finalResult) : this.fallback(input);
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
