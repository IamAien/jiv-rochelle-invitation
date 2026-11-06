# Jiv & Rochelle — Our Forever Begins

A responsive wedding invitation for February 7, 2027, in Cebu, Philippines. Built with React and Vite.

## Published website

Share [Jiv & Rochelle's invitation](https://iamaien.github.io/jiv-rochelle-invitation/).

The site is published through the `IamAien/jiv-rochelle-invitation` GitHub repository. Pushing to `main` runs the behavior tests, builds the site, and deploys `dist/` to GitHub Pages. The Vite base path is `/jiv-rochelle-invitation/` so artwork and scripts load from the repository's Pages URL.

## Local preview

```sh
npm install
npm run dev
```

## Checks

```sh
npm test
npm run build
```

The production output is in `dist/`.

## Experience

- The opening uses the supplied embroidered coastal envelope, including its original J&R wax seal. A tap gently unfolds the flap from its actual crease, pauses, glides out an illustrated letter, and reveals the invitation over ten seconds. The flap has a linen reverse, stitched border, and solid paper edges visible as it turns. See `design/COASTAL-ENVELOPE-OPENING.md`.
- The second page uses the supplied coastal villa garden. Warm serif lettering sits in its clear linen area, with the names on one line and the selected Baskerville ampersand.
- The sliding envelope letter and page share the same complete coastal scene. Both prepare before opening and remain still throughout the card slide and crossfade. The letter never animates its scenery; only the hero begins moving when the opening finishes. Replay resets both together. The original illustration remains the base. The top branch has repaired, complete upper leaves and a stem entering from outside the left frame; the bottom stem pivots beyond the bottom frame so it grows in from outside. Eight clouds drift right using three different embroidered silhouettes, sizes and timings. Slightly smaller ivory petals with softer embroidery drift across the central text toward the lower right, with uneven rolling releases, two or three visible, varied gusts and easing, and 25-second falls. Three separate horizontal sea sections flow continuously right, left and right with independent timings and narrowly feathered edges, and three embroidered gulls alternate wingbeats with gliding. The lower-left pink cutout is omitted. Motion pauses offscreen or in a hidden tab; reduced-motion preferences show the original image. See [artwork and generation prompts](design/COASTAL-BIRDS-CLOUDS.md).
- Portrait artwork fills the phone opening and keeps its proportions on desktop, with warm linen at either side. The invitation preserves the complete garden on wide screens and uses a centered crop on phones.
- The opening supports keyboard activation, loading failure recovery, focus handoff, replay, and reduced-motion preferences. Page navigation unlocks after the transition.
- Text fades in with a slight rise as visitors scroll. Short staggered delays create a soft sequence, and blocks remain visible when scrolling back.
- The supplied floral countdown plaque, running-stitch dividers and fabric swatches follow the invitation's muted palette. Smooth warm ivory, pale sage, dusty blush and light stone backgrounds complement the artwork.
- The countdown, dress-code and closing sections use clean spacing without floral garlands.
- The timeline lists the ceremony and reception with the supplied floral arch and wedding cake illustrations. The supplied moon and clouds close the timeline. Images are optimized as WebP and stay visible independently of the text-reveal animation.
- The live countdown uses the supplied wide floral plaque, with olive HTML numbers aligned above its printed Days, Hours, Minutes and Seconds labels. The complete frame scales to phones without cropping. It targets 1:00 PM in Cebu (UTC+8), updates every second and stops at zero. See [countdown frame and background-cleanup prompt](design/COUNTDOWN-PLAQUE.md).
- A shaded ivory pearl follows the timeline as the visitor scrolls forward or back. It sits on its own layer above the events, measures 32px on desktop and 28px on phones, and uses a pixel position that adapts to viewport and content size changes.
- The envelope has no added text or circle hint; its original J&R wax seal is unobstructed. Reduced-motion preferences shorten the opening. Guests can replay the opening from the footer.
- The venue section includes the wedding date and map links for the ceremony and reception.
- A thin stitched reading-progress line and active navigation follow scrolling. The story has four scroll-focused passages with heart markers, a gentle heartbeat, tiny floating hearts and a warm active-passage glow, and the blue/pink fabric swatches can be selected, previewed, reset, and copied. See `design/REFERENCE-INTERACTIONS.md` for the reference adaptation.
- The gallery follows the story with one brush-to-reveal photo inside the supplied embroidered oval frame and a five-photo draggable Polaroid stack. Reveal, cover, previous, and next buttons support touch and keyboard use. Vertical phone scrolling remains available over the photos. Photo slots currently show labeled linen placeholders; configure real images in `src/gallery.js` and put the files in `public/photos/`. See [frame preparation and prompt](design/OVAL-PHOTO-REVEAL.md).

The original names, date, ceremony and reception venues, love story, formal dress code, and blue/pink guest palette are retained. Dressed for love now includes six embroidered guests: blue swatches update all three men and pink swatches update all three women, preserving each group's last choice. See [outfit behavior and supplied artwork](design/GUEST-ATTIRE.md). The timeline lists the ceremony at 1 PM and reception at 5 PM.

## Editing

- `src/components/WeddingRsvp.jsx`, `WeddingRsvp.css`, and `src/rsvp.js`: matching RSVP section, mobile-visible navigation, the connected Google Form and direct-link fallback. The form loads only when first opened and stays mounted when collapsed. See [Google Forms setup and verification](design/GOOGLE-FORMS-RSVP.md); `scripts/create-google-rsvp.gs` is an optional template for future forms.
- `src/wedding.js`: countdown date, scroll calculations, and opening durations.
- `src/components/EnvelopeOpening.jsx` and `EnvelopeOpening.css`: supplied envelope artwork, complementary flap and pocket masks, solid edges that stop before the seal, illustrated letter, loading/error handling, and opening animation.
- `src/invitationArtwork.js`: current coastal garden artwork shared by the letter and second page.
- `src/components/CoastalScene.jsx`, `CoastalScene.css`, `src/coastalScene.js`, `src/coastalMotion.js`, and `src/assets/coastal-layers/`: shared envelope/page composition, preparation and playback lifecycle, complete botanical/cloud layers, sea drift, birds and responsive registration.
- `src/components/TimelineArtwork.jsx` and `src/assets/timeline/`: supplied timeline illustrations, original PNGs, optimized WebPs, and display sizing.
- `src/App.jsx`: invitation text, timeline, venues, palettes, and opening lifecycle.
- `src/App.css`: visual design and animations.
- The name separators and monograms use the selected option 05, Baskerville. `src/components/Ampersand.jsx` renders the exact comparison outline from `src/assets/baskerville-ampersand.json`, so its shape stays consistent across devices.
- `src/components/WeddingGallery.jsx` and `WeddingGallery.css`: brush-to-reveal cards, draggable album, photo placeholders, and responsive gallery styling.
- `src/gallery.js`: gallery photos and captions, GitHub Pages image paths, scratch coverage, and album navigation helpers.
- `src/scrollReveal.js`: progressive text reveals, reduced-motion and browser fallbacks, and replay cleanup.
- `src/assets/`: optimized website artwork and original PNGs.
- `design/COASTAL-ENVELOPE-OPENING.md`: current envelope artwork, paper layers, animation timing, and invitation layout.
- `design/WOVEN-DECORATIONS.md`: current decoration assets, material references, production details and full generation prompts.
- `design/SOFT-LINEN-AND-TIMELINE.md`: current background palette, supplied timeline illustrations and scrolling pearl.
- `design/ENHANCED-PAGE-LINEN.md`: earlier linen background experiment, saved texture files, full generation prompt and production settings.

The illustrated coastal villa and garden are decorative invitation artwork; the actual venues are listed in the details section.

## Verification

The production build and 45 behavior tests cover the countdown, pearl-driven timeline focus, story reading focus, scroll reveals, calendars, independent guest outfit choices, every supplied outfit variant, oval brush coverage, gallery, artwork registration, plant boundaries throughout their sway, sea drift, scene preparation/playback/fallback/cleanup, and Google Form URL handling. Server-rendered checks cover all ten outfit choices, one framed brush reveal and the identical complete composition in the envelope and hero, including two plants, eight varied clouds, five prepared petals and three birds. Alpha bounds and still composites verify the transparent assets. Browser preview is unavailable in the current session, so live interactions and motion have not had visual browser QA. The connected RSVP responder and embedded URLs load without an authenticated session; submission, response editing, and private response-sheet storage still require an end-to-end check with the form owner.
