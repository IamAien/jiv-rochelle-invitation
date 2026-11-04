export const ATTIRE_PALETTES = [
  { title: 'Shades of blue', family: 'Blue', gender: 'male', audience: 'For the gentlemen', colors: [['Misty', '#bccddb'], ['Powder', '#a9c3dd'], ['French', '#7399c9'], ['Cloud', '#d9e5f0'], ['Slate', '#6c7ea3']] },
  { title: 'Shades of pink', family: 'Pink', gender: 'female', audience: 'For the ladies', colors: [['Blush', '#f2d1cc'], ['Dusty', '#d3a3a3'], ['Rose', '#e59fb0'], ['Peach', '#f5c2a6'], ['Soft', '#f8dde1']] },
]

// Variants are mapped by the supplied garment color, not filename order.
export const ATTIRE_GUESTS = [
  { id: 'right-female-2', gender: 'female', variants: [1, 2, 3, 4, 5], x: 10, depth: 3, size: 96 },
  { id: 'right-female-1', gender: 'female', variants: [2, 3, 5, 1, 4], x: 26, depth: 5, size: 96 },
  { id: 'right-male-1', gender: 'male', variants: [1, 2, 4, 3, 5], x: 42, depth: 4, size: 100 },
  { id: 'left-female-1', gender: 'female', variants: [1, 2, 3, 4, 5], x: 58, depth: 7, size: 96 },
  { id: 'left-male-1', gender: 'male', variants: [1, 2, 3, 4, 5], x: 74, depth: 6, size: 100 },
  { id: 'left-male-2', gender: 'male', variants: [1, 2, 3, 4, 5], x: 90, depth: 2, size: 100 },
]

export function chooseGuestColor(current, gender, name) {
  const palette = ATTIRE_PALETTES.find(item => item.gender === gender)
  const index = palette?.colors.findIndex(([shade]) => shade === name)
  if (index === undefined || index < 0) throw new RangeError('Choose a shade from the guest palette.')
  const [shade, color] = palette.colors[index]
  return { ...current, [gender]: { index, color, name: `${shade} ${palette.family}`, gender } }
}

export function getGuestOutfit(guest, choices) {
  const index = choices[guest.gender]?.index ?? 0
  return `${guest.id}-${guest.variants[index]}.webp`
}

export function getGuestColorName(choices, gender) {
  return choices[gender]?.name ?? (gender === 'male' ? 'Misty Blue' : 'Blush Pink')
}
