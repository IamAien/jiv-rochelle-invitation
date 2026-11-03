# Sunset stone-gate phone opening

The phone portrait entrance uses the supplied `柔霧刺繡夕陽石門庭園.png` from the user's weddingAsset folder. The untouched original is retained as `src/assets/sunset-stone-garden-portrait.png`. The website uses the 941 × 1672 WebP version, encoded at quality 92 (about 692 KB versus the 3.85 MB source PNG).

J and R are ordinary HTML text over the existing image. They sit in the clear upper-right linen area at 71% from the left and 18% from the top of the artwork. The letters use the site's Cormorant Garamond typeface, a warm brown color, and restrained thread-like shadows. The ampersand reuses the user's selected option 05 Baskerville outline and smaller proportions. No text was added to the image itself. The tap hint sits beneath the monogram at 71% / 22.3%.

The animated gate is cropped from the new source pixels: x 522, y 728, width 305, height 426, seam x 670. The left leaf is 148 pixels wide and the right leaf 157. The portal mask follows the gate's curled outline and central finial. The thread extraction threshold is adjusted for the warm brown gate. Both leaves retain their original pixel scale and hinge positions, and their backing dissolves during the opening.

The existing 8.8-second opening, reduced-motion behavior, artwork load/error handling, tap interaction, and invitation focus handoff remain in use. Desktop and phone landscape keep their previously selected artwork. The supplied image is used for the portrait layout it was designed for.

Validation includes the geometry/countdown/gallery/calendar tests, production build, unchanged source PNG hash, and server-rendered checks for the phone image, live monogram, leaf crops, opening mask, completed opening, and retained responsive artwork. Live browser visual verification is unavailable because the browser/native connection is not available.
