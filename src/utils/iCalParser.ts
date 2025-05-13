import ical from 'ical';

interface CalendarEvent {
  summary: string;
  start: Date;
  end: Date;
  description?: string;
  allDay: boolean;
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
        const eventEnd = event.end ? new Date(event.end) : new Date();
        const durationHours = (eventEnd.getTime() - eventStart.getTime()) / (1000 * 60 * 60);
        
        events.push({
          summary: event.summary || 'No Title',
          start: eventStart,
          end: eventEnd,
          description: event.description || '',
          allDay: durationHours >= 24,
        });
      }
    }
  }

  return events;
}
