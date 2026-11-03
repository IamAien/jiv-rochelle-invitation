import { useEffect, useId, useRef, useState } from 'react'
import envelope from '../assets/embroidered-coastal-envelope.webp'
import { INVITATION_ARTWORK } from '../invitationArtwork.js'
import { ENVELOPE_OPENING_MS } from '../wedding.js'
import Ampersand from './Ampersand.jsx'
import './EnvelopeOpening.css'

// Both pieces use the original pixels, including the existing J&R wax seal.
const FLAP = 'M0 0 H941 V648 L470.5 1090 L0 648 Z'

export default function EnvelopeOpening({ stage, onOpen, onUnavailable }) {
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
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
      fetchPriority="high" onLoad={() => setReady(true)} onError={() => setFailed(true)} />
    <div className="envelope-artboard" aria-hidden="true">
      <svg className="envelope-lining" viewBox="0 0 941 1672">
        <defs>
          <pattern id={`${id}-linen`} width="941" height="400" patternUnits="userSpaceOnUse">
            <image href={envelope} width="941" height="1672" />
          </pattern>
        </defs>
        <rect width="941" height="1672" fill={`url(#${id}-linen)`} />
      </svg>
      <div className="envelope-letter">
        <img src={INVITATION_ARTWORK.src} alt="" fetchPriority="high" />
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
            <path d={FLAP} fill="black" />
            <ellipse cx="470.5" cy="1045" rx="83" ry="86" fill="black" />
          </mask>
        </defs>
        <image href={envelope} width="941" height="1672" mask={`url(#${id}-pocket)`} />
      </svg>
      <svg className="envelope-flap" viewBox="0 0 941 1672">
        <defs>
          <mask id={`${id}-flap`} maskUnits="userSpaceOnUse" x="0" y="0" width="941" height="1672" style={{ maskType: 'luminance' }}>
            <rect width="941" height="1672" fill="black" />
            <path d={FLAP} fill="white" />
            <ellipse cx="470.5" cy="1045" rx="83" ry="86" fill="white" />
          </mask>
        </defs>
        <image href={envelope} width="941" height="1672" mask={`url(#${id}-flap)`} />
      </svg>
      <div className="envelope-address">
        <p className="envelope-eyebrow">A little envelope, a lifetime of love</p>
        <p className="envelope-names">Jiv<Ampersand />Rochelle</p>
        <p className="envelope-date">07 · 02 · 2027</p>
      </div>
      <span className="envelope-seal-cue" />
      <p className="envelope-hint">Tap the seal to open</p>
    </div>
    <button ref={triggerRef} className="envelope-trigger" onClick={onOpen} disabled={!ready || opening}
      aria-label="Open Jiv and Rochelle’s wedding envelope" />
    {failed && !ready && <button className="envelope-fallback" onClick={onUnavailable} autoFocus>View invitation</button>}
    <span className="sr-only" role="status">{opening ? 'The envelope is opening. Your invitation is inside.' : !ready && !failed ? 'Preparing your invitation.' : ''}</span>
  </div>
}
