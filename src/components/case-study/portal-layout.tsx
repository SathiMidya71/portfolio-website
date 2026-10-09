"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { BarChart3, Heart } from "lucide-react"
import type { Block, Img } from "@/lib/case-studies/types"
import { cn } from "@/lib/utils"

// Layout blocks for the Arc Connect Portal: text beside a tablet mock-up (alternating sides),
// and the white Statistics board with floating chart cards. Both slide in when scrolled into view.

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null)
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
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, shown] as const
}

const shadow = "[filter:drop-shadow(0_2px_4px_rgba(16,24,40,0.06))_drop-shadow(0_24px_40px_rgba(16,24,40,0.16))]"

function Screen({ img, sizes }: { img: Img; sizes: string }) {
  return <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes={sizes} className={cn("h-auto w-full", shadow)} />
}

/* ---------------- split ---------------- */

type SplitBlock = Extract<Block, { type: "split" }>

export function SplitView({ block }: { block: SplitBlock }) {
  const [ref, shown] = useInView<HTMLDivElement>()
  const left = block.side === "left"
  return (
    <div ref={ref} className="my-10 grid items-center gap-8 md:my-14 md:grid-cols-[1.35fr_1fr] md:gap-12">
      <div
        className={cn("grid gap-6", left ? "md:order-1 md:[--slide:-40px]" : "md:order-2 md:[--slide:40px]")}
        style={{
          opacity: shown ? 1 : 0,
          // sideways slide from md up only, so nothing pokes past a phone screen
          translate: shown ? "0 0" : "var(--slide, 0px) 0",
          transition: "opacity 700ms ease, translate 900ms cubic-bezier(.2,.7,.2,1)",
        }}
      >
        {block.images.map((img) => (
          <Screen key={img.src} img={img} sizes="(min-width: 1200px) 560px, (min-width: 768px) 55vw, 100vw" />
        ))}
      </div>
      <div
        className={cn(left ? "md:order-2" : "md:order-1")}
        style={{ opacity: shown ? 1 : 0, translate: shown ? "0 0" : "0 16px", transition: "opacity 600ms ease 200ms, translate 700ms ease 200ms" }}
      >
        {block.title && <h3 className="mb-3 text-[24px] leading-tight tracking-[-0.3px] text-ink md:text-[28px]">{block.title}</h3>}
        {block.text.map((t) => (
          <p key={t} className="mb-3 text-[17px] leading-relaxed text-body">
            {t}
          </p>
        ))}
        {block.list && (
          <ul className="mt-2 grid gap-2.5">
            {block.list.map((t) => (
              <li key={t} className="flex gap-3 text-[16px] leading-snug text-ink">
                <span aria-hidden className="mt-[0.45em] size-2 shrink-0 rounded-full bg-[#F26930]" />
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

/* ---------------- statistics board ---------------- */

type StatsBlock = Extract<Block, { type: "statsPanel" }>

export function StatsPanelView({ block }: { block: StatsBlock }) {
  const [ref, shown] = useInView<HTMLDivElement>(0.12)
  let n = 0
  const rise = () => {
    const i = n++
    return {
      opacity: shown ? 1 : 0,
      translate: shown ? "0 0" : "0 24px",
      transition: `opacity 600ms ease ${300 + i * 110}ms, translate 700ms cubic-bezier(.2,.7,.2,1) ${300 + i * 110}ms`,
    }
  }
  return (
    <div ref={ref} className="my-8 rounded-[32px] bg-white px-5 py-10 shadow-[0_30px_60px_-40px_rgba(16,24,40,0.35)] ring-1 ring-black/5 sm:px-10 md:py-14">
      <div className="text-center" style={{ opacity: shown ? 1 : 0, transition: "opacity 600ms" }}>
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-[#dbe7fd] text-[#1366de] shadow-[0_10px_24px_-12px_rgba(19,102,222,0.6)]">
          <BarChart3 className="size-8" aria-hidden />
        </span>
        <h3 className="mt-5 text-[34px] leading-none tracking-[-0.5px] text-ink md:text-[44px]">{block.title}</h3>
        <p className="mx-auto mt-3 max-w-[520px] text-[17px] text-body">{block.text}</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {block.columns.map((col, ci) => (
          <div key={ci} className="grid content-start gap-6">
            {col.map((it, k) => (
              <div key={k} className={cn(it.align === "end" && "flex justify-end")} style={rise()}>
                {it.image && (
                  <div style={{ width: it.width ?? "100%" }}>
                    <Screen img={it.image} sizes="(min-width: 1200px) 420px, (min-width: 768px) 45vw, 100vw" />
                  </div>
                )}
                {it.row && (
                  <div className="grid grid-cols-3 gap-3">
                    {it.row.map((img) => (
                      <Screen key={img.src} img={img} sizes="(min-width: 1200px) 140px, 30vw" />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------------- photo banner ---------------- */

type BannerBlock = Extract<Block, { type: "photoBanner" }>

export function PhotoBannerView({ block }: { block: BannerBlock }) {
  const [ref, shown] = useInView<HTMLElement>(0.25)
  return (
    <figure ref={ref} className="group relative my-12 overflow-hidden rounded-[28px] shadow-[0_30px_60px_-36px_rgba(16,24,40,0.5)] md:my-16">
      <Image
        src={block.image.src}
        alt={block.image.alt}
        width={block.image.width}
        height={block.image.height}
        sizes="(min-width: 1200px) 1040px, 100vw"
        className="h-auto w-full transition-[scale] duration-[1600ms] ease-out group-hover:scale-[1.02]"
        style={{ scale: shown ? undefined : "1.08" }}
      />
      {/* soft light from the left so the label reads on the window */}
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/55 via-white/10 to-transparent" />
      <figcaption
        className="absolute bottom-3 left-3 max-w-[78%] rounded-[16px] bg-white/80 px-3.5 py-2.5 sm:rounded-[22px] sm:p-4 shadow-[0_18px_40px_-20px_rgba(16,24,40,0.45)] ring-1 ring-white/60 backdrop-blur-md sm:bottom-8 sm:left-8 sm:p-6 md:max-w-[420px]"
        style={{
          opacity: shown ? 1 : 0,
          translate: shown ? "0 0" : "0 20px",
          transition: "opacity 700ms ease 400ms, translate 800ms cubic-bezier(.2,.7,.2,1) 400ms",
        }}
      >
        {block.eyebrow && (
          <span className="mb-1 flex items-center gap-2 text-[10px] sm:mb-2 sm:text-[11px] font-semibold tracking-[0.16em] text-soft uppercase">
            <Heart className="size-3.5 fill-[#F26930] text-[#F26930] motion-safe:animate-pulse" aria-hidden />
            {block.eyebrow}
          </span>
        )}
        <p className="font-heading text-[22px] leading-[0.95] sm:text-[30px] md:text-[44px] font-semibold tracking-[-0.03em]">
          {block.words.map((w) => (
            <span key={w.text} style={{ color: w.color }}>
              {w.text}
            </span>
          ))}
        </p>
        {block.text && <p className="mt-2 hidden text-[15px] leading-snug text-body sm:block">{block.text}</p>}
      </figcaption>
    </figure>
  )
}
