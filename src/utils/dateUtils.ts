export function isWholeDay(start: Date, end: Date): boolean {
  const startTime = start.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'Asia/Singapore',
  });
  const endTime = end.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'Asia/Singapore',
  });
  return startTime === '12:00 AM' && endTime === '12:00 AM';
}

export function formatSGTDateTime(
  date: Date,
  format: 'short' | 'full' = 'full',
) {
  const dateOptions: Intl.DateTimeFormatOptions =
    format === 'full'
      ? { day: 'numeric', month: 'long', year: 'numeric' }
      : { month: 'short', day: 'numeric' };

  const dateString = new Date(
    date.toLocaleString('en-US', { timeZone: 'Asia/Singapore' }),
  ).toLocaleDateString('en-GB', dateOptions);

  return dateString;
}

export function formatSGTTime(date: Date): string {
  return new Date(
    date.toLocaleString('en-US', { timeZone: 'Asia/Singapore' }),
  ).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
}
