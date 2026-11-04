import { useEffect, useId, useRef, useState } from 'react'
import envelope from '../assets/embroidered-coastal-envelope.webp'
import CoastalScene from './CoastalScene.jsx'
import { ENVELOPE_OPENING_MS } from '../wedding.js'
import Ampersand from './Ampersand.jsx'
import './EnvelopeOpening.css'

// The triangular flap pivots at the actual fold. The upper linen stays behind it.
const FLAP = 'M0 648 H941 L470.5 1090 Z'
const POCKET_OPENING = 'M0 0 H941 V648 L470.5 1090 L0 648 Z'
// End the diagonal paper edges before the wax seal so they cannot draw across it.
const PAPER_EDGE_SEGMENTS = [
  [[0, 648], [941, 648]],
  [[941, 648], [555.19, 1010.44]],
  [[385.81, 1010.44], [0, 648]],
]
const PAPER_EDGES = PAPER_EDGE_SEGMENTS.map(([[x, y], [endX, endY]]) => {
  return {
    left: `${x / 941 * 100}%`,
    top: `${y / 1672 * 100}%`,
    width: `${Math.hypot(endX - x, endY - y) / 941 * 100}%`,
    '--edge-angle': `${Math.atan2(endY - y, endX - x)}rad`,
  }
})

export default function EnvelopeOpening({ stage, onOpen, onUnavailable, sceneReady = false }) {
  const [envelopeReady, setEnvelopeReady] = useState(false)
  const [letterReady, setLetterReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const ready = envelopeReady && letterReady && sceneReady
  const triggerRef = useRef(null)
  const id = `envelope-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`

  useEffect(() => {
    if (ready && stage === 'closed') triggerRef.current?.focus({ preventScroll: true })
  }, [ready, stage])

  if (stage === 'done') return null
  const opening = stage === 'opening'

  return <div
    className={`envelope-opening ${ready ? 'has-art' : ''} ${opening ? 'is-opening' : ''}`}
    style={{ '--opening-duration': `${ENVELOPE_OPENING_MS}ms` }}
    role="dialog" aria-modal="true" aria-label="Jiv and Rochelle’s wedding invitation"
  >
    <img className="envelope-preload" src={envelope} alt="" aria-hidden="true"
      fetchPriority="high" onLoad={() => setEnvelopeReady(true)} onError={() => setFailed(true)} />
    <div className="envelope-artboard" aria-hidden="true">
      <svg className="envelope-lining" viewBox="0 0 941 1672">
        <defs>
          <pattern id={`${id}-linen`} width="941" height="400" patternUnits="userSpaceOnUse">
            <image href={envelope} width="941" height="1672" />
          </pattern>
          <clipPath id={`${id}-upper-linen`}><rect width="941" height="648" /></clipPath>
        </defs>
        <rect width="941" height="1672" fill={`url(#${id}-linen)`} />
        <image href={envelope} width="941" height="1672" clipPath={`url(#${id}-upper-linen)`} />
      </svg>
      <div className="envelope-letter">
        <CoastalScene enabled={false} onReady={setLetterReady} />
        <div className="envelope-letter-copy">
          <p>Together with their families</p>
          <span className="envelope-letter-names">Jiv<Ampersand />Rochelle</span>
          <span className="envelope-letter-date">February 7, 2027</span>
        </div>
      </div>
      <svg className="envelope-pocket" viewBox="0 0 941 1672">
        <defs>
          <mask id={`${id}-pocket`} maskUnits="userSpaceOnUse" x="0" y="0" width="941" height="1672" style={{ maskType: 'luminance' }}>
            <rect width="941" height="1672" fill="white" />
            <path d={POCKET_OPENING} fill="black" />
            <ellipse cx="470.5" cy="1045" rx="83" ry="86" fill="black" />
          </mask>
        </defs>
        <image href={envelope} width="941" height="1672" mask={`url(#${id}-pocket)`} />
      </svg>
      <div className="envelope-flap">
      <svg className="envelope-flap-face envelope-flap-front" viewBox="0 0 941 1672">
        <defs>
          <mask id={`${id}-flap`} maskUnits="userSpaceOnUse" x="0" y="0" width="941" height="1672" style={{ maskType: 'luminance' }}>
            <rect width="941" height="1672" fill="black" />
            <path d={FLAP} fill="white" />
            <ellipse cx="470.5" cy="1045" rx="83" ry="86" fill="white" />
          </mask>
        </defs>
        <image href={envelope} width="941" height="1672" mask={`url(#${id}-flap)`} />
      </svg>
      <svg className="envelope-flap-face envelope-flap-back" viewBox="0 0 941 1672">
        <defs>
          <pattern id={`${id}-reverse-linen`} width="941" height="400" patternUnits="userSpaceOnUse">
            <image href={envelope} width="941" height="1672" />
          </pattern>
          <linearGradient id={`${id}-reverse-shade`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ac8961" stopOpacity=".2" />
            <stop offset=".2" stopColor="#fff5e6" stopOpacity=".08" />
            <stop offset="1" stopColor="#d0ad82" stopOpacity=".12" />
          </linearGradient>
        </defs>
        <ellipse cx="470.5" cy="1045" rx="78" ry="81" fill="#b77b58" />
        <path d={FLAP} fill={`url(#${id}-reverse-linen)`} />
        <path d={FLAP} fill={`url(#${id}-reverse-shade)`} />
        <path d={FLAP} fill="none" stroke="#e8cfad" strokeWidth="7" strokeLinejoin="round" />
        <path d={FLAP} fill="none" stroke="#bda17d" strokeWidth="2" strokeDasharray="2 5" strokeLinecap="round" />
      </svg>
      {PAPER_EDGES.map((edge, index) => <span className="envelope-paper-edge" key={index} style={edge} />)}
      </div>
    </div>
    <button ref={triggerRef} className="envelope-trigger" onClick={onOpen} disabled={!ready || opening}
      aria-label="Open Jiv and Rochelle’s wedding envelope" />
    {failed && !ready && <button className="envelope-fallback" onClick={onUnavailable} autoFocus>View invitation</button>}
    <span className="sr-only" role="status">{opening ? 'The envelope is opening. Your invitation is inside.' : !ready && !failed ? 'Preparing your invitation.' : ''}</span>
  </div>
}
