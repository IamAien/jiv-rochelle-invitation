import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { ATTIRE_GUESTS, ATTIRE_PALETTES, chooseGuestColor, getGuestOutfit } from './attire.js'

test('suit and dress selections remain independent through repeated color changes', () => {
  const initial = { male: null, female: null }
  const defaults = ATTIRE_GUESTS.map(guest => getGuestOutfit(guest, initial))
  const men = chooseGuestColor(initial, 'male', 'French')
  ATTIRE_GUESTS.forEach((guest, index) => assert.equal(getGuestOutfit(guest, men) === defaults[index], guest.gender === 'female'))
  const both = chooseGuestColor(men, 'female', 'Dusty')
  assert.equal(both.male, men.male)
  const changedMen = chooseGuestColor(both, 'male', 'Misty')
  assert.equal(changedMen.female, both.female)
  const changedWomen = chooseGuestColor(changedMen, 'female', 'Rose')
  assert.equal(changedWomen.male, changedMen.male)
  assert.equal(changedWomen.male.name, 'Misty Blue')
  assert.equal(changedWomen.female.name, 'Rose Pink')
  assert.deepEqual(initial, { male: null, female: null })
  assert.throws(() => chooseGuestColor(initial, 'male', 'Rose'), RangeError)
})

test('all eight guests have the five supplied outfit colors and every mapped file exists', () => {
  assert.equal(ATTIRE_GUESTS.filter(guest => guest.gender === 'male').length, 4)
  assert.equal(ATTIRE_GUESTS.filter(guest => guest.gender === 'female').length, 4)
  assert.deepEqual(ATTIRE_GUESTS.slice(3, 5).map(guest => guest.gender), ['male', 'female'], 'The center pair must be a man and a woman')
  const sources = new Set()
  for (const palette of ATTIRE_PALETTES) for (const [name] of palette.colors) {
    const choices = chooseGuestColor({ male: null, female: null }, palette.gender, name)
    for (const guest of ATTIRE_GUESTS.filter(person => person.gender === palette.gender)) {
      const filename = getGuestOutfit(guest, choices)
      assert.ok(existsSync(new URL(`./assets/attire-guests/${filename}`, import.meta.url)), filename)
      sources.add(filename)
    }
  }
  assert.equal(sources.size, 40)
})
