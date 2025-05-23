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

export function formatDateYYYYMMDD(date: Date): string {
  const d = new Date(
    date.toLocaleString('en-US', { timeZone: 'Asia/Singapore' }),
  );
  return (
    d.getFullYear().toString() +
    String(d.getMonth() + 1).padStart(2, '0') +
    String(d.getDate()).padStart(2, '0')
  );
}

export function getDayAbbreviation(date: Date): string {
  return new Date(
    date.toLocaleString('en-US', { timeZone: 'Asia/Singapore' }),
  ).toLocaleDateString('en-US', { weekday: 'short' });
}

export function transformToMonthlyData<T>(
  items: T[],
  getDate: (item: T) => Date,
): {
  months: string[];
  itemsByMonth: Record<string, { short: string; items: T[] }>;
} {
  const itemsByMonth = items.reduce(
    (acc, item) => {
      const date = getDate(item);
      const monthLong = date.toLocaleString('en-US', { month: 'long' });
      const monthShort = date.toLocaleString('en-US', { month: 'short' });

      if (!acc[monthLong]) {
        acc[monthLong] = {
          short: monthShort,
          items: [],
        };
      }
      acc[monthLong].items.push(item);
      return acc;
    },
    {} as Record<string, { short: string; items: T[] }>,
  );

  const months = Object.keys(itemsByMonth).sort((a, b) => {
    const monthA = new Date(Date.parse(`${a} 1, 2000`));
    const monthB = new Date(Date.parse(`${b} 1, 2000`));
    return monthA.getTime() - monthB.getTime();
  });

  return { months, itemsByMonth };
}
