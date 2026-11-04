import test from 'node:test'
import assert from 'node:assert/strict'
import { COASTAL_PLANT_REGIONS, getCoastalSeaOffset, getCoastalWaterStrength, getCoastalImageLayout } from './coastalMotion.js'

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

test('the sea moves left and right as one horizontal sheet without abrupt resets', () => {
  assert.equal(getCoastalSeaOffset(0), 0)
  assert.equal(getCoastalSeaOffset(-2), 0)
  assert.ok(getCoastalSeaOffset(2.5) > 0)
  assert.ok(getCoastalSeaOffset(7.5) < 0)
  close(getCoastalSeaOffset(10), 0)
  for (let frame = 1; frame < 600; frame++) {
    const offset = getCoastalSeaOffset(frame / 30)
    assert.ok(Math.abs(offset) <= .016)
    assert.ok(Math.abs(offset - getCoastalSeaOffset((frame - 1) / 30)) < .001)
  }
})

test('the top and lower-right overlays visibly sway without adding the pink lower-left cluster', () => {
  assert.deepEqual(COASTAL_PLANT_REGIONS.map(region => region.name), ['top', 'right'])
  for (const region of COASTAL_PLANT_REGIONS) {
    assert.ok(region.seconds >= 8 && region.seconds <= 10)
    assert.ok(region.positive >= 3 && region.positive <= 4)
    assert.ok(region.negative <= -2.5 && region.negative >= -4)
    assert.ok(region.origin.split(' ').every(value => value.endsWith('%')))
    // The complete plant image must fit even at either sway limit.
    const [originX, originY] = region.origin.split(' ').map(parseFloat)
    const pivotX = region.width * originX / 100
    const pivotY = region.height * originY / 100
    for (const degrees of [region.negative, 0, region.positive]) {
      const angle = degrees * Math.PI / 180
      for (const x of [0, region.width]) for (const y of [0, region.height]) {
        const rotatedX = region.x + pivotX + (x - pivotX) * Math.cos(angle) - (y - pivotY) * Math.sin(angle)
        const rotatedY = region.y + pivotY + (x - pivotX) * Math.sin(angle) + (y - pivotY) * Math.cos(angle)
        assert.ok(rotatedX >= 0 && rotatedX <= 941 && rotatedY >= 0 && rotatedY <= 1672, `${region.name} plant must fit at ${degrees} degrees`)
      }
    }
  }
})
