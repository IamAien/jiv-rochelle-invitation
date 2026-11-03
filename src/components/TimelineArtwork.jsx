import arch from '../assets/timeline/ceremony-arch.webp'
import cake from '../assets/timeline/reception-cake.webp'
import couple from '../assets/timeline/couple-dance.webp'
import disco from '../assets/timeline/celebration-disco.webp'
import moon from '../assets/timeline/goodnight-moon.webp'

const ARTWORK = {
  arch: { src: arch, scale: 1.3 },
  couple: { src: couple, scale: 1.65 },
  cake: { src: cake, scale: 1.55 },
  disco: { src: disco, scale: 1.45 },
  moon: { src: moon, scale: 1.35 },
}

export default function TimelineArtwork({ kind, className = '' }) {
  const artwork = ARTWORK[kind]
  return <div className={`timeline-artwork ${className}`} style={{ '--artwork-scale': artwork.scale }} aria-hidden="true">
    <img src={artwork.src} width="640" height="640" alt="" loading="lazy" decoding="async" />
  </div>
}
