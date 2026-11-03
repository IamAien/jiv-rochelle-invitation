import test from 'node:test'
import assert from 'node:assert/strict'
import { getGateParts } from './gateGeometry.js'

test('the gate halves meet at the painted latch even when their widths differ', () => {
  const parts = getGateParts({ width: 1672, height: 940, gate: { x: 984, y: 666, width: 309, height: 189, seam: 1139 } })
  const left = parts.left.viewBox.split(' ').map(Number)
  const right = parts.right.viewBox.split(' ').map(Number)
  assert.deepEqual(left, [984, 666, 155, 189])
  assert.deepEqual(right, [1139, 666, 154, 189])
  assert.equal(left[0] + left[2], right[0])
  assert.equal(left[2] + right[2], 309)
  assert.equal(parseFloat(parts.left.style.width) + parseFloat(parts.right.style.width), 100)
})

test('portrait and landscape gate positions retain their source scale in both axes', () => {
  for (const scene of [
    { width: 941, height: 1672, gate: { x: 522, y: 728, width: 305, height: 426, seam: 670 } },
    { width: 1672, height: 940, gate: { x: 984, y: 666, width: 309, height: 189, seam: 1139 } },
    { width: 1672, height: 941, gate: { x: 943, y: 325, width: 313, height: 380, seam: 1095 } },
  ]) {
    const parts = getGateParts(scene)
    assert.ok(Math.abs(parseFloat(parts.position.width) / 100 * scene.width - scene.gate.width) < 1e-8)
    assert.ok(Math.abs(parseFloat(parts.position.height) / 100 * scene.height - scene.gate.height) < 1e-8)
    assert.equal(parts.ratio, scene.width / scene.height)
  }
})

test('invalid artwork bounds or an outside latch are rejected', () => {
  const scene = { width: 941, height: 1672, gate: { x: 457, y: 888, width: 338, height: 443, seam: 620 } }
  assert.throws(() => getGateParts({ ...scene, gate: { ...scene.gate, width: 1000 } }))
  assert.throws(() => getGateParts({ ...scene, gate: { ...scene.gate, seam: 457 } }))
})
