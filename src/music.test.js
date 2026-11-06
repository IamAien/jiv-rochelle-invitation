import test from 'node:test'
import assert from 'node:assert/strict'
import { createWeddingMusicController, WEDDING_MUSIC } from './music.js'

class Audio extends EventTarget {
  paused = true
  ended = false
  currentTime = 0
  playCalls = 0
  play() {
    this.playCalls++
    if (this.behavior) return this.behavior()
    this.paused = false
    this.dispatchEvent(new Event('play'))
    return Promise.resolve()
  }
  pause() {
    if (this.paused) return
    this.paused = true
    this.dispatchEvent(new Event('pause'))
  }
}
class Page extends EventTarget {
  hidden = false
  hide(hidden) { this.hidden = hidden; this.dispatchEvent(new Event('visibilitychange')) }
}
function setup() {
  const audio = new Audio()
  const page = new Page()
  const states = []
  const controller = createWeddingMusicController(audio, { document: page, onChange: state => states.push(state) })
  return { audio, page, states, controller }
}

test('music stays silent until opening and starts at a gentle volume', async () => {
  const { audio, states, controller } = setup()
  assert.equal(audio.playCalls, 0)
  assert.equal(audio.volume, WEDDING_MUSIC.volume)
  assert.equal(await controller.start(), true)
  assert.deepEqual(states.at(-1), { playing: true, unavailable: false })
  controller.destroy()
})

test('blocked browser playback remains off and can be retried from the music button', async () => {
  const { audio, states, controller } = setup()
  audio.behavior = () => Promise.reject(new DOMException('Interaction required', 'NotAllowedError'))
  assert.equal(await controller.start(), false)
  assert.deepEqual(states.at(-1), { playing: false, unavailable: false })
  audio.behavior = null
  assert.equal(await controller.toggle(), true)
  controller.destroy()
})

test('a guest pause is respected when the envelope is replayed', async () => {
  const { audio, controller } = setup()
  await controller.start()
  await controller.toggle()
  audio.currentTime = 35
  controller.reset()
  assert.equal(audio.currentTime, 0)
  assert.equal(await controller.start(), false)
  assert.equal(audio.playCalls, 1)
  assert.equal(await controller.toggle(), true)
  controller.destroy()
})

test('switching tabs pauses active music and resumes only music that was playing', async () => {
  const { audio, page, controller } = setup()
  page.hide(true)
  page.hide(false)
  assert.equal(audio.playCalls, 0)
  await controller.start()
  page.hide(true)
  assert.equal(audio.paused, true)
  page.hide(false)
  assert.equal(audio.playCalls, 2)
  assert.equal(audio.paused, false)
  await controller.toggle()
  page.hide(true)
  page.hide(false)
  assert.equal(audio.playCalls, 2)
  controller.destroy()
})

test('replay cancels a late-starting play request', async () => {
  const { audio, controller } = setup()
  let finish
  audio.behavior = () => new Promise(resolve => { finish = () => {
    audio.paused = false
    audio.dispatchEvent(new Event('play'))
    resolve()
  } })
  const pending = controller.start()
  controller.reset()
  finish()
  assert.equal(await pending, false)
  assert.equal(audio.paused, true)
  controller.destroy()
})

test('a failed audio file reports unavailability without disrupting the invitation', async () => {
  const { audio, states, controller } = setup()
  await controller.start()
  audio.dispatchEvent(new Event('error'))
  assert.deepEqual(states.at(-1), { playing: false, unavailable: true })
  assert.equal(await controller.toggle(), false)
  assert.equal(audio.paused, true)
  controller.destroy()
})

test('cleanup stops playback and prevents visibility changes from restarting it', async () => {
  const { audio, page, states, controller } = setup()
  await controller.start()
  const count = states.length
  controller.destroy()
  page.hide(true)
  page.hide(false)
  audio.dispatchEvent(new Event('error'))
  assert.equal(audio.paused, true)
  assert.equal(audio.playCalls, 1)
  assert.equal(states.length, count)
})
