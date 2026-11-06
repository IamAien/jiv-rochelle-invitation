import { WEDDING_EVENTS } from '../calendar.js'
import { WEDDING_DATE } from '../wedding.js'

function Venue({ event, index }) {
  return <article className="venue">
    <span className="venue-number">0{index + 1}</span>
    <p className="eyebrow">{event.label} · {event.time}</p>
    <h3>{event.id === 'ceremony' ? <>The Archdiocesan Shrine<br />of the Most Sacred<br />Heart of Jesus</> : <>Marco Polo<br />Plaza Cebu</>}</h3>
    <div className="venue-actions">
      <a className="text-button" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.mapQuery)}`} target="_blank" rel="noreferrer">Find your way <span aria-hidden="true">↗</span></a>
    </div>
  </article>
}

export default function WeddingVenues({ children }) {
  return <section className="venues-section section" id="details" aria-labelledby="venues-title">
    {children}
    <p className="eyebrow">Two places. One beautiful day.</p>
    <h2 id="venues-title">Meet us <em>here</em></h2>
    <time className="venues-date" dateTime={WEDDING_DATE.slice(0, 10)}>Sunday, 07 February 2027</time>
    <div className="venue-list">{WEDDING_EVENTS.map((event, index) => <Venue key={event.id} event={event} index={index} />)}</div>
  </section>
}
