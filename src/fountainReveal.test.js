import test from 'node:test'
import assert from 'node:assert/strict'
import { getFountainReveal } from './fountainReveal.js'

const portrait = {
  entrance: { width: 941, height: 1672, gate: { seam: 670, y: 728, height: 426 } },
  artwork: { width: 941, height: 1672, fountain: { x: 465, y: 1210 } },
}
const desktop = {
  entrance: { width: 1672, height: 941, gate: { seam: 1095, y: 325, height: 380 } },
  artwork: { width: 1672, height: 941, fountain: { x: 835, y: 642 } },
}
const landscape = desktop
const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-7, `${actual} should equal ${expected}`)

function sceneAt(scene, width, height, header = 56) {
  const scale = Math.max(width / scene.entrance.width, height / scene.entrance.height)
  const boardWidth = scene.entrance.width * scale
  const boardHeight = scene.entrance.height * scale
  return {
    ...scene,
    viewport: { width, height },
    artboard: { left: (width - boardWidth) / 2, top: (height - boardHeight) / 2, width: boardWidth, height: boardHeight },
    destination: { left: 0, top: header, width, height: Math.max(730, height - header) },
  }
}

test('the fountain is centered behind the phone gate on short, tall, and wide phones', () => {
  for (const [width, height] of [[320, 568], [375, 667], [390, 844], [430, 932], [360, 900]]) {
    const input = sceneAt(portrait, width, height)
    const { from, target } = getFountainReveal(input)
    close(from.x + input.artwork.fountain.x * from.scale, target.x)
    close(from.y + input.artwork.fountain.y * from.scale, target.y)
    const gateLeft = input.artboard.left + 522 * input.artboard.width / 941
    const gateRight = input.artboard.left + 827 * input.artboard.width / 941
    assert.ok(target.x > gateLeft && target.x < gateRight)
  }
})

test('the fountain stays at the second page image scale without extra zoom', () => {
  for (const input of [sceneAt(portrait, 390, 844), sceneAt(portrait, 360, 900), sceneAt(landscape, 844, 390, 64), sceneAt(desktop, 1440, 900, 64)]) {
    const { from, to } = getFountainReveal(input)
    close(from.scale, to.scale)
    close(from.scale, Math.max(input.destination.width / input.artwork.width, input.destination.height / input.artwork.height))
    for (const progress of [0, 0.25, 0.5, 0.75, 1]) close(from.scale + (to.scale - from.scale) * progress, to.scale)
  }
})

test('the reference placement matches the second page normal image crop', () => {
  const input = sceneAt(portrait, 390, 844)
  const { to } = getFountainReveal(input)
  close(to.y, 56)
  close(input.artwork.height * to.scale, 788)
  close(to.x + input.artwork.width * to.scale / 2, 195)
  const desktopInput = sceneAt(desktop, 1440, 900, 64)
  const desktopPose = getFountainReveal(desktopInput).to
  close(desktopPose.x + desktopInput.artwork.width * desktopPose.scale / 2, 720)
  close(desktopPose.y + desktopInput.artwork.height * desktopPose.scale / 2, 64 + desktopInput.destination.height / 2)
})

test('resizing and rotating recompute the gate target from the new artwork bounds', () => {
  const before = getFountainReveal(sceneAt(portrait, 390, 844))
  const input = sceneAt(landscape, 844, 390, 64)
  const after = getFountainReveal(input)
  assert.notEqual(after.target.x, before.target.x)
  assert.notEqual(after.target.y, before.target.y)
  close(after.from.x + input.artwork.fountain.x * after.from.scale, after.target.x)
  close(after.from.y + input.artwork.fountain.y * after.from.scale, after.target.y)
})

test('invalid fountain positions and unmeasurable image boxes are rejected', () => {
  const input = sceneAt(portrait, 390, 844)
  assert.throws(() => getFountainReveal({ ...input, destination: { ...input.destination, width: 0 } }), RangeError)
  assert.throws(() => getFountainReveal({ ...input, artwork: { ...input.artwork, fountain: { x: 0, y: 100 } } }), RangeError)
  assert.throws(() => getFountainReveal({ ...input, artboard: { ...input.artboard, top: NaN } }), RangeError)
})
