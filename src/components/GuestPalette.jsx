import { useRef, useState } from 'react'

const PALETTES = [
  { title: 'Shades of blue', family: 'Blue', colors: [['Misty', '#bccddb'], ['Powder', '#a9c3dd'], ['French', '#7399c9'], ['Cloud', '#d9e5f0'], ['Slate', '#6c7ea3']] },
  { title: 'Shades of pink', family: 'Pink', colors: [['Blush', '#f2d1cc'], ['Dusty', '#d3a3a3'], ['Rose', '#e59fb0'], ['Peach', '#f5c2a6'], ['Soft', '#f8dde1']] },
]

export default function GuestPalette({ children }) {
  const [selected, setSelected] = useState(null)
  const [message, setMessage] = useState('')
  const selection = useRef(null)
  const pick = (name, color) => {
    selection.current = color
    setSelected({ name, color })
    setMessage('')
  }
  const reset = () => {
    selection.current = null
    setSelected(null)
    setMessage('')
  }
  const copyColor = async () => {
    if (!selected) return
    const { color, name } = selected
    try {
      await navigator.clipboard.writeText(color.toUpperCase())
      if (selection.current === color) setMessage(`${name} color code copied.`)
    } catch {
      if (selection.current === color) setMessage(`Copy this color code: ${color.toUpperCase()}`)
    }
  }

  return <section className="dress-section section" id="dress" aria-labelledby="dress-title">
    <p className="eyebrow">A little inspiration</p>
    <h2 id="dress-title">Dressed <em>for love</em></h2>
    <p className="dress-code">Formal attire</p>
    <p className="body-copy">We invite you to dress for a day of love and celebration in shades of blue and pink.</p>
    <p className="palette-hint" id="palette-hint">Choose a little color inspiration below.</p>
    <div className="palettes" aria-describedby="palette-hint">
      {PALETTES.map(palette => <div className="palette-group" key={palette.title} role="group" aria-labelledby={`palette-${palette.family}`}>
        <h3 id={`palette-${palette.family}`}>{palette.title}</h3>
        <div className="swatches">{palette.colors.map(([name, color]) => <button type="button" className="swatch" key={name} aria-label={`${name} ${palette.family}`} aria-pressed={selected?.color === color} onClick={() => pick(`${name} ${palette.family}`, color)}>
          <span className="swatch-color" style={{ '--swatch': color }} aria-hidden="true"><span className="swatch-check">✓</span></span>
          <span>{name}</span>
        </button>)}</div>
      </div>)}
    </div>
    <div className={`palette-preview ${selected ? 'has-selection' : ''}`} style={{ '--preview-color': selected?.color ?? '#ded9ca' }}>
      <div className="fabric-sample" aria-hidden="true"><span /></div>
      <div className="palette-preview-copy">
        <p className="preview-eyebrow">A shade for your celebration</p>
        <p className="selected-color" aria-live="polite" aria-atomic="true">{selected?.name ?? 'Find your favorite shade'}</p>
        {selected ? <div className="palette-actions"><button type="button" onClick={copyColor}>Copy {selected.color.toUpperCase()}</button><button type="button" onClick={reset}>Reset</button></div> : <span className="palette-preview-note">Tap a stitched swatch to see it here.</span>}
      </div>
    </div>
    <div className="palette-status" role="status">{message}</div>
    {children}
  </section>
}
