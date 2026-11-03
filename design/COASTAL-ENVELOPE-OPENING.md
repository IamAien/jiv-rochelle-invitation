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

`CoastalScene.jsx` uses actual image layers. The original illustration remains the accessible still-image fallback. A clean background plate supplies the sky, linen, sea and villa behind the plants. A transparent cutout supplies the upper-left and lower corner foliage. Three CSS layers reuse that cutout, isolate their respective corner, and rotate around their stem anchors by less than one degree over 12–14.5 seconds. The background has no transform or animation. The earlier image-wide plant distortion is removed.

The water canvas is separate from the plants and background. It draws transparent pixels outside its shoreline-and-blue-stitch mask, with gentle ripples and restrained shimmer inside the sea. It clears to transparency before every frame. It never rotates or displaces the sky or villa. Without WebGL, the plants can still sway over the static sea.

All layers follow the original contain/cover scale, centering and phone crop. The water buffer is capped at native resolution and runs at up to 30 frames per second. Offscreen or hidden-tab motion pauses. Reduced-motion preferences and printing show the original still image; failed layer downloads also retain it. Replaying the envelope cleans up the water renderer and pauses the plant layers.

### Layer assets

Created with the built-in `image_gen` tool from the original coastal image. No original image was overwritten.

- [Background source PNG](../src/assets/coastal-layers/background-source.png): 941 × 1672.
- [Transparent plant source PNG](../src/assets/coastal-layers/plants-source.png): 981 × 1602, with alpha zero in the empty sky and central linen.
- [Background WebP](../src/assets/coastal-layers/background.webp): 941 × 1672, quality 95.
- [Plant WebP](../src/assets/coastal-layers/plants.webp): normalized to 941 × 1672 for the shared image frame, quality 96, preserving transparency.

The still composite was inspected over the actual background. Bright RGB colors in fully transparent source pixels are invisible when composited; there are no visible red or yellow matte pixels in the inspected cutout samples.

### Built-in image generation prompts

Background edit (opaque output):

> Use case: precise-object-edit. EDIT TARGET: the attached original embroidered coastal wedding invitation illustration, portrait 941 by 1672 pixels. Create a clean background plate for layered animation. Preserve the exact original composition, framing, scale, camera, fine sewn cotton/linen texture, warm ivory palette, villa architecture, sea, mountains, clouds and all other landscaping. Remove ONLY these three foreground botanical clusters: (1) the large ivory blossoms and olive-leaf branch framing the UPPER LEFT corner, from source x 0–580 and y 0–470; (2) the ivory blossom/olive-leaf spray framing the LOWER RIGHT corner, source x 610–941 and y 1360–1672; (3) the small pink-flowered foreground cluster at the very LOWER LEFT corner, source x 0–235 and y 1510–1672. Remove their shadows too. Restore only the newly exposed sky stitches, plain ivory linen, blue seawater and courtyard stone behind them, matching the immediately surrounding original material. Do not remove the pink flowers along the middle-left wall, climbing flowers on the villa, cypresses, terrace rail, or other garden plants. Do not change anything else. This background must remain precisely registered with the original so the cutout plants can be placed back at the same coordinates. Keep the original full 941:1672 portrait aspect ratio and full canvas with no cropping, added margins, zoom, text, watermark, border or redesign. The central blank invitation space must remain blank.

Plant extraction (transparent output):

> Use case: background-extraction. EDIT TARGET: the attached 941 by 1672 portrait embroidered coastal wedding illustration. Extract ONLY these THREE foreground botanical clusters as a full-canvas transparent animation overlay. Keep every extracted plant in its EXACT ORIGINAL SIZE, POSITION and ORIENTATION in the full 941:1672 portrait canvas, with no cropping or rearranging: (1) the large ivory blossom and olive-leaf branch in the UPPER LEFT, source x 0–580 and y 0–470; (2) the ivory blossom/olive-leaf spray in the LOWER RIGHT, source x 610–941 and y 1360–1672; (3) the small pink flower/leaf cluster in the extreme LOWER LEFT foreground, source x 0–235 and y 1510–1672. Include all connected fine stems, leaves and petals of these three clusters. Everything else MUST be truly alpha-transparent: sky, clouds, linen, sea, mountains, villa, stonework, railings, other plants and middle-left flowers. No fabric, sky or water pixels attached to the moving plants. Keep delicate original embroidered edges and the original warm ivory, dusty pink and olive cotton-thread colors. Preserve exact pixel registration and original corner cropping; do not center the subjects, group them together or add padding. The plants are cutouts from the reference, not redesigned or new illustrations. Output one full portrait canvas with the THREE clusters in their original corners and actual transparent pixels everywhere else. No fake checkerboard, white/cream matte, rectangular patches, text, border or watermark.

## Verification

The production build and behavior suite are required. Coastal motion tests verify phone and desktop image alignment, source-resolution limits, gradual water motion and small, slow plant-layer rotations. Server-rendered checks cover the original fallback, static background, three transparent plant layers, separate water canvas, envelope, paper layers, seal, accessibility markup, and timing. The source alpha channel and assembled still composite were inspected. Current browser automation is unavailable in the editing session, so live motion QA remains unverified.
