import { useEffect, useRef, useState } from 'react'
import { ATTIRE_PALETTES, chooseGuestColor } from '../attire.js'
import { preloadGuestColor } from '../attireArtwork.js'
import GuestCelebration from './GuestCelebration.jsx'

export default function GuestPalette({ children }) {
  const [message, setMessage] = useState('')
  const [hasTriedColor, setHasTriedColor] = useState(false)
  const paletteRef = useRef(null)
  const choicesRef = useRef({ male: null, female: null })
  const [choices, setChoices] = useState(choicesRef.current)
  const requests = useRef({ male: 0, female: 0 })
  useEffect(() => () => { requests.current.male++; requests.current.female++ }, [])
  useEffect(() => {
    const palette = paletteRef.current
    if (hasTriedColor) { palette.removeAttribute('data-discovery-ready'); return }
    if (typeof IntersectionObserver !== 'function') { palette.setAttribute('data-discovery-ready', ''); return }
    let disposed = false
    const observer = new IntersectionObserver(([entry]) => {
      if (disposed || !entry.isIntersecting) return
      palette.setAttribute('data-discovery-ready', '')
      observer.disconnect()
    }, { threshold: .4 })
    observer.observe(palette)
    return () => { disposed = true; observer.disconnect() }
  }, [hasTriedColor])
  const prepare = (gender, name) => preloadGuestColor(chooseGuestColor(choicesRef.current, gender, name), gender)
  const pick = async (gender, name) => {
    setHasTriedColor(true)
    const request = ++requests.current[gender]
    setMessage('')
    try {
      await prepare(gender, name)
      if (requests.current[gender] !== request) return
      const next = chooseGuestColor(choicesRef.current, gender, name)
      choicesRef.current = next
      setChoices(next)
    } catch {
      if (requests.current[gender] === request) setMessage('That outfit preview could not load. Please try the shade again.')
    }
  }

  return <section className="dress-section section" id="dress" aria-labelledby="dress-title">
    <p className="eyebrow">A little inspiration</p>
    <h2 id="dress-title">Dressed <em>for love</em></h2>
    <p className="dress-code">Formal attire</p>
    <p className="body-copy">We invite you to dress for a day of love and celebration in shades of blue and pink.</p>
    <div className="palettes" ref={paletteRef}>
      {ATTIRE_PALETTES.map(palette => <div className="palette-group" key={palette.title} role="group" aria-labelledby={`palette-${palette.family}`}>
        <h3 id={`palette-${palette.family}`}>{palette.title}</h3>
        <p className="palette-audience">{palette.audience}</p>
        <div className="swatches">{palette.colors.map(([name, color]) => <button type="button" className="swatch" key={name} aria-label={`${name} ${palette.family}`} aria-controls="celebration-guests" aria-pressed={choices[palette.gender]?.color === color} onPointerEnter={() => { prepare(palette.gender, name).catch(() => {}) }} onFocus={() => { prepare(palette.gender, name).catch(() => {}) }} onClick={() => pick(palette.gender, name)}>
          <span className="swatch-color" style={{ '--swatch': color }} aria-hidden="true"><span className="swatch-check">✓</span></span>
          <span>{name}</span>
        </button>)}</div>
      </div>)}
      <span className="palette-invitation" id="palette-invitation" aria-hidden={hasTriedColor}>
        <svg viewBox="0 0 44 28" aria-hidden="true" focusable="false"><path d="M40 23C18 26 10 15 15 4" strokeDasharray="2 3" /><path d="m10 8 5-5 4 6" /></svg>
        <span>Try a shade on</span>
      </span>
    </div>
    <GuestCelebration choices={choices} />
    <div className={message ? 'palette-status' : 'sr-only'} role="status">{message}</div>
    {children}
  </section>
}
