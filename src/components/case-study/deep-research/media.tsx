import Image from "next/image"
import { ArrowUpRight, Camera, Clapperboard } from "lucide-react"
import type { Block } from "@/lib/case-studies/types"
import { cn } from "@/lib/utils"
import { DemoVideo } from "./demo-video"

// Real Deep Research screenshots and demo clips (taken from Sathi's product walkthrough video),
// shown in a light browser frame on the case study's soft stage.

type MediaBlock = Extract<Block, { type: "media" }>
type Item = MediaBlock["items"][number]

const stage = "linear-gradient(130deg,#f3eefc 0%,#f4f2f6 50%,#f2efe8 100%)"

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

// Pastel paper colours: [top, middle, bottom of the gradient, ink]
const paper = {
  lavender: ["#f3edff", "#e9defd", "#dccdf8", "#3a2a63"],
  mint: ["#eafaf1", "#d9f3e5", "#c6ead6", "#1f4634"],
  peach: ["#fff1e6", "#fde3cf", "#f8d2b5", "#5a3418"],
  sky: ["#eaf5ff", "#d9ecfd", "#c4e0f9", "#1d3f5f"],
  pink: ["#fff0f4", "#fde0e8", "#f8cdda", "#5c2337"],
  butter: ["#fff8d6", "#fdf0b8", "#f8e59a", "#4a3b0c"],
} as const

/** A slightly tilted paper note held on by a strip of tape, with a lifted-corner shadow. */
function StickyNote({ note }: { note: NonNullable<MediaBlock["note"]> }) {
  const right = note.side === "right"
  const [c1, c2, c3, ink] = paper[note.color ?? "butter"]
  return (
    <aside
      className={cn(
        // Sits above the screenshot and overlaps only its top bars (browser bar + app header)
        "relative z-20 -mb-7 w-[86%] max-w-[340px] shrink-0 sm:-mb-14 md:-mb-[72px] md:w-[320px]",
        right ? "mr-1 ml-auto md:-mr-4" : "mr-auto ml-1 md:-ml-4"
      )}
      style={{ rotate: right ? "2.2deg" : "-2.2deg" }}
    >
      {/* lifted-corner shadow */}
      <span
        aria-hidden
        className={cn("absolute bottom-1 h-8 w-[55%] bg-black/35 blur-[10px]", right ? "right-2 rotate-[4deg]" : "left-2 -rotate-[4deg]")}
      />
      <div
        className="relative px-6 pt-8 pb-6"
        style={{
          background: `linear-gradient(170deg, ${c1} 0%, ${c2} 60%, ${c3} 100%)`,
          boxShadow: "0 1px 1px rgba(0,0,0,0.08), 0 10px 18px -8px rgba(40,30,50,0.3), inset 0 -10px 18px -12px rgba(60,40,80,0.18)",
          borderRadius: right ? "2px 2px 2px 18px / 2px 2px 2px 8px" : "2px 2px 18px 2px / 2px 2px 8px 2px",
        }}
      >
        {/* tape */}
        <span
          aria-hidden
          className="absolute -top-3.5 left-1/2 h-7 w-28 -translate-x-1/2 border-x border-dashed border-white/50 bg-[#f4efe2]/75 shadow-[0_1px_3px_rgba(0,0,0,0.15)] backdrop-blur-[1px]"
          style={{ rotate: right ? "-4deg" : "4deg" }}
        />
        <p className="font-hand text-[30px] leading-none font-bold" style={{ color: ink }}>{note.title}</p>
        <ul className="mt-3 grid gap-2">
          {note.items.map((n) => (
            <li key={n} className="flex gap-2 text-[14.5px] leading-snug" style={{ color: ink }}>
              <span aria-hidden className="mt-[0.45em] size-1.5 shrink-0 rounded-full opacity-70" style={{ background: ink }} />
              {n}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export function MediaView({ block }: { block: MediaBlock }) {
  // Always one column at the full width of the section (Sathi prefers big media over pairs)
  return (
    <div className="grid gap-8">
      {block.items.map((item, i) => (
        <figure key={item.src} className="relative min-w-0">
          {i === 0 && block.note && (
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:gap-8">
              {(block.heading || block.intro) && (
                <div className="min-w-0 flex-1 md:pb-8">
                  {block.heading && <h3 className="text-[22px] leading-tight text-ink md:text-[26px]">{block.heading}</h3>}
                  {block.intro && <p className="mt-4 text-lg leading-[1.65] text-ink/90 md:text-xl">{block.intro}</p>}
                </div>
              )}
              <StickyNote note={block.note} />
            </div>
          )}
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
