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
  const foundingDate = new Date('2009-11-14');

  for (const key in parsedData) {
    const event = parsedData[key];
    if (event.type === 'VEVENT' && event.start) {
      const eventStart = new Date(event.start);
      if (eventStart >= foundingDate) {
        events.push({
          summary: event.summary || 'No Title',
          start: eventStart,
          end: event.end ? new Date(event.end) : new Date(),
          description: event.description || '',
        });
      }
    }
  }

  return events;
}
