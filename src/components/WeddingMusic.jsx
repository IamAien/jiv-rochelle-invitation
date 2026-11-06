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
        <path d="M9 18V5l11-2v13M9 8l11-2" /><ellipse cx="6" cy="18" rx="3" ry="2" /><ellipse cx="17" cy="16" rx="3" ry="2" />
      </svg>
      <span>{state.unavailable ? 'Music unavailable' : state.playing ? 'Music on' : 'Music off'}</span>
    </button>}
  </>
})

export default WeddingMusic
