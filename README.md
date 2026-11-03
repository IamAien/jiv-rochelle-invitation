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
- The coastal artwork has a stationary background and three transparent plant layers. Only the plants rotate gently; the sky, linen and villa stay still. A separate transparent canvas animates the sea. Motion pauses offscreen or in a hidden tab, and reduced-motion preferences use the original still image.
- Portrait artwork fills the phone opening and keeps its proportions on desktop, with warm linen at either side. The invitation preserves the complete garden on wide screens and uses a centered crop on phones.
- The opening supports keyboard activation, loading failure recovery, focus handoff, replay, and reduced-motion preferences. Page navigation unlocks after the transition.
- Text fades in with a slight rise as visitors scroll. Short staggered delays create a soft sequence, and blocks remain visible when scrolling back.
- Countdown linen patches, running-stitch dividers and fabric swatches follow the supplied scenes' muted textile palette. Smooth warm ivory, pale sage, dusty blush and light stone backgrounds complement the artwork.
- The countdown, dress-code and closing sections use clean spacing without floral garlands.
- The timeline uses the supplied floral arch, dancing couple, wedding cake and disco-ball illustrations for its four events. The supplied moon and clouds close the timeline. Images are optimized as WebP and stay visible independently of the text-reveal animation.
- The live countdown shows days, hours, minutes and seconds in four responsive medallions, targeting the ceremony at 1:00 PM in Cebu (UTC+8). It updates every second and stops at zero when the wedding begins.
- A shaded ivory pearl follows the timeline as the visitor scrolls forward or back. It sits on its own layer above the events, measures 32px on desktop and 28px on phones, and uses a pixel position that adapts to viewport and content size changes.
- The envelope has no added text or circle hint; its original J&R wax seal is unobstructed. Reduced-motion preferences shorten the opening. Guests can replay the opening from the footer.
- Calendar download and venue map links are included.
- A thin stitched reading-progress line and active navigation follow scrolling. The story has four softly highlighted chapters, and the blue/pink fabric swatches can be selected, previewed, reset, and copied. Each venue also has a separate calendar download. See `design/REFERENCE-INTERACTIONS.md` for the reference adaptation.
- The gallery follows the story with three brush-to-reveal linen photo cards and a five-photo draggable Polaroid stack. Reveal, cover, previous, and next buttons support touch and keyboard use. Vertical phone scrolling remains available over the photos. Photo slots currently show labeled linen placeholders; configure real images in `src/gallery.js` and put the files in `public/photos/`.

The original names, date, ceremony and reception venues, love story, formal dress code, and blue/pink guest palette are retained. Only the ceremony at 1 PM and reception at 5 PM have fixed times; intermediate timeline moments are descriptive.

## Editing

- `src/wedding.js`: countdown date, scroll calculations, and opening durations.
- `src/components/EnvelopeOpening.jsx` and `EnvelopeOpening.css`: supplied envelope artwork, complementary flap and pocket masks, solid edges that stop before the seal, illustrated letter, loading/error handling, and opening animation.
- `src/invitationArtwork.js`: current coastal garden artwork shared by the letter and second page.
- `src/components/CoastalScene.jsx`, `CoastalScene.css`, `src/coastalMotion.js`, and `src/assets/coastal-layers/`: transparent plant layers, static background plate, independent water ripples, responsive registration, motion preferences and still-image fallback.
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

The production build and 26 behavior tests cover the countdown, scroll reveals, calendar downloads, gallery, coastal artwork registration, plant-layer settings and gradual water motion. Server-rendered checks verify the original fallback, static background, three plant layers, separate water canvas, envelope and invitation content. Alpha-channel checks and an inspected composite verify transparent sky and linen around the plant cutouts. Browser preview is unavailable in the current session, so live motion has not had visual browser QA.
