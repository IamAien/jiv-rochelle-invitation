import { useEffect, useState } from 'react'
import './App.css'

/* ================================================================== */
/*  ✏️ EDIT YOUR DETAILS HERE                                          */
/* ================================================================== */
const INVITE = {
  lead: 'Together with their families',
  nameA: 'Jiv Stevens T. Gonzales',
  and: 'and',
  nameB: 'Rochelle Ann P. Reyes',
  line: 'invite you to celebrate their marriage.',
  date: 'Sunday, 07 February 2027',
}
const SHORT = { a: 'Jiv', b: 'Rochelle', date: 'February 7, 2027' }

const WELCOME = {
  title: 'Welcome to Our Wedding',
  blurb: 'We are so happy to celebrate this day with you.',
}

const STORY = {
  title: 'Our Story',
  paragraphs: [
    'We met in law school, then went on with our separate lives\u2014until the last day of the Bar exams brought us together again.',
    'Our exam rooms were right beside each other, and we crossed paths afterward. Choosing to leave the questions behind, we walked out of the school together.',
    'What followed were texts, conversations, and a connection neither of us had planned.',
    'Somewhere between those everyday exchanges, we fell in love.',
    'Now, that unexpected walk has led us here\u2014to the beginning of a lifetime together.',
  ],
}

const EVENTS = [
  { time: '1:00 PM', name: 'The Ceremony', venue: 'The Archdiocesan Shrine of the Most Sacred Heart of Jesus' },
  { time: '5:00 PM', name: 'The Reception', venue: 'Marco Polo Plaza Cebu' },
]

const DAY = { title: 'Our Wedding Day', date: 'Sunday, 07 February 2027' }
const DETAILS = { title: 'Ceremony & Reception', sub: 'Where we celebrate' }
const DRESS = {
  title: 'Dress Code',
  code: 'Formal Attire',
  blurb: 'We invite you to dress for a day of love and celebration.',
}

const PALETTE = {
  title: 'Guest Color Palette',
  sub: 'Shades of Blue & Pink',
  groups: [
    {
      name: 'Shades of Blue',
      colors: [
        ['Misty Blue', '#bccddb'],
        ['Powder Blue', '#a9c3dd'],
        ['French Blue', '#7399c9'],
        ['Cloud Blue', '#d9e5f0'],
        ['Slate Blue', '#6c7ea3'],
      ],
    },
    {
      name: 'Shades of Pink',
      colors: [
        ['Blush Pink', '#f2d1cc'],
        ['Dusty Pink', '#d3a3a3'],
        ['Rose Pink', '#e59fb0'],
        ['Peach Pink', '#f5c2a6'],
        ['Soft Pink', '#f8dde1'],
      ],
    },
  ],
}

const CLOSING = { mono: ['J', 'R'], date: 'February 7, 2027' }

// Timing (ms). Keep in sync with the delays in App.css.
const OPEN_TO_REVEAL = 2800 // bow unties + flap + card rise, then a beat
const REVEAL_TO_DONE = 2400 // envelope drops, card zooms, intro fades out

/* ================================================================== */
/*  Embroidery toolkit                                                 */
/* ================================================================== */
const rand = (n) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}
const bez = (p, t) => {
  const u = 1 - t
  return [0, 1].map((k) => u * u * u * p[0][k] + 3 * u * u * t * p[1][k] + 3 * u * t * t * p[2][k] + t * t * t * p[3][k])
}
const ang = (p, t) => {
  const u = 1 - t
  const d = [0, 1].map((k) => 3 * u * u * (p[1][k] - p[0][k]) + 6 * u * t * (p[2][k] - p[1][k]) + 3 * t * t * (p[3][k] - p[2][k]))
  return (Math.atan2(d[1], d[0]) * 180) / Math.PI
}
const pathOf = (p) => `M${p[0]} C${p[1]} ${p[2]} ${p[3]}`
const petal = (l, w) =>
  `M0 -2 C${-w} ${-l * 0.25} ${-w * 0.9} ${-l * 0.9} 0 ${-l} C${w * 0.9} ${-l * 0.9} ${w} ${-l * 0.25} 0 -2Z`

const NECK_A = [[118, 108], [104, 84], [106, 52], [126, 36]]
const NECK_B = [[126, 36], [140, 24], [158, 30], [161, 46]]
const NECK = [...Array(26).keys()].flatMap((i) => {
  const t = i / 25
  return [[...bez(NECK_A, t), 7.4 - t * 2.2], [...bez(NECK_B, t), 5.2 - t * 1.4]].map(([x, y, r]) => [x, y, r])
})

function Satin({ id, a, b, rot = 35 }) {
  return (
    <pattern id={id} width="3" height="3" patternUnits="userSpaceOnUse" patternTransform={`rotate(${rot})`}>
      <rect width="3" height="3" fill={a} />
      <rect y="1" width="3" height="1.1" fill={b} />
    </pattern>
  )
}

function Flower({ id, n, len, wid, fill, stroke, beads }) {
  const rr = len * 0.2
  return (
    <g id={id}>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`rotate(${(i * 360) / n})`}>
          <path d={petal(len, wid)} fill={`url(#${fill})`} stroke={stroke} strokeWidth=".8" />
          <path d={`M0 ${-len * 0.24} V${-len * 0.72}`} stroke="#fff" strokeOpacity=".55" strokeWidth=".7" strokeDasharray="2 1.6" strokeLinecap="round" />
        </g>
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <circle key={i} cx={rr * Math.cos((i * Math.PI) / 4)} cy={rr * Math.sin((i * Math.PI) / 4)} r={len * 0.075} fill={beads} />
      ))}
      <circle r={len * 0.11} fill="url(#bead)" />
    </g>
  )
}

/* A stem with leaves, optional side buds and a tip. Used for every vine. */
function Branch({ pts, n = 5, scale = 0.6, tip = 'bud', buds = 0, stem = '#6f7b55', hi = '#c9d3ae', w = 1.7 }) {
  const d = pathOf(pts)
  const items = []
  for (let k = 0; k < n; k++) {
    const t = (k + 1) / (n + 1)
    const [x, y] = bez(pts, t)
    const side = k % 2 ? 1 : -1
    const s = scale * (1.1 - t * 0.4)
    items.push(
      <use key={`l${k}`} href={k % 3 === 2 ? '#leaf2' : '#leaf'} transform={`translate(${x} ${y}) rotate(${ang(pts, t) + side * 50}) scale(${s})`} />
    )
  }
  for (let k = 0; k < buds; k++) {
    const t = ((k + 0.5) / buds) * 0.85 + 0.1
    const [x, y] = bez(pts, t)
    const side = k % 2 ? -1 : 1
    items.push(
      <g key={`b${k}`} transform={`translate(${x} ${y}) rotate(${ang(pts, t) + side * (58 + rand(k + n) * 22)})`}>
        <path d="M0 0 H8" stroke={stem} strokeWidth="1" />
        <use href={k % 2 ? '#bud' : '#bud-blue'} transform="translate(8 0) scale(.75)" />
      </g>
    )
  }
  const [ex, ey] = pts[3]
  return (
    <g>
      <path d={d} fill="none" stroke={stem} strokeWidth={w} strokeLinecap="round" />
      <path d={d} fill="none" stroke={hi} strokeWidth=".5" strokeDasharray="2.4 2.4" strokeLinecap="round" />
      {items}
      {tip && <use href={`#${tip}`} transform={`translate(${ex} ${ey}) rotate(${ang(pts, 1)})`} />}
    </g>
  )
}

/* One hanging wisteria cluster */
function Raceme({ x, y, len, w, seed }) {
  const rows = Math.round(len / 8)
  const out = []
  for (let i = 0; i < rows; i++) {
    const t = i / rows
    const cy = y + 8 + (i * (len - 10)) / rows
    const spread = w * Math.pow(1 - t, 0.75) + 2.5
    const cols = t > 0.82 ? 1 : 3
    for (let j = 0; j < cols; j++) {
      const off = cols === 1 ? 0 : (j - 1) * spread * (0.65 + rand(seed + i * 3 + j) * 0.45)
      const sx = x + off + (rand(seed + i + j * 7) - 0.5) * 2
      const tilt = off * 2.6 + (rand(seed + i * 5 + j) - 0.5) * 26
      out.push(
        <use key={`${i}-${j}`} href={`#fl${(i + j + seed) % 3}`} transform={`translate(${sx.toFixed(1)} ${cy.toFixed(1)}) rotate(${tilt.toFixed(0)})`} />
      )
    }
  }
  return (
    <g>
      <path d={`M${x} ${y} C${x + 2} ${y + len * 0.3}, ${x - 2} ${y + len * 0.6}, ${x} ${y + len}`} stroke="#8d7a55" strokeWidth="1.3" fill="none" />
      {out}
      <use href="#leaf" transform={`translate(${x} ${y + 16}) rotate(112) scale(.62)`} />
      <use href="#leaf2" transform={`translate(${x} ${y + 30}) rotate(66) scale(.55)`} />
      {len > 140 && <use href="#leaf" transform={`translate(${x} ${y + len * 0.45}) rotate(105) scale(.5)`} />}
    </g>
  )
}

/* ================================================================== */
/*  Shared definitions (thread fills, flowers, garlands, swans)        */
/* ================================================================== */
function Defs() {
  const FEATHERS = []
  let k = 0
  for (let row = 0; row < 5; row++) {
    for (let c = 0; c < 12; c++) {
      const x = 24 + c * 9.4 + (row % 2) * 4.7
      const y = 102 + row * 9
      if (((x - 70) / 64) ** 2 + ((y - 122) / 29) ** 2 > 1) continue
      FEATHERS.push(
        <ellipse key={k++} cx={x} cy={y} rx="8.6" ry="5.2" transform={`rotate(-18 ${x} ${y})`} fill="url(#satin-cream)" stroke="#cdb994" strokeWidth=".7" />
      )
    }
  }

  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        {/* Satin-stitch fills */}
        <Satin id="satin-green" a="#7b8a63" b="#94a37a" />
        <Satin id="satin-sage" a="#92a283" b="#abba99" />
        <Satin id="satin-blush" a="#ecb9aa" b="#f6d4c9" rot={60} />
        <Satin id="satin-blue" a="#7f9dc7" b="#9eb8db" rot={60} />
        <Satin id="satin-cream" a="#f0e6d2" b="#fbf5e8" rot={60} />
        <Satin id="satin-peri-d" a="#7c8ed0" b="#95a5e0" rot={80} />
        <Satin id="satin-peri-m" a="#93a2de" b="#adb9ec" rot={80} />
        <Satin id="satin-peri-l" a="#b3bdf0" b="#cbd2f7" rot={80} />

        {/* Blush liner with tiny forget-me-nots, for the inside of the envelope */}
        <pattern id="liner" width="30" height="30" patternUnits="userSpaceOnUse">
          <rect width="30" height="30" fill="#efd0c4" />
          {[[8, 8], [23, 23]].map(([cx, cy]) => (
            <g key={cx}>
              {[0, 72, 144, 216, 288].map((a) => (
                <circle key={a} cx={cx + 3 * Math.cos((a * Math.PI) / 180)} cy={cy + 3 * Math.sin((a * Math.PI) / 180)} r="1.9" fill="#8aa6cf" />
              ))}
              <circle cx={cx} cy={cy} r="1.3" fill="#f6eedc" />
            </g>
          ))}
          <circle cx="23" cy="7" r="1" fill="#d9a898" />
          <circle cx="7" cy="23" r="1" fill="#d9a898" />
        </pattern>

        <radialGradient id="pearl-g" cx=".35" cy=".3" r=".8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".55" stopColor="#efe8da" />
          <stop offset="1" stopColor="#c9bfa8" />
        </radialGradient>
        <radialGradient id="bead" cx=".35" cy=".3" r=".8">
          <stop offset="0" stopColor="#f6e2a4" />
          <stop offset=".6" stopColor="#d2aa58" />
          <stop offset="1" stopColor="#8f6d2c" />
        </radialGradient>
        <linearGradient id="petal-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c9d1f4" />
          <stop offset="1" stopColor="#8394d6" />
        </linearGradient>

        {/* Leaves, buds, pearls */}
        <g id="leaf">
          <path d="M0 0 C4 -7 16 -9 28 0 C16 9 4 7 0 0Z" fill="url(#satin-green)" stroke="#5c6a47" strokeWidth=".7" />
          <path d="M3 0 H23" stroke="#d3dcbd" strokeWidth=".6" strokeDasharray="2.2 1.6" strokeLinecap="round" />
        </g>
        <g id="leaf2">
          <path d="M0 0 C4 -7 16 -9 28 0 C16 9 4 7 0 0Z" fill="url(#satin-sage)" stroke="#6f8062" strokeWidth=".7" />
          <path d="M3 0 H23" stroke="#eef3e4" strokeWidth=".6" strokeDasharray="2.2 1.6" strokeLinecap="round" />
        </g>
        <path id="bud" d="M0 0 C2 -4 9 -4.6 12 0 C9 4.6 2 4 0 0Z" fill="url(#satin-cream)" stroke="#cdb994" strokeWidth=".7" />
        <path id="bud-blue" d="M0 0 C2 -4 9 -4.6 12 0 C9 4.6 2 4 0 0Z" fill="url(#satin-blue)" stroke="#5d7fb0" strokeWidth=".7" />
        <circle id="pearl" r="3.6" fill="url(#pearl-g)" stroke="#cfc4ad" strokeWidth=".4" />

        {/* Flowers */}
        <Flower id="f-blush" n={5} len={24} wid={11} fill="satin-blush" stroke="#d49a8a" beads="url(#bead)" />
        <Flower id="f-blue" n={6} len={20} wid={7.5} fill="satin-blue" stroke="#5d7fb0" beads="#efe8d6" />
        <Flower id="f-cream" n={5} len={12} wid={6} fill="satin-cream" stroke="#cdb994" beads="url(#bead)" />
        <Flower id="f-fmn" n={5} len={7} wid={4} fill="satin-blue" stroke="#5d7fb0" beads="#efe8d6" />

        {/* Wisteria florets */}
        {['d', 'm', 'l'].map((c, i) => (
          <g key={c} id={`fl${i}`}>
            <path d="M0 -5 C4.6 -5 6.6 2 0 8 C-6.6 2 -4.6 -5 0 -5Z" fill={`url(#satin-peri-${c})`} stroke="#6c7dc0" strokeWidth=".6" />
            <path d="M0 -2.4 V4" stroke="#fff" strokeOpacity=".5" strokeWidth=".6" strokeLinecap="round" />
          </g>
        ))}

        {/* Small corner sprig (blue-linen style). Origin = corner, grows right and down. */}
        <g id="sprig">
          <Branch pts={[[6, 10], [40, 4], [82, 26], [126, 14]]} n={4} scale={0.5} buds={3} />
          <Branch pts={[[8, 8], [12, 40], [36, 68], [24, 114]]} n={4} scale={0.5} buds={3} />
          <Branch pts={[[10, 12], [34, 32], [52, 52], [78, 60]]} n={2} scale={0.45} tip="bud-blue" />
          <use href="#f-cream" transform="translate(34 28) scale(1.5)" />
          <use href="#f-blue" transform="translate(60 44) scale(.78)" />
          <use href="#f-cream" transform="translate(20 68) scale(1.05)" />
          <use href="#f-fmn" transform="translate(92 22) scale(1.3)" />
          <use href="#f-fmn" transform="translate(38 92) scale(1.3)" />
        </g>

        {/* Large corner spray (ceremony page). Origin = corner, grows right and down. */}
        <g id="spray">
          <Branch pts={[[0, 54], [70, 22], [140, 66], [236, 34]]} n={6} scale={0.8} buds={5} />
          <Branch pts={[[236, 34], [270, 20], [300, 30], [336, 10]]} n={3} scale={0.6} buds={2} />
          <Branch pts={[[44, 0], [60, 72], [18, 140], [52, 206]]} n={6} scale={0.8} buds={5} />
          <Branch pts={[[52, 206], [72, 244], [52, 292], [68, 336]]} n={4} scale={0.65} buds={3} />
          <Branch pts={[[110, 100], [150, 130], [104, 172], [146, 214]]} n={4} scale={0.6} buds={3} tip="bud-blue" />
          <use href="#f-blush" transform="translate(120 96) scale(2.6)" />
          <use href="#f-blue" transform="translate(52 190) scale(1.7)" />
          <use href="#f-blush" transform="translate(232 62) scale(.8)" />
          <use href="#f-blue" transform="translate(160 150) scale(.7)" />
          <use href="#f-cream" transform="translate(88 214) scale(1)" />
          <use href="#f-cream" transform="translate(262 28) scale(.9)" />
          <use href="#pearl" transform="translate(28 244)" />
          <use href="#pearl" transform="translate(190 108)" />
        </g>

        {/* Dividers */}
        <g id="orn-flower">
          <Branch pts={[[70, 22], [56, 14], [40, 26], [14, 15]]} n={3} scale={0.5} tip="bud-blue" />
          <g transform="translate(160 0) scale(-1 1)">
            <Branch pts={[[70, 22], [56, 14], [40, 26], [14, 15]]} n={3} scale={0.5} tip="bud-blue" />
          </g>
          <use href="#f-cream" transform="translate(80 20) scale(1.35)" />
        </g>
        <g id="orn-pearl">
          <Branch pts={[[92, 20], [74, 12], [48, 28], [10, 16]]} n={4} scale={0.5} tip="bud-blue" buds={2} />
          <g transform="translate(200 0) scale(-1 1)">
            <Branch pts={[[92, 20], [74, 12], [48, 28], [10, 16]]} n={4} scale={0.5} tip="bud-blue" buds={2} />
          </g>
          <use href="#pearl" transform="translate(100 20) scale(1.5)" />
        </g>

        {/* Swan, facing right. Waterline at y = 150. */}
        <g id="swan">
          <path d="M4 96 C14 112 30 100 46 94 C60 84 92 82 112 94 C124 100 132 108 134 118 C136 134 118 150 88 151 C50 152 20 140 4 96Z" fill="url(#satin-cream)" stroke="#cdb994" strokeWidth="1" />
          {FEATHERS}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const a = 186 + i * 5.5
            const r = (a * Math.PI) / 180
            const len = 24 - i * 0.8
            return (
              <ellipse key={i} cx={104 + len * Math.cos(r)} cy={102 + len * Math.sin(r) + i * 1.8} rx={len} ry="5.4" transform={`rotate(${a} ${104 + len * Math.cos(r)} ${102 + len * Math.sin(r) + i * 1.8})`} fill="url(#satin-cream)" stroke="#c4ae86" strokeWidth=".7" />
            )
          })}
          {NECK.map(([x, y, r], i) => <circle key={`o${i}`} cx={x} cy={y} r={r + 1.2} fill="#cdb994" />)}
          {NECK.map(([x, y, r], i) => <circle key={`f${i}`} cx={x} cy={y} r={r} fill="#f4ebd9" />)}
          <path d={`${pathOf(NECK_A)} ${pathOf(NECK_B).replace(/^M\S+ /, '')}`} fill="none" stroke="#c9b48a" strokeWidth=".8" strokeDasharray="3 3" strokeLinecap="round" />
          <ellipse cx="161" cy="46" rx="6.6" ry="5" fill="#f6eedc" stroke="#cdb994" strokeWidth=".8" />
          <path d="M166 43 L182 52 L166 52Z" fill="#e8a14a" stroke="#b9742a" strokeWidth=".8" strokeLinejoin="round" />
          <path d="M164 42 L170 46 L165 49Z" fill="#3a2e28" />
          <circle cx="159" cy="44" r="1.1" fill="#3a2e28" />
        </g>
      </defs>
    </svg>
  )
}

const Orn = ({ id, className, box }) => (
  <svg className={className} viewBox={box} aria-hidden="true">
    <use href={`#${id}`} />
  </svg>
)

// function CoverCorner({ pos }) {
//   return (
//     <svg className={`sprig-corner ${pos}`} viewBox="0 0 140 130" aria-hidden="true">
//       <use href="#sprig" transform="translate(4 4)" />
//     </svg>
//   )
// }
function CoverCorner({ pos }) {
  return (
    <img
      className={`sprig-corner ${pos}`}
      // src="/corner-flowers.png"
      src={`${import.meta.env.BASE_URL}corner-flowers.png`}
      alt=""
      aria-hidden="true"
    />
  )
}



function Corner({ pos }) {
  return (
    <svg className={`corner ${pos}`} viewBox="0 0 340 340" aria-hidden="true">
      <use href="#spray" />
    </svg>
  )
}

/* Wisteria canopy, hung from the top corner of the screen */
const VINE = [[-20, 16], [110, -8], [250, 44], [470, 6]]
function Wisteria({ pos }) {
  const lens = pos === 'l' ? [330, 215, 150, 175, 110, 80] : [290, 190, 140, 120, 100, 70]
  const ts = [0.1, 0.22, 0.35, 0.5, 0.66, 0.82]
  const widths = [21, 19, 18, 18, 15, 14]
  return (
    <svg className={`wisteria ${pos}`} viewBox="0 0 440 390" aria-hidden="true">
      {ts.map((t, i) => {
        const [x, y] = bez(VINE, t)
        return <Raceme key={i} x={x} y={y + 2} len={lens[i]} w={widths[i]} seed={pos === 'l' ? i + 1 : i + 11} />
      })}
      <Branch pts={VINE} n={13} scale={0.75} tip={null} stem="#a47c4e" hi="#d8bd93" w={2.6} />
      <Branch pts={[[8, 6], [22, 80], [0, 150], [18, 230]]} n={7} scale={0.7} tip="bud" stem="#a47c4e" hi="#d8bd93" w={2} />
    </svg>
  )
}

function Swans() {
  const waves = []
  for (let r = 0; r < 6; r++) {
    const y = 156 + r * 7
    const x0 = 30 + (r % 2) * 10
    const n = Math.floor((400 - x0) / 14) - 1
    waves.push(
      <g key={r} fill="none" strokeLinecap="round">
        <path d={`M${x0} ${y} q7 -4 14 0${' t14 0'.repeat(n)}`} stroke={r % 2 ? '#e4d8c0' : '#9fb4d9'} strokeWidth="2.2" strokeDasharray="11 4" opacity={1 - r * 0.1} />
        <path d={`M${x0 + 6} ${y + 3} q7 -4 14 0${' t14 0'.repeat(n - 1)}`} stroke={r % 2 ? '#b7c7e4' : '#e9dfca'} strokeWidth="1.2" strokeDasharray="6 5" opacity={0.8 - r * 0.1} />
      </g>
    )
  }
  return (
    <svg className="swans" viewBox="0 0 460 210" aria-hidden="true">
      <use href="#swan" transform="translate(52 6)" />
      <use href="#swan" transform="translate(408 14) scale(-.94 .94)" />
      {waves}
      <use href="#sprig" transform="translate(0 210) scale(1.1 -1.1)" />
      <use href="#sprig" transform="translate(460 210) scale(-1.1 -1.1)" />
    </svg>
  )
}

/* ================================================================== */
/*  Envelope artwork                                                   */
/* ================================================================== */
function PocketArt() {
  return (
    <svg className="fill-svg" viewBox="0 0 440 299" aria-hidden="true">
      <path d="M5 8 L220 164 L435 8" fill="none" stroke="#c9d8e8" strokeOpacity=".7" strokeWidth="1.2" strokeDasharray="4 3.2" strokeLinecap="round" />
      <use href="#sprig" transform="translate(12 288) scale(.95 -.95)" />
      <use href="#sprig" transform="translate(428 288) scale(-.95 -.95)" />
    </svg>
  )
}

function FlapFrontArt() {
  return (
    <svg className="fill-svg" viewBox="0 0 440 173" preserveAspectRatio="none" aria-hidden="true">
      <path d="M20 12 H420 L220 146 Z" fill="none" stroke="#c9d8e8" strokeOpacity=".7" strokeWidth="1.1" strokeDasharray="4 3.2" strokeLinecap="round" strokeLinejoin="round" />
      <use href="#sprig" transform="translate(10 8) scale(.62)" />
      <use href="#sprig" transform="translate(430 8) scale(-.62 .62)" />
    </svg>
  )
}

function Liner({ w, h }) {
  return (
    <svg className="fill-svg" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <rect width={w} height={h} fill="url(#liner)" />
    </svg>
  )
}

function CardCorners() {
  return (
    <svg className="card-corners" viewBox="0 0 400 260" aria-hidden="true">
      <use href="#sprig" transform="translate(8 8) scale(.78)" />
      <use href="#sprig" transform="translate(392 8) scale(-.78 .78)" />
      <use href="#sprig" transform="translate(8 252) scale(.78 -.78)" />
      <use href="#sprig" transform="translate(392 252) scale(-.78 -.78)" />
    </svg>
  )
}

/* The braided blue ribbon that ties the envelope shut */
function Bow() {
  const cord = (d) => (
    <>
      <path d={d} fill="none" stroke="#5a82bb" strokeWidth="7" strokeLinecap="round" />
      <path d={d} fill="none" stroke="#a8c0e3" strokeWidth="1.6" strokeDasharray="2 3.2" strokeLinecap="round" />
    </>
  )
  return (
    <svg viewBox="0 0 120 90" aria-hidden="true">
      {cord('M60 38 C40 8 6 14 10 40 C13 62 44 56 60 44')}
      {cord('M60 38 C80 8 114 14 110 40 C107 62 76 56 60 44')}
      {cord('M56 46 C49 58 43 68 36 77')}
      {cord('M64 46 C71 58 77 68 84 77')}
      <circle cx="60" cy="41" r="9.5" fill="#5a82bb" />
      <circle cx="60" cy="41" r="9.5" fill="none" stroke="#a8c0e3" strokeWidth="1.2" strokeDasharray="2 3" />
      <use href="#pearl" transform="translate(60 41) scale(1.45)" />
    </svg>
  )
}

/* Periwinkle petals that drift down once, as the card zooms to the page */
const PETALS = Array.from({ length: 14 }, (_, i) => ({
  '--x': `${((i * 37 + 11) % 92) + 4}%`,
  '--s': `${13 + ((i * 5) % 11)}px`,
  '--d': `${6 + (i % 4) * 1.2}s`,
  '--delay': `${0.5 + (i % 5) * 0.35}s`,
  '--sway': `${(i % 2 ? 1 : -1) * (40 + ((i * 13) % 60))}px`,
  '--rot': `${(i % 2 ? 1 : -1) * (240 + ((i * 29) % 160))}deg`,
}))

function Petals() {
  return (
    <div aria-hidden="true">
      {PETALS.map((style, i) => (
        <svg key={i} className="petal" viewBox="0 0 20 28" style={style}>
          <path d="M10 0 C20 8 20 20 10 28 C0 20 0 8 10 0Z" fill="url(#petal-grad)" />
        </svg>
      ))}
    </div>
  )
}

function InviteText({ as: Name = 'p' }) {
  return (
    <div className="invite">
      <p className="invite-lead">{INVITE.lead}</p>
      <Name className="invite-name thread">{INVITE.nameA}</Name>
      <p className="invite-and">{INVITE.and}</p>
      <Name className="invite-name thread">{INVITE.nameB}</Name>
      <Orn id="orn-flower" className="invite-orn" box="0 0 160 40" />
      <p className="invite-line">{INVITE.line}</p>
      <p className="invite-date tracked">{INVITE.date}</p>
    </div>
  )
}

/* A round satin-stitched colour swatch */
function Swatch({ name, color, id }) {
  return (
    <div className="swatch">
      <svg viewBox="0 0 60 60" aria-hidden="true">
        <defs>
          <pattern id={`sw${id}`} width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
            <rect width="3" height="3" fill={color} />
            <rect y="1" width="3" height="1.1" fill="#fff" fillOpacity=".28" />
          </pattern>
        </defs>
        <circle cx="30" cy="30" r="25" fill={`url(#sw${id})`} stroke="#5a3f2f" strokeOpacity=".35" strokeWidth="1.2" />
        <circle cx="30" cy="30" r="21" fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth=".8" strokeDasharray="3 2.4" />
      </svg>
      <span className="thread">{name}</span>
    </div>
  )
}

/* ================================================================== */

export default function App() {
  // closed -> opening -> reveal -> done
  const [stage, setStage] = useState('closed')

  useEffect(() => {
    document.body.style.overflow = stage === 'done' ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [stage])

  useEffect(() => {
    if (stage === 'opening') {
      const t = setTimeout(() => setStage('reveal'), OPEN_TO_REVEAL)
      return () => clearTimeout(t)
    }
    if (stage === 'reveal') {
      const t = setTimeout(() => setStage('done'), REVEAL_TO_DONE)
      return () => clearTimeout(t)
    }
  }, [stage])

  const openEnvelope = () => {
    if (stage !== 'closed') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setStage(reduce ? 'done' : 'opening')
  }

  const introClass = ['intro', stage !== 'closed' && 'is-open', stage === 'reveal' && 'is-reveal']
    .filter(Boolean)
    .join(' ')
  const siteVisible = stage === 'reveal' || stage === 'done'

  return (
    <>
      <Defs />

      {/* ✏️ Your real website. Add more <section className="screen"> blocks below. */}
      <main className={`site ${siteVisible ? 'is-visible' : ''}`}>
        {/* 1. The invitation card, as a full page */}
        <section className="screen cover">
          <CoverCorner pos="tl" />
          <CoverCorner pos="tr" />
          <CoverCorner pos="bl" />
          <CoverCorner pos="br" />
          <div className="copy">
            <h1 className="visually-hidden">{SHORT.a} &amp; {SHORT.b}</h1>
            <InviteText />
          </div>
          <p className="scroll-hint">Scroll</p>
        </section>

        {/* 2. Welcome */}
        <section className="screen hero">
          <Wisteria pos="l" />
          <Wisteria pos="r" />
          <div className="copy">
            <h2 className="title thread">{WELCOME.title}</h2>
            <Orn id="orn-flower" className="orn" box="0 0 160 40" />
            <p className="names thread">{SHORT.a} &amp; {SHORT.b}</p>
            <p className="tracked thread">{SHORT.date}</p>
            <p className="blurb thread">{WELCOME.blurb}</p>
          </div>
          <Swans />
        </section>

        {/* 3. Our story */}
        <section className="screen story">
          <Corner pos="tr" />
          <Corner pos="bl" />
          <div className="copy">
            <h2 className="title thread">{STORY.title}</h2>
            <Orn id="orn-pearl" className="orn wide" box="0 0 200 40" />
            {STORY.paragraphs.map((p) => (
              <p key={p} className="thread">{p}</p>
            ))}
          </div>
        </section>

        {/* 4. Our wedding day (blue linen) */}
        <section className="screen blue day">
          <CoverCorner pos="tl" />
          <CoverCorner pos="tr" />
          <CoverCorner pos="bl" />
          <CoverCorner pos="br" />
          <div className="copy">
            <h2 className="title thread">{DAY.title}</h2>
            <p className="tracked thread">{DAY.date}</p>
            <Orn id="orn-pearl" className="orn wide" box="0 0 200 40" />
            {EVENTS.map((ev) => (
              <div key={ev.name} className="event">
                <h3 className="thread">{ev.time} &mdash; {ev.name}</h3>
                <p className="thread">{ev.venue}</p>
                <Orn id="orn-pearl" className="orn wide" box="0 0 200 40" />
              </div>
            ))}
          </div>
        </section>

        {/* 5. Ceremony & reception */}
        <section className="screen details">
          <Corner pos="tl" />
          <Corner pos="br" />
          <div className="copy">
            <h2 className="title thread">{DETAILS.title}</h2>
            <p className="tracked thread">{DETAILS.sub}</p>
            <Orn id="orn-pearl" className="orn wide" box="0 0 200 40" />
            {EVENTS.map((ev) => (
              <div key={ev.name} className="event">
                <h3 className="thread">{ev.name}</h3>
                <p className="thread">{ev.venue}</p>
                <p className="thread">{ev.time}</p>
                <Orn id="orn-pearl" className="orn wide" box="0 0 200 40" />
              </div>
            ))}
            <p className="thread date-line">{INVITE.date}</p>
          </div>
        </section>

        {/* 6. Dress code */}
        <section className="screen dress">
          <Wisteria pos="l" />
          <Wisteria pos="r" />
          <div className="copy">
            <h2 className="title thread">{DRESS.title}</h2>
            <Orn id="orn-flower" className="orn" box="0 0 160 40" />
            <p className="code thread">{DRESS.code}</p>
            <p className="blurb thread">{DRESS.blurb}</p>
          </div>
        </section>

        {/* 7. Guest colour palette */}
        <section className="screen palette">
          <CoverCorner pos="tl" />
          <CoverCorner pos="tr" />
          <CoverCorner pos="bl" />
          <CoverCorner pos="br" />
          <div className="copy">
            <h2 className="title thread">{PALETTE.title}</h2>
            <p className="tracked thread">{PALETTE.sub}</p>
            <Orn id="orn-pearl" className="orn wide" box="0 0 200 40" />
            {PALETTE.groups.map((g, gi) => (
              <div key={g.name} className="group">
                <h3 className="thread">{g.name}</h3>
                <div className="swatches">
                  {g.colors.map(([name, color], ci) => (
                    <Swatch key={name} name={name} color={color} id={`${gi}${ci}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Closing (blue linen monogram) */}
        <section className="screen blue closing">
          <CoverCorner pos="tl" />
          <CoverCorner pos="tr" />
          <CoverCorner pos="bl" />
          <CoverCorner pos="br" />
          <div className="copy">
            <p className="mono-big thread" aria-label={`${SHORT.a} and ${SHORT.b}`}>
              <span>{CLOSING.mono[0]}</span>
              <i>&amp;</i>
              <span>{CLOSING.mono[1]}</span>
            </p>
            <Orn id="orn-flower" className="orn" box="0 0 160 40" />
            <p className="tracked thread">{CLOSING.date}</p>
          </div>
        </section>
      </main>

      {siteVisible && <Petals />}

      {stage !== 'done' && (
        <div className={introClass}>
          <div className="camera">
            <div className="envelope" onClick={openEnvelope}>
              <div className="glow" />

              <div className="env-back">
                <Liner w={440} h={299} />
              </div>

              <div className="flap-wrap" aria-hidden="true">
                <div className="flap">
                  <div className="flap-face flap-front">
                    <FlapFrontArt />
                  </div>
                  <div className="flap-face flap-back">
                    <Liner w={440} h={173} />
                  </div>
                </div>
              </div>

              <div className="card" aria-hidden="true">
                <CardCorners />
                <InviteText as="p" />
              </div>

              <div className="pocket">
                <PocketArt />
                <div className="pocket-text thread">
                  <div className="mono">
                    <span>{CLOSING.mono[0]}</span>
                    <i>&amp;</i>
                    <span>{CLOSING.mono[1]}</span>
                  </div>
                  <div className="tracked">{SHORT.date}</div>
                </div>
              </div>

              <button type="button" className="bow" aria-label="Open the invitation">
                <Bow />
              </button>

              <div className="shadow" />
              <p className="hint">Tap the bow to open</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}