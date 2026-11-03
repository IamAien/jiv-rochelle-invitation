import { useId, useLayoutEffect, useRef } from 'react'
import { CEREMONY_ARTWORKS } from '../ceremonyArtwork.js'
import { getFountainReveal, imageTransform } from '../fountainReveal.js'

export default function FountainReveal({ scene, sceneKey, artboardRef, destinationRef }) {
  const layerRef = useRef(null)
  const apertureId = `fountain-aperture-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const artwork = CEREMONY_ARTWORKS[sceneKey]

  useLayoutEffect(() => {
    const layer = layerRef.current
    const artboard = artboardRef.current
    const destination = destinationRef?.current
    if (!layer || !artboard || !destination) return
    let frame = 0
    const measure = () => {
      frame = 0
      const viewport = layer.getBoundingClientRect()
      const picture = destination.getBoundingClientRect()
      const board = artboard.getBoundingClientRect()
      if (Math.min(viewport.width, viewport.height, picture.width, picture.height) <= 0) return
      const placement = getFountainReveal({
        entrance: scene, artwork,
        artboard: { left: board.left - viewport.left, top: board.top - viewport.top, width: board.width, height: board.height },
        viewport: { width: viewport.width, height: viewport.height },
        destination: { left: picture.left - viewport.left, top: picture.top - viewport.top, width: picture.width, height: picture.height },
      })
      layer.style.setProperty('--fountain-from', imageTransform(placement.from))
      layer.style.setProperty('--fountain-to', imageTransform(placement.to))
      const windowTransform = zoom => {
        const x = placement.target.x + (board.left - viewport.left - placement.target.x) * zoom
        const y = placement.target.y + (board.top - viewport.top - placement.target.y) * zoom
        return `matrix(${board.width / scene.width * zoom}, 0, 0, ${board.height / scene.height * zoom}, ${x}, ${y})`
      }
      layer.style.setProperty('--fountain-window-from', windowTransform(1))
      layer.style.setProperty('--fountain-window-mid', windowTransform(1.04))
      layer.style.setProperty('--fountain-window-to', windowTransform(1.4))
      layer.classList.add('is-positioned')
    }
    const queue = () => { if (!frame) frame = window.requestAnimationFrame(measure) }
    measure()
    queue()
    window.addEventListener('resize', queue)
    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(queue) : null
    observer?.observe(artboard)
    observer?.observe(destination)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', queue)
      observer?.disconnect()
    }
  }, [scene, artwork, artboardRef, destinationRef])

  return <div className="entrance-fountain-reveal" ref={layerRef} aria-hidden="true">
    <svg className="entrance-fountain-scene" width="100%" height="100%" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={apertureId} clipPathUnits="userSpaceOnUse">
          <path className="entrance-fountain-window" d={scene.outline} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${apertureId})`}>
        <image className="entrance-fountain-image" href={artwork.revealSrc ?? artwork.src} width={artwork.width} height={artwork.height} />
      </g>
    </svg>
  </div>
}
