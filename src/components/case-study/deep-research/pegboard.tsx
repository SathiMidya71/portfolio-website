import Image from "next/image"
import type { Block } from "@/lib/case-studies/types"

// Ideation pegboard: Sathi's notebook sketches pinned to a perforated board with push pins,
// slight tilts and handwritten tags. Photos are cleaned up (paper whitened, ink sharpened).

type PegBlock = Extract<Block, { type: "pegboard" }>

const tilts = [-2.2, 1.6, -1, 2.4, -1.8, 1.1, -2.6, 1.9]
const pins = ["#e8833a", "#b79cec", "#1f392d", "#2e90fa"]

export function PegboardView({ block }: { block: PegBlock }) {
  return (
    <div
      className="relative overflow-hidden rounded-[22px] border-[10px] border-[#c9a77c] p-5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.25),0_24px_50px_-26px_rgba(70,45,15,0.55)] sm:p-8"
      style={{
        backgroundColor: "#d8b98e",
        backgroundImage:
          "radial-gradient(circle at 50% 50%, rgba(70,45,15,0.55) 0 2.2px, rgba(255,255,255,0.15) 2.6px, transparent 3.2px), linear-gradient(135deg, rgba(255,255,255,0.12), rgba(0,0,0,0.06))",
        backgroundSize: "26px 26px, 100% 100%",
      }}
    >
      {block.title && (
        <p className="relative mx-auto mb-8 w-fit -rotate-1 bg-[#fffdf5] px-5 py-2 font-hand text-[30px] leading-none font-bold text-[#1f392d] shadow-[0_6px_14px_-6px_rgba(0,0,0,0.4)] md:text-[38px]">
          {block.title}
        </p>
      )}
      <ul className="columns-2 gap-5 md:columns-3 md:gap-7 [&>li]:mb-7">
        {block.items.map((it, i) => (
          <li key={it.src} className="break-inside-avoid">
            <a
              href={it.src}
              target="_blank"
              rel="noopener"
              aria-label={`${it.caption} (open the sketch full size)`}
              className="group relative block bg-white p-2 pb-3 shadow-[0_2px_3px_rgba(0,0,0,0.18),0_14px_24px_-12px_rgba(40,25,5,0.55)] transition-transform duration-300 hover:z-10 hover:scale-[1.04] hover:rotate-0 sm:p-2.5"
              style={{ rotate: `${tilts[i % tilts.length]}deg` }}
            >
              {/* push pin */}
              <span aria-hidden className="absolute -top-2 left-1/2 z-10 -translate-x-1/2">
                <span className="block size-5 rounded-full shadow-[0_3px_4px_rgba(0,0,0,0.45)]" style={{ background: `radial-gradient(circle at 35% 30%, #fff8 0 18%, ${pins[i % pins.length]} 22%)` }} />
              </span>
              <Image
                src={it.src}
                alt={it.alt}
                width={it.width}
                height={it.height}
                sizes="(min-width: 1200px) 280px, (min-width: 768px) 30vw, 45vw"
                className="h-auto w-full"
              />
              <p className="mt-2 px-1 font-hand text-[19px] leading-[1.05] font-bold text-[#2e4fa8] md:text-[21px]">{it.caption}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
