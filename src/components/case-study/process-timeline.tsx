import type { Block } from "@/lib/case-studies/types"
import { cn } from "@/lib/utils"

type PhasesBlock = Extract<Block, { type: "phases" }>

// One colour per phase, from the site palette
const phaseTones = ["var(--tone-green)", "var(--tone-purple)", "var(--tone-blue)", "var(--tone-orange)"]

function Dot({ double }: { double?: boolean }) {
  return (
    <span className="flex gap-[3px]" aria-hidden>
      <span className="size-2.5 rounded-full bg-ink ring-4 ring-cream" />
      {double && <span className="size-2.5 rounded-full bg-ink ring-4 ring-cream" />}
    </span>
  )
}

/** Tapered glow between two phase markers, widest just before the next phase. */
function Glow({ id, color }: { id: string; color: string }) {
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={color} stopOpacity="0" />
          <stop offset="0.75" stopColor={color} stopOpacity="0.35" />
          <stop offset="1" stopColor={color} stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <path d="M8,20 C40,19 62,6 82,6 C92,6 97,16 100,20 C97,24 92,34 82,34 C62,34 40,21 8,20 Z" fill={`url(#${id})`} />
    </svg>
  )
}

export function ProcessTimeline({ block }: { block: PhasesBlock }) {
  const n = block.items.length
  const cols = { gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }
  return (
    <div className="py-2">
      {/* ---------- Desktop: horizontal timeline ---------- */}
      <div className="hidden md:block">
        {/* Stats */}
        <div className="grid" style={cols}>
          {block.items.map((p, i) =>
            p.stat ? (
              <p key={p.phase} className="flex items-end gap-2">
                <span
                  className="font-heading text-[64px] leading-[0.85] font-bold tracking-[-0.03em] lg:text-[80px]"
                  style={{ color: phaseTones[i % phaseTones.length] }}
                >
                  {p.stat.value}
                </span>
                <span className="mb-1 text-base text-body">{p.stat.unit}</span>
              </p>
            ) : (
              <span key={p.phase} />
            )
          )}
        </div>

        {/* Phase names */}
        <div className="mt-10 grid" style={cols}>
          {block.items.map((p) => (
            <h4 key={p.phase} className="text-2xl font-medium text-ink">
              {p.phase}
            </h4>
          ))}
        </div>

        {/* Line, glows and markers */}
        <div className="relative my-5 h-12">
          <span aria-hidden className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ink/25" />
          <div className="absolute inset-0 grid" style={cols}>
            {block.items.map((p, i) => (
              <div key={p.phase} className="relative flex items-center">
                <Glow id={`glow-${i}`} color={phaseTones[i % phaseTones.length]} />
                <span className={cn("relative z-10", i > 0 && "-ml-[13px]")}>
                  <Dot double={i > 0} />
                </span>
                {i === n - 1 && (
                  <span className="absolute right-0 z-10">
                    <Dot />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="grid" style={cols}>
          {block.items.map((p) => (
            <ul key={p.phase} className="grid content-start gap-3 pr-6">
              {p.items.map((item) => (
                <li key={item} className="text-[17px] text-body">
                  {item}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* ---------- Mobile: vertical timeline ---------- */}
      <ol className="grid md:hidden">
        {block.items.map((p, i) => {
          const tone = phaseTones[i % phaseTones.length]
          return (
            <li key={p.phase} className="relative pb-8 pl-8 last:pb-0">
              {i < n - 1 && <span aria-hidden className="absolute top-3 bottom-0 left-[5px] w-px bg-ink/20" />}
              <span aria-hidden className="absolute top-1.5 left-0 size-3 rounded-full ring-4 ring-cream" style={{ background: tone }} />
              <h4 className="text-xl font-medium text-ink">{p.phase}</h4>
              {p.stat && (
                <p className="mt-2 flex items-end gap-1.5">
                  <span className="font-heading text-[44px] leading-[0.85] font-bold" style={{ color: tone }}>
                    {p.stat.value}
                  </span>
                  <span className="mb-0.5 text-sm text-body">{p.stat.unit}</span>
                </p>
              )}
              <ul className="mt-3 grid gap-1.5">
                {p.items.map((item) => (
                  <li key={item} className="text-[15px] text-body">
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
