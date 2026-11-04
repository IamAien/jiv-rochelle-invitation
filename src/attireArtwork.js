import { ATTIRE_GUESTS, getGuestOutfit } from './attire.js'

const artwork = import.meta.glob(['./assets/attire-guests/*.webp', '!./assets/attire-guests/right-male-2-*.webp', '!./assets/attire-guests/left-female-2-*.webp'], { eager: true, query: '?url', import: 'default' })
const loaded = new Map()

export const guestOutfitSource = filename => artwork[`./assets/attire-guests/${filename}`]

export function preloadGuestColor(choices, gender) {
  return Promise.all(ATTIRE_GUESTS.filter(guest => guest.gender === gender).map(guest => {
    const source = guestOutfitSource(getGuestOutfit(guest, choices))
    if (!loaded.has(source)) {
      const request = new Promise((resolve, reject) => {
        const image = new Image()
        image.onload = () => image.decode ? image.decode().then(resolve, resolve) : resolve()
        image.onerror = () => { loaded.delete(source); reject(new Error('The outfit preview could not load.')) }
        image.src = source
      })
      loaded.set(source, request)
    }
    return loaded.get(source)
  }))
}
