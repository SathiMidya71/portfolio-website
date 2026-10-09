"use client"

import { useEffect, useRef, useState } from "react"
import { principles } from "@/lib/content"

// "Principles that guide my work": a lavender (#B79CEC) board with four huge principles. On scroll the
// underline draws and the lines rise in one by one. Hovering (or tapping) a line slides it right,
// brings in a pen nib pointer and writes its three pointers beside it in handwriting.

function PenNib({ className }: { className?: string }) {
  // a fountain-pen nib pointing right
  return (
    <svg viewBox="0 0 64 40" className={className} aria-hidden>
      <path d="M4 12 C4 7 8 4 13 4 H24 L40 12 L62 20 L40 28 L24 36 H13 C8 36 4 33 4 28 Z" fill="currentColor" />
      <path d="M40 20 H62" stroke="#b79cec" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="38" cy="20" r="3.4" fill="#b79cec" />
      <path d="M13 11 V29 M19 9 V31" stroke="#b79cec" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

function Doodles() {
  return (
    <svg viewBox="0 0 70 50" className="mx-auto mt-10 w-[64px] md:mt-14 md:w-[78px]" aria-hidden fill="none" strokeLinecap="round">
      {/* asterisk */}
      <path d="M8 6 L30 22 M28 4 L10 24 M4 15 H34" stroke="#2b2150" strokeWidth="3.4" />
      {/* dot */}
      <circle cx="44" cy="10" r="6" fill="#fcfaf6" />
      {/* star */}
      <path d="M12 32 l2.6 5.4 5.8 .8 -4.2 4 1 5.8 -5.2 -2.8 -5.2 2.8 1 -5.8 -4.2 -4 5.8 -.8 Z" fill="#4a307d" />
      {/* swirl */}
      <path d="M40 36 C36 42 42 48 48 45 C53 42 50 36 46 38" stroke="#2b2150" strokeWidth="3" />
    </svg>
  )
}

export function Principles() {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setShown(true)
        io.disconnect()
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id="principles" className="mb-10 scroll-mt-24 max-sm:mb-6">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-10 lg:px-[120px]">
        <div ref={ref} className="relative overflow-hidden rounded-[28px] bg-[#b79cec] px-5 py-14 text-[#2b2150] md:rounded-[36px] md:py-20" onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}>
          {/* title with a hand-drawn underline */}
          <h2 className="text-center font-hand text-[32px] leading-none font-bold md:text-[42px]">
            {principles.title.split(" ").slice(0, -2).join(" ")}{" "}
            <span className="relative inline-block">
              {principles.title.split(" ").slice(-2).join(" ")}
              <svg viewBox="0 0 275 24" preserveAspectRatio="none" className="absolute -bottom-[0.32em] left-[-4%] h-[0.4em] w-[108%] overflow-visible" fill="none" aria-hidden>
                <path
                  d="M6 14 C6 14 130 2 268 14"
                  stroke="#4a307d"
                  strokeWidth="5"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray="1 1"
                  style={{ strokeDashoffset: shown ? 0 : 1, transition: "stroke-dashoffset 900ms cubic-bezier(.6,.1,.3,1) 250ms" }}
                />
              </svg>
            </span>
          </h2>

          <ul className="mx-auto mt-10 grid w-fit gap-1 md:mt-14 md:gap-2">
            {principles.items.map((p, i) => {
              const on = active === i
              return (
                <li
                  key={p.title}
                  tabIndex={0}
                  // mouse: hover; touch: tap to toggle; keyboard: focus
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                  onPointerUp={(e) => e.pointerType !== "mouse" && setActive(on ? null : i)}
                  onFocus={(e) => e.currentTarget.matches(":focus-visible") && setActive(i)}
                  onBlur={(e) => e.currentTarget.matches(":focus-visible") || setActive((cur) => (cur === i ? null : cur))}
                  className="relative cursor-default outline-none select-none"
                  style={{
                    opacity: shown ? 1 : 0,
                    translate: shown ? "0 0" : "0 40%",
                    transition: `opacity 600ms ease ${400 + i * 130}ms, translate 700ms cubic-bezier(.2,.7,.2,1) ${400 + i * 130}ms`,
                  }}
                >
                  <div
                    className="flex items-center transition-[translate,opacity] duration-500 ease-[cubic-bezier(.2,.7,.2,1)]"
                    style={{ translate: on ? "clamp(16px, 6vw, 84px) 0" : "0 0", opacity: active === null || on ? 1 : 0.4 }}
                  >
                    {/* pen nib pointer */}
                    <span
                      aria-hidden
                      className="absolute top-1/2 -left-[clamp(26px,5.6vw,84px)] -translate-y-1/2 text-[#2b2150] transition-[opacity,translate] duration-500"
                      style={{ opacity: on ? 1 : 0, translate: on ? "0 0" : "-60% 0" }}
                    >
                      <PenNib className="w-[clamp(24px,5vw,64px)]" />
                    </span>
                    <span className="font-heading text-[clamp(30px,7.4vw,92px)] leading-[0.95] font-extrabold tracking-[-0.045em] whitespace-nowrap uppercase">{p.title}</span>
                    {/* handwritten pointers */}
                    <span className="absolute top-1/2 left-full ml-[clamp(10px,1.6vw,22px)] hidden -translate-y-1/2 font-hand text-[clamp(17px,1.7vw,24px)] leading-[1.02] font-bold text-[#4a307d] md:block">
                      {p.notes.map((n, k) => (
                        <span
                          key={n}
                          className="block whitespace-nowrap transition-[opacity,translate] duration-300"
                          style={{ opacity: on ? 1 : 0, translate: on ? "0 0" : "-12px 0", transitionDelay: on ? `${120 + k * 90}ms` : "0ms" }}
                        >
                          / {n}
                        </span>
                      ))}
                    </span>
                  </div>
                  {/* phones: pointers drop in below the tapped line */}
                  <p
                    className="grid overflow-hidden font-hand text-[19px] font-bold text-[#4a307d] transition-[grid-template-rows,opacity] duration-300 md:hidden"
                    style={{ gridTemplateRows: on ? "1fr" : "0fr", opacity: on ? 1 : 0 }}
                  >
                    <span className="min-h-0 pl-[clamp(16px,6vw,84px)]">{p.notes.map((n) => `/ ${n}`).join("  ")}</span>
                  </p>
                </li>
              )
            })}
          </ul>

          <Doodles />
          <p className="mt-3 text-center text-[13px] text-[#2b2150]/70 md:hidden">Tap a principle</p>
        </div>
      </div>
    </section>
  )
}
