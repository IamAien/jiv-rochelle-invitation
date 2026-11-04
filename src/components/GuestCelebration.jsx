import { ATTIRE_GUESTS, getGuestColorName, getGuestOutfit } from '../attire.js'
import { guestOutfitSource } from '../attireArtwork.js'
import './GuestCelebration.css'

export default function GuestCelebration({ choices }) {
  return <figure className="guest-celebration" id="celebration-guests" aria-label="An embroidered group of eight wedding guests">
    <div className="guest-celebration-scene">
      {ATTIRE_GUESTS.map(guest => <span className={`celebration-person is-${guest.gender}`} key={guest.id} data-guest={guest.id} style={{ '--guest-x': `${guest.x}%`, '--guest-depth': guest.depth, '--guest-size': `${guest.size}%` }}>
        <img src={guestOutfitSource(getGuestOutfit(guest, choices))} width="640" height="960" loading="lazy" decoding="async" draggable="false" alt={`Wedding guest wearing ${getGuestColorName(choices, guest.gender)} ${guest.gender === 'male' ? 'formalwear' : 'a gown'}`} />
      </span>)}
    </div>
    <figcaption className="guest-outfit-caption" aria-live="polite" aria-atomic="true">
      <span><small>Gentlemen</small>{getGuestColorName(choices, 'male')}</span>
      <i aria-hidden="true">&amp;</i>
      <span><small>Ladies</small>{getGuestColorName(choices, 'female')}</span>
    </figcaption>
  </figure>
}
