import { useEffect, useRef } from 'react'
import { COASTAL_LAYER_ARTWORK, INVITATION_ARTWORK } from '../invitationArtwork.js'
import { COASTAL_BIRDS, COASTAL_CLOUDS, COASTAL_PLANT_REGIONS, createCoastalWaterRenderer, getCoastalImageLayout } from '../coastalMotion.js'
import './CoastalScene.css'

export default function CoastalScene({ enabled }) {
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const stackRef = useRef(null)
  const plantsRef = useRef(null)
  const cloudRef = useRef(null)
  const birdRef = useRef(null)
  const skyRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!enabled) return
    const container = containerRef.current
    const image = imageRef.current
    const stack = stackRef.current
    const plants = plantsRef.current
    const cloud = cloudRef.current
    const bird = birdRef.current
    const sky = skyRef.current
    const canvas = canvasRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const assets = [image, plants, cloud, bird, sky]
    let renderer = null
    let inView = container.getBoundingClientRect().bottom > 0
    let waterUnavailable = false
    let layerFailed = false
    let contextLost = false
    let printing = false

    const resize = () => {
      const { width, height } = container.getBoundingClientRect()
      if (!width || !height) return
      const layout = getCoastalImageLayout({
        width, height, imageWidth: INVITATION_ARTWORK.width, imageHeight: INVITATION_ARTWORK.height,
        fit: window.getComputedStyle(image).objectFit,
      })
      Object.assign(stack.style, { width: `${layout.width}px`, height: `${layout.height}px`, left: `${layout.left}px`, top: `${layout.top}px` })
      renderer?.resize()
    }
    const sync = () => {
      const motionAllowed = !reducedMotion.matches && !printing && !layerFailed
      const ready = assets.every(asset => asset.complete && asset.naturalWidth)
      if (!motionAllowed || !ready) {
        renderer?.pause()
        container.removeAttribute('data-layers-ready')
        container.removeAttribute('data-motion-running')
        return
      }
      resize()
      container.setAttribute('data-layers-ready', '')
      const running = inView && document.visibilityState !== 'hidden'
      container.toggleAttribute('data-motion-running', running)
      if (!renderer && !waterUnavailable && !contextLost) {
        try {
          renderer = createCoastalWaterRenderer(canvas, image, stack)
          if (!renderer) waterUnavailable = true
          else container.setAttribute('data-water-ready', '')
        } catch (error) {
          waterUnavailable = true
          console.warn('The coastal water is using its still-image fallback.', error)
        }
      }
      if (running) renderer?.play()
      else renderer?.pause()
    }
    const failed = () => { layerFailed = true; sync() }
    const lost = event => {
      event.preventDefault()
      contextLost = true
      renderer?.destroy()
      renderer = null
      container.removeAttribute('data-water-ready')
    }
    const restored = () => { contextLost = false; waterUnavailable = false; sync() }
    const beforePrint = () => { printing = true; sync() }
    const afterPrint = () => { printing = false; sync() }
    const resizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(resize) : null
    const visibilityObserver = typeof IntersectionObserver === 'function' ? new IntersectionObserver(entries => { inView = entries[0].isIntersecting; sync() }) : null
    resizeObserver?.observe(container)
    visibilityObserver?.observe(container)
    assets.forEach(asset => { asset.addEventListener('load', sync); asset.addEventListener('error', failed) })
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
      for (const name of ['data-layers-ready', 'data-motion-running', 'data-water-ready']) container.removeAttribute(name)
      resizeObserver?.disconnect()
      visibilityObserver?.disconnect()
      assets.forEach(asset => { asset.removeEventListener('load', sync); asset.removeEventListener('error', failed) })
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
    <img ref={plantsRef} className="coastal-art-preload" src={COASTAL_LAYER_ARTWORK.plants} alt="" aria-hidden="true" />
    <img ref={birdRef} className="coastal-art-preload" src={COASTAL_LAYER_ARTWORK.bird} alt="" aria-hidden="true" />
    <div ref={stackRef} className="coastal-layer-stack" style={{ '--coastal-plants': `url(${COASTAL_LAYER_ARTWORK.plants})`, '--coastal-bird': `url(${COASTAL_LAYER_ARTWORK.bird})` }} aria-hidden="true">
      <img ref={skyRef} className="coastal-sky-plate" src={COASTAL_LAYER_ARTWORK.sky} alt="" />
      <canvas ref={canvasRef} className="coastal-water-canvas" aria-hidden="true" />
      {COASTAL_CLOUDS.map((cloud, index) => <img key={index} ref={index === 0 ? cloudRef : undefined} className="coastal-cloud" src={COASTAL_LAYER_ARTWORK.cloud} alt="" style={{
        left: `${cloud.left}%`, top: `${cloud.top}%`, width: `${cloud.width}%`,
        animationDuration: `${cloud.seconds}s`, animationDelay: `${cloud.delay}s`,
      }} />)}
      {COASTAL_BIRDS.map((bird, index) => <div key={index} className="coastal-bird" style={{
        left: `${bird.left}%`, top: `${bird.top}%`, width: `${bird.width}%`,
        animationDuration: `${bird.seconds}s`, animationDelay: `${bird.delay}s`, '--wing-period': `${bird.wing}s`,
      }}>
        <span className="coastal-bird-part coastal-bird-wing coastal-bird-wing-left" />
        <span className="coastal-bird-part coastal-bird-wing coastal-bird-wing-right" />
        <span className="coastal-bird-part coastal-bird-body" />
      </div>)}
      {COASTAL_PLANT_REGIONS.map(region => <div key={region.name} className="coastal-plant-placement" style={{
        transform: `translate(${region.x}%, ${region.y}%) scale(${region.scale})`, transformOrigin: region.anchor,
      }}>
        <div className="coastal-plant-layer" data-corner={region.name} style={{
          clipPath: region.clip, transformOrigin: region.origin,
          '--sway-positive': `${region.positive}deg`, '--sway-negative': `${region.negative}deg`,
          animationDuration: `${region.seconds}s`, animationDelay: `${region.delay}s`,
        }} />
      </div>)}
    </div>
  </div>
}
