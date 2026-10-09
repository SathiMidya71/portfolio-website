import Image from "next/image"
import type { Block } from "@/lib/case-studies/types"
import { cn } from "@/lib/utils"

// Blocks for the Arc Connect Web Portal case study: the information architecture (coded from
// Sathi's radial "Architecture" board), an annotated medical record screen, and photo pairs.

/* ---------------- architecture ---------------- */

type Branch = { label: string; to?: string[] }
type Cluster = { title: string; color: string; ink: string; items: Branch[]; pos: string; anchor: [number, number] }

// Groups and wording follow the Behance board; positions are % of the lg container
const clusters: Cluster[] = [
  {
    title: "Care overview",
    color: "#F26930",
    ink: "#b8461a",
    pos: "lg:left-0 lg:top-0",
    anchor: [31, 14],
    items: [{ label: "Therapy" }, { label: "Patients" }, { label: "Transmission" }, { label: "Care site" }, { label: "Announcement" }, { label: "Help Center" }],
  },
  {
    title: "Invitations",
    color: "#344054",
    ink: "#344054",
    pos: "lg:right-0 lg:top-0",
    anchor: [69, 14],
    items: [
      { label: "New invitation", to: ["Patients", "Clinics & hospitals", "Care sites"] },
      { label: "Received invitations" },
      { label: "Sent invitations", to: ["Care sites", "Caregivers"] },
    ],
  },
  {
    title: "Notifications",
    color: "#A9D158",
    ink: "#5d7f1f",
    pos: "lg:left-0 lg:top-[52%]",
    anchor: [31, 66],
    items: [
      { label: "Notification settings", to: ["Adherence & SpO2 ranges", "Notification schedule"] },
      { label: "Notification summary", to: ["Summary archive", "Patients scoring below 50"] },
    ],
  },
  {
    title: "Communication",
    color: "#3798BF",
    ink: "#23708f",
    pos: "lg:right-0 lg:top-[60%]",
    anchor: [69, 72],
    items: [{ label: "Share medical report" }, { label: "Messages", to: ["Clinics, doctors and caregivers"] }],
  },
  {
    title: "Patient records",
    color: "#5C5A5A",
    ink: "#5C5A5A",
    pos: "lg:left-[35%] lg:top-[66%] lg:w-[30%]!",
    anchor: [50, 66],
    items: [{ label: "Reports" }, { label: "Medical records" }, { label: "Adherence score" }, { label: "Set new therapy goal" }],
  },
]

const hub: [number, number] = [50, 34]

export function ArcPortalArchitecture() {
  return (
    <figure className="my-4 rounded-[24px] bg-[#f4f6fa] p-5 ring-1 ring-black/5 sm:p-8">
      <div className="relative grid gap-4 lg:block lg:h-[640px]">
        {/* curved connectors from the hub (lg only) */}
        <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block">
          {clusters.map((c) => {
            const [x, y] = c.anchor
            const mx = (hub[0] + x) / 2
            return (
              <path
                key={c.title}
                d={`M${hub[0]},${hub[1]} C${mx},${hub[1]} ${mx},${y} ${x},${y}`}
                fill="none"
                stroke={c.color}
                strokeWidth="2"
                strokeDasharray="6 5"
                vectorEffect="non-scaling-stroke"
              />
            )
          })}
        </svg>

        {/* hub */}
        <div className="z-10 mx-auto grid size-36 place-items-center rounded-full bg-[#02594e] text-center text-white shadow-[0_14px_30px_-12px_rgba(2,89,78,0.6)] ring-8 ring-white lg:absolute lg:top-[34%] lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
          <span>
            <span className="block text-[11px] font-semibold tracking-[0.16em] text-white/70 uppercase">Home</span>
            <span className="font-heading text-[22px] font-semibold">Dashboard</span>
          </span>
        </div>

        {clusters.map((c) => (
          <div key={c.title} className={cn("relative z-10 rounded-2xl border-l-4 bg-white p-4 shadow-[0_8px_24px_-16px_rgba(16,24,40,0.35)] lg:absolute lg:w-[31%]", c.pos)} style={{ borderColor: c.color }}>
            <p className="flex items-center gap-2 text-[13px] font-semibold tracking-[0.08em] uppercase" style={{ color: c.ink }}>
              <span className="size-2.5 rounded-full" style={{ background: c.color }} />
              {c.title}
            </p>
            <ul className="mt-2.5 grid gap-1.5">
              {c.items.map((it) => (
                <li key={it.label} className="text-[15px] leading-snug text-ink">
                  {it.label}
                  {it.to && (
                    <span className="mt-1 flex flex-wrap gap-1.5">
                      {it.to.map((t) => (
                        <span key={t} className="rounded-full px-2 py-0.5 text-[12px] font-medium" style={{ background: `${c.color}1f`, color: c.ink }}>
                          → {t}
                        </span>
                      ))}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </figure>
  )
}

/* ---------------- annotated screen ---------------- */

type AnnotatedBlock = Extract<Block, { type: "annotatedScreen" }>

function Pin({ n, className, style }: { n: number; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={cn("grid size-6 shrink-0 place-items-center rounded-full bg-[#2e7fd6]/90 text-[12px] font-bold text-white ring-[3px] ring-white", className)} style={style}>
      {n}
    </span>
  )
}

export function AnnotatedScreenView({ block }: { block: AnnotatedBlock }) {
  const notes = block.notes.map((n, i) => ({ ...n, n: i + 1 }))
  const side = (s: "left" | "right") => notes.filter((n) => n.side === s)
  return (
    <figure className="my-6">
      <div className="lg:grid lg:grid-cols-[1fr_minmax(0,440px)_1fr] lg:gap-8">
        {(["left", "right"] as const).map((s) => (
          <div key={s} className={cn("relative hidden lg:block", s === "left" ? "lg:order-1" : "lg:order-3")}>
            {side(s).map((n) => (
              <p
                key={n.n}
                className={cn("absolute inset-x-0 flex gap-2.5 font-hand text-[19px] leading-[1.15] font-bold text-[#1f5fae]", s === "left" && "flex-row-reverse text-right")}
                style={{ top: `${n.noteY * 100}%` }}
              >
                <Pin n={n.n} className="mt-0.5" />
                <span>{n.text}</span>
              </p>
            ))}
          </div>
        ))}
        <div className="relative mx-auto max-w-[440px] lg:order-2">
          <Image
            src={block.image.src}
            alt={block.image.alt}
            width={block.image.width}
            height={block.image.height}
            sizes="440px"
            className="h-auto w-full rounded-[22px] shadow-[0_24px_50px_-28px_rgba(16,24,40,0.45)] ring-1 ring-black/5"
          />
          {notes.map((n) => (
            <Pin key={n.n} n={n.n} className="absolute -translate-x-1/2 -translate-y-1/2 shadow-md" style={{ left: `${n.x * 100}%`, top: `${n.y * 100}%` }} />
          ))}
        </div>
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

/* ---------------- photos ---------------- */

type PhotosBlock = Extract<Block, { type: "photos" }>

export function PhotosView({ block }: { block: PhotosBlock }) {
  return (
    <div className="my-6 grid gap-5 sm:grid-cols-2 sm:items-start">
      {block.items.map((p, i) => (
        <figure key={p.image.src} className={cn(i % 2 === 1 && "sm:mt-16")}>
          <Image
            src={p.image.src}
            alt={p.image.alt}
            width={p.image.width}
            height={p.image.height}
            sizes="(min-width: 1200px) 420px, (min-width: 640px) 45vw, 100vw"
            className="h-auto w-full rounded-[22px] object-cover"
          />
          {p.caption && <figcaption className="mt-3 text-[15px] leading-relaxed text-body">{p.caption}</figcaption>}
        </figure>
      ))}
    </div>
  )
}
