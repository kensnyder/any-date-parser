// const fillerWords = [
// 	{ locales: [/^de/], replacements:  },
// 	{ locales: [/^zh/], replacements: [[/下午([\d:]+)/, '$1pm']] },
// ];

const fillerWords = {
  zh: [
    // in Chinese, "PM" comes before the digits
    [/下午([\d:]+)/, '$1pm'],
    // Chinese "time"
    [/\[.+?時間]/, ''],
  ],
  he: [[/ב/g, '']],
  // "of" in various languages
  de: [[/ um /, '']],
  pt: [[/de /g, '']],
  es: [[/de /g, '']],
  da: [[/den /g, '']],
  // Russian symbol after years
  ru: [[/ г\./g, '']],
  th: [
    // Thai "at/on"
    [/ที่/g, ''],
    // Thai Buddhist Calendar is 543 years ahead
    [
      /พ.ศ.?(\d{4})/,
      ($0, year) => {
        let intYear = parseInt(year);
        intYear -= 543;
        return String(intYear);
      },
    ],
    [
      /\d{4}/,
      year => {
        let intYear = parseInt(year);
        if (intYear >= 2443) {
          intYear -= 543;
        }
        return String(intYear);
      },
    ],
  ],
};

export default fillerWords;
