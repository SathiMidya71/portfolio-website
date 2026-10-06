import Image from "next/image"
import type { Block, Tone } from "@/lib/case-studies/types"
import { cn } from "@/lib/utils"
import { LoopVideo } from "./loop-video"

type PhoneFlowBlock = Extract<Block, { type: "phoneFlow" }>
type IllustrationsBlock = Extract<Block, { type: "illustrations" }>
type VideoBlock = Extract<Block, { type: "video" }>

const tones: Record<Tone, { stroke: string; panel: string }> = {
  green: { stroke: "var(--tone-green)", panel: "linear-gradient(160deg,#eef6ee 0%,#e4f1eb 100%)" },
  purple: { stroke: "var(--tone-purple)", panel: "linear-gradient(160deg,#f2f0fe 0%,#e9e6fc 100%)" },
  orange: { stroke: "var(--tone-orange)", panel: "linear-gradient(160deg,#fdf3ea 0%,#fbe8d8 100%)" },
  blue: { stroke: "var(--tone-blue)", panel: "linear-gradient(160deg,#eef6fe 0%,#e1effd 100%)" },
}

/** A flow of phone screens on a soft tinted stage, with numbered steps. */
export function PhoneFlowView({ block }: { block: PhoneFlowBlock }) {
  const tone = tones[block.tone]
  return (
    <figure className="overflow-hidden rounded-[24px]" style={{ background: tone.panel }}>
      <figcaption className="flex flex-col gap-2 px-6 pt-6 sm:px-8 sm:pt-8 md:flex-row md:items-start md:justify-between md:gap-10">
        <h3 className="shrink-0 text-[22px] leading-tight font-semibold text-ink md:text-2xl">{block.title}</h3>
        <p className="max-w-[460px] text-[15px] leading-relaxed text-body">{block.text}</p>
      </figcaption>
      {/* Horizontal scroll on small screens, centred row on larger ones */}
      <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pt-8 pb-8 sm:px-8 md:justify-center md:gap-8 md:overflow-visible">
        {block.screens.map((s, i) => (
          <div key={s.image.src} className="flex w-[180px] shrink-0 snap-center flex-col items-center gap-3 md:w-[200px]">
            <Image
              src={s.image.src}
              alt={s.image.alt}
              width={s.image.width}
              height={s.image.height}
              sizes="200px"
              className="h-auto w-full drop-shadow-[0_18px_28px_rgba(16,24,40,0.18)]"
            />
            <p className="flex items-center gap-2 text-[13px] font-medium text-ink">
              <span
                className="grid size-5 place-items-center rounded-full text-[10px] font-bold text-white"
                style={{ background: tone.stroke }}
              >
                {i + 1}
              </span>
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </figure>
  )
}

/** Illustration components as a sticker sheet: cut-outs on soft tinted blobs, gently tilted. */
const tilts = ["-3deg", "2.5deg", "-2deg", "3deg", "-2.5deg"]
const blobs = [
  "48% 52% 44% 56% / 55% 45% 55% 45%",
  "56% 44% 52% 48% / 46% 56% 44% 54%",
  "50% 50% 46% 54% / 52% 48% 52% 48%",
  "44% 56% 50% 50% / 50% 44% 56% 50%",
  "53% 47% 55% 45% / 47% 53% 47% 53%",
]

export function IllustrationsView({ block }: { block: IllustrationsBlock }) {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-6">
      {block.items.map((it, i) => (
        <li
          key={it.name}
          className={cn("group flex flex-col items-center text-center", i < 2 ? "md:col-span-3" : "md:col-span-2", i === 0 && "col-span-2")}
        >
          <div className="relative grid aspect-[5/4] w-full place-items-center">
            <span
              aria-hidden
              className="absolute inset-[6%] transition-transform duration-500 group-hover:scale-105"
              style={{ background: it.background, borderRadius: blobs[i % blobs.length] }}
            />
            <Image
              src={it.image.src}
              alt={it.image.alt}
              width={it.image.width}
              height={it.image.height}
              sizes="(min-width: 768px) 360px, 50vw"
              className="relative h-auto max-h-[86%] w-auto max-w-[82%] object-contain drop-shadow-[0_14px_22px_rgba(16,24,40,0.16)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-0!"
              style={{ rotate: tilts[i % tilts.length] }}
            />
          </div>
          <p className="mt-3 text-[15px] font-semibold text-ink">{it.name}</p>
          <p className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-[12px] font-medium text-body ring-1 ring-black/5">
            <span className="size-1.5 rounded-full" style={{ background: "var(--tone-green)" }} />
            {it.usedIn}
          </p>
        </li>
      ))}
    </ul>
  )
}

/** Muted looping video, used for the converted Behance GIFs. */
export function VideoView({ block }: { block: VideoBlock }) {
  return (
    <figure className={cn(block.layout === "phone" ? "mx-auto w-full max-w-[300px]" : "w-full")}>
      <div
        className="overflow-hidden rounded-[22px] ring-1 ring-black/5"
        style={{ background: block.background ?? "#232323" }}
      >
        <LoopVideo
          className="block h-auto w-full"
          src={block.src}
          poster={block.poster}
          width={block.width}
          height={block.height}
          aria-label={block.caption}
        />
      </div>
      {block.caption && <figcaption className="mt-3 text-center text-[15px] font-medium text-soft">{block.caption}</figcaption>}
    </figure>
  )
}
