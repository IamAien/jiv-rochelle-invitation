const MOTIFS = {
  chapel: [
    'M48 16v12m-5-7h10',
    'M23 47 48 28 73 47M29 43v35h38V43',
    'M42 78V61a6 6 0 0 1 12 0v17',
    'M44 46v-3a4 4 0 0 1 8 0v3z',
  ],
  rings: [
    'M53 44a17 17 0 1 1-34 0 17 17 0 1 1 34 0Z',
    'M77 53a17 17 0 1 1-34 0 17 17 0 1 1 34 0Z',
  ],
  glass: [
    'M27 30h42c0 15-9 23-21 23S27 45 27 30Z',
    'M48 53v22M35 76h26',
    'M30 37h36',
  ],
  sparkle: [
    'M44 24c-2 15-6 19-21 21 15 2 19 6 21 21 2-15 6-19 21-21-15-2-19-6-21-21Z',
    'M71 20v10m-5-5h10',
  ],
}

export default function StitchedTimelineIcon({ kind }) {
  const paths = MOTIFS[kind] ?? MOTIFS.sparkle
  return <svg className="event-icon" viewBox="0 0 96 96" width="96" height="96" fill="none" aria-hidden="true" focusable="false">
    <g className="icon-thread-base" strokeLinecap="round" strokeLinejoin="round">
      {paths.map((d, index) => <path d={d} key={index} />)}
    </g>
    <g className="icon-thread-stitches" strokeLinecap="round" strokeLinejoin="round">
      {paths.map((d, index) => <path d={d} key={index} />)}
    </g>
  </svg>
}
