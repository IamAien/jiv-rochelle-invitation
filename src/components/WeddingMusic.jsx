import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { createWeddingMusicController, WEDDING_MUSIC } from '../music.js'
import './WeddingMusic.css'

const WeddingMusic = forwardRef(function WeddingMusic({ visible }, ref) {
  const audio = useRef(null)
  const controller = useRef(null)
  const [state, setState] = useState({ playing: false, unavailable: false })

  useEffect(() => {
    const player = createWeddingMusicController(audio.current, { onChange: setState })
    controller.current = player
    return () => { player.destroy(); controller.current = null }
  }, [])
  useImperativeHandle(ref, () => ({
    start: () => controller.current?.start(),
    reset: () => controller.current?.reset(),
  }), [])

  const label = state.unavailable ? 'Background music unavailable' : state.playing ? 'Pause background music' : 'Play background music'
  return <>
    <audio ref={audio} id="wedding-background-music" src={`${import.meta.env.BASE_URL}${WEDDING_MUSIC.path}`} loop preload="none" hidden />
    {visible && <button type="button" className="music-toggle" onClick={() => { void controller.current?.toggle() }}
      aria-label={label} title={label} aria-controls="wedding-background-music" aria-pressed={state.playing} disabled={state.unavailable}>
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M11 4.5 5.5 9h-3v6h3l5.5 4.5Z" fill="currentColor" stroke="none" />
        {state.playing
          ? <path d="M15 8.5a5 5 0 0 1 0 7M18 5.5a9 9 0 0 1 0 13" />
          : <path d="m16 9 5 6m0-6-5 6" />}
      </svg>
    </button>}
  </>
})

export default WeddingMusic
