# Warm embroidered desktop gardens

At widths of 900px and above, and in narrower landscape windows, the opening uses the user's supplied `刺繡田園花園與拱門小徑desktop.png` and the invitation uses `柔和刺繡質感的義式花園黃昏desktop.png`. Both are 1672 × 941. Source files were read from `D:/Obsidian/MyDharma/Jiv&Rochelle Wedding Website/weddingAsset/` and copied without alteration. Both wide layouts share the same artwork and gate geometry so an under-900px desktop preview cannot select the former landscape images.

## Saved assets

- `src/assets/sunset-stone-garden-desktop.png`: supplied opening original.
- `src/assets/sunset-stone-garden-desktop.webp`: active opening, WebP quality 92, 682342 bytes.
- `src/assets/warm-rose-garden-desktop.png`: supplied invitation original with sunset.
- `src/assets/warm-rose-garden-desktop.webp`: active invitation, WebP quality 92, 436632 bytes.
- `src/assets/warm-rose-garden-desktop-reveal-no-sun.png`: built-in image editing output used only during the gate reveal.
- `src/assets/warm-rose-garden-desktop-reveal-no-sun.webp`: active reveal variant, WebP quality 92, 360008 bytes.

J & R remains live text above the opening arch, with option 05's selected Baskerville ampersand. The wide invitation uses warm antique-gold serif names and supporting brown lettering in the clear linen above the arch. Phone portrait artwork and typography retain their selected treatment.

The desktop gate is registered at native bounds (943, 325, 313, 380), with its center seam at x=1095. The reveal aligns the fountain at (835, 642) to the gate using the normal invitation image scale. The fountain stays fixed, fades out with the opening as one group, and only then does the full sunset invitation fade in. The reveal variant removes the second sun; the invitation itself uses the supplied original.

## Image edit provenance

Mode: built-in image generation/editing tool; no CLI/API fallback. Edit target: `src/assets/warm-rose-garden-desktop.png`. The generated original is retained at `C:/Users/40523/.codex/generated_images/01a19bce-ae71-7bb1-8b07-d706d508936d/exec-2f04f05a-3565-4cb8-93d5-5fec608f6a6c.png`. Output was visually inspected for a clear sky without a sun disk and a retained fountain, arch, composition, and embroidered style. The model slightly reinterprets stitch detail; this derivative is confined to the temporary portal.

Exact final prompt:

> Edit this supplied embroidered wedding garden illustration. Keep the EXACT original 1672 by 941 landscape canvas, composition, warm peach and cream linen texture, thread detail, colors, lighting, rose-covered ivory arch, curtains, distant hills, fountain, villa, garden and path. Remove ONLY the small round sun disk and its concentrated bright yellow halo at approximately pixel (832,506), inside the central arch just above the distant hills. Seamlessly replace that tiny sun/halo region with the surrounding soft peach embroidered sky, retaining its horizontal stitch texture and gentle tonal variation. There should be no visible sun disk or bright solar spot anywhere in the image. Do not move, zoom, crop, enlarge or restyle anything. The fountain at approximately (835,642) must remain unchanged. No lettering, words or added objects. This is a reveal-only matching variant; all details outside the small sun patch should remain as close as possible to the original.

## Verification

All 29 behavior tests, server-rendered scene checks, and the production build pass. Headless Chrome checks 900 × 900, 1280 × 720, 1440 × 900, and 1920 × 1080, plus phone sizes 320 × 568, 375 × 667, 390 × 844, and 430 × 932. Checks cover actual rendered fountain pixels, fixed scale and position, shared opening fade, second-page sequencing, artwork selection, text containment above the arch, and browser errors. Diagnostic screenshots and results are under `.tmp/`.
