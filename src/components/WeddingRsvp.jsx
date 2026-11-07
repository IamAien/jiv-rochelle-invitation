import { GOOGLE_FORM_URL, getGoogleFormLinks } from '../rsvp.js'
import './WeddingRsvp.css'

export default function WeddingRsvp({ formUrl = GOOGLE_FORM_URL }) {
  const links = getGoogleFormLinks(formUrl)

  return <section className="rsvp-section section" id="rsvp" aria-labelledby="rsvp-title">
    <p className="eyebrow">We hope you can join us</p>
    <h2 id="rsvp-title">Celebrate <em>with us</em></h2>
    <p className="section-intro">Your presence would mean the world to us.</p>
    <div className="rsvp-card">
      <span className="rsvp-card-label">Jiv &amp; Rochelle · February 7, 2027</span>
      {links ? <>
        <h3>Will you join us?</h3>
        <a className="rsvp-button" href={links.responder} target="_blank" rel="noopener noreferrer">Fill in your RSVP <span aria-hidden="true">↗</span></a>
        <p className="rsvp-footnote">Please select Submit in the form to send your response.</p>
      </> : <>
        <h3>RSVP will open soon</h3>
        <p className="rsvp-card-copy">Please check back to let us know if you can join us. We can’t wait to celebrate together.</p>
      </>}
    </div>
  </section>
}
