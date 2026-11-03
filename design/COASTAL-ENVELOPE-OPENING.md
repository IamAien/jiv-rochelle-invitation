# Coastal envelope and invitation

The current entrance replaces the garden gates with the user's supplied embroidered coastal envelope. The invitation cover uses the separately supplied coastal villa garden. Existing wedding details, selected Baskerville ampersand, countdown, story, gallery, palette and venue links are retained.

## Supplied artwork

- `復古刺繡風暖色海景信封.png` → `src/assets/embroidered-coastal-envelope.png` and `.webp`.
- `刺繡海岸別墅花園.png` → `src/assets/embroidered-coastal-garden.png` and `.webp`.
- Both originals are 941 × 1672. The original PNGs are preserved unchanged; the live site uses WebP at quality 93 (510,040 and 428,422 bytes respectively).
- Source directory: `D:/Obsidian/MyDharma/Jiv&Rochelle Wedding Website/weddingAsset/`.

## Opening

`EnvelopeOpening.jsx` uses complementary SVG masks of the same complete image for the pocket and hinged flap. The original wax seal belongs to the moving flap. The mask follows the native V-shaped fold, with a small ellipse around the seal. The closed layers reconstruct the supplied illustration. No new artwork was generated.

The 4.2-second opening lifts the flap, slides out a letter showing the coastal garden and wedding names, then fades into the actual invitation page. Main-page and entrance fades overlap during the final second. The page remains inert until the opening completes; focus then moves to the names and scrolling unlocks. The footer replays the same sequence. Reduced-motion visitors get a short direct transition. A failed envelope download exposes a View invitation fallback.

The full opening is a keyboard-accessible button. The wax seal has a subtle breathing ring and the linen carries a small tap hint. On phones the centered portrait artwork fills the screen. Wide windows preserve the portrait composition with warm linen on either side. The second page preserves the complete garden on wide screens and uses a centered crop on phones; text sits in its open linen area.

## Verification

The production build and existing behavior suite are required. Current browser automation is unavailable in the editing session, so visual animation QA remains unverified. Older garden gate and fountain files and their geometry tests are retained as archived implementations and are excluded from the active bundle.
