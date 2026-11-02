# Center-opening gates and ceremony garden

Historical design. The active artwork and implementation are documented in [Fine-thread garden](FINE-THREAD-GARDEN.md).

## Current experience

The opening now works as a garden entrance. Two separate embroidered iron leaves meet at the middle and rotate from their outer hinges. The stone piers, roses, curtain ribbons, linen and embroidered J & R stay fixed while the leaves open. The ceremony garden is visible through the ironwork and the masked opening between the piers. A gentle approach and fade then carry the visitor into the ceremony scene.

The existing slow **8.8-second** timing is retained. The only initial interface copy is Open. Images load before the control becomes active; a fallback View invitation action appears if an entrance asset fails. Skip is available during the opening. Reduced-motion visitors get a brief transition.

The new second page follows the supplied reference: a rose-covered ivory stone arch, drapery tied with dusty-blue ribbon, worn stone path, courtyard fountain, cypress trees, distant hills, and a pale peach sunset on warm linen. The visual treatment uses matte thread, finer stitch variation, restrained shadows and quieter colors, avoiding shiny or bulky rendering. These are generated textile-style illustrations, not a claim of physical hand embroidery.

Full-width responsive layouts, scroll text reveals, live countdown, embroidered timeline illustrations and moving pearl, wedding information and dress palette are preserved.

## Current new assets

Generated or edited using the **built-in Imagegen tool**, then encoded as WebP. Original PNGs are retained beside the production files.

- [Portrait entrance frame](../src/assets/entrance-portrait.webp) — stationary linen, initials, piers and flowers, without painted-on gate leaves.
- [Landscape entrance frame](../src/assets/entrance-landscape.webp) — corresponding wide-screen composition.
- [Transparent iron gate pair](../src/assets/iron-gate-pair.webp) — split at the exact vertical midpoint into separately hinged leaves; natural aspect ratio is preserved.
- [Portrait ceremony garden](../src/assets/ceremony-garden-portrait.webp) — based on the user's attached reference.
- [Landscape ceremony garden](../src/assets/ceremony-garden-landscape.webp) — recomposed from the portrait version.

## Source and verification

`src/components/GateOpening.jsx` and `GateOpening.css` replace the previous book component. The entrance is drawn on an artboard with its original aspect ratio. A small SVG mask opens the area between the piers, and the separate iron leaves sit over that portal. Only the leaves rotate; the later approach animation gently moves and fades the stationary foreground. `src/wedding.js` exports the shared `GATE_OPENING_MS` duration.

The production build and 10 existing behavior tests pass. Server rendering verifies portrait and landscape entrance selection, two separate hinged leaves, the masked portal, minimal initial copy, skip and completion states, and the new ceremony images. Gate transparency and preview HTTP responses are verified. Live animation playback and browser visual verification remain unavailable because the browser connection is unavailable in this environment.

The illustrated garden is decorative invitation artwork; the actual ceremony and reception venues remain in the details section.

## Final prompts

### Portrait ceremony garden

Input: The user's latest attached ceremony-garden image — reference.

Use case: precise-object-edit / illustration-story. Use the attached image as the visual reference and create an original portrait 9:16 wedding invitation inside page with the SAME overall composition and gentle handcrafted textile character: a large quiet expanse of warm ivory linen above, and an inviting cream stone ceremony arch, garden path, courtyard fountain and distant peach sunset below. The arch stands in the lower 55% of the canvas, decorated with a few naturally arranged dusty-rose and cream roses, sage foliage and loose ivory drapery tied back with small faded dusty-blue ribbons. A softly worn stone path leads through the arch toward a modest circular fountain and a small Mediterranean ceremony pavilion, with cypress trees and gentle hills in the distance. Warm pale peach thread clouds; muted and restrained colors. Keep the central 64% width of the upper 38% EMPTY clean ivory linen for live names added later. Crucial style direction: genuinely hand-worked-looking fine cotton embroidery and linen applique, low relief, subtle irregular stitch lengths, hand-drawn contours, slightly uneven flower placement, matte fabric, natural stitch shadows. More restrained and delicate than glossy 3D generative illustration. No plastic, no shiny rendered stone, no HDR, no over-sharpening, no cloned identical roses, no impossible ornamental details. Fine textile detail should be clear without exaggerated rope-like stitches. No cottage as the focal point. No letters, no monogram, no dates, no watermark, no border, no phone or UI. Fill the canvas edge to edge.

### Landscape ceremony garden

Input: `src/assets/ceremony-garden-portrait.png` — reference and edit target.

Use case: precise-object-edit. Recompose this exact embroidered linen ceremony-garden artwork into an original WIDE LANDSCAPE 16:9 website invitation. Preserve the same cream stone ceremony arch with restrained carved scrollwork, soft ivory drapes tied with dusty-blue ribbons, dusty-pink and cream roses, sage foliage, pale peach sunset and stitched clouds, cypress trees and distant hills, small circular courtyard fountain, and worn stone path leading through the arch. The art must remain matte, delicate, fine cotton embroidery and linen applique with slight natural stitch irregularities and hand-drawn flower arrangements, not glossy plastic 3D rendering or overly perfect cloned decoration. Keep the prominent arch centered in the LOWER 55% of the wide canvas: its highest carved crest should start around 43% canvas height, with the garden, courtyard and path filling the bottom edge. Extend soft gardens and low stone balustrades to both sides. Keep the central 64% width of the upper 38% EMPTY clean warm ivory linen for live invitation names added later. Pale peach thread clouds may drift gently along the outer edges. Same quiet ivory, dusty rose, sage and dusty blue palette. No cottages, no grand mansion, no printed text, no letters, no monogram, no dates, no watermark, no border, no UI. Full bleed. Recompose naturally, do not stretch the portrait.

### Stationary portrait entrance

Input: `src/assets/cover-sharp-portrait.png` — edit target.

Use case: precise-object-edit. Edit this exact portrait linen wedding entrance illustration. Preserve the overall tall 9:16 composition and the exact readable J & R embroidery centered near the upper third, the blue ribbon-tied ivory fabric at the upper sides, and the two lower cream stone gateposts and flower beds in their existing positions. REMOVE ONLY the dusty-blue iron gate leaves and every iron bar in the lower central opening between the posts. Behind the removed gate put a simple quiet pale stone pathway with no new objects; this area will become a transparent portal in the website. Keep the interior opening free of flowers and bars; flowers stay on the outside of the stone posts. Refine the overall textile treatment to look genuinely hand-worked: finer matte cotton stitches, slightly irregular stitch lengths, gentle hand-drawn edges, subtle linen weave, less contrast and lower relief. Soften any glossy or bulky plastic/rope-like look, reduce repetition in flowers, and use restrained ivory, faded dusty rose/apricot, sage and dusty blue. Preserve a quiet natural linen cover and tactile embroidered J & R; no additional words, no border, no shiny rendering, no HDR, no watermark. The stone piers should remain clearly defined with straight inside edges so animated gate leaves can be attached later.

### Stationary landscape entrance

Input: `src/assets/cover-sharp-landscape.png` — edit target.

Use case: precise-object-edit. Edit this exact wide 16:9 linen wedding entrance illustration. Preserve the overall composition and exact readable J & R embroidery centered near 36% height, blue ribbon-tied ivory fabric at the far upper sides, and the lower central pair of cream stone gateposts and surrounding flowers in their existing positions. REMOVE ONLY the dusty-blue iron gate leaves and every iron bar between the lower central posts. Replace the removed metal with a simple quiet pale stone path with no objects; this opening will become a transparent portal in the website. Flowers stay outside the opening and along the outside of the posts. Refine the textile to feel genuinely handmade: finer matte cotton embroidery, subtle stitch irregularities and hand-drawn outlines, low relief, natural linen weave, gently varied flower placement. Reduce glossy, bulky 3D and overly perfect cloned details. Keep restrained warm ivory, faded dusty rose/apricot, sage and dusty blue. No added words, no shiny effects, no border, no HDR, no watermark. Preserve clear straight interior edges to the stone piers for animated gate hinges.

### Transparent iron leaves

Input: `src/assets/cover-sharp-portrait.png` — style and gate-design reference.

Use case: background-extraction / illustration-story. Create ONLY a matching closed pair of dusty-blue wrought-iron garden gate leaves from the lower center of this reference. Isolate the gate leaves on a TRUE transparent background, with no gateposts, no flowers, no fabric, no linen rectangle, no monogram and no scene behind. Both left and right leaves meet EXACTLY down the vertical center, same height and width, their outer hinge rails at far left and far right. Simple graceful hand-drawn curls and vertical bars, with a modest curved top rising toward the center; lower edges share one straight baseline. The gates should feel made from fine matte dusty-blue cotton embroidery, subtle hand-worked stitch irregularity, low relief and restrained natural stitch shadows, NOT glossy plastic, NOT metal photography, NOT a bulky 3D render. Preserve the reference's soft blue tone and delicate ironwork character but simplify excessive ornament. Symmetrical overall structure with natural tiny stitch variations. A nearly square total pair silhouette, tightly and evenly framed, no extra padding except a very small transparent safety margin. High clarity, no blur. True transparent space BETWEEN every bar and curl as well as around the gates. No words, no letters, no watermark, no frames. This asset will be split at its exact horizontal center into two physically hinged HTML gate leaves.
