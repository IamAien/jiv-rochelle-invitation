# Reference image extension — current artwork

Historical iteration. Current distinct locations and stronger needlework foliage are documented in [Stitched plants and ceremony](STITCHED-PLANTS-AND-CEREMONY.md).

## Direction and inputs

The user asked to expand their supplied lakeside embroidery image because earlier generated scenes still looked too polished. The current artwork uses that image as an edit target, extending its composition while keeping the olive tree, cafe table, two chairs, rose arch, lavender, lake and sunset recognizable. Both screens share the same terrace setting, visible flax weave, irregular small loop stitches, braided bark and matte cotton palette.

Method: built-in Imagegen, edit/outpainting workflow. The portrait terrace used the latest attached image directly (one conversation image). The portrait entrance and wide terrace were edited from the resulting portrait terrace. The wide entrance was edited from the portrait entrance. No separate generic gate asset is used.

These are generated extensions; the original attachment is not claimed to remain pixel-for-pixel unchanged. The intent is to preserve its specific scene and material character rather than invent another scene from a written style description.

## Saved assets

All assets are in src/assets. PNGs are retained; production WebPs are quality 97, encoded without resizing.

| Role | WebP | Original PNG | Native size |
| --- | --- | --- | --- |
| Phone entrance | reference-entrance-portrait.webp | reference-entrance-portrait.png | 941 × 1672 |
| Wide entrance | reference-entrance-landscape.webp | reference-entrance-landscape.png | 1672 × 940 |
| Phone invitation | reference-terrace-portrait.webp | reference-terrace-portrait.png | 941 × 1672 |
| Wide invitation | reference-terrace-landscape.webp | reference-terrace-landscape.png | 1672 × 940 |

Full-width display uses natural aspect ratios and cover cropping. The phone title was moved into the quiet upper-right linen area and made smaller to leave the threadwork visible.

## Opening behavior

The entrance adds a modest grey stitched gate and J & R monogram to the terrace setting. The closed state shows its complete original entrance asset, without a separately scaled gate overlay. During the slow 8.8-second opening, native crops of the very same gate swing around the outer hinges. A shaped portal mask and luminance-based alpha extraction remove the pale textile between gate bars while retaining dark thread.

Portrait gate bounds: x458, y1265, width360, height237; latch x638. Landscape: x984, y666, width309, height185; latch x1139. Source coordinates preserve the gate proportions. Loading, skip, replay, reduced motion and focus handling are retained. Countdown, timeline pearl, text reveals and actual wedding information are unchanged.

## Verification

All four PNG outputs were visually inspected for material, composition and lettering. The production build and 13 tests pass. Rendering checks verify the new portrait and wide source crops, untouched closed artwork, opening mask, completion and both terrace sources. The local preview serves the new files. Interactive browser review was unavailable because the native browser connection was unavailable.

## Complete prompts

### terrace-portrait

Use case: precise-object-edit / outpainting.
Edit target: the user's attached embroidered lakeside terrace image. This is an EXTENSION of that image, not a new interpretation.
Keep the existing image and its actual stitchwork as intact as possible: the olive tree and every irregular leaf, round table with cream embroidered cloth, two fine grey chairs, stone paving, lavender pot, rose-covered arch at right, lake and sunset hills. Preserve the same visible coarse ivory linen warp and weft, small loose loop stitches in stone, braided bark, soft satin-stitch leaves, uneven thread tension and matte cotton fibers. Do not smooth, redraw as a digital painting, add sculptural depth or beautify the architecture.
Make a tall 9:16 full-bleed website illustration by extending the existing linen above and the textile ground slightly below. Keep generous clean woven linen in the upper central/right area for live wedding names. Extend the existing branches and paving naturally at edges only. The original scene should remain immediately recognizable and substantially unchanged. Same faded cream, flax, olive, dusty pink, lavender and grey threads. No added objects, no text, no letters, no border, no phone frame, no watermark. Highest available detail; crisp weave and individual stitches, no blur.

### entrance-portrait

Use case: precise-object-edit. Edit target: this exact fine embroidered lakeside terrace image. Keep the existing woven linen, olive tree and irregular leaves, cafe table and two chairs at lower left, lake, sunset, lavender and rose-covered side arch. This is the same piece of textile, with the same small imperfect cotton loops, braided bark and visible warp/weft; do not redesign or smooth it.
Change only the foreground approach at the lower centre/right: add a modest CLOSED double garden gate between two plain narrow cream stone piers in front of the terrace. Gate pair occupies x43% through88% of image width and y66% through90% of image height, so both leaves fit comfortably in the picture. Thin warm charcoal-grey backstitched iron bars and a few simple stitched curls, matching the existing fine iron chairs. Two equal leaves face the viewer flat on, meet at one straight middle seam, and hinge on the two piers. All gate bars, posts and hinges are visibly thread sewn into the same linen. Keep the spaces immediately between the bars pale ivory linen, free of dark plants, for animation extraction. Preserve the rest of the original picture as closely as possible.
Add only a SMALL exact 'J & R' monogram in fine muted brown chain stitches in the quiet upper-right linen, centered at x67%, y29%, width about18%. No other lettering. Preserve 9:16 portrait framing. No shiny rendered objects, no molded stone, no Rococo carvings, no curtains, no giant gate, no thick blue metal, no watermark. Sharp actual cloth weave and individual stitches, matte handworked textile.

### terrace-landscape

Use case: precise-object-edit / outpainting. Extend this exact portrait embroidered lakeside terrace LEFT and RIGHT to a 16:9 landscape website image. Preserve the original terrace and stitches; extend the same linen, olive branches, quiet lake, low stone wall and thread paving sideways. Keep the tree and cafe table to the left and rose-covered arch at the right; the upper central/right area must stay quiet visible ivory linen for website names. Maintain the same dense small irregular cotton loops in stone, coarse visible flax warp and weft, fine backstitch chairs, braided bark, satin-stitch leaves, matte faded cream/olive/dusty pink/lavender threads. A flat close scan of the same textile, not a polished new rendering. No new objects, no text, no watermark or frame. Do not stretch, soften, smooth or replace the original scene. Highest available detail.

### entrance-landscape

Use case: precise-object-edit / outpainting. Extend this exact embroidered gate-and-terrace image to a 16:9 landscape website entrance, by adding the same textile scene to the sides. Preserve its linen weave, original stitch shapes, olive tree, lake, small cafe table and chairs at left, rose-covered stone arch at right and the modest CLOSED charcoal-grey embroidered gate with its two simple narrow cream piers in the foreground. Keep both gate leaves facing front, at the SAME native proportions as this picture, with the center latch seam and hinges structurally unchanged. Recompose the gate toward lower centre-right at about x65%, y77%; its width should be about26% of canvas and height about27% of canvas. The spaces inside bars remain pale cream thread. Keep the gate small and naturally human-scale, never giant or thick blue iron. Keep small exact 'J & R' brown chain-stitched monogram in quiet upper central/right linen, about x66%, y26%. Matte cotton loop stitching, clearly visible flax warp and weft everywhere, no polished architectural redesign, no smooth paint, no glossy 3D, no shadows that turn this into a sculpture. Keep the existing recognizable terrace and extend edges naturally without stretching. No other text, no border or watermark, sharp individual stitches.

