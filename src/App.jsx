import { useEffect, useRef, useState } from 'react'
import { ENVELOPE_OPENING_MS, ENVELOPE_CROSSFADE_MS, getCountdown, getTimelineProgress, getTimelineActiveIndex } from './wedding.js'
import countdownFrame from './assets/embroidered-countdown-frame.webp'
import EnvelopeOpening from './components/EnvelopeOpening.jsx'
import CoastalScene from './components/CoastalScene.jsx'
import InvitationCopy from './components/InvitationCopy.jsx'
import TimelineArtwork from './components/TimelineArtwork.jsx'
import { setupScrollReveals } from './scrollReveal.js'
import WeddingNavigation from './components/WeddingNavigation.jsx'
import WeddingStory from './components/WeddingStory.jsx'
import GuestPalette from './components/GuestPalette.jsx'
import WeddingVenues from './components/WeddingVenues.jsx'
import WeddingGallery from './components/WeddingGallery.jsx'
import WeddingRsvp from './components/WeddingRsvp.jsx'
import Ampersand from './components/Ampersand.jsx'
import './App.css'

const EVENTS = [
  { icon: 'arch', time: '1:00 PM', title: 'The ceremony', description: 'The Archdiocesan Shrine of the Most Sacred Heart of Jesus', note: 'Our forever begins.' },
  { icon: 'couple', time: 'After “I do”', title: 'A little time together', description: 'Photographs, happy tears, and wishes for the newlyweds.', note: 'A moment to remember.' },
  { icon: 'cake', time: '5:00 PM', title: 'The reception', description: 'Marco Polo Plaza Cebu', note: 'Let the celebration begin.' },
  { icon: 'disco', time: 'Into the evening', title: 'Love & celebration', description: 'Good food, heartfelt toasts, and a little dancing.', note: 'Memories to last a lifetime.' },
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
    <p className="eyebrow">Every day, a little closer</p><h2 id="countdown-title">Counting down<br /><em>to forever</em></h2>
    <p className="section-intro">Until we say “I do,” with you by our side.</p>
    <div className="countdown" role="timer" aria-label={`${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes, ${remaining.seconds} seconds until the wedding`}>
      <img className="countdown-frame" src={countdownFrame} width="2172" height="724" alt="" aria-hidden="true" loading="lazy" />
      {[['days', 24.2], ['hours', 41.6], ['minutes', 58.7], ['seconds', 76.7]].map(([unit, center]) => (
        <div className="countdown-unit" key={unit} data-unit={unit} style={{ '--unit-center': `${center}%` }} aria-hidden="true">
          <span className="countdown-value">{String(remaining[unit]).padStart(2, '0')}</span>
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
    const events = [...track.querySelectorAll('.timeline-event')]
    let frame = 0
    let active = -1
    const focusEvent = next => {
      if (next === active) return
      active = next
      events.forEach((event, index) => {
        event.toggleAttribute('data-current', index === next)
        if (index === next) event.setAttribute('aria-current', 'step')
        else event.removeAttribute('aria-current')
      })
    }
    const update = () => {
      const bounds = track.getBoundingClientRect()
      const progress = getTimelineProgress(bounds.top, bounds.height, window.innerHeight)
      const pearlY = progress * Math.max(0, bounds.height - 5)
      track.style.setProperty('--progress', progress)
      track.style.setProperty('--pearl-y', `${pearlY}px`)
      const inView = bounds.bottom > 0 && bounds.top < window.innerHeight
      track.toggleAttribute('data-focus-ready', inView)
      const markers = events.map(event => event.offsetTop + (event.querySelector('.timeline-artwork')?.offsetHeight ?? 0) / 2)
      focusEvent(inView ? getTimelineActiveIndex(pearlY, markers) : -1)
      frame = 0
    }
    const queueUpdate = () => { if (!frame) frame = window.requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', queueUpdate, { passive: true })
    window.addEventListener('resize', queueUpdate)
    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(queueUpdate) : null
    observer?.observe(track)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', queueUpdate)
      window.removeEventListener('resize', queueUpdate)
      observer?.disconnect()
      track.removeAttribute('data-focus-ready')
      events.forEach(event => { event.removeAttribute('data-current'); event.removeAttribute('aria-current') })
    }
  }, [])
  return <section className="timeline-section section" id="timeline" aria-labelledby="timeline-title">
    <p className="eyebrow">The day we’ve been dreaming of</p><h2 id="timeline-title">Our wedding <em>day</em></h2>
    <p className="section-intro">A beautiful beginning, one moment at a time.</p>
    <div className="timeline" ref={trackRef}>
      <div className="timeline-thread" aria-hidden="true"><span className="timeline-fill" /></div>
      <ol className="timeline-events">{EVENTS.map(event => <li className="timeline-event" key={event.title}><div className="timeline-art"><TimelineArtwork kind={event.icon} /></div><div className="timeline-copy"><p className="event-time">{event.time}</p><h3>{event.title}</h3><p>{event.description}</p><span className="event-note">{event.note}</span></div></li>)}</ol>
      <span className="traveling-pearl" aria-hidden="true" />
      <TimelineArtwork kind="moon" className="timeline-ending" />
    </div>
  </section>
}

export default function App() {
  const [stage, setStage] = useState('closed')
  const [openingStarted, setOpeningStarted] = useState(false)
  const [coastalReady, setCoastalReady] = useState(false)
  const [openingCycle, setOpeningCycle] = useState(0)
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
    setCoastalReady(false)
    setOpeningCycle(cycle => cycle + 1)
    setOpeningStarted(false)
    setStage('closed')
  }
  return <>
    <div ref={contentRef} className={`invitation-shell ${openingStarted ? 'has-started' : ''} ${stage === 'done' ? 'is-open' : ''}`} inert={stage !== 'done'}
      style={{ '--page-reveal-delay': `${ENVELOPE_OPENING_MS - ENVELOPE_CROSSFADE_MS}ms`, '--page-reveal-duration': `${ENVELOPE_CROSSFADE_MS}ms` }}>
      <WeddingNavigation enabled={stage === 'done'} />
      <main>
        <section className="invitation-cover" id="invitation" aria-labelledby="couple-names">
          <CoastalScene key={openingCycle} enabled={stage === 'done'} onReady={setCoastalReady} />
          <div className="invitation-text"><InvitationCopy headingRef={headingRef} /></div>
        </section>
        <section className="welcome-section section" id="welcome">
          <p className="eyebrow">With full hearts</p>
          <h2>A day for love.<br /><em>A lifetime of us.</em></h2>
          <Flourish />
          <p className="full-names">Jiv Stevens T. Gonzales<Ampersand />Rochelle Ann P. Reyes</p>
          <h3 className="welcome-message">Welcome to Our Wedding</h3>
          <p className="body-copy">We are so happy to celebrate this day with you</p>
        </section>
        <Countdown />
        <Timeline />
        <WeddingVenues><Flourish /></WeddingVenues>
        <WeddingStory enabled={stage === 'done'}><Flourish className="story-ornament" /></WeddingStory>
        <WeddingGallery />
        <GuestPalette><Flourish /></GuestPalette>
        <WeddingRsvp />
      </main>
      <footer className="closing-section section"><p className="eyebrow">We can’t wait to celebrate with you</p><Monogram /><p className="closing-names">Jiv <Ampersand /> Rochelle</p><p className="closing-date">February 7, 2027 · Cebu</p><button className="replay-button" onClick={replayOpening}><span aria-hidden="true">↺</span> Open the magic again</button></footer>
    </div>
    <EnvelopeOpening key={openingCycle} stage={stage} sceneReady={coastalReady} onOpen={openInvitation} onUnavailable={handleEnvelopeUnavailable} />
  </>
}
