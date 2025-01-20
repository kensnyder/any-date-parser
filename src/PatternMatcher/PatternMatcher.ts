type Pattern<Result> = {
  name: string;
  regex: RegExp;
  handler: (matches: string[]) => Result | null;
};

type DoneChecker<Result> = (result: Result, workingString: string) => boolean;
type Fallback<FinalResult> = (input: string) => FinalResult;
type Formatter<Result, FinalResult> = (result: Result) => FinalResult;
type Init<Result, FinalResult> = {
  doneChecker: DoneChecker<Result>;
  fallback: Fallback<FinalResult>;
  patterns: Pattern<Result>[];
  formatter: Formatter<Result, FinalResult>;
};

export default class PatternMatcher<
  Result extends Record<string, any>,
  FinalResult extends Record<string, any>,
> {
  doneChecker: DoneChecker<Result>;
  fallback: Fallback<FinalResult>;
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
  attempt(input: string): FinalResult {
    if (typeof input !== 'string') {
      return this.fallback(input);
    }
    let workingString = input.trim();
    const rawResult = {} as Result;
    let hadMatch = false;
    for (const pattern of this.patterns) {
      const matches = workingString.match(pattern.regex);
      if (!matches) {
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
        workingString =
          workingString.slice(0, matches.index) +
          workingString.slice(matches.index + matches[0].length + 1);
        workingString = workingString.trim();
        if (this.doneChecker(rawResult, workingString)) {
          break;
        }
      }
    }
    return hadMatch ? this.formatter(rawResult) : this.fallback(input);
  }
}
