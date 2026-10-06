import { Source_Serif_4 } from "next/font/google"
import type { Block } from "@/lib/case-studies/types"
import { cn } from "@/lib/utils"

// Editorial serif for verbatim quotes
const serif = Source_Serif_4({ subsets: ["latin"], weight: ["500", "600"] })

type InterviewsBlock = Extract<Block, { type: "interviews" }>
type QuotesBlock = Extract<Block, { type: "quotes" }>
type PerspectiveBlock = Extract<Block, { type: "perspective" }>

export function InterviewsView({ block }: { block: InterviewsBlock }) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-line p-5 sm:flex-row sm:items-center sm:gap-6">
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
