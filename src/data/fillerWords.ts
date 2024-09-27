const fillerWords = {
  zh: [
    // in Chinese, "PM" comes before the digits
    [/下午([\d:]+)/, '$1下午'],
    // Chinese "time"
    [/\[.+?時間]/, ''],
  ],
  he: [[/ב/gi, '']],
  // "of" in various languages
  // de: [[/ um /g, '']],
  // pt: [[/de /gi, '']],
  // es: [[/de /gi, '']],
  // da: [[/den /gi, '']],
  // Russian symbol after years
  ru: [[/ г\./g, '']],
  th: [
    // Thai "at/on"
    [/ที่/gi, ''],
    // Thai Buddhist Calendar is 543 years ahead
    [
      /พ.ศ.?(\d{4})/i,
      (_, year) => {
        let intYear = parseInt(year, 10);
        intYear -= 543;
        return String(intYear);
      },
    ],
    [
      /\d{4}/,
      year => {
        let intYear = parseInt(year, 10);
        if (intYear >= 2443) {
          intYear -= 543;
        }
        return String(intYear);
      },
    ],
    [/\s*นาฬิกา\s*/i, ':'], // "hour"
    [/\s*นาที\s*/i, ':'], // "minute"
    [/\s*วินาที\s*/i, ':'], // "second"
  ],
  ko: [
    [/\s*시\s*/, ':'], // "hour"
    [/\s*분\s*/, ':'], // "minute"
    [/\s*초\s*/, ':'], // "second"
  ],
};

export default fillerWords;
