import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { about, profile } from "@/lib/content"
import { Reveal } from "./reveal"
import { Section, btnPill, surface } from "./section"

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <Card className={`${surface} h-full p-6 sm:p-10`}>
            <p className="mb-5 text-[19px] leading-[1.3] font-medium text-ink sm:text-2xl">{about.eyebrow}</p>
            <h2 className="mb-6 text-[38px] leading-none tracking-[-1.28px] text-brand md:text-[48px] lg:text-[64px]">
              {about.headline[0]}
              <br />
              <span className="text-ink">{about.headline[1]}</span>
            </h2>
            <p className="mb-7 max-w-[560px] text-lg leading-relaxed text-body">{about.body}</p>
            <Button asChild variant="outline" className={`${btnPill} self-start`}>
              <Link href="#contact">
                Learn more about me <ArrowRight />
              </Link>
            </Button>
          </Card>
        </Reveal>
        <Reveal delay={100}>
          <Card className={`${surface} relative h-full min-h-[380px] overflow-hidden`}>
            <Image
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              fill
              sizes="(min-width: 1024px) 400px, 100vw"
              className="object-cover object-[center_20%]"
            />
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}
