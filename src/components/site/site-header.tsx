import Image from "next/image"
import Link from "next/link"
import { nav, profile } from "@/lib/content"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-cream from-60% to-transparent py-5">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-10 lg:px-[120px]">
        <Link href="#top" className="flex items-center gap-3 text-xl font-semibold text-black">
          <Image
            src={profile.photo}
            alt={profile.name}
            width={48}
            height={48}
            className="size-12 rounded-full object-cover object-[center_25%]"
            priority
          />
          <span className="max-sm:hidden">{profile.name}</span>
        </Link>
        <nav className="flex gap-0.5 rounded-full bg-white/90 px-3 py-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-base text-body transition-colors hover:text-brand max-md:hidden"
            >
              {item.label}
            </Link>
          ))}
          <Link href="#contact" className="rounded-full px-3.5 py-2 text-base font-semibold text-brand">
            Let&apos;s talk
          </Link>
        </nav>
      </div>
    </header>
  )
}
