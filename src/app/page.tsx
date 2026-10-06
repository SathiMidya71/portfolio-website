import { About } from "@/components/site/about"
import { CaseStudies } from "@/components/site/case-studies"
import { Contact } from "@/components/site/contact"
import { Experience } from "@/components/site/experience"
import { Hero } from "@/components/site/hero"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { Skills } from "@/components/site/skills"
import { Testimonials } from "@/components/site/testimonials"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <Hero />
        <About />
        <CaseStudies />
        <Experience />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
