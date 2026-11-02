# Cozy cottage, sharper cover, and scroll reveals

The current entrance and second-page art are documented in [Gates and ceremony](GATES-AND-CEREMONY.md). The scroll reveals and embroidered countdown/timeline details described below are retained; the cottage and page-flip opening are earlier iterations.

## Current experience

- The linen cover keeps its natural proportions using `object-fit: cover`; it no longer stretches to fit a different aspect ratio. The closed page remains flat, and 3D transforms activate only during the existing 8.8-second page turn.
- Re-rendered cover artwork has more defined thread and linen detail. Its J & R monogram remains embroidered into the image.
- The inside page reveals a small, cozy cottage with warm window light, an arched blue door, a steep tiled roof, a rose-covered porch, a bench, and a winding garden path.
- Text blocks fade in and rise gently as they enter the viewport, with a short stagger when several enter together. They stay visible when scrolling back. Reduced-motion visitors and browsers without IntersectionObserver retain immediately readable text.
- Timeline illustrations and countdown frames now use the same raised embroidery, dusty-blue ribbon, ivory linen, sage foliage, and apricot/cream flowers as the opening. The countdown digits remain live, and the timeline pearl still follows scrolling.

## Current assets

All six new assets were generated or edited with the **built-in Imagegen tool**, then encoded as high-quality WebP. Original PNGs are retained alongside them.

| Asset | Native pixels | Purpose |
| --- | --- | --- |
| [Portrait cover](../src/assets/cover-sharp-portrait.webp) | 940 × 1672 | Tall screens |
| [Landscape cover](../src/assets/cover-sharp-landscape.webp) | 1672 × 941 | Wide screens |
| [Portrait cottage](../src/assets/cozy-cottage-portrait.webp) | 1024 × 1536 | Inside-page artwork on tall screens |
| [Landscape cottage](../src/assets/cozy-cottage-landscape.webp) | 1672 × 941 | Inside-page artwork on wide screens |
| [Timeline illustrations](../src/assets/embroidered-timeline-sheet.webp) | 1254 × 1254 | A transparent 2 × 2 sheet: chapel, rings, coupe, mirror ball |
| [Countdown frame](../src/assets/embroidered-countdown-frame.webp) | 1254 × 1254 | Transparent embroidered circle with an ivory linen center |

The generator was asked for higher-resolution sources but returned the native dimensions above. The site does not claim these are 4K assets. Sharpness improvements come from the new rendering, high-quality encoding, preserved proportions, and deferring 3D rendering until animation. Very large or high-density displays can still exceed the native source resolution.

Wide sources are selected for viewports at least 900px wide or landscape orientation. The existing blue-ribbon floral garland and wedding details are retained. The cottage is decorative artwork; actual ceremony and reception venues remain in the details section.

## Scroll implementation and verification

`src/scrollReveal.js` observes text blocks after the book finishes opening. It uses one IntersectionObserver, reveals each block once, then stops observing that block. Cleanup restores default readability and rejects late observer callbacks when replaying the opening. CSS transitions last 1.2–1.35 seconds, with at most 240ms stagger. Focused controls, print output, and reduced-motion preferences remain readable.

The production build and **10 behavior tests** pass, including four tests for reduced motion, unsupported browsers, reveal-on-entry with reverse scrolling, and replay cleanup. Server rendering verifies the opening states, separate phone/desktop cottage artwork, three countdown frames, four embroidered timeline illustrations, and readable content before enhancement. Live browser visual verification is unavailable in this environment.

## Final prompts

### Sharper portrait cover

Input: `src/assets/embroidered-book-cover-portrait.png` — edit target.

Use case: precise-object-edit. Re-render this exact linen wedding book cover at HIGH NATIVE RESOLUTION, target 2160 x 3840 pixels, crisp tall 9:16 composition for a high-density phone display. Preserve its embroidered J & R monogram exactly, centered at 34% canvas height, its blue ribbon-tied ivory curtains, blue garden gate and cream/apricot flowers. Adapt the edges gently to the taller proportion, keeping the gate and ribbon motifs inside the frame. Fine tactile silk-thread embroidery and delicate needlepoint on warm ivory linen, sharply defined individual thread ridges, antique cream #e9dfcd, ivory #f4eee3, dusty slate-blue #8097a5, espresso brown, olive-sage #87917b, faded apricot/blush roses and tiny cream blossoms. Soft even natural light, matte handmade textiles, no camera depth-of-field blur, no haze, no smudging. Crucially restore precise sharp textile detail and crisp embroidered letter edges; do not merely enlarge a blurry image. No added text beyond the existing exact J & R, no new decorations, no border, no watermark. Entire cover in focus, edge to edge.

### Sharper landscape cover

Input: `src/assets/embroidered-book-cover-landscape.png` — edit target.

Use case: precise-object-edit. Re-render this exact linen wedding book cover at HIGH NATIVE RESOLUTION, target 3840 x 2160 pixels, crisp WIDE 16:9 composition for a high-density desktop display. Preserve the existing composition and exact embroidered J & R monogram centered at 36% canvas height, blue ribbon-tied ivory curtains, blue garden gate and cream/apricot flowers. Fine tactile silk-thread embroidery and delicate needlepoint on warm ivory linen, sharply defined individual thread ridges, antique cream #e9dfcd, ivory #f4eee3, dusty slate-blue #8097a5, espresso brown, olive-sage #87917b, faded apricot/blush roses and tiny cream blossoms. Soft even natural light, matte handmade textiles, no camera depth-of-field blur, no haze, no smudging. Crucially restore precise sharp textile detail and crisp embroidered letter edges; do not merely enlarge a blurry image. No added text beyond existing exact J & R, no new decorations, no border, no watermark. Entire cover in focus, edge to edge.

### Cozy portrait cottage

Input: `src/assets/embroidered-book-cover-portrait.png` — style reference.

Use case: illustration-story. Create a NEW cozy little cottage illustration for the inside of this wedding book. Use the input only as the strict reference for textile style, dusty blue ribbons and gate, ivory linen, and rose colors. Tall PORTRAIT 2:3 composition, high resolution target 2048 x 3072 pixels. Fine tactile silk-thread embroidery and delicate needlepoint on warm ivory linen, sharply defined individual thread ridges, antique cream #e9dfcd, ivory #f4eee3, dusty slate-blue #8097a5, espresso brown, olive-sage #87917b, faded apricot/blush roses and tiny cream blossoms. Soft even natural light, matte handmade textiles, no camera depth-of-field blur, no haze, no smudging. Subject: a charming SMALL, intimate ONE-AND-A-HALF-STORY countryside cottage with an asymmetrical steep warm clay-tile gabled roof, a little stone chimney, cream plaster and honey-colored stone, one small dormer, dusty-blue shutters and an arched dusty-blue wooden door, a tiny sheltered porch, and soft warm amber window light. Rose vines climb around the doorway. A welcoming curved stepping-stone path leads through a relaxed cottage garden with tiny cream/apricot flowers, sage herbs, an old wooden bench and low stone edging. Matching dusty-blue garden gate panels stand OPEN only at the bottom side edges. The cottage is substantial and clear in the lower 42% of the canvas. Keep the central 64% width from 18% to 53% height EMPTY calm ivory linen for live invitation text. Light ivory curtains tied with small dusty-blue ribbons frame far upper corners. Cozy, tender, homely and handmade. NOT a mansion, NOT a grand formal villa, NOT a symmetrical palace, no big fountain, no formal topiary courtyard. No words, no initials, no monogram, no watermark, no frame, no UI. Full bleed.

### Cozy landscape cottage

Input: `src/assets/cozy-cottage-portrait.png` — composition, architecture and style reference.

Use case: precise-object-edit. Create a WIDE LANDSCAPE 16:9 version of this exact cozy cottage illustration for the inside page of a linen wedding book. Preserve the SAME little asymmetrical one-and-a-half-story cottage: steep warm terracotta gable roof, right-side stone chimney, little left dormer, arched dusty-blue wooden door and blue shutters, warm amber window light, small timber porch, rose vines, wooden garden bench, curved stepping-stone path, tiny cream/apricot flowers, sage herbs and open blue iron gate panels at the sides. Preserve the exact sharply defined handmade silk embroidery, thread ridges, ivory linen, dusty-blue ribbon-tied curtains and restrained cream/blue/sage/apricot palette. Recompose for a wide screen without stretching anything. Put the cozy cottage and its garden in the LOWER 48% of the canvas, cottage centered and no wider than 48% of canvas width, with all roof/chimney details BELOW 48% canvas height. Keep a large EMPTY calm ivory linen area in the central 60% width from 14% to 45% height for live wedding text. Ivory curtains and small blue ribbons at far upper corners, small flower garden fills the entire bottom edge. Cozy, intimate, welcoming, high-detail tactile embroidered craft. No grand mansion, no palace, no formal courtyard fountain. NO text, NO initials, NO watermark, NO border, no UI. Full bleed high resolution artwork, target 3840x2160.

### Embroidered timeline illustrations

Input: `src/assets/embroidered-book-cover-portrait.png` — style reference.

Use case: illustration-story. Create an original square 2048 x 2048 TRANSPARENT sprite sheet for the wedding timeline, using the reference ONLY for its fine raised silk embroidery, matte linen craft style and muted palette. Fine tactile silk-thread embroidery and delicate needlepoint on warm ivory linen, sharply defined individual thread ridges, antique cream #e9dfcd, ivory #f4eee3, dusty slate-blue #8097a5, espresso brown, olive-sage #87917b, faded apricot/blush roses and tiny cream blossoms. Soft even natural light, matte handmade textiles, no camera depth-of-field blur, no haze, no smudging. Four separate, evenly sized embroidered illustrations, one centered in each EXACT equal square quadrant of a 2 by 2 grid, with generous transparent padding inside each quadrant and NO overlap between quadrants. TOP LEFT: a small cream stone wedding chapel with a dusty-blue gabled roof, blue arched door, little cross and two sage leafy sprigs. TOP RIGHT: two intertwined antique champagne-gold wedding rings, a small dusty-blue ribbon and delicate apricot/cream blossom sprigs. BOTTOM LEFT: an elegant champagne coupe with pale warm golden liquid and a small sage leaf/cream flower sprig at its base. BOTTOM RIGHT: a delicate ivory and dusty-blue embroidered mirror ball with subtle champagne thread sparkles and a tiny ribbon at the top, suggesting wedding dancing. Each icon must be a tactile stitched textile illustration with very fine clear thread detail like the cover flowers, not a flat vector icon. All four should have equal optical scale and fit entirely inside their own quadrant, occupying about 70% of each quadrant. TRUE transparent background around each object, NO linen rectangles, NO background squares, NO borders, NO labels, NO numbers, NO words.

### Embroidered countdown frame

Input: `src/assets/embroidered-book-cover-portrait.png` — style reference.

Use case: illustration-story. Create a single exquisite embroidered circular medallion frame for a wedding countdown, square 1536 x 1536 composition. Use the reference ONLY for its fine handmade silk embroidery, linen texture, blue ribbon and cream/apricot rose palette. Fine tactile silk-thread embroidery and delicate needlepoint on warm ivory linen, sharply defined individual thread ridges, antique cream #e9dfcd, ivory #f4eee3, dusty slate-blue #8097a5, espresso brown, olive-sage #87917b, faded apricot/blush roses and tiny cream blossoms. Soft even natural light, matte handmade textiles, no camera depth-of-field blur, no haze, no smudging. The round frame has a fine double ring of dusty-blue embroidered cord, delicate sage leaves and tiny cream/apricot rosebuds along the lower left and lower right edges, and one very small dusty-blue silk bow at the top. Its entire central 65% diameter is EMPTY smooth warm ivory linen for live countdown digits added later. It is airy, quiet and refined, subtly raised textile embroidery, not a plastic or metallic object. Keep the complete medallion fully inside the canvas with transparent padding around the outer ring. TRUE transparent background OUTSIDE the circular frame; ivory linen INSIDE the circle. NO pearls, NO ornate gold rococo, NO numbers, NO text, NO letters, NO watermark, NO square background.
