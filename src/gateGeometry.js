// All coordinates are native image pixels, so the animated leaves register
// exactly with the gate that is already stitched into the entrance artwork.
export function getGateParts({ width, height, gate }) {
  const { x, y, width: gateWidth, height: gateHeight, seam } = gate
  const right = x + gateWidth
  const bottom = y + gateHeight
  if (![width, height, x, y, gateWidth, gateHeight, seam].every(Number.isFinite)
    || width <= 0 || height <= 0 || x < 0 || y < 0
    || gateWidth <= 0 || gateHeight <= 0 || right > width || bottom > height
    || seam <= x || seam >= right) {
    throw new Error('The gate must fit inside its source artwork with an interior center seam.')
  }

  const leftWidth = seam - x
  const rightWidth = right - seam
  return {
    ratio: width / height,
    position: {
      left: `${x / width * 100}%`,
      top: `${y / height * 100}%`,
      width: `${gateWidth / width * 100}%`,
      height: `${gateHeight / height * 100}%`,
    },
    left: {
      viewBox: `${x} ${y} ${leftWidth} ${gateHeight}`,
      style: { left: '0%', width: `${leftWidth / gateWidth * 100}%` },
    },
    right: {
      viewBox: `${seam} ${y} ${rightWidth} ${gateHeight}`,
      style: { left: `${leftWidth / gateWidth * 100}%`, width: `${rightWidth / gateWidth * 100}%` },
    },
  }
}
