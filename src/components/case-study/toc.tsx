"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

/** Sticky "On this page" nav that highlights the section currently in view. */
export function Toc({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id)

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el)
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-20% 0px -70% 0px" }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [items])

  return (
    <nav aria-label="On this page" className="sticky top-28">
      <p className="mb-4 text-[11px] font-semibold tracking-[0.12em] text-soft uppercase">On this page</p>
      <ul className="grid gap-1 border-l border-line">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "-ml-px block border-l-2 py-1.5 pl-4 text-[15px] transition-colors",
                active === item.id ? "border-brand font-semibold text-brand" : "border-transparent text-body hover:text-ink"
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
