import { Card, CardContent } from "@/components/ui/card"
import { skills } from "@/lib/content"
import { Reveal } from "./reveal"
import { Section, SectionHeading, surface } from "./section"

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading eyebrow="Toolkit" title="How I work" />
      <div className="grid gap-5 md:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.title} delay={i * 80}>
            <Card className={`${surface} h-full`}>
              <CardContent className="p-6">
                <h3 className="mb-4 text-[28px] leading-[25.2px] text-ink">{group.title}</h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="rounded-full bg-cream px-3 py-1 text-sm font-medium text-ink">
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
