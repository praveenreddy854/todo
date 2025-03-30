import getUserLocale from 'get-user-locale';

/**
 * Returns relative time format for a given date to endDate
 * @param date Date when the action happened or will happen
 * @param rtfStyle Used to control how time can be displayed. Ex: week can be displayed as week or wk.
 * @param rtfNumeric Previous week action time can be displayed as "Last week" or "1 week ago"
 * @param endDate Usually we leave this. This will be today if not passed.
 * @returns
 */
export const getRelativeTimeString = (
  date: Date,
  rtfStyle: Intl.RelativeTimeFormatStyle = 'short',
  rtfNumeric: Intl.RelativeTimeFormatNumeric = 'always',
  endDate?: Date
): string => {
  const locale = getUserLocale();

  let today = new Date();
  if (endDate) {
    today = new Date(endDate);
  }
  // These are meant to be approximate values. After all, the human notion of "1 mo ago" or "1 yr ago" can be fuzzy.
  const oneSecond = 1;
  const oneMinute = oneSecond * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;
  const oneWeek = oneDay * 7;
  const oneMonth = oneDay * 30;
  const oneYear = oneDay * 365;

  const diffInSec = (date.getTime() - today.getTime()) / 1000;
  const diffAbsInSec = Math.abs(diffInSec);
  const sign = Math.sign(diffInSec);

  const rtf = new Intl.RelativeTimeFormat(locale.split('-')[0], {
    style: rtfStyle,
    numeric: rtfNumeric,
  });

  // Less than a second ago, displays localized text, "now"
  if (diffAbsInSec < oneSecond) {
    // numeric: auto will produce "now" instead of "in 0 sec."
    return new Intl.RelativeTimeFormat(locale.split('-')[0], {
      style: rtfStyle,
      numeric: 'auto',
    }).format(0, 'seconds');
  }
  // Less than a minute ago
  if (diffAbsInSec < oneMinute) {
    const seconds = Math.floor(diffAbsInSec);
    return rtf.format(sign * seconds, 'seconds');
  }

  // Less than an hour ago
  if (diffAbsInSec < oneHour) {
    const diffMinutes = Math.floor(diffAbsInSec / oneMinute);
    return rtf.format(sign * diffMinutes, 'minutes');
  }

  // Less than a day ago
  if (diffAbsInSec < oneDay) {
    const diffHours = Math.floor(diffAbsInSec / oneHour);
    return rtf.format(sign * diffHours, 'hours');
  }

  // Less than a week ago
  if (diffAbsInSec < oneWeek) {
    const days = Math.floor(diffAbsInSec / oneDay);
    return rtf.format(sign * days, 'days');
  }

  // Less than a month ago
  if (diffAbsInSec < oneMonth) {
    const weeks = Math.floor(diffAbsInSec / oneWeek);
    return rtf.format(sign * weeks, 'weeks');
  }

  // Less than a year ago
  if (diffAbsInSec < oneYear) {
    const months = Math.floor(diffAbsInSec / oneMonth);
    return rtf.format(sign * months, 'months');
  }

  // Default
  const years = Math.floor(diffAbsInSec / oneYear);
  return rtf.format(sign * years, 'years');
};

export const tryParseDate = (date: string): Date | undefined => {
  try {
    if (!date || date.trim() === '') {
      return undefined;
    }
    const parsedDate = new Date(date);
    // Check if the date is valid
    return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
  } catch (error) {
    return undefined;
  }
};
