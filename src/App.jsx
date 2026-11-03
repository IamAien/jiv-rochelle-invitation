import { useEffect, useRef, useState } from 'react'
import { ENVELOPE_OPENING_MS, ENVELOPE_CROSSFADE_MS, getCountdown, getTimelineProgress, WEDDING_DATE } from './wedding.js'
import { INVITATION_ARTWORK } from './invitationArtwork.js'
import florals from './assets/woven-garden-garland.webp'
import countdownFrame from './assets/woven-countdown-frame.webp'
import EnvelopeOpening from './components/EnvelopeOpening.jsx'
import StitchedTimelineIcon from './components/StitchedTimelineIcon.jsx'
import { setupScrollReveals } from './scrollReveal.js'
import WeddingNavigation from './components/WeddingNavigation.jsx'
import WeddingStory from './components/WeddingStory.jsx'
import GuestPalette from './components/GuestPalette.jsx'
import WeddingVenues from './components/WeddingVenues.jsx'
import WeddingGallery from './components/WeddingGallery.jsx'
import Ampersand from './components/Ampersand.jsx'
import { downloadWeddingCalendar } from './calendar.js'
import './App.css'

const EVENTS = [
  { icon: 'chapel', time: '1:00 PM', title: 'The ceremony', description: 'The Archdiocesan Shrine of the Most Sacred Heart of Jesus', note: 'Our forever begins.' },
  { icon: 'rings', time: 'After “I do”', title: 'A little time together', description: 'Photographs, happy tears, and wishes for the newlyweds.', note: 'A moment to remember.' },
  { icon: 'glass', time: '5:00 PM', title: 'The reception', description: 'Marco Polo Plaza Cebu', note: 'Let the celebration begin.' },
  { icon: 'sparkle', time: 'Into the evening', title: 'Love & celebration', description: 'Good food, heartfelt toasts, and a little dancing.', note: 'Memories to last a lifetime.' },
]

function Flourish({ className = '' }) {
  return <div className={`flourish ${className}`} aria-hidden="true"><span /><i /><span /></div>
}

function Monogram({ small = false }) {
  return <span className={small ? 'monogram small' : 'monogram'} aria-label="Jiv and Rochelle">J<Ampersand />R</span>
}

function Countdown() {
  const [remaining, setRemaining] = useState(() => getCountdown())
  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getCountdown()), 1000)
    return () => window.clearInterval(timer)
  }, [])
  return <section className="countdown-section section" id="countdown" aria-labelledby="countdown-title">
    <img className="floral-garland" src={florals} alt="" loading="lazy" />
    <p className="eyebrow">Every day, a little closer</p><h2 id="countdown-title">Counting down<br /><em>to forever</em></h2>
    <p className="section-intro">Until we say “I do,” with you by our side.</p>
    <div className="countdown" role="timer" aria-label={`${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes, ${remaining.seconds} seconds until the wedding`}>
      {['days', 'hours', 'minutes', 'seconds'].map(unit => (
        <div className="countdown-unit" key={unit}>
          <div className="countdown-medallion">
            <img className="countdown-frame" src={countdownFrame} alt="" aria-hidden="true" loading="lazy" />
            <span className="countdown-value">{String(remaining[unit]).padStart(2, '0')}</span>
          </div>
          <span className="countdown-label">{unit}</span>
        </div>
      ))}
    </div>
    <p className="countdown-footnote">{remaining.isPast ? 'Our forever has begun.' : 'Sunday, the seventh of February, 2027'}</p><Flourish />
  </section>
}

function Timeline() {
  const trackRef = useRef(null)
  useEffect(() => {
    const track = trackRef.current
    let frame = 0
    const update = () => {
      const bounds = track.getBoundingClientRect()
      const progress = getTimelineProgress(bounds.top, bounds.height, window.innerHeight)
      track.style.setProperty('--progress', progress)
      track.style.setProperty('--pearl-y', `${progress * Math.max(0, bounds.height - 5)}px`)
      frame = 0
    }
    const queueUpdate = () => { if (!frame) frame = window.requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', queueUpdate, { passive: true })
    window.addEventListener('resize', queueUpdate)
    const observer = new ResizeObserver(queueUpdate)
    observer.observe(track)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', queueUpdate)
      window.removeEventListener('resize', queueUpdate)
      observer.disconnect()
    }
  }, [])
  return <section className="timeline-section section" id="timeline" aria-labelledby="timeline-title">
    <p className="eyebrow">The day we’ve been dreaming of</p><h2 id="timeline-title">Our wedding <em>day</em></h2>
    <p className="section-intro">A beautiful beginning, one moment at a time.</p>
    <div className="timeline" ref={trackRef}>
      <div className="timeline-thread" aria-hidden="true"><span className="timeline-fill" /></div>
      <ol className="timeline-events">{EVENTS.map(event => <li className="timeline-event" key={event.title}><div className="timeline-art"><StitchedTimelineIcon kind={event.icon} /></div><div className="timeline-copy"><p className="event-time">{event.time}</p><h3>{event.title}</h3><p>{event.description}</p><span className="event-note">{event.note}</span></div></li>)}</ol>
      <span className="traveling-pearl" aria-hidden="true" />
      <span className="timeline-end" aria-hidden="true" />
    </div>
  </section>
}

export default function App() {
  const [stage, setStage] = useState('closed')
  const [openingStarted, setOpeningStarted] = useState(false)
  const headingRef = useRef(null)
  const contentRef = useRef(null)
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    if (stage !== 'done') document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [stage])
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (stage !== 'opening') return
    const timer = window.setTimeout(() => setStage('done'), reduceMotion ? 200 : ENVELOPE_OPENING_MS)
    return () => window.clearTimeout(timer)
  }, [stage])
  useEffect(() => {
    if (stage === 'done') headingRef.current?.focus({ preventScroll: true })
  }, [stage])
  useEffect(() => {
    if (stage !== 'done') return
    return setupScrollReveals(contentRef.current)
  }, [stage])
  const openInvitation = () => {
    if (stage !== 'closed') return
    window.scrollTo({ top: 0, behavior: 'instant' })
    setOpeningStarted(true)
    setStage('opening')
  }
  const handleEnvelopeUnavailable = () => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setStage('done')
  }
  const replayOpening = () => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setOpeningStarted(false)
    setStage('closed')
  }
  return <>
    <div ref={contentRef} className={`invitation-shell ${openingStarted ? 'has-started' : ''} ${stage === 'done' ? 'is-open' : ''}`} inert={stage !== 'done'}
      style={{ '--page-reveal-delay': `${ENVELOPE_OPENING_MS - ENVELOPE_CROSSFADE_MS}ms`, '--page-reveal-duration': `${ENVELOPE_CROSSFADE_MS}ms` }}>
      <WeddingNavigation enabled={stage === 'done'} />
      <main>
        <section className="invitation-cover" id="invitation" aria-labelledby="couple-names">
          <img className="villa-art" src={INVITATION_ARTWORK.src} width={INVITATION_ARTWORK.width} height={INVITATION_ARTWORK.height} alt="Embroidered coastal villa and flower-filled garden overlooking the blue sea, framed by ivory blossoms on warm linen" fetchPriority="high" />
          <div className="invitation-text"><p className="invite-prelude">Together with their families</p><h1 id="couple-names" ref={headingRef} tabIndex="-1" aria-label="Jiv and Rochelle">Jiv<Ampersand />Rochelle</h1><time className="wedding-date" dateTime={WEDDING_DATE}>February 7, 2027</time><p className="cover-location">Cebu, Philippines</p></div>
          <a href="#welcome" className="discover-link">Our forever starts here <span>↓</span></a>
        </section>
        <section className="welcome-section section" id="welcome"><p className="eyebrow">With full hearts</p><h2>A day for love.<br /><em>A lifetime of us.</em></h2><Flourish /><p className="full-names">Jiv Stevens T. Gonzales<Ampersand />Rochelle Ann P. Reyes</p><p className="body-copy">We’re getting married, and it would mean the world to have you there. Join us for a day of happy tears, warm embraces, and the beginning of our forever.</p><button className="text-button" onClick={() => downloadWeddingCalendar()}>Save our date <span aria-hidden="true">↗</span></button></section>
        <Countdown />
        <Timeline />
        <WeddingVenues><Flourish /></WeddingVenues>
        <WeddingStory enabled={stage === 'done'}><Flourish className="story-ornament" /></WeddingStory>
        <WeddingGallery />
        <GuestPalette><Flourish /></GuestPalette>
      </main>
      <footer className="closing-section section"><p className="eyebrow">We can’t wait to celebrate with you</p><Monogram /><p className="closing-names">Jiv <Ampersand /> Rochelle</p><p className="closing-date">February 7, 2027 · Cebu</p><button className="replay-button" onClick={replayOpening}><span aria-hidden="true">↺</span> Open the magic again</button></footer>
    </div>
    <EnvelopeOpening stage={stage} onOpen={openInvitation} onUnavailable={handleEnvelopeUnavailable} />
  </>
}
