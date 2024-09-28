import Format from '../../Format/Format';
import baseLookups from '../../data/baseLookups';

// example: "Fri Apr 09 12:53:54 +0000 2010"
const twitter = new Format({
  /* prettier-ignore */
  //                                         $1                            $2                                                $3      $4      $5      $6          $7
  matcher: /^(?:sun|mon|tue|wed|thu|fri|sat) (jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec) (\d{2}) (\d{2}):(\d{2}):(\d{2}) ([+-]\d{4}) (\d{4})$/i,
  handler: function (matches: string[]) {
    const [, month, day, hour, minute, second, offset, year] = matches;
    const [, sign, hours, minutes] = offset.match(/^([+-])(\d{2})(\d{2})$/);
    const offsetMinutes =
      (sign === '-' ? -1 : 1) * (parseInt(hours) * 60 + parseInt(minutes));
    return {
      month: baseLookups.month[month.toLowerCase()],
      day: parseInt(day),
      hour: parseInt(hour),
      minute: parseInt(minute),
      second: parseInt(second),
      offset: offsetMinutes,
      year: parseInt(year),
    };
  },
  units: ['month', 'day', 'hour', 'minute', 'second', 'offset', 'year'],
});

export default twitter;
