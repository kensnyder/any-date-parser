import Format from '../../Format/Format';

const atSeconds = new Format({
  template: '^@(\\d+)$',
  handler: function (matches) {
    const seconds = parseInt(matches[1], 10);
    const date = new Date(seconds * 1000);
    return {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate(),
      hour: date.getUTCHours(),
      minute: date.getUTCMinutes(),
      second: date.getUTCSeconds(),
    };
  },
});

export default atSeconds;
