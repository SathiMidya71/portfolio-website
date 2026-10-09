"use client"

import { useEffect, useRef, useState } from "react"
import { Activity, BellRing, ClipboardList, LayoutDashboard, MailPlus, MessagesSquare, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// Information architecture of the Arc Connect Portal, from Sathi's radial "Architecture" board,
// presented as a Dribbble-style board: a glowing Dashboard hub with rotating orbits, five icon
// cards and connectors that draw in, then keep flowing. Hovering a card lights up its line.
// From lg up the cards sit around the hub; below that they stack along a dashed spine.

type Group = {
  title: string
  icon: LucideIcon
  color: string
  ink: string
  tint: string
  items: { label: string; to?: string[] }[]
  /** lg placement (% of the board) and where its connector lands, in the 1000×700 viewBox */
  pos: string
  end: [number, number]
}

const groups: Group[] = [
  {
    title: "Care overview",
    icon: Activity,
    color: "#F26930",
    ink: "#b8461a",
    tint: "#fff1ea",
    pos: "lg:left-[3%] lg:top-[5%]",
    end: [300, 150],
    items: [{ label: "Therapy" }, { label: "Patients" }, { label: "Transmission" }, { label: "Care site" }, { label: "Announcement" }, { label: "Help Center" }],
  },
  {
    title: "Invitations",
    icon: MailPlus,
    color: "#6E62E5",
    ink: "#4a3fc0",
    tint: "#f0eefe",
    pos: "lg:right-[3%] lg:top-[5%]",
    end: [700, 150],
    items: [
      { label: "New invitation", to: ["Patients", "Clinics & hospitals", "Care sites"] },
      { label: "Received invitations" },
      { label: "Sent invitations", to: ["Care sites", "Caregivers"] },
    ],
  },
  {
    title: "Notifications",
    icon: BellRing,
    color: "#7FA82E",
    ink: "#5d7f1f",
    tint: "#f2f8e6",
    pos: "lg:left-[3%] lg:top-[57%]",
    end: [300, 500],
    items: [
      { label: "Notification settings", to: ["Adherence & SpO2 ranges", "Schedule"] },
      { label: "Notification summary", to: ["Archive", "Patients scoring below 50"] },
    ],
  },
  {
    title: "Communication",
    icon: MessagesSquare,
    color: "#3798BF",
    ink: "#23708f",
    tint: "#e8f4f9",
    pos: "lg:right-[3%] lg:top-[60%]",
    end: [700, 510],
    items: [{ label: "Share medical report" }, { label: "Messages", to: ["Clinics, doctors & caregivers"] }],
  },
  {
    title: "Patient records",
    icon: ClipboardList,
    color: "#344054",
    ink: "#344054",
    tint: "#eef0f3",
    pos: "lg:left-1/2 lg:top-[66%] lg:-translate-x-1/2",
    end: [500, 462],
    items: [{ label: "Reports" }, { label: "Medical records" }, { label: "Adherence score" }, { label: "Set new therapy goal" }],
  },
]

const hub: [number, number] = [500, 245]

function curve([x, y]: [number, number]) {
  const [hx, hy] = hub
  if (x === hx) return `M${hx},${hy} L${x},${y}`
  const mx = (hx + x) / 2
  return `M${hx},${hy} C${mx},${hy} ${mx},${y} ${x},${y}`
}

export function ArcPortalArchitecture() {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  const [hot, setHot] = useState<number | null>(null)

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
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <figure
      ref={ref}
      className="relative my-6 overflow-hidden rounded-[32px] bg-white p-5 shadow-[0_30px_60px_-40px_rgba(16,24,40,0.45)] ring-1 ring-black/5 sm:p-8"
      style={{
        backgroundImage:
          "radial-gradient(circle at 12% 10%, rgba(242,105,48,0.10), transparent 32%), radial-gradient(circle at 88% 12%, rgba(110,98,229,0.10), transparent 32%), radial-gradient(circle at 15% 90%, rgba(169,209,88,0.14), transparent 32%), radial-gradient(circle at 88% 88%, rgba(55,152,191,0.12), transparent 32%), radial-gradient(rgba(52,64,84,0.10) 1px, transparent 1.2px)",
        backgroundSize: "100% 100%, 100% 100%, 100% 100%, 100% 100%, 22px 22px",
      }}
    >
      <figcaption className="relative z-10 mb-6 flex flex-wrap items-center justify-between gap-3 lg:mb-0 lg:absolute lg:top-6 lg:left-1/2 lg:-translate-x-1/2">
        <span className="rounded-full bg-white/80 px-3.5 py-1.5 text-[12px] font-semibold tracking-[0.14em] text-soft uppercase shadow-sm ring-1 ring-black/5 backdrop-blur">
          Architecture · 5 areas
        </span>
      </figcaption>

      <div className="relative lg:h-[700px]">
        {/* connectors */}
        <svg aria-hidden viewBox="0 0 1000 700" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block">
          {groups.map((g, i) => (
            <g key={g.title} style={{ opacity: hot === null || hot === i ? 1 : 0.25, transition: "opacity 300ms" }}>
              {/* draws in */}
              <path
                d={curve(g.end)}
                fill="none"
                stroke={g.color}
                strokeOpacity={0.25}
                strokeWidth={hot === i ? 4 : 2.5}
                pathLength={1}
                strokeDasharray="1 1"
                style={{ strokeDashoffset: shown ? 0 : 1, transition: `stroke-dashoffset 900ms cubic-bezier(.6,.1,.3,1) ${i * 120}ms, stroke-width 300ms` }}
              />
              {/* keeps flowing outwards */}
              <path
                d={curve(g.end)}
                fill="none"
                stroke={g.color}
                strokeWidth={hot === i ? 3.5 : 2.5}
                strokeLinecap="round"
                strokeDasharray="2 14"
                className="motion-safe:animate-[ia-flow_1.2s_linear_infinite]"
                style={{ opacity: shown ? 1 : 0, transition: `opacity 400ms ${900 + i * 120}ms` }}
              />
              <circle cx={g.end[0]} cy={g.end[1]} r={hot === i ? 7 : 5} fill="#fff" stroke={g.color} strokeWidth={2.5} style={{ opacity: shown ? 1 : 0, transition: `opacity 300ms ${800 + i * 120}ms, r 300ms` }} />
            </g>
          ))}
        </svg>

        {/* hub */}
        <div
          className="relative z-10 mx-auto mb-8 grid size-44 place-items-center lg:absolute lg:top-[35%] lg:left-1/2 lg:mb-0 lg:-translate-x-1/2 lg:-translate-y-1/2"
          style={{ opacity: shown ? 1 : 0, scale: shown ? "1" : "0.6", transition: "opacity 500ms, scale 700ms cubic-bezier(.34,1.56,.64,1)" }}
        >
          <span aria-hidden className="absolute inset-0 rounded-full border-2 border-dashed border-[#02594e]/25 motion-safe:animate-[spin_24s_linear_infinite]" />
          <span aria-hidden className="absolute inset-4 rounded-full border border-[#02594e]/15 motion-safe:animate-[spin_16s_linear_infinite_reverse]">
            <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-[#A9D158]" />
          </span>
          <span aria-hidden className="absolute inset-7 rounded-full bg-[#02594e]/20 motion-safe:animate-ping [animation-duration:2.6s]" />
          <span className="relative grid size-28 place-items-center rounded-full bg-gradient-to-br from-[#0d7a68] to-[#02594e] text-center text-white shadow-[0_18px_40px_-12px_rgba(2,89,78,0.7)] ring-[6px] ring-white">
            <span>
              <LayoutDashboard className="mx-auto mb-1 size-6 opacity-90" aria-hidden />
              <span className="font-heading text-[17px] font-semibold">Dashboard</span>
            </span>
          </span>
        </div>

        {/* cards (phones: stacked along a dashed spine) */}
        <div className="relative grid gap-4 max-lg:border-l-2 max-lg:border-dashed max-lg:border-[#02594e]/20 max-lg:pl-5 lg:contents">
          {groups.map((g, i) => {
            const Icon = g.icon
            return (
              <div
                key={g.title}
                onPointerEnter={() => setHot(i)}
                onPointerLeave={() => setHot(null)}
                className={cn(
                  "group relative z-10 rounded-[22px] bg-white/90 p-4 shadow-[0_14px_34px_-22px_rgba(16,24,40,0.5)] ring-1 ring-black/5 backdrop-blur transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_44px_-22px_rgba(16,24,40,0.55)] lg:absolute lg:w-[30%]",
                  g.pos
                )}
                style={{
                  opacity: shown ? 1 : 0,
                  translate: shown ? undefined : "0 18px",
                  transition: `opacity 500ms ${500 + i * 140}ms, translate 600ms cubic-bezier(.2,.7,.2,1) ${500 + i * 140}ms, box-shadow 300ms`,
                }}
              >
                <span aria-hidden className="absolute top-6 -left-[27px] size-3 rounded-full ring-4 ring-white lg:hidden" style={{ background: g.color }} />
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-110" style={{ background: g.tint, color: g.color }}>
                    <Icon className="size-5" strokeWidth={2} aria-hidden />
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold text-ink">{g.title}</span>
                    <span className="block text-[12px] text-soft">{g.items.length} sections</span>
                  </span>
                </div>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {g.items.map((it) => (
                    <li key={it.label} className={cn(it.to && "w-full")}>
                      <span className="inline-block rounded-full px-2.5 py-1 text-[13px] font-medium" style={{ background: g.tint, color: g.ink }}>
                        {it.label}
                      </span>
                      {it.to && (
                        <span className="mt-1 ml-2 flex flex-wrap gap-1">
                          {it.to.map((t) => (
                            <span key={t} className="rounded-full border border-dashed px-2 py-0.5 text-[11.5px] text-body" style={{ borderColor: `${g.color}66` }}>
                              ↳ {t}
                            </span>
                          ))}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </figure>
  )
}
