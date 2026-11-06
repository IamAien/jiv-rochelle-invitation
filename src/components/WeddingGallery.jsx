import { useCallback, useEffect, useRef, useState } from 'react'
import { createScratchGrid, getPhotoSource, getPhotoSwipe, MEMORY_PHOTOS, recordScratchStroke, REVEAL_PHOTOS, wrapPhotoIndex } from '../gallery.js'
import './WeddingGallery.css'
import Ampersand from './Ampersand.jsx'
import ovalFrame from '../assets/oval-photo-frame.webp'
import slenderPetal from '../assets/coastal-layers/soft-petal-slender.webp'
import roundedPetal from '../assets/coastal-layers/soft-petal-rounded.webp'
import curledPetal from '../assets/coastal-layers/soft-petal-curled.webp'

const FRAME_PETALS = [
  { src: slenderPetal, left: 20, width: 6.2, seconds: 52, delay: 1, drift: 32, gust: 5, angle: -25, flutter: 5.4 },
  { src: roundedPetal, left: 32, width: 7, seconds: 52, delay: 10, drift: 24, gust: -7, angle: 40, flutter: 7.2 },
  { src: curledPetal, left: 45, width: 6.7, seconds: 52, delay: 22, drift: 28, gust: 8, angle: -55, flutter: 6.1 },
  { src: slenderPetal, left: 16, width: 5.7, seconds: 52, delay: 31, drift: 38, gust: -4, angle: 65, flutter: 8.3 },
  { src: roundedPetal, left: 38, width: 6.6, seconds: 52, delay: 43, drift: 26, gust: 6, angle: -40, flutter: 6.6 },
]

function FramePetals() {
  const layerRef = useRef(null)
  useEffect(() => {
    const layer = layerRef.current
    let inView = typeof IntersectionObserver !== 'function'
    const update = () => layer.toggleAttribute('data-running', inView && !document.hidden)
    const observer = typeof IntersectionObserver === 'function' ? new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      update()
    }) : null
    observer?.observe(layer)
    document.addEventListener('visibilitychange', update)
    update()
    return () => { observer?.disconnect(); document.removeEventListener('visibilitychange', update) }
  }, [])
  return <div ref={layerRef} className="memory-frame-petals" aria-hidden="true">
    {FRAME_PETALS.map((petal, index) => <span key={index} className="memory-frame-petal" style={{
      left: `${petal.left}%`, width: `${petal.width}%`, animationDuration: `${petal.seconds}s`, animationDelay: `${petal.delay}s`,
      '--frame-petal-drift': `${petal.drift}cqw`, '--frame-petal-gust': `${petal.gust}cqw`, '--frame-petal-angle': `${petal.angle}deg`, '--frame-petal-flutter': `${petal.flutter}s`,
    }}><img src={petal.src} alt="" loading="lazy" draggable="false" /></span>)}
  </div>
}

function GalleryPhoto({ photo, decorative = false, tone = 0 }) {
  const [failed, setFailed] = useState(false)
  const source = getPhotoSource(photo.src, import.meta.env.BASE_URL)
  if (source && !failed) return <img src={source} alt={decorative ? '' : photo.alt || photo.caption} loading="lazy" decoding="async" draggable="false" onError={() => setFailed(true)} />
  return <div className={`photo-placeholder placeholder-tone-${tone % 3}`} role={decorative ? undefined : 'img'} aria-label={decorative ? undefined : `${photo.caption} — photo coming soon`}>
    <span className="placeholder-stitch" aria-hidden="true" />
    <span className="placeholder-monogram" aria-hidden="true">J<Ampersand />R</span>
    <span className="placeholder-note" aria-hidden="true">Photo coming soon</span>
  </div>
}

function RevealPhoto({ photo }) {
  const canvasRef = useRef(null)
  const scratch = useRef({ grid: null, last: null, pointer: null, revealed: false })
  const [revealed, setRevealed] = useState(false)

  const reveal = useCallback(() => {
    scratch.current.revealed = true
    scratch.current.last = null
    setRevealed(true)
  }, [])

  const paint = useCallback((preserve = false) => {
    const canvas = canvasRef.current
    if (!canvas || scratch.current.revealed) return
    const bounds = canvas.getBoundingClientRect()
    if (bounds.width <= 0 || bounds.height <= 0) return
    const context = canvas.getContext('2d')
    if (!context) { reveal(); return }
    // Preserve the brushed area across orientation or container-size changes.
    const previous = preserve && scratch.current.grid ? document.createElement('canvas') : null
    if (previous) {
      previous.width = canvas.width
      previous.height = canvas.height
      previous.getContext('2d').drawImage(canvas, 0, 0)
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.round(bounds.width * dpr)
    canvas.height = Math.round(bounds.height * dpr)
    context.setTransform(dpr, 0, 0, dpr, 0, 0)
    if (previous) {
      context.drawImage(previous, 0, 0, bounds.width, bounds.height)
      scratch.current.grid.width = bounds.width
      scratch.current.grid.height = bounds.height
      scratch.current.last = null
      return
    }
    const { width, height } = bounds
    context.fillStyle = '#f5ead8'
    context.fillRect(0, 0, width, height)
    context.lineWidth = 0.6
    for (let x = 0; x < width; x += 4) {
      context.strokeStyle = x % 8 === 0 ? '#ffffff24' : '#8376600c'
      context.beginPath(); context.moveTo(x, 0); context.lineTo(x, height); context.stroke()
    }
    for (let y = 0; y < height; y += 4) {
      context.strokeStyle = '#ffffff26'
      context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke()
    }
    context.strokeStyle = '#8d897688'
    context.setLineDash([3, 5])
    context.lineWidth = 1
    context.beginPath()
    context.ellipse(width / 2, height / 2, width * .43, height * .43, 0, 0, Math.PI * 2)
    context.stroke()
    context.setLineDash([])
    context.fillStyle = '#665b49'
    context.textAlign = 'center'
    context.font = `italic ${Math.max(21, Math.min(36, width / 10))}px Georgia, serif`
    context.fillText('Brush to reveal', width / 2, height / 2)
    context.font = '10px Georgia, serif'
    context.fillText('Jiv & Rochelle', width / 2, height / 2 + 32)
    scratch.current.grid = createScratchGrid(width, height, 'ellipse')
    scratch.current.last = null
  }, [reveal])

  useEffect(() => {
    paint()
    const resize = () => paint(true)
    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(resize) : null
    observer?.observe(canvasRef.current)
    if (!observer) window.addEventListener('resize', resize)
    return () => { observer?.disconnect(); window.removeEventListener('resize', resize) }
  }, [paint])

  const brush = event => {
    const state = scratch.current
    if (state.revealed || !state.grid) return
    if (event.pointerType !== 'mouse' && event.pointerId !== state.pointer) return
    const canvas = canvasRef.current
    const bounds = canvas.getBoundingClientRect()
    const point = { x: event.clientX - bounds.left, y: event.clientY - bounds.top }
    const from = state.last || point
    const radius = Math.max(22, bounds.width / 9)
    const context = canvas.getContext('2d')
    context.globalCompositeOperation = 'destination-out'
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.lineWidth = radius * 2
    context.beginPath()
    context.moveTo(from.x, from.y)
    context.lineTo(point.x + 0.01, point.y)
    context.stroke()
    state.last = point
    if (recordScratchStroke(state.grid, from, point, radius) >= 0.45) reveal()
  }
  const down = event => {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return
    scratch.current.pointer = event.pointerId
    scratch.current.last = null
    event.currentTarget.setPointerCapture?.(event.pointerId)
    brush(event)
  }
  const stop = () => { scratch.current.pointer = null; scratch.current.last = null }
  const cover = () => {
    scratch.current.revealed = false
    scratch.current.grid = null
    setRevealed(false)
    paint()
  }

  return <figure className={`memory-reveal-card ${revealed ? 'is-revealed' : ''}`}>
    <div className="memory-framed-art">
      <div className="memory-photo-window">
        <GalleryPhoto key={photo.src} photo={photo} />
        <canvas className="memory-veil" ref={canvasRef} aria-hidden="true" onPointerDown={down} onPointerMove={brush} onPointerUp={stop} onPointerCancel={stop} onPointerLeave={stop} />
        <FramePetals />
      </div>
      <img className="memory-oval-frame" src={ovalFrame} width="1054" height="1492" alt="" aria-hidden="true" loading="lazy" draggable="false" />
    </div>
    <figcaption className="memory-reveal-caption">
      <span>{photo.caption}</span>
      <button type="button" onClick={revealed ? cover : reveal} aria-label={`${revealed ? 'Cover' : 'Reveal'} photo: ${photo.caption}`}>{revealed ? 'Cover again' : 'Reveal photo'}<span aria-hidden="true">{revealed ? '↺' : '+'}</span></button>
    </figcaption>
  </figure>
}

function MemoryStack({ photos }) {
  const [index, setIndex] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const deck = useRef(null)
  const drag = useRef(null)
  const timer = useRef(null)
  const busy = useRef(false)
  const rotations = [-3, 3, -2, 2, -1]

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const resetDrag = () => {
    drag.current = null
    const node = deck.current
    if (!node) return
    delete node.dataset.dragging
    node.style.setProperty('--drag-x', '0px')
    node.style.setProperty('--drag-turn', '0deg')
  }
  const change = direction => {
    if (busy.current || photos.length < 2) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finish = () => {
      setIndex(current => wrapPhotoIndex(current + direction, photos.length))
      resetDrag()
      setLeaving(false)
      busy.current = false
    }
    if (reduced) { finish(); return }
    busy.current = true
    setLeaving(true)
    delete deck.current.dataset.dragging
    deck.current.style.setProperty('--drag-x', `${-direction * deck.current.clientWidth * 0.85}px`)
    deck.current.style.setProperty('--drag-turn', `${-direction * 9}deg`)
    timer.current = window.setTimeout(finish, 280)
  }
  const down = event => {
    if (busy.current || !event.isPrimary || event.button !== 0 || photos.length < 2) return
    drag.current = { pointer: event.pointerId, x: event.clientX, delta: 0 }
    event.currentTarget.setPointerCapture?.(event.pointerId)
    event.currentTarget.dataset.dragging = 'true'
  }
  const move = event => {
    if (!drag.current || drag.current.pointer !== event.pointerId) return
    const delta = event.clientX - drag.current.x
    drag.current.delta = delta
    deck.current.style.setProperty('--drag-x', `${delta}px`)
    deck.current.style.setProperty('--drag-turn', `${Math.max(-12, Math.min(12, delta / 18))}deg`)
  }
  const up = event => {
    if (!drag.current || drag.current.pointer !== event.pointerId) return
    const delta = drag.current.delta
    drag.current = null
    delete deck.current.dataset.dragging
    const direction = getPhotoSwipe(delta, deck.current.clientWidth)
    if (direction) change(direction)
    else resetDrag()
  }
  const cancel = () => { if (!busy.current) resetDrag() }

  if (!photos.length) return null
  return <div className="memory-album" role="region" aria-roledescription="carousel" aria-labelledby="album-title">
    <p className="eyebrow">The little things, kept close</p>
    <h3 id="album-title" className="album-title">Shuffle the <em>memories</em></h3>
    <div className={`memory-stack ${leaving ? 'is-leaving' : ''}`} ref={deck} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={cancel} onLostPointerCapture={cancel}>
      {Array.from({ length: Math.min(4, photos.length) }, (_, position) => {
        const photoIndex = wrapPhotoIndex(index + position, photos.length)
        const photo = photos[photoIndex]
        return <figure key={photoIndex} className={`memory-stack-card ${position === 0 ? 'is-front' : ''}`} aria-hidden={position !== 0 ? true : undefined} style={{ '--card-rotation': `${rotations[photoIndex % rotations.length]}deg`, '--card-offset': `${position * 7}px`, '--card-scale': 1 - position * 0.035, zIndex: 4 - position }}>
          <div className="memory-stack-photo"><GalleryPhoto key={photo.src} photo={photo} decorative={position !== 0} tone={photoIndex} /></div>
          <figcaption>{photo.caption}</figcaption>
        </figure>
      })}
    </div>
    <p className="album-hint">Drag a photo sideways to turn the page.</p>
    <div className="album-controls">
      <button type="button" onClick={() => change(-1)} disabled={leaving || photos.length < 2} aria-label="Previous memory"><span aria-hidden="true">←</span> Previous</button>
      <span className="album-counter" aria-hidden="true">{String(index + 1).padStart(2, '0')} <i>/</i> {String(photos.length).padStart(2, '0')}</span>
      <button type="button" onClick={() => change(1)} disabled={leaving || photos.length < 2} aria-label="Next memory">Next memory <span aria-hidden="true">→</span></button>
    </div>
    <span className="sr-only" role="status">{photos[index].caption}, photo {index + 1} of {photos.length}</span>
  </div>
}

export default function WeddingGallery() {
  return <section className="gallery-section section" id="moments" aria-labelledby="gallery-title">
    <p className="eyebrow">Our moments</p>
    <h2 id="gallery-title">Little moments.<br /><em>A love to keep.</em></h2>
    <p className="section-intro">A few pages from our story, with many more to come.</p>
    <div className="memory-reveal-grid">{REVEAL_PHOTOS.map(photo => <RevealPhoto key={photo.caption} photo={photo} />)}</div>
    <div className="flourish gallery-flourish" aria-hidden="true"><span /><i /><span /></div>
    <MemoryStack photos={MEMORY_PHOTOS} />
  </section>
}
