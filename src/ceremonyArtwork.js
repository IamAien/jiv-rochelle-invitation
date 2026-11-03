import portrait from './assets/warm-rose-garden-portrait.webp'
import portraitReveal from './assets/warm-rose-garden-reveal-no-sun.webp'
import desktop from './assets/warm-rose-garden-desktop.webp'
import desktopReveal from './assets/warm-rose-garden-desktop-reveal-no-sun.webp'

// Native fountain coordinates in the same artwork used by the invitation.
export const CEREMONY_ARTWORKS = {
  portrait: { src: portrait, revealSrc: portraitReveal, width: 941, height: 1672, fountain: { x: 465, y: 1210 } },
  landscape: { src: desktop, revealSrc: desktopReveal, width: 1672, height: 941, fountain: { x: 835, y: 642 } },
  desktop: { src: desktop, revealSrc: desktopReveal, width: 1672, height: 941, fountain: { x: 835, y: 642 } },
}
