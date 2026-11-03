import test from 'node:test'
import assert from 'node:assert/strict'
import { getCoastalBreeze, getCoastalImageLayout } from './coastalMotion.js'

const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-7, `${actual} should equal ${expected}`)

test('coastal animation exactly follows the centered desktop contain image', () => {
  const layout = getCoastalImageLayout({ width: 1440, height: 836, imageWidth: 941, imageHeight: 1672, pixelRatio: 2 })
  close(layout.height, 836)
  close(layout.width, 470.5)
  close(layout.left + layout.width / 2, 720)
  close(layout.top, 0)
  assert.equal(layout.pixelWidth, 941)
  assert.equal(layout.pixelHeight, 1672)
})

test('phone cover crops stay centered and fill short and tall viewports', () => {
  for (const [width, height] of [[320, 730], [390, 788], [430, 876], [600, 730]]) {
    const layout = getCoastalImageLayout({ width, height, imageWidth: 941, imageHeight: 1672, fit: 'cover', pixelRatio: 3 })
    assert.ok(layout.width >= width - 1e-7)
    assert.ok(layout.height >= height - 1e-7)
    close(layout.left + layout.width / 2, width / 2)
    close(layout.top + layout.height / 2, height / 2)
    close(layout.width / layout.height, 941 / 1672)
    assert.ok(layout.pixelWidth <= 941 && layout.pixelHeight <= 1672)
  }
})

test('the motion buffer does not waste resolution on large displays or upscale the artwork', () => {
  const layout = getCoastalImageLayout({ width: 3840, height: 2160, imageWidth: 941, imageHeight: 1672, pixelRatio: 3 })
  assert.equal(layout.pixelWidth, 941)
  assert.equal(layout.pixelHeight, 1672)
  assert.throws(() => getCoastalImageLayout({ width: 0, height: 836, imageWidth: 941, imageHeight: 1672 }), RangeError)
})

test('the breeze starts at rest and eases into full strength', () => {
  assert.deepEqual(getCoastalBreeze(0), { top: 0, right: 0, left: 0, strength: 0 })
  assert.deepEqual(getCoastalBreeze(-5), getCoastalBreeze(0))
  assert.ok(getCoastalBreeze(.2).strength < getCoastalBreeze(.9).strength)
  assert.equal(getCoastalBreeze(1.8).strength, 1)
})

test('the botanical corners sway gently in both directions without abrupt frame jumps', () => {
  const ranges = { top: [], right: [], left: [] }
  for (let frame = 60; frame < 1800; frame++) {
    const previous = getCoastalBreeze((frame - 1) / 30)
    const breeze = getCoastalBreeze(frame / 30)
    for (const corner of Object.keys(ranges)) {
      ranges[corner].push(breeze[corner])
      assert.ok(Math.abs(breeze[corner]) <= .033)
      assert.ok(Math.abs(breeze[corner] - previous[corner]) < .002)
    }
  }
  for (const values of Object.values(ranges)) assert.ok(Math.min(...values) < 0 && Math.max(...values) > 0)
})
