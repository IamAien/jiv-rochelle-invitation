// Put your photos in public/photos, then set src to e.g. 'photos/law-school.jpg'.
// Leave src empty to keep the linen placeholder until a photo is ready.
export const REVEAL_PHOTOS = [
  { src: '', caption: 'Law school days', alt: 'Jiv and Rochelle during their law school days' },
]

export const MEMORY_PHOTOS = [
  { src: '', caption: 'Us, always', alt: 'Jiv and Rochelle together' },
  { src: '', caption: 'Little moments', alt: 'An everyday moment with Jiv and Rochelle' },
  { src: '', caption: 'Coffee dates', alt: 'Jiv and Rochelle on a coffee date' },
  { src: '', caption: 'Adventures', alt: 'Jiv and Rochelle on an adventure together' },
  { src: '', caption: 'Almost forever', alt: 'Jiv and Rochelle before their wedding' },
]

export function getPhotoSource(src, base = '/') {
  if (!src) return ''
  if (/^(https?:|data:image\/|blob:)/i.test(src)) return src
  if (src.startsWith(base)) return src
  return `${base.endsWith('/') ? base : `${base}/`}${src.replace(/^\/?(?:\.\/)?/, '')}`
}

export function wrapPhotoIndex(index, length) {
  return length > 0 ? ((index % length) + length) % length : 0
}

export function getPhotoSwipe(delta, width) {
  if (width <= 0 || Math.abs(delta) < Math.min(70, width * 0.22)) return 0
  return delta < 0 ? 1 : -1
}

// Track erased cells instead of reading every pixel on every pointer movement.
export function createScratchGrid(width, height, shape = 'rectangle') {
  const columns = 20
  const rows = width > 0 ? Math.max(8, Math.round(columns * height / width)) : 8
  const active = new Set()
  for (let row = 0; row < rows; row++) for (let column = 0; column < columns; column++) {
    if (shape !== 'ellipse' || ((column + .5) / columns * 2 - 1) ** 2 + ((row + .5) / rows * 2 - 1) ** 2 <= 1) active.add(row * columns + column)
  }
  return { width, height, columns, rows, active, hits: new Set() }
}

export function recordScratchStroke(grid, from, to, radius) {
  const { width, height, columns, rows, active, hits } = grid
  if (width <= 0 || height <= 0 || radius <= 0) return 0
  const steps = Math.max(1, Math.ceil(Math.hypot(to.x - from.x, to.y - from.y) / (radius * 0.4)))
  for (let step = 0; step <= steps; step++) {
    const x = from.x + (to.x - from.x) * step / steps
    const y = from.y + (to.y - from.y) * step / steps
    const firstColumn = Math.max(0, Math.floor((x - radius) / width * columns))
    const lastColumn = Math.min(columns - 1, Math.floor((x + radius) / width * columns))
    const firstRow = Math.max(0, Math.floor((y - radius) / height * rows))
    const lastRow = Math.min(rows - 1, Math.floor((y + radius) / height * rows))
    for (let row = firstRow; row <= lastRow; row++) {
      for (let column = firstColumn; column <= lastColumn; column++) {
        const centerX = (column + 0.5) * width / columns
        const centerY = (row + 0.5) * height / rows
        const cell = row * columns + column
        if (active.has(cell) && Math.hypot(centerX - x, centerY - y) <= radius) hits.add(cell)
      }
    }
  }
  return hits.size / active.size
}
