"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import type { Block } from "@/lib/case-studies/types"
import { cn } from "@/lib/utils"

// UI components floating on the page background, Dribbble-board style: each cut-out card gets a
// soft layered shadow, a slight tilt and a small label. On scroll they rise in one by one, then
// drift gently; hovering straightens and lifts a card.

type BoardBlock = Extract<Block, { type: "componentBoard" }>

export function ComponentBoardView({ block }: { block: BoardBlock }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        setShown(true)
        io.disconnect()
      },
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="my-8 grid grid-flow-dense grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {block.items.map((it, i) => (
        <figure
          key={it.image.src}
          className={cn(
            "group flex flex-col",
            it.span === 2 && "sm:col-span-2",
            it.span === 3 && "sm:col-span-2 lg:col-span-3",
            it.rows === 2 && "lg:row-span-2"
          )}
          style={{
            opacity: shown ? 1 : 0,
            translate: shown ? "0 0" : "0 28px",
            transition: `opacity 600ms ease ${i * 90}ms, translate 700ms cubic-bezier(.2,.7,.2,1) ${i * 90}ms`,
          }}
        >
          <figcaption className="mb-3 flex items-center gap-2 text-[12px] font-semibold tracking-[0.12em] text-soft uppercase">
            <span className="h-px w-5 bg-current opacity-50" />
            {it.label}
          </figcaption>
          <div className="grid gap-4 motion-safe:animate-[cb-float_7s_ease-in-out_infinite]" style={{ animationDelay: `${-i * 0.9}s` }}>
            {[it.image, ...(it.more ?? [])].map((im, k) => (
            <Image
              key={im.src}
              src={im.src}
              alt={im.alt}
              width={im.width}
              height={im.height}
              sizes="(min-width: 1024px) 420px, (min-width: 640px) 45vw, 100vw"
              className="h-auto w-full transition-[rotate,scale,filter] duration-300 [filter:drop-shadow(0_2px_3px_rgba(16,24,40,0.06))_drop-shadow(0_18px_30px_rgba(16,24,40,0.12))] group-hover:scale-[1.03] group-hover:rotate-0 group-hover:[filter:drop-shadow(0_2px_3px_rgba(16,24,40,0.08))_drop-shadow(0_28px_40px_rgba(16,24,40,0.2))]"
              style={{ rotate: `${(it.tilt ?? 0) * (k % 2 ? -1 : 1)}deg` }}
            />
            ))}
          </div>
        </figure>
      ))}
    </div>
  )
}
