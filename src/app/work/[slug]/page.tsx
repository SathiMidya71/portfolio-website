import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, CircleCheck } from "lucide-react"
import { BlockView } from "@/components/case-study/blocks"
import { Toc } from "@/components/case-study/toc"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { caseStudyPages, getCaseStudy } from "@/lib/case-studies"

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return caseStudyPages.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const cs = getCaseStudy((await params).slug)
  if (!cs) return {}
  return {
    title: cs.seo.title,
    description: cs.seo.description,
    openGraph: { title: cs.seo.title, description: cs.seo.description, images: [cs.hero.src] },
  }
}

const shell = "mx-auto w-full max-w-[1200px] px-5 sm:px-10"
const label = "mb-2 text-[11px] font-semibold tracking-[0.12em] text-soft uppercase"

export default async function CaseStudyPage({ params }: Params) {
  const cs = getCaseStudy((await params).slug)
  if (!cs) notFound()

  const toc = [{ id: "impact-overview", label: "Impact overview" }, ...cs.sections.map((s) => ({ id: s.id, label: s.nav }))]
  const others = caseStudyPages.filter((c) => c.slug !== cs.slug)

  return (
    <>
      <SiteHeader />
      <main>
        {/* ---------- Header ---------- */}
        <header className={`${shell} pt-6 md:pt-10`}>
          <Link href="/#work" className="inline-flex items-center gap-1.5 text-sm font-medium text-body hover:text-brand">
            <ArrowLeft className="size-4" /> All work
          </Link>
          <p className="mt-10 text-sm font-semibold tracking-[0.08em] text-brand uppercase">{cs.eyebrow}</p>
          <h1 className="mt-4 text-[42px] leading-[0.98] tracking-[-0.02em] text-brand md:text-[64px] lg:text-[84px] lg:leading-none">
            {cs.title[0]}
            <br />
            <span className="bg-gradient-to-r from-brand to-brand/70 bg-clip-text pb-[0.06em] text-transparent">{cs.title[1]}</span>
          </h1>

          <dl className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-2 lg:mt-16 lg:grid-cols-[minmax(0,400px)_1fr_1fr_1fr] lg:gap-10">
            <div>
              <dt className={label}>Overview</dt>
              <dd className="text-[17px] leading-[1.55] font-medium text-ink">{cs.meta.overview}</dd>
            </div>
            <div>
              <dt className={label}>My role</dt>
              <dd className="text-[17px] leading-[1.55] font-medium text-ink">{cs.meta.role}</dd>
            </div>
            <div>
              <dt className={label}>Team</dt>
              <dd>
                <div className="flex">
                  {cs.meta.team.map((m, i) => (
                    <span
                      key={m.initials}
                      title={m.label}
                      className={`grid size-10 place-items-center rounded-full border-2 border-cream text-[11px] font-bold text-white ${i ? "-ml-2" : ""} ${i === 0 ? "bg-brand" : "bg-[#182230]"}`}
                    >
                      {m.initials}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm leading-snug text-body">{cs.meta.team.map((m) => m.label).join(" · ")}</p>
              </dd>
            </div>
            <div>
              <dt className={label}>Timeline</dt>
              <dd className="text-[17px] leading-[1.55] font-medium text-ink">{cs.meta.timeline}</dd>
            </div>
          </dl>
        </header>

        {/* ---------- Hero image ---------- */}
        <div className={`${shell} mt-12 lg:mt-16`}>
          <div
            className="relative aspect-[4/3] overflow-hidden rounded-[24px] md:aspect-[16/9]"
            style={{ background: cs.hero.background ?? "var(--sand)" }}
          >
            <Image
              src={cs.hero.src}
              alt={cs.hero.alt}
              fill
              priority
              sizes="(min-width: 1200px) 1120px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* ---------- Body ---------- */}
        <div className={`${shell} mt-16 lg:mt-24 lg:grid lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-20`}>
          <aside className="hidden lg:block">
            <Toc items={toc} />
          </aside>

          <article className="min-w-0">
            <section id="impact-overview" className="scroll-mt-28">
              <div className="glass rounded-[24px] p-6 shadow-[0_1px_2px_rgba(16,24,40,0.03)] sm:p-8">
                <p className="font-heading text-2xl font-semibold text-ink">Impact overview</p>
                <ul className="mt-6 grid gap-5">
                  {cs.impact.map((item) => (
                    <li key={item.label} className="flex gap-3">
                      <CircleCheck className="mt-0.5 size-5 shrink-0 text-brand" />
                      <p className="text-[17px] leading-relaxed text-ink md:text-lg">
                        <span className="font-semibold">{item.label}</span> {item.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {cs.sections.map((section, i) => (
              <section key={section.id} id={section.id} className="mt-20 scroll-mt-28 border-t border-line pt-14 md:mt-24">
                <p className="text-sm font-semibold tracking-[0.08em] text-brand uppercase">
                  {String(i + 1).padStart(2, "0")} · {section.nav}
                </p>
                <h2 className="mt-3 max-w-[760px] text-[32px] leading-[1.08] tracking-[-0.02em] text-ink md:text-[44px]">
                  {section.title}
                </h2>
                <div className="mt-8 grid gap-7">
                  {section.blocks.map((block, j) => (
                    <BlockView key={j} block={block} />
                  ))}
                </div>
              </section>
            ))}

            {/* ---------- More work ---------- */}
            <section className="mt-24 border-t border-line pt-14">
              <h2 className="text-[32px] leading-tight tracking-[-0.02em] text-ink md:text-[40px]">More case studies</h2>
              {others.length ? (
                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link href={`/work/${o.slug}`} className="glass group block rounded-[20px] p-6">
                        <p className="text-sm font-medium text-soft">{o.company}</p>
                        <p className="mt-1 font-heading text-2xl font-semibold text-ink">{o.title.join(" ")}</p>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                          Read case study <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 max-w-[720px] text-lg text-body">
                  More detailed case studies are on the way. In the meantime, explore my other work or get in touch.
                </p>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/#work"
                  className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-black px-3.5 text-sm font-semibold text-white hover:opacity-80"
                >
                  <ArrowLeft className="size-4" /> All work
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex h-10 items-center rounded-full border border-line px-5 text-base font-medium text-brand hover:bg-white"
                >
                  Let&apos;s talk
                </Link>
              </div>
            </section>
          </article>
        </div>
      </main>
      <div className="mt-24">
        <SiteFooter />
      </div>
    </>
  )
}
