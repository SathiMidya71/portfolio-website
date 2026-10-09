"use client"

import { useEffect, useRef, useState } from "react"
import { Pause, Play } from "lucide-react"

/**
 * Muted product demo that only plays while it is on screen, so a page with several clips stays
 * light. Respects reduced motion (starts paused). A small button lets viewers pause or play.
 */
export function DemoVideo({ src, poster, width, height, label }: { src: string; poster?: string; width: number; height: number; label: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  // latest choice, read by the observer callback
  const userPausedRef = useRef(false)
  useEffect(() => {
    userPausedRef.current = userPaused
  }, [userPaused])

  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) userPausedRef.current = true
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduced && !userPausedRef.current) void v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.35 }
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) {
      setUserPaused(false)
      void v.play().catch(() => {})
    } else {
      setUserPaused(true)
      v.pause()
    }
  }

  return (
    <div className="relative">
      <video
        ref={ref}
        poster={poster}
        width={width}
        height={height}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="block h-auto w-full"
      >
        {/* H.264 first; a VP9 copy sits beside each clip for browsers without H.264 */}
        <source src={src} type="video/mp4" />
        <source src={src.replace(/\.mp4$/, ".webm")} type="video/webm" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause demo" : "Play demo"}
        className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
      >
        {playing ? <Pause className="size-4" aria-hidden /> : <Play className="size-4 translate-x-px" aria-hidden />}
      </button>
    </div>
  )
}
