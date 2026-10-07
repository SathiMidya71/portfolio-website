import { FileText, ScrollText, Sparkles } from "lucide-react"
import { ProductMockSvg, inter } from "./mocks"

// Coded hero for Deep Research: the research workspace wireframe on a soft stage, with the
// journey and two floating cards that echo molecule resolution and evidence.

const steps = ["Ask", "Explore", "Evaluate", "Modify", "Scale", "Verify"]

export function DeepResearchHero() {
  return (
    <div
      className="relative overflow-hidden rounded-[24px] px-4 pt-14 pb-4 sm:px-10 sm:pt-20 sm:pb-0 lg:px-24"
      style={{ background: "radial-gradient(120% 90% at 50% 0%, #ffffff 0%, #f1effd 45%, #e3e8fb 100%)" }}
    >
      <span aria-hidden className="pointer-events-none absolute -top-24 -left-20 size-80 rounded-full bg-[var(--tone-purple)]/15 blur-3xl" />
      <span aria-hidden className="pointer-events-none absolute -right-16 bottom-0 size-72 rounded-full bg-[var(--tone-blue)]/15 blur-3xl" />

      {/* journey */}
      <ol className={`${inter.className} absolute top-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-white/85 p-1 shadow-sm ring-1 ring-black/5 backdrop-blur sm:top-6`}>
        {steps.map((s, i) => (
          <li
            key={s}
            className={`rounded-full px-2 py-1 text-[10px] font-semibold sm:px-3 sm:text-[12px] ${i === 0 ? "bg-[var(--tone-purple)] text-white" : "text-[#6B6B6B]"}`}
          >
            {s}
          </li>
        ))}
      </ol>

      <div className="relative mx-auto max-w-[920px]">
        <ProductMockSvg view="workspace" className="drop-shadow-[0_30px_60px_rgba(52,45,140,0.22)] sm:translate-y-[2px]" />

        {/* floating: molecule */}
        <div className={`${inter.className} absolute top-[30%] -left-[10%] hidden w-[160px] rounded-2xl bg-white p-4 shadow-[0_20px_40px_-12px_rgba(52,45,140,0.3)] ring-1 ring-black/5 lg:block`}>
          <p className="text-[10px] font-semibold tracking-[0.1em] text-[#6B6B6B] uppercase">Molecule resolved</p>
          <p className="mt-1 text-[15px] font-semibold text-[#171717]">Aspirin</p>
          <dl className="mt-2 grid gap-1 text-[11px]">
            {[
              ["CAS", "50-78-2"],
              ["MW", "180.16 g/mol"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-2">
                <dt className="text-[#6B6B6B]">{k}</dt>
                <dd className="font-mono text-[#171717]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* floating: evidence */}
        <div className={`${inter.className} absolute -right-[9%] bottom-[16%] hidden w-[210px] rounded-2xl bg-white p-4 shadow-[0_20px_40px_-12px_rgba(52,45,140,0.3)] ring-1 ring-black/5 lg:block`}>
          <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.1em] text-[var(--tone-purple)] uppercase">
            <Sparkles className="size-3.5" aria-hidden /> Evidence for Route A
          </p>
          {[FileText, ScrollText, FileText].map((I, i) => (
            <div key={i} className="mt-2 flex items-center gap-2 rounded-lg bg-[#F7F7F8] px-2 py-1.5">
              <I className="size-3.5 text-[#6B6B6B]" aria-hidden />
              <span className="h-1.5 rounded-full bg-[#DDDDE2]" style={{ width: [120, 96, 110][i] }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
