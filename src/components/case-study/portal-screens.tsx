import Image from "next/image"
import { Roboto } from "next/font/google"
import { ChevronDown, Clock3, FileText, LayoutGrid, Menu, MessageSquare, MoreVertical, Search, User, UserPlus, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// Arc Connect Portal screens rebuilt in code from Sathi's Behance boards, so they stay sharp at any
// size. Layout, copy, colours and type (Roboto) follow the original design; only the illustrations
// and logo are images (cropped from the full-resolution boards). Sizes are in cqw of the screen width.

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] })
const ui = "/case-studies/arc-connect-portal/ui"

export const portal = {
  navy: "#3c4370",
  text: "#656987",
  orange: "#F26931",
  mist: "#F2F7F8",
  line: "#e3e7ee",
}

const nav: { label: string; icon: LucideIcon; badge?: number }[] = [
  { label: "Dashboard", icon: LayoutGrid },
  { label: "Notifications", icon: FileText },
  { label: "Reports", icon: Clock3 },
  { label: "Messages", icon: MessageSquare, badge: 2 },
  { label: "Invitation", icon: UserPlus },
]

/** Sidebar, top bar and footer shared by every portal screen. */
function Shell({ active, title, children }: { active: string; title: string; children: React.ReactNode }) {
  return (
    <div role="img" aria-label={`Arc Connect Portal ${title} screen (recreated in code from the original design)`} className={cn(roboto.className, "flex aspect-[945/650] w-full overflow-hidden bg-white text-[1.5cqw] leading-[1.25]")} style={{ color: portal.navy }}>
      {/* sidebar */}
      <aside className="flex w-[18%] shrink-0 flex-col items-center pt-[2.4cqw] pb-[3.6cqw]">
        <Image src={`${ui}/logo.png`} alt="Arc Connect for BiWaze" width={379} height={325} className="h-auto w-[11.5cqw]" />
        <ul className="mt-[5.2cqw] grid w-full gap-[2cqw] pl-[2.4cqw]">
          {nav.map((n) => {
            const on = n.label === active
            const Icon = n.icon
            return (
              <li key={n.label} className="flex items-center gap-[2cqw]">
                <span
                  className="grid size-[2.8cqw] place-items-center rounded-[0.5cqw] shadow-[0_0.15cqw_0.5cqw_rgba(60,67,112,0.18)]"
                  style={{ background: on ? portal.orange : "#fff", color: on ? "#fff" : portal.navy }}
                >
                  <Icon className="size-[1.4cqw]" strokeWidth={2} aria-hidden />
                </span>
                <span className={cn("relative", on ? "font-medium" : "")}>
                  {n.label}
                  {n.badge && (
                    <span className="absolute -top-[1cqw] -right-[2.3cqw] grid size-[1.8cqw] place-items-center rounded-full text-[1.15cqw] leading-none font-medium text-white" style={{ background: portal.orange }}>
                      {n.badge}
                    </span>
                  )}
                </span>
              </li>
            )
          })}
        </ul>
        <div className="mt-auto w-full px-[1.6cqw]">
          <Image src={`${ui}/help.png`} alt="" width={480} height={388} className="mx-auto h-auto w-[14cqw]" />
          <span className="mt-[1.6cqw] block rounded-[0.4cqw] py-[0.9cqw] text-center font-medium text-white shadow-[0_0.2cqw_0.6cqw_rgba(242,105,49,0.35)]" style={{ background: portal.orange }}>
            Help Center
          </span>
        </div>
      </aside>

      {/* main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between px-[4cqw] pt-[2.8cqw] pb-[2.2cqw]">
          <h1 className="text-[2.8cqw] font-medium">{title}</h1>
          <span className="flex items-center gap-[2.4cqw]">
            <span className="grid size-[3.4cqw] place-items-center rounded-full bg-[#eef0f4]">
              <User className="size-[1.6cqw] fill-current" aria-hidden />
            </span>
            <Menu className="size-[2.2cqw]" aria-hidden />
          </span>
        </header>
        <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
        <footer className="flex items-center justify-between px-[4cqw] py-[2cqw] text-[1.35cqw]">
          <span className="font-medium">©2022 ABM Respiratory Care</span>
          <span className="flex gap-[2.6cqw]">
            <span>Contact Us</span>
            <span>Privacy Policy</span>
            <span>Terms of Use</span>
          </span>
        </footer>
      </div>
    </div>
  )
}

const softShadow = "shadow-[0_0.3cqw_1.2cqw_rgba(60,67,112,0.12)]"

function InviteCard({ img, w, h, label, count, button, tone }: { img: string; w: number; h: number; label: string; count?: number; button: string; tone: "mist" | "outline" | "green" }) {
  return (
    <div className={cn("flex flex-col items-center rounded-[0.3cqw] bg-white px-[2cqw] pt-[1.2cqw] pb-[1.7cqw]", softShadow)}>
      <Image src={`${ui}/${img}.png`} alt="" width={w} height={h} className="h-[10.8cqw] w-auto" />
      <p className="mt-[1.1cqw] text-[1.8cqw] whitespace-nowrap" style={{ color: portal.text }}>
        {label}
        {count != null && (
          <span className="ml-[0.7cqw] text-[2.2cqw] font-medium" style={{ color: portal.orange }}>
            {count}
          </span>
        )}
      </p>
      <span
        className={cn("mt-[1cqw] block w-full rounded-[0.3cqw] py-[0.85cqw] text-center font-medium", tone !== "outline" && "shadow-[0_0.25cqw_0.6cqw_rgba(60,67,112,0.18)]")}
        style={
          tone === "outline"
            ? { border: `0.15cqw solid ${portal.orange}`, background: "#fff" }
            : { background: tone === "mist" ? "#f3fcfd" : "#f2f8f2" }
        }
      >
        {button}
      </span>
    </div>
  )
}

/** Invitations: new / sent / received cards and the sent invitations table. */
export function InvitationsScreen() {
  const head = ["Email address", "Type", "Status", "Access"]
  return (
    <Shell active="Invitation" title="Invitations">
      <div className="rounded-tl-[2.4cqw] px-[4cqw] pt-[3cqw] pb-[3cqw]" style={{ background: portal.mist }}>
        <div className="grid grid-cols-3 gap-[1.8cqw]">
          <InviteCard img="env-new" w={398} h={376} label="New invitation" button="Create" tone="mist" />
          <InviteCard img="env-sent" w={382} h={365} label="Sent invitations" count={120} button="View" tone="outline" />
          <InviteCard img="env-received" w={382} h={365} label="Received invitations" count={30} button="View" tone="green" />
        </div>
      </div>
      <div className="px-[4cqw] pt-[3.2cqw]">
        <h2 className="text-[1.9cqw] font-medium">Sent invitations</h2>
        <div className={cn("mt-[2.6cqw] flex w-[36cqw] items-center gap-[1.2cqw] rounded-[0.3cqw] px-[1.8cqw] py-[1.2cqw]", softShadow)} style={{ background: "#f6fbfb" }}>
          <Search className="size-[1.5cqw]" aria-hidden />
          <span style={{ color: portal.text }}>Email address, Type of invitations</span>
        </div>
        <table className="mt-[3cqw] w-full border-collapse text-left" style={{ borderColor: portal.line }}>
          <thead>
            <tr>
              {head.map((h, i) => (
                <th key={h} className={cn("border px-[1.9cqw] py-[1.5cqw] font-medium", i > 0 && "text-center")} style={{ borderColor: portal.line, width: i === 0 ? "41%" : undefined }}>
                  <span className="inline-flex items-center gap-[0.6cqw]">
                    {h}
                    {i < 3 && <ChevronDown className="size-[1.3cqw]" aria-hidden />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[0, 1].map((r) => (
              <tr key={r}>
                <td className="border px-[1.9cqw] py-[1.5cqw]" style={{ borderColor: portal.line }}>
                  {r === 0 && "5amire_na3imh@halumail.com"}
                </td>
                <td className="border px-[1.9cqw] py-[1.5cqw] text-center" style={{ borderColor: portal.line }}>
                  {r === 0 && "Clinicians"}
                </td>
                <td className="border px-[1.9cqw] py-[1.5cqw] text-center" style={{ borderColor: portal.line }}>
                  {r === 0 && "Pending"}
                </td>
                <td className="border px-[1.9cqw] py-[1.5cqw] text-center" style={{ borderColor: portal.line }}>
                  <MoreVertical className="mx-auto size-[1.6cqw]" aria-hidden />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Shell>
  )
}

export const codedScreens = { invitations: InvitationsScreen }
export type CodedScreen = keyof typeof codedScreens
