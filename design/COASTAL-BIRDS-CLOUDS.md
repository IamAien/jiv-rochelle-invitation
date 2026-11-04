# Embroidered birds and moving top clouds

The 2026-11-04 revision replaces the flat line birds with textured embroidered gulls. Left and right wing cutouts rotate around their shoulders while a separate body stays stable. Each 3.8–4.7-second cycle has two short wingbeats followed by a longer glide. Flight crosses a shallow arc over 24–33 seconds; the bird slowly recedes and gently banks. The former inverted vertical scaling is removed.

The visible upper clouds now move, rather than adding faint small wisps over stationary clouds. A stationary 421 × 630 clean-sky patch is registered at source coordinate (520, 0), with feathered left and bottom edges. It covers only the upper-right sky; the original illustration remains the base. Two transparent clouds are shown at 33–43% of the full artboard width, 94% maximum opacity, and travel right by 16% of the artboard width over 22–28 seconds. They fade before resetting. Reduced motion and printing show the original image; hidden or offscreen scenes pause.

## Saved assets

Both new source images were created with the built-in `image_gen` tool, using the original coastal illustration as the texture/palette reference. No API/CLI image generation was used. FFmpeg only resizes, crops the technical sky patch and encodes WebP; alpha is preserved for the gull.

- [Gull source PNG](../src/assets/coastal-layers/embroidered-gull-source.png)
- [Gull WebP](../src/assets/coastal-layers/embroidered-gull.webp): 640 × 320, true alpha, quality 96; used by all three articulated parts.
- [Clean-sky source PNG](../src/assets/coastal-layers/cloudless-sky-source.png): full portrait edit.
- [Clean-sky patch WebP](../src/assets/coastal-layers/cloudless-sky.webp): 421 × 630, quality 95; only the upper-right crop is displayed.
- [Existing cloud cutout](../src/assets/coastal-layers/cloud-wisp.webp): reused at a larger, more visible size.

## Final generation prompts

### Gull

Reference image: `src/assets/embroidered-coastal-garden.webp`. Transparent output.

> Use case: stylized-concept. Asset type: transparent bird animation asset for the referenced embroidered coastal wedding invitation. The input image is a STRICT texture and muted palette reference, not an edit target. Generate ONE isolated small distant seagull seen from BEHIND, flying away from the viewer toward the horizon, wings extended horizontally in a gentle shallow arc. Full bird, centered, wingspan 80% of a wide 2:1 canvas, with transparent margins. Its compact body is precisely centered at x50%, with wing roots around y52%; the left wing stays in the left half, the right wing stays in the right half. Wings attach to the body's sides. Slim short tapered body, tiny head, no visible face, no long neck, short tail. Natural gull silhouette with tapered feather tips, not the letter M or a flat line icon. Match the reference's actual fine stitched cotton-thread hand embroidery, clearly visible little parallel thread ridges following the feather shapes, flat shallow stitched relief. Warm ivory feather highlights, muted dusty slate-blue and grey-sage wing shading, dull oatmeal thread edges, enough slate contrast to read against cream linen. Restrained fine material texture, no toy/plush appearance, no dark black outline. This single whole bird will be split into left wing, body and right wing in CSS and gently articulated; no sprite sheet or multiple birds. Actual alpha transparency everywhere around the bird and between the feathers, no linen patch, sky, water, rectangle, drop shadow, checkerboard, text, watermark or border.

### Clean sky

Edit target: `src/assets/embroidered-coastal-garden.webp`. Opaque output.

> Use case: precise-object-edit. Edit target is the attached 941 by 1672 portrait embroidered coastal wedding invitation illustration. Make a CLEAN SKY PLATE for animating the big top clouds as separate layers: REMOVE only the ivory cloud formations in the UPPER RIGHT, from approximately x540 to941, y0 to550. Replace these upper-right white cloud shapes with the quiet pale dusty-blue and warm-ivory embroidered sky stitches that surround them, with a natural transition into the original cream linen. The top-right sky should look open and cloudless, using the same original thin cotton thread texture and exact blue/ivory palette, no smooth digital gradients or new objects. Keep the entire portrait composition, dimensions, perspective, fine linen weave and original stitch detail. Preserve ALL original flowers and leaves, including the upper-left large branch and lower-right branch, ALL sea, shoreline, mountains, villa, terrace, left-edge clouds and the central blank warm cream invitation space. Change ONLY the upper-right clouds and the immediately vacated pixels. Do not redesign the image, shift anything, change exposure, add birds, add text, add flowers or crop. Output the full original portrait image, opaque. The untouched original will remain the website base; only this plate's upper-right sky region will be shown under moving transparent embroidered clouds.

## Verification

The generated assets and an offline composite were visually inspected. The sky patch has no visible rectangular edge, and the birds use the scene's ivory/slate thread texture. Existing behavior tests, the production build and server-rendered markup checks cover the unchanged invitation and updated scene structure. Browser automation is unavailable in this session, so real-time visual motion remains unverified.
