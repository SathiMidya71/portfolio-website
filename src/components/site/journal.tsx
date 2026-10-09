"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Coffee, Link2, Mail, MapPin, Palette, Waves } from "lucide-react"
import { experience, journal, profile } from "@/lib/content"
import { cn } from "@/lib/utils"

// "About me" as a journal: a green notebook that opens when it scrolls into view, flips a few
// pages, and lands on a spread with Sathi's work history, contact details, photo, tools and
// hobbies. The 3D animation runs from md up; phones get the two pages stacked, no animation.
// Sizes inside the book use container units (cqw) so it scales as one object.

const paper = "#fffdf8"
// dot-grid notebook paper
const dots = { backgroundImage: "radial-gradient(circle, #b9ae9a 0.13cqw, transparent 0.15cqw)", backgroundSize: "2cqw 2cqw", backgroundPosition: "1cqw 1cqw" }

/** Stagger slot for the "stuck on one by one" reveal (see .jr-pop in globals.css). */
const popDelay = (i: number) => ({ "--d": `${i * 110}ms` }) as React.CSSProperties

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
      <p style={popDelay(0)} className="jr-pop font-hand text-[4.6cqw] leading-none font-bold text-[#22303f]">
        {profile.name}
      </p>
      <div style={popDelay(1)} className="jr-pop mt-[1.2cqw] flex items-center gap-[1.2cqw]">
        <span className="rounded-[0.5cqw] bg-[#e4f1eb] px-[1cqw] py-[0.4cqw] text-[1.25cqw] font-semibold text-[#02594e]">{profile.role}</span>
        <span className="relative px-[1cqw] py-[0.3cqw] text-[1.25cqw] font-semibold text-[#22303f]">
          {journal.experienceYears}
          <svg aria-hidden viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute -inset-x-[0.8cqw] -inset-y-[0.6cqw] h-[calc(100%+1.2cqw)] w-[calc(100%+1.6cqw)] overflow-visible" fill="none">
            <path d="M8,22 C6,8 40,2 70,5 C96,8 98,30 70,35 C40,40 4,36 6,18 C8,10 20,6 30,5" stroke="#2e7fd6" strokeWidth="2.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
        </span>
      </div>

      {/* where I've worked */}
      <div className="mt-[1.6cqw]">
        <Tag d={2} color="#d9ecfd" rotate={-2}>where I&apos;ve worked</Tag>
      </div>
      <ul className="mt-[1cqw] grid gap-[0.3cqw]">
        {experience.map((e, i) => (
          <li key={e.company} style={popDelay(3 + i)} className="jr-pop grid grid-cols-[1fr_auto] items-baseline gap-[1cqw] font-hand text-[2cqw] leading-tight font-bold text-[#22303f]">
            <span className="flex items-center gap-[0.8cqw]">
              <span aria-hidden className="text-[1.6cqw] text-[#e8833a]">✦</span>
              {e.company}
            </span>
            <span className="text-[1.75cqw] text-[#4c6763]">{e.when.replace(" to ", " – ").replace("now", "now")}</span>
          </li>
        ))}
      </ul>

      {/* today note */}
      <div style={popDelay(7)} className="jr-pop absolute right-[2.4cqw] bottom-[11%] w-[44%] -rotate-1 overflow-hidden rounded-[0.8cqw] bg-white shadow-[0_0.5cqw_1.4cqw_-0.4cqw_rgba(0,0,0,0.25)]">
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
        className="jr-pop absolute bottom-[4%] left-[2.6cqw] w-[44%] rotate-1 p-[1.2cqw] pt-[1.6cqw] shadow-[0_0.4cqw_1cqw_-0.3cqw_rgba(0,0,0,0.25)]"
        style={{ ...popDelay(8), background: "#fafaf7", backgroundImage: "linear-gradient(#e7ecf2 1px,transparent 1px),linear-gradient(90deg,#e7ecf2 1px,transparent 1px)", backgroundSize: "1.2cqw 1.2cqw" }}
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
      <p style={popDelay(9)} className="jr-pop absolute right-[3cqw] bottom-[3.2%] -rotate-6 font-hand text-[1.6cqw] leading-[1.05] font-bold text-[#2e7fd6]">
        Research is how I listen.
        <br />
        Design is how I answer.
      </p>
      <span aria-hidden className="absolute inset-y-0 right-0 w-[3cqw] bg-gradient-to-l from-black/[0.07] to-transparent" />
    </div>
  )
}

/* ---------------- scrapbook stickers ---------------- */

/** Pasted-sticker look: a slight tilt and a layered shadow that follows the sticker's outline. */
const stuck = "[filter:drop-shadow(0_0.15cqw_0.15cqw_rgba(0,0,0,0.22))_drop-shadow(0_0.7cqw_0.8cqw_rgba(40,30,10,0.18))]"

function ImgSticker({ src, alt, w, rotate, d }: { src: string; alt: string; w: number; rotate: number; d: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={cn("jr-pop block h-auto", stuck)} style={{ ...popDelay(d), width: `${w}cqw`, rotate: `${rotate}deg` }} />
  )
}

/** Coded sticker: artwork on a white die-cut edge. */
function CodedSticker({ w, rotate, label, children, round, d }: { w: number; rotate: number; label: string; children: React.ReactNode; round?: boolean; d: number }) {
  return (
    <span
      role="img"
      aria-label={label}
      className={cn("jr-pop grid place-items-center bg-white p-[0.55cqw]", round ? "rounded-full" : "rounded-[1.6cqw]", stuck)}
      style={{ ...popDelay(d), width: `${w}cqw`, height: `${w}cqw`, rotate: `${rotate}deg` }}
    >
      {children}
    </span>
  )
}

function PaletteArt() {
  return (
    <svg viewBox="0 0 120 110" className="h-full w-full" aria-hidden>
      <path d="M58,10 C92,8 114,30 110,58 C106,82 86,100 60,100 C40,100 36,88 44,80 C50,74 46,66 36,68 C18,72 6,60 10,42 C14,22 32,11 58,10 Z" fill="#f3d9b1" stroke="#3b2a1a" strokeWidth="3" />
      <ellipse cx="34" cy="36" rx="9" ry="8" fill="#3aa1e8" stroke="#3b2a1a" strokeWidth="2.5" />
      <ellipse cx="62" cy="26" rx="9" ry="8" fill="#ef5a2a" stroke="#3b2a1a" strokeWidth="2.5" />
      <ellipse cx="88" cy="40" rx="9" ry="8" fill="#ffd23f" stroke="#3b2a1a" strokeWidth="2.5" />
      <ellipse cx="86" cy="70" rx="9" ry="8" fill="#fff" stroke="#3b2a1a" strokeWidth="2.5" />
      <circle cx="56" cy="56" r="2.6" fill="#3b2a1a" />
      <circle cx="70" cy="56" r="2.6" fill="#3b2a1a" />
      <path d="M58,64 Q63,69 68,64" fill="none" stroke="#3b2a1a" strokeWidth="2.5" strokeLinecap="round" />
      <g transform="rotate(28 104 62)">
        <rect x="100" y="40" width="7" height="58" rx="3.5" fill="#9b5a2e" stroke="#3b2a1a" strokeWidth="2.5" />
        <path d="M99,40 Q103.5,22 108,40 Z" fill="#3aa1e8" stroke="#3b2a1a" strokeWidth="2.5" />
      </g>
    </svg>
  )
}

function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-[60%] w-[60%]" aria-hidden>
      <path
        fill="#fff"
        d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"
      />
    </svg>
  )
}

function FigmaMark() {
  return (
    <svg viewBox="0 0 38 57" className="h-[70%]" aria-hidden>
      <path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
      <path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
      <path fill="#ff7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
      <path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
      <path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
    </svg>
  )
}

/** Paper luggage tag used as a group heading. */
function Tag({ children, color, rotate, d }: { children: React.ReactNode; color: string; rotate: number; d: number }) {
  return (
    <span
      className="jr-pop relative inline-flex items-center py-[0.5cqw] pr-[1.6cqw] pl-[2.4cqw] font-hand text-[2.3cqw] leading-none font-bold text-[#2b2b2b] shadow-[0_0.3cqw_0.5cqw_-0.2cqw_rgba(0,0,0,0.3)]"
      style={{ ...popDelay(d), background: color, rotate: `${rotate}deg`, clipPath: "polygon(1.2cqw 0,100% 0,100% 100%,1.2cqw 100%,0 50%)" }}
    >
      <span aria-hidden className="absolute left-[1.15cqw] size-[0.55cqw] rounded-full bg-[#fffdf8] ring-1 ring-black/20" />
      {children}
    </span>
  )
}


function InstagramSticker() {
  const handle = profile.instagramHandle
  const sticker = (
    <span
      className={cn("grid size-[5.4cqw] place-items-center rounded-[1.5cqw] border-[0.4cqw] border-white", stuck)}
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
    <span style={popDelay(16)} className="jr-pop group/ig absolute -right-[2.6cqw] -bottom-[1.8cqw] rotate-[10deg]">
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

/** Places a sticker inside a cluster (cqw offsets), so neighbours overlap. */
function Stuck({ x, y, z, children }: { x: number; y: number; z: number; children: React.ReactNode }) {
  return (
    <div className="absolute transition-transform duration-200 hover:z-10 hover:-translate-y-[0.4cqw] hover:scale-105" style={{ left: `${x}cqw`, top: `${y}cqw`, zIndex: z }}>
      {children}
    </div>
  )
}

/** Handwritten caption under a cluster. */
function Scribble({ x, y, rotate, children, d }: { x: number; y: number; rotate: number; children: React.ReactNode; d: number }) {
  return (
    <span className="jr-pop absolute font-hand text-[1.8cqw] leading-[0.95] font-bold whitespace-nowrap text-[#2e4fa8]" style={{ ...popDelay(d), left: `${x}cqw`, top: `${y}cqw`, rotate: `${rotate}deg` }}>
      {children}
    </span>
  )
}

function Group({ x, y, children }: { x: number; y: number; children: React.ReactNode }) {
  return (
    <div className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
      {children}
    </div>
  )
}

function RightPage() {
  return (
    <div className="relative h-full" style={{ background: paper, ...dots }}>
      <span aria-hidden className="absolute inset-y-0 left-0 w-[3cqw] bg-gradient-to-r from-black/[0.07] to-transparent" />

      {/* daily tools: an overlapping cluster (the pixel creature is Claude's mascot) */}
      <Group x={4} y={4}>
        <Tag color="#ffd6ae" rotate={-3} d={10}>my daily tools</Tag>
        <div className="relative mt-[0.6cqw] h-[14cqw] w-[20cqw]">
          <Stuck x={0} y={0.8} z={2}>
            <ImgSticker src="/about/stickers/pixel-heart.png" d={11} alt="Claude Code mascot sticker: a pixel creature with a heart" w={8.2} rotate={-7} />
          </Stuck>
          <Stuck x={7} y={-0.4} z={3}>
            <CodedSticker w={5.8} rotate={8} label="GitHub" d={12} round>
              <span className="grid h-full w-full place-items-center rounded-full bg-[#24292f]">
                <GithubMark />
              </span>
            </CodedSticker>
          </Stuck>
          <Stuck x={11.2} y={3.2} z={1}>
            <CodedSticker w={5.8} rotate={-5} label="Figma" d={13}>
              <FigmaMark />
            </CodedSticker>
          </Stuck>
          <Scribble x={0.4} y={9.6} rotate={-4} d={14}>
            Claude Code,
            <br />
            GitHub &amp; Figma
          </Scribble>
        </div>
      </Group>

      {/* photo, taped in, with an Instagram sticker */}
      <div style={popDelay(15)} className="jr-pop absolute top-[26%] left-1/2 z-10 w-[32%] -translate-x-1/2 rotate-2 bg-white p-[0.8cqw] pb-[2.8cqw] shadow-[0_0.6cqw_1.6cqw_-0.4cqw_rgba(0,0,0,0.35)]">
        <span aria-hidden className="absolute -top-[1.2cqw] left-1/2 z-10 h-[2.4cqw] w-[9cqw] -translate-x-1/2 -rotate-3 bg-[#bfe3d3]/80" />
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image src="/about/sathi-journal.jpg" alt={`${profile.name} smiling, taking a mirror selfie in a bright tie-dye scarf`} fill sizes="240px" className="object-cover" />
        </div>
        <p className="absolute inset-x-0 bottom-[0.6cqw] text-center font-hand text-[1.8cqw] leading-none font-bold text-[#344054]">that&apos;s me!</p>
        <InstagramSticker />
      </div>

      {/* I love coffee */}
      <Group x={66} y={6}>
        <Tag color="#fde3cf" rotate={3} d={17}>I love coffee</Tag>
        <div className="relative mt-[0.6cqw] h-[12cqw] w-[14cqw]">
          <Stuck x={2.4} y={0.6} z={2}>
            <ImgSticker src="/about/stickers/coffee.png" d={18} alt="Takeaway coffee cup sticker" w={6.2} rotate={-9} />
          </Stuck>
          <Scribble x={9} y={3.4} rotate={-8} d={19}>
            one more
            <br />
            cup ♥
          </Scribble>
        </div>
      </Group>

      {/* lifestyle */}
      <Group x={4} y={66}>
        <Tag color="#d9ecfd" rotate={2} d={20}>lifestyle</Tag>
        <div className="relative mt-[0.4cqw] h-[14cqw] w-[18cqw]">
          <Stuck x={0.6} y={0.8} z={2}>
            <ImgSticker src="/about/stickers/swimming.png" d={21} alt="Swimming sticker" w={9.4} rotate={-7} />
          </Stuck>
          <Scribble x={10.6} y={4.6} rotate={-6} d={22}>
            swimming
            <br />
            keeps me calm
          </Scribble>
        </div>
      </Group>

      {/* hobby */}
      <Group x={62} y={66}>
        <Tag color="#e9defd" rotate={-2} d={23}>hobby</Tag>
        <div className="relative mt-[0.4cqw] h-[14cqw] w-[18cqw]">
          <Stuck x={0.6} y={0.6} z={2}>
            <CodedSticker w={8.6} rotate={8} label="Painting palette sticker" d={24} round>
              <PaletteArt />
            </CodedSticker>
          </Stuck>
          <Scribble x={10} y={4.4} rotate={5} d={25}>
            painting
            <br />
            on weekends
          </Scribble>
        </div>
      </Group>
    </div>
  )
}

/* ---------------- book ---------------- */

type Phase = "closed" | "opening" | "turning" | "open"

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
    const timers: ReturnType<typeof setTimeout>[] = []
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        // cover swings open, then (once it has landed) blank pages turn over it, then content is stuck on
        timers.push(setTimeout(() => setPhase("opening"), 250))
        timers.push(setTimeout(() => setPhase("turning"), 1400))
        timers.push(setTimeout(() => setPhase("open"), 2350))
      },
      { threshold: 0.45 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [])

  const opened = phase !== "closed"
  return (
    <>
      {/* desktop and tablet: the animated book */}
      <div ref={ref} className="hidden md:block" data-reveal={phase === "open" ? "on" : "off"}>
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
                  transform: phase === "turning" || phase === "open" ? "rotateY(-180deg)" : "rotateY(0)",
                  transition: `transform 520ms cubic-bezier(.45,.05,.4,1) ${i * 170}ms, opacity 160ms`,
                  opacity: phase === "open" ? 0 : 1,
                  // under the closed cover; above it once it has opened, so blank pages turn over onto the left page
                  zIndex: phase === "closed" || phase === "opening" ? 20 - i : 45 - i,
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
              {/* back of the cover: blank paper while the pages turn */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-l-[1.4cqw] border border-r-0 border-[#0d5a49]/60 [backface-visibility:hidden] [transform:rotateY(180deg)]"
                style={{ background: paper, ...dots }}
              />
            </div>

            {/* once open, a flat left page takes over (repaints reliably and its links work) */}
            <div
              aria-hidden={phase !== "open"}
              className={cn("absolute inset-y-0 left-0 z-30 w-1/2 overflow-hidden rounded-l-[1.4cqw] border border-r-0 border-[#0d5a49]/60", phase !== "open" && "invisible")}
            >
              <LeftPage />
            </div>

            {/* ribbon bookmark */}
            <span aria-hidden className="absolute -bottom-[5%] left-[51%] z-50 h-[10%] w-[2.4cqw] bg-[#5f8f72] [clip-path:polygon(0_0,100%_0,100%_100%,50%_78%,0_100%)]" />
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
