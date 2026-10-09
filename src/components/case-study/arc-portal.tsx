import Image from "next/image"
import type { Block } from "@/lib/case-studies/types"
import { cn } from "@/lib/utils"

// Blocks for the Arc Connect Web Portal case study: an annotated medical record screen and photo
// pairs. The architecture lives in arc-portal-architecture.tsx (client, animated).

/* ---------------- annotated screen ---------------- */

type AnnotatedBlock = Extract<Block, { type: "annotatedScreen" }>

function Pin({ n, className, style }: { n: number; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={cn("grid size-6 shrink-0 place-items-center rounded-full bg-[#2e7fd6]/90 text-[12px] font-bold text-white ring-[3px] ring-white", className)} style={style}>
      {n}
    </span>
  )
}

export function AnnotatedScreenView({ block }: { block: AnnotatedBlock }) {
  const notes = block.notes.map((n, i) => ({ ...n, n: i + 1 }))
  const side = (s: "left" | "right") => notes.filter((n) => n.side === s)
  return (
    <figure className="my-6">
      <div className="lg:grid lg:grid-cols-[1fr_minmax(0,440px)_1fr] lg:gap-8">
        {(["left", "right"] as const).map((s) => (
          <div key={s} className={cn("relative hidden lg:block", s === "left" ? "lg:order-1" : "lg:order-3")}>
            {side(s).map((n) => (
              <p
                key={n.n}
                className={cn("absolute inset-x-0 flex gap-2.5 font-hand text-[19px] leading-[1.15] font-bold text-[#1f5fae]", s === "left" && "flex-row-reverse text-right")}
                style={{ top: `${n.noteY * 100}%` }}
              >
                <Pin n={n.n} className="mt-0.5" />
                <span>{n.text}</span>
              </p>
            ))}
          </div>
        ))}
        <div className="relative mx-auto max-w-[440px] lg:order-2">
          <Image
            src={block.image.src}
            alt={block.image.alt}
            width={block.image.width}
            height={block.image.height}
            sizes="440px"
            className="h-auto w-full rounded-[22px] shadow-[0_24px_50px_-28px_rgba(16,24,40,0.45)] ring-1 ring-black/5"
          />
          {notes.map((n) => (
            <Pin key={n.n} n={n.n} className="absolute -translate-x-1/2 -translate-y-1/2 shadow-md" style={{ left: `${n.x * 100}%`, top: `${n.y * 100}%` }} />
          ))}
        </div>
      </div>
      {/* small screens: numbered notes below */}
      <ol className="mt-6 grid gap-3 lg:hidden">
        {notes.map((n) => (
          <li key={n.n} className="flex gap-3 text-[15px] leading-snug text-ink">
            <Pin n={n.n} />
            <span className="pt-0.5">{n.text}</span>
          </li>
        ))}
      </ol>
    </figure>
  )
}

/* ---------------- photos ---------------- */

type PhotosBlock = Extract<Block, { type: "photos" }>

export function PhotosView({ block }: { block: PhotosBlock }) {
  return (
    <div className="my-6 grid gap-5 sm:grid-cols-2 sm:items-start">
      {block.items.map((p, i) => (
        <figure key={p.image.src} className={cn(i % 2 === 1 && "sm:mt-16")}>
          <Image
            src={p.image.src}
            alt={p.image.alt}
            width={p.image.width}
            height={p.image.height}
            sizes="(min-width: 1200px) 420px, (min-width: 640px) 45vw, 100vw"
            className="h-auto w-full rounded-[22px] object-cover"
          />
          {p.caption && <figcaption className="mt-3 text-[15px] leading-relaxed text-body">{p.caption}</figcaption>}
        </figure>
      ))}
    </div>
  )
}
