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

`CoastalScene.jsx` is shared by the sliding letter and page, with the same assets, positions and starting animation phases. `coastalScene.js` prepares the complete composition before the envelope is enabled; an asset failure resolves readiness to the original-image fallback. Both scenes remain paused throughout the full opening, card slide and crossfade. The letter never plays its scene animation. The hero stays mounted with all layers already visible and begins moving only when the opening reaches `stage === 'done'`, so no layers appear at entry. Replay resets both under the same cycle key. Registration uses layout dimensions unaffected by card transforms.

The upper branch uses `top-branch-complete.webp`, a 650 × 650 transparent repair of the earlier clipped plant. Missing upper leaf tips and buds were reconstructed with the built-in imagegen tool, preserving the matching two ivory flowers and olive embroidery. It is displayed at 610 × 610, about 6% smaller, at (-28, 30) on the 941 × 1672 artboard so its stem enters from beyond the left frame. The top, right and bottom edges clear its full sway. The old `top-branch.webp` is retained only as the repair reference. `bottom-branch.webp` remains 400 × 420 at (493, 1260). Its pivot is at 87.5% 100%, anchoring the stem beyond the bottom edge throughout the sway. There is no plant clip-path. The lower-left pink cutout remains omitted. See [source/runtime asset paths and exact repair prompt](TOP-BRANCH-REPAIR.json).

The water canvas divides the visible sea into three separately animated horizontal sections at up to 72% opacity: the upper section flows continuously right, the middle continuously left, and the lower continuously right. Each has its own timing (8, 10.5 and 13 seconds); the sea no longer reverses as a synchronized group. Two staggered texture samples crossfade inside each section so a sample resets only while invisible. Sample travel stays within 1.6% of the original width. Narrow feathered section boundaries lie at source y 85.2–85.8% and 90–90.6%, making the opposing currents distinct without bending the embroidered threads. Both the destination and every shifted source must pass shoreline, surrounding blue-thread and material checks. Olive foliage and dark warm plant stitches remain stationary. Rejected samples stay transparent so the original picture remains visible. Movement is strictly horizontal, and the canvas clears before each frame.

A software pixel reference on the original artwork reproduced 2,514 foliage-colored samples at the rightward extreme and 1,891 at the leftward extreme with the former mask. The corrected checks admitted zero of those samples, while retaining more than 34,000 visibly shifted water pixels in either direction. Before/after still crops were inspected. This verifies the image sampling logic; real-time browser WebGL review remains unavailable.

Eight embroidered clouds float right: five through the upper-right sky and three near the distant coast, using three different silhouettes, varied sizes and individual 22–42-second timings. A stationary clean-sky patch covers the old upper-right clouds. Flower-matched ivory petals drift from the upper left across the central text toward the lower right with two or three overlapping in a rolling flow. Five prepared layers use uneven 9–12-second release gaps on a 52-second schedule with varied gusts, distances, easing and flutter. Each visible flight lasts about 25 seconds before fading and waiting offscreen. All scenery remains still on the sliding letter and begins moving only after entry. Three textured embroidered gulls keep their short wingbeats and longer glides. See [artwork and generation prompts](COASTAL-BIRDS-CLOUDS.md).

All layers follow the original contain/cover scale, centering and phone crop. The water buffer is capped at native resolution and runs at up to 30 frames per second. Offscreen or hidden-tab motion pauses. Reduced-motion preferences and printing show the original still image; failed layer downloads also retain it. Replaying the envelope cleans up the water renderer and pauses the plant layers.

### Layer assets

Created with the built-in `image_gen` tool from the original coastal image. No original image was overwritten.

- [Background source PNG](../src/assets/coastal-layers/background-source.png): 941 × 1672.
- [Transparent plant source PNG](../src/assets/coastal-layers/plants-source.png): 981 × 1602, with alpha zero in the empty sky and central linen.
- [Background WebP](../src/assets/coastal-layers/background.webp): 941 × 1672, quality 95.
- [Plant WebP](../src/assets/coastal-layers/plants.webp): normalized to 941 × 1672 for the shared image frame, quality 96, preserving transparency.
- [Muted upper sprig source PNG](../src/assets/coastal-layers/muted-top-sprig-source.png): 1893 × 831, true alpha.
- [Muted upper sprig WebP](../src/assets/coastal-layers/muted-top-sprig.webp): 800 pixels wide, quality 95.
- [Cloud source PNG](../src/assets/coastal-layers/cloud-wisp-source.png): 2172 × 724, true alpha.
- [Cloud WebP](../src/assets/coastal-layers/cloud-wisp.webp): 640 pixels wide, quality 94.

The still composite was inspected over the actual background. Bright RGB colors in fully transparent source pixels are invisible when composited; there are no visible red or yellow matte pixels in the inspected cutout samples.

### Built-in image generation prompts

Background edit (opaque output):

> Use case: precise-object-edit. EDIT TARGET: the attached original embroidered coastal wedding invitation illustration, portrait 941 by 1672 pixels. Create a clean background plate for layered animation. Preserve the exact original composition, framing, scale, camera, fine sewn cotton/linen texture, warm ivory palette, villa architecture, sea, mountains, clouds and all other landscaping. Remove ONLY these three foreground botanical clusters: (1) the large ivory blossoms and olive-leaf branch framing the UPPER LEFT corner, from source x 0–580 and y 0–470; (2) the ivory blossom/olive-leaf spray framing the LOWER RIGHT corner, source x 610–941 and y 1360–1672; (3) the small pink-flowered foreground cluster at the very LOWER LEFT corner, source x 0–235 and y 1510–1672. Remove their shadows too. Restore only the newly exposed sky stitches, plain ivory linen, blue seawater and courtyard stone behind them, matching the immediately surrounding original material. Do not remove the pink flowers along the middle-left wall, climbing flowers on the villa, cypresses, terrace rail, or other garden plants. Do not change anything else. This background must remain precisely registered with the original so the cutout plants can be placed back at the same coordinates. Keep the original full 941:1672 portrait aspect ratio and full canvas with no cropping, added margins, zoom, text, watermark, border or redesign. The central blank invitation space must remain blank.

Plant extraction (transparent output):

> Use case: background-extraction. EDIT TARGET: the attached 941 by 1672 portrait embroidered coastal wedding illustration. Extract ONLY these THREE foreground botanical clusters as a full-canvas transparent animation overlay. Keep every extracted plant in its EXACT ORIGINAL SIZE, POSITION and ORIENTATION in the full 941:1672 portrait canvas, with no cropping or rearranging: (1) the large ivory blossom and olive-leaf branch in the UPPER LEFT, source x 0–580 and y 0–470; (2) the ivory blossom/olive-leaf spray in the LOWER RIGHT, source x 610–941 and y 1360–1672; (3) the small pink flower/leaf cluster in the extreme LOWER LEFT foreground, source x 0–235 and y 1510–1672. Include all connected fine stems, leaves and petals of these three clusters. Everything else MUST be truly alpha-transparent: sky, clouds, linen, sea, mountains, villa, stonework, railings, other plants and middle-left flowers. No fabric, sky or water pixels attached to the moving plants. Keep delicate original embroidered edges and the original warm ivory, dusty pink and olive cotton-thread colors. Preserve exact pixel registration and original corner cropping; do not center the subjects, group them together or add padding. The plants are cutouts from the reference, not redesigned or new illustrations. Output one full portrait canvas with the THREE clusters in their original corners and actual transparent pixels everywhere else. No fake checkerboard, white/cream matte, rectangular patches, text, border or watermark.

Muted sprig variation (transparent output, built-in `image_gen`; original coastal image is the style reference and previous plant cutout is the edit target):

> Use case: style-transfer / precise-object-edit. Image 1 is the strict material and muted color reference, an embroidered coastal wedding invitation. Image 2 is the EDIT TARGET; take only its upper-left botanical branch and replace it with a DIFFERENT, much airier variation for a smaller overlay. Output ONLY ONE isolated branch on actual transparency, tightly framed with a small clear margin, no other corner clusters. It should grow from a slender stem entering the LEFT side and extend diagonally right and slightly down. Use about six to eight narrow sage/olive leaves with clear empty gaps, one small ivory blossom placed toward the right, and two or three tiny unopened cream buds. The silhouette must differ from the original heavy two-flower L-shaped branch. Match Image 1's fine FLAT hand embroidery, soft flax linen-colored cotton stitches and restrained shallow relief. Palette is VERY MUTED and low contrast: faded grey sage #8e947e, pale olive #a1a58c, oatmeal stems #b4a58d, soft warm ivory #eee4d5, tiny dull beige-gold flower center. No deep brown outlines, no saturated green, no orange/gold glow, no thick rope, no glossy/puffy/sculpted embroidery. Delicate and quiet, subordinate to the existing original flowers. Preserve clean fine stitched edges. Everything around and between the stems/leaves must be genuinely transparent, with no sky, linen, cream matte, shadow rectangle, checkerboard, background texture, text or watermark. This is a small distinct foreground sprig, not a wreath, garland or whole illustration.

Cloud extraction (transparent output, built-in `image_gen`; original coastal image as reference/edit target):

> Use case: background-extraction. Reference/edit target is the attached embroidered coastal wedding illustration. Create ONE isolated small airy cloud cutout matching the ivory clouds in its upper-right sky. Extract the delicate warm-ivory stitched cloud character and fine cotton-thread material, as a slim horizontal cloud with three soft asymmetrical rounded wisps, pale oatmeal thread shadows and tiny irregular sewn edges. A quiet wispy cloud, not a dense round cotton ball, not photorealistic, not cartoon. It will be a small foreground cloud layer drifting slowly right over the original image. Tightly frame the single cloud with a little transparent margin; wide 3:1 silhouette. Keep the warm ivory/oatmeal palette, low contrast and shallow embroidery relief of the reference. Only the cloud's stitched threads are opaque. Absolutely everything around it and through gaps must be actual alpha transparency, with NO blue sky stitches, linen, flowers, landscape, shadow rectangle, fake checkerboard, text or watermark. Do not render the whole landscape. Output ONLY the single transparent embroidered cloud asset.

## Verification

The production build and 38 behavior tests cover phone and desktop image alignment, source-resolution limits, independent one-way sea sections with seamless sample resets, full-size plant boundaries and scene preparation/playback/fallback/cleanup alongside the other invitation behavior. Server-rendered checks cover the identical complete scene in the letter and hero, including two matching branches, eight clouds of three shapes, five prepared falling petals and three wing-flapping birds. Asset alpha channels and a still composite were inspected. Current browser automation is unavailable in the editing session, so live motion QA remains unverified.
