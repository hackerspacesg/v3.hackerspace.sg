import { formatDistanceToNow } from 'date-fns';
import { categoryMap } from '@/config.index';

export function formatSGTDateTime(date: Date) {
  const dateString = new Date(
    date.toLocaleString('en-US', { timeZone: 'Asia/Singapore' }),
  ).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const timeString = new Date(
    date.toLocaleString('en-US', { timeZone: 'Asia/Singapore' }),
  ).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return `${dateString}, ${timeString} SGT`;
}

export function isTentative(title: string): boolean {
  return title.toLowerCase().includes('(tentative)');
}

function findCategoryMatch(text: string | undefined): string | undefined {
  if (!text) return undefined;

  return Object.keys(categoryMap).find((key) =>
    text.toLowerCase().includes(key.toLowerCase()),
  );
}

export function getEmoji(
  summary: string,
  description: string | undefined,
): string {
  let matchedCategory: string | undefined;

  const categoryMatch = description?.match(/Category:\s*([^\n]+)/i);

  if (categoryMatch) {
    const category = categoryMatch[1].trim();
    matchedCategory = Object.keys(categoryMap).find(
      (key) => key.toLowerCase() === category.toLowerCase(),
    );
  }

  if (!matchedCategory) {
    matchedCategory = findCategoryMatch(summary);
  }

  if (!matchedCategory) {
    matchedCategory = findCategoryMatch(description);
  }

  return matchedCategory ? categoryMap[matchedCategory] || '' : '';
}

export function updateRelativeTimes() {
  const eventTimes = document.querySelectorAll('.event-relative-time');
  eventTimes.forEach((element) => {
    const startTime = new Date(element.getAttribute('data-start-time')!);
    const relativeTime = formatDistanceToNow(startTime, { addSuffix: true });
    element.textContent = relativeTime;
  });
}
