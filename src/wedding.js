// The ceremony begins at 1 PM in Cebu (UTC+8).
export const WEDDING_DATE = '2027-02-07T13:00:00+08:00'
export const WEDDING_TIMESTAMP = new Date(WEDDING_DATE).getTime()
export const ENVELOPE_OPENING_MS = 10000
export const ENVELOPE_CROSSFADE_MS = 1700

export function getCountdown(now = Date.now()) {
  const total = Math.max(0, Math.floor((WEDDING_TIMESTAMP - now) / 1000))
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    isPast: now >= WEDDING_TIMESTAMP,
  }
}

// The pearl follows the middle of the viewport while the timeline passes it.
export function getTimelineProgress(top, height, viewportHeight) {
  if (height <= 0) return 0
  return Math.min(1, Math.max(0, (viewportHeight * 0.52 - top) / height))
}

export function getTimelineActiveIndex(pearlY, markers) {
  let active = -1
  let distance = Infinity
  markers.forEach((marker, index) => {
    const nextDistance = Math.abs(pearlY - marker)
    if (nextDistance < distance) { active = index; distance = nextDistance }
  })
  return active
}
