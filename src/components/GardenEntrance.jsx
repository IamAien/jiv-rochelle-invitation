import { useEffect, useId, useRef, useState } from 'react'
import portrait from '../assets/muted-entrance-portrait.webp'
import landscape from '../assets/muted-entrance-landscape.webp'
import desktop from '../assets/desktop-entrance-supplied.jpg'
import { GATE_OPENING_MS } from '../wedding.js'
import { getGateParts } from '../gateGeometry.js'
import './GardenEntrance.css'

const WIDE_MEDIA = '(min-width: 900px), (orientation: landscape)'
const DESKTOP_MEDIA = '(min-width: 900px)'
const SCENES = {
  portrait: {
    src: portrait, width: 941, height: 1672,
    hint: { x: 79.5, y: 28 },
    gate: { x: 458, y: 1265, width: 360, height: 247, seam: 638 },
    outline: 'M458 1512 L458 1296 Q463 1280 469 1296 L469 1320 C508 1317 566 1275 627 1274 L631 1268 Q637 1261 642 1269 L644 1277 C702 1275 754 1313 803 1321 L806 1299 Q812 1284 818 1298 L818 1512 Z',
  },
  landscape: {
    src: landscape, width: 1672, height: 940,
    hint: { x: 66, y: 26.5 },
    gate: { x: 984, y: 666, width: 309, height: 189, seam: 1139 },
    outline: 'M984 855 L984 702 Q990 685 996 702 L997 716 C1042 710 1076 676 1130 676 L1133 669 Q1139 661 1145 670 L1146 677 C1197 677 1234 710 1280 717 L1282 702 Q1287 687 1293 701 L1293 855 Z',
  },
  desktop: {
    src: desktop, width: 1368, height: 768,
    hint: { x: 66.5, y: 26.5 },
    gate: { x: 809, y: 548, width: 255, height: 148, seam: 937 },
    outline: 'M809 696 L809 578 Q815 574 821 580 C855 575 889 552 931 554 L933 550 Q937 548 941 552 L943 554 C982 551 1018 575 1054 580 Q1062 575 1064 581 L1064 696 Z',
  },
}

function getSceneKey() {
  if (typeof window === 'undefined') return 'portrait'
  if (window.matchMedia(DESKTOP_MEDIA).matches) return 'desktop'
  return window.matchMedia(WIDE_MEDIA).matches ? 'landscape' : 'portrait'
}

export default function GardenEntrance({ stage, onOpen, onUnavailable }) {
  const [sceneKey, setSceneKey] = useState(getSceneKey)
  const [loadedScene, setLoadedScene] = useState(null)
  const [failedScene, setFailedScene] = useState(null)
  const triggerRef = useRef(null)
  const id = `country-gate-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const scene = SCENES[sceneKey]
  const parts = getGateParts(scene)
  const ready = loadedScene === scene.src

  useEffect(() => {
    const queries = [window.matchMedia(DESKTOP_MEDIA), window.matchMedia(WIDE_MEDIA)]
    const update = () => setSceneKey(getSceneKey())
    queries.forEach(query => query.addEventListener('change', update))
    update()
    return () => queries.forEach(query => query.removeEventListener('change', update))
  }, [])

  useEffect(() => {
    if (ready && stage === 'closed') triggerRef.current?.focus({ preventScroll: true })
  }, [ready, stage])

  if (stage === 'done') return null
  const opening = stage === 'opening'
  const failed = failedScene === scene.src && !ready
  const gate = scene.gate

  return (
    <div
      className={`country-entrance ${ready ? 'has-art' : ''} ${opening ? 'is-opening' : ''}`}
      style={{ '--entrance-duration': `${GATE_OPENING_MS}ms`, '--art-ratio': parts.ratio }}
      role="dialog"
      aria-modal="true"
      aria-label="Enter Jiv and Rochelle’s wedding garden"
    >
      <img className="entrance-preload" src={scene.src} alt="" aria-hidden="true" fetchPriority="high"
        onLoad={() => setLoadedScene(scene.src)} onError={() => setFailedScene(scene.src)} />
      <div className="entrance-paper" aria-hidden="true" />
      <div className="entrance-artboard" aria-hidden="true">
        <div className="entrance-surface" style={{ transformOrigin: `${gate.seam / scene.width * 100}% ${(gate.y + gate.height * .6) / scene.height * 100}%` }}>
          <svg className="entrance-scene" viewBox={`0 0 ${scene.width} ${scene.height}`}>
            <defs>
              <clipPath id={`${id}-outline`} clipPathUnits="userSpaceOnUse"><path d={scene.outline} /></clipPath>
              <filter id={`${id}-ink`} filterUnits="userSpaceOnUse" x={gate.x} y={gate.y} width={gate.width} height={gate.height} colorInterpolationFilters="sRGB">
                {/* Preserve the original grey thread colors; remove only pale linen between bars. */}
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -2.5512 -8.5824 -.8664 0 8.4" />
              </filter>
              <filter id={`${id}-edge`} filterUnits="userSpaceOnUse" x={gate.x - 4} y={gate.y - 4} width={gate.width + 8} height={gate.height + 8}>
                <feGaussianBlur stdDeviation="1" />
              </filter>
              <mask id={`${id}-portal`} maskUnits="userSpaceOnUse" x="0" y="0" width={scene.width} height={scene.height} style={{ maskType: 'luminance' }}>
                <rect width={scene.width} height={scene.height} fill="white" />
                <path d={scene.outline} fill="black" filter={`url(#${id}-edge)`} />
              </mask>
            </defs>
            {/* Closed: the untouched complete illustration is the first screen. */}
            <image className="entrance-original" href={scene.src} width={scene.width} height={scene.height}
              mask={opening ? `url(#${id}-portal)` : undefined} />
          </svg>
          <div className="entrance-leaves" style={parts.position}>
            {['left', 'right'].map(side => (
              <div key={side} className={`entrance-leaf is-${side}`} data-hinge={side} style={parts[side].style}>
                <svg className="entrance-leaf-art" viewBox={parts[side].viewBox} preserveAspectRatio="none">
                  <g clipPath={`url(#${id}-outline)`}>
                    <image href={scene.src} width={scene.width} height={scene.height} filter={`url(#${id}-ink)`} />
                  </g>
                </svg>
              </div>
            ))}
          </div>
          <span className="entrance-cue" style={{ left: `${gate.seam / scene.width * 100}%`, top: `${(gate.y + gate.height * .5) / scene.height * 100}%` }} />
          <span className="entrance-monogram-hint" style={{ left: `${scene.hint.x}%`, top: `${scene.hint.y}%` }}>Tap to open</span>
        </div>
      </div>
      <button ref={triggerRef} className="entrance-trigger" onClick={onOpen} disabled={!ready || opening}
        aria-label="Open the garden gates to our wedding" />
      {failed && <button className="entrance-fallback" onClick={onUnavailable} autoFocus>View invitation</button>}
      <span className="sr-only" role="status">{opening ? 'The garden gates are opening.' : ''}</span>
    </div>
  )
}
