# Supplied countdown frame

The countdown uses the user's `countDownFrame.png`, a 2172 × 724 wide floral plaque. One complete image replaces the four former round linen patches. HTML numbers sit above the existing printed labels; the labels are not duplicated in visible HTML.

The frame keeps its 3:1 aspect ratio and scales up to 1120 CSS pixels. On phones the section leaves a small inset so the whole artwork stays visible. Number centers are at 24.2%, 41.6%, 58.7% and 76.7% of the frame width, with vertical centers at 49% of its height. Font size follows the frame width. Existing once-per-second countdown logic, zero floor and accessible timer summary remain active.

## Saved files

- [Supplied original PNG](../src/assets/embroidered-countdown-frame-source.png): original solid black backdrop, preserved unchanged.
- [Transparent PNG](../src/assets/embroidered-countdown-frame-transparent.png): built-in imagegen background extraction, 2172 × 724, true alpha.
- [Runtime WebP](../src/assets/embroidered-countdown-frame.webp): 2172 × 724, quality 96, transparency retained.

Source supplied by the user: `d:/Obsidian/MyDharma/Jiv&Rochelle Wedding Website/weddingAsset/smallDecoration/countDownFrame.png`.

## Generation prompt

Only background cleanup used the built-in `image_gen` tool with `transparent_background=true`. No CLI/API generation was used. The uploaded frame was the edit target; the original on D: was not modified.

> Use case: background-extraction. EDIT TARGET: the attached wide floral countdown plaque. Remove ONLY the solid BLACK background outside and between the outer flowers/leaves, making those areas truly alpha-transparent. Preserve the provided artwork exactly: the warm ivory textured plaque, wavy blue-and-ivory checked ribbon border, gold ornaments and three gold dividers, left ivory flower, right blue and ivory flowers, all green leaves and small buds and loose petals. Preserve the exact original wide 3:1 composition, size ratios, positioning and lettering. Text must remain exactly 'Days', 'Hours', 'Minutes', 'Seconds' in the same places and same olive italic serif lettering. Keep the open spaces ABOVE the labels empty for live countdown numbers. Do not add numbers, change the font, reword text, move dividers, redesign flowers, crop, stretch, increase shadows or alter colors. Only the former black backdrop should change to actual alpha=0 transparency. No replacement white/cream matte, no fake checkerboard, no background rectangle, no new objects, text, frame or watermark. Return the whole complete wide plaque with a tiny transparent margin.

## Verification

The alpha channel and desktop/phone-sized still layout previews were inspected. Existing countdown behavior tests verify second updates, rollovers and the zero floor. Server-rendered checks verify one frame, four live values, an accessible timer and no duplicate label text. Browser automation remains unavailable, so live browser layout review is not complete.
