import { formatDistanceToNow } from 'date-fns';
import {
  excludedURLRegEx,
  replacedURLStrings,
  excludedEventNames,
  whitelistedURLStrings,
} from '../config.events';
import { parseICS } from './iCalParser';
import { categoryMap, iCalUrl, eventLogos, eventEmoji } from '@/config.events';

export interface CalendarEvent {
  summary: string;
  start: Date;
  end: Date;
  description?: string;
  url?: string;
  allDay: boolean;
}

let eventsCache: CalendarEvent[] | null = null;
let lastFetchTime: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000;

async function fetchEventsFromSource(): Promise<CalendarEvent[]> {
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

export async function fetchEvents(): Promise<CalendarEvent[]> {
  const now = Date.now();

  if (eventsCache && lastFetchTime && now - lastFetchTime < CACHE_DURATION) {
    return eventsCache;
  }

  const events = await fetchEventsFromSource();
  eventsCache = events;
  lastFetchTime = now;

  return events;
}

export function extractEventUrl(description?: string): string | null {
  if (!description) return null;

  const urlPrefixMatch = description.match(/URL:\s*(https?:\/\/[^\s]+)/i);
  let url = urlPrefixMatch ? urlPrefixMatch[1] : null;

  if (!url) {
    const urlMatch = description.match(/(https?:\/\/[^\s]+)/);
    url = urlMatch ? urlMatch[1] : null;
  }

  if (url) {
    for (const [from, to] of replacedURLStrings) {
      url = url.replace(from, to);
    }
    for (const pattern of excludedURLRegEx) {
      if (new RegExp(pattern).test(url)) {
        return null;
      }
    }
    return url;
  }

  return null;
}

export function shouldNoFollow(url: string): boolean {
  return !whitelistedURLStrings.some((domain: string) => url.includes(domain));
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

export function filterPastEvents(events: CalendarEvent[], year?: number) {
  return events
    .filter((event) => {
      const eventYear = event.start.getFullYear();
      return (
        (!year || eventYear === year) &&
        event.start < new Date() &&
        !event.allDay &&
        !excludedEventNames.some((name) =>
          event.summary.toLowerCase().includes(name.toLowerCase()),
        )
      );
    })
    .sort((a, b) => a.start.getTime() - b.start.getTime());
}
