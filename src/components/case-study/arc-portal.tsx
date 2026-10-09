import Image from "next/image"
import type { Block } from "@/lib/case-studies/types"
import { cn } from "@/lib/utils"

// Photo pairs for the Arc Connect Web Portal case study. The architecture lives in
// arc-portal-architecture.tsx and the annotated screen in annotated-screen.tsx (both client, animated).

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
