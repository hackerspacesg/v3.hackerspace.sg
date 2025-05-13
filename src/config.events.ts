export const iCalUrl =
  'https://calendar.google.com/calendar/ical/mengwong%40hackerspace.sg/public/basic.ics';

export const categoryMap: Record<string, string> = {
  Hardware: '🛠️',
  Software: '💻',
  Plenum: '💬',
  Tentative: '🤔',
};

export const excludedEventNames = [
  'Tentative',
  'Postponed',
  'Cancelled',
  'Private',
  'Plenum',
];

export const whitelistedURLStrings = ['hackerspace.sg'];

export const replacedURLStrings = [
  ['hackerspacesg.pbworks.com', 'wiki.v1.hackerspace.sg'],
];

export const excludedURLRegEx = ['.*filmgarde.com.sg.*'];

export const eventLogos: Record<string, string> = {
  Ruby: '/img/events/ruby.png',
};

export const eventEmoji: Record<string, string> = {
  Afterparty: '🍻',
  AI: '🤖',
  Christmas: '🎄',
  Cleanup: '🧹',
  DIYbio: '🥛',
  Drinks: '🍻',
  'Engineers.SG': '⚙️',
  Eurovision: '🎤',
  Guthub: '🥛',
  'Hack And Tell': '📢',
  Hackware: '🛠️',
  iOS: '📱',
  IOT: '☁️',
  Java: '☕',
  Keyboards: '⌨️',
  Linux: '🐧',
  Movie: '📽️',
  'Papers We Love': '🎓',
  PHP: '🐘',
  'PyCon.*': '🐍',
  PyLadies: '🐍',
  Python: '🐍',
  PUGS: '🐍',
  Uke: '🎸',
  Ukulele: '🎸',
  Xmas: '🎄',
};
