import Image from "next/image"
import type { Block } from "@/lib/case-studies/types"

// Presentation mockup modelled on Sathi's "Neoverse" reference: a huge title behind a laptop on a
// glowing podium, re-coloured to the site's green and beige with a green neon glow. The laptop,
// podium and lights are coded; only the screen is an image (a real Deep Research screenshot).

type LaptopBlock = Extract<Block, { type: "laptopStage" }>

const neon = "#3ee0a1"
const beige = "#f2ece3"

export function LaptopStageView({ block }: { block: LaptopBlock }) {
  return (
    <figure className="my-2">
      <div
        className="relative isolate aspect-[16/11] overflow-hidden rounded-[28px] [container-type:inline-size] sm:aspect-[16/10.5]"
        style={{ background: "radial-gradient(120% 90% at 50% 78%, #0f3a2c 0%, #0a1f17 42%, #050c09 100%)" }}
      >
        {/* vertical light beams */}
        {[14, 27, 73, 86].map((x, i) => (
          <span
            key={x}
            aria-hidden
            className="absolute top-[6%] h-[62%] w-[0.5%] rounded-full blur-[2px]"
            style={{
              left: `${x}%`,
              background: `linear-gradient(to bottom, transparent, ${neon}${i % 2 ? "55" : "99"} 40%, transparent)`,
              boxShadow: `0 0 24px ${neon}66`,
            }}
          />
        ))}

        {/* corner chips */}
        {block.chips && (
          <div className="absolute inset-x-[4%] top-[4%] z-20 flex justify-between gap-2">
            <span className="rounded-full border px-[1.6cqw] py-[0.5cqw] text-[1.6cqw] font-semibold" style={{ borderColor: `${neon}88`, color: neon, background: `${neon}14` }}>
              {block.chips[0]}
            </span>
            <span className="flex gap-[1cqw]">
              {block.chips.slice(1).map((c) => (
                <span key={c} className="rounded-full border px-[1.6cqw] py-[0.5cqw] text-[1.6cqw] font-semibold" style={{ borderColor: `${neon}88`, color: neon, background: `${neon}14` }}>
                  {c}
                </span>
              ))}
            </span>
          </div>
        )}

        {/* huge title behind the laptop */}
        <p
          aria-hidden
          className="absolute inset-x-0 top-[11%] z-0 text-center font-heading text-[15cqw] leading-none font-bold tracking-[-0.045em] whitespace-nowrap"
        >
          <span style={{ color: neon, textShadow: `0 0 18px ${neon}aa, 0 0 60px ${neon}55` }}>{block.title[0]}</span>
          <span style={{ color: beige, textShadow: `0 0 30px ${beige}33` }}>{block.title[1]}</span>
        </p>

        {/* podium */}
        <div aria-hidden className="absolute bottom-[-8%] left-1/2 z-10 h-[22%] w-[80%] -translate-x-1/2">
          <div className="absolute inset-x-0 top-[22%] bottom-0 rounded-[50%] bg-gradient-to-b from-[#16241e] to-[#060b09]" />
          <div
            className="absolute inset-x-0 top-0 h-[44%] rounded-[50%] bg-gradient-to-b from-[#1b2d25] to-[#0d1813]"
            style={{ border: `2px solid ${neon}`, boxShadow: `0 0 28px ${neon}aa, 0 0 80px ${neon}55, inset 0 0 30px ${neon}33` }}
          />
        </div>

        {/* laptop */}
        <div className="absolute bottom-[11%] left-1/2 z-10 w-[56%] -translate-x-1/2">
          {/* screen */}
          <div className="relative rounded-t-[1.6cqw] border border-white/10 bg-[#0c0d0d] p-[1.1cqw] pb-[1.5cqw] shadow-[0_-10px_60px_-10px_rgba(62,224,161,0.35)]">
            <span aria-hidden className="absolute top-[0.45cqw] left-1/2 size-[0.45cqw] -translate-x-1/2 rounded-full bg-[#2a2c2c]" />
            <div className="relative overflow-hidden rounded-[0.4cqw]">
              <Image
                src={block.image.src}
                alt={block.image.alt}
                width={block.image.width}
                height={block.image.height}
                sizes="(min-width: 1200px) 640px, 70vw"
                className="h-auto w-full"
              />
              {/* glass reflection */}
              <span aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0)_38%)]" />
            </div>
          </div>
          {/* base */}
          <div aria-hidden className="relative -mx-[8%] h-[2.4cqw] rounded-t-[0.3cqw] rounded-b-[2cqw] bg-gradient-to-b from-[#4a4c4d] via-[#2a2c2d] to-[#111213] shadow-[0_18px_40px_-8px_rgba(0,0,0,0.8)]">
            <span className="absolute top-0 left-1/2 h-[45%] w-[16%] -translate-x-1/2 rounded-b-[1cqw] bg-[#1c1d1e]" />
          </div>
        </div>
      </div>
      {block.caption && <figcaption className="mt-3 px-1 text-[14px] font-medium text-soft md:text-[15px]">{block.caption}</figcaption>}
    </figure>
  )
}
