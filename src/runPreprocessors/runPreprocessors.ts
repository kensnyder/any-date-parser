import preprocessors from '../data/preprocessors';

export default function runPreprocessors(dateString: string, locale: string) {
  // dateString = dateString.replace(/\. /g, ' ');
  const twoLetterLocale = locale.slice(0, 2).toLowerCase();
  const replacers = preprocessors[twoLetterLocale];
  if (!replacers) {
    return dateString;
  }
  for (const [find, replace] of replacers) {
    dateString = dateString.replace(find, replace);
  }
  return dateString;
}
