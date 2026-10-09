import Image from "next/image"
import type { Block } from "@/lib/case-studies/types"

// An image marked up like a notebook: hand-drawn pen circles, curvy arrows and handwritten
// notes, drawn as an SVG overlay in the image's own coordinate space (viewBox = image size).

type MarkedBlock = Extract<Block, { type: "markedImage" }>

const pen = "#ff6b4a"
const note = "#ffd166"

/** Hand-drawn ellipse: a slightly wobbly loop that overshoots its start, like a pen circle. */
function penCircle(cx: number, cy: number, rx: number, ry: number, seed: number) {
  const pts: string[] = []
  const turns = 1.12
  const n = 48
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * Math.PI * 2 * turns - 0.6
    const wob = 1 + 0.045 * Math.sin(t * 3 + seed) + 0.03 * Math.cos(t * 5 + seed * 2)
    const grow = 1 + (i / n) * 0.07
    pts.push(`${(cx + rx * wob * grow * Math.cos(t)).toFixed(1)},${(cy + ry * wob * grow * Math.sin(t)).toFixed(1)}`)
  }
  return `M${pts.join(" L")}`
}

/** Curved arrow from (x1,y1) to (x2,y2) with a hand-drawn head. */
function arrow(x1: number, y1: number, x2: number, y2: number, bend: number) {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const dx = x2 - x1
  const dy = y2 - y1
  const cx = mx - dy * bend
  const cy = my + dx * bend
  // head direction from the curve's end tangent
  const tx = x2 - cx
  const ty = y2 - cy
  const len = Math.hypot(tx, ty) || 1
  const ux = tx / len
  const uy = ty / len
  const h = 26
  const a = 0.5
  const hx1 = x2 - h * (ux * Math.cos(a) - uy * Math.sin(a))
  const hy1 = y2 - h * (uy * Math.cos(a) + ux * Math.sin(a))
  const hx2 = x2 - h * (ux * Math.cos(-a) - uy * Math.sin(-a))
  const hy2 = y2 - h * (uy * Math.cos(-a) + ux * Math.sin(-a))
  return { body: `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`, head: `M${hx1},${hy1} L${x2},${y2} L${hx2},${hy2}` }
}

export function MarkedImageView({ block }: { block: MarkedBlock }) {
  const { width: W, height: H } = block.image
  return (
    <figure className="my-2">
      <div className="relative overflow-hidden rounded-[18px] bg-[#0b0d0f] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.6)]">
        <Image src={block.image.src} alt={block.image.alt} width={W} height={H} sizes="(min-width: 1200px) 920px, 100vw" className="h-auto w-full" />
        <svg viewBox={`0 0 ${W} ${H}`} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden fill="none" strokeLinecap="round" strokeLinejoin="round">
          {block.marks.map((m, i) => {
            const ar = arrow(m.note.x, m.note.y, m.arrowTo[0], m.arrowTo[1], m.bend ?? 0.25)
            return (
              <g key={i}>
                <path d={penCircle(m.circle.cx, m.circle.cy, m.circle.rx, m.circle.ry, i + 1)} stroke={pen} strokeWidth={7} opacity={0.95} />
                <path d={ar.body} stroke={note} strokeWidth={5} />
                <path d={ar.head} stroke={note} strokeWidth={5} />
                <text
                  x={m.textAt[0]}
                  y={m.textAt[1]}
                  fill={note}
                  fontSize={m.size ?? 64}
                  fontWeight={700}
                  className="font-hand"
                  transform={`rotate(${m.tilt ?? -4} ${m.textAt[0]} ${m.textAt[1]})`}
                >
                  {m.text.split("\n").map((line, k) => (
                    <tspan key={k} x={m.textAt[0]} dy={k ? (m.size ?? 64) * 0.95 : 0}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
      {block.caption && <figcaption className="mt-3 text-[15px] font-medium text-soft">{block.caption}</figcaption>}
    </figure>
  )
}
