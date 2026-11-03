import { useEffect, useRef } from 'react'
import { INVITATION_ARTWORK } from '../invitationArtwork.js'
import { createCoastalRenderer } from '../coastalMotion.js'
import './CoastalScene.css'

export default function CoastalScene({ enabled }) {
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!enabled) return
    const container = containerRef.current
    const image = imageRef.current
    const canvas = canvasRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let renderer = null
    let inView = container.getBoundingClientRect().bottom > 0
    let failed = false
    let contextLost = false
    let printing = false

    const sync = () => {
      if (reducedMotion.matches || printing) {
        renderer?.pause()
        container.removeAttribute('data-motion-ready')
        return
      }
      if (!image.complete || !image.naturalWidth || failed || contextLost) return
      if (!renderer) {
        try {
          renderer = createCoastalRenderer(canvas, image, container)
          if (!renderer) { failed = true; return }
        } catch (error) {
          failed = true
          console.warn('The coastal illustration is using its still-image fallback.', error)
          return
        }
      }
      container.setAttribute('data-motion-ready', '')
      if (inView && document.visibilityState !== 'hidden') renderer.play()
      else renderer.pause()
    }
    const resize = () => renderer?.resize()
    const lost = event => {
      event.preventDefault()
      contextLost = true
      renderer?.destroy()
      renderer = null
      container.removeAttribute('data-motion-ready')
    }
    const restored = () => { contextLost = false; failed = false; sync() }
    const beforePrint = () => { printing = true; sync() }
    const afterPrint = () => { printing = false; sync() }
    const resizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(resize) : null
    const visibilityObserver = typeof IntersectionObserver === 'function' ? new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting
      sync()
    }) : null
    resizeObserver?.observe(container)
    visibilityObserver?.observe(container)
    image.addEventListener('load', sync)
    reducedMotion.addEventListener('change', sync)
    document.addEventListener('visibilitychange', sync)
    window.addEventListener('resize', resize)
    window.addEventListener('beforeprint', beforePrint)
    window.addEventListener('afterprint', afterPrint)
    canvas.addEventListener('webglcontextlost', lost)
    canvas.addEventListener('webglcontextrestored', restored)
    sync()

    return () => {
      renderer?.destroy()
      container.removeAttribute('data-motion-ready')
      resizeObserver?.disconnect()
      visibilityObserver?.disconnect()
      image.removeEventListener('load', sync)
      reducedMotion.removeEventListener('change', sync)
      document.removeEventListener('visibilitychange', sync)
      window.removeEventListener('resize', resize)
      window.removeEventListener('beforeprint', beforePrint)
      window.removeEventListener('afterprint', afterPrint)
      canvas.removeEventListener('webglcontextlost', lost)
      canvas.removeEventListener('webglcontextrestored', restored)
    }
  }, [enabled])

  return <div className="coastal-scene" ref={containerRef}>
    <img ref={imageRef} className="villa-art" src={INVITATION_ARTWORK.src} width={INVITATION_ARTWORK.width} height={INVITATION_ARTWORK.height}
      alt="Embroidered coastal villa and flower-filled garden overlooking the blue sea, framed by ivory blossoms on warm linen" fetchPriority="high" />
    <canvas ref={canvasRef} className="coastal-motion-canvas" aria-hidden="true" />
  </div>
}
