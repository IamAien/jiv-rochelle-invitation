# Hearts along the story

The four circular green chapter markers are replaced with decorative SVG hearts. The current chapter uses dusty rose, a soft glow and one gentle 1.7-second heartbeat. Two tiny hearts drift upward and disappear as the chapter becomes current. Already-read markers become soft sage and the stitched thread takes a muted rose tone.

The passage nearest the reading line at 55% of the viewport receives a warm ivory highlight and full-opacity text. Other chapters are muted to 48% opacity. Focus follows scrolling in either direction using actual chapter centers, including variable passage heights, and clears when the passages leave the viewport. The current list item uses aria-current="step". Repeated measurements do not restart animations while the chapter remains current.

The existing scroll-frame hook provides scroll/resize measurement and listener cleanup. Reduced motion retains the static heart and opacity focus cue while removing movement, transitions and the decorative glow. Printing restores full opacity for all text. Without the enhancement, every chapter remains fully readable. Original story wording is unchanged. No raster images or generated artwork were needed.

42 behavior tests and the production build pass. The story regression covers forward/backward reading, offscreen clearing and an empty list. Server-rendered checks confirm four markers and their SVG hearts. Live browser animation review remains unavailable because the native browser connection is unavailable.
