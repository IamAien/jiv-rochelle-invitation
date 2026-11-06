import { useCallback, useRef, useState } from 'react'
import { useScrollFrame } from '../useScrollFrame.js'
import Ampersand from './Ampersand.jsx'

const LINKS = [
  ['countdown', 'The countdown'],
  ['timeline', 'The day'],
  ['details', 'The details'],
  ['story', 'Our story'],
  ['moments', 'Our moments'],
  ['dress', 'Attire'],
  ['rsvp', 'RSVP'],
]

export default function WeddingNavigation({ enabled }) {
  const [current, setCurrent] = useState('')
  const thread = useRef(null)
  const measure = useCallback(() => {
    const height = document.documentElement.scrollHeight - window.innerHeight
    const progress = height > 0 ? Math.min(1, Math.max(0, window.scrollY / height)) : 0
    thread.current?.style.setProperty('--reading-progress', progress)
    const readingLine = Math.min(window.innerHeight * 0.3, 200)
    const visible = LINKS.find(([id]) => {
      const bounds = document.getElementById(id)?.getBoundingClientRect()
      return bounds && bounds.top <= readingLine && bounds.bottom > readingLine
    })
    setCurrent(visible?.[0] ?? '')
  }, [])
  useScrollFrame(enabled, measure)

  return <header className="site-header">
    <a className="header-monogram" href="#invitation" aria-label="Back to invitation">
      <span className="monogram small" aria-label="Jiv and Rochelle">J<Ampersand />R</span>
    </a>
    <nav aria-label="Wedding invitation">
      {LINKS.map(([id, label], index) => <a key={id} href={`#${id}`} className={id === 'rsvp' ? 'rsvp-nav' : index > 2 ? 'secondary-nav' : undefined} aria-current={current === id ? 'location' : undefined}>{label}</a>)}
    </nav>
    <span className="header-date">07.02.27</span>
    <div className="reading-thread" ref={thread} aria-hidden="true"><span /></div>
  </header>
}
