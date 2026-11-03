import test from 'node:test'
import assert from 'node:assert/strict'
import { createWeddingCalendar } from './calendar.js'

const now = new Date('2026-11-02T04:05:06.000Z')
const unfold = calendar => calendar.replace(/\r\n /g, '')

test('saving the date includes both events at the correct Cebu times', () => {
  const calendar = unfold(createWeddingCalendar(undefined, now))
  assert.equal((calendar.match(/BEGIN:VEVENT/g) ?? []).length, 2)
  assert.match(calendar, /DTSTART:20270207T050000Z/)
  assert.match(calendar, /DTSTART:20270207T090000Z/)
  assert.match(calendar, /DTSTAMP:20261102T040506Z/)
  assert.ok(calendar.endsWith('END:VCALENDAR\r\n'))
})

test('a venue download contains only the selected event', () => {
  for (const [id, start, excluded] of [
    ['ceremony', '20270207T050000Z', '20270207T090000Z'],
    ['reception', '20270207T090000Z', '20270207T050000Z'],
  ]) {
    const calendar = unfold(createWeddingCalendar(id, now))
    assert.equal((calendar.match(/BEGIN:VEVENT/g) ?? []).length, 1)
    assert.ok(calendar.includes(`DTSTART:${start}`))
    assert.ok(!calendar.includes(`DTSTART:${excluded}`))
    assert.ok(calendar.includes(`UID:jiv-rochelle-${id}-20270207@wedding`))
  }
})

test('calendar files escape locations and fold UTF-8 lines for calendar apps', () => {
  const calendar = createWeddingCalendar(undefined, now)
  assert.ok(unfold(calendar).includes('Jesus\\, Cebu'))
  for (const line of calendar.split('\r\n')) assert.ok(new TextEncoder().encode(line).length <= 75)
  assert.equal(calendar.replace(/\r\n/g, '').includes('\n'), false)
  assert.ok(unfold(calendar).includes('Jiv & Rochelle — The ceremony'))
})

test('unrecognized event IDs cannot accidentally download the full wedding', () => {
  assert.throws(() => createWeddingCalendar('unknown', now), RangeError)
})
