import { Source_Serif_4 } from "next/font/google"
import { MicOff, MonitorUp, PhoneOff, Users, VideoOff } from "lucide-react"
import type { Block } from "@/lib/case-studies/types"
import { cn } from "@/lib/utils"

// Editorial serif for verbatim quotes
const serif = Source_Serif_4({ subsets: ["latin"], weight: ["500", "600"] })

const tileTints = [
  "linear-gradient(135deg,#dfe9f5,#c9d8ea)",
  "linear-gradient(135deg,#e6e2fb,#d3cdf6)",
  "linear-gradient(135deg,#e4efe9,#cfe3d8)",
  "linear-gradient(135deg,#f7e6d6,#efd3ba)",
  "linear-gradient(135deg,#2a3346,#1b2232)",
]

type InterviewsBlock = Extract<Block, { type: "interviews" }>
type QuotesBlock = Extract<Block, { type: "quotes" }>
type PerspectiveBlock = Extract<Block, { type: "perspective" }>

function Tile({ role, moderator, tint, big }: { role: string; moderator?: boolean; tint: string; big?: boolean }) {
  return (
    <div
      className={cn("relative grid place-items-center overflow-hidden rounded-xl", big ? "aspect-[16/10]" : "aspect-[4/3]")}
      style={{ background: tint }}
    >
      <span
        className={cn(
          "grid place-items-center rounded-full",
          big ? "size-11 -translate-y-2 sm:size-20 sm:translate-y-0" : "size-8 -translate-y-2.5 sm:size-14 sm:translate-y-0",
          moderator ? "bg-white/10 text-white/80" : "bg-white/70 text-ink/60"
        )}
      >
        <VideoOff className={big ? "size-5 sm:size-7" : "size-3.5 sm:size-5"} aria-hidden />
      </span>
      <span
        className={cn(
          "absolute bottom-1.5 left-1.5 inline-flex max-w-[calc(100%-0.75rem)] items-center gap-1 rounded-md px-1.5 py-0.5 text-[9px] font-semibold sm:bottom-2 sm:left-2 sm:px-2 sm:text-xs",
          moderator ? "bg-white/15 text-white" : "bg-black/55 text-white"
        )}
      >
        <MicOff className="size-2.5 shrink-0 sm:size-3" aria-hidden />
        <span className="truncate">{role}</span>
      </span>
    </div>
  )
}

export function InterviewsView({ block }: { block: InterviewsBlock }) {
  const [a, b, ...rest] = block.tiles
  return (
    <figure className="my-2">
      <div className="glass rounded-[20px] p-3 shadow-[0_1px_2px_rgba(16,24,40,0.03)] sm:p-4">
        {/* Call window chrome */}
        <div className="mb-3 flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-red-500 motion-safe:animate-pulse" aria-hidden />
            <span className="text-xs font-semibold text-ink sm:text-sm">Research interview</span>
            <span className="text-xs text-soft max-sm:hidden">· Ventilator UI study</span>
          </div>
          <span className="inline-flex items-center gap-1 text-xs text-soft">
            <Users className="size-3.5" aria-hidden /> {block.total} sessions
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {[a, b].map((t, i) => (
            <Tile key={t.role} role={t.role} moderator={t.moderator} tint={tileTints[i]} big />
          ))}
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2 sm:mt-3 sm:gap-3">
          {rest.map((t, i) => (
            <Tile key={t.role} role={t.role} moderator={t.moderator} tint={t.moderator ? tileTints[4] : tileTints[i + 2]} />
          ))}
        </div>

        {/* Call controls */}
        <div className="mt-3 flex justify-center gap-2" aria-hidden>
          {[MicOff, VideoOff, MonitorUp].map((Icon, i) => (
            <span key={i} className="grid size-8 place-items-center rounded-full bg-sand text-ink/70">
              <Icon className="size-4" />
            </span>
          ))}
          <span className="grid h-8 w-12 place-items-center rounded-full bg-red-500 text-white">
            <PhoneOff className="size-4" />
          </span>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-[15px] font-medium text-soft">{block.caption}</figcaption>

      {/* Who took part */}
      <div className="mt-6 flex flex-col gap-4 rounded-[20px] border border-line p-5 sm:flex-row sm:items-center sm:gap-6">
        <div className="shrink-0">
          <p className="font-heading text-[44px] leading-none font-semibold text-brand">{block.total}</p>
          <p className="mt-1 max-w-[180px] text-sm text-body">{block.totalLabel}</p>
        </div>
        <ul className="flex flex-wrap gap-2 sm:border-l sm:border-line sm:pl-6">
          {block.groups.map((g) => (
            <li key={g.label} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-ink">
              {g.count && <span className="font-semibold text-brand">{g.count}</span>}
              {g.label}
            </li>
          ))}
        </ul>
      </div>
    </figure>
  )
}

export function QuotesView({ block }: { block: QuotesBlock }) {
  // Two independent columns, right one offset, for a conversation-like stagger
  const cols = [block.items.filter((_, i) => i % 2 === 0), block.items.filter((_, i) => i % 2 === 1)]
  return (
    <div className="grid gap-4 md:grid-cols-2 md:items-start">
      {cols.map((col, c) => (
        <div key={c} className={cn("grid gap-4", c === 1 && "md:mt-14")}>
          {col.map((q) => (
            <blockquote key={q.quote} className="rounded-[18px] bg-white/80 p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)] md:p-7">
              <p className={cn(serif.className, "text-[20px] leading-[1.45] font-semibold text-ink md:text-[22px]")}>
                “{q.quote}”
              </p>
              <footer className={cn(serif.className, "mt-3 text-base text-body")}>— {q.by}</footer>
            </blockquote>
          ))}
        </div>
      ))}
    </div>
  )
}

export function PerspectiveView({ block }: { block: PerspectiveBlock }) {
  return (
    <aside className="rounded-[20px] border-l-4 border-brand bg-white/70 p-6 md:p-7">
      <p className="text-[11px] font-semibold tracking-[0.12em] text-soft uppercase">Stakeholder perspective</p>
      <p className="mt-1 font-heading text-xl font-semibold text-ink">{block.from}</p>
      <p className="mt-1 text-sm text-body">{block.context}</p>
      <ul className="mt-4 grid gap-3">
        {block.items.map((item) => (
          <li key={item} className={cn(serif.className, "text-lg leading-snug text-ink")}>
            “{item}”
          </li>
        ))}
      </ul>
    </aside>
  )
}
