import { createCoastalWaterRenderer, getCoastalElementSize, getCoastalImageLayout } from './coastalMotion.js'

// The envelope and page prepare the same still frame before playback starts.
export function setupCoastalScene({ container, image, stack, foreground, assets, canvas, onReady, createWaterRenderer = createCoastalWaterRenderer, environment = window }) {
  const document = environment.document
  const reducedMotion = environment.matchMedia('(prefers-reduced-motion: reduce)')
  let renderer = null
  let enabled = false
  let inView = container.getBoundingClientRect().bottom > 0
  let waterUnavailable = false
  let layerFailed = assets.some(asset => asset.complete && !asset.naturalWidth)
  let contextLost = false
  let printing = false
  let notified = false
  let destroyed = false

  const notifyReady = () => {
    if (notified) return
    notified = true
    onReady?.(true)
  }
  const resize = () => {
    if (destroyed || !image.naturalWidth || !image.naturalHeight) return
    const { width, height } = getCoastalElementSize(container, environment)
    if (!width || !height) return
    const layout = getCoastalImageLayout({ width, height, imageWidth: image.naturalWidth, imageHeight: image.naturalHeight, fit: environment.getComputedStyle(image).objectFit })
    for (const layer of [stack, foreground].filter(Boolean)) {
      Object.assign(layer.style, { width: `${layout.width}px`, height: `${layout.height}px`, left: `${layout.left}px`, top: `${layout.top}px` })
    }
    renderer?.resize()
  }
  const sync = () => {
    if (destroyed) return
    const ready = assets.every(asset => asset.complete && asset.naturalWidth)
    if (!ready && !layerFailed) return
    if (ready) resize()
    if (layerFailed || reducedMotion.matches || printing) {
      renderer?.pause()
      container.removeAttribute('data-layers-ready')
      container.removeAttribute('data-motion-running')
      notifyReady()
      return
    }
    container.setAttribute('data-layers-ready', '')
    if (!renderer && !waterUnavailable && !contextLost) {
      try {
        renderer = createWaterRenderer(canvas, image, stack)
        if (!renderer) waterUnavailable = true
        else container.setAttribute('data-water-ready', '')
      } catch (error) {
        waterUnavailable = true
        console.warn('The coastal water is using its still-image fallback.', error)
      }
    }
    const running = enabled && inView && document.visibilityState !== 'hidden'
    container.toggleAttribute('data-motion-running', running)
    if (running) renderer?.play()
    else renderer?.pause()
    notifyReady()
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
  const resizeObserver = environment.ResizeObserver ? new environment.ResizeObserver(resize) : null
  const visibilityObserver = environment.IntersectionObserver ? new environment.IntersectionObserver(entries => { inView = entries[0].isIntersecting; sync() }) : null
  resizeObserver?.observe(container)
  visibilityObserver?.observe(container)
  assets.forEach(asset => { asset.addEventListener('load', sync); asset.addEventListener('error', failed) })
  reducedMotion.addEventListener('change', sync)
  document.addEventListener('visibilitychange', sync)
  environment.addEventListener('resize', resize)
  environment.addEventListener('beforeprint', beforePrint)
  environment.addEventListener('afterprint', afterPrint)
  canvas.addEventListener('webglcontextlost', lost)
  canvas.addEventListener('webglcontextrestored', restored)
  sync()

  return {
    setEnabled(value) { enabled = value; sync() },
    destroy() {
      if (destroyed) return
      destroyed = true
      renderer?.destroy()
      for (const name of ['data-layers-ready', 'data-motion-running', 'data-water-ready']) container.removeAttribute(name)
      resizeObserver?.disconnect()
      visibilityObserver?.disconnect()
      assets.forEach(asset => { asset.removeEventListener('load', sync); asset.removeEventListener('error', failed) })
      reducedMotion.removeEventListener('change', sync)
      document.removeEventListener('visibilitychange', sync)
      environment.removeEventListener('resize', resize)
      environment.removeEventListener('beforeprint', beforePrint)
      environment.removeEventListener('afterprint', afterPrint)
      canvas.removeEventListener('webglcontextlost', lost)
      canvas.removeEventListener('webglcontextrestored', restored)
    },
  }
}
