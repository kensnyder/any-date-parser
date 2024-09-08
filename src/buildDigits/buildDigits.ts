import {
  chineseGroup,
  defaultLookup,
  startCodes,
} from '../data/numberingSystems';

const cache = {};

export default function buildDigits(nsName) {
  if (cache[nsName]) {
    return cache[nsName];
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
  const lookup = {};
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
