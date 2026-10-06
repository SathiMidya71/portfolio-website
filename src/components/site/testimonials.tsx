import { Card, CardContent } from "@/components/ui/card"
import { testimonials } from "@/lib/content"
import { Reveal } from "./reveal"
import { Section, SectionHeading, surface } from "./section"

export function Testimonials() {
  return (
    <Section>
      <SectionHeading eyebrow="Kind words" title="What it's like working with me" />
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={i} delay={i * 80}>
            <Card className={`${surface} h-full`}>
              <CardContent className="flex h-full flex-col gap-5 p-6">
                <blockquote className="flex-1 font-medium text-ink before:mb-2 before:block before:font-heading before:text-[56px] before:leading-[0.6] before:text-brand before:content-['\201C']">
                  {t.quote}
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-full bg-sand font-semibold text-body">{t.initials}</div>
                  <div>
                    <p className="text-[15px] font-semibold text-ink">{t.name}</p>
                    <p className="text-[13px] text-soft">{t.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
