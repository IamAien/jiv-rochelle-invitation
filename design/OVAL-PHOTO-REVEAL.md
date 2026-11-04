# Oval photo reveal

The gallery now has one brush reveal, framed by the supplied floral oval. The photograph and linen brush canvas share a clipped elliptical opening beneath the transparent frame. Scratch coverage counts only visible oval cells; hidden corners cannot trigger completion. Reveal and Cover buttons remain available, and the five-photo draggable album is unchanged.

Four prepared petal layers drift diagonally across the oval opening, above the photo, placeholder lettering and brush veil and below the frame ribbon. They reuse the softened slender, rounded and curled WebP assets from the second image, with sizes reduced about 7%. A shared 52-second schedule releases staggered pairs at 1/3 seconds and 27/29 seconds; each flight lasts about 25 seconds and no more than two petals can be visible at once. Flutter, angles and wind paths vary. The layer ignores pointer events, so brushing and touch scrolling remain available. IntersectionObserver and document visibility pause it offscreen or in a hidden tab. Reduced motion and print hide the petals. No new artwork was generated for this change; see SOFTENED-HERO-PETALS.json for the reused asset paths and prompts.

The photo is currently a labeled placeholder because no actual photograph has been configured. Set the first REVEAL_PHOTOS entry in src/gallery.js to the desired photo in public/photos/.

## Assets and generation

- Original supplied image, preserved: [oval-photo-frame-source.png](../src/assets/oval-photo-frame-source.png)
- Transparent edit: [oval-photo-frame-transparent.png](../src/assets/oval-photo-frame-transparent.png)
- Runtime overlay: [oval-photo-frame.webp](../src/assets/oval-photo-frame.webp), 1054 × 1492, quality 96 with alpha.
- Mode: built-in imagegen edit with transparent background. The linen inside and outside the oval was removed while retaining the ribbon, blossoms and foliage. No CLI or alternate model was used.

Exact prompt:

> Use case: background-extraction. EDIT TARGET: the attached portrait embroidered oval floral picture frame. Make a transparent frame overlay for a real photograph. Remove ONLY the plain ivory LINEN BACKGROUND, both INSIDE the oval opening and OUTSIDE the frame, including plain linen visible between leaves. Those areas must become actual alpha=0 transparent. Preserve the supplied blue-and-ivory checked embroidered oval ribbon, all ivory flowers with gold centers, pink buds, green leaves, fine thread edges, their exact locations and the complete original 1054:1492 portrait composition. Keep the ribbon itself filled and opaque. Preserve every flower, leaf and bud without cropping. Do not redraw or redesign the frame, move or add flowers, change colors, fill the center with anything, add a photo, add text, distort the oval or change the embroidery material. The center MUST be a clear transparent oval opening; the outside MUST also be transparent, leaving ONLY the actual embroidered ribbon/flowers/leaves. No linen matte, cream rectangle, sky, fake checkerboard, shadow rectangle, white backdrop, watermark or border. Whole complete frame, with the same proportions and tiny transparent outer margin.

## Verification

38 behavior tests and the production build pass. The oval tests verify hidden corners do not count, visible coverage can complete, and resizing preserves coverage. Server-rendered markup contains exactly one framed reveal. Alpha inspection confirms a clear center and exterior. Desktop and phone still composites verify the frame opening. Browser automation is unavailable, so interactive visual QA remains unverified.
