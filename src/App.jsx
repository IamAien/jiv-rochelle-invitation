import { useEffect, useRef, useState } from 'react'
import { GATE_OPENING_MS, getCountdown, getTimelineProgress, WEDDING_DATE } from './wedding.js'
import invitationPortrait from './assets/muted-ceremony-portrait.webp'
import invitationLandscape from './assets/muted-ceremony-landscape.webp'
import desktopCeremony from './assets/desktop-ceremony-supplied.jpg'
import florals from './assets/blue-ribbon-garland.webp'
import countdownFrame from './assets/embroidered-countdown-frame.webp'
import GardenEntrance from './components/GardenEntrance.jsx'
import { setupScrollReveals } from './scrollReveal.js'
import './App.css'

const EVENTS = [
  { icon: 'chapel', time: '1:00 PM', title: 'The ceremony', description: 'The Archdiocesan Shrine of the Most Sacred Heart of Jesus', note: 'Our forever begins.' },
  { icon: 'rings', time: 'After “I do”', title: 'A little time together', description: 'Photographs, happy tears, and wishes for the newlyweds.', note: 'A moment to remember.' },
  { icon: 'glass', time: '5:00 PM', title: 'The reception', description: 'Marco Polo Plaza Cebu', note: 'Let the celebration begin.' },
  { icon: 'sparkle', time: 'Into the evening', title: 'Love & celebration', description: 'Good food, heartfelt toasts, and a little dancing.', note: 'Memories to last a lifetime.' },
]

const PALETTES = [
  { title: 'Shades of blue', colors: [['Misty', '#bccddb'], ['Powder', '#a9c3dd'], ['French', '#7399c9'], ['Cloud', '#d9e5f0'], ['Slate', '#6c7ea3']] },
  { title: 'Shades of pink', colors: [['Blush', '#f2d1cc'], ['Dusty', '#d3a3a3'], ['Rose', '#e59fb0'], ['Peach', '#f5c2a6'], ['Soft', '#f8dde1']] },
]

function Flourish({ className = '' }) {
  return <div className={`flourish ${className}`} aria-hidden="true"><span /><i>❧</i><span /></div>
}

function EventIcon({ kind }) {
  return <span className={`event-icon ${kind}`} aria-hidden="true" />
}
function Monogram({ small = false }) {
  return <span className={small ? 'monogram small' : 'monogram'} aria-label="Jiv and Rochelle">J<span>&</span>R</span>
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
      track.style.setProperty('--progress', getTimelineProgress(bounds.top, bounds.height, window.innerHeight))
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
      <div className="timeline-thread" aria-hidden="true"><span className="timeline-fill" /><span className="traveling-pearl" /></div>
      <ol className="timeline-events">{EVENTS.map(event => <li className="timeline-event" key={event.title}><div className="timeline-art"><EventIcon kind={event.icon} /></div><div className="timeline-copy"><p className="event-time">{event.time}</p><h3>{event.title}</h3><p>{event.description}</p><span className="event-note">{event.note}</span></div></li>)}</ol>
      <span className="timeline-end" aria-hidden="true">♡</span>
    </div>
  </section>
}

function addToCalendar() {
  const calendar = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Jiv and Rochelle//Wedding//EN', 'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT', 'UID:jiv-rochelle-ceremony-20270207@wedding', 'DTSTAMP:20261101T000000Z', 'DTSTART:20270207T050000Z', 'SUMMARY:Jiv & Rochelle — Wedding ceremony', 'LOCATION:The Archdiocesan Shrine of the Most Sacred Heart of Jesus\\, Cebu', 'DESCRIPTION:Join Jiv and Rochelle as they begin their forever.', 'END:VEVENT',
    'BEGIN:VEVENT', 'UID:jiv-rochelle-reception-20270207@wedding', 'DTSTAMP:20261101T000000Z', 'DTSTART:20270207T090000Z', 'SUMMARY:Jiv & Rochelle — Wedding reception', 'LOCATION:Marco Polo Plaza Cebu', 'DESCRIPTION:Celebrate with the newlyweds.', 'END:VEVENT', 'END:VCALENDAR', '',
  ].join('\r\n')
  const url = URL.createObjectURL(new Blob([calendar], { type: 'text/calendar;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'Jiv-and-Rochelle-Wedding.ics'
  document.body.append(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export default function App() {
  const [stage, setStage] = useState('closed')
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
    const timer = window.setTimeout(() => setStage('done'), reduceMotion ? 200 : GATE_OPENING_MS)
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
    setStage('opening')
  }
  const handleEntranceUnavailable = () => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setStage('done')
  }
  const replayOpening = () => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setStage('closed')
  }
  return <>
    <div ref={contentRef} className={`invitation-shell ${stage === 'done' ? 'is-open' : ''}`} inert={stage !== 'done'}>
      <header className="site-header"><a className="header-monogram" href="#invitation" aria-label="Back to invitation"><Monogram small /></a><nav aria-label="Wedding invitation"><a href="#countdown">The countdown</a><a href="#timeline">The day</a><a href="#details">The details</a></nav><span className="header-date">07.02.27</span></header>
      <main>
        <section className="invitation-cover" id="invitation" aria-labelledby="couple-names">
          <picture>
            <source media="(min-width: 900px)" srcSet={desktopCeremony} />
            <source media="(min-width: 900px), (orientation: landscape)" srcSet={invitationLandscape} />
            <img className="villa-art" src={invitationPortrait} alt="Embroidered ceremony garden with an ivory arch, blue curtain ties, a fountain, stone path, and flowers and trees sewn in visible cotton stitches on linen" fetchPriority="high" />
          </picture>
          <div className="invitation-text"><p className="invite-prelude">Together with their families</p><h1 id="couple-names" ref={headingRef} tabIndex="-1" aria-label="Jiv and Rochelle">Jiv<span>&</span>Rochelle</h1><time className="wedding-date" dateTime={WEDDING_DATE}>February 7, 2027</time><p className="cover-location">Cebu, Philippines</p></div>
          <a href="#welcome" className="discover-link">Our forever starts here <span>↓</span></a>
        </section>
        <section className="welcome-section section" id="welcome"><p className="eyebrow">With full hearts</p><h2>A day for love.<br /><em>A lifetime of us.</em></h2><Flourish /><p className="full-names">Jiv Stevens T. Gonzales<span>&</span>Rochelle Ann P. Reyes</p><p className="body-copy">We’re getting married, and it would mean the world to have you there. Join us for a day of happy tears, warm embraces, and the beginning of our forever.</p><button className="text-button" onClick={addToCalendar}>Save our date <span aria-hidden="true">↗</span></button></section>
        <Countdown />
        <Timeline />
        <section className="venues-section section" id="details" aria-labelledby="venues-title">
          <Flourish /><p className="eyebrow">Two places. One beautiful day.</p><h2 id="venues-title">Meet us <em>here</em></h2>
          <div className="venue-list"><article className="venue"><span className="venue-number">01</span><p className="eyebrow">The ceremony · 1:00 PM</p><h3>The Archdiocesan Shrine<br />of the Most Sacred<br />Heart of Jesus</h3><p>Cebu City, Philippines</p><a className="text-button" href="https://www.google.com/maps/search/?api=1&query=Archdiocesan+Shrine+Most+Sacred+Heart+of+Jesus+Cebu" target="_blank" rel="noreferrer">Find your way <span aria-hidden="true">↗</span></a></article><article className="venue"><span className="venue-number">02</span><p className="eyebrow">The reception · 5:00 PM</p><h3>Marco Polo<br />Plaza Cebu</h3><p>Cebu City, Philippines</p><a className="text-button" href="https://www.google.com/maps/search/?api=1&query=Marco+Polo+Plaza+Cebu" target="_blank" rel="noreferrer">Find your way <span aria-hidden="true">↗</span></a></article></div>
          <p className="timezone-note">All times are in Philippine Standard Time (UTC+8).</p>
        </section>
        <section className="story-section section" id="story"><span className="story-ornament" aria-hidden="true">❦</span><p className="eyebrow">Some things are meant to be</p><h2>A chance meeting.<br /><em>An endless story.</em></h2><div className="story-copy"><p>We met in law school, then went on with our separate lives—until the last day of the Bar exams brought us together again.</p><p>Our exam rooms were right beside each other. Choosing to leave the questions behind, we walked out of the school together.</p><p>What followed were texts, conversations, and a connection neither of us had planned. Somewhere between those everyday exchanges, we fell in love.</p><p>Now, that unexpected walk has led us here—to the beginning of a lifetime together.</p></div><span className="story-signature">And so, our forever begins.</span></section>
        <section className="dress-section section" aria-labelledby="dress-title"><img className="floral-garland" src={florals} alt="" loading="lazy" /><p className="eyebrow">A little inspiration</p><h2 id="dress-title">Dressed <em>for love</em></h2><p className="dress-code">Formal attire</p><p className="body-copy">We invite you to dress for a day of love and celebration in shades of blue and pink.</p><div className="palettes">{PALETTES.map(palette => <div className="palette-group" key={palette.title}><h3>{palette.title}</h3><div className="swatches">{palette.colors.map(([name, color]) => <div className="swatch" key={name}><span className="swatch-color" style={{ '--swatch': color }} /><span>{name}</span></div>)}</div></div>)}</div><Flourish /></section>
      </main>
      <footer className="closing-section section"><p className="eyebrow">We can’t wait to celebrate with you</p><Monogram /><p className="closing-names">Jiv & Rochelle</p><p className="closing-date">February 7, 2027 · Cebu</p><button className="replay-button" onClick={replayOpening}><span aria-hidden="true">↺</span> Open the magic again</button><img className="closing-florals" src={florals} alt="" loading="lazy" /></footer>
    </div>
    <GardenEntrance stage={stage} onOpen={openInvitation} onUnavailable={handleEntranceUnavailable} />
  </>
}
