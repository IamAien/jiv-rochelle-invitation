# Coastal envelope and invitation

The current entrance replaces the garden gates with the user's supplied embroidered coastal envelope. The invitation cover uses the separately supplied coastal villa garden. Existing wedding details, selected Baskerville ampersand, countdown, story, gallery, palette and venue links are retained.

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

## Verification

The production build and existing behavior suite are required. Current browser automation is unavailable in the editing session, so visual animation QA remains unverified. Older garden gate and fountain files and their geometry tests are retained as archived implementations and are excluded from the active bundle.
