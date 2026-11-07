import test from 'node:test'
import assert from 'node:assert/strict'
import { getGoogleFormLinks } from './rsvp.js'

test('an unconnected RSVP never links to an invalid form or a private editor', () => {
  for (const value of ['', ' ', null, undefined, 'not a url',
    'https://docs.google.com/forms/d/example/edit',
    'https://docs.google.com/forms/d/e/example/formResponse',
    'https://docs.google.com/spreadsheets/d/example/edit',
    'https://docs.google.com.evil.test/forms/d/e/example/viewform',
    'http://docs.google.com/forms/d/e/example/viewform',
    'https://user:secret@docs.google.com/forms/d/e/example/viewform',
    'javascript:alert(1)',
  ]) assert.equal(getGoogleFormLinks(value), null)
})

test('published forms use direct links and retain prefilled fields', () => {
  for (const path of ['/forms/d/e/example-form/viewform', '/forms/d/example-form/viewform']) {
    const links = getGoogleFormLinks(` https://docs.google.com${path}?entry.123=Guest&embedded=true#section `)
    const direct = new URL(links.responder)
    assert.equal(direct.searchParams.get('entry.123'), 'Guest')
    assert.equal(direct.searchParams.has('embedded'), false)
    assert.equal(direct.hash, '')
  }
})

test('Google short links remain usable as direct links', () => {
  assert.deepEqual(getGoogleFormLinks('https://forms.gle/example123'), {
    responder: 'https://forms.gle/example123',
  })
  assert.equal(getGoogleFormLinks('https://forms.gle/'), null)
})
