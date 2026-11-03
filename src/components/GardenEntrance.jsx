import { useEffect, useId, useRef, useState } from 'react'
import portrait from '../assets/sunset-stone-garden-portrait.webp'
import desktop from '../assets/sunset-stone-garden-desktop.webp'
import { GATE_OPENING_MS } from '../wedding.js'
import { getGateParts } from '../gateGeometry.js'
import Ampersand from './Ampersand.jsx'
import FountainReveal from './FountainReveal.jsx'
import { CEREMONY_ARTWORKS } from '../ceremonyArtwork.js'
import './GardenEntrance.css'

const WIDE_MEDIA = '(min-width: 900px), (orientation: landscape)'
const DESKTOP_MEDIA = '(min-width: 900px)'
const SCENES = {
  portrait: {
    src: portrait, width: 941, height: 1672,
    monogram: { x: 71, y: 18 },
    hint: { x: 71, y: 22.3 },
    gate: { x: 522, y: 728, width: 305, height: 426, seam: 670 },
    outline: 'M522 1154 L522 842 Q521 829 526 817 Q533 812 539 819 Q545 829 535 838 C555 839 568 825 575 815 Q559 818 558 804 Q556 792 567 792 Q581 789 584 804 C608 795 625 779 645 779 L650 769 Q637 773 641 761 Q634 758 641 750 Q648 743 657 751 L662 744 L669 728 L677 745 L677 754 Q687 744 695 750 Q703 758 695 766 L688 768 L690 779 C716 785 737 800 755 811 Q757 793 769 794 Q782 796 779 807 Q776 820 763 816 C776 829 793 839 810 842 Q801 827 808 819 Q813 812 820 818 Q829 825 825 839 L827 1154 Z',
    ink: '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -2.9764 -10.0128 -1.0108 0 8.4',
  },
  desktop: {
    src: desktop, width: 1672, height: 941,
    monogram: { x: 65.5, y: 7 },
    hint: { x: 65.5, y: 12 },
    gate: { x: 943, y: 325, width: 313, height: 380, seam: 1095 },
    outline: 'M943 705 L943 445 Q940 435 948 429 Q954 426 960 432 Q966 440 956 449 C978 447 991 436 1002 423 Q986 426 985 413 Q984 402 994 402 Q1007 399 1011 411 C1033 390 1051 375 1071 365 L1077 358 Q1065 360 1067 349 Q1059 344 1067 337 Q1075 330 1082 337 L1088 346 L1094 325 L1102 344 L1101 350 Q1111 326 1120 333 Q1128 342 1119 349 L1113 352 L1116 363 C1139 375 1157 398 1179 415 Q1180 398 1192 398 Q1206 399 1201 411 Q1198 423 1186 420 C1206 439 1224 447 1241 451 Q1231 437 1238 430 Q1245 421 1252 429 Q1258 434 1256 446 L1256 705 Z',
    ink: '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -2.9764 -10.0128 -1.0108 0 8.4',
  },
}
// Narrow landscape windows use the same wide artwork and registered gate.
SCENES.landscape = SCENES.desktop

function getSceneKey() {
  if (typeof window === 'undefined') return 'portrait'
  if (window.matchMedia(DESKTOP_MEDIA).matches) return 'desktop'
  return window.matchMedia(WIDE_MEDIA).matches ? 'landscape' : 'portrait'
}

export default function GardenEntrance({ stage, onOpen, onUnavailable, destinationRef }) {
  const [sceneKey, setSceneKey] = useState(getSceneKey)
  const [loadedScene, setLoadedScene] = useState(null)
  const [failedScene, setFailedScene] = useState(null)
  const triggerRef = useRef(null)
  const artboardRef = useRef(null)
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
      data-scene={sceneKey}
      style={{ '--entrance-duration': `${GATE_OPENING_MS}ms`, '--art-ratio': parts.ratio }}
      role="dialog"
      aria-modal="true"
      aria-label="Enter Jiv and Rochelle’s wedding garden"
    >
      <img className="entrance-preload" src={scene.src} alt="" aria-hidden="true" fetchPriority="high"
        onLoad={() => setLoadedScene(scene.src)} onError={() => setFailedScene(scene.src)} />
      {CEREMONY_ARTWORKS[sceneKey].revealSrc && <img className="entrance-preload" src={CEREMONY_ARTWORKS[sceneKey].revealSrc} alt="" aria-hidden="true" fetchPriority="high" />}
      <div className="entrance-visuals">
      <div className="entrance-paper" aria-hidden="true" />
      <div className="entrance-artboard" ref={artboardRef} aria-hidden="true">
        <div className="entrance-surface" style={{ transformOrigin: `${gate.seam / scene.width * 100}% ${(gate.y + gate.height * .6) / scene.height * 100}%` }}>
          <svg className="entrance-scene" viewBox={`0 0 ${scene.width} ${scene.height}`}>
            <defs>
              <clipPath id={`${id}-outline`} clipPathUnits="userSpaceOnUse"><path d={scene.outline} /></clipPath>
              <filter id={`${id}-ink`} filterUnits="userSpaceOnUse" x={gate.x} y={gate.y} width={gate.width} height={gate.height} colorInterpolationFilters="sRGB">
                {/* Preserve the gate's thread colors while removing the lighter backing. */}
                <feColorMatrix type="matrix" values={scene.ink ?? '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -2.5512 -8.5824 -.8664 0 8.4'} />
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
                    {/* Let the source linen dissolve with the moving leaf instead of vanishing on click. */}
                    <image className="entrance-leaf-backing" href={scene.src} width={scene.width} height={scene.height} />
                    <image href={scene.src} width={scene.width} height={scene.height} filter={`url(#${id}-ink)`} />
                  </g>
                </svg>
              </div>
            ))}
          </div>
          {scene.monogram && <span className="entrance-live-monogram" style={{ left: `${scene.monogram.x}%`, top: `${scene.monogram.y}%` }}>J<Ampersand />R</span>}
          <span className="entrance-cue" style={{ left: `${gate.seam / scene.width * 100}%`, top: `${(gate.y + gate.height * .5) / scene.height * 100}%` }} />
          <span className="entrance-monogram-hint" style={{ left: `${scene.hint.x}%`, top: `${scene.hint.y}%` }}>Tap to open</span>
        </div>
      </div>
      {opening && <FountainReveal scene={scene} sceneKey={sceneKey} artboardRef={artboardRef} destinationRef={destinationRef} />}
      </div>
      <button ref={triggerRef} className="entrance-trigger" onClick={onOpen} disabled={!ready || opening}
        aria-label="Open the garden gates to our wedding" />
      {failed && <button className="entrance-fallback" onClick={onUnavailable} autoFocus>View invitation</button>}
      <span className="sr-only" role="status">{opening ? 'The garden gates are opening.' : ''}</span>
    </div>
  )
}
