import Image from "next/image"
import { ArrowUpRight, Camera, Clapperboard } from "lucide-react"
import type { Block } from "@/lib/case-studies/types"
import { DemoVideo } from "./demo-video"

// Real Deep Research screenshots and demo clips (taken from Sathi's product walkthrough video),
// shown in a light browser frame on the case study's soft stage.

type MediaBlock = Extract<Block, { type: "media" }>
type Item = MediaBlock["items"][number]

const stage = "linear-gradient(130deg,#efedfb 0%,#f4f2f6 50%,#f2efe8 100%)"

function Frame({ item, sizes }: { item: Item; sizes: string }) {
  return (
    <div className="overflow-hidden rounded-[12px] bg-white shadow-[0_24px_60px_-28px_rgba(31,57,45,0.45)] ring-1 ring-black/[0.06]">
      {/* browser bar */}
      <div className="flex items-center gap-1.5 border-b border-black/[0.06] bg-[#f6f5f2] px-3 py-2">
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span key={c} className="size-2 rounded-full" style={{ background: c }} aria-hidden />
        ))}
        <span className="ml-2 truncate text-[10.5px] font-medium text-[#6b6b6b]">SCINODE · Deep Research</span>
      </div>
      {item.kind === "video" ? (
        <DemoVideo src={item.src} poster={item.poster} width={item.width} height={item.height} label={item.alt} />
      ) : (
        <a href={item.src} target="_blank" rel="noopener" className="group relative block" aria-label={`${item.alt} (open full size)`}>
          <Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes={sizes} className="h-auto w-full" />
          <span className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100">
            <ArrowUpRight className="size-4" aria-hidden />
          </span>
        </a>
      )}
    </div>
  )
}

export function MediaView({ block }: { block: MediaBlock }) {
  // Always one column at the full width of the section (Sathi prefers big media over pairs)
  return (
    <div className="grid gap-8">
      {block.items.map((item) => (
        <figure key={item.src} className="min-w-0">
          <div className="rounded-[20px] p-2 sm:p-3" style={{ background: stage }}>
            <Frame item={item} sizes="(min-width: 1200px) 920px, 100vw" />
          </div>
          <figcaption className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 px-1 text-[14px] leading-snug font-medium text-body md:text-[15px]">
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10.5px] font-semibold tracking-[0.08em] text-[#1f392d] uppercase">
              {item.kind === "video" ? <Clapperboard className="size-3" aria-hidden /> : <Camera className="size-3" aria-hidden />}
              {item.kind === "video" ? "Live demo" : "Product"}
            </span>
            {item.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
