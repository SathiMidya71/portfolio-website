import Image from "next/image"
import { Check, Sparkles, X } from "lucide-react"
import type { Block } from "@/lib/case-studies/types"
import { cn } from "@/lib/utils"

// Illustrated persona "desk scene", modelled on Sathi's reference: the persona's photo in the
// centre on a line-drawn desk, with handwritten notes and dotted leader lines around it.
// Positions use a 1000 × 620 board; text sizes use container units so it scales as one picture.

type Persona = Extract<Block, { type: "personas" }>["items"][number]

const hand = "#2e7fd6" // handwritten annotation colour
const ink = "#344054"
const H = 620 // board height in the same units

/** Absolutely positioned note, in board coordinates (x, y, width in units of 1000). */
function Note({ x, y, w, children, className }: { x: number; y: number; w: number; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("absolute", className)} style={{ left: `${x / 10}%`, top: `${(y / H) * 100}%`, width: `${w / 10}%` }}>
      {children}
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-hand text-[3cqw] leading-[0.95] font-bold" style={{ color: hand }}>
      {children}
    </p>
  )
}

export function PersonaBoard({ p }: { p: Persona }) {
  const fact = (label: string) => p.facts?.find((f) => f.label === label)?.value
  return (
    <figure className="relative isolate aspect-[1000/620] w-full [container-type:inline-size]" aria-label={`Persona: ${p.name}, ${p.role}`}>
      {/* line art: desk, props and dotted leaders */}
      <svg viewBox="0 0 1000 620" className="absolute inset-0 h-full w-full" aria-hidden fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* dotted leaders to the portrait */}
        <g stroke={hand} strokeWidth="2" strokeDasharray="1 7" opacity="0.75">
          <path d="M225,118 C300,120 350,150 405,205" />
          <path d="M775,118 C700,120 650,150 595,205" />
          <path d="M300,330 C340,320 370,300 400,285" />
          <path d="M700,330 C660,320 630,300 600,285" />
          <path d="M500,520 L500,490" />
        </g>
        <g transform="translate(0,-70)">
        {/* desk */}
        <g stroke={ink} strokeWidth="2.2">
          <path d="M60,540 L960,540" />
          <path d="M80,540 L80,556 L940,556 L940,540" />
          <path d="M120,556 L120,600 M900,556 L900,600" strokeOpacity="0.5" />
        </g>
        {/* round-bottom flask */}
        <g stroke={ink} strokeWidth="2">
          <path d="M150,452 L150,488 C126,496 116,512 118,524 C121,538 136,540 160,540 C184,540 199,538 202,524 C204,512 194,496 170,488 L170,452" />
          <path d="M144,452 L176,452" />
          <path d="M124,518 C140,512 180,512 196,518" stroke="#b79cec" strokeWidth="6" strokeOpacity="0.8" />
        </g>
        {/* paper stack */}
        <g stroke={ink} strokeWidth="2">
          <path d="M235,540 L250,470 L345,470 L330,540" />
          <path d="M228,540 L243,478" strokeOpacity="0.5" />
          <path d="M265,488 L330,488 M262,500 L326,500 M259,512 L310,512" strokeOpacity="0.6" />
        </g>
        {/* laptop with the AI chat */}
        <g stroke={ink} strokeWidth="2" transform="translate(45,0)">
          <path d="M690,532 L705,452 L855,452 L840,532 Z" />
          <path d="M660,540 L690,532 L840,532 L880,540" />
          <rect x="726" y="470" width="58" height="12" rx="6" fill="#b79cec" fillOpacity="0.35" stroke="none" />
          <rect x="740" y="490" width="72" height="12" rx="6" fill="#1f392d" fillOpacity="0.85" stroke="none" />
          <rect x="722" y="510" width="48" height="10" rx="5" fill="#b79cec" fillOpacity="0.35" stroke="none" />
        </g>
        {/* coffee mug */}
        <g stroke={ink} strokeWidth="2" transform="translate(36,0)">
          <path d="M600,504 L604,540 L640,540 L644,504 Z" />
          <path d="M644,512 C658,512 658,530 642,530" />
          <path d="M614,494 C610,486 620,482 616,474 M628,494 C624,486 634,482 630,474" strokeOpacity="0.5" />
        </g>
        </g>
      </svg>

      {/* portrait with an AI halo */}
      <div className="absolute top-[17%] left-1/2 w-[21%] -translate-x-1/2">
        <span aria-hidden className="absolute -inset-[9%] animate-[spin_24s_linear_infinite] rounded-full border-2 border-dashed border-[#b79cec] motion-reduce:animate-none" />
        <span aria-hidden className="absolute -inset-[3%] rounded-full bg-[radial-gradient(circle,#efe7fd_55%,transparent_72%)]" />
        {p.photo && (
          <Image
            src={p.photo.src}
            alt={p.photo.alt}
            width={p.photo.width}
            height={p.photo.height}
            sizes="200px"
            className="relative aspect-square w-full rounded-full object-cover shadow-[0_14px_30px_-12px_rgba(40,30,60,0.45)] ring-[0.5cqw] ring-white"
          />
        )}
        <Sparkles aria-hidden className="absolute -top-[6%] -right-[8%] size-[3.4cqw] text-[#8a6cd4]" />
        <Sparkles aria-hidden className="absolute bottom-[4%] -left-[12%] size-[2.2cqw] text-[#b79cec]" />
      </div>

      {/* speech bubble */}
      {p.quote && (
        <Note x={300} y={18} w={210}>
          <div className="relative rounded-[1.4cqw] border-2 border-ink bg-white px-[1.4cqw] py-[1cqw] text-[1.45cqw] leading-snug font-medium text-ink shadow-[0.4cqw_0.4cqw_0_rgba(52,64,84,0.12)]">
            “{p.quote}”
            <span aria-hidden className="absolute -bottom-[1.1cqw] left-[70%] size-[2cqw] rotate-45 border-r-2 border-b-2 border-ink bg-white" />
          </div>
        </Note>
      )}

      {/* experience */}
      {fact("Experience") && (
        <Note x={45} y={60} w={190}>
          <Label>{fact("Experience")}</Label>
          <p className="font-hand text-[2.2cqw] leading-none font-bold" style={{ color: hand }}>
            in the lab
          </p>
        </Note>
      )}

      {/* AI confidence meter */}
      {fact("AI confidence") && (
        <Note x={770} y={52} w={200}>
          <Label>AI confidence</Label>
          <div className="mt-[0.8cqw] flex gap-[0.4cqw]" aria-label={`AI confidence: ${fact("AI confidence")}`}>
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className="h-[1cqw] flex-1 rounded-full" style={{ background: i < 4 ? (i < 2 ? "#d9caf7" : "#b79cec") : "#ece4d8" }} />
            ))}
          </div>
          <p className="mt-[0.5cqw] font-hand text-[2cqw] leading-none font-bold" style={{ color: hand }}>
            {fact("AI confidence")}
          </p>
        </Note>
      )}

      {/* goals */}
      <Note x={30} y={215} w={270}>
        <Label>Goals</Label>
        <ul className="mt-[0.8cqw] grid gap-[0.6cqw]">
          {p.goals.map((g) => (
            <li key={g} className="flex gap-[0.7cqw] text-[1.45cqw] leading-tight text-ink">
              <Check className="mt-[0.15cqw] size-[1.6cqw] shrink-0 text-brand" strokeWidth={3} aria-hidden />
              {g}
            </li>
          ))}
        </ul>
      </Note>

      {/* frustrations */}
      <Note x={705} y={215} w={270}>
        <Label>Frustrations</Label>
        <ul className="mt-[0.8cqw] grid gap-[0.6cqw]">
          {p.frustrations.map((f) => (
            <li key={f} className="flex gap-[0.7cqw] text-[1.45cqw] leading-tight text-ink">
              <X className="mt-[0.15cqw] size-[1.6cqw] shrink-0 text-[var(--tone-orange)]" strokeWidth={3} aria-hidden />
              {f}
            </li>
          ))}
        </ul>
      </Note>

      {/* name plate on the desk */}
      <Note x={385} y={385} w={230}>
        <div className="relative">
          <div className="rounded-t-[0.4cqw] bg-[#1f392d] px-[1cqw] py-[0.9cqw] text-center text-white shadow-[0_0.6cqw_1cqw_-0.4cqw_rgba(0,0,0,0.4)]">
            <p className="text-[1.6cqw] leading-none font-bold tracking-[0.08em] uppercase">{p.name}</p>
            <p className="mt-[0.5cqw] text-[1.2cqw] leading-none text-white/75">{p.role}</p>
          </div>
          <div aria-hidden className="mx-[4%] h-[1.4cqw] bg-gradient-to-b from-[#16291f] to-[#2b4a3b]" style={{ clipPath: "polygon(0 0,100% 0,96% 100%,4% 100%)" }} />
        </div>
      </Note>

      {/* needs */}
      {p.needs && (
        <Note x={210} y={530} w={580} className="text-center">
          <p className="inline font-hand text-[2.6cqw] leading-none font-bold" style={{ color: hand }}>
            Needs:{" "}
          </p>
          {p.needs.map((n, i) => (
            <span
              key={n}
              className="mx-[0.4cqw] inline-block rounded-full px-[1.2cqw] py-[0.5cqw] align-middle text-[1.4cqw] font-semibold"
              style={{ background: ["#e4f1eb", "#f3eefc", "#e6f2fe", "#fdeee0"][i % 4], color: ["#02594e", "#6b4cb8", "#1666c4", "#9a4a12"][i % 4] }}
            >
              {n}
            </span>
          ))}
        </Note>
      )}
    </figure>
  )
}
