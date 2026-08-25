import {
  chineseGroup,
  type DigitLookup,
  defaultLookup,
  startCodes,
} from '../data/numberingSystems';

/** A regex character class for a numbering system, plus its digit lookup */
export type Digits = {
  group: string;
  lookup: DigitLookup;
};

const cache: Record<string, Digits> = {};

export default function buildDigits(nsName: string): Digits {
  const cached = cache[nsName];
  if (cached) {
    return cached;
  }
  if (nsName === 'fullwide' || nsName === 'hanidec') {
    return { group: chineseGroup, lookup: { ...defaultLookup } };
  }
  const startCode = startCodes[nsName];
  /* istanbul ignore next */
  if (!startCode) {
    // unknown numbering system; treat like latn
    return { group: '\\d', lookup: { ...defaultLookup } };
  }
  const start = String.fromCharCode(startCode);
  const end = String.fromCharCode(startCode + 9);
  const lookup: DigitLookup = {};
  for (let i = 0; i < 10; i++) {
    lookup[String.fromCharCode(startCode + i)] = i;
  }
  // console.log({ nsName, start, end, lookup });
  cache[nsName] = {
    group: `[${start}-${end}]`,
    lookup,
  };
  return cache[nsName];
}
