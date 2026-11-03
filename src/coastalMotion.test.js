import test from 'node:test'
import assert from 'node:assert/strict'
import { COASTAL_PLANT_REGIONS, getCoastalWaterStrength, getCoastalImageLayout } from './coastalMotion.js'

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

test('water starts at rest and eases into full strength', () => {
  assert.equal(getCoastalWaterStrength(0), 0)
  assert.equal(getCoastalWaterStrength(-5), 0)
  assert.ok(getCoastalWaterStrength(.2) < getCoastalWaterStrength(.9))
  assert.equal(getCoastalWaterStrength(1.8), 1)
})

test('only the three transparent plant layers are given slow, small rotations', () => {
  assert.deepEqual(COASTAL_PLANT_REGIONS.map(region => region.name), ['top', 'right', 'left'])
  for (const region of COASTAL_PLANT_REGIONS) {
    assert.ok(region.seconds >= 12)
    assert.ok(region.positive > 0 && region.positive < 1)
    assert.ok(region.negative < 0 && region.negative > -1)
    assert.match(region.clip, /^inset\(/)
    assert.ok(region.origin.split(' ').every(value => value.endsWith('%')))
  }
})
