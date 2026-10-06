"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Play } from "lucide-react"
import { heroCards, heroVideo, profile, type HeroCard } from "@/lib/content"
import { cn } from "@/lib/utils"

// Tilt for each card position, left to right (matches the reference fan layout).
const tilts = ["6.5deg", "-5deg", "5deg", "-5deg"]

const article =
  "relative h-[286px] w-[256px] overflow-hidden rounded-[20px] ring-1 ring-black/5 shadow-[0_4px_16px_rgba(16,24,40,0.08)] xl:h-[360px] xl:w-[320px] xl:rounded-[24px]"

function TextCard({ card }: { card: Extract<HeroCard, { kind: "card" }> }) {
  return (
    <article className={cn(article, "px-6 pt-6 pb-7 xl:px-8 xl:pt-8 xl:pb-10")} style={{ backgroundColor: card.color }}>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="space-y-3">
          <h2 className="text-[28px] leading-[0.9] font-semibold text-ink xl:text-[40px]">{card.title}</h2>
          <p className="text-sm leading-[1.5] font-medium text-ink xl:text-[19px]">{card.text}</p>
        </div>
        <Link
          href={card.href}
          {...(card.external ? { target: "_blank", rel: "noopener" } : {})}
          className="w-fit rounded-lg border border-black bg-black px-3.5 py-2.5 text-sm leading-5 font-semibold text-white transition-opacity hover:opacity-75"
        >
          {card.cta}
        </Link>
      </div>
    </article>
  )
}

function VideoCard() {
  return (
    <article className={article}>
      {heroVideo ? (
        <video
          className="size-full object-cover"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label={`${profile.name} intro video`}
        />
      ) : (
        // Placeholder until the intro recording is added
        <>
          <Image src={profile.photo} alt={profile.name} fill sizes="320px" className="object-cover object-[center_20%]" />
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-ink backdrop-blur">
            <Play className="size-3.5 fill-current" /> Intro video coming soon
          </span>
        </>
      )}
    </article>
  )
}

export function HeroCards() {
  const boxRef = useRef<HTMLDivElement>(null)
  const fanRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  // Shrink the whole fan to fit narrower containers instead of clipping cards.
  useEffect(() => {
    const box = boxRef.current
    const fan = fanRef.current
    if (!box || !fan) return
    const fit = () => {
      // Hidden below lg (display: none), so both widths are 0 there
      if (!fan.scrollWidth) return
      setScale(Math.min(1, box.clientWidth / fan.scrollWidth))
    }
    const ro = new ResizeObserver(fit)
    ro.observe(box)
    fit()
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={boxRef} className="relative mt-12 hidden w-full justify-center md:mt-14 lg:flex">
      <div
        ref={fanRef}
        className="flex h-[340px] shrink-0 origin-top items-center [--fan-h:340px] xl:h-[420px] xl:[--fan-h:420px]"
        style={{ scale, marginBottom: `calc((${scale} - 1) * var(--fan-h))` } as React.CSSProperties}
      >
        {heroCards.map((card, i) => (
          <div
            key={i}
            style={{ zIndex: heroCards.length - i, rotate: tilts[i % tilts.length] }}
            className={cn(
              "relative flex h-[310px] w-[280px] shrink-0 items-center justify-center transition-[rotate,translate] duration-300 ease-out hover:z-20! hover:-translate-y-3 hover:rotate-0! xl:h-[386px] xl:w-[350px]",
              i < heroCards.length - 1 && "-mr-[28px] xl:-mr-[40px]"
            )}
          >
            {card.kind === "video" ? <VideoCard /> : <TextCard card={card} />}
          </div>
        ))}
      </div>
    </div>
  )
}
