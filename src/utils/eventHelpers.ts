import { formatDistanceToNow } from 'date-fns';
import { parseICS } from './iCalParser';
import { categoryMap, iCalUrl, eventLogos, eventEmoji } from '@/config.events';

export interface CalendarEvent {
  summary: string;
  start: Date;
  end: Date;
  description?: string;
  url?: string;
}

export async function fetchEvents(): Promise<CalendarEvent[]> {
  try {
    const res = await fetch(iCalUrl);
    if (res.ok) {
      const icalData = await res.text();
      return parseICS(icalData);
    }
    console.error('Failed to fetch ical file.');
    return [];
  } catch (error) {
    console.error('Error fetching or parsing the ical file:', error);
    return [];
  }
}

export function extractEventUrl(description?: string): string | null {
  const urlMatch = description?.match(/URL:\s*(https?:\/\/[^\s]+)/i);
  return urlMatch ? urlMatch[1] : null;
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

export function getEventLogo(summary: string): string | null {
  for (const [key, logoPath] of Object.entries(eventLogos)) {
    if (summary.toLowerCase().includes(key.toLowerCase())) {
      return logoPath;
    }
  }
  return null;
}

export function getEventEmoji(summary: string): string | null {
  for (const [key, emoji] of Object.entries(eventEmoji)) {
    const regex = new RegExp(`\\b${key}\\b`, 'i');
    if (regex.test(summary)) {
      return emoji;
    }
  }
  return null;
}

export function getCategoryEmoji(
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

  if (matchedCategory && categoryMap[matchedCategory]) {
    return categoryMap[matchedCategory];
  }

  const emoji = getEventEmoji(summary);
  return emoji || '';
}

export function updateRelativeTimes() {
  const eventTimes = document.querySelectorAll('.event-relative-time');
  eventTimes.forEach((element) => {
    const startTime = new Date(element.getAttribute('data-start-time')!);
    const relativeTime = formatDistanceToNow(startTime, { addSuffix: true });
    element.textContent = relativeTime;
  });
}
