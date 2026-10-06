import { useId } from "react"

// Order matches the four problem pointers: complexity, overload, accessibility, compliance.
export const problemTones = [
  { stroke: "var(--tone-orange)", soft: "var(--accent-orange)", fill: "#fff6ee" },
  { stroke: "var(--tone-blue)", soft: "var(--accent-blue)", fill: "#eef6ff" },
  { stroke: "var(--tone-purple)", soft: "var(--accent-purple)", fill: "#ffffff" },
  { stroke: "var(--tone-green)", soft: "#d6eee6", fill: "#ecf6f1" },
]

const ink = "var(--ink)"

/** Outlined app window with a header rule and three dots, like the reference illustration. */
function Win({ x, y, w, h, fill = "#fff" }: { x: number; y: number; w: number; h: number; fill?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={fill} stroke={ink} strokeWidth={1.5} />
      <line x1={x} x2={x + w} y1={y + 20} y2={y + 20} stroke={ink} strokeWidth={1.2} />
      {[26, 18, 10].map((dx) => (
        <circle key={dx} cx={x + w - dx} cy={y + 10} r={2.2} fill="none" stroke={ink} strokeWidth={1.1} />
      ))}
    </g>
  )
}

function Badge({ cx, cy, n }: { cx: number; cy: number; n: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={12} fill={problemTones[n - 1].stroke} stroke="#fff" strokeWidth={2} />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize={11} fontWeight={700} fill="#fff">
        {String(n).padStart(2, "0")}
      </text>
    </g>
  )
}

/** Repeating waveform between x0 and x1 around baseline y. */
function wave(x0: number, x1: number, y: number, kind: "pressure" | "flow" | "volume") {
  const step = 30
  let d = `M${x0},${y}`
  for (let x = x0; x + step <= x1; x += step) {
    if (kind === "pressure") d += ` l4,-12 l6,3 l12,0 l4,9 l4,0`
    else if (kind === "flow") d += ` l2,-11 l10,4 l2,7 l2,7 l10,-4 l4,-3`
    else d += ` q8,-16 15,-14 q4,2 15,14`
  }
  return d
}

export function VentilatorProblemVisual() {
  const stripe = useId()
  const S = `url(#${stripe})`
  return (
    <svg viewBox="0 0 520 500" className="h-auto w-full font-sans" role="img" aria-labelledby={`${stripe}-t`}>
      <title id={`${stripe}-t`}>
        Illustration: a ventilator screen surrounded by its four design challenges: critical alarms, information
        overload, readability from a distance, and regulatory validation.
      </title>
      <defs>
        <pattern id={stripe} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="8" height="8" fill="#fff" />
          <rect width="3.5" height="8" fill="var(--tone-purple)" opacity="0.55" />
        </pattern>
      </defs>

      {/* ---------- Striped connectors (drawn first, behind windows) ---------- */}
      <rect x={96} y={128} width={11} height={46} fill={S} stroke={ink} strokeWidth={1.2} />
      <rect x={392} y={138} width={11} height={36} fill={S} stroke={ink} strokeWidth={1.2} />
      <rect x={140} y={338} width={11} height={36} fill={S} stroke={ink} strokeWidth={1.2} />
      <rect x={372} y={338} width={11} height={46} fill={S} stroke={ink} strokeWidth={1.2} />
      <rect x={410} y={250} width={46} height={11} fill={S} stroke={ink} strokeWidth={1.2} />

      {/* ---------- 02 Information overload: stacked windows full of values ---------- */}
      <Win x={48} y={48} w={170} h={104} />
      <Win x={34} y={34} w={170} h={104} />
      <Win x={20} y={20} w={170} h={110} fill={problemTones[1].fill} />
      {["17", "12", "125", "1:2.4", "1.9", "21", "3", "38.2", "00"].map((v, i) => (
        <g key={i}>
          <rect
            x={30 + (i % 3) * 52}
            y={46 + Math.floor(i / 3) * 27}
            width={46}
            height={22}
            rx={5}
            fill="#fff"
            stroke={ink}
            strokeWidth={0.9}
          />
          <text
            x={53 + (i % 3) * 52}
            y={61 + Math.floor(i / 3) * 27}
            textAnchor="middle"
            fontSize={11}
            fontWeight={600}
            fill={ink}
          >
            {v}
          </text>
        </g>
      ))}
      <Badge cx={20} cy={20} n={2} />

      {/* ---------- 01 Complexity & criticality: alarm ---------- */}
      <Win x={320} y={10} w={180} h={130} />
      <circle cx={410} cy={78} r={44} fill={problemTones[0].soft} opacity={0.35} />
      <circle cx={410} cy={78} r={31} fill={problemTones[0].soft} opacity={0.6} />
      <path d="M410,54 L433,94 L387,94 Z" fill="#fff" stroke={ink} strokeWidth={1.5} strokeLinejoin="round" />
      <line x1={410} x2={410} y1={67} y2={81} stroke={problemTones[0].stroke} strokeWidth={3} strokeLinecap="round" />
      <circle cx={410} cy={87.5} r={2} fill={problemTones[0].stroke} />
      <text x={410} y={128} textAnchor="middle" fontSize={11} fontWeight={600} fill={ink}>
        High pressure alarm
      </text>
      <Badge cx={320} cy={10} n={1} />

      {/* ---------- Ventilator main screen ---------- */}
      <Win x={110} y={170} w={300} h={172} />
      <rect x={120} y={176} width={70} height={10} rx={3} fill="var(--tone-blue)" />
      <text x={125} y={184} fontSize={7.5} fontWeight={700} fill="#fff">
        MODE: PCV
      </text>
      {[
        ["PIP", "17"],
        ["RR", "12"],
        ["PEEP", "3"],
      ].map(([k, v], i) => (
        <g key={k}>
          <rect x={120} y={200 + i * 42} width={70} height={36} rx={6} fill="#182230" />
          <text x={127} y={213 + i * 42} fontSize={8} fill="#cbd5e1">
            {k}
          </text>
          <text x={184} y={230 + i * 42} textAnchor="end" fontSize={16} fontWeight={700} fill="#fff">
            {v}
          </text>
        </g>
      ))}
      {[214, 258, 302].map((y) => (
        <line key={y} x1={204} x2={398} y1={y + 12} y2={y + 12} stroke="var(--line)" strokeWidth={1} />
      ))}
      <path d={wave(204, 398, 226, "pressure")} fill="none" stroke="var(--tone-green)" strokeWidth={1.8} strokeLinejoin="round" />
      <path d={wave(204, 398, 270, "flow")} fill="none" stroke="var(--tone-orange)" strokeWidth={1.8} strokeLinejoin="round" />
      <path d={wave(204, 398, 314, "volume")} fill="none" stroke="var(--tone-purple)" strokeWidth={1.8} />

      {/* side window hinting at settings depth */}
      <Win x={430} y={220} w={80} h={70} />
      {[0, 1].map((i) => (
        <rect key={i} x={440} y={250 + i * 16} width={60} height={9} rx={4.5} fill="var(--sand)" stroke={ink} strokeWidth={0.8} />
      ))}
      <circle cx={472} cy={254.5} r={5} fill="#fff" stroke={ink} strokeWidth={1} />
      <circle cx={455} cy={270.5} r={5} fill="#fff" stroke={ink} strokeWidth={1} />

      {/* ---------- 03 Accessibility: readable from a distance ---------- */}
      <Win x={30} y={372} w={190} h={118} />
      <circle cx={88} cy={435} r={34} fill={problemTones[2].soft} opacity={0.45} />
      <circle cx={88} cy={435} r={23} fill={problemTones[2].soft} />
      <path d="M72,435 q16,-14 32,0 q-16,14 -32,0 Z" fill="#fff" stroke={ink} strokeWidth={1.4} />
      <circle cx={88} cy={435} r={5} fill={problemTones[2].stroke} />
      <text x={134} y={428} fontSize={22} fontWeight={700} fill={ink}>
        17
      </text>
      <text x={134} y={448} fontSize={10.5} fontWeight={600} fill={ink}>
        Readable
      </text>
      <text x={134} y={462} fontSize={10.5} fontWeight={600} fill={ink}>
        from 10 ft
      </text>
      <Badge cx={30} cy={372} n={3} />

      {/* ---------- 04 Regulatory compliance: validated checklist ---------- */}
      <Win x={300} y={384} w={200} h={106} fill={problemTones[3].fill} />
      <rect x={316} y={414} width={50} height={62} rx={6} fill="#fff" stroke={ink} strokeWidth={1.3} />
      <rect x={330} y={409} width={22} height={9} rx={3} fill={problemTones[3].soft} stroke={ink} strokeWidth={1.1} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path
            d={`M323,${430 + i * 15} l3,3 l6,-6`}
            fill="none"
            stroke={problemTones[3].stroke}
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1={337} x2={358} y1={430 + i * 15} y2={430 + i * 15} stroke={ink} strokeWidth={1.1} strokeLinecap="round" />
        </g>
      ))}
      <text x={380} y={438} fontSize={12} fontWeight={700} fill={ink}>
        Tested &amp;
      </text>
      <text x={380} y={454} fontSize={12} fontWeight={700} fill={ink}>
        validated
      </text>
      <Badge cx={300} cy={384} n={4} />
    </svg>
  )
}
