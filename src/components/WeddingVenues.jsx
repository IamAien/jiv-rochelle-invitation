import { useState } from 'react'
import { downloadWeddingCalendar, WEDDING_EVENTS } from '../calendar.js'

function Venue({ event, index }) {
  const [saved, setSaved] = useState(false)
  const save = () => { downloadWeddingCalendar(event.id); setSaved(true) }
  return <article className="venue">
    <span className="venue-number">0{index + 1}</span>
    <p className="eyebrow">{event.label} · {event.time}</p>
    <h3>{event.id === 'ceremony' ? <>The Archdiocesan Shrine<br />of the Most Sacred<br />Heart of Jesus</> : <>Marco Polo<br />Plaza Cebu</>}</h3>
    <p>Cebu City, Philippines</p>
    <div className="venue-actions">
      <a className="text-button" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.mapQuery)}`} target="_blank" rel="noreferrer">Find your way <span aria-hidden="true">↗</span></a>
      <button type="button" className="text-button" onClick={save} aria-label={`Save ${event.label.toLowerCase()} to your calendar`}>Save {event.id} <span aria-hidden="true">+</span></button>
    </div>
    <span className="venue-feedback" role="status">{saved ? 'Your calendar file is ready.' : ''}</span>
  </article>
}

export default function WeddingVenues({ children }) {
  return <section className="venues-section section" id="details" aria-labelledby="venues-title">
    {children}
    <p className="eyebrow">Two places. One beautiful day.</p>
    <h2 id="venues-title">Meet us <em>here</em></h2>
    <div className="venue-list">{WEDDING_EVENTS.map((event, index) => <Venue key={event.id} event={event} index={index} />)}</div>
    <p className="timezone-note">All times are in Philippine Standard Time (UTC+8).</p>
  </section>
}
