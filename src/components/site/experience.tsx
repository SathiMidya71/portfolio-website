import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { experience, profile } from "@/lib/content"
import { Reveal } from "./reveal"
import { Section, SectionHeading, btnPill, surface } from "./section"

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've designed"
        aside={
          <Button asChild variant="outline" className={btnPill}>
            <a href={profile.resume} target="_blank" rel="noopener">
              Full resume <ArrowRight />
            </a>
          </Button>
        }
      />
      <Reveal>
        <Card className={`${surface} px-6 py-2 sm:px-10 sm:py-4`}>
          {experience.map((x) => (
            <div
              key={x.company}
              className="grid items-baseline gap-1 border-b border-line py-5 last:border-b-0 sm:grid-cols-[160px_1fr_auto] sm:gap-6"
            >
              <span className="text-[15px] font-medium text-soft">{x.when}</span>
              <div>
                <h3 className="text-[28px] leading-[1.1] text-ink">{x.company}</h3>
                <p className="text-[15px] text-body">{x.role}</p>
              </div>
              <Badge variant="secondary" className="w-fit rounded-full font-normal text-body">
                {x.tag}
              </Badge>
            </div>
          ))}
        </Card>
      </Reveal>
    </Section>
  )
}
