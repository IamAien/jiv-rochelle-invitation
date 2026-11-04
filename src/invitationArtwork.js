import coastalGarden from './assets/embroidered-coastal-garden.webp'
import topPlant from './assets/coastal-layers/top-branch-complete.webp'
import bottomPlant from './assets/coastal-layers/bottom-branch.webp'
import cloud from './assets/coastal-layers/cloud-wisp.webp'
import cloudFilament from './assets/coastal-layers/cloud-filament.webp'
import cloudRounded from './assets/coastal-layers/cloud-rounded.webp'
import petal from './assets/coastal-layers/soft-petal-slender.webp'
import roundedPetal from './assets/coastal-layers/soft-petal-rounded.webp'
import curledPetal from './assets/coastal-layers/soft-petal-curled.webp'
import bird from './assets/coastal-layers/embroidered-gull.webp'
import sky from './assets/coastal-layers/cloudless-sky.webp'

export const INVITATION_ARTWORK = { src: coastalGarden, width: 941, height: 1672 }
export const COASTAL_LAYER_ARTWORK = { plants: { top: topPlant, right: bottomPlant }, clouds: { wisp: cloud, filament: cloudFilament, rounded: cloudRounded }, petals: { slender: petal, rounded: roundedPetal, curled: curledPetal }, bird, sky }
