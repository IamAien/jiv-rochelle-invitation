import { useState } from 'react'
import { GOOGLE_FORM_URL, getGoogleFormLinks } from '../rsvp.js'
import './WeddingRsvp.css'

export default function WeddingRsvp({ formUrl = GOOGLE_FORM_URL }) {
  const links = getGoogleFormLinks(formUrl)
  const [showForm, setShowForm] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)

  return <section className="rsvp-section section" id="rsvp" aria-labelledby="rsvp-title">
    <p className="eyebrow">We hope you can join us</p>
    <h2 id="rsvp-title">Celebrate <em>with us</em></h2>
    <p className="section-intro">Your presence would mean the world to us.</p>
    <div className="rsvp-card">
      <span className="rsvp-card-label">Jiv &amp; Rochelle · February 7, 2027</span>
      {links ? <>
        <h3>Will you join us?</h3>
        {links.embed ? <>
          <button type="button" className="rsvp-button" aria-expanded={showForm} aria-controls="rsvp-google-form" onClick={() => { setHasOpened(true); setShowForm(value => !value) }}>
            {showForm ? 'Close the form' : 'Fill in your RSVP'} <span aria-hidden="true">{showForm ? '−' : '↗'}</span>
          </button>
          <div id="rsvp-google-form" hidden={!showForm}>
            {hasOpened && <iframe className="rsvp-google-form" src={links.embed} title="RSVP for Jiv and Rochelle’s wedding" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />}
          </div>
          <a className="rsvp-open-link" href={links.responder} target="_blank" rel="noopener noreferrer">Open form in a new tab <span aria-hidden="true">↗</span></a>
        </> : <a className="rsvp-button" href={links.responder} target="_blank" rel="noopener noreferrer">Fill in your RSVP <span aria-hidden="true">↗</span></a>}
        <p className="rsvp-footnote">Please select Submit in the form to send your response.</p>
      </> : <>
        <h3>RSVP will open soon</h3>
        <p className="rsvp-card-copy">Please check back to let us know if you can join us. We can’t wait to celebrate together.</p>
      </>}
    </div>
  </section>
}
