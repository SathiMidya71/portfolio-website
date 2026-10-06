import Link from "next/link"
import { ArrowRight, Lock } from "lucide-react"
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
              className={`${surface} grid items-center gap-8 p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-8 md:grid-cols-[1fr_1.1fr]`}
            >
              <div className="flex flex-col gap-2.5">
                <span className="mb-1 font-heading text-2xl leading-none font-bold tracking-[-1px] text-faint">{c.year}</span>
                <div className="flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <Badge key={t} variant="secondary" className="rounded-full font-medium text-body">
                      {t}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-4xl leading-[1.08] tracking-[-0.84px] text-brand lg:text-[48px] lg:leading-[51.84px]">
                  {c.title}
                </h3>
                <p className="text-body">{c.summary}</p>
                <p className="text-[15px] font-semibold text-ink">{c.result}</p>
                <div className="mt-2">
                  {c.locked ? (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-soft">
                      <Lock className="size-4" /> Password required
                    </span>
                  ) : (
                    <Button asChild variant="outline" className={btnPill}>
                      <Link href={`#${c.slug}`}>
                        Read case study <ArrowRight />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
              {/* Cover placeholder: swap for <Image> once real covers are ready */}
              <div
                className="grid aspect-[16/11] place-items-center rounded-2xl text-sm font-semibold tracking-wide text-white/85 max-md:-order-1"
                style={{ background: c.cover }}
              >
                COVER IMAGE · 1600×1000
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
