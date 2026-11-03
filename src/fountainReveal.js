// Align the fountain with the gate without magnifying the second-page image.
// Placements use native image coordinates and a top-left transform origin.
export function getFountainReveal({ entrance, artwork, artboard, viewport, destination }) {
  const { width, height, fountain } = artwork
  const values = [width, height, fountain.x, fountain.y,
    entrance.width, entrance.height, entrance.gate.seam, entrance.gate.y, entrance.gate.height,
    artboard.left, artboard.top, artboard.width, artboard.height,
    viewport.width, viewport.height, destination.left, destination.top, destination.width, destination.height]
  if (!values.every(Number.isFinite)
    || [width, height, entrance.width, entrance.height, artboard.width, artboard.height,
      viewport.width, viewport.height, destination.width, destination.height].some(value => value <= 0)
    || fountain.x <= 0 || fountain.x >= width || fountain.y <= 0 || fountain.y >= height) {
    throw new RangeError('The fountain and image bounds must have valid interior coordinates.')
  }

  const target = {
    x: artboard.left + artboard.width * entrance.gate.seam / entrance.width,
    y: artboard.top + artboard.height * (entrance.gate.y + entrance.gate.height * 0.6) / entrance.height,
  }
  // Keep exactly the second page's image scale: position the fountain, never zoom it.
  const finalScale = Math.max(destination.width / width, destination.height / height)
  const from = { scale: finalScale, x: target.x - fountain.x * finalScale, y: target.y - fountain.y * finalScale }
  const to = {
    scale: finalScale,
    x: destination.left + (destination.width - width * finalScale) / 2,
    y: destination.top + (destination.height - height * finalScale) / 2,
  }
  return { from, to, target }
}

export function imageTransform({ scale, x, y }) {
  return `matrix(${scale}, 0, 0, ${scale}, ${x}, ${y})`
}
