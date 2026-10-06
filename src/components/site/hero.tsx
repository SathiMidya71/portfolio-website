import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { profile, stats } from "@/lib/content"
import { Reveal } from "./reveal"
import { Section, btnPill, btnPrimary, surface } from "./section"

function Org({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-brand underline decoration-brand/30 underline-offset-4">{children}</span>
  )
}

export function Hero() {
  return (
    <Section>
      <Reveal>
        <Card className={`${surface} relative overflow-hidden p-6 sm:p-10`}>
          <div aria-hidden className="dot-grid pointer-events-none absolute inset-0" />
          <div className="relative">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-medium text-brand">
              <span className="size-2 rounded-full bg-emerald-600 shadow-[0_0_0_3px_rgba(18,163,127,.18)]" />
              {profile.status}
            </span>

            <h1 className="text-[44px] leading-[0.95] tracking-[-0.02em] text-brand md:text-[64px] lg:text-[88px] lg:leading-[0.92]">
              Hi, I&apos;m {profile.firstName}.
              <br />
              <span className="bg-gradient-to-r from-brand to-brand/70 bg-clip-text pb-[0.06em] text-transparent">
                {profile.role}.
              </span>
            </h1>

            <p className="mt-8 max-w-[1120px] text-[19px] leading-[1.4] font-medium text-ink sm:text-2xl">
              I turn <strong className="font-semibold">complex B2B workflows</strong> into{" "}
              <strong className="font-semibold">simple, research-backed products</strong> that people actually adopt.
              I&apos;m designing R&amp;D and supply-chain platforms at <Org>Scimplify</Org>. Before that, I designed
              enterprise healthcare apps at <Org>ABM Respiratory Care</Org>. My background in fashion and product
              design means I care about craft, down to the last pixel.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className={btnPrimary}>
                <Link href="#work">
                  View case studies <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" className={btnPill}>
                <a href={profile.resume} target="_blank" rel="noopener">
                  Download resume
                </a>
              </Button>
            </div>

            <Separator className="mt-10 bg-line" />
            <dl className="grid grid-cols-2 gap-x-4 gap-y-6 pt-7 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-heading text-[36px] leading-none font-bold tracking-[-2px] text-brand sm:text-[48px]">
                    {s.value}
                  </dd>
                  <dd className="mt-1 text-sm font-medium text-ink">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Card>
      </Reveal>
    </Section>
  )
}
