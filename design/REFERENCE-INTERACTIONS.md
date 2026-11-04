# Reference interactions adapted to the linen invitation

The supplied `jiv-rochelle-wedding3/src/App.jsx` and `App.css` were used as interaction references. The invitation uses the coastal envelope opening and villa artwork, with its selected typefaces, muted palette, countdown frames, timeline pearl, and wedding details.

- The reference's scroll progress becomes a thin running-stitch line beneath the existing header. Navigation underlines the section being read. Desktop navigation also links to the story and attire; phones retain the three original links.
- The reference's word-by-word story becomes four naturally scrolling chapters. A heart marker and warm paper glow follow the current paragraph in either direction, dimming the other passages. The active heart beats gently and releases two tiny floating hearts; see STORY-HEARTS.md. Every paragraph stays readable, with no pinned screen or additional scroll distance.
- The reference's page-filling color effect becomes ten real swatch buttons. Choosing one changes a little linen sample, marks the selected swatch, and offers its color code for copying. Reset restores the neutral sample. A failed clipboard write shows the code for manual copying.
- Each venue offers directions and its own calendar file. The welcome section still downloads both events together. Calendar times remain 1 PM and 5 PM in Cebu on February 7, 2027.
- Venue hover and keyboard focus receive a quiet ivory background. Swatches lift slightly on devices with a precise pointer. Reduced-motion settings remove decorative movement while keeping the static story focus cue.

Cursor trails, click sparkles, confetti, sound, press-and-hold entry, and full-page color floods were left out. The site has no RSVP destination configured, so the reference RSVP form was not introduced.

The gallery was subsequently added at the user's request. Three brush-to-reveal cards and a five-photo Polaroid stack follow the story. They use ivory paper, woven linen, muted sage/blue/blush, small stitch details, and gentle rotations. Each reveal card has keyboard-accessible reveal/cover controls; the album has previous/next controls, a photo counter, and an accessible live caption. Horizontal drags change the top photo, while vertical touch scrolling stays available. Short or canceled gestures snap back, repeated brushing of one area cannot complete a reveal, and resizing preserves the erased area. Reduced-motion settings shorten the transitions; printed pages show the photos directly.

Both the supplied reference and the working project lacked personal photos. `src/gallery.js` contains editable photo slots and captions. `public/photos/README.txt` explains adding image files. Empty or failed images use clearly labeled linen placeholders. Relative image paths automatically include the existing GitHub Pages base path.

Implementation lives in `src/components/WeddingNavigation.jsx`, `WeddingStory.jsx`, `GuestPalette.jsx`, `WeddingVenues.jsx`, `WeddingGallery.jsx`, `src/useScrollFrame.js`, `src/gallery.js`, and `src/calendar.js`, with styles in `src/App.css` and `src/components/WeddingGallery.css`.

Validation: behavior tests, production build, and server-rendered markup checks. Live visual and pointer/touch verification could not run because the browser/native connection was unavailable.
