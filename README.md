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

- The full-screen lakeside gate entrance has stitched J & R and a modest grey gate. Both scenes use the latest references' softer linen, fine cotton stitches, pale ivory/beige, faded olive and dusty blush. Portrait and landscape artwork keep their natural proportions.
- A tap slowly opens the gate from the middle around its outer hinges. The moving leaves use the exact gate pixels from the entrance illustration, keeping their original style and scale.
- The second page remains a different place: a ceremony courtyard with an ivory arch, blue curtain ties, central fountain, pavilion and stone path. Its planting and thread shadows are lighter and more subdued. The entrance retains its gentle 8.8-second timing.
- At desktop widths of 900px and above, the second page uses the user's supplied 1376 × 768 garden JPEG directly. Phone portrait and landscape artwork are retained.
- The desktop opening uses the user's supplied 1368 × 768 lakeside terrace JPEG directly, with the animated leaves and hints aligned to its gate and monogram. Phone portrait and landscape entrances retain their artwork.
- Text fades in with a slight rise as visitors scroll. Short staggered delays create a soft sequence, and blocks remain visible when scrolling back.
- Timeline illustrations and countdown medallions use matching embroidered textile artwork, while numbers stay live and accessible.
- The live countdown shows days, hours, minutes and seconds in four responsive medallions, targeting the ceremony at 1:00 PM in Cebu (UTC+8). It updates every second and stops at zero when the wedding begins.
- A pearl follows the timeline as the visitor scrolls forward or back. Its position also adapts when the viewport or content size changes.
- Reduced-motion preferences shorten the opening and keep its gate hint still. Guests can replay the opening from the footer.
- Calendar download and venue map links are included.

The original names, date, ceremony and reception venues, love story, formal dress code, and blue/pink guest palette are retained. Only the ceremony at 1 PM and reception at 5 PM have fixed times; intermediate timeline moments are descriptive.

## Editing

- `src/wedding.js`: countdown date, scroll calculations, and shared gate-opening duration.
- `src/components/GardenEntrance.jsx` and `GardenEntrance.css`: complete entrance illustration, native gate crops, masked portal, hinged leaves, and loading/error handling. A small “Tap to open” hint sits beneath the stitched J & R in both layouts; a soft double ripple with a 2px white stroke marks the latch. Both hints fade when opening begins. The opening plays through without a skip control; reduced-motion settings keep the ripple still.
- `src/gateGeometry.js`: source-coordinate crops, hinge placement and gate proportions.
- `src/App.jsx`: invitation text, timeline, venues, palettes, and opening lifecycle.
- `src/App.css`: visual design and animations.
- `src/scrollReveal.js`: progressive text reveals, reduced-motion and browser fallbacks, and replay cleanup.
- `src/assets/`: optimized website artwork and original PNGs.
- `design/MUTED-REFERENCE-PALETTE.md`: current soft textile treatment, saved assets, input references and complete prompts.
- `design/STITCHED-PLANTS-AND-CEREMONY.md`: earlier stronger needlework iteration.
- `design/REFERENCE-EXTENSION.md`: previous terrace extension iteration.
- `design/FINE-THREAD-GARDEN.md`: previous fine-thread scene iteration.
- `design/GATES-AND-CEREMONY.md`: previous entrance and ceremony artwork history.
- `design/COZY-COTTAGE-AND-REVEALS.md`: retained scroll-reveal and embroidered-detail notes, with earlier artwork.
- `design/BOOK-OPENING.md` and `design/STITCHED-COVER-AND-HOUSE.md`: earlier artwork history.
- `design/ARTWORK.md`: earlier artwork retained as source material.

The illustrated ceremony garden and gate are decorative invitation artwork; the actual venues are listed in the details section.

## Verification

The production build and 14 behavior tests pass. Geometry tests verify native gate scale and latch registration. Server rendering verifies both entrance layouts, complete closed artwork, source-image gate crops, the opening mask, completion, and the distinct ceremony courtyard artwork. Live browser visual verification was unavailable because the browser connection was not available in this session.
