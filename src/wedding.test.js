import test from 'node:test'
import assert from 'node:assert/strict'
import { getCountdown, getTimelineProgress, getTimelineActiveIndex, WEDDING_TIMESTAMP } from './wedding.js'

test('the wedding starts at 1 PM in Cebu regardless of the guest’s timezone', () => {
  assert.equal(WEDDING_TIMESTAMP, Date.UTC(2027, 1, 7, 5))
})

test('countdown decomposes remaining time and rolls each unit over', () => {
  assert.deepEqual(getCountdown(WEDDING_TIMESTAMP - (86400 + 3600 + 60 + 17) * 1000), {
    days: 1, hours: 1, minutes: 1, seconds: 17, isPast: false,
  })
  assert.deepEqual(getCountdown(WEDDING_TIMESTAMP - 86400 * 1000 + 1), {
    days: 0, hours: 23, minutes: 59, seconds: 59, isPast: false,
  })
  assert.deepEqual(getCountdown(WEDDING_TIMESTAMP - 3600 * 1000 + 1), {
    days: 0, hours: 0, minutes: 59, seconds: 59, isPast: false,
  })
})

test('seconds count down through a minute boundary and the final second', () => {
  for (const [remainingSeconds, minutes, seconds] of [[61, 1, 1], [60, 1, 0], [59, 0, 59], [1, 0, 1]]) {
    assert.deepEqual(getCountdown(WEDDING_TIMESTAMP - remainingSeconds * 1000), {
      days: 0, hours: 0, minutes, seconds, isPast: false,
    })
  }
})

test('the countdown stays at zero once the wedding begins', () => {
  for (const offset of [0, 1000, 86400000]) {
    assert.deepEqual(getCountdown(WEDDING_TIMESTAMP + offset), {
      days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true,
    })
  }
})

test('the timeline pearl starts and ends within its thread', () => {
  assert.equal(getTimelineProgress(1200, 900, 800), 0)
  assert.equal(getTimelineProgress(416, 900, 800), 0)
  assert.equal(getTimelineProgress(-484, 900, 800), 1)
  assert.equal(getTimelineProgress(-2000, 900, 800), 1)
  assert.equal(getTimelineProgress(0, 0, 800), 0)
})

test('scrolling forward moves the pearl down, and scrolling back reverses it', () => {
  const before = getTimelineProgress(100, 900, 800)
  const after = getTimelineProgress(-200, 900, 800)
  assert.ok(after > before)
  assert.equal(getTimelineProgress(-34, 900, 800), 0.5)
  assert.ok(getTimelineProgress(100, 900, 800) < after)
})

test('the scroll position adapts to a resized viewport', () => {
  assert.ok(getTimelineProgress(0, 900, 1000) > getTimelineProgress(0, 900, 600))
})

test('timeline focus follows the pearl in either scroll direction using measured event positions', () => {
  const markers = [66, 301, 566, 801]
  assert.equal(getTimelineActiveIndex(0, markers), 0)
  assert.equal(getTimelineActiveIndex(290, markers), 1)
  assert.equal(getTimelineActiveIndex(545, markers), 2)
  assert.equal(getTimelineActiveIndex(860, markers), 3)
  assert.equal(getTimelineActiveIndex(290, markers), 1)
  assert.equal(getTimelineActiveIndex(100, markers), 0)
  assert.equal(getTimelineActiveIndex(280, [42, 277, 512, 747]), 1)
  assert.equal(getTimelineActiveIndex(0, []), -1)
})
