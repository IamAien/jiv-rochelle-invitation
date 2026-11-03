# Muted color backgrounds and simple timeline

The page now uses smooth muted colors, without a page texture. Warm ivory (#f1e8dc) anchors the background and header. The countdown uses soft blush-beige (#eee4dc), the timeline pale sage (#e7e8dd), venues light stone (#eee6d8), the story dusty blush (#efe3df), dress inspiration warm greige (#ebe7dd), and the footer muted sage-stone (#e3e2d6). These are solid color surfaces with no background images or color gradients. The earlier linen background experiments are retained as source history.

The timeline has four small code-native symbols in [StitchedTimelineIcon.jsx](../src/components/StitchedTimelineIcon.jsx): chapel outline, two rings, coupe, and celebration star. A faint continuous thread base and fine dashed top stitch give the simple shapes a sewn-line treatment. The previous detailed bitmap illustrations remain source history; they are no longer loaded by the page. No new raster image generation was needed for this change.

The scrolling pearl is a direct child of the timeline, after the event list, on layer 3. It is 32px on desktop and 28px on phones, with a soft ivory highlight, warm outline and small shadow. Both the line and pearl share one responsive horizontal axis. Scroll and resize updates set its pixel position to the current progress multiplied by the thread height, avoiding percentage positioning inside a two-pixel-wide nested container.

The coastal envelope and villa artwork, countdown and live seconds, opening animation and text reveals work together with this palette. The timeline symbols and pearl remain outside the text-reveal effect.
