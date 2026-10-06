"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Mail } from "lucide-react"
import { nav, profile } from "@/lib/content"
import { cn } from "@/lib/utils"

const items = [{ label: "Home", href: "/" }, ...nav]

function LinkedInGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
      <path d="M6.94 8.5v12H3.2v-12h3.74ZM5.07 2.5a2.17 2.17 0 1 1 0 4.34 2.17 2.17 0 0 1 0-4.34ZM9.3 8.5h3.58v1.64h.05c.5-.95 1.72-1.95 3.55-1.95 3.79 0 4.49 2.5 4.49 5.74v6.57h-3.74v-5.83c0-1.39-.03-3.18-1.94-3.18-1.94 0-2.24 1.52-2.24 3.08v5.93H9.3v-12Z" />
    </svg>
  )
}

/**
 * Name on the left, section pill in the centre, contact buttons on the right.
 * Once the page scrolls, the sides fade away and only the pill stays pinned to the top.
 */
export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("/")

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      if (pathname.startsWith("/work")) return setActive("/#work")
      // On the home page, the active item is the last section whose top has passed 40% of the viewport
      let current = "/"
      for (const item of nav) {
        const el = document.getElementById(item.href.replace("/#", ""))
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = item.href
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [pathname])

  const side = cn(
    "transition-all duration-300",
    scrolled && "pointer-events-none -translate-y-2 opacity-0"
  )

  return (
    <header
      className={cn(
        "sticky top-0 z-50 py-4 transition-colors duration-300 sm:py-5",
        !scrolled && "bg-gradient-to-b from-cream from-60% to-transparent"
      )}
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-[auto_1fr] items-center sm:grid-cols-[1fr_auto_1fr] gap-3 px-4 sm:px-10 lg:px-[120px]">
        <Link
          href="/"
          aria-hidden={scrolled}
          tabIndex={scrolled ? -1 : undefined}
          className={cn("flex items-center gap-3 justify-self-start text-xl font-semibold text-black", side)}
        >
          <Image
            src={profile.photo}
            alt={profile.name}
            width={48}
            height={48}
            className="size-10 rounded-full object-cover object-[center_25%] sm:size-12"
            priority
          />
          <span className="font-heading tracking-[-0.5px] max-lg:hidden">{profile.name}</span>
        </Link>

        <nav
          aria-label="Main"
          className={cn(
            "flex gap-0.5 justify-self-end rounded-full bg-white/90 p-1.5 backdrop-blur sm:justify-self-auto transition-shadow duration-300 sm:gap-1 sm:p-2",
            scrolled && "shadow-[0_10px_30px_rgba(16,24,40,0.12)] ring-1 ring-black/5 max-sm:col-start-1 max-sm:col-end-3 max-sm:row-start-1 max-sm:justify-self-center"
          )}
        >
          {items.map((item) => {
            const isActive = active === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-full px-2.5 py-1.5 text-[14px] transition-colors sm:px-5 sm:py-2 sm:text-base",
                  isActive ? "bg-brand text-white" : "text-ink hover:text-brand"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className={cn("flex items-center gap-2 justify-self-end max-sm:hidden", side)} aria-hidden={scrolled}>
          <a
            href={`mailto:${profile.email}`}
            tabIndex={scrolled ? -1 : undefined}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-black px-4 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--tone-purple)] max-lg:px-3"
          >
            <Mail className="size-[18px]" aria-hidden />
            <span className="max-lg:sr-only">Say hello</span>
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener"
            tabIndex={scrolled ? -1 : undefined}
            aria-label="LinkedIn"
            className="grid size-11 place-items-center rounded-xl bg-black text-white transition-colors hover:bg-[var(--tone-purple)]"
          >
            <LinkedInGlyph />
          </a>
        </div>
      </div>
    </header>
  )
}
