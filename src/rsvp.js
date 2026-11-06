// Published, guest-facing Google Form for the wedding RSVP.
// Keep the form editor and response spreadsheet links private.
export const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfUSmH5ujY51mPOR7MyTP8MyRUMUwYdSJfEkBqtlVb2BlbvkA/viewform?usp=dialog'

export function getGoogleFormLinks(value) {
  if (typeof value !== 'string' || !value.trim()) return null
  try {
    const url = new URL(value.trim())
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return null
    url.hash = ''
    if (url.hostname === 'forms.gle' && /^\/[\w-]+\/?$/.test(url.pathname)) {
      return { responder: url.href, embed: null }
    }
    if (url.hostname !== 'docs.google.com' || !/^\/forms\/d\/(?:e\/)?[\w-]+\/viewform\/?$/.test(url.pathname)) return null
    url.searchParams.delete('embedded')
    const responder = url.href
    url.searchParams.set('embedded', 'true')
    return { responder, embed: url.href }
  } catch {
    return null
  }
}
