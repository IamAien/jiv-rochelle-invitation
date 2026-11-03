# Warm golden rose-garden phone invitation

The phone portrait second page uses the supplied `暖金夕陽下的玫瑰拱門花園.png`. Its untouched source is retained as `src/assets/warm-rose-garden-portrait.png`. The active WebP is 941 × 1672 at quality 92, about 452 KB versus the 2.94 MB original PNG.

The portrait text is styled for the warm peach linen and golden embroidery. Cormorant Garamond remains the main typeface, with medium-weight names in antique gold, warm brown supporting text, and restrained raised-thread shadows. Jiv and Rochelle sit on one line with the user's selected Baskerville ampersand. The date and Cebu location remain beneath them, and the original wording is retained.

The text begins 6.6% down the artwork container and fits above the first embroidered clouds. Responsive name sizes range from 34 to 46 pixels, with balanced spacing and a compact ampersand. The lower discovery link uses a translucent warm ivory fill. These styling rules apply only to portrait layouts below 900 pixels; desktop and landscape keep their existing artwork and type treatment.

The gate reveal uses a separate sun-free variant of this portrait so it does not show a second sun next to the opening scene's sun. The full second page retains the original sunset image. Both variants have the same 941 × 1672 dimensions and fountain focus (465, 1210). The fountain stays at the second page's normal scale, remains fixed behind the gate, fades together with the opening image, and only then gives way to the second-page fade-in. See `SUN-FREE-GATE-REVEAL.md` for the edited asset and prompt.

Browser verification covers 320 × 568, 375 × 667, 390 × 844, 430 × 932, and 1440 × 900. It checks the selected image, single-line names, no text overflow, placement in the upper clear linen, visible fountain pixels, constant scale, and the shared fade sequence. The desktop retains its previous image and colors. The 29 behavior tests, production build, and server-rendered checks also pass.
