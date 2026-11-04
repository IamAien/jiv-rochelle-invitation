import test from 'node:test'
import assert from 'node:assert/strict'
import { createScratchGrid, getPhotoSource, getPhotoSwipe, recordScratchStroke, wrapPhotoIndex } from './gallery.js'

test('local gallery photos use the deployed repository base path', () => {
  const base = '/jiv-rochelle-invitation/'
  for (const src of ['photos/us.jpg', '/photos/us.jpg', './photos/us.jpg']) {
    assert.equal(getPhotoSource(src, base), `${base}photos/us.jpg`)
  }
  assert.equal(getPhotoSource(`${base}photos/us.jpg`, base), `${base}photos/us.jpg`)
  assert.equal(getPhotoSource('', base), '')
  assert.equal(getPhotoSource('photos/us.jpg'), '/photos/us.jpg')
  assert.equal(getPhotoSource('https://example.com/us.jpg', base), 'https://example.com/us.jpg')
})

test('memory navigation wraps in both directions and handles small albums', () => {
  assert.equal(wrapPhotoIndex(-1, 5), 4)
  assert.equal(wrapPhotoIndex(5, 5), 0)
  assert.equal(wrapPhotoIndex(16, 5), 1)
  assert.equal(wrapPhotoIndex(-16, 5), 4)
  assert.equal(wrapPhotoIndex(1, 1), 0)
  assert.equal(wrapPhotoIndex(1, 0), 0)
})

test('short drags snap back and deliberate horizontal swipes turn one photo', () => {
  assert.equal(getPhotoSwipe(0, 300), 0)
  assert.equal(getPhotoSwipe(40, 300), 0)
  assert.equal(getPhotoSwipe(-40, 300), 0)
  assert.equal(getPhotoSwipe(-90, 300), 1)
  assert.equal(getPhotoSwipe(90, 300), -1)
  assert.equal(getPhotoSwipe(-50, 220), 1)
  assert.equal(getPhotoSwipe(-100, 0), 0)
})

test('brushing the same small patch repeatedly cannot complete a reveal', () => {
  const grid = createScratchGrid(240, 300)
  const point = { x: 120, y: 150 }
  const first = recordScratchStroke(grid, point, point, 24)
  for (let index = 0; index < 50; index++) assert.equal(recordScratchStroke(grid, point, point, 24), first)
  assert.ok(first > 0 && first < 0.1)
  assert.equal(recordScratchStroke(createScratchGrid(240, 300), { x: -100, y: -100 }, { x: -90, y: -90 }, 24), 0)
})

test('continuous brush strokes cover the path between pointer samples', () => {
  const grid = createScratchGrid(240, 300)
  const progress = recordScratchStroke(grid, { x: 0, y: 150 }, { x: 240, y: 150 }, 24)
  assert.ok(progress > 0.1 && progress < 0.25)
  let previous = progress
  for (let y = 0; y <= 300; y += 30) {
    const current = recordScratchStroke(grid, { x: 0, y }, { x: 240, y }, 24)
    assert.ok(current >= previous && current <= 1)
    previous = current
  }
  assert.ok(previous >= 0.95)
})

test('scratch coverage survives a proportional resize without counting areas twice', () => {
  const grid = createScratchGrid(240, 300)
  const before = recordScratchStroke(grid, { x: 0, y: 150 }, { x: 240, y: 150 }, 24)
  grid.width = 480
  grid.height = 600
  const after = recordScratchStroke(grid, { x: 0, y: 300 }, { x: 480, y: 300 }, 48)
  assert.equal(after, before)
  assert.equal(recordScratchStroke(createScratchGrid(0, 0), { x: 0, y: 0 }, { x: 0, y: 0 }, 24), 0)
})

test('oval scratch coverage ignores hidden corner strokes', () => {
  const grid = createScratchGrid(240, 300, 'ellipse')
  for (const point of [{ x: 8, y: 8 }, { x: 232, y: 8 }, { x: 8, y: 292 }, { x: 232, y: 292 }]) {
    assert.equal(recordScratchStroke(grid, point, point, 10), 0)
  }
  assert.ok(recordScratchStroke(grid, { x: 120, y: 150 }, { x: 120, y: 150 }, 24) > 0)
})

test('oval coverage measures the visible photo and survives resizing', () => {
  const oval = createScratchGrid(240, 300, 'ellipse')
  const rectangle = createScratchGrid(240, 300)
  const before = recordScratchStroke(oval, { x: 0, y: 150 }, { x: 240, y: 150 }, 24)
  assert.ok(before > recordScratchStroke(rectangle, { x: 0, y: 150 }, { x: 240, y: 150 }, 24))
  oval.width = 480
  oval.height = 600
  assert.equal(recordScratchStroke(oval, { x: 0, y: 300 }, { x: 480, y: 300 }, 48), before)
  for (let y = 0; y <= 600; y += 30) recordScratchStroke(oval, { x: 0, y }, { x: 480, y }, 48)
  assert.ok(oval.hits.size / oval.active.size >= .98)
})
