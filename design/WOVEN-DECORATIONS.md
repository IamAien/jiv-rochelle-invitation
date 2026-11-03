# Woven decoration set

The current background tints, simplified timeline symbols and scrolling pearl are described in [Soft linen and timeline](SOFT-LINEN-AND-TIMELINE.md). The earlier bitmap timeline illustrations below are retained as source history; the garlands, countdown patches and linen tile remain active.

The invitation decorations now follow the two supplied desktop scenes: fine cotton embroidery on visible ivory linen, faded olive leaves, dusty rose, oatmeal thread and small lavender accents. The countdown uses plain round linen patches with running-stitch borders and small botanical sprigs. Garlands, timeline motifs, fabric backgrounds, dividers, swatches and the moving timeline marker share that treatment.

Both desktop scene JPEGs, the retained phone artwork, opening sequence, wedding information, four-part live countdown and scroll behavior are preserved.

## Method and references

Generated with the **built-in image_gen tool**, using these local images as material, palette and thread-scale references:

- [Desktop entrance](../src/assets/desktop-entrance-supplied.jpg)
- [Desktop ceremony](../src/assets/desktop-ceremony-supplied.jpg)

No CLI image API was used. All generated originals are preserved as PNGs in the project. Garlands, countdown patches and timeline motifs have real alpha transparency. PNG/WebP composites were inspected on the website's ivory background to check the edges; transparent-pixel RGB colors do not appear when composited. Production WebPs use quality 96 without resizing, except the background tile, encoded at 640 × 640, quality 94, to reduce page weight.

## Saved artwork

| Asset | Production file | Original PNG | Native PNG size | Production size |
| --- | --- | --- | --- | --- |
| Floral garland | [WebP](../src/assets/woven-garden-garland.webp) | [PNG](../src/assets/woven-garden-garland.png) | 2172 × 724 | 2172 × 724 |
| Countdown linen patch | [WebP](../src/assets/woven-countdown-frame.webp) | [PNG](../src/assets/woven-countdown-frame.png) | 1254 × 1254 | 1254 × 1254 |
| Four timeline motifs | [WebP](../src/assets/woven-timeline-sheet.webp) | [PNG](../src/assets/woven-timeline-sheet.png) | 1254 × 1254 | 1254 × 1254 |
| Plain linen tile | [WebP](../src/assets/woven-linen.webp) | [PNG](../src/assets/woven-linen.png) | 1254 × 1254 | 640 × 640 |

The timeline sheet places the chapel, rings, coupe and celebration ornament in top-left, top-right, bottom-left and bottom-right quadrants. Its four quadrants are prepared as individual 627 × 627 production images: [chapel](../src/assets/woven-timeline-chapel.webp), [rings](../src/assets/woven-timeline-rings.webp), [coupe](../src/assets/woven-timeline-coupe.webp), and [celebration](../src/assets/woven-timeline-celebration.webp). The timeline renders these as normal image elements with intrinsic dimensions, outside the scroll-reveal effect; the original sheet remains source artwork. Live countdown numbers remain HTML text, including seconds. Section textures use a low-opacity layer so text remains readable. Dress-code colors remain colored fabric swatches with a linen overlay. The timeline marker is a small matte stitched button following the existing scroll calculation.

## Final prompts

### garland

Transparent background: yes.

Use case: illustration-story. Asset for an existing wedding invitation website. BOTH input images are STYLE, MATERIAL, THREAD-SCALE and PALETTE REFERENCES ONLY, not edit targets. Match their fine antique hand-embroidered textile: tiny irregular matte cotton stitches, clearly visible individual thread strands, flat shallow relief, softly woven warm ivory/flax linen, faded sage/grey olive, dusty old rose, muted lavender and oatmeal/taupe. Fine stem stitch and long-and-short satin stitch for leaves, small French knots and thread rosettes for flowers. Every flower and leaf must visibly be sewn thread, never a smooth realistic plant or sculpted clay. Natural hand-worked asymmetry, quiet small details, soft even diffuse light. Keep contrast restrained and colors faded to match the references. No gloss, gold metal, pearls, beads, plastic, thick rope yarn, puffy 3D shapes, dramatic shadows, painted gradients, digital watercolor, oversharpening, or ornate blue bows. No letters, numerals, monogram, watermark or mockup.
Primary request: a single delicate horizontal floral embroidery garland for the top of the countdown and dress-code sections and footer. Wide 3:1 composition. An airy gently curved vine of small olive leaves, sparse tiny dusty rose rosettes, ivory French-knot blossoms and just a few lavender sprigs, inspired directly by the plants stitched in the references. Quiet balanced arrangement; left and right ends taper naturally, slight handmade variation, modest central rosette cluster. Keep the flowers small; cotton thread texture readable. Subject fills the wide canvas with 7% safe margin, no chopped stems. Truly transparent background and clean natural alpha edges; no fabric rectangle or fabric patches around the garland, no color fringe, no white matte. Only the isolated stitched threadwork on transparency.

### frame

Transparent background: yes.

Use case: illustration-story. Asset for an existing wedding invitation website. BOTH input images are STYLE, MATERIAL, THREAD-SCALE and PALETTE REFERENCES ONLY, not edit targets. Match their fine antique hand-embroidered textile: tiny irregular matte cotton stitches, clearly visible individual thread strands, flat shallow relief, softly woven warm ivory/flax linen, faded sage/grey olive, dusty old rose, muted lavender and oatmeal/taupe. Fine stem stitch and long-and-short satin stitch for leaves, small French knots and thread rosettes for flowers. Every flower and leaf must visibly be sewn thread, never a smooth realistic plant or sculpted clay. Natural hand-worked asymmetry, quiet small details, soft even diffuse light. Keep contrast restrained and colors faded to match the references. No gloss, gold metal, pearls, beads, plastic, thick rope yarn, puffy 3D shapes, dramatic shadows, painted gradients, digital watercolor, oversharpening, or ornate blue bows. No letters, numerals, monogram, watermark or mockup.
Primary request: ONE simple circular countdown frame, a flat hand-embroidered wreath on a round warm ivory linen medallion, viewed straight-on. Square canvas. The round patch fills 90% of the canvas, centered. A thin double row of oatmeal/taupe running stitches outlines the circle. Small faded olive leaves and a few tiny dusty blush French-knot flowers grow along just the lower left and lower right quarters, like the reference garden's delicate sewn foliage. No bow, no hanging ornament, no gold ring. The large central 68% diameter is completely empty smooth finely woven ivory linen for live numbers to be added in code. Let the fine weave and the subtle frayed linen edge be visible, with no deep shadows or padded edges. Actual alpha transparency OUTSIDE the circular linen patch; opaque finely woven ivory fabric INSIDE the patch. Clean soft fiber edges, no color fringes.

### timeline

Transparent background: yes.

Use case: illustration-story. Asset for an existing wedding invitation website. BOTH input images are STYLE, MATERIAL, THREAD-SCALE and PALETTE REFERENCES ONLY, not edit targets. Match their fine antique hand-embroidered textile: tiny irregular matte cotton stitches, clearly visible individual thread strands, flat shallow relief, softly woven warm ivory/flax linen, faded sage/grey olive, dusty old rose, muted lavender and oatmeal/taupe. Fine stem stitch and long-and-short satin stitch for leaves, small French knots and thread rosettes for flowers. Every flower and leaf must visibly be sewn thread, never a smooth realistic plant or sculpted clay. Natural hand-worked asymmetry, quiet small details, soft even diffuse light. Keep contrast restrained and colors faded to match the references. No gloss, gold metal, pearls, beads, plastic, thick rope yarn, puffy 3D shapes, dramatic shadows, painted gradients, digital watercolor, oversharpening, or ornate blue bows. No letters, numerals, monogram, watermark or mockup.
Primary request: a square 2 by 2 sprite sheet of FOUR SMALL isolated wedding embroidery motifs, each centered in its own equal square quadrant with at least 12% safety padding inside that quadrant; nothing crosses the horizontal or vertical midpoint. Upper left: a modest little ivory stone chapel, simple sage-grey roof, tiny arched doorway and one slender stitched cypress, inspired by the reference architecture. Upper right: two intertwined wedding rings made of soft oatmeal thread outlines with a very small faded rose-and-leaf sprig, not metallic. Lower left: one delicate champagne coupe outlined in taupe and ivory stitches with a tiny olive sprig at its foot, no realistic reflective glass. Lower right: a small round celebratory lantern/disco-ball ornament sewn in a flat cross-stitch lattice in pale oatmeal and faded lavender, with just two tiny stitched stars. All FOUR motifs have the SAME size, material and quiet density. They should look like modest tiny embroideries from the same handmade linen sampler as the reference scenes, not jewelry or plush toys. Keep shapes legible at 80 pixels. Completely transparent outside the four thread motifs; no cloth squares, no backgrounds, no quadrant dividers. Clean fiber alpha edges, no colored fringe.

### linen

Transparent background: no.

Use case: stylized-concept. Both input images are MATERIAL AND COLOR REFERENCES. Generate ONLY a seamless repeatable square texture tile of the exact quiet warm ivory flax LINEN visible in the blank sky area of these references. Fine plain weave with tiny irregular horizontal weft and vertical warp cotton fibers, a few naturally varied cream/oatmeal strands. Straight-on flat macro textile scan, uniform scale, uniform diffuse lighting, no perspective. Low contrast, matte, slightly aged wedding linen. Fine weave, not chunky burlap. Seamlessly tileable at all four edges with NO border, vignette, seam, fold, stain, embroidery, plants, objects, letters, grainy noise overlay or directional shadow. Overall color very pale warm ivory close to #f5f0e6 with subtle oatmeal fibers; never peach or yellow. This is a background texture tile only.

## Verification

Native assets and ivory-background composites were visually inspected. The production build and all 14 existing behavior tests pass. Server-rendered integration checks confirm four live counters including seconds, all three garland instances, four timeline motifs, and the woven texture. Both supplied scene JPEGs retain their original SHA-256 hashes. The local preview and all four production WebPs return HTTP 200. Live browser review is unavailable because the computer-use connection has no accessible browser.
