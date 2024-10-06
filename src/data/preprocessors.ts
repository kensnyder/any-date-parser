// some locales use periods instead of colons in their times
const periodsInsteadOfColons = [
  [/(\d{1,2})\.(\d{2})\.(\d{2})(\D|$)/, '$1:$2:$3$4'],
  [/(\d{1,2})\.(\d{2})(\D|$)/, '$1:$2$3'],
];

const preprocessors = {
  ar: [[/ /g, ' ']], // Some built-in formats contain non-breaking space
  bn: [[/,/g, '']],
  zh: [
    // in Chinese, am/pm comes before the digits
    [/早上\s*([\d:]+)/, '$1am'],
    [/凌晨\s*([\d:]+)/, '$1am'],
    [/上午\s*([\d:]+)/, '$1am'],
    [/下午\s*([\d:]+)/, '$1pm'],
    [/晚上\s*([\d:]+)/, '$1pm'],
    // Chinese "time"
    // [/\[.+?時間]/, ''],
  ],
  he: [[/ב/gi, '']],
  // "of" in various languages
  de: [[/ um /g, '']],
  pt: [[/de /gi, '']],
  es: [[/de /gi, '']],
  da: [[/den /gi, ''], ...periodsInsteadOfColons],
  // Russian symbol after years
  ru: [[/ г\./g, '']],
  th: [
    // Thai "at/on"
    // [/ที่/gi, ''],
    [/\s*นาฬิกา\s*/i, ':'], // "hour"
    [/\s*นาที\s*/i, ':'], // "minute"
    [/\s*วินาที\s*/i, ' '], // "second"
  ],
  ko: [
    [/\s*시\s*/, ':'], // "hour"
    [/\s*분\s*/, ':'], // "minute"
    [/\s*초\s*/, ''], // "second"
    [/(오전|오후)\s*([\d:]+)/, '$2$1'], // move AM/PM to the end
    [/(\d{4})\. (\d{1,2})\. (\d{1,2})\./, '$1-$2-$3'],
  ],
  fi: periodsInsteadOfColons,
  id: periodsInsteadOfColons,
  // da: periodsInsteadOfColons,
};

export default preprocessors;
