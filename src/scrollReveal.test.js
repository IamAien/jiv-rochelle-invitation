import test from 'node:test'
import assert from 'node:assert/strict'
import { setupScrollReveals } from './scrollReveal.js'

function makeScene() {
  const elements = Array.from({ length: 3 }, () => {
    const classes = new Set()
    const styles = new Map()
    return {
      classList: {
        add: (...names) => names.forEach(name => classes.add(name)),
        remove: (...names) => names.forEach(name => classes.delete(name)),
        contains: name => classes.has(name),
      },
      style: {
        setProperty: (name, value) => styles.set(name, value),
        removeProperty: name => styles.delete(name),
        getPropertyValue: name => styles.get(name) ?? '',
      },
    }
  })
  let observer
  class Observer {
    observed = new Set()
    disconnected = false
    constructor(callback) { this.callback = callback; observer = this }
    observe(element) { this.observed.add(element) }
    unobserve(element) { this.observed.delete(element) }
    disconnect() { this.disconnected = true; this.observed.clear() }
    enter(target, isIntersecting = true) { this.callback([{ target, isIntersecting }]) }
  }
  return {
    elements,
    root: { querySelectorAll: () => elements },
    Observer,
    observer: () => observer,
  }
}

test('reduced-motion visitors can read every block without waiting for scrolling', () => {
  const scene = makeScene()
  const cleanup = setupScrollReveals(scene.root, { Observer: scene.Observer, reducedMotion: true })
  assert.equal(scene.observer(), undefined)
  scene.elements.forEach(element => assert.equal(element.classList.contains('scroll-reveal'), false))
  cleanup()
})

test('browsers without IntersectionObserver retain readable content', () => {
  const scene = makeScene()
  setupScrollReveals(scene.root)
  scene.elements.forEach(element => assert.equal(element.classList.contains('scroll-reveal'), false))
})

test('a block reveals when it enters the viewport and remains visible when scrolling back', () => {
  const scene = makeScene()
  setupScrollReveals(scene.root, { Observer: scene.Observer })
  const [first, second] = scene.elements
  const observer = scene.observer()
  assert.ok(first.classList.contains('scroll-reveal'))
  observer.enter(first, false)
  assert.equal(first.classList.contains('is-revealed'), false)
  observer.enter(first)
  assert.ok(first.classList.contains('is-revealed'))
  assert.equal(observer.observed.has(first), false)
  assert.equal(second.classList.contains('is-revealed'), false)
  observer.enter(first, false)
  assert.ok(first.classList.contains('is-revealed'))
})

test('replaying the opening cleans up reveals and ignores late observer callbacks', () => {
  const scene = makeScene()
  const cleanup = setupScrollReveals(scene.root, { Observer: scene.Observer })
  const observer = scene.observer()
  observer.enter(scene.elements[0])
  cleanup()
  assert.ok(observer.disconnected)
  scene.elements.forEach(element => {
    assert.equal(element.classList.contains('scroll-reveal'), false)
    assert.equal(element.classList.contains('is-revealed'), false)
    assert.equal(element.style.getPropertyValue('--reveal-delay'), '')
  })
  observer.enter(scene.elements[1])
  assert.equal(scene.elements[1].classList.contains('is-revealed'), false)
})
