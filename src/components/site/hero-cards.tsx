"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Pause, Play } from "lucide-react"
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

function PlayButton({ playing }: { playing: boolean }) {
  return (
    <span
      className={cn(
        "grid size-16 place-items-center rounded-full bg-white/95 text-brand shadow-[0_8px_24px_rgba(16,24,40,0.18)] transition-all duration-300 group-hover/video:scale-110",
        playing && "pointer-events-none scale-75 opacity-0"
      )}
    >
      {playing ? <Pause className="size-5 fill-current" /> : <Play className="ml-0.5 size-5 fill-current" />}
    </span>
  )
}

function VideoCard({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Muted, blurred loop as a teaser; clicking restarts it with sound.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (playing) {
      v.currentTime = 0
      v.muted = false
      v.loop = false
      void v.play()
    } else {
      v.muted = true
      v.loop = true
      void v.play().catch(() => {})
    }
  }, [playing])

  return (
    <article className={cn(article, "group/video")}>
      <button
        type="button"
        onClick={onToggle}
        aria-label={playing ? "Pause intro video" : "Play intro video"}
        className="absolute inset-0 grid cursor-pointer place-items-center"
      >
        {heroVideo ? (
          <video
            ref={videoRef}
            className={cn(
              "absolute inset-0 size-full object-cover transition-[filter,scale] duration-500",
              !playing && "scale-105 blur-[6px]"
            )}
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onEnded={onToggle}
          />
        ) : (
          // Placeholder until the intro recording is added
          <Image
            src={profile.photo}
            alt=""
            fill
            sizes="320px"
            className="scale-105 object-cover object-[center_20%] blur-[6px]"
          />
        )}
        <span aria-hidden className={cn("absolute inset-0 bg-black/10 transition-opacity", playing && "opacity-0")} />
        <span className="relative">
          <PlayButton playing={playing} />
        </span>
        {!heroVideo && (
          <span className="absolute bottom-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink">
            Intro video coming soon
          </span>
        )}
      </button>
    </article>
  )
}

/** Handwritten note with a curly arrow pointing down at the video card. */
function Annotation({ show }: { show: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -top-14 left-1/2 flex -translate-x-1/2 items-start gap-2 whitespace-nowrap transition-all duration-300 xl:-top-16",
        show ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      )}
    >
      <span className="-rotate-2 font-hand text-[26px] leading-none font-bold text-brand xl:text-[30px]">
        In case you are tired of reading
      </span>
      <svg width="44" height="40" viewBox="0 0 44 40" fill="none" className="mt-2 text-brand">
        <path d="M2 8c12-6 28-4 34 10 2 5 2 10 0 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M29 29l7 6 6-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export function HeroCards() {
  const boxRef = useRef<HTMLDivElement>(null)
  const fanRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [hoverVideo, setHoverVideo] = useState(false)
  const [playing, setPlaying] = useState(false)
  const focused = hoverVideo || playing

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
    <div ref={boxRef} className="relative mt-20 hidden w-full justify-center lg:flex xl:mt-24">
      <div
        ref={fanRef}
        className="flex h-[340px] shrink-0 origin-top items-center [--fan-h:340px] xl:h-[420px] xl:[--fan-h:420px]"
        style={{ scale, marginBottom: `calc((${scale} - 1) * var(--fan-h))` } as React.CSSProperties}
      >
        {heroCards.map((card, i) => {
          const isVideo = card.kind === "video"
          return (
            <div
              key={i}
              onMouseEnter={isVideo ? () => setHoverVideo(true) : undefined}
              onMouseLeave={isVideo ? () => setHoverVideo(false) : undefined}
              style={{ zIndex: isVideo && focused ? 30 : heroCards.length - i, rotate: tilts[i % tilts.length] }}
              className={cn(
                "relative flex h-[310px] w-[280px] shrink-0 items-center justify-center transition-[rotate,translate,scale,filter,opacity] duration-300 ease-out xl:h-[386px] xl:w-[350px]",
                i < heroCards.length - 1 && "-mr-[28px] xl:-mr-[40px]",
                isVideo && focused && "scale-[1.08] rotate-0!",
                !isVideo && focused && "opacity-60 blur-[3px]",
                !isVideo && !focused && "hover:z-20! hover:-translate-y-3 hover:rotate-0!"
              )}
            >
              {isVideo && <Annotation show={focused} />}
              {isVideo ? (
                <VideoCard playing={playing} onToggle={() => setPlaying((p) => !p)} />
              ) : (
                <TextCard card={card} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
