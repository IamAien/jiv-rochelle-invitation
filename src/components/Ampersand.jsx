import glyph from '../assets/baskerville-ampersand.json'

// Use the exact option 05 outline without relying on an installed font.
export default function Ampersand() {
  return <span className="ampersand">
    <svg viewBox={glyph.viewBox} aria-hidden="true" focusable="false"><path d={glyph.path} fill="currentColor" /></svg>
    <span className="sr-only">&</span>
  </span>
}
