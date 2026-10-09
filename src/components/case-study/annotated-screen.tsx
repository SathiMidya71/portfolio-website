"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import type { Block } from "@/lib/case-studies/types"
import { cn } from "@/lib/utils"

// A tall screen with the designer's notes beside it and hand-drawn arrows from each note to the
// part of the screen it describes (lg up). The arrows draw in on scroll. Below lg the notes become
// a numbered list under the screen, with matching numbers on the screen.

type AnnotatedBlock = Extract<Block, { type: "annotatedScreen" }>

// lg layout, as fractions of the container width
const IMG_LEFT = 0.25
const IMG_W = 0.5
const NOTE_W = 0.21
const ink = "#2e6fd0"

function Pin({ n, className, style }: { n: number; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={cn("grid size-6 shrink-0 place-items-center rounded-full bg-[#2e7fd6]/90 text-[12px] font-bold text-white ring-[3px] ring-white", className)} style={style}>
      {n}
    </span>
  )
}

/** A loose, hand-drawn curve from (x1,y1) to (x2,y2) with an open arrowhead. */
function arrow(x1: number, y1: number, x2: number, y2: number, i: number) {
  const dx = x2 - x1
  const dy = y2 - y1
  const bow = (i % 2 ? -1 : 1) * Math.min(60, Math.abs(dx) * 0.35 + 12)
  const c1x = x1 + dx * 0.35
  const c1y = y1 + dy * 0.1 - bow
  const c2x = x1 + dx * 0.75
  const c2y = y2 - dy * 0.2 + bow * 0.4
  const d = `M${x1},${y1} C${c1x},${c1y} ${c2x},${c2y} ${x2},${y2}`
  // arrowhead along the final tangent
  const ang = Math.atan2(y2 - c2y, x2 - c2x)
  const L = 11
  const a1 = ang + Math.PI * 0.82
  const a2 = ang - Math.PI * 0.78
  const head = `M${x2 + L * Math.cos(a1)},${y2 + L * Math.sin(a1)} L${x2},${y2} L${x2 + L * Math.cos(a2)},${y2 + L * Math.sin(a2)}`
  return { d, head }
}

export function AnnotatedScreenView({ block }: { block: AnnotatedBlock }) {
  const ref = useRef<HTMLDivElement>(null)
  const noteRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [anchors, setAnchors] = useState<number[]>([])
  const [shown, setShown] = useState(false)
  const notes = block.notes.map((n, i) => ({ ...n, n: i + 1 }))

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => {
      const r = el.getBoundingClientRect()
      setSize({ w: r.width, h: r.height })
      // arrows leave each note from the middle of its first line
      setAnchors(noteRefs.current.map((p) => (p ? p.offsetTop + 11 : 0)))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) setShown(true)
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        setShown(true)
        io.disconnect()
      },
      { threshold: 0.08 }
    )
    if (!reduce) io.observe(el)
    return () => {
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  const { w, h } = size
  return (
    <figure className="my-6">
      <div ref={ref} className="relative mx-auto max-w-[440px] lg:max-w-none">
        <Image
          src={block.image.src}
          alt={block.image.alt}
          width={block.image.width}
          height={block.image.height}
          sizes="(min-width: 1024px) 50vw, 440px"
          className="relative h-auto w-full rounded-[22px] shadow-[0_24px_50px_-28px_rgba(16,24,40,0.45)] ring-1 ring-black/5 lg:ml-[25%] lg:w-[50%]"
        />

        {/* phones and tablets: numbers on the screen */}
        {notes.map((n) => (
          <Pin key={n.n} n={n.n} className="absolute -translate-x-1/2 -translate-y-1/2 shadow-md lg:hidden" style={{ left: `${n.x * 100}%`, top: `${n.y * 100}%` }} />
        ))}

        {/* lg: handwritten notes beside the screen */}
        {notes.map((n, i) => (
          <p
            key={n.n}
            ref={(el) => {
              noteRefs.current[i] = el
            }}
            className={cn("absolute hidden font-hand text-[16px] leading-[1.12] font-bold lg:block", n.side === "left" ? "left-0 text-right" : "right-0")}
            style={{
              top: `${n.noteY * 100}%`,
              width: `${NOTE_W * 100}%`,
              color: ink,
              opacity: shown ? 1 : 0,
              translate: shown ? "0 0" : n.side === "left" ? "-12px 0" : "12px 0",
              transition: `opacity 500ms ease ${i * 120}ms, translate 600ms ease ${i * 120}ms`,
            }}
          >
            {n.text}
          </p>
        ))}

        {/* lg: hand-drawn arrows from each note to its spot on the screen */}
        {w > 0 && (
          <svg aria-hidden className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block" viewBox={`0 0 ${w} ${h}`}>
            {notes.map((n, i) => {
              const x1 = n.side === "left" ? w * NOTE_W + 8 : w * (1 - NOTE_W) - 8
              const y1 = anchors[i] ?? n.noteY * h
              const x2 = w * (IMG_LEFT + n.x * IMG_W)
              const y2 = n.y * h
              const { d, head } = arrow(x1, y1, x2, y2, i)
              const t = `stroke-dashoffset 900ms cubic-bezier(.6,.1,.3,1) ${300 + i * 120}ms`
              return (
                <g key={n.n} fill="none" stroke={ink} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <path d={d} pathLength={1} strokeDasharray="1 1" style={{ strokeDashoffset: shown ? 0 : 1, transition: t }} />
                  <path d={head} style={{ opacity: shown ? 1 : 0, transition: `opacity 200ms ${1100 + i * 120}ms` }} />
                  <circle cx={x2} cy={y2} r={4} fill="#fff" stroke={ink} style={{ opacity: shown ? 1 : 0, transition: `opacity 200ms ${1100 + i * 120}ms` }} />
                </g>
              )
            })}
          </svg>
        )}
      </div>

      {/* small screens: numbered notes below */}
      <ol className="mt-6 grid gap-3 lg:hidden">
        {notes.map((n) => (
          <li key={n.n} className="flex gap-3 text-[15px] leading-snug text-ink">
            <Pin n={n.n} />
            <span className="pt-0.5">{n.text}</span>
          </li>
        ))}
      </ol>
    </figure>
  )
}
