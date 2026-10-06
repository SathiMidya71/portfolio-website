import { cn } from "@/lib/utils"

/** Inline pill linking to a company, styled after the reference site's hero chips. */
export function CompanyChip({
  name,
  href,
  logo,
  dark = false,
}: {
  name: string
  href: string
  /** Path to a logo in /public. Falls back to the company's initial. */
  logo?: string
  dark?: boolean
}) {
  return (
    <span className="inline-block whitespace-nowrap">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2.5 py-[7px] align-[1px] transition-all duration-200 hover:-translate-y-px md:align-0",
          dark
            ? "bg-[#111] shadow-[0_2px_8px_rgba(0,0,0,.2),0_1px_2px_rgba(0,0,0,.12),inset_0_1px_0_rgba(255,255,255,.08),inset_0_-1px_0_rgba(0,0,0,.2)]"
            : "bg-white shadow-[0_2px_8px_rgba(0,0,0,.1),0_1px_2px_rgba(0,0,0,.06),inset_0_1px_0_#fff,inset_0_-1px_0_rgba(0,0,0,.04)]"
        )}
      >
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt="" className="size-[15px] rounded-[3px] object-contain md:size-[17px]" />
        ) : (
          <span
            aria-hidden
            className="grid size-[15px] place-items-center rounded-[4px] bg-brand text-[10px] leading-none font-bold text-white md:size-[17px] md:text-[11px]"
          >
            {name[0]}
          </span>
        )}
        <span className={cn("text-[13px] leading-none font-medium md:text-sm", dark ? "text-white/90" : "text-ink")}>
          {name}
        </span>
      </a>
    </span>
  )
}
