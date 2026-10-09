"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Coffee, GitBranch, Link2, Mail, MapPin, Palette, Waves } from "lucide-react"
import { experience, journal, profile } from "@/lib/content"
import { cn } from "@/lib/utils"

// "About me" as a journal: a green notebook that opens when it scrolls into view, flips a few
// pages, and lands on a spread with Sathi's work history, contact details, photo, tools and
// hobbies. The 3D animation runs from md up; phones get the two pages stacked, no animation.
// Sizes inside the book use container units (cqw) so it scales as one object.

const paper = "#fffdf8"
const dots = { backgroundImage: "radial-gradient(#d9d2c4 0.9px, transparent 1px)", backgroundSize: "1.8cqw 1.8cqw" }

/* ---------------- cover ---------------- */

function Stamp({ className, children, rotate }: { className?: string; children: React.ReactNode; rotate: number }) {
  // dotted green border on a cream edge reads as a perforated stamp
  return (
    <div
      className={cn("absolute border-[0.45cqw] border-dotted border-[#02594e] bg-[#fffaf0] p-[0.6cqw] shadow-[0_0.4cqw_0.8cqw_rgba(0,0,0,0.35)] outline outline-[0.35cqw] outline-[#fffaf0]", className)}
      style={{ rotate: `${rotate}deg` }}
    >
      {children}
    </div>
  )
}

function Cover() {
  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-r-[1.4cqw] rounded-l-[0.4cqw] [backface-visibility:hidden]"
      style={{ background: "linear-gradient(135deg,#0d6b57 0%,#02594e 55%,#014238 100%)", boxShadow: "inset 0.6cqw 0 1cqw rgba(0,0,0,0.25)" }}
    >
      <span aria-hidden className="absolute inset-y-0 left-[3%] w-px bg-white/10" />
      <p className="mt-[7%] text-center font-hand text-[6cqw] leading-none font-bold text-[#e3c27a]" style={{ textShadow: "0 0.2cqw 0 rgba(0,0,0,0.25)" }}>
        Journal
      </p>
      {/* collage */}
      <div className="relative mx-auto mt-[4%] h-[58%] w-[78%]">
        <Stamp className="top-[6%] left-[8%] w-[38%]" rotate={-8}>
          <div className="relative aspect-[3/4] overflow-hidden bg-[#f2ece3]">
            <Image src="/about/sathi-journal.jpg" alt="" fill sizes="160px" className="object-cover object-top" />
          </div>
          <p className="mt-[0.3cqw] text-center text-[0.9cqw] font-bold tracking-[0.2em] text-[#02594e]">BANGALORE</p>
        </Stamp>
        <Stamp className="top-[0%] right-[6%] w-[30%]" rotate={7}>
          <div className="grid aspect-square place-items-center bg-[#d9f3e5] text-[#02594e]">
            <Waves className="size-[4cqw]" strokeWidth={1.6} />
          </div>
        </Stamp>
        <Stamp className="top-[46%] right-[2%] w-[32%]" rotate={-5}>
          <div className="grid aspect-square place-items-center bg-[#fde3cf] text-[#9a4a12]">
            <Coffee className="size-[4cqw]" strokeWidth={1.6} />
          </div>
        </Stamp>
        <Stamp className="bottom-[0%] left-[24%] w-[30%]" rotate={9}>
          <div className="grid aspect-square place-items-center bg-[#e9defd] text-[#4a307d]">
            <Palette className="size-[4cqw]" strokeWidth={1.6} />
          </div>
        </Stamp>
        {/* wax seal */}
        <span
          aria-hidden
          className="absolute top-[40%] left-[40%] grid size-[6.5cqw] place-items-center rounded-full font-hand text-[3.4cqw] font-bold text-[#7a5418]"
          style={{ background: "radial-gradient(circle at 35% 30%, #f1d48c, #c99a3e 60%, #9b7126)", boxShadow: "0 0.3cqw 0.6cqw rgba(0,0,0,0.35), inset 0 0 0 0.4cqw rgba(255,255,255,0.15)" }}
        >
          S
        </span>
      </div>
      {/* barcode */}
      <div className="absolute inset-x-0 bottom-[7%] flex flex-col items-center gap-[0.4cqw] opacity-70">
        <div className="flex h-[3.2cqw] items-stretch gap-[0.18cqw]">
          {[2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2].map((w, i) => (
            <span key={i} className="bg-[#cfe6dc]" style={{ width: `${w * 0.16}cqw` }} />
          ))}
        </div>
        <span className="text-[1cqw] tracking-[0.5em] text-[#cfe6dc]">sathi</span>
      </div>
    </div>
  )
}

/* ---------------- pages ---------------- */

function LeftPage() {
  return (
    <div className="relative h-full p-[3.2cqw] pr-[2.6cqw] text-[#344054]" style={{ background: paper, ...dots }}>
      <p className="font-hand text-[4.6cqw] leading-none font-bold text-[#22303f]">{profile.name}</p>
      <div className="mt-[1.2cqw] flex items-center gap-[1.2cqw]">
        <span className="rounded-[0.5cqw] bg-[#e4f1eb] px-[1cqw] py-[0.4cqw] text-[1.25cqw] font-semibold text-[#02594e]">{profile.role}</span>
        <span className="relative px-[1cqw] py-[0.3cqw] text-[1.25cqw] font-semibold text-[#22303f]">
          {journal.experienceYears}
          <svg aria-hidden viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute -inset-x-[0.8cqw] -inset-y-[0.6cqw] h-[calc(100%+1.2cqw)] w-[calc(100%+1.6cqw)] overflow-visible" fill="none">
            <path d="M8,22 C6,8 40,2 70,5 C96,8 98,30 70,35 C40,40 4,36 6,18 C8,10 20,6 30,5" stroke="#2e7fd6" strokeWidth="2.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
        </span>
      </div>

      {/* where I've worked */}
      <ul className="mt-[2.4cqw] grid gap-[0.9cqw]">
        {experience.map((e) => (
          <li key={e.company} className="grid grid-cols-[1fr_auto] items-baseline gap-[1cqw] text-[1.3cqw]">
            <span className="flex items-center gap-[0.8cqw] font-medium">
              <span aria-hidden className="size-[0.6cqw] rounded-full bg-[#2e90fa]" />
              {e.company}
            </span>
            <span className="font-serif text-[1.25cqw] text-[#4c6763] italic">{e.when.replace(" to ", " – ").replace("now", "Present")}</span>
          </li>
        ))}
      </ul>

      {/* interests */}
      <p className="mt-[2.4cqw] font-hand text-[2cqw] leading-none font-bold text-[#2e7fd6]">things I love designing</p>
      <ul className="mt-[1cqw] flex flex-wrap gap-[0.7cqw]">
        {journal.interests.map((t, i) => (
          <li
            key={t}
            className="rounded-full px-[1cqw] py-[0.4cqw] text-[1.15cqw] font-semibold"
            style={{ background: ["#e9defd", "#d9f3e5", "#fde3cf", "#d9ecfd"][i % 4], color: ["#3a2a63", "#1f4634", "#5a3418", "#1d3f5f"][i % 4] }}
          >
            {t}
          </li>
        ))}
      </ul>

      {/* today note */}
      <div className="absolute right-[2.4cqw] bottom-[13%] w-[46%] -rotate-1 overflow-hidden rounded-[0.8cqw] bg-white shadow-[0_0.5cqw_1.4cqw_-0.4cqw_rgba(0,0,0,0.25)]">
        <div className="flex gap-[0.4cqw] border-b border-black/5 bg-[#f6f5f2] px-[0.9cqw] py-[0.6cqw]">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} className="size-[0.6cqw] rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div className="p-[1.1cqw]">
          <p className="text-[1.2cqw] font-bold text-[#22303f]">Today</p>
          <p className="mt-[0.5cqw] text-[1.08cqw] leading-snug text-[#4c6763]">{journal.today}</p>
        </div>
        <span aria-hidden className="absolute -top-[0.4cqw] -right-[0.4cqw] text-[2.4cqw]">🌿</span>
      </div>

      {/* contact card on graph paper with tape */}
      <div
        className="absolute bottom-[6%] left-[2.6cqw] w-[44%] rotate-1 p-[1.2cqw] pt-[1.6cqw] shadow-[0_0.4cqw_1cqw_-0.3cqw_rgba(0,0,0,0.25)]"
        style={{ background: "#fafaf7", backgroundImage: "linear-gradient(#e7ecf2 1px,transparent 1px),linear-gradient(90deg,#e7ecf2 1px,transparent 1px)", backgroundSize: "1.2cqw 1.2cqw" }}
      >
        <span aria-hidden className="absolute -top-[1cqw] left-[18%] h-[2cqw] w-[9cqw] -rotate-6 bg-[#efe1c3]/85" />
        <ul className="grid gap-[0.7cqw] text-[1.15cqw] text-[#344054]">
          <li>
            <a href={`mailto:${profile.email}`} className="flex items-center gap-[0.6cqw] hover:text-[var(--tone-purple)]">
              <Mail className="size-[1.3cqw]" aria-hidden /> {profile.email}
            </a>
          </li>
          <li>
            <a href={profile.links.linkedin} target="_blank" rel="noopener" className="flex items-center gap-[0.6cqw] hover:text-[var(--tone-purple)]">
              <Link2 className="size-[1.3cqw]" aria-hidden /> {profile.links.linkedin.replace(/^https?:\/\//, "")}
            </a>
          </li>
          <li className="flex items-center gap-[0.6cqw]">
            <MapPin className="size-[1.3cqw]" aria-hidden /> {profile.location}, India
          </li>
        </ul>
      </div>

      {/* handwritten note */}
      <p className="absolute right-[3cqw] bottom-[3.2%] -rotate-6 font-hand text-[1.6cqw] leading-[1.05] font-bold text-[#2e7fd6]">
        Research is how I listen.
        <br />
        Design is how I answer.
      </p>
      <span aria-hidden className="absolute inset-y-0 right-0 w-[3cqw] bg-gradient-to-l from-black/[0.07] to-transparent" />
    </div>
  )
}

function DeskItem({ x, y, label, children, rotate = 0 }: { x: number; y: number; label: string; children: React.ReactNode; rotate?: number }) {
  return (
    <figure className="absolute flex w-[13cqw] flex-col items-center gap-[0.6cqw] text-center" style={{ left: `${x}%`, top: `${y}%`, rotate: `${rotate}deg` }}>
      {children}
      <figcaption className="text-[1.15cqw] font-medium text-[#344054]">{label}</figcaption>
    </figure>
  )
}

function Tile({ bg, fg, children }: { bg: string; fg: string; children: React.ReactNode }) {
  return (
    <span className="grid size-[6cqw] place-items-center rounded-[1.4cqw] shadow-[0_0.4cqw_0.9cqw_-0.3cqw_rgba(0,0,0,0.3)]" style={{ background: bg, color: fg }}>
      {children}
    </span>
  )
}

function InstagramSticker() {
  const handle = profile.instagramHandle
  const sticker = (
    <span
      className="grid size-[5.2cqw] place-items-center rounded-[1.4cqw] border-[0.35cqw] border-white shadow-[0_0.4cqw_0.8cqw_rgba(0,0,0,0.3)]"
      style={{ background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)" }}
    >
      <svg viewBox="0 0 24 24" className="size-[3cqw]" fill="none" stroke="#fff" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="1" fill="#fff" stroke="none" />
      </svg>
    </span>
  )
  return (
    <span className="group/ig absolute -right-[2.4cqw] -bottom-[1.6cqw] rotate-[10deg]">
      {profile.links.instagram ? (
        <a href={profile.links.instagram} target="_blank" rel="noopener" aria-label={`Instagram ${handle ?? ""}`}>
          {sticker}
        </a>
      ) : (
        sticker
      )}
      {handle && (
        <span className="pointer-events-none absolute -top-[3.4cqw] left-1/2 -translate-x-1/2 -rotate-[10deg] rounded-[0.6cqw] bg-[#22303f] px-[1cqw] py-[0.5cqw] text-[1.1cqw] font-semibold whitespace-nowrap text-white opacity-0 transition-opacity group-hover/ig:opacity-100">
          {handle}
        </span>
      )}
    </span>
  )
}

function RightPage() {
  return (
    <div className="relative h-full" style={{ background: paper, ...dots }}>
      <span aria-hidden className="absolute inset-y-0 left-0 w-[3cqw] bg-gradient-to-r from-black/[0.07] to-transparent" />

      {/* photo with an Instagram sticker */}
      <div className="absolute top-[24%] left-[32%] w-[34%] -rotate-2 bg-white p-[0.8cqw] pb-[2.6cqw] shadow-[0_0.6cqw_1.6cqw_-0.4cqw_rgba(0,0,0,0.35)]">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image src="/about/sathi-journal.jpg" alt={`${profile.name} smiling, taking a mirror selfie in a bright tie-dye scarf`} fill sizes="240px" className="object-cover" />
        </div>
        <p className="absolute inset-x-0 bottom-[0.6cqw] text-center font-hand text-[1.6cqw] leading-none font-bold text-[#344054]">that&apos;s me!</p>
        <InstagramSticker />
      </div>

      {/* tools */}
      <DeskItem x={8} y={8} label="Claude Code" rotate={-3}>
        <Tile bg="#22201c" fg="#e9824a">
          <span className="font-mono text-[2cqw] leading-none font-bold">&gt;_</span>
        </Tile>
      </DeskItem>
      <DeskItem x={42} y={4} label="Git & GitHub" rotate={2}>
        <Tile bg="#24292f" fg="#fff">
          <GitBranch className="size-[3cqw]" strokeWidth={2} />
        </Tile>
      </DeskItem>
      <DeskItem x={74} y={9} label="Figma" rotate={-2}>
        <Tile bg="#fff" fg="#000">
          <svg viewBox="0 0 38 57" className="h-[3.4cqw]">
            <path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
            <path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
            <path fill="#ff7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
            <path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
            <path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
          </svg>
        </Tile>
      </DeskItem>

      {/* lifestyle */}
      <DeskItem x={5} y={44} label="Swimming" rotate={3}>
        <Tile bg="#d9ecfd" fg="#1d3f5f">
          <Waves className="size-[3cqw]" strokeWidth={1.8} />
        </Tile>
      </DeskItem>
      <DeskItem x={74} y={46} label="CoffeeLover.png" rotate={-3}>
        <Tile bg="#fde3cf" fg="#5a3418">
          <Coffee className="size-[3cqw]" strokeWidth={1.8} />
        </Tile>
      </DeskItem>
      <DeskItem x={10} y={76} label="Painting" rotate={-2}>
        <Tile bg="#e9defd" fg="#3a2a63">
          <Palette className="size-[3cqw]" strokeWidth={1.8} />
        </Tile>
      </DeskItem>

      <p className="absolute right-[4cqw] bottom-[6%] rotate-3 font-hand text-[1.9cqw] leading-[1.05] font-bold text-[#2e7fd6]">
        tools by day,
        <br />
        paint &amp; laps by night ✦
      </p>
    </div>
  )
}

/* ---------------- book ---------------- */

type Phase = "closed" | "opening" | "open"

export function Journal() {
  const ref = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<Phase>("closed")

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("open")
      return
    }
    let timer: ReturnType<typeof setTimeout>
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        timer = setTimeout(() => setPhase("opening"), 250)
        timer = setTimeout(() => setPhase("open"), 2300)
      },
      { threshold: 0.45 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      clearTimeout(timer)
    }
  }, [])

  const opened = phase !== "closed"
  return (
    <>
      {/* desktop and tablet: the animated book */}
      <div ref={ref} className="hidden md:block">
        <div className="mx-auto w-full max-w-[1040px] [container-type:inline-size]">
          <div
            className="relative aspect-[2/1.24] transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] [perspective:220cqw]"
            style={{ transform: opened ? "translateX(0)" : "translateX(-25%)" }}
          >
            {/* soft shadow under the book */}
            <span aria-hidden className="absolute inset-x-[4%] -bottom-[3%] h-[8%] rounded-[50%] bg-black/20 blur-[2cqw]" />

            {/* right page */}
            <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden rounded-r-[1.4cqw] border border-l-0 border-[#0d5a49]/60">
              <RightPage />
            </div>

            {/* flipping pages */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                aria-hidden
                className="absolute inset-y-[0.6%] right-[0.4%] left-1/2 origin-left rounded-r-[1.2cqw] border border-black/5 [transform-style:preserve-3d]"
                style={{
                  background: paper,
                  ...dots,
                  transform: phase === "open" || phase === "opening" ? "rotateY(-180deg)" : "rotateY(0)",
                  transition: `transform 520ms cubic-bezier(.45,.05,.4,1) ${950 + i * 170}ms, opacity 200ms ${1600 + i * 170}ms`,
                  opacity: phase === "open" ? 0 : 1,
                  zIndex: 20 - i,
                  boxShadow: "inset 1.5cqw 0 2cqw -1.5cqw rgba(0,0,0,0.12)",
                }}
              />
            ))}

            {/* cover: front is the green journal, back is the left page */}
            <div
              className="absolute inset-y-0 right-0 left-1/2 z-30 origin-left [transform-style:preserve-3d]"
              style={{
                transform: opened ? "rotateY(-180deg)" : "rotateY(0)",
                transition: "transform 1000ms cubic-bezier(.3,.1,.25,1) 200ms",
                
              }}
            >
              <Cover />
              <div
                className="absolute inset-0 overflow-hidden rounded-l-[1.4cqw] border border-r-0 border-[#0d5a49]/60 [backface-visibility:hidden] [transform:rotateY(180deg)]"
                aria-hidden={!opened}
              >
                <LeftPage />
              </div>
            </div>

            {/* ribbon bookmark */}
            <span aria-hidden className="absolute -bottom-[5%] left-[51%] z-40 h-[10%] w-[2.4cqw] bg-[#5f8f72] [clip-path:polygon(0_0,100%_0,100%_100%,50%_78%,0_100%)]" />
            {/* spine */}
            <span aria-hidden className="absolute inset-y-0 left-1/2 z-10 w-[1.4cqw] -translate-x-1/2 bg-gradient-to-r from-black/10 via-black/[0.03] to-black/10" />
          </div>
        </div>
      </div>

      {/* phones: the two pages stacked. Each card holds a container twice its width, so the
          page's cqw sizes match the open book exactly (no scaling, so text stays crisp). */}
      <div className="grid gap-5 md:hidden">
        {[<LeftPage key="l" />, <RightPage key="r" />].map((page, i) => (
          <div key={i} className="relative aspect-[1/1.24] overflow-hidden rounded-[18px] border border-[#0d5a49]/50 shadow-[0_10px_30px_-14px_rgba(0,0,0,0.35)]">
            <div className="absolute inset-y-0 left-0 w-[200%] [container-type:inline-size]">
              <div className="h-full w-1/2">{page}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
