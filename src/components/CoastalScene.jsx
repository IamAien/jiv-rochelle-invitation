import { useEffect, useRef } from 'react'
import { COASTAL_LAYER_ARTWORK, INVITATION_ARTWORK } from '../invitationArtwork.js'
import { COASTAL_BIRDS, COASTAL_CLOUDS, COASTAL_PETALS, COASTAL_PLANT_REGIONS } from '../coastalMotion.js'
import { setupCoastalScene } from '../coastalScene.js'
import './CoastalScene.css'

export default function CoastalScene({ enabled = false, onReady }) {
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const stackRef = useRef(null)
  const plantRefs = useRef([])
  const cloudRefs = useRef([])
  const petalRefs = useRef([])
  const birdRef = useRef(null)
  const skyRef = useRef(null)
  const canvasRef = useRef(null)
  const controllerRef = useRef(null)

  useEffect(() => {
    const controller = setupCoastalScene({
      container: containerRef.current, image: imageRef.current, stack: stackRef.current, canvas: canvasRef.current,
      assets: [imageRef.current, birdRef.current, skyRef.current, ...plantRefs.current, ...cloudRefs.current, ...petalRefs.current], onReady,
    })
    controllerRef.current = controller
    return () => { controller.destroy(); controllerRef.current = null }
  }, [onReady])

  useEffect(() => { controllerRef.current?.setEnabled(enabled) }, [enabled, onReady])

  return <div className="coastal-scene" ref={containerRef}>
    <img ref={imageRef} className="villa-art" src={INVITATION_ARTWORK.src} width={INVITATION_ARTWORK.width} height={INVITATION_ARTWORK.height}
      alt="Embroidered coastal villa and flower-filled garden overlooking the blue sea, framed by ivory blossoms on warm linen" fetchPriority="high" />
    <img ref={birdRef} className="coastal-art-preload" src={COASTAL_LAYER_ARTWORK.bird} alt="" aria-hidden="true" />
    <div ref={stackRef} className="coastal-layer-stack" style={{ '--coastal-bird': `url(${COASTAL_LAYER_ARTWORK.bird})` }} aria-hidden="true">
      <img ref={skyRef} className="coastal-sky-plate" src={COASTAL_LAYER_ARTWORK.sky} alt="" />
      <canvas ref={canvasRef} className="coastal-water-canvas" aria-hidden="true" />
      {COASTAL_CLOUDS.map((cloud, index) => <img key={index} ref={element => { cloudRefs.current[index] = element }} className="coastal-cloud" data-cloud-shape={cloud.shape} src={COASTAL_LAYER_ARTWORK.clouds[cloud.shape]} alt="" style={{
        left: `${cloud.left}%`, top: `${cloud.top}%`, width: `${cloud.width}%`,
        animationDuration: `${cloud.seconds}s`, animationDelay: `${cloud.delay}s`, '--cloud-travel': `${cloud.travel}cqw`, '--cloud-opacity': cloud.opacity, '--cloud-mirror': cloud.mirror ? -1 : 1,
      }} />)}
      {COASTAL_BIRDS.map((bird, index) => <div key={index} className="coastal-bird" style={{
        left: `${bird.left}%`, top: `${bird.top}%`, width: `${bird.width}%`,
        animationDuration: `${bird.seconds}s`, animationDelay: `${bird.delay}s`, '--wing-period': `${bird.wing}s`,
      }}>
        <span className="coastal-bird-part coastal-bird-wing coastal-bird-wing-left" />
        <span className="coastal-bird-part coastal-bird-wing coastal-bird-wing-right" />
        <span className="coastal-bird-part coastal-bird-body" />
      </div>)}
      {COASTAL_PETALS.map((petal, index) => <span key={index} className="coastal-petal" style={{
        left: `${petal.left}%`, top: `${petal.top}%`, width: `${petal.width}%`, animationDuration: `${petal.seconds}s`, animationDelay: `${petal.delay}s`, animationTimingFunction: petal.easing,
        '--petal-drift': `${petal.drift}cqw`, '--petal-fall': `${petal.fall}cqw`, '--petal-flutter': `${petal.flutter}s`, '--petal-angle': `${petal.angle}deg`,
        '--petal-gust': `${petal.gust}cqw`, '--petal-lift': `${petal.lift}cqw`,
      }}><img ref={element => { petalRefs.current[index] = element }} className="coastal-petal-art" src={COASTAL_LAYER_ARTWORK.petal} alt="" /></span>)}
      {COASTAL_PLANT_REGIONS.map((region, index) => <div key={region.name} className="coastal-plant-placement" style={{
        left: `${region.x / INVITATION_ARTWORK.width * 100}%`, top: `${region.y / INVITATION_ARTWORK.height * 100}%`,
        width: `${region.width / INVITATION_ARTWORK.width * 100}%`, height: `${region.height / INVITATION_ARTWORK.height * 100}%`,
      }}>
        <img ref={element => { plantRefs.current[index] = element }} className="coastal-plant-layer" data-corner={region.name} src={COASTAL_LAYER_ARTWORK.plants[region.name]} alt="" style={{
          transformOrigin: region.origin,
          '--sway-positive': `${region.positive}deg`, '--sway-negative': `${region.negative}deg`,
          animationDuration: `${region.seconds}s`, animationDelay: `${region.delay}s`,
        }} />
      </div>)}
    </div>
  </div>
}
