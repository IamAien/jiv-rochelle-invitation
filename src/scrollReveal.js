const REVEAL_SELECTOR = [
  '.section h2',
  '.section h3',
  '.section p',
  '.section .event-note',
  '.section .story-signature',
  '.section .text-button',
  '.section .countdown-unit',
  '.section .timeline-art',
  '.section .swatches',
  '.section .monogram',
  '.section .replay-button',
].join(', ')

// Text is readable by default. Only supported, motion-enabled browsers enhance it.
export function setupScrollReveals(root, options = {}) {
  if (!root) return () => {}

  const view = root.ownerDocument?.defaultView ?? globalThis.window
  const Observer = options.Observer ?? view?.IntersectionObserver
  const reducedMotion = options.reducedMotion
    ?? view?.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    ?? false

  if (reducedMotion || typeof Observer !== 'function') return () => {}

  const elements = [...root.querySelectorAll(REVEAL_SELECTOR)]
  let disposed = false
  const observer = new Observer((entries) => {
    if (disposed) return

    entries
      .filter(entry => entry.isIntersecting && !entry.target.classList.contains('is-revealed'))
      .forEach(({ target }, index) => {
        target.style.setProperty('--reveal-delay', `${Math.min(index * 80, 240)}ms`)
        target.classList.add('is-revealed')
        observer.unobserve(target)
      })
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' })

  elements.forEach(element => {
    element.classList.add('scroll-reveal')
    observer.observe(element)
  })

  return () => {
    disposed = true
    observer.disconnect()
    elements.forEach(element => {
      element.classList.remove('scroll-reveal', 'is-revealed')
      element.style.removeProperty('--reveal-delay')
    })
  }
}
