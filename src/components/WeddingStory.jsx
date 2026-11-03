import { useCallback, useRef } from 'react'
import { useScrollFrame } from '../useScrollFrame.js'

const CHAPTERS = [
  ['Where it began', 'We met in law school, then went on with our separate lives—until the last day of the Bar exams brought us together again.'],
  ['Side by side', 'Our exam rooms were right beside each other. Choosing to leave the questions behind, we walked out of the school together.'],
  ['Falling in love', 'What followed were texts, conversations, and a connection neither of us had planned. Somewhere between those everyday exchanges, we fell in love.'],
  ['Here we are', 'Now, that unexpected walk has led us here—to the beginning of a lifetime together.'],
]

export default function WeddingStory({ enabled, children }) {
  const story = useRef(null)
  const measure = useCallback(() => {
    const chapters = [...story.current.querySelectorAll('.story-chapter')]
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const readingLine = window.innerHeight * 0.62
    // A quiet change of thread color follows reading in either direction.
    let current = 0
    chapters.forEach((chapter, index) => {
      if (chapter.getBoundingClientRect().top <= readingLine) current = index
    })
    chapters.forEach((chapter, index) => {
      chapter.classList.toggle('is-current', !reduced && index === current)
      chapter.classList.toggle('is-read', !reduced && index < current)
    })
  }, [])
  useScrollFrame(enabled, measure)

  return <section className="story-section section" id="story" ref={story} aria-labelledby="story-title">
    {children}
    <p className="eyebrow">Some things are meant to be</p>
    <h2 id="story-title">A chance meeting.<br /><em>An endless story.</em></h2>
    <ol className="story-copy">
      {CHAPTERS.map(([label, text], index) => <li className="story-chapter" key={label}>
        <span className="chapter-marker" aria-hidden="true" />
        <h3 className="chapter-label"><span className="chapter-number">0{index + 1}</span>{label}</h3>
        <p>{text}</p>
      </li>)}
    </ol>
    <span className="story-signature">And so, our forever begins.</span>
  </section>
}
