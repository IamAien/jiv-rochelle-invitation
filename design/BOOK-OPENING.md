# Book opening and current artwork

Current artwork and animation details are in [Cozy cottage and scroll reveals](COZY-COTTAGE-AND-REVEALS.md). This document records an earlier iteration.

The current opening is a single full-screen linen page, hinged at its left edge. The cover has **J & R embroidered directly into the artwork** and a small **Open** cue. A tap or keyboard activation begins an 8.8-second page turn, revealing a matching house and garden. A small Skip button appears during the animation. The invitation text then fades in over 2.2 seconds. Reduced-motion visitors get a short transition instead.

The page and opening remain edge to edge on all screen sizes.

## Palette

| Use | Color |
| --- | --- |
| Warm ivory linen | `#f4eee3` |
| Antique cream | `#e9dfcd` |
| Espresso lettering | `#584738` |
| Dusty blue ribbon | `#8097a5` |
| Olive-sage foliage | `#87917b` |
| Flowers | Restrained faded apricot, blush, and cream |

## Current assets

The artwork was generated and edited with the **built-in Imagegen tool**, then encoded as WebP. The supplied image guided the palette, curtains, blue ribbon, and garden-gate illustration. The cover monogram is part of the textile artwork; invitation text and interactive controls remain live HTML. The final embroidery and house prompts are documented in [Embroidered cover and house reveal](STITCHED-COVER-AND-HOUSE.md).

- [Embroidered portrait book cover](../src/assets/embroidered-book-cover-portrait.webp) — smaller screens.
- [Embroidered landscape book cover](../src/assets/embroidered-book-cover-landscape.webp) — screens at least 900px wide.
- [Portrait house reveal](../src/assets/garden-house-portrait.webp) — the inside invitation on smaller screens.
- [Landscape house reveal](../src/assets/garden-house-landscape.webp) — the inside invitation on wider screens.
- [Blue ribbon garland](../src/assets/blue-ribbon-garland.webp) — countdown, dress details, and footer.

The original PNGs are retained beside these assets. The earlier gate, curtain, and villa artwork is retained as source material and is no longer bundled into the current site.

## Implementation

- `src/components/BookOpening.jsx` and `BookOpening.css`: cover, book leaf, binding, monogram, page turn, and skip.
- `src/wedding.js`: shared `BOOK_OPENING_MS = 8800` timing used by both the CSS duration and the completion timer.
- `src/App.jsx`: animation lifecycle, scroll lock, focus restoration, invitation, countdown, and timeline.

## Verification

The production build and six existing countdown/timeline tests pass. The artwork was visually inspected for correct J & R embroidery and matching house styling. Live browser and animation playback verification remain unavailable because the browser connection is unavailable.

## Final generation prompts

The prompts below describe the base covers and garland. See [the final embroidered cover and house prompts](STITCHED-COVER-AND-HOUSE.md) for the current cover edits and inside-page artwork.

### Portrait book cover

Use case: illustration-story. Asset type: illustrated linen wedding book cover, NOT a mockup of a physical book. Create a CLEAN, QUIET and refined heirloom wedding stationery illustration. Tall portrait 2:3 composition. Airy ivory linen center, top third framed by softly draped antique cream curtains tied with tiny dusty blue ribbons at the upper side edges. In the LOWER 32% only: a delicate antique dusty-blue wrought iron garden gate, pale limestone gateposts, climbing blush and faded apricot roses, tiny cream flowers and muted olive-sage foliage. Keep the central 60% width between 21% and 56% height EMPTY warm ivory linen, so a live J & R monogram can be placed there later. Style: very fine tactile silk-thread embroidery and subtle needlepoint on natural warm ivory flax linen, softly dimensional, antique European garden romance. Exact palette: warm ivory #f4eee3, antique cream #e9dfcd, espresso brown #584738 used sparingly, faded slate/dusty blue #8097a5, muted olive-sage #87917b, and very restrained faded apricot/blush flowers. The palette should feel like a vintage cream linen invitation with blue ribbon and a blue garden gate. Soft natural light, subtle texture, delicate details, not busy. NO gold rococo frames, NO pearl swags, NO villa/buildings, NO purple wisteria. No text, no lettering, no initials, no monograms, no dates, no border, no watermark, no phone, no UI. Fill the canvas edge to edge. The central space must be calm and empty.

### Landscape book cover

Use case: illustration-story. Asset type: illustrated linen wedding book cover, NOT a mockup of a physical book. Create a CLEAN, QUIET and refined heirloom wedding stationery illustration. Wide landscape 16:9 composition for an edge-to-edge desktop book cover. Airy ivory linen center, upper corners framed by softly draped antique cream curtains tied with tiny dusty blue ribbons at the upper side edges. A restrained botanical garden spans the LOWER 28%: a small antique dusty-blue wrought iron garden gate in the center, pale limestone gateposts, climbing blush and faded apricot roses, tiny cream flowers and muted olive-sage foliage tapering outward. Keep the large central 55% width between 22% and 62% height EMPTY warm ivory linen, so a live J & R monogram can be placed there later. Style: very fine tactile silk-thread embroidery and subtle needlepoint on natural warm ivory flax linen, softly dimensional, antique European garden romance. Exact palette: warm ivory #f4eee3, antique cream #e9dfcd, espresso brown #584738 used sparingly, faded slate/dusty blue #8097a5, muted olive-sage #87917b, and very restrained faded apricot/blush flowers. The palette should feel like a vintage cream linen invitation with blue ribbon and a blue garden gate. Soft natural light, subtle texture, delicate details, not busy. NO gold rococo frames, NO pearl swags, NO villa/buildings, NO purple wisteria. No text, no lettering, no initials, no monograms, no dates, no border, no watermark, no phone, no UI. Fill the canvas edge to edge. The central space must be calm and empty.

### Blue ribbon garland

Use case: illustration-story. Asset type: a wide horizontal decorative garland for a refined linen wedding invitation website. On a truly transparent background, create ONE delicate airy garland of tiny antique cream blossoms and a few faded apricot-blush rosebuds, small olive-sage leaves, fine winding stems, and one small dusty slate-blue silk ribbon tied near the center. Aspect about 3:1, gently arching from side to side. Fine raised silk-thread embroidery and subtle needlepoint texture, softly dimensional, antique European linen stationery, soft natural lighting. Restrained palette: warm ivory #f4eee3, antique cream #e9dfcd, faded dusty blue #8097a5, muted olive-sage #87917b, and sparing faded apricot/blush flowers. Keep it quiet and minimal with generous transparent space between sprigs. NO purple or lavender, NO pearl swags, NO large dense bouquets, NO ornate gold frames. No text, no initials, no borders, no watermark. Do not crop any leaf or ribbon at the edges. Real transparent background.
