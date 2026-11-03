# Muted color backgrounds and illustrated timeline

The page now uses smooth muted colors, without a page texture. Warm ivory (#f1e8dc) anchors the background and header. The countdown uses soft blush-beige (#eee4dc), the timeline pale sage (#e7e8dd), venues light stone (#eee6d8), the story dusty blush (#efe3df), dress inspiration warm greige (#ebe7dd), and the footer muted sage-stone (#e3e2d6). These are solid color surfaces with no background images or color gradients. The earlier linen background experiments are retained as source history.

The timeline uses the user's five supplied painted illustrations through [TimelineArtwork.jsx](../src/components/TimelineArtwork.jsx). The floral arch accompanies the ceremony, the couple accompanies time together, the cake accompanies reception, and the disco ball accompanies celebration. The moon and clouds close the timeline below the pearl's thread. The four event descriptions and scheduled times are preserved.

Original PNGs are preserved in `src/assets/timeline/`. The live page uses 640 × 640 WebPs, encoded at quality 94. CSS framing reduces the source images' blank margins and fits each illustration into its column without stretching it. A darken blend lets the supplied ivory backgrounds sit on the section's pale sage. A bottom margin reserves room for the moon without changing the measured thread or the pearl's travel.

The scrolling pearl is a direct child of the timeline, after the event list, on layer 3. It is 32px on desktop and 28px on phones, with a soft ivory highlight, warm outline and small shadow. Both the line and pearl share one responsive horizontal axis. Scroll and resize updates set its pixel position to the current progress multiplied by the thread height, avoiding percentage positioning inside a two-pixel-wide nested container.

The coastal envelope and villa artwork, countdown and live seconds, opening animation and text reveals work together with this palette. The timeline illustrations and pearl remain outside the text-reveal effect.
