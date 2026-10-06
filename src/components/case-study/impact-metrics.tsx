import { useId } from "react"
import { ArrowDown, ArrowUp, CircleCheck, Clock3, Gauge, ShieldCheck, Sparkles } from "lucide-react"
import type { Metric, Tone } from "@/lib/case-studies/types"
import { cn } from "@/lib/utils"

const tones: Record<Tone, { stroke: string; soft: string }> = {
  green: { stroke: "var(--tone-green)", soft: "#d6eee6" },
  purple: { stroke: "var(--tone-purple)", soft: "var(--accent-purple)" },
  orange: { stroke: "var(--tone-orange)", soft: "var(--accent-orange)" },
  blue: { stroke: "var(--tone-blue)", soft: "var(--accent-blue)" },
}

const icons = [ShieldCheck, Sparkles, Gauge, Clock3]

// Illustrative step levels (0 = top, 1 = bottom). Decorative only, not plotted data.
const shapes = {
  falling: [0.25, 0.25, 0.1, 0.1, 0.45, 0.45, 0.35, 0.7, 0.7, 0.85],
  rising: [0.8, 0.8, 0.6, 0.6, 0.75, 0.35, 0.35, 0.45, 0.15, 0.15],
}

/** Step line with rounded corners through the given levels. */
function stepPath(levels: number[], w: number, h: number, r = 6) {
  const seg = w / levels.length
  const pts: [number, number][] = []
  levels.forEach((lv, i) => {
    const y = 4 + lv * (h - 8)
    pts.push([i * seg, y], [(i + 1) * seg, y])
  })
  // drop duplicate points, keep corners only
  const corners = pts.filter((p, i) => i === 0 || p[0] !== pts[i - 1][0] || p[1] !== pts[i - 1][1])
  let d = `M${corners[0][0]},${corners[0][1]}`
  for (let i = 1; i < corners.length - 1; i++) {
    const [px, py] = corners[i - 1]
    const [cx, cy] = corners[i]
    const [nx, ny] = corners[i + 1]
    const inLen = Math.hypot(cx - px, cy - py)
    const outLen = Math.hypot(nx - cx, ny - cy)
    const rr = Math.min(r, inLen / 2, outLen / 2)
    const ax = cx - ((cx - px) / inLen) * rr
    const ay = cy - ((cy - py) / inLen) * rr
    const bx = cx + ((nx - cx) / outLen) * rr
    const by = cy + ((ny - cy) / outLen) * rr
    d += ` L${ax},${ay} Q${cx},${cy} ${bx},${by}`
  }
  const last = corners[corners.length - 1]
  return { d: `${d} L${last[0]},${last[1]}`, end: last }
}

function StepLine({ shape, tone }: { shape: "rising" | "falling"; tone: Tone }) {
  const id = useId()
  const w = 300
  const h = 40
  const { d, end } = stepPath(shapes[shape], w - 6, h)
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-10 w-full overflow-visible" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={tones[tone].stroke} stopOpacity="0.08" />
          <stop offset="0.45" stopColor={tones[tone].stroke} stopOpacity="0.55" />
          <stop offset="1" stopColor={tones[tone].stroke} />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <circle cx={end[0]} cy={end[1]} r="3.5" fill={tones[tone].stroke} />
    </svg>
  )
}

function StripedBar({ fill, tone }: { fill: number; tone: Tone }) {
  const count = 44
  const on = Math.round((fill / 100) * count)
  return (
    <div className="flex h-10 items-stretch gap-[2px] sm:gap-[3px]" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="flex-1 rounded-full"
          style={{ background: i < on ? tones[tone].stroke : "var(--line)", opacity: i < on ? 0.55 + (0.45 * (i + 1)) / on : 1 }}
        />
      ))}
    </div>
  )
}

function MetricCard({ m, index }: { m: Metric; index: number }) {
  const Icon = icons[index % icons.length]
  const Arrow = m.trend === "up" ? ArrowUp : ArrowDown
  return (
    <li
      className={cn(
        "flex min-w-0 flex-col justify-between gap-3 rounded-[18px] bg-white/85 p-4 sm:gap-4 sm:p-5 ring-1 ring-black/[0.04] shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_24px_rgba(16,24,40,0.04)]"
      )}
    >
      <div className="flex items-start justify-between">
        <p className="text-[10px] font-semibold tracking-[0.12em] text-soft uppercase sm:text-[11px]">{m.label}</p>
        <Icon className="size-4 text-soft" aria-hidden />
      </div>
      <div className="flex flex-wrap items-end gap-x-3 gap-y-1.5">
        <p className="text-[30px] leading-none sm:text-[40px] font-normal tracking-[-0.03em] text-ink tabular-nums">{m.value}</p>
        <div className="mb-1 flex items-center gap-2">
          <span
            className="inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold"
            style={{ background: tones[m.tone].soft, color: tones[m.tone].stroke }}
          >
            <Arrow className="size-3" strokeWidth={2.5} aria-hidden />
            {m.change}
          </span>
          <span className="text-xs text-soft max-sm:hidden">{m.note}</span>
        </div>
      </div>
      {m.visual.kind === "line" ? (
        <StepLine shape={m.visual.shape} tone={m.tone} />
      ) : (
        <StripedBar fill={m.visual.fill} tone={m.tone} />
      )}
      <p className="flex gap-2 border-t border-line pt-3 text-[13px] leading-snug text-body sm:text-sm">
        <CircleCheck className="mt-px size-4 shrink-0" style={{ color: tones[m.tone].stroke }} aria-hidden />
        {m.pointer}
      </p>
    </li>
  )
}

export function ImpactMetrics({ items }: { items: Metric[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4">
      {items.map((m, i) => (
        <MetricCard key={m.label} m={m} index={i} />
      ))}
    </ul>
  )
}
