import ical from 'ical';

interface CalendarEvent {
  summary: string;
  start: Date;
  end: Date;
  description?: string;
}

export function parseICS(data: string): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  const parsedData = ical.parseICS(data);

  for (const key in parsedData) {
    const event = parsedData[key];
    if (event.type === 'VEVENT') {
      events.push({
        summary: event.summary || 'No Title',
        start: event.start ? new Date(event.start) : new Date(),
        end: event.end ? new Date(event.end) : new Date(),
        description: event.description || '',
      });
    }
  }

  return events;
}
