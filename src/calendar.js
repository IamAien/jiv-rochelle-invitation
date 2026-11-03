export const WEDDING_EVENTS = [
  {
    id: 'ceremony', label: 'The ceremony', time: '1:00 PM', start: '20270207T050000Z',
    venue: 'The Archdiocesan Shrine of the Most Sacred Heart of Jesus',
    mapQuery: 'Archdiocesan Shrine Most Sacred Heart of Jesus Cebu',
    description: 'Join Jiv and Rochelle as they begin their forever.',
  },
  {
    id: 'reception', label: 'The reception', time: '5:00 PM', start: '20270207T090000Z',
    venue: 'Marco Polo Plaza Cebu', mapQuery: 'Marco Polo Plaza Cebu',
    description: 'Celebrate with the newlyweds.',
  },
]

const escapeText = value => value.replace(/\\/g, '\\\\').replace(/\r\n|\r|\n/g, '\\n').replace(/[,;]/g, '\\$&')

function foldLine(line) {
  const encoder = new TextEncoder()
  const lines = []
  let current = ''
  let size = 0
  for (const character of line) {
    const bytes = encoder.encode(character).length
    if (size + bytes > 75) { lines.push(current); current = ' '; size = 1 }
    current += character
    size += bytes
  }
  lines.push(current)
  return lines.join('\r\n')
}

export function createWeddingCalendar(eventId, now = new Date()) {
  const events = eventId ? WEDDING_EVENTS.filter(event => event.id === eventId) : WEDDING_EVENTS
  if (!events.length) throw new RangeError(`Unknown wedding event: ${eventId}`)
  const stamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Jiv and Rochelle//Wedding//EN', 'CALSCALE:GREGORIAN',
    ...events.flatMap(event => [
      'BEGIN:VEVENT', `UID:jiv-rochelle-${event.id}-20270207@wedding`, `DTSTAMP:${stamp}`,
      `DTSTART:${event.start}`, `SUMMARY:${escapeText(`Jiv & Rochelle — ${event.label}`)}`,
      `LOCATION:${escapeText(`${event.venue}, Cebu`)}`, `DESCRIPTION:${escapeText(event.description)}`, 'END:VEVENT',
    ]),
    'END:VCALENDAR', '',
  ].map(foldLine).join('\r\n')
}

export function downloadWeddingCalendar(eventId) {
  const url = URL.createObjectURL(new Blob([createWeddingCalendar(eventId)], { type: 'text/calendar;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = `Jiv-and-Rochelle-${eventId ?? 'Wedding'}.ics`
  document.body.append(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}
