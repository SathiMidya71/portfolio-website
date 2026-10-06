"use client"

import { useEffect, useRef } from "react"

/**
 * Muted autoplaying loop. React doesn't render the `muted` attribute on the server,
 * which makes browsers block autoplay, so it is set and started here on mount.
 */
export function LoopVideo(props: React.VideoHTMLAttributes<HTMLVideoElement>) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    void v.play().catch(() => {})
  }, [])
  return <video ref={ref} muted loop playsInline preload="metadata" {...props} />
}
