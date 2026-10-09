import { ArrowDown, ArrowRight, Atom, Calculator, FileSpreadsheet, FileText, NotebookPen, ScrollText, Sparkles, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// Coded diagrams for the Deep Research case study.

/* ---------------- Fragmented research vs. one connected workflow ---------------- */

const tools: { label: string; icon: LucideIcon; x: number; y: number }[] = [
  { label: "Literature databases", icon: FileText, x: 6, y: 8 },
  { label: "Patent platforms", icon: ScrollText, x: 50, y: 2 },
  { label: "Molecular tools", icon: Atom, x: 52, y: 70 },
  { label: "Spreadsheets", icon: FileSpreadsheet, x: 2, y: 62 },
  { label: "Calculations", icon: Calculator, x: 36, y: 84 },
  { label: "Internal notes", icon: NotebookPen, x: 58, y: 34 },
]

const journey = ["Ask", "Explore", "Evaluate", "Modify", "Scale", "Verify"]
const tones = ["var(--tone-green)", "var(--tone-purple)", "var(--tone-blue)", "var(--tone-orange)"]

export function DrFragmented() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Before */}
      <figure className="flex flex-col rounded-[22px] border border-dashed border-soft/40 p-5 md:p-6">
        <figcaption className="text-[11px] font-semibold tracking-[0.12em] text-soft uppercase">Today · a collection of searches</figcaption>
        <div className="relative mt-4 aspect-[5/4] w-full">
          {/* broken links from the question to each tool */}
          <svg viewBox="0 0 100 80" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
            {tools.map((t) => (
              <line
                key={t.label}
                x1="50"
                y1="40"
                x2={t.x + 12}
                y2={t.y * 0.8 + 5}
                stroke="var(--soft)"
                strokeOpacity="0.45"
                strokeWidth="0.4"
                strokeDasharray="1.2 1.6"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
          <span className="absolute top-1/2 left-1/2 z-10 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink font-heading text-2xl font-bold text-white shadow-lg">
            ?
          </span>
          {tools.map((t, i) => (
            <span
              key={t.label}
              className="absolute inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[12px] font-medium whitespace-nowrap text-ink shadow-[0_1px_2px_rgba(16,24,40,0.08)] sm:text-[13px]"
              style={{ left: `${t.x}%`, top: `${t.y}%`, rotate: `${[-4, 3, -2, 4, -3, 2][i]}deg` }}
            >
              <t.icon className="size-3.5 text-soft" aria-hidden />
              {t.label}
            </span>
          ))}
        </div>
        <p className="mt-4 text-[15px] leading-snug text-body">Findings, sources and decisions drift away from the original question.</p>
      </figure>

      {/* After */}
      <figure className="flex flex-col rounded-[22px] p-5 md:p-6" style={{ background: "linear-gradient(150deg,#f3eefc,#f6f5ff 55%,#e6f2fe)" }}>
        <figcaption className="text-[11px] font-semibold tracking-[0.12em] text-[var(--tone-purple-ink)] uppercase">Deep Research · one continuous investigation</figcaption>
        <div className="mt-4 flex flex-1 flex-col justify-center gap-2 rounded-[18px] bg-white/80 p-4 shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
          <p className="flex items-center gap-2 rounded-xl bg-[var(--tone-purple)] px-3.5 py-2.5 text-[14px] font-medium text-[var(--on-purple)]">
            <Sparkles className="size-4 shrink-0" aria-hidden />A scientific question
          </p>
          <ol className="grid grid-cols-3 gap-2">
            {journey.map((s, i) => (
              <li key={s} className="flex items-center gap-2 rounded-xl bg-[#f7f7f8] px-3 py-2.5 text-[14px] font-semibold text-ink">
                <span className="size-2 shrink-0 rounded-full" style={{ background: tones[i % tones.length] }} aria-hidden />
                {s}
              </li>
            ))}
          </ol>
          <p className="flex items-center gap-2 rounded-xl border border-brand/20 bg-[#e4f1eb] px-3.5 py-2.5 text-[14px] font-semibold text-brand">
            <ArrowRight className="size-4 shrink-0" aria-hidden />
            An evidence-backed research decision
          </p>
        </div>
        <p className="mt-4 text-[15px] leading-snug text-body">Context, evidence and decisions stay attached to the question.</p>
      </figure>
    </div>
  )
}

/* ---------------- Core research flow ---------------- */

function Node({ children, strong, tone }: { children: string; strong?: boolean; tone?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xl px-3 py-2 text-[14px] leading-tight font-medium",
        strong ? (tone === "var(--tone-purple)" ? "text-[var(--on-purple)]" : "text-white") : "bg-white text-ink shadow-[0_1px_2px_rgba(16,24,40,0.06)] ring-1 ring-black/[0.04]"
      )}
      style={strong ? { background: tone } : undefined}
    >
      {children}
    </span>
  )
}

function Chain({ items, tone, strongFirst }: { items: string[]; tone: string; strongFirst?: boolean }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
      {items.map((it, i) => (
        <li key={it} className="flex items-center gap-1.5">
          <Node strong={strongFirst && i === 0} tone={tone}>
            {it}
          </Node>
          {i < items.length - 1 && <ArrowRight className="size-3.5 shrink-0 text-soft" aria-hidden />}
        </li>
      ))}
    </ol>
  )
}

function Lane({ n, title, tone, children }: { n: string; title: string; tone: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-3 md:grid-cols-[150px_1fr] md:gap-6">
      <p className="flex items-center gap-2 md:flex-col md:items-start md:gap-1">
        <span className="text-[11px] font-bold tabular-nums" style={{ color: tone }}>
          {n}
        </span>
        <span className="font-heading text-lg leading-tight font-semibold text-ink">{title}</span>
      </p>
      <div>{children}</div>
    </div>
  )
}

function Down() {
  return (
    <div className="flex md:pl-[174px]" aria-hidden>
      <ArrowDown className="size-4 text-soft" />
    </div>
  )
}

export function DrUserFlow() {
  return (
    <div className="grid gap-3 rounded-[24px] bg-white/60 p-5 ring-1 ring-black/[0.03] md:p-8">
      <Lane n="01" title="Ask" tone="var(--tone-green)">
        <Chain
          tone="var(--tone-green)"
          strongFirst
          items={["Landing / Research Home", "Ask a question", "Understand intent", "Resolve molecule / scientific context", "Generate research"]}
        />
      </Lane>
      <Down />
      <Lane n="02" title="Explore" tone="var(--tone-purple)">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div className="rounded-[16px] bg-[#f3eefc]/70 p-3">
            <p className="mb-2 text-[11px] font-semibold tracking-[0.12em] text-[var(--tone-purple-ink)] uppercase">Routes branch</p>
            <Chain tone="var(--tone-purple)" strongFirst items={["Routes", "Compare", "Select route", "Route analysis", "Modify path", "Scale"]} />
          </div>
          <div className="rounded-[16px] bg-[#e6f2fe]/80 p-3">
            <p className="mb-2 text-[11px] font-semibold tracking-[0.12em] text-[var(--tone-blue)] uppercase">Literature branch</p>
            <Chain tone="var(--tone-blue)" strongFirst items={["Literature", "Explore"]} />
          </div>
        </div>
      </Lane>
      <Down />
      <Lane n="03" title="Verify & continue" tone="var(--tone-orange)">
        <Chain tone="var(--tone-orange)" strongFirst items={["Sources / Evidence", "Save research", "Research Vault", "Continue later"]} />
      </Lane>
    </div>
  )
}
