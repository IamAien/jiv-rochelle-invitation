import { useEffect } from 'react'

// One measurement per animation frame; nothing runs while the invitation is closed.
export function useScrollFrame(enabled, update) {
  useEffect(() => {
    if (!enabled) return
    let frame = 0
    const run = () => { frame = 0; update() }
    const queue = () => { if (!frame) frame = window.requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', queue)
    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(queue) : null
    observer?.observe(document.documentElement)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', queue)
      window.removeEventListener('resize', queue)
      observer?.disconnect()
    }
  }, [enabled, update])
}
