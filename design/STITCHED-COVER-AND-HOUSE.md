# Embroidered cover and house reveal

The current site uses the [cozy cottage and scroll reveals](COZY-COTTAGE-AND-REVEALS.md) iteration. The formal house and cover assets below are retained as earlier source material.

The book cover has **J & R embroidered into its artwork**, with visible espresso-brown thread stitches and small stitch shadows on ivory linen. The separate HTML monogram and its text-shadow styling were removed. The button retains an accessible name identifying Jiv and Rochelle’s invitation; the only additional visible cover text is the small Open cue.

The existing **8.8-second page turn** reveals a separate illustration of a cream country house with dusty-blue shutters, a fountain, roses, and open garden gates. The cover and house use the same ivory linen, blue ribbon, fine silk embroidery, sage foliage, and cream/apricot flowers. Phone and desktop use separate compositions. Invitation text remains live HTML and is positioned above the house.

## Final assets

Generated and edited with the **built-in Imagegen tool**, then encoded as WebP. Original PNGs are retained alongside the production assets.

- [Embroidered portrait cover](../src/assets/embroidered-book-cover-portrait.webp)
- [Embroidered landscape cover](../src/assets/embroidered-book-cover-landscape.webp)
- [Portrait house reveal](../src/assets/garden-house-portrait.webp)
- [Landscape house reveal](../src/assets/garden-house-landscape.webp)

The blue-ribbon garland, wedding information, countdown, moving timeline pearl, full-width layout, skip control, and reduced-motion behavior are retained. The house is decorative invitation artwork; the ceremony and reception venues remain in the details section.

## Final prompts

### Embroidered portrait cover

Inputs: `src/assets/book-cover-portrait.png` — edit target.

Use case: precise-object-edit. Edit this exact wedding linen cover image. Preserve its portrait dimensions, composition, blue ribbon curtains, blue garden gate, flowers, ivory linen texture, and colors unchanged. Make ONLY one addition: a refined serif monogram reading EXACTLY "J & R", with uppercase J and R and a smaller elegant ampersand between them, centered at 50% canvas width and 34% canvas height. The whole monogram should occupy about 36% of canvas width and 10% of canvas height. Critically, the letters must look PHYSICALLY EMBROIDERED DIRECTLY INTO THIS LINEN BOOK COVER, in matte warm espresso-brown silk floss. Visible fine closely packed directional satin stitches, individual thread ridges, tiny thread fibers, and a delicate realistic stitch-edge shadow with linen grain visible around the embroidery. It should belong to the fabric exactly like the existing floral embroidery. Flat textile embroidery, subtly raised, NOT printed lettering, NOT a text overlay, NOT shiny foil, NOT an applique patch, NOT an ornate plaque. Spell exactly J & R. No other letters, no date, no extra decorations or changes.

### Embroidered landscape cover

Inputs: `src/assets/book-cover-landscape.png` — edit target.

Use case: precise-object-edit. Edit this exact wedding linen cover image. Preserve its landscape dimensions, composition, blue ribbon curtains, blue garden gate, flowers, ivory linen texture, and colors unchanged. Make ONLY one addition: a refined serif monogram reading EXACTLY "J & R", with uppercase J and R and a smaller elegant ampersand between them, centered at 50% canvas width and 36% canvas height. The whole monogram should occupy about 22% of canvas width and 15% of canvas height. Critically, the letters must look PHYSICALLY EMBROIDERED DIRECTLY INTO THIS LINEN BOOK COVER, in matte warm espresso-brown silk floss. Visible fine closely packed directional satin stitches, individual thread ridges, tiny thread fibers, and a delicate realistic stitch-edge shadow with linen grain visible around the embroidery. It should belong to the fabric exactly like the existing floral embroidery. Flat textile embroidery, subtly raised, NOT printed lettering, NOT a text overlay, NOT shiny foil, NOT an applique patch, NOT an ornate plaque. Spell exactly J & R. No other letters, no date, no extra decorations or changes.

### Portrait house reveal

Inputs: `src/assets/book-cover-portrait.png` — style reference; `src/assets/invitation-villa.png` — house and fountain subject reference.

Use case: illustration-story. Create a new PORTRAIT 2:3 inside-page wedding illustration revealed after opening a linen book cover. Image 1 is the STRICT reference for textile style, warm ivory palette, dusty blue ribbons and ironwork, sage leaves, and apricot/cream roses. Image 2 is only a supporting reference for the beautiful cream stone house and garden-fountain subject. Match Image 1's fine raised silk embroidery and ivory flax linen, NOT the purple/gold palette of Image 2. The hero subject is a beautiful, elegant symmetrical TWO-STORY FRENCH COUNTRY HOUSE: cream limestone, five window bays, pale dusty-blue shutters, central arched entrance and small balcony, a softly weathered sandy terracotta roof. The house stands in an intimate manicured rose garden, with a small pale aqua stone fountain in front and a welcoming path. The house should be clear and substantial, centered in the LOWER 44% of the portrait canvas. Tiny matching dusty-blue garden gate panels may stand OPEN at the far bottom side edges, so we are looking into the garden beyond the cover gate. Antique cream curtains tied with muted dusty blue ribbon frame only the far upper corners and side edges. Preserve a large CLEAN EMPTY warm ivory linen area in the central 64% width from 21% to 54% height for live wedding names added later. Fine tactile embroidered details throughout, soft natural light, restrained matte cream/espresso/dusty blue/olive-sage/faded apricot palette. No text, no letters, no monogram, no watermarks, no phone, no border, no UI. No purple wisteria, no pearl swags, no ornate gold frame. Full bleed artwork.

### Landscape house reveal

Inputs: `src/assets/garden-house-portrait.png` — edit target and architecture/style reference.

Use case: precise-object-edit. Adapt this exact portrait embroidered wedding house illustration into a WIDE LANDSCAPE 16:9 inside-page illustration. Preserve the SAME house architecture, cream limestone, central arched dusty-blue door, balcony, five window bays, dusty-blue shutters, sandy terracotta roof, garden fountain, open blue garden gate panels, cream/apricot roses, sage trees, ivory curtains and dusty-blue ribbon, and exact fine silk-thread embroidery and ivory flax linen style. Recompose for a wide screen, do not stretch the original. The beautiful house is the prominent focal point, centered in the LOWER 47% of the wide canvas and about 52% of canvas width. Place the highest roof/chimney details no higher than 52% canvas height, with the flower garden, fountain and welcoming path below, filling the entire bottom edge. The dusty-blue gate leaves are OPEN only at the far bottom left and right edges. The draped ivory curtains and blue ribbon frame the far left and right edges, leaving a large CLEAN EMPTY warm ivory linen area in the central 58% width from 20% to 49% height for wedding names added by the website. Delicate textured embroidery, warm soft natural light, quiet restrained cream/espresso/dusty-blue/olive-sage/faded apricot palette. Do not add any monograms, text, lettering, watermarks, borders, UI, or a phone. No purple or gold ornaments. Full bleed wide artwork.
