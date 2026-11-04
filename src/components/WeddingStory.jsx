import { useCallback, useRef } from 'react'
import { useScrollFrame } from '../useScrollFrame.js'
import { getStoryChapterIndex } from '../wedding.js'

const CHAPTERS = [
  ['Where it began', 'We met in law school, then went on with our separate lives—until the last day of the Bar exams brought us together again.'],
  ['Side by side', 'Our exam rooms were right beside each other. Choosing to leave the questions behind, we walked out of the school together.'],
  ['Falling in love', 'What followed were texts, conversations, and a connection neither of us had planned. Somewhere between those everyday exchanges, we fell in love.'],
  ['Here we are', 'Now, that unexpected walk has led us here—to the beginning of a lifetime together.'],
]

function StoryHeart() {
  return <svg className="chapter-heart" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 20.5C10.7 19.4 3 14.2 3 8.7A4.7 4.7 0 0 1 12 6.6a4.7 4.7 0 0 1 9 2.1c0 5.5-7.7 10.7-9 11.8Z" /></svg>
}

export default function WeddingStory({ enabled, children }) {
  const story = useRef(null)
  const measure = useCallback(() => {
    const chapters = [...story.current.querySelectorAll('.story-chapter')]
    const current = getStoryChapterIndex(chapters.map(chapter => chapter.getBoundingClientRect()), window.innerHeight)
    story.current.toggleAttribute('data-story-focus', current >= 0)
    chapters.forEach((chapter, index) => {
      chapter.classList.toggle('is-current', index === current)
      chapter.classList.toggle('is-read', index < current)
      if (index === current) chapter.setAttribute('aria-current', 'step')
      else chapter.removeAttribute('aria-current')
    })
  }, [])
  useScrollFrame(enabled, measure)

  return <section className="story-section section" id="story" ref={story} aria-labelledby="story-title">
    {children}
    <p className="eyebrow">Some things are meant to be</p>
    <h2 id="story-title">A chance meeting.<br /><em>An endless story.</em></h2>
    <ol className="story-copy">
      {CHAPTERS.map(([label, text], index) => <li className="story-chapter" key={label}>
        <span className="chapter-marker" aria-hidden="true"><StoryHeart /><span className="chapter-heart-spark spark-one"><StoryHeart /></span><span className="chapter-heart-spark spark-two"><StoryHeart /></span></span>
        <h3 className="chapter-label"><span className="chapter-number">0{index + 1}</span>{label}</h3>
        <p>{text}</p>
      </li>)}
    </ol>
    <span className="story-signature">And so, our forever begins.</span>
  </section>
}
