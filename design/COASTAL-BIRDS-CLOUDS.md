# Embroidered birds and moving top clouds

The 2026-11-04 revision replaces the flat line birds with textured embroidered gulls. Left and right wing cutouts rotate around their shoulders while a separate body stays stable. Each 3.8–4.7-second cycle has two short wingbeats followed by a longer glide. Flight crosses a shallow arc over 24–33 seconds; the bird slowly recedes and gently banks. The former inverted vertical scaling is removed.

The sliding letter and hero share the same prepared full composition, including plants, clouds, petals and birds. Both stay still throughout the complete envelope opening, card slide and crossfade. The letter never plays scene motion; the hero begins only at `stage === 'done'`. The top branch was repaired with complete upper leaves and buds, keeping its matching two ivory flowers and olive-thread style. Its 650 × 650 canvas sits at (-28, 38), with the stem growing in from beyond the left edge. All other frame edges remain clear throughout its sway. The bottom sits at (493, 1260), with its pivot at 87.5% 100%: the stem hinge remains beyond the bottom edge throughout its sway. Petal starting points follow the repaired blossoms. See [repair asset and exact built-in imagegen prompt](TOP-BRANCH-REPAIR.json).

Eight transparent embroidered clouds now occupy the scene: five in the upper-right sky and three near the distant coast. They use three genuinely different silhouettes: the original soft wisp, a long wind-swept filament and a compact rounded billow. Some are mirrored, with widths of 20–40%, opacities of 83–94%, and individual rightward travel of 8–16% over 22–42 seconds. A stationary 421 × 630 clean-sky patch remains registered at (520, 0), with feathered left and bottom edges. The original illustration remains the base. The three lower clouds use 32, 35 and 37-second cycles, about 30% faster than before. Clouds fade before resetting. Reduced motion and printing show the original image; hidden or offscreen scenes pause.

Three larger ivory embroidered petals detach from the upper blossoms after delays of 2, 11 and 20 seconds. Each follows a gentle lateral drift and a soft flutter over a 27–35-second cycle, fading before its invisible reset. Their widths are 6.3–7.2% of the scene, roughly 2.6 times their previous size, with each petal centered on its flower origin. The petals stay near the left side of the clear linen area. Both their fall and flutter are paused during the envelope sequence and obey the scene's visibility and reduced-motion settings.

## Saved assets

The source images were created with the built-in `image_gen` tool, using the original coastal illustration as the texture/palette reference. No API/CLI image generation was used. FFmpeg only resizes, crops the technical sky patch and encodes WebP; transparency is preserved.

- [Gull source PNG](../src/assets/coastal-layers/embroidered-gull-source.png)
- [Gull WebP](../src/assets/coastal-layers/embroidered-gull.webp): 640 × 320, true alpha, quality 96; used by all three articulated parts.
- [Clean-sky source PNG](../src/assets/coastal-layers/cloudless-sky-source.png): full portrait edit.
- [Clean-sky patch WebP](../src/assets/coastal-layers/cloudless-sky.webp): 421 × 630, quality 95; only the upper-right crop is displayed.
- [Existing cloud cutout](../src/assets/coastal-layers/cloud-wisp.webp): reused at a larger, more visible size.

## Final generation prompts

The two additional cloud silhouettes and petal, including their source paths and exact generation/edit prompts, are recorded in [COASTAL-CLOUD-PETAL-ASSETS.json](COASTAL-CLOUD-PETAL-ASSETS.json). Runtime files are [cloud-filament.webp](../src/assets/coastal-layers/cloud-filament.webp), [cloud-rounded.webp](../src/assets/coastal-layers/cloud-rounded.webp) and [ivory-petal.webp](../src/assets/coastal-layers/ivory-petal.webp). Their full PNG sources are stored beside them. The petal alpha channel was inspected to verify that the surrounding haze is fully transparent.

### Gull

Reference image: `src/assets/embroidered-coastal-garden.webp`. Transparent output.

> Use case: stylized-concept. Asset type: transparent bird animation asset for the referenced embroidered coastal wedding invitation. The input image is a STRICT texture and muted palette reference, not an edit target. Generate ONE isolated small distant seagull seen from BEHIND, flying away from the viewer toward the horizon, wings extended horizontally in a gentle shallow arc. Full bird, centered, wingspan 80% of a wide 2:1 canvas, with transparent margins. Its compact body is precisely centered at x50%, with wing roots around y52%; the left wing stays in the left half, the right wing stays in the right half. Wings attach to the body's sides. Slim short tapered body, tiny head, no visible face, no long neck, short tail. Natural gull silhouette with tapered feather tips, not the letter M or a flat line icon. Match the reference's actual fine stitched cotton-thread hand embroidery, clearly visible little parallel thread ridges following the feather shapes, flat shallow stitched relief. Warm ivory feather highlights, muted dusty slate-blue and grey-sage wing shading, dull oatmeal thread edges, enough slate contrast to read against cream linen. Restrained fine material texture, no toy/plush appearance, no dark black outline. This single whole bird will be split into left wing, body and right wing in CSS and gently articulated; no sprite sheet or multiple birds. Actual alpha transparency everywhere around the bird and between the feathers, no linen patch, sky, water, rectangle, drop shadow, checkerboard, text, watermark or border.

### Clean sky

Edit target: `src/assets/embroidered-coastal-garden.webp`. Opaque output.

> Use case: precise-object-edit. Edit target is the attached 941 by 1672 portrait embroidered coastal wedding invitation illustration. Make a CLEAN SKY PLATE for animating the big top clouds as separate layers: REMOVE only the ivory cloud formations in the UPPER RIGHT, from approximately x540 to941, y0 to550. Replace these upper-right white cloud shapes with the quiet pale dusty-blue and warm-ivory embroidered sky stitches that surround them, with a natural transition into the original cream linen. The top-right sky should look open and cloudless, using the same original thin cotton thread texture and exact blue/ivory palette, no smooth digital gradients or new objects. Keep the entire portrait composition, dimensions, perspective, fine linen weave and original stitch detail. Preserve ALL original flowers and leaves, including the upper-left large branch and lower-right branch, ALL sea, shoreline, mountains, villa, terrace, left-edge clouds and the central blank warm cream invitation space. Change ONLY the upper-right clouds and the immediately vacated pixels. Do not redesign the image, shift anything, change exposure, add birds, add text, add flowers or crop. Output the full original portrait image, opaque. The untouched original will remain the website base; only this plate's upper-right sky region will be shown under moving transparent embroidered clouds.

## Verification

The generated assets, petal alpha channel and an offline composite were visually inspected. The 38 behavior tests, production build and server-rendered markup checks cover the invitation, paused scene preparation and the identical composition in the letter and hero, including eight clouds of three shapes and three petals. Browser automation is unavailable in this session, so real-time visual motion remains unverified.
