import Image from "next/image"
import Link from "next/link"
import { nav, profile } from "@/lib/content"

export function SiteFooter() {
  const links = [
    { label: "LinkedIn", href: profile.links.linkedin },
    { label: "Behance", href: profile.links.behance },
    { label: "GitHub", href: profile.links.github },
    { label: "Resume", href: profile.resume },
  ]
  return (
    <footer className="pt-6 pb-14">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-10 lg:px-[120px]">
        <div className="flex flex-wrap justify-between gap-8">
          <Link href="/" className="flex items-center gap-3 text-xl font-semibold text-black">
            <Image src={profile.photo} alt="" width={48} height={48} className="size-12 rounded-full object-cover object-[center_25%]" />
            {profile.name}
          </Link>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-ink">Navigation</h4>
            <ul className="grid gap-1.5">
              {[...nav, { label: "Contact", href: "/#contact" }].map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="hover:text-brand">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-ink">Links</h4>
            <ul className="grid gap-1.5">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener" className="hover:text-brand">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-10 text-sm text-soft">
          Designed &amp; built by {profile.name} · © {new Date().getFullYear()} · {profile.location}, India
        </p>
      </div>
    </footer>
  )
}
