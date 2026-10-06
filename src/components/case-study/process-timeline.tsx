import type { Block } from "@/lib/case-studies/types"
import { cn } from "@/lib/utils"

type PhasesBlock = Extract<Block, { type: "phases" }>

const panel = "radial-gradient(120% 90% at 25% 0%, #0b2a7a 0%, #04114a 42%, #000229 100%)"

function Dot({ double }: { double?: boolean }) {
  return (
    <span className="flex gap-[3px]" aria-hidden>
      <span className="size-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
      {double && <span className="size-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]" />}
    </span>
  )
}

/** Tapered glow between two phase markers, widest just before the next phase. */
function Glow({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#1068E7" stopOpacity="0" />
          <stop offset="0.75" stopColor="#1068E7" stopOpacity="0.55" />
          <stop offset="1" stopColor="#1068E7" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <path d="M8,20 C40,19 62,6 82,6 C92,6 97,16 100,20 C97,24 92,34 82,34 C62,34 40,21 8,20 Z" fill={`url(#${id})`} />
    </svg>
  )
}

export function ProcessTimeline({ block }: { block: PhasesBlock }) {
  const n = block.items.length
  return (
    <div className="overflow-hidden rounded-[24px] text-white" style={{ background: panel }}>
      {/* ---------- Desktop: horizontal timeline ---------- */}
      <div className="hidden px-10 pt-10 pb-12 md:block">
        {/* Stats */}
        <div className="grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {block.items.map((p) =>
            p.stat ? (
              <p key={p.phase} className="flex items-end gap-2">
                <span className="font-heading text-[64px] leading-[0.85] font-bold tracking-[-0.03em] lg:text-[80px]">
                  {p.stat.value}
                </span>
                <span className="mb-1 text-base text-white/85">{p.stat.unit}</span>
              </p>
            ) : (
              <span key={p.phase} />
            )
          )}
        </div>

        {/* Phase names */}
        <div className="mt-12 grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {block.items.map((p) => (
            <h4 key={p.phase} className="text-2xl font-medium text-white">
              {p.phase}
            </h4>
          ))}
        </div>

        {/* Line, glows and markers (line bleeds to the panel edges) */}
        <div className="relative -mx-10 my-6 h-12">
          <span aria-hidden className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#5d8fe0]/70" />
          <div className="absolute inset-y-0 right-10 left-10 grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
            {block.items.map((p, i) => (
              <div key={p.phase} className="relative flex items-center">
                <Glow id={`glow-${i}`} />
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
        <div className="grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {block.items.map((p) => (
            <ul key={p.phase} className="grid content-start gap-3 pr-6">
              {p.items.map((item) => (
                <li key={item} className="text-[17px] text-white/90">
                  {item}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* ---------- Mobile: vertical timeline ---------- */}
      <ol className="grid gap-0 p-6 md:hidden">
        {block.items.map((p, i) => (
          <li key={p.phase} className="relative pb-8 pl-8 last:pb-0">
            {i < n - 1 && (
              <span
                aria-hidden
                className="absolute top-3 bottom-0 left-[5px] w-px bg-gradient-to-b from-[#5d8fe0] to-[#1068E7]/30"
              />
            )}
            <span aria-hidden className="absolute top-1.5 left-0 size-3 rounded-full bg-white shadow-[0_0_10px_rgba(16,104,231,0.9)]" />
            <h4 className="text-xl font-medium">{p.phase}</h4>
            {p.stat && (
              <p className="mt-2 flex items-end gap-1.5">
                <span className="font-heading text-[44px] leading-[0.85] font-bold">{p.stat.value}</span>
                <span className="mb-0.5 text-sm text-white/80">{p.stat.unit}</span>
              </p>
            )}
            <ul className="mt-3 grid gap-1.5">
              {p.items.map((item) => (
                <li key={item} className="text-[15px] text-white/85">
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}
