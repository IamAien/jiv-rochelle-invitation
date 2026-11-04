import test from 'node:test'
import assert from 'node:assert/strict'
import { setupCoastalScene } from './coastalScene.js'

class TrackedTarget extends EventTarget {
  listeners = new Map()
  addEventListener(type, listener, options) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set())
    this.listeners.get(type).add(listener)
    super.addEventListener(type, listener, options)
  }
  removeEventListener(type, listener, options) {
    this.listeners.get(type)?.delete(listener)
    super.removeEventListener(type, listener, options)
  }
  emit(type) { this.dispatchEvent(new Event(type, { cancelable: true })) }
  get listenerCount() { return [...this.listeners.values()].reduce((count, listeners) => count + listeners.size, 0) }
}

function makeStyle() {
  return {
    setProperty(name, value) { this[name] = value },
    removeProperty(name) { delete this[name] },
    getPropertyValue(name) { return this[name] ?? '' },
  }
}

function makeElement() {
  const element = new TrackedTarget()
  const attributes = new Map()
  return Object.assign(element, {
    style: makeStyle(), clientWidth: 941, clientHeight: 1672,
    getBoundingClientRect: () => ({ top: 0, left: 0, right: 941, bottom: 1672, width: 941, height: 1672 }),
    setAttribute: (name, value) => attributes.set(name, value),
    removeAttribute: name => attributes.delete(name),
    hasAttribute: name => attributes.has(name),
    toggleAttribute(name, force = !attributes.has(name)) {
      if (force) attributes.set(name, '')
      else attributes.delete(name)
      return force
    },
  })
}

function makeScene({ loaded = true, reducedMotion = false, cachedFailure = false } = {}) {
  const container = makeElement()
  const stack = makeElement()
  const canvas = new TrackedTarget()
  const assets = Array.from({ length: 5 }, () => Object.assign(new TrackedTarget(), {
    complete: loaded, naturalWidth: loaded ? 941 : 0, naturalHeight: loaded ? 1672 : 0,
  }))
  if (cachedFailure) Object.assign(assets[1], { complete: true, naturalWidth: 0, naturalHeight: 0 })
  const [image] = assets
  const document = Object.assign(new TrackedTarget(), { visibilityState: 'visible' })
  const media = Object.assign(new TrackedTarget(), { matches: reducedMotion })
  const environment = Object.assign(new TrackedTarget(), {
    document, innerWidth: 941, innerHeight: 1672, devicePixelRatio: 1,
    matchMedia: () => media,
    getComputedStyle: () => ({ width: '941px', height: '1672px', objectFit: 'contain' }),
    ResizeObserver: undefined, IntersectionObserver: undefined,
  })
  const calls = { create: 0, resize: 0, play: 0, pause: 0, destroy: 0 }
  let playing = false
  const renderer = {
    resize() { calls.resize++ },
    play() { calls.play++; playing = true },
    pause() { calls.pause++; playing = false },
    destroy() { calls.destroy++; playing = false },
  }
  const readiness = []
  const controller = setupCoastalScene({
    container, image, stack, assets, canvas, environment,
    onReady: ready => readiness.push(ready),
    createWaterRenderer: () => { calls.create++; return renderer },
  })
  return {
    container, stack, canvas, assets, document, media, environment, calls, readiness, controller,
    readyCount: () => readiness.filter(Boolean).length,
    playing: () => playing,
    load(asset) { Object.assign(asset, { complete: true, naturalWidth: 941, naturalHeight: 1672 }); asset.emit('load') },
    targets: [container, stack, canvas, ...assets, document, media, environment],
  }
}

test('the complete coastal composition is prepared while motion is still paused', () => {
  const scene = makeScene()
  assert.ok(scene.container.hasAttribute('data-layers-ready'))
  assert.equal(scene.container.hasAttribute('data-motion-running'), false)
  assert.equal(scene.calls.create, 1)
  assert.equal(scene.calls.play, 0)
  assert.equal(scene.playing(), false)
  assert.equal(scene.readyCount(), 1)
  scene.controller.destroy()
})

test('starting and pausing motion keeps the prepared layers and renderer in place', () => {
  const scene = makeScene()
  scene.controller.setEnabled(true)
  assert.ok(scene.playing())
  assert.ok(scene.container.hasAttribute('data-motion-running'))
  scene.controller.setEnabled(false)
  assert.equal(scene.playing(), false)
  assert.equal(scene.container.hasAttribute('data-motion-running'), false)
  assert.ok(scene.container.hasAttribute('data-layers-ready'))
  assert.equal(scene.calls.create, 1)
  assert.equal(scene.calls.destroy, 0)
  scene.controller.setEnabled(true)
  assert.ok(scene.playing())
  assert.equal(scene.calls.create, 1)
  assert.equal(scene.readyCount(), 1)
  scene.controller.destroy()
})

test('readiness waits for every coastal asset before exposing the composition', () => {
  const scene = makeScene({ loaded: false })
  assert.equal(scene.readyCount(), 0)
  assert.equal(scene.calls.create, 0)
  assert.equal(scene.container.hasAttribute('data-layers-ready'), false)
  for (const asset of scene.assets.slice(0, -1)) scene.load(asset)
  assert.equal(scene.readyCount(), 0)
  assert.equal(scene.container.hasAttribute('data-layers-ready'), false)
  scene.load(scene.assets.at(-1))
  assert.equal(scene.readyCount(), 1)
  assert.ok(scene.container.hasAttribute('data-layers-ready'))
  assert.equal(scene.calls.create, 1)
  assert.equal(scene.playing(), false)
  scene.environment.emit('resize')
  assert.equal(scene.readyCount(), 1)
  scene.controller.destroy()
})

test('a failed overlay asset unlocks the original-image fallback instead of blocking the envelope', () => {
  const scene = makeScene({ loaded: false })
  scene.load(scene.assets[0])
  scene.assets[1].emit('error')
  assert.equal(scene.readyCount(), 1)
  assert.equal(scene.container.hasAttribute('data-layers-ready'), false)
  scene.controller.setEnabled(true)
  assert.equal(scene.calls.create, 0)
  assert.equal(scene.playing(), false)
  assert.equal(scene.container.hasAttribute('data-motion-running'), false)
  scene.controller.destroy()
})

test('resizing before the original image loads waits for valid image dimensions', () => {
  const scene = makeScene({ loaded: false })
  const resizeListeners = scene.environment.listeners.get('resize')
  assert.ok(resizeListeners?.size)
  for (const resize of resizeListeners) assert.doesNotThrow(() => resize(new Event('resize')))
  assert.equal(scene.readyCount(), 0)
  assert.equal(scene.calls.create, 0)
  scene.assets.forEach(asset => scene.load(asset))
  assert.equal(scene.readyCount(), 1)
  assert.ok(scene.container.hasAttribute('data-layers-ready'))
  scene.controller.destroy()
})

test('an already failed cached overlay uses the fallback without waiting for another error event', () => {
  const scene = makeScene({ cachedFailure: true })
  assert.equal(scene.readyCount(), 1)
  assert.equal(scene.container.hasAttribute('data-layers-ready'), false)
  scene.controller.setEnabled(true)
  assert.equal(scene.calls.create, 0)
  assert.equal(scene.playing(), false)
  scene.assets[1].emit('error')
  assert.equal(scene.readyCount(), 1)
  scene.controller.destroy()
})

test('the reduced-motion fallback still unlocks the invitation and stays paused', () => {
  const scene = makeScene({ reducedMotion: true })
  assert.equal(scene.readyCount(), 1)
  scene.controller.setEnabled(true)
  assert.equal(scene.playing(), false)
  assert.equal(scene.calls.create, 0)
  assert.equal(scene.container.hasAttribute('data-motion-running'), false)
  scene.controller.destroy()
})

test('a hidden tab pauses motion without changing the prepared composition', () => {
  const scene = makeScene()
  scene.controller.setEnabled(true)
  scene.document.visibilityState = 'hidden'
  scene.document.emit('visibilitychange')
  assert.equal(scene.playing(), false)
  assert.ok(scene.container.hasAttribute('data-layers-ready'))
  assert.equal(scene.container.hasAttribute('data-motion-running'), false)
  scene.document.visibilityState = 'visible'
  scene.document.emit('visibilitychange')
  assert.ok(scene.playing())
  assert.equal(scene.calls.create, 1)
  assert.equal(scene.readyCount(), 1)
  scene.controller.destroy()
})

test('destroy stops the scene, removes listeners and ignores late asset events', () => {
  const scene = makeScene()
  scene.controller.setEnabled(true)
  assert.ok(scene.targets.some(target => target.listenerCount > 0))
  scene.controller.destroy()
  assert.equal(scene.playing(), false)
  assert.equal(scene.calls.destroy, 1)
  assert.equal(scene.container.hasAttribute('data-motion-running'), false)
  assert.ok(scene.targets.every(target => target.listenerCount === 0))
  const callsAfterDestroy = { ...scene.calls }
  const readinessAfterDestroy = [...scene.readiness]
  scene.assets.forEach(asset => asset.emit('load'))
  scene.environment.emit('resize')
  scene.document.emit('visibilitychange')
  assert.deepEqual(scene.calls, callsAfterDestroy)
  assert.deepEqual(scene.readiness, readinessAfterDestroy)
})
