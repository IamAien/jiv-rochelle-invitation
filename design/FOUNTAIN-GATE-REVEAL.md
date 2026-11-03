# Fountain centered through the opening gate

The gate is offset from the center of the screen, so the normal second-page image showed a side of the garden through it. During opening, a temporary view of that same ceremony image now places its fountain behind the gate.

`src/ceremonyArtwork.js` defines the shared artwork and its native fountain coordinates: the supplied warm rose-garden portrait (465, 1210) in 941 × 1672, landscape (835, 718) in 1672 × 941, and desktop (835, 642) in 1672 × 941. Portrait and desktop reveals use matching sun-free variants, while their full invitations use the supplied sunset originals. See `design/WARM-DESKTOP-GARDENS.md` for the current desktop artwork.

`src/fountainReveal.js` measures the gate against the actual artboard and viewport. The fountain aligns with the gate's center seam and the opening's focal point, 60% down its bounds. Following the user's feedback, its scale is exactly the same as the second page's normal image scale throughout. No extra fountain zoom is applied.

`src/components/FountainReveal.jsx` mounts only while the gate opens. Its image is clipped to the same gate outline, mapped to viewport coordinates. The clip follows the entrance's existing movement, while the fountain image itself stays fixed at normal scale throughout. It does not pan back toward the second page.

The entrance artboard and fountain are inside one `entrance-visuals` group. After the gate has opened, this entire group fades out from 88% through 100% of the 8.8-second entrance. The fountain and first image therefore disappear together at exactly the same opacity. The actual invitation remains hidden, with its layout measurable, until the opening finishes. It then fades in over 1.1 seconds. Resizing updates the alignment; reduced-motion visitors retain the short, direct transition.

The reported pillar-only view was reproduced in Chrome. The fountain's position was correct, but its clipping resource used a group inside the clip path, which hid the aligned image. The resource now uses a direct path with combined viewport matrices for each gate-animation scale. The image and its clipping geometry have independent transforms, so the fountain stays at normal size.

The gallery, first-page typography, smaller Baskerville ampersands, entrance image, and gate animation remain as previously selected.

Validation: all 29 behavior tests, production build, and server-rendered state checks pass. Headless Chrome was used at 375 × 667, 390 × 844, 430 × 932, and 1440 × 900. Pixel comparisons confirm the fountain is visible, and recreating the former invalid clip fails the check. Browser checks also verify that the fountain stays fixed, both opening images share one fading parent, the actual invitation remains hidden through the completed fade, and only then becomes visible. Diagnostic screenshots and the regression helper are retained in `.tmp/`.
