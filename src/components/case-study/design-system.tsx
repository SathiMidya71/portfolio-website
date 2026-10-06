import { Roboto } from "next/font/google"
import {
  ChevronLeft,
  CirclePlus,
  House,
  Lock,
  Mail,
  MailOpen,
  Monitor,
  Ruler,
  Settings,
  Share2,
  Tablet,
  User,
  type LucideIcon,
} from "lucide-react"
import type { Block } from "@/lib/case-studies/types"
import { cn } from "@/lib/utils"

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] })

type DesignSystemBlock = Extract<Block, { type: "designSystem" }>

// Lucide equivalents of the app's icon set
export const iconMap = {
  home: House,
  share: Share2,
  invitations: MailOpen,
  back: ChevronLeft,
  mail: Mail,
  device: Tablet,
  lock: Lock,
  units: Ruler,
  profile: User,
  "device-details": Monitor,
  add: CirclePlus,
  settings: Settings,
} satisfies Record<string, LucideIcon>

export type IconKey = keyof typeof iconMap

/** True when dark text reads better than white on this background. */
function isLight(hex: string) {
  const n = parseInt(hex.slice(1), 16)
  return 0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255) > 150
}

// Shared card + label styles so every card has identical padding and type
const card = "rounded-[20px] bg-white/80 p-5 ring-1 ring-black/[0.05] shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
const cardLabel = "mb-4 text-[11px] font-semibold tracking-[0.12em] text-soft uppercase"

function Swatch({ name, hex, large }: { name: string; hex: string; large?: boolean }) {
  return (
    <div
      className={cn(
        "flex flex-col justify-end rounded-xl p-2 ring-1 ring-black/[0.06]",
        large ? "h-full min-h-16" : "h-14"
      )}
      style={{ background: hex }}
    >
      <div className={cn("w-fit rounded-lg px-2 py-1 backdrop-blur", isLight(hex) ? "bg-white/70" : "bg-white/90")}>
        <p className="text-[12px] leading-tight font-semibold text-ink">{name}</p>
        <p className="font-mono text-[10px] leading-tight text-body">{hex}</p>
      </div>
    </div>
  )
}

export function DesignSystemView({ block }: { block: DesignSystemBlock }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Colour */}
      <section className={cn(card, "flex flex-col")}>
        <p className={cardLabel}>Colour</p>
        <div className="grid flex-1 grid-rows-[1fr_auto] gap-2">
          <div className="grid grid-cols-2 grid-rows-2 gap-2">
            {block.brand.map((c) => (
              <Swatch key={c.hex} {...c} large />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {block.neutrals.map((c) => (
              <Swatch key={c.hex} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className={card}>
        <p className={cardLabel}>Typography</p>
        <div className={roboto.className}>
          <div className="flex items-end justify-between gap-4 border-b border-line pb-3">
            <span className="text-[48px] leading-[0.8] font-medium text-ink">Aa</span>
            <div className="text-right">
              <p className="text-base font-bold text-ink">{block.typeface}</p>
              <p className="text-[12px] text-soft">{block.weights.join(" · ")}</p>
            </div>
          </div>
          <ul>
            {block.scale.map((px) => (
              <li key={px} className="flex items-baseline justify-between gap-4 border-b border-line py-1.5 last:border-0">
                <span className="truncate leading-none text-ink" style={{ fontSize: Math.round(px * 0.8), fontWeight: px >= 24 ? 500 : 400 }}>
                  Arc Connect
                </span>
                <span className="shrink-0 font-sans text-[12px] font-medium text-soft tabular-nums">{px}px</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Icons */}
      <section className={cn(card, "md:col-span-2")}>
        <p className={cardLabel}>Icons</p>
        <ul className="grid grid-cols-4 gap-x-2 gap-y-4 sm:grid-cols-6 lg:grid-cols-12">
          {block.icons.map((ic) => {
            const Icon = iconMap[ic.icon]
            return (
              <li key={ic.icon} className="flex flex-col items-center gap-1.5">
                <span className="grid size-11 place-items-center rounded-xl bg-cream ring-1 ring-black/[0.05]">
                  <Icon className="size-5 text-black" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="text-center text-[11px] leading-tight font-medium text-body">{ic.label}</span>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
