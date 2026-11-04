import { useEffect, useState } from 'react'
import { ATTIRE_GUESTS, getGuestColorName, getGuestOutfit } from '../attire.js'
import { guestOutfitSource } from '../attireArtwork.js'
import './GuestCelebration.css'

function OutfitImage({ source, description }) {
  const [images, setImages] = useState({ current: source, previous: null })
  if (images.current !== source) setImages({ current: source, previous: images.current })
  useEffect(() => {
    if (!images.previous) return
    const timer = window.setTimeout(() => setImages(current => ({ ...current, previous: null })), 650)
    return () => window.clearTimeout(timer)
  }, [images.current, images.previous])
  return <>
    {images.previous && <img key={`previous-${images.previous}`} className="guest-outfit-previous" src={images.previous} width="640" height="960" alt="" aria-hidden="true" draggable="false" />}
    <img key={images.current} className={`guest-outfit-current ${images.previous ? 'is-changing' : ''}`} src={images.current} width="640" height="960" loading="lazy" decoding="async" draggable="false" alt={description} />
  </>
}

export default function GuestCelebration({ choices }) {
  return <figure className="guest-celebration" id="celebration-guests" aria-label="An embroidered group of eight wedding guests">
    <div className="guest-celebration-scene">
      {ATTIRE_GUESTS.map(guest => <span className={`celebration-person is-${guest.gender}`} key={guest.id} data-guest={guest.id} style={{ '--guest-x': `${guest.x}%`, '--guest-depth': guest.depth, '--guest-size': `${guest.size}%` }}>
        <OutfitImage source={guestOutfitSource(getGuestOutfit(guest, choices))} description={`Wedding guest wearing ${getGuestColorName(choices, guest.gender)} ${guest.gender === 'male' ? 'formalwear' : 'a gown'}`} />
      </span>)}
    </div>
    <figcaption className="guest-outfit-caption" aria-live="polite" aria-atomic="true">
      <span><small>Gentlemen</small>{getGuestColorName(choices, 'male')}</span>
      <i aria-hidden="true">&amp;</i>
      <span><small>Ladies</small>{getGuestColorName(choices, 'female')}</span>
    </figcaption>
  </figure>
}
