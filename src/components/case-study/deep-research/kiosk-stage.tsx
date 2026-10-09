import Image from "next/image"
import type { Block } from "@/lib/case-studies/types"

// Presentation mockup modelled on Sathi's touchscreen-kiosk reference: a huge faint title on the
// page background, partly hidden behind the monitor, and a black monitor tilted back on a stand. The monitor is coded; only the screen
// is an image (a real Deep Research screenshot).

type KioskBlock = Extract<Block, { type: "kioskStage" }>

export function KioskStageView({ block }: { block: KioskBlock }) {
  return (
    <figure className="my-2">
      <div
        className="relative isolate aspect-[16/10] overflow-hidden [container-type:inline-size]"
      >
        {/* huge faint title */}
        <p
          aria-hidden
          className="absolute inset-x-0 top-[0%] text-center font-heading text-[15.5cqw] leading-none font-semibold tracking-[-0.04em] whitespace-nowrap"
          style={{ color: "#e9e1d4" }}
        >
          {block.title}
        </p>

        {/* stand */}
        <div aria-hidden className="absolute bottom-0 left-1/2 h-[22%] w-[8%] -translate-x-1/2 rounded-t-[1cqw] bg-gradient-to-r from-[#0c0d0d] via-[#2a2c2c] to-[#0c0d0d]">
          <span className="absolute top-[18%] left-1/2 h-[55%] w-[34%] -translate-x-1/2 rounded-full bg-black/60" />
        </div>

        {/* monitor, tilted back */}
        <div className="absolute top-[7%] left-1/2 z-10 w-[72%] -translate-x-1/2 [perspective:260cqw]">
          <div
            className="relative rounded-[1cqw] bg-[#0b0c0c] p-[0.9cqw] shadow-[0_4cqw_5cqw_-2cqw_rgba(60,45,25,0.35)]"
            style={{ transform: "rotateX(30deg)", transformOrigin: "50% 100%" }}
          >
            {/* bezel edge highlight */}
            <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[1cqw] ring-1 ring-white/15" />
            <div className="relative overflow-hidden rounded-[0.35cqw]">
              <Image
                src={block.image.src}
                alt={block.image.alt}
                width={block.image.width}
                height={block.image.height}
                sizes="(min-width: 1200px) 780px, 85vw"
                className="h-auto w-full"
                priority={false}
              />
              <span aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0)_35%)]" />
            </div>
          </div>
          {/* thickness of the bottom edge */}
          <div aria-hidden className="mx-[1.2%] h-[1.4cqw] rounded-b-[0.8cqw] bg-gradient-to-b from-[#3a3c3c] to-[#0d0e0e]" />
        </div>
      </div>
      {block.caption && <figcaption className="mt-3 px-1 text-[14px] font-medium text-soft md:text-[15px]">{block.caption}</figcaption>}
    </figure>
  )
}
