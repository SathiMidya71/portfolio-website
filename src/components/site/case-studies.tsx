import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Lock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { caseStudies } from "@/lib/content"
import { Reveal } from "./reveal"
import { Section, SectionHeading, btnPill, surface } from "./section"

export function CaseStudies() {
  return (
    <Section id="work">
      <SectionHeading
        eyebrow="Selected work"
        title="Case studies"
        aside={<p className="max-w-[420px] text-body">A few projects from my full-time roles. Detailed write-ups are coming soon.</p>}
      />
      <div className="grid gap-5">
        {caseStudies.map((c) => (
          <Reveal key={c.slug}>
            <Card
              className={`${surface} grid items-center gap-6 p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-6 md:grid-cols-[1.5fr_1fr] md:gap-10`}
            >
              <div className="flex flex-col gap-2">
                {c.logo ? (
                  <div className="mb-1 flex items-center gap-3">
                    <a
                      href={c.logo.href}
                      target="_blank"
                      rel="noopener"
                      className="rounded-md transition-opacity hover:opacity-75 focus-visible:ring-2 focus-visible:ring-[var(--tone-purple)] focus-visible:outline-none"
                    >
                      <Image
                        src={c.logo.src}
                        alt={`${c.logo.alt} website`}
                        width={c.logo.width}
                        height={c.logo.height}
                        className="h-8 w-auto"
                      />
                    </a>
                    <span aria-hidden className="h-6 w-px bg-line" />
                    <a
                      href={c.logo.href}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-0.5 text-[13px] font-medium text-soft transition-colors hover:text-[var(--tone-purple)]"
                    >
                      {c.logo.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </a>
                  </div>
                ) : (
                  <span className="mb-1 font-heading text-lg leading-none font-bold tracking-[-0.5px] text-faint">{c.year}</span>
                )}
                <div className="flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <Badge key={t} variant="secondary" className="rounded-full text-xs font-medium text-body">
                      {t}
                    </Badge>
                  ))}
                </div>
                <h3 className="mt-1 text-[26px] leading-[1.15] tracking-[-0.5px] text-brand lg:text-[30px]">
                  {c.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-body">{c.summary}</p>
                <p className="text-sm font-semibold text-ink">{c.result}</p>
                <div className="mt-1.5">
                  {c.locked ? (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-soft">
                      <Lock className="size-4" /> Password required
                    </span>
                  ) : (
                    <Button asChild variant="outline" className={`${btnPill} h-9 px-4 text-sm`}>
                      <Link href={c.href ?? `#${c.slug}`}>
                        Read case study <ArrowRight />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
              <Link
                href={c.href ?? "#work"}
                aria-hidden={!c.href}
                tabIndex={-1}
                className="relative grid aspect-[16/11] place-items-center overflow-hidden rounded-2xl text-sm font-semibold tracking-wide text-white/85 max-md:-order-1"
                style={{ background: c.cover }}
              >
                {c.image ? (
                  <Image
                    src={c.image.src}
                    alt={c.image.alt}
                    fill
                    sizes="(min-width: 768px) 420px, 100vw"
                    className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                  />
                ) : (
                  "COVER IMAGE · 1600×1000"
                )}
              </Link>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
