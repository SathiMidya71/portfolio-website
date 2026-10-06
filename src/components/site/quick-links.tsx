import Link from "next/link"
import { ArrowRight, LayoutGrid, Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { quickLinks } from "@/lib/content"
import { Reveal } from "./reveal"
import { Section, btnPrimary, surface } from "./section"

const icons = { layout: LayoutGrid, search: Search, sparkles: Sparkles }

export function QuickLinks() {
  return (
    <Section>
      <div className="grid gap-5 md:grid-cols-3">
        {quickLinks.map((q, i) => {
          const Icon = icons[q.icon]
          return (
            <Reveal key={q.title} delay={i * 80}>
              <Card className={`${surface} h-full transition-transform duration-300 hover:-translate-y-1`}>
                <CardContent className="flex h-full flex-col gap-3 p-6">
                  <div className="grid size-11 place-items-center rounded-xl bg-brand/8 text-brand">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-2 text-[28px] leading-[25.2px] text-ink">{q.title}</h3>
                  <p className="flex-1 text-sm leading-[21px] font-medium text-ink">{q.text}</p>
                  <Button asChild className={`${btnPrimary} self-start`}>
                    <Link href={q.href}>
                      {q.cta} <ArrowRight />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
