import normalizeLocale from '../normalizeLocale/normalizeLocale';

let detectedLocale: string;
/* istanbul ignore next */
if (typeof navigator !== 'undefined') {
  // browser: locale is on navigator object
  const nav = navigator;
  detectedLocale = Array.isArray(nav.languages)
    ? nav.languages[0]
    : nav.language;
} else if (typeof process !== 'undefined') {
  // node: locale is an env var
  const env = process.env;
  detectedLocale = env.LC_ALL || env.LC_MESSAGES || env.LANG || env.LANGUAGE;
}

const defaultLocale = normalizeLocale(detectedLocale || 'en-US');

export default defaultLocale;
