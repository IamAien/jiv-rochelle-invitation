# Coastal envelope and invitation

The opening uses the user's supplied embroidered coastal envelope. The invitation cover uses the separately supplied coastal villa garden. Wedding details, selected Baskerville ampersand, countdown, story, gallery, palette and venue links share this invitation.

## Supplied artwork

- `復古刺繡風暖色海景信封.png` → `src/assets/embroidered-coastal-envelope.png` and `.webp`.
- `刺繡海岸別墅花園.png` → `src/assets/embroidered-coastal-garden.png` and `.webp`.
- Both originals are 941 × 1672. The original PNGs are preserved unchanged; the live site uses WebP at quality 93 (510,040 and 428,422 bytes respectively).
- Source directory: `D:/Obsidian/MyDharma/Jiv&Rochelle Wedding Website/weddingAsset/`.

## Opening

`EnvelopeOpening.jsx` uses the original image for the pocket and triangular hinged flap. The flap pivots at the actual horizontal fold at native y = 648, while the upper linen stays in place behind it. The original wax seal belongs to the moving flap. The closed layers reconstruct the supplied illustration. No new artwork was generated.

The flap has a textured linen reverse with a stitched border, a separate front face, and three solid side walls joining them. The diagonal side walls end outside the seal's footprint, preventing their light edges from crossing the wax. The paper is 3–5 CSS pixels thick depending on screen size. Its faces use backface culling, while the wrapper preserves their 3D arrangement, so a continuous material edge remains visible as the paper passes through 90 degrees. The reverse uses linen sampled from the supplied envelope.

The ten-second opening gives each movement room:

- 0–0.6 seconds: a quiet pause before the flap moves.
- 0.6–4.2 seconds: the flap gently unfolds to 164 degrees.
- 4.2 seconds: the open flap moves behind the letter.
- 4.3–8.2 seconds: the coastal garden letter glides upward with a soft start and finish.
- 8.3–10 seconds: the envelope and actual invitation overlap in a slow crossfade.

The page remains inert until the opening completes; focus then moves to the names and scrolling unlocks. The footer replays the same sequence. Reduced-motion visitors get a short direct transition. A failed envelope download exposes a View invitation fallback. The main-page reveal delay derives from the shared duration and crossfade constants in `src/wedding.js`.

The full opening is a keyboard-accessible button. The envelope has no added visible text, circle hint, or seal outline. The original J&R lettering in the wax artwork remains. Letter and second-page text appear inside the invitation as before. On phones the centered portrait artwork fills the screen. Wide windows preserve the portrait composition with warm linen on either side. The second page preserves the complete garden on wide screens and uses a centered crop on phones; text sits in its open linen area.

## Coastal scene motion

`CoastalScene.jsx` keeps the original artwork as its accessible still-image fallback and adds a WebGL canvas after the envelope opens. `coastalMotion.js` samples that same WebP; no new imagery or cutout layers are generated.

Feathered regions turn the upper-left and lower floral corners around their outer stems. The breeze has long, slightly different phases and eases in over 1.8 seconds. The middle of the linen and the villa stay anchored. A shoreline region and nearby blue-stitch samples limit small drifting ripples and a restrained shimmer to the water.

The canvas follows the original image's exact contain/cover scale, centering and phone crop. Its drawing buffer is capped at the native artwork resolution to preserve the threads without wasting work on the empty desktop margins. Motion runs at up to 30 frames per second and pauses when the illustration is offscreen or the browser tab is hidden. Reduced-motion preferences, printing, unavailable graphics support and context loss show the original still image. Replaying the envelope cleans up the renderer before the next reveal.

## Verification

The production build and behavior suite are required. Coastal motion tests verify phone and desktop image alignment, source-resolution limits, a still first frame and bounded, gradual sway in both directions. Server-rendered checks cover the original image fallback, decorative canvas, envelope, paper layers, seal, accessibility markup, and animation timing. Current browser automation is unavailable in the editing session, so visual animation QA remains unverified.
