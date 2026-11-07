export const WEDDING_MUSIC = { path: 'audio/bruno-mars-risk-it-all.mp3', volume: .3 }

export function createWeddingMusicController(audio, { document: page = globalThis.document, onChange = () => {} } = {}) {
  let enabled = true
  let started = false
  let destroyed = false
  let unavailable = false
  let resumeWhenVisible = false
  let request = 0
  audio.volume = WEDDING_MUSIC.volume

  const report = () => {
    if (!destroyed) onChange({ playing: !audio.paused && !audio.ended && !unavailable, unavailable })
  }
  const canPlay = () => !destroyed && started && enabled && !unavailable && !page?.hidden
  const pause = () => { request++; audio.pause() }
  const play = async () => {
    if (!canPlay()) return false
    const attempt = ++request
    try {
      // Called directly from the envelope/button click to retain user activation.
      await audio.play()
      if (!canPlay()) { audio.pause(); return false }
      return attempt === request && !audio.paused
    } catch {
      // Browser playback restrictions leave the manual play control available.
      if (attempt === request) report()
      return false
    }
  }
  const onPlay = () => {
    if (!canPlay()) { audio.pause(); return }
    report()
  }
  const onError = () => { unavailable = true; resumeWhenVisible = false; pause(); report() }
  const onVisibility = () => {
    if (page.hidden) {
      resumeWhenVisible = started && enabled && !audio.paused
      pause()
    } else if (resumeWhenVisible) {
      resumeWhenVisible = false
      void play()
    }
  }
  audio.addEventListener('play', onPlay)
  audio.addEventListener('pause', report)
  audio.addEventListener('ended', report)
  audio.addEventListener('error', onError)
  page?.addEventListener('visibilitychange', onVisibility)

  return {
    start() { started = true; return play() },
    toggle() {
      if (destroyed || unavailable) return Promise.resolve(false)
      resumeWhenVisible = false
      if (!audio.paused) { enabled = false; pause(); return Promise.resolve(false) }
      enabled = true
      started = true
      return play()
    },
    reset() {
      started = false
      resumeWhenVisible = false
      pause()
      try { audio.currentTime = 0 } catch { /* The track may not have loaded yet. */ }
    },
    destroy() {
      destroyed = true
      started = false
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', report)
      audio.removeEventListener('ended', report)
      audio.removeEventListener('error', onError)
      page?.removeEventListener('visibilitychange', onVisibility)
      pause()
    },
  }
}
