import normalizeLocale from '../normalizeLocale/normalizeLocale';

let defaultLocale: string;
/* istanbul ignore next */
if (typeof navigator !== 'undefined') {
  // browser: locale is on navigator object
  const nav = navigator;
  defaultLocale = Array.isArray(nav.languages)
    ? nav.languages[0]
    : nav.language;
} else if (typeof process !== 'undefined') {
  // node: locale is an env var
  const env = process.env;
  defaultLocale = env.LC_ALL || env.LC_MESSAGES || env.LANG || env.LANGUAGE;
}

defaultLocale = normalizeLocale(defaultLocale || 'en-US');

export default defaultLocale;
