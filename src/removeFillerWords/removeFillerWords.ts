import fillerWords from '../data/fillerWords';

export default function removeFillerWords(dateString: string, locale: string) {
  dateString = dateString.replace(/\. /g, ' ');
  const twoLetterLocale = locale.slice(0, 2).toLowerCase();
  const replacers = fillerWords[twoLetterLocale];
  if (!replacers) {
    return dateString;
  }
  for (const [find, replace] of replacers) {
    dateString = dateString.replace(find, replace);
  }
  return dateString;
}
