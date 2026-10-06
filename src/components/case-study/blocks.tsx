import Image from "next/image"
import { Roboto } from "next/font/google"
import type { Block } from "@/lib/case-studies/types"
import { cn } from "@/lib/utils"

// Only used to preview the project's own typeface in the visual-system block
const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700", "900"] })

const text = "max-w-[720px]"
const glass = "glass rounded-[20px] shadow-[0_1px_2px_rgba(16,24,40,0.03)]"
const personaTints = ["#ffd6ae", "#d9d6fe", "#b2ddff", "#c8ead8"]

/** True when dark text reads better than white on this background. */
function isLight(hex: string) {
  const n = parseInt(hex.slice(1), 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  return 0.299 * r + 0.587 * g + 0.114 * b > 150
}

function Num({ n }: { n: number }) {
  return <span className="font-heading text-sm font-semibold text-faint tabular-nums">{String(n).padStart(2, "0")}</span>
}

export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "lead":
      return <p className={cn(text, "text-[21px] leading-[1.45] font-medium text-ink md:text-2xl")}>{block.text}</p>

    case "p":
      return <p className={cn(text, "text-lg leading-[1.65] text-ink/90 md:text-xl")}>{block.text}</p>

    case "h3":
      return <h3 className="mt-6 text-[22px] leading-tight text-ink md:text-[26px]">{block.text}</h3>

    case "list":
      return (
        <ul className={cn(text, "grid gap-3")}>
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-lg leading-[1.6] text-ink/90 md:text-xl">
              <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-brand" />
              {item}
            </li>
          ))}
        </ul>
      )

    case "figure":
      return (
        <figure className="my-4">
          <div
            className={cn(
              "overflow-hidden rounded-[20px] ring-1 ring-black/5",
              block.dark ? "bg-[#000229]" : "bg-sand"
            )}
          >
            <Image
              src={block.image.src}
              alt={block.image.alt}
              width={block.image.width}
              height={block.image.height}
              sizes="(min-width: 1200px) 860px, 100vw"
              className="h-auto w-full"
            />
          </div>
          {block.caption && <figcaption className="mt-3 text-[15px] font-medium text-soft">{block.caption}</figcaption>}
        </figure>
      )

    case "cards":
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          {block.items.map((c, i) => (
            <div key={c.title} className={cn(glass, "flex flex-col gap-3 p-6")}>
              <Num n={i + 1} />
              <h4 className="text-[19px] leading-snug font-semibold text-ink">{c.title}</h4>
              <p className="text-base leading-relaxed text-body">{c.text}</p>
            </div>
          ))}
        </div>
      )

    case "findings":
      return (
        <ol className="grid gap-px overflow-hidden rounded-[20px] bg-line">
          {block.items.map((f, i) => (
            <li key={f.title} className="grid gap-2 bg-white/80 p-6 sm:grid-cols-[56px_1fr] sm:gap-6 sm:p-7">
              <span className="font-heading text-[32px] leading-none font-semibold text-brand/70">{i + 1}</span>
              <div>
                <h4 className="text-[19px] leading-snug font-semibold text-ink md:text-xl">{f.title}</h4>
                <p className="mt-1.5 text-base leading-relaxed text-body md:text-[17px]">{f.text}</p>
                {f.source && <p className="mt-3 text-[13px] font-medium text-soft">Heard from: {f.source}</p>}
              </div>
            </li>
          ))}
        </ol>
      )

    case "chips":
      return (
        <ul className="flex flex-wrap gap-2">
          {block.items.map((c, i) => (
            <li
              key={c}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[15px] font-medium text-ink shadow-[0_1px_2px_rgba(16,24,40,0.06)]"
            >
              <span aria-hidden className="size-2.5 rounded-full" style={{ background: personaTints[i % personaTints.length] }} />
              {c}
            </li>
          ))}
        </ul>
      )

    case "personas":
      return (
        <div className="grid gap-4 md:grid-cols-2">
          {block.items.map((p, i) => (
            <article key={p.name} className={cn(glass, "p-6")}>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="grid size-11 place-items-center rounded-full text-sm font-bold text-ink"
                  style={{ background: personaTints[i % personaTints.length] }}
                >
                  {p.name.split(" ").map((w) => w[0]).join("")}
                </span>
                <div>
                  <h4 className="text-[18px] leading-tight font-semibold text-ink">{p.name}</h4>
                  <p className="text-sm font-medium text-brand">{p.role}</p>
                </div>
              </div>
              {[
                { label: "Goals", items: p.goals },
                { label: "Frustrations", items: p.frustrations },
              ].map((g) => (
                <div key={g.label} className="mt-5">
                  <p className="mb-2 text-[11px] font-semibold tracking-[0.12em] text-soft uppercase">{g.label}</p>
                  <ul className="grid gap-1.5">
                    {g.items.map((item) => (
                      <li key={item} className="flex gap-2 text-[15px] leading-snug text-body">
                        <span aria-hidden className="mt-[0.55em] size-1 shrink-0 rounded-full bg-body/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </article>
          ))}
        </div>
      )

    case "quadrants":
      return (
        <div className="grid overflow-hidden rounded-[20px] bg-line sm:grid-cols-2" style={{ gap: 1 }}>
          {block.items.map((q) => (
            <div key={q.title} className="bg-white/80 p-6 sm:p-7">
              <p className="mb-3 font-heading text-xl font-semibold text-brand">{q.title}</p>
              <ul className="grid gap-2">
                {q.items.map((item) => (
                  <li key={item} className="text-[15px] leading-snug text-body md:text-base">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )

    case "phases":
      return (
        <ol className="grid gap-4 md:grid-cols-3">
          {block.items.map((ph, i) => (
            <li key={ph.phase} className={cn(glass, "relative p-6")}>
              <div className="mb-4 flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-full bg-brand text-sm font-semibold text-white">{i + 1}</span>
                <h4 className="font-heading text-[22px] font-semibold text-ink">{ph.phase}</h4>
              </div>
              <ul className="grid gap-1.5">
                {ph.items.map((item) => (
                  <li key={item} className="text-[15px] text-body">
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      )

    case "visualSystem":
      return (
        <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
          <div className="grid grid-cols-3 gap-3">
            {block.colors.map((c) => (
              <div
                key={c.hex}
                className={cn("flex min-h-44 flex-col justify-end rounded-[16px] p-4", isLight(c.hex) ? "text-ink" : "text-white")}
                style={{ background: c.hex }}
              >
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="font-mono text-xs opacity-80">{c.hex}</p>
              </div>
            ))}
          </div>
          <div className={cn(roboto.className, "flex min-h-44 flex-col justify-between rounded-[16px] bg-[#000229] p-5 text-white")}>
            <span className="text-[72px] leading-none font-medium">Aa</span>
            <div className="flex flex-wrap justify-between gap-2 text-sm">
              <span className="font-bold">{block.typeface.name}</span>
              <span className="opacity-70">{block.typeface.weights}</span>
            </div>
          </div>
        </div>
      )
  }
}
