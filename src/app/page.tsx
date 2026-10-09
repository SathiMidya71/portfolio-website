import { AboutJournal } from "@/components/site/about"
import { CaseStudies } from "@/components/site/case-studies"
import { Contact } from "@/components/site/contact"
import { Hero } from "@/components/site/hero"
import { Principles } from "@/components/site/principles"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { Testimonials } from "@/components/site/testimonials"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <Hero />
        <CaseStudies />
        <AboutJournal />
        <Principles />
        <Testimonials />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
