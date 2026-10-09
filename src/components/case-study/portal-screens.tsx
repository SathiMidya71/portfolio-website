import Image from "next/image"
import { Roboto } from "next/font/google"
import {
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  Clock3,
  Eye,
  EyeOff,
  FileText,
  Globe,
  House,
  LayoutGrid,
  Lightbulb,
  Link2,
  Menu,
  MessageSquare,
  MoreVertical,
  Paperclip,
  Pencil,
  Phone,
  Search,
  SendHorizontal,
  User,
  UserPlus,
  X,
  type LucideIcon,
} from "lucide-react"
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
        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
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



/* ================= shared pieces ================= */

const tints = ["#fdf1ee", "#eef7fb", "#f1f7ef"] // pink, blue, green rows (in that order on every card)

/** Screens without the sidebar shell (log in) still get the font, colour and screen ratio. */
function Frame({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`Arc Connect Portal ${title} screen (recreated in code from the original design)`}
      className={cn(roboto.className, "relative aspect-[945/650] w-full overflow-hidden bg-white text-[1.5cqw] leading-[1.25]", className)}
      style={{ color: portal.navy }}
    >
      {children}
    </div>
  )
}

function Select({ value, className }: { value: string; className?: string }) {
  return (
    <span className={cn("flex items-center justify-between rounded-[0.3cqw] bg-white px-[1.2cqw] py-[0.9cqw] shadow-[0_0.2cqw_0.7cqw_rgba(60,67,112,0.14)]", className)}>
      <span className="text-[1.4cqw]">{value}</span>
      <ChevronDown className="size-[1.6cqw]" strokeWidth={2.4} aria-hidden />
    </span>
  )
}

/** Mist panel under the top bar, with the rounded top-left corner of the original. */
function Mist({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("rounded-tl-[2.4cqw] px-[4cqw]", className)} style={{ background: portal.mist }}>
      {children}
    </div>
  )
}

/** Soft tinted quarter-shape with a white ring, used as card decoration in the original. */
function Deco({ color, className }: { color: string; className?: string }) {
  return (
    <span aria-hidden className={cn("pointer-events-none absolute", className)}>
      <span className="absolute inset-0 rounded-full" style={{ background: `linear-gradient(135deg, ${color}66, ${color}14)` }} />
      <span className="absolute inset-[16%] rounded-full border-[1cqw] border-white/90" />
    </span>
  )
}

/** Initials avatar (coded, so it stays sharp). */
function Avatar({ initials, color, size = 4.4, className }: { initials: string; color: string; size?: number; className?: string }) {
  return (
    <span
      className={cn("grid shrink-0 place-items-center rounded-full font-medium text-white ring-[0.25cqw] ring-white", className)}
      style={{ width: `${size}cqw`, height: `${size}cqw`, fontSize: `${size * 0.34}cqw`, background: color }}
    >
      {initials}
    </span>
  )
}

const people = {
  LD: "#b79cec",
  TJ: "#3798BF",
  JJ: "#e8833a",
  RC: "#5d7f1f",
  JD: "#d16a8f",
  RB: "#6b7290",
}

function Ring({ pct, color }: { pct: number; color: string }) {
  const c = 2 * Math.PI * 15
  return (
    <span className="relative grid size-[2.9cqw] place-items-center rounded-full bg-white shadow-[0_0.1cqw_0.4cqw_rgba(60,67,112,0.15)]">
      <svg viewBox="0 0 36 36" className="absolute inset-[0.25cqw] -rotate-90">
        <circle cx="18" cy="18" r="15" fill="none" stroke="#e7e9ee" strokeWidth="3" />
        <circle cx="18" cy="18" r="15" fill="none" stroke={color} strokeWidth="3" strokeDasharray={`${(c * pct) / 100} ${c}`} strokeLinecap="round" />
      </svg>
      <span className="relative text-[0.75cqw] font-medium">{pct}%</span>
    </span>
  )
}

/* ================= dashboard ================= */

function StatRow({ i, icon, label, value }: { i: number; icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-[0.9cqw] rounded-[0.3cqw] px-[0.9cqw] py-[0.55cqw]" style={{ background: tints[i] }}>
      {icon}
      <span className="min-w-0 flex-1">
        <span className="block text-[1.2cqw] whitespace-nowrap" style={{ color: portal.text }}>
          {label}
        </span>
        <span className="block text-[1.75cqw] leading-[1.1] font-bold">{value}</span>
      </span>
      <ChevronRight className="size-[1.6cqw]" strokeWidth={2.6} aria-hidden />
    </div>
  )
}

const icon = (name: string) => <Image src={`${ui}/${name}.png`} alt="" width={100} height={116} className="h-[2.9cqw] w-auto" />

function StatCard({ title, rows }: { title: string; rows: { icon: React.ReactNode; label: string; value: string }[] }) {
  return (
    <div className={cn("rounded-[0.3cqw] bg-white px-[1.1cqw] pt-[1.3cqw] pb-[1.3cqw]", softShadow)}>
      <p className="mb-[1cqw] pl-[1.1cqw] text-[1.6cqw] font-medium">{title}</p>
      <div className="grid gap-[1.1cqw]">
        {rows.map((r, i) => (
          <StatRow key={r.label} i={i} {...r} />
        ))}
      </div>
    </div>
  )
}

function Announcement({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div className={cn("relative h-[11cqw] overflow-hidden rounded-[0.3cqw] bg-white p-[1.3cqw] text-[1.3cqw]", softShadow)}>
      <Deco color={color} className="-right-[3cqw] top-[0.6cqw] size-[16cqw]" />
      <div className="relative">{children}</div>
    </div>
  )
}

export function DashboardScreen() {
  return (
    <Shell active="Dashboard" title="Dashboard">
      <Mist className="pt-[2cqw] pb-[2.4cqw]">
        <p className="text-[1.75cqw] font-medium">Care site</p>
        <div className="mt-[1.2cqw] flex items-center justify-between">
          <Select value="Apollo Clinic" className="w-[35cqw]" />
          <span className="text-[1.35cqw]" style={{ color: portal.text }}>
            7 Mar 2022 - 13 Mar 2022
          </span>
        </div>
        <div className="mt-[1.8cqw] grid grid-cols-3 gap-[1.7cqw]">
          <StatCard
            title="Therapy"
            rows={[
              { icon: <Ring pct={25} color={portal.orange} />, label: "Adherence below 25%", value: "2" },
              { icon: <Ring pct={50} color="#3798BF" />, label: "Adherence below 50%", value: "15" },
              { icon: <Ring pct={75} color="#A9D158" />, label: "Adherence below 75%", value: "27" },
            ]}
          />
          <StatCard
            title="Patients"
            rows={[
              { icon: icon("ic-never"), label: "Never Transmitted", value: "1" },
              { icon: icon("ic-missed"), label: "Missed 3 or more days", value: "2" },
              { icon: icon("ic-goals"), label: "Updated therapy goals", value: "5" },
            ]}
          />
          <StatCard
            title="Transmission"
            rows={[
              { icon: icon("ic-with"), label: "With Deviations", value: "10" },
              { icon: icon("ic-without"), label: "Without Deviations", value: "220" },
              { icon: icon("ic-total"), label: "Total", value: "230" },
            ]}
          />
        </div>
      </Mist>
      <div className="px-[4cqw] pt-[2.6cqw]">
        <p className="flex items-center gap-[1cqw] text-[1.75cqw] font-medium">
          <Lightbulb className="size-[2cqw]" style={{ color: portal.orange }} aria-hidden />
          Announcement
        </p>
        <div className="mt-[1.6cqw] grid grid-cols-3 gap-[1.7cqw]">
          <Announcement color="#6CE3FF">
            Have you completed
            <br />
            the <span style={{ color: portal.orange }}>Arc Connect</span>
            <br />
            satisfaction survey?
          </Announcement>
          <Announcement color={portal.orange}>
            <span style={{ color: portal.orange }}>Arc Connect</span> tutorials are
            <br />
            available under{" "}
            <span className="font-medium text-[#1d5fb8] underline">Resources</span>.
          </Announcement>
          <Announcement color="#A9D158">
            Follow <span style={{ color: portal.orange }}>ABM Respiratory Care</span>
            <br />
            latest news on
            <span className="mt-[2cqw] flex justify-center gap-[3cqw]">
              <svg viewBox="0 0 24 24" className="size-[2.4cqw]" aria-hidden>
                <rect width="24" height="24" rx="3" fill="#0a66c2" />
                <path fill="#fff" d="M5.3 9.2h2.9V19H5.3zM6.8 4.5a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4zM10.1 9.2h2.8v1.3c.4-.8 1.4-1.6 2.9-1.6 3 0 3.6 2 3.6 4.6V19h-2.9v-4.9c0-1.2 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5v5h-2.9z" />
              </svg>
              <svg viewBox="0 0 24 24" className="size-[2.4cqw]" aria-hidden>
                <rect width="24" height="24" rx="3" fill="#1d9bf0" />
                <path fill="#fff" d="M19 7.6c-.5.2-1.1.4-1.7.5.6-.4 1.1-1 1.3-1.6-.6.3-1.2.6-1.9.7a2.9 2.9 0 0 0-5 2.7A8.3 8.3 0 0 1 5.6 6.8a2.9 2.9 0 0 0 .9 3.9c-.5 0-.9-.1-1.3-.4 0 1.4 1 2.6 2.3 2.9-.4.1-.9.1-1.3 0 .4 1.2 1.5 2 2.7 2A5.9 5.9 0 0 1 4.6 16.4 8.3 8.3 0 0 0 17.4 9v-.4c.6-.4 1.1-.9 1.6-1z" />
              </svg>
            </span>
          </Announcement>
        </div>
      </div>
    </Shell>
  )
}

/* ================= care site settings ================= */

function EnrolCard({ img, label, count }: { img: string; label: string; count: string }) {
  return (
    <div className={cn("flex flex-col items-center rounded-[0.3cqw] bg-white px-[1cqw] pt-[1cqw] pb-[1.4cqw]", softShadow)}>
      <Image src={`${ui}/${img}.png`} alt="" width={412} height={383} className="h-[11.4cqw] w-auto" />
      <p className="mt-[0.8cqw] text-[1.7cqw] whitespace-nowrap" style={{ color: portal.text }}>
        {label}
        <span className="ml-[0.4cqw] text-[1.9cqw] font-medium" style={{ color: portal.orange }}>
          {count}
        </span>
      </p>
      <span className="mt-[1.2cqw] grid w-full grid-cols-2 gap-[1cqw] text-center text-[1.35cqw] font-medium">
        <span className="rounded-[0.3cqw] bg-[#f2f8f2] py-[0.7cqw] shadow-[0_0.2cqw_0.5cqw_rgba(60,67,112,0.16)]">View</span>
        <span className="rounded-[0.3cqw] bg-[#f3fcfd] py-[0.7cqw] shadow-[0_0.2cqw_0.5cqw_rgba(60,67,112,0.16)]">Invite</span>
      </span>
    </div>
  )
}

function InfoRow({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-[1.6cqw] text-[1.35cqw]">
      <span className="grid size-[2.5cqw] place-items-center rounded-[0.4cqw] bg-white shadow-[0_0.15cqw_0.5cqw_rgba(60,67,112,0.18)]">
        <Icon className="size-[1.2cqw]" strokeWidth={2.2} aria-hidden />
      </span>
      {children}
    </p>
  )
}

export function CareSiteSettingsScreen() {
  return (
    <Shell active="Dashboard" title="Care site settings">
      <Mist className="pt-[2cqw] pb-[2.6cqw]">
        <p className="text-[1.75cqw] font-medium">Care site</p>
        <div className="mt-[1.2cqw] flex items-center justify-between">
          <Select value="Apollo Clinic" className="w-[35cqw]" />
          <span className="rounded-[0.3cqw] bg-white px-[1.8cqw] py-[0.75cqw] text-[1.65cqw] font-medium shadow-[0_0.2cqw_0.7cqw_rgba(60,67,112,0.14)]">Care site details</span>
        </div>
        <div className="mt-[1.8cqw] grid grid-cols-3 gap-[1.7cqw]">
          <EnrolCard img="add-patients" label="Enrolled patients" count="1,325" />
          <EnrolCard img="add-clinicians" label="Enrolled clinicians" count="30" />
          <EnrolCard img="add-admins" label="Enrolled care site admins" count="3" />
        </div>
      </Mist>
      <div className="px-[4cqw] pt-[2cqw]">
        <div className={cn("relative flex gap-[3cqw] overflow-hidden rounded-[0.3cqw] bg-white px-[1.8cqw] py-[1.4cqw]", softShadow)}>
          <Deco color="#6CE3FF" className="-right-[4cqw] top-[0cqw] size-[24cqw]" />
          <span className="grid size-[14cqw] shrink-0 place-items-center rounded-full border border-[#9aa0b4]">
            <Image src={`${ui}/care-site.png`} alt="" width={294} height={256} className="h-auto w-[8.6cqw]" />
          </span>
          <div className="relative grid content-start gap-[1cqw] pt-[0.2cqw]">
            <p className="text-[2.1cqw] font-medium">Apollo Clinic Rochester, MN</p>
            <InfoRow icon={House}>508 Conklin Hill Rd, Chenango Forks, MN, 55801</InfoRow>
            <InfoRow icon={Phone}>+1 9620767639</InfoRow>
            <InfoRow icon={Globe}>
              <span className="text-[#1d5fb8]">www.applloclinic.com</span>
            </InfoRow>
            <InfoRow icon={Link2}>
              <span className="underline" style={{ color: portal.orange }}>
                Care site details
              </span>
            </InfoRow>
          </div>
        </div>
      </div>
    </Shell>
  )
}

/* ================= messaging ================= */

function Seen({ time }: { time: string }) {
  return (
    <span className="flex items-center gap-[0.5cqw] text-[1cqw]" style={{ color: portal.text }}>
      <Eye className="size-[1.25cqw] text-[#2e7fd6]" aria-hidden />
      {time}
    </span>
  )
}

function ChatItem({ who, name, time, count, group }: { who: [string, string?]; name: string; time: string; count: number; group?: string }) {
  return (
    <div className="flex items-center gap-[1.4cqw] px-[2cqw] py-[1.25cqw]">
      <span className="relative h-[5.6cqw] w-[5.6cqw] shrink-0">
        {who[1] ? (
          <>
            <Avatar initials={who[0]} color={people[who[0] as keyof typeof people]} size={3.6} className="absolute top-0 left-0" />
            <Avatar initials={who[1]} color={people[who[1] as keyof typeof people]} size={3.6} className="absolute right-0 bottom-0" />
            {group && (
              <span className="absolute bottom-0 left-0 grid size-[2cqw] place-items-center rounded-full bg-[#3c4370] text-[0.9cqw] font-medium text-white ring-[0.2cqw] ring-white">{group}</span>
            )}
          </>
        ) : (
          <Avatar initials={who[0]} color={people[who[0] as keyof typeof people]} size={5.2} />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[1.45cqw] font-medium">{name}</span>
        <span className="mt-[0.3cqw] block truncate text-[1.2cqw]" style={{ color: portal.text }}>
          Lesa Doe : Hello, How are..
        </span>
      </span>
      <span className="flex flex-col items-end gap-[1cqw] self-stretch">
        <Seen time={time} />
        <span className="grid size-[1.6cqw] place-items-center rounded-full text-[0.95cqw] font-medium text-white" style={{ background: portal.orange }}>
          {count}
        </span>
      </span>
    </div>
  )
}

function Bubble({ who, name, time, text, mine }: { who: keyof typeof people; name: string; time: string; text: string; mine?: boolean }) {
  return (
    <div className={cn("flex gap-[1cqw]", mine && "flex-row-reverse")}>
      <Avatar initials={who} color={people[who]} size={4.2} />
      <div className={cn("pt-[0.4cqw]", mine && "flex flex-col items-end")}>
        <p className="text-[1.35cqw] font-medium">{name}</p>
        <div className="mt-[0.8cqw] w-[24cqw] rounded-[0.3cqw] px-[1.2cqw] py-[0.9cqw] shadow-[0_0.2cqw_0.6cqw_rgba(60,67,112,0.14)]" style={{ background: portal.mist }}>
          <span className="flex justify-end">
            <Seen time={time} />
          </span>
          <p className={cn("mt-[0.3cqw] text-[1.2cqw]", mine && "text-right")}>{text}</p>
        </div>
      </div>
    </div>
  )
}

export function MessagingScreen() {
  return (
    <Shell active="Messages" title="Messaging">
      <div className="flex min-h-0 flex-1">
        {/* chats */}
        <div className="flex w-[32cqw] shrink-0 flex-col overflow-hidden" style={{ background: portal.mist }}>
          <div className="flex items-center gap-[2cqw] border-b border-[#e3e7ee] px-[2cqw] py-[1.6cqw]">
            <span className="grid size-[4.6cqw] place-items-center rounded-full border border-[#9aa0b4] bg-white">
              <User className="size-[2.4cqw] fill-[#c7cbd6] text-[#c7cbd6]" aria-hidden />
            </span>
            <span className="ml-auto flex gap-[1cqw] text-[1.15cqw]">
              <span className="rounded-[0.3cqw] bg-white px-[1cqw] py-[0.5cqw] shadow-[0_0.15cqw_0.5cqw_rgba(60,67,112,0.18)]">New chat</span>
              <span className="rounded-[0.3cqw] bg-white px-[1cqw] py-[0.5cqw] shadow-[0_0.15cqw_0.5cqw_rgba(60,67,112,0.18)]">New group</span>
            </span>
          </div>
          <div className="px-[2cqw] py-[1.4cqw]">
            <span className="flex items-center gap-[1cqw] rounded-[0.3cqw] bg-white px-[1.4cqw] py-[0.8cqw] text-[1.3cqw] shadow-[0_0.2cqw_0.6cqw_rgba(60,67,112,0.14)]" style={{ color: portal.text }}>
              <Search className="size-[1.5cqw]" aria-hidden />
              Search or start new chat
            </span>
          </div>
          <ChatItem who={["LD", "TJ"]} name="Lesa Doe + Tarun Jha" time="1 min ago" count={1} />
          <ChatItem who={["TJ"]} name="Tarun Jha" time="1 mons ago" count={2} />
          <ChatItem who={["LD", "TJ"]} name="Lesa Doe + Tarun Jha" time="1 min ago" count={1} group="5+" />
          <ChatItem who={["LD", "TJ"]} name="Lesa Doe + Tarun Jha" time="1 min ago" count={1} />
        </div>
        {/* conversation */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-[1.4cqw] px-[2cqw] py-[1.2cqw]" style={{ background: portal.mist }}>
            {(["JD", "TJ", "JJ", "RC"] as const).map((p) => (
              <span key={p} className="flex flex-col items-center gap-[0.3cqw]">
                <Avatar initials={p} color={people[p]} size={3.8} />
                <span className="text-[1.05cqw] font-medium">{p}</span>
              </span>
            ))}
            <span className="ml-[1cqw] text-[1.3cqw] font-medium">+2 more</span>
          </div>
          <div className="grid flex-1 content-start gap-[1.6cqw] overflow-hidden px-[2cqw] pt-[1.6cqw]">
            <p className="text-center text-[1.3cqw]">10 August 2021</p>
            <Bubble who="RB" name="Robert" time="1 min ago" text="Hello, How are? Hope everything is well and good." />
            <Bubble who="JD" name="Jesica Doe" time="1 min ago" text="I'm good. What about you?" mine />
            <Bubble who="TJ" name="Tarun Jha" time="13 : 14" text="Hello, How are you feeling? Hope everything is well and good." />
          </div>
          <div className="flex items-center gap-[1.4cqw] px-[2cqw] pt-[1cqw] pb-[0.4cqw]">
            <Paperclip className="size-[1.7cqw]" aria-hidden />
            <span className="flex flex-1 items-center justify-between rounded-[0.3cqw] border border-[#9aa0b4] px-[1.6cqw] py-[1cqw] text-[1.35cqw]">
              <span>| Type your message</span>
              <SendHorizontal className="size-[1.8cqw]" aria-hidden />
            </span>
          </div>
        </div>
      </div>
    </Shell>
  )
}

/* ================= notifications ================= */

function Slider({ value, label }: { value: number; label: string }) {
  return (
    <span className="relative block h-[0.5cqw] rounded-full bg-[#b8bcc8]">
      <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${value}%`, background: portal.orange }} />
      <span className="absolute top-1/2 size-[1.9cqw] -translate-x-1/2 -translate-y-1/2 rounded-full border-[0.15cqw] border-[#b8bcc8] bg-white shadow-sm" style={{ left: `${value}%` }} />
      <span
        className="absolute -top-[3.3cqw] -translate-x-1/2 rounded-[0.3cqw] bg-white px-[0.6cqw] py-[0.3cqw] text-[1.05cqw] font-bold whitespace-nowrap shadow-[0_0.15cqw_0.5cqw_rgba(60,67,112,0.2)]"
        style={{ left: `${value}%`, color: portal.orange }}
      >
        {label}
      </span>
    </span>
  )
}

function Toggle({ on = true }: { on?: boolean }) {
  return (
    <span className="relative inline-block h-[2.4cqw] w-[4.4cqw] rounded-full border-[0.2cqw] border-[#c7e85b] bg-white">
      <span className={cn("absolute top-1/2 size-[1.6cqw] -translate-y-1/2 rounded-full bg-[#c7e85b]", on ? "right-[0.25cqw]" : "left-[0.25cqw]")} />
    </span>
  )
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export function NotificationSettingsScreen() {
  return (
    <Shell active="Notifications" title="Notification settings">
      <Mist className="flex-1 pt-[1.8cqw]">
        <p className="text-[1.75cqw] font-medium">Care site</p>
        <Select value="Apollo Clinic" className="mt-[1cqw] w-[35cqw]" />

        <p className="mt-[3cqw] text-[1.75cqw] font-medium">Notification Schedule</p>
        <p className="mt-[0.6cqw] text-[1.3cqw]" style={{ color: portal.text }}>
          Select the days of the week you want the system to send you an email regarding if you have notifications to review. The email will be sent at 7:00 am
          Central Time.
        </p>
        <div className="mt-[1.6cqw] grid grid-cols-7 gap-[1.6cqw]">
          {days.map((d) => (
            <span key={d} className="rounded-[0.3cqw] py-[0.65cqw] text-center text-[1.2cqw] text-white shadow-[0_0.2cqw_0.5cqw_rgba(242,105,49,0.35)]" style={{ background: portal.orange }}>
              {d}
            </span>
          ))}
        </div>

        <p className="mt-[3cqw] text-[1.75cqw] font-medium">Notification Recipients</p>
        <p className="mt-[0.6cqw] text-[1.3cqw]" style={{ color: portal.text }}>
          Enter the email address(es) for the recipients and separate multiple email addresses with a comma.
        </p>
        <span className="mt-[1.4cqw] block w-[35cqw] rounded-[0.3cqw] bg-white px-[1.2cqw] py-[0.9cqw] text-[1.35cqw] shadow-[0_0.2cqw_0.7cqw_rgba(60,67,112,0.14)]">
          example1@gmail.com, example2@gmail.com
        </span>

        <div className="mt-[3cqw] flex items-start justify-between gap-[3cqw]">
          <span>
            <p className="text-[1.75cqw] font-medium">Adherence</p>
            <p className="mt-[0.6cqw] text-[1.3cqw]" style={{ color: portal.text }}>
              Use the slider to set the notification range. You will be notified if a patient&apos;s Adherence score is within the highlighted range.
            </p>
          </span>
          <span className="flex items-center gap-[1cqw] text-[1.2cqw] font-medium">
            <Toggle /> ON
          </span>
        </div>
        <div className="mt-[4cqw] pr-[3cqw]">
          <Slider value={66} label="0-75%" />
        </div>
      </Mist>
    </Shell>
  )
}

function RangeCard({ color, title, children }: { color: string; title: string; children: React.ReactNode }) {
  return (
    <div className={cn("relative flex h-[12.4cqw] flex-col justify-end overflow-hidden rounded-[0.3cqw] bg-white px-[1.6cqw] pb-[1.2cqw]", softShadow)}>
      <Deco color={color} className="-top-[2cqw] -left-[2cqw] size-[15cqw]" />
      <div className="relative">{children}</div>
      <p className="relative mt-[2cqw] text-center text-[1.7cqw] font-medium">{title}</p>
    </div>
  )
}

export function NotificationSummaryScreen() {
  const cols = ["", "Last name", "First name", "Adherence", "SpO2", "Deviation"]
  const rows = [
    ["Doe", "Jessica", "20%", "N/A"],
    ["Cruiser", "Petey", "6%", "N/A"],
  ]
  const cell = "border px-[1cqw] py-[1.1cqw] text-center"
  return (
    <Shell active="Notifications" title="Notification summary">
      <Mist className="pt-[1.8cqw] pb-[2.4cqw]">
        <p className="text-[1.75cqw] font-medium">Care site</p>
        <Select value="Apollo Clinic" className="mt-[1cqw] w-[35cqw]" />
        <p className="mt-[2cqw] flex items-center gap-[0.8cqw] text-[1.75cqw] font-medium">
          Current notification settings <Pencil className="size-[1.6cqw]" style={{ color: portal.orange }} aria-hidden />
        </p>
        <div className="mt-[1.6cqw] grid grid-cols-3 gap-[1.8cqw]">
          <RangeCard color="#6CE3FF" title="Adherence">
            <Slider value={64} label="0-75%" />
          </RangeCard>
          <RangeCard color={portal.orange} title="SpO2">
            <Slider value={86} label="0-90%" />
          </RangeCard>
          <RangeCard color="#A9D158" title="Therapy Deviation">
            <span className="-mb-[0.6cqw] flex items-center justify-center gap-[1.2cqw] text-[1.6cqw] font-medium">
              <span className="text-[#b8bcc8]">OFF</span>
              <Toggle />
              ON
            </span>
          </RangeCard>
        </div>
      </Mist>
      <div className="px-[4cqw] pt-[2.2cqw]">
        <p className="text-[1.65cqw] font-medium">Patient list: Adherence: &lt;50, Deviation: Yes, SpO2: Off</p>
        <p className="mt-[1cqw] text-[1.5cqw] font-medium">9 Jan 2022</p>
        <table className="mt-[1.6cqw] w-full border-collapse text-[1.3cqw]">
          <thead>
            <tr>
              {cols.map((c) => (
                <th key={c || "avatar"} className={cn(cell, "font-medium")} style={{ borderColor: portal.line, width: c ? undefined : "9%" }}>
                  {c && (
                    <span className="inline-flex items-center gap-[0.4cqw]">
                      {c}
                      <ChevronsUpDown className="size-[1.2cqw]" aria-hidden />
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]}>
                <td className={cell} style={{ borderColor: portal.line }}>
                  <span className="mx-auto grid size-[2.6cqw] place-items-center rounded-full border border-[#9aa0b4]">
                    <User className="size-[1.4cqw] fill-[#6b7290] text-[#6b7290]" aria-hidden />
                  </span>
                </td>
                {r.map((v, i) => (
                  <td key={i} className={cell} style={{ borderColor: portal.line }}>
                    {v}
                  </td>
                ))}
                <td className={cell} style={{ borderColor: portal.line }}>
                  <span className="rounded-[0.3cqw] bg-[#f2f8f2] px-[1.2cqw] py-[0.4cqw] shadow-[0_0.15cqw_0.4cqw_rgba(60,67,112,0.15)]">No</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Shell>
  )
}

/* ================= modals ================= */

function Modal({ children, compact }: { children: React.ReactNode; compact?: boolean }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[#1b2040]/45 backdrop-blur-[1px]">
      <div className={cn(roboto.className, "relative w-[70%] rounded-[1cqw] bg-white px-[4cqw] pt-[2.6cqw] pb-[3cqw] text-[1.5cqw] leading-[1.25] shadow-[0_2cqw_5cqw_-1cqw_rgba(0,0,0,0.45)]", compact && "py-[2cqw]")} style={{ color: portal.navy }}>
        {children}
      </div>
    </div>
  )
}

const field = "rounded-[0.3cqw] bg-white px-[1.6cqw] py-[1.1cqw] shadow-[0_0.2cqw_0.8cqw_rgba(60,67,112,0.16)] text-[1.4cqw]"

export function NewInvitationScreen() {
  return (
    <div className="relative">
      <InvitationsScreen />
      <Modal>
        <p className="flex items-center justify-between text-[1.6cqw] font-medium">
          Invitation
          <X className="size-[2.2cqw]" aria-hidden />
        </p>
        <span className="mx-auto -mt-[1cqw] grid size-[13cqw] place-items-center rounded-full bg-white shadow-[0_0.3cqw_1.2cqw_rgba(60,67,112,0.2)]">
          <Image src={`${ui}/env-new.png`} alt="" width={398} height={376} className="h-auto w-[8.6cqw]" />
        </span>
        <p className={cn(field, "mt-[1.8cqw]")} style={{ color: portal.text }}>
          Email address
        </p>
        <div className="mt-[1.6cqw] grid grid-cols-3 gap-[2cqw] text-center text-[1.45cqw] font-medium">
          <span className={field}>Patient</span>
          <span className={field}>Clinician</span>
          <span className={cn(field, "ring-[0.12cqw] ring-[#3c4370]")}>Site admin</span>
        </div>
        <p className={cn(field, "mt-[1.6cqw] flex items-center justify-between")} style={{ color: portal.text }}>
          Select care site
          <ChevronDown className="size-[1.6cqw]" strokeWidth={2.4} style={{ color: portal.navy }} aria-hidden />
        </p>
        <p className={cn(field, "mx-auto mt-[2.4cqw] w-[50%] text-center text-[1.5cqw] font-medium")}>Send invitations</p>
      </Modal>
    </div>
  )
}

function Line({ label, chevron, className }: { label: string; chevron?: boolean; className?: string }) {
  return (
    <span className={cn("block border-b border-[#9aa0b4] pb-[1.3cqw]", className)}>
      <span className="flex items-center gap-[1cqw] text-[1.35cqw] font-medium">
        {label}
        {chevron && <ChevronDown className="size-[1.4cqw]" strokeWidth={2.4} aria-hidden />}
      </span>
    </span>
  )
}

export function ClinicianProfileScreen() {
  return (
    <div className="relative">
      <CareSiteSettingsScreen />
      <Modal compact>
        <p className="text-[1.6cqw] font-medium">Clinician profile</p>
        <span className="relative mx-auto -mt-[1.6cqw] grid size-[7cqw] place-items-center rounded-full bg-white shadow-[0_0.3cqw_1.2cqw_rgba(60,67,112,0.22)]">
          <User className="size-[3.6cqw] fill-[#d9dbe3] text-[#d9dbe3]" aria-hidden />
          <span className="absolute right-[0.2cqw] bottom-[0.4cqw] grid size-[2.4cqw] place-items-center rounded-full text-white" style={{ background: portal.orange }}>
            <Pencil className="size-[1.2cqw]" aria-hidden />
          </span>
        </span>
        <div className="mt-[0.8cqw] grid grid-cols-4 gap-x-[3cqw] gap-y-[1.4cqw]">
          <Line label="First name" className="col-span-2" />
          <Line label="Last name" className="col-span-2" />
          <Line label="Specialties" className="col-span-2" />
          <Line label="Licence No." className="col-span-2" />
          <Line label="Accreditation" className="col-span-4" />
          <Line label="Address line 1" className="col-span-2" />
          <Line label="Address line 2" className="col-span-2" />
          <Line label="City" chevron />
          <Line label="State" chevron />
          <Line label="Zip" chevron />
          <Line label="Country" chevron />
          <Line label="Phone" className="col-span-2" />
          <Line label="Email" className="col-span-2" />
        </div>
        <p className={cn(field, "mx-auto mt-[1.8cqw] w-[32%] py-[0.8cqw] text-center text-[1.6cqw] font-medium")}>Submit</p>
      </Modal>
    </div>
  )
}

/* ================= log in ================= */

function Welcome({ children }: { children: React.ReactNode }) {
  return (
    <Frame title="Log in" className="flex">
      <div className="flex w-[43%] flex-col items-center justify-center px-[3cqw] pb-[4cqw]">
        <Image src={`${ui}/login-illus.png`} alt="" width={585} height={408} className="h-auto w-[34cqw]" />
        <p className="mt-[3cqw] text-center text-[1.75cqw] leading-[1.35] font-bold">
          Get Connected. Stay Informed.
          <br />
          Collaborate with your patients
          <br />
          and their caregivers.
        </p>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex-1 rounded-bl-[1cqw] px-[13.8cqw] pt-[3.4cqw]" style={{ background: portal.mist }}>
          <p className="text-[5.4cqw] leading-none font-bold text-[#6b7290]">Welcome</p>
          <p className="mt-[0.8cqw] text-[2.9cqw] leading-none font-bold text-[#6b7290]">
            to <span style={{ color: portal.orange }}>Arc Connect</span>
          </p>
          {children}
        </div>
        <footer className="flex items-center justify-between py-[1.8cqw] pr-[2cqw] pl-[3.4cqw] text-[1.3cqw]">
          <span className="font-medium">©2022 ABM Respiratory Care</span>
          <span className="flex gap-[2cqw]">
            <span>Contact Us</span>
            <span>Privacy Policy</span>
            <span>Terms of Use</span>
          </span>
        </footer>
      </div>
    </Frame>
  )
}

function Input({ label, dots, hint }: { label: string; dots?: boolean; hint?: string }) {
  return (
    <div className="mt-[2.2cqw]">
      <p className="text-[1.6cqw]">{label}</p>
      <span className="mt-[0.9cqw] flex h-[3.8cqw] items-center justify-between rounded-[0.3cqw] bg-white px-[1.6cqw] shadow-[0_0.2cqw_0.6cqw_rgba(60,67,112,0.12)]">
        <span className="tracking-[0.5cqw] text-[1.6cqw] text-[#5c5f72]">{dots ? "••••••••" : ""}</span>
        {dots !== undefined && <EyeOff className="size-[1.4cqw]" aria-hidden />}
      </span>
      {hint && (
        <p className="mt-[0.5cqw] text-right text-[1.1cqw]" style={{ color: portal.orange }}>
          {hint}
        </p>
      )}
    </div>
  )
}

const bigButton = "mx-auto mt-[2.6cqw] block w-[29cqw] rounded-[0.3cqw] bg-white py-[0.9cqw] text-center text-[1.65cqw] font-medium shadow-[0_0.2cqw_0.8cqw_rgba(60,67,112,0.16)]"

export function LoginScreen() {
  return (
    <Welcome>
      <Input label="Username" />
      <Input label="Password" dots={false} hint="Must be at least 8 characters" />
      <span className={bigButton}>Next</span>
      <p className="mt-[1.6cqw] text-center text-[1.2cqw] underline" style={{ color: portal.orange }}>
        Forgot password?
      </p>
      <p className="mt-[0.8cqw] text-center text-[1.2cqw]" style={{ color: portal.text }}>
        Don&apos;t have an account?{" "}
        <span className="underline" style={{ color: portal.orange }}>
          Sign Up
        </span>
      </p>
    </Welcome>
  )
}

export function CreatePasswordScreen() {
  return (
    <Welcome>
      <p className="mt-[3.4cqw] text-[2.8cqw] font-medium">Create password</p>
      <Input label="Password" dots hint="Must be at least 8 characters" />
      <Input label="Confirm password" dots hint="Passwords must match" />
      <span className={bigButton}>Submit</span>
      <p className="mt-[1.4cqw] text-center text-[1.2cqw] font-medium underline" style={{ color: portal.orange }}>
        Log In
      </p>
    </Welcome>
  )
}

export const codedScreens = {
  invitations: InvitationsScreen,
  dashboard: DashboardScreen,
  "care-site-settings": CareSiteSettingsScreen,
  messaging: MessagingScreen,
  "notification-settings": NotificationSettingsScreen,
  "notification-summary": NotificationSummaryScreen,
  "invitation-new": NewInvitationScreen,
  "clinician-profile": ClinicianProfileScreen,
  login: LoginScreen,
  "create-password": CreatePasswordScreen,
}
export type CodedScreen = keyof typeof codedScreens
