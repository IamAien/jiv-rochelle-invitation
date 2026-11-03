# Sun-free fountain view for the phone gate

The phone opening now uses a separate edited image for the fountain visible through the gate. The visible sun disk and concentrated halo above the fountain are removed, so the opening scene's existing sun is the only one shown. The actual second page retains the original sunset artwork.

## Saved assets

- Active gate-only image: `src/assets/warm-rose-garden-reveal-no-sun.webp` (941 × 1672, quality 92, about 391 KB).
- Retained edited PNG: `src/assets/warm-rose-garden-reveal-no-sun.png` (941 × 1672).
- Original second-page image: `src/assets/warm-rose-garden-portrait.webp`.
- Original supplied PNG: `src/assets/warm-rose-garden-portrait.png`.

The built-in image generation/editing tool was used in precise-object-edit mode, with the original PNG as the edit target and an opaque background. The resulting PNG was copied into the project and encoded to WebP. No CLI/API image-generation fallback was used.

`CEREMONY_ARTWORKS.portrait.revealSrc` selects the sun-free image for `FountainReveal` only. The normal `src` still selects the original for the invitation. The gate-only image is preloaded alongside the entrance. The image dimensions, fountain alignment, normal scale, shared fade, and subsequent second-page reveal remain as selected.

## Exact edit prompt

```text
Use case: precise-object-edit.
Asset type: a separate background variant used only inside the opening gate of an embroidered wedding website.
Input image 1: EDIT TARGET, the supplied warm golden rose-arch garden portrait.
Primary request: remove ONLY the small visible glowing sun disk and its concentrated circular halo in the sky inside the arch, directly above and behind the fountain, around the middle of the image width and 60% of its height. Replace that small sun area with continuous softly colored peach embroidered sky and horizontal thread texture matching its immediate surroundings. The gate-opening view must contain no visible sun, moon, circular light source, sun rays, or bright sun-shaped glow.
Invariants: preserve the original framing, portrait aspect ratio, image dimensions if possible (941 x 1672), fountain position and size, all fountain details, arch, columns, roses, trees, mountains, building, stone path, original warm ambient color palette, and fine linen-and-thread texture. Do not change the camera, crop, architecture, lighting elsewhere, or anything outside the small sun-and-halo area. Preserve the blank linen area above the garden. This is a minimal local removal, not a redesign. Do not zoom in. Do not add any text, letters, logos, or watermark. Opaque background.
```

## Validation

Browser checks cover four phone sizes and desktop. They verify that the phone opening uses the sun-free asset, the second page uses the original sunset asset, the fountain remains visible at normal scale, and the first image and fountain fade together before the second page appears. The gate preview was visually inspected to confirm only the original entrance sun is visible. All 29 behavior tests, production build, and server-rendered checks pass.
