# Enhanced page linen texture

Historical experiment: this texture is no longer used as a page background. The active palette is documented in [Muted color backgrounds](SOFT-LINEN-AND-TIMELINE.md).

The page background now uses a newly generated linen tile with visibly larger warp/weft threads and deeper natural gaps. This changes the texture image itself, rather than only adjusting the earlier overlay.

## Saved files

- Original generated PNG: [woven-linen-defined.png](../src/assets/woven-linen-defined.png), 1254 × 1254.
- Production WebP: [woven-linen-defined.webp](../src/assets/woven-linen-defined.webp), 1024 × 1024, 499090 bytes, quality 95.
- The earlier [woven-linen.webp](../src/assets/woven-linen.webp) stays in use for the finer countdown text and swatch details.

The new page tile repeats at 768 × 768 CSS pixels with a light 16% ivory veil. Every content section paints this texture directly. The body, invitation shell, header and entrance loading surface share the background recipe. Opening/ceremony artwork, the scrolling pearl and timeline symbols are retained.

An earlier relative texture URL resolved to `/jiv-rochelle-invitation/assets/woven-linen.webp` in the local preview, returning fallback HTML rather than an image. Both texture variables now use project-root asset paths so Vite emits the correct base-prefixed image URLs in development and hashed URLs in production. Verification follows the actual URLs returned in the served stylesheet and checks their image content types.

The new tile's encoded 10th–90th percentile luma range is 174–217, compared with 199–225 for the earlier tile. Alongside the larger weave pitch, this gives the background substantially clearer thread definition.

## Method

Created with the **built-in image_gen tool**. The earlier fine linen tile was the edit target; the supplied desktop opening image was the material/palette reference. The generated PNG is preserved. FFmpeg prepared the production WebP with Lanczos resizing and no added sharpening.

## Final prompt

Verification: the production build passes. Both texture URLs extracted from the actual served stylesheet return HTTP 200 with `image/webp`, rather than fallback HTML. The generated texture was visually inspected; live page review remains unavailable through the browser connection.

Use case: style-transfer / precise-object-edit. Image 1 is the EDIT TARGET: an existing seamless ivory linen background tile for a wedding website. Image 2 is a MATERIAL AND PALETTE REFERENCE ONLY: the opening's embroidered linen scene. Generate a replacement square seamless linen tile for Image 1 with much clearer woven-thread definition, matching the actual cotton/flax material of Image 2's plain fabric areas. The existing tile becomes almost invisible on the website; make its warp and weft visibly larger and approximately 2 to 3 times more defined, while preserving a calm light warm oatmeal/ivory palette. Show distinct, gently irregular overlapping horizontal and vertical spun cotton strands, fine small fiber hairs and soft darker beige gaps at the intersections. A true orthogonal plain weave with natural slub variation, not random paper grain. Individual threads should remain identifiable when the tile is shown 768 pixels wide. Moderately closer textile scale than Image 1, but still fine linen rather than thick burlap, rope or knitting. Flat straight-on evenly lit textile scan, matte, no glossy highlights, no dramatic depth, no folds, no vignetting, no directional lighting gradient. Seamless edge-to-edge repetition on all four edges, no obvious repeated motifs. Overall warm pale flax close to #eee4d4, restrained natural variations from ivory thread to soft taupe gaps. No flowers, plants, embroidery motifs, leaves, borders, letters, watermarks or other objects. Output ONLY the cloth texture; an opaque square background tile.
