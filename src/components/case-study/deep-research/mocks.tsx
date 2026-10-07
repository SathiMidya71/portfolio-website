import type { ReactNode } from "react"
import { Inter } from "next/font/google"
import {
  ArrowRight,
  ArrowUp,
  Atom,
  Bookmark,
  FileText,
  FlaskConical,
  History,
  House,
  Library,
  Plus,
  ScrollText,
  Search,
  Sparkles,
  Waypoints,
  type LucideIcon,
} from "lucide-react"
import type { MockView } from "@/lib/case-studies/types"

// Coded wireframes of SCINODE Deep Research, drawn in the product's own palette and typeface (Inter).
// They are illustrative: scientific values the product would compute are shown as skeleton bars,
// never as invented numbers. The aspirin identifiers are public reference data for the example
// question used in the case study.

export const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

const C = {
  bg: "#FFFFFF",
  bg2: "#F7F7F8",
  ink: "#171717",
  sub: "#6B6B6B",
  line: "#E6E6E6",
  sk: "#ECECEF",
  accent: "#6e62e5",
  accentSoft: "#EEECFD",
  success: "#12B76A",
  successSoft: "#E3F6EC",
}

const W = 960
const H = 600
const X0 = 64 // content starts after the left rail
const Y0 = 44 // and below the window bar

/* ---------------- primitives ---------------- */

function Sk({ x, y, w, h = 8, fill = C.sk }: { x: number; y: number; w: number; h?: number; fill?: string }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} />
}

function T({
  x,
  y,
  children,
  size = 12,
  weight = 400,
  fill = C.ink,
  anchor,
  mono,
}: {
  x: number
  y: number
  children: ReactNode
  size?: number
  weight?: number
  fill?: string
  anchor?: "start" | "middle" | "end"
  mono?: boolean
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fontWeight={weight}
      fill={fill}
      textAnchor={anchor}
      fontFamily={mono ? "ui-monospace, SFMono-Regular, Menlo, monospace" : undefined}
    >
      {children}
    </text>
  )
}

/** Approximate rendered width of Inter text, for sizing pills. */
const tw = (s: string, size: number) => s.length * size * 0.56

function Icon({ icon: I, x, y, s = 16, color = C.sub }: { icon: LucideIcon; x: number; y: number; s?: number; color?: string }) {
  return <I x={x} y={y} width={s} height={s} color={color} strokeWidth={1.8} />
}

function Pill({
  x,
  y,
  label,
  active,
  primary,
  icon,
  size = 12,
  h = 28,
}: {
  x: number
  y: number
  label: string
  active?: boolean
  primary?: boolean
  icon?: LucideIcon
  size?: number
  h?: number
}) {
  const pad = 12
  const iw = icon ? 20 : 0
  const w = tw(label, size) + pad * 2 + iw
  const fill = primary ? C.accent : active ? C.accentSoft : C.bg
  const color = primary ? "#fff" : active ? C.accent : C.ink
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} stroke={primary || active ? "none" : C.line} />
      {icon && <Icon icon={icon} x={x + pad - 2} y={y + h / 2 - 7} s={14} color={color} />}
      <T x={x + pad + iw} y={y + h / 2 + size * 0.36} size={size} weight={500} fill={color}>
        {label}
      </T>
    </g>
  )
}

/** Button with fixed width so it can be right-aligned. */
function Btn({ x, y, w, label, primary, icon }: { x: number; y: number; w: number; label: string; primary?: boolean; icon?: LucideIcon }) {
  const color = primary ? "#fff" : C.ink
  const textW = tw(label, 12) + (icon ? 20 : 0)
  const start = x + (w - textW) / 2
  return (
    <g>
      <rect x={x} y={y} width={w} height={32} rx={8} fill={primary ? C.accent : C.bg} stroke={primary ? "none" : C.line} />
      {icon && <Icon icon={icon} x={start} y={y + 9} s={14} color={color} />}
      <T x={start + (icon ? 20 : 0)} y={y + 20} weight={600} fill={color}>
        {label}
      </T>
    </g>
  )
}

function Card({ x, y, w, h, active, fill = C.bg }: { x: number; y: number; w: number; h: number; active?: boolean; fill?: string }) {
  return <rect x={x} y={y} width={w} height={h} rx={12} fill={fill} stroke={active ? C.accent : C.line} strokeWidth={active ? 1.5 : 1} />
}

function Label({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return (
    <T x={x} y={y} size={10} weight={600} fill={C.sub}>
      {children}
    </T>
  )
}

/** Small benzene ring, used as a molecule glyph. */
function Ring({ cx, cy, r = 14, color = C.ink }: { cx: number; cy: number; r?: number; color?: string }) {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`
  })
  return (
    <g fill="none" stroke={color} strokeWidth={1.4} strokeLinejoin="round">
      <polygon points={pts.join(" ")} />
      <circle cx={cx} cy={cy} r={r * 0.55} />
    </g>
  )
}

function Arrow({ x1, x2, y, color = C.sub }: { x1: number; x2: number; y: number; color?: string }) {
  return (
    <g stroke={color} strokeWidth={1.5} strokeLinecap="round" fill="none">
      <line x1={x1} x2={x2} y1={y} y2={y} />
      <path d={`M${x2 - 5},${y - 4} L${x2},${y} L${x2 - 5},${y + 4}`} />
    </g>
  )
}

/* ---------------- window frame ---------------- */

const railIcons: { icon: LucideIcon; key: string }[] = [
  { icon: House, key: "home" },
  { icon: FlaskConical, key: "research" },
  { icon: History, key: "history" },
  { icon: Library, key: "vault" },
]

function Frame({ children, active = "research", title }: { children: ReactNode; active?: string; title: string }) {
  return (
    <>
      <rect x={0.5} y={0.5} width={W - 1} height={H - 1} rx={16} fill={C.bg} stroke={C.line} />
      {/* window bar */}
      <path d={`M0.5,${Y0} V16 a15.5,15.5 0 0 1 15.5,-15.5 H${W - 16} a15.5,15.5 0 0 1 15.5,15.5 V${Y0} Z`} fill={C.bg2} />
      <line x1={0} x2={W} y1={Y0} y2={Y0} stroke={C.line} />
      {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
        <circle key={c} cx={22 + i * 18} cy={22} r={5.5} fill={c} />
      ))}
      <T x={W / 2} y={26} size={12} weight={600} anchor="middle">
        SCINODE
        <tspan fill={C.sub} fontWeight={400}>
          {"  ·  "}
          {title}
        </tspan>
      </T>
      {/* left rail */}
      <line x1={X0} x2={X0} y1={Y0} y2={H - 1} stroke={C.line} />
      {railIcons.map((r, i) => {
        const y = Y0 + 20 + i * 48
        const on = r.key === active
        return (
          <g key={r.key}>
            {on && <rect x={14} y={y - 2} width={36} height={36} rx={10} fill={C.accentSoft} />}
            <Icon icon={r.icon} x={22} y={y + 6} s={20} color={on ? C.accent : C.sub} />
          </g>
        )
      })}
      {children}
    </>
  )
}

/* ---------------- views ---------------- */

const question = "Generate retrosynthesis routes for aspirin."

function HomeView() {
  const cx = X0 + (W - X0) / 2
  const boxW = 560
  const bx = cx - boxW / 2
  const actions: { label: string; icon: LucideIcon }[] = [
    { label: "Generate Routes", icon: Waypoints },
    { label: "Literature", icon: FileText },
    { label: "Patents & Prior Art", icon: ScrollText },
    { label: "Molecule Builder", icon: Atom },
  ]
  let ax = bx
  return (
    <Frame active="home" title="Research Home">
      <Pill x={W - 150} y={Y0 + 16} label="Research Vault" icon={Library} />
      <T x={cx} y={168} size={28} weight={600} anchor="middle">
        Deep Research
      </T>
      <Sk x={cx - 150} y={186} w={300} h={8} />
      {/* question box */}
      <rect x={bx} y={216} width={boxW} height={104} rx={16} fill={C.bg} stroke={C.accent} strokeWidth={1.5} />
      <rect x={bx - 4} y={212} width={boxW + 8} height={112} rx={19} fill="none" stroke={C.accentSoft} strokeWidth={4} />
      <T x={bx + 20} y={248} size={15}>
        {question}
      </T>
      <rect x={bx + 22 + question.length * 15 * 0.47} y={235} width={1.5} height={18} fill={C.accent} />
      <Icon icon={Plus} x={bx + 18} y={288} s={18} />
      <Btn x={bx + boxW - 148} y={280} w={132} label="Start Research" primary icon={ArrowUp} />
      {/* quick actions */}
      {actions.map((a) => {
        const x = ax
        ax += tw(a.label, 12) + 24 + 20 + 8
        return <Pill key={a.label} x={x} y={340} label={a.label} icon={a.icon} />
      })}
      {/* suggested prompts */}
      <Label x={bx} y={402}>
        SUGGESTED PROMPTS
      </Label>
      {[0, 1].map((i) => (
        <g key={i}>
          <rect x={bx + i * 284} y={412} width={276} height={36} rx={10} fill={C.bg2} />
          <Icon icon={Sparkles} x={bx + i * 284 + 12} y={422} s={16} color={C.accent} />
          <Sk x={bx + i * 284 + 38} y={426} w={i ? 160 : 200} />
        </g>
      ))}
      {/* recent research */}
      <Label x={bx} y={482}>
        RECENT RESEARCH
      </Label>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Card x={bx + i * 190} y={492} w={180} h={72} />
          <Icon icon={FlaskConical} x={bx + i * 190 + 14} y={506} s={16} color={C.sub} />
          <Sk x={bx + i * 190 + 14} y={532} w={[130, 110, 140][i]} />
          <Sk x={bx + i * 190 + 14} y={546} w={70} h={6} />
        </g>
      ))}
    </Frame>
  )
}

function ChatPanel({ x, w }: { x: number; w: number }) {
  return (
    <g>
      <rect x={x} y={Y0} width={w} height={H - Y0 - 1} fill={C.bg2} />
      <line x1={x} x2={x} y1={Y0} y2={H} stroke={C.line} />
      {/* user question */}
      <rect x={x + 30} y={Y0 + 56} width={w - 46} height={50} rx={12} fill={C.accent} />
      <T x={x + 44} y={Y0 + 77} fill="#fff" size={12}>
        Generate retrosynthesis routes
      </T>
      <T x={x + 44} y={Y0 + 94} fill="#fff" size={12}>
        for aspirin.
      </T>
      {/* assistant reply */}
      <circle cx={x + 28} cy={Y0 + 138} r={12} fill={C.accentSoft} />
      <Icon icon={Sparkles} x={x + 21} y={Y0 + 131} s={14} color={C.accent} />
      {[200, 180, 196, 120].map((sw, i) => (
        <Sk key={i} x={x + 48} y={Y0 + 132 + i * 16} w={Math.min(sw, w - 64)} />
      ))}
      <rect x={x + 48} y={Y0 + 206} width={w - 64} height={40} rx={10} fill={C.bg} stroke={C.line} />
      <Icon icon={Waypoints} x={x + 58} y={Y0 + 218} s={16} color={C.accent} />
      <Sk x={x + 82} y={Y0 + 222} w={w - 120} />
      {/* input */}
      <rect x={x + 16} y={H - 70} width={w - 32} height={48} rx={12} fill={C.bg} stroke={C.line} />
      <Sk x={x + 32} y={H - 50} w={w - 110} />
      <circle cx={x + w - 40} cy={H - 46} r={14} fill={C.accent} />
      <Icon icon={ArrowUp} x={x + w - 47} y={H - 53} s={14} color="#fff" />
    </g>
  )
}

function Tabs({ x, y, items, active = 0 }: { x: number; y: number; items: string[]; active?: number }) {
  let cx = x
  return (
    <g>
      <line x1={x} x2={x + 560} y1={y + 14} y2={y + 14} stroke={C.line} />
      {items.map((t, i) => {
        const tx = cx
        cx += tw(t, 13) + 28
        return (
          <g key={t}>
            <T x={tx} y={y} size={13} weight={i === active ? 600 : 500} fill={i === active ? C.ink : C.sub}>
              {t}
            </T>
            {i === active && <rect x={tx} y={y + 12} width={tw(t, 13)} height={3} rx={1.5} fill={C.accent} />}
          </g>
        )
      })}
    </g>
  )
}

function WorkspaceView() {
  const split = X0 + Math.round((W - X0) * 0.7)
  const lw = split - X0
  return (
    <Frame title="Current investigation">
      {/* proportion markers */}
      <g>
        <line x1={X0 + 24} x2={split - 24} y1={Y0 + 18} y2={Y0 + 18} stroke={C.accent} strokeDasharray="3 4" />
        <rect x={X0 + lw / 2 - 86} y={Y0 + 8} width={172} height={20} rx={10} fill={C.accent} />
        <T x={X0 + lw / 2} y={Y0 + 22} size={11} weight={600} fill="#fff" anchor="middle">
          70% Research workspace
        </T>
      </g>
      <Tabs x={X0 + 28} y={Y0 + 62} items={["Routes", "Literature", "Patents", "Sources"]} />
      {/* investigation header */}
      <Ring cx={X0 + 48} cy={Y0 + 110} r={14} />
      <T x={X0 + 74} y={Y0 + 106} size={15} weight={600}>
        Aspirin
      </T>
      <Sk x={X0 + 74} y={Y0 + 114} w={150} h={6} />
      <Pill x={split - 150} y={Y0 + 94} label="Modify Path" />
      {/* route list */}
      {[0, 1, 2].map((i) => {
        const y = Y0 + 148 + i * 120
        return (
          <g key={i}>
            <Card x={X0 + 28} y={y} w={lw - 56} h={108} active={i === 0} />
            <T x={X0 + 46} y={y + 28} size={13} weight={600}>
              {`Route ${"ABC"[i]}`}
            </T>
            {i === 0 && <Pill x={X0 + 112} y={y + 12} label="Recommended" active size={10} h={22} />}
            {Array.from({ length: 3 + i }, (_, k) => (
              <g key={k}>
                <Ring cx={X0 + 66 + k * 70} cy={y + 70} r={13} color={i === 0 ? C.accent : C.ink} />
                {k < 2 + i && <Arrow x1={X0 + 86 + k * 70} x2={X0 + 116 + k * 70} y={y + 70} />}
              </g>
            ))}
            {[0, 1, 2].map((m) => (
              <g key={m}>
                <Label x={lw - 120 + m * 50} y={y + 56}>
                  {["Steps", "Yield", "Score"][m]}
                </Label>
                <Sk x={lw - 120 + m * 50} y={y + 66} w={30} h={10} />
              </g>
            ))}
          </g>
        )
      })}
      <ChatPanel x={split} w={W - split} />
      {/* proportion marker for the conversation panel */}
      <rect x={split + 16} y={Y0 + 8} width={W - split - 32} height={20} rx={10} fill={C.ink} />
      <T x={split + (W - split) / 2} y={Y0 + 22} size={11} weight={600} fill="#fff" anchor="middle">
        30% AI conversation
      </T>
    </Frame>
  )
}

/** Skeletal formula of aspirin (2-acetoxybenzoic acid). */
function Aspirin({ cx, cy, r = 40 }: { cx: number; cy: number; r?: number }) {
  const v = (k: number) => {
    const a = (Math.PI / 3) * k - Math.PI / 2
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const
  }
  const pts = Array.from({ length: 6 }, (_, k) => v(k))
  // inner double bonds on alternate edges
  const inner = [1, 3, 5].map((k) => {
    const [x1, y1] = pts[k]
    const [x2, y2] = pts[(k + 1) % 6]
    const s = 0.78
    return [cx + (x1 - cx) * s, cy + (y1 - cy) * s, cx + (x2 - cx) * s, cy + (y2 - cy) * s]
  })
  const [tx, ty] = pts[0] // top: carboxylic acid
  const [rx, ry] = pts[1] // upper right: acetoxy
  const c1 = [tx, ty - 30] as const
  const o1 = [rx + 26, ry - 15] as const
  const c2 = [o1[0] + 26, o1[1] + 15] as const
  return (
    <g stroke={C.ink} strokeWidth={1.8} strokeLinecap="round" fill="none">
      <polygon points={pts.map((p) => p.join(",")).join(" ")} strokeLinejoin="round" />
      {inner.map(([a, b, c, d], i) => (
        <line key={i} x1={a} y1={b} x2={c} y2={d} />
      ))}
      {/* COOH */}
      <line x1={tx} y1={ty} x2={c1[0]} y2={c1[1]} />
      <line x1={c1[0]} y1={c1[1]} x2={c1[0] - 24} y2={c1[1] - 14} />
      <line x1={c1[0] - 3} y1={c1[1] - 5} x2={c1[0] - 25} y2={c1[1] - 18} />
      <line x1={c1[0]} y1={c1[1]} x2={c1[0] + 22} y2={c1[1] - 13} />
      {/* O-C(=O)-CH3 */}
      <line x1={rx} y1={ry} x2={o1[0] - 7} y2={o1[1] + 4} />
      <line x1={o1[0] + 7} y1={o1[1] + 4} x2={c2[0]} y2={c2[1]} />
      <line x1={c2[0]} y1={c2[1]} x2={c2[0]} y2={c2[1] + 24} />
      <line x1={c2[0] + 5} y1={c2[1]} x2={c2[0] + 5} y2={c2[1] + 24} />
      <line x1={c2[0]} y1={c2[1]} x2={c2[0] + 26} y2={c2[1] - 15} />
      <g stroke="none" fill={C.ink} fontSize={13} fontWeight={600}>
        <text x={c1[0] - 34} y={c1[1] - 18}>O</text>
        <text x={c1[0] + 22} y={c1[1] - 12}>OH</text>
        <text x={o1[0] - 5} y={o1[1] + 9}>O</text>
        <text x={c2[0] - 2} y={c2[1] + 38}>O</text>
      </g>
    </g>
  )
}

function MoleculeView() {
  const fields: [string, string, boolean?][] = [
    ["Compound name", "Aspirin (acetylsalicylic acid)"],
    ["CAS", "50-78-2", true],
    ["Molecular weight", "180.16 g/mol", true],
    ["InChIKey", "BSYNRYMUTXBXSQ-UHFFFAOYSA-N", true],
    ["SMILES", "CC(=O)OC1=CC=CC=C1C(=O)O", true],
  ]
  const cx = X0 + 40
  return (
    <Frame title="Molecule resolution">
      {/* the question that led here */}
      <rect x={W - 360} y={Y0 + 28} width={330} height={36} rx={12} fill={C.accent} />
      <T x={W - 346} y={Y0 + 51} size={12} fill="#fff">
        {question}
      </T>
      <T x={cx} y={Y0 + 110} size={20} weight={600}>
        Confirm the molecule
      </T>
      <Sk x={cx} y={Y0 + 124} w={260} />
      <Card x={cx} y={Y0 + 150} w={W - cx - 40} h={330} />
      {/* structure */}
      <rect x={cx + 20} y={Y0 + 170} width={300} height={290} rx={10} fill={C.bg2} />
      <Aspirin cx={cx + 160} cy={Y0 + 345} r={44} />
      <Label x={cx + 34} y={Y0 + 192}>
        MOLECULAR STRUCTURE
      </Label>
      {/* identifiers */}
      {fields.map(([k, v, mono], i) => {
        const y = Y0 + 190 + i * 52
        return (
          <g key={k}>
            <Label x={cx + 350} y={y}>
              {k.toUpperCase()}
            </Label>
            <T x={cx + 350} y={y + 22} size={mono ? 13 : 15} weight={mono ? 500 : 600} mono={mono}>
              {v}
            </T>
            {i < fields.length - 1 && <line x1={cx + 350} x2={W - 70} y1={y + 36} y2={y + 36} stroke={C.line} />}
          </g>
        )
      })}
      <Btn x={W - 220} y={H - 70} w={180} label="Continue Research" primary icon={ArrowRight} />
      <Btn x={W - 330} y={H - 70} w={100} label="Change" />
    </Frame>
  )
}

function RoutesView() {
  const cw = 266
  const gap = 18
  const x0 = X0 + 32
  return (
    <Frame title="Routes">
      <T x={x0} y={Y0 + 46} size={20} weight={600}>
        Compare routes
      </T>
      <Sk x={x0} y={Y0 + 60} w={240} />
      <Pill x={W - 190} y={Y0 + 28} label="Sort by score" />
      {[0, 1, 2].map((i) => {
        const x = x0 + i * (cw + gap)
        const y = Y0 + 96
        const rec = i === 0
        const steps = [3, 4, 5][i]
        return (
          <g key={i}>
            {rec && <rect x={x - 4} y={y - 4} width={cw + 8} height={432} rx={15} fill={C.accentSoft} />}
            <Card x={x} y={y} w={cw} h={424} active={rec} />
            <T x={x + 18} y={y + 32} size={15} weight={600}>
              {`Route ${"ABC"[i]}`}
            </T>
            {rec && <Pill x={x + cw - 118} y={y + 15} label="Recommended" primary size={10} h={22} />}
            {/* key figures */}
            {["Steps", "Yield", "Route score"].map((m, k) => (
              <g key={m}>
                <Label x={x + 18 + k * 82} y={y + 64}>
                  {m.toUpperCase()}
                </Label>
                <Sk x={x + 18 + k * 82} y={y + 74} w={44} h={14} fill={rec ? "#DCD8FB" : C.sk} />
              </g>
            ))}
            {/* reaction sequence */}
            <Label x={x + 18} y={y + 124}>
              REACTION SEQUENCE
            </Label>
            {Array.from({ length: steps }, (_, k) => {
              const nx = x + 34 + k * ((cw - 68) / (steps - 1))
              const next = x + 34 + (k + 1) * ((cw - 68) / (steps - 1))
              return (
                <g key={k}>
                  <Ring cx={nx} cy={y + 156} r={12} color={rec ? C.accent : C.ink} />
                  {k < steps - 1 && <Arrow x1={nx + 16} x2={next - 16} y={y + 156} />}
                </g>
              )
            })}
            {/* rationale */}
            <Label x={x + 18} y={y + 206}>
              ROUTE RATIONALE
            </Label>
            {[220, 200, 214, 140].map((sw, k) => (
              <Sk key={k} x={x + 18} y={y + 218 + k * 16} w={sw} />
            ))}
            {/* evidence */}
            <Label x={x + 18} y={y + 312}>
              SUPPORTING EVIDENCE
            </Label>
            {[0, 1].map((k) => (
              <g key={k}>
                <rect x={x + 18} y={y + 322 + k * 30} width={cw - 36} height={24} rx={6} fill={C.bg2} />
                <Icon icon={k ? ScrollText : FileText} x={x + 26} y={y + 326 + k * 30} s={15} />
                <Sk x={x + 48} y={y + 330 + k * 30} w={130} />
              </g>
            ))}
            <Btn x={x + 18} y={y + 376} w={cw - 36} label={rec ? "Analyze Route" : "View route"} primary={rec} icon={rec ? ArrowRight : undefined} />
          </g>
        )
      })}
    </Frame>
  )
}

function ModifyView() {
  const x0 = X0 + 32
  const split = X0 + 560
  return (
    <Frame title="Modify Path">
      {/* view switch */}
      <rect x={x0} y={Y0 + 24} width={220} height={34} rx={10} fill={C.bg2} />
      <rect x={x0 + 3} y={Y0 + 27} width={107} height={28} rx={8} fill={C.bg} stroke={C.line} />
      <T x={x0 + 56} y={Y0 + 45} size={12} weight={600} anchor="middle">
        Scheme View
      </T>
      <T x={x0 + 165} y={Y0 + 45} size={12} weight={500} fill={C.sub} anchor="middle">
        Form View
      </T>
      {/* scheme */}
      {[0, 1, 2].map((k) => {
        const nx = x0 + 20 + k * 165
        const ny = Y0 + 150
        const sel = k === 1
        return (
          <g key={k}>
            <rect x={nx} y={ny} width={110} height={100} rx={12} fill={sel ? C.accentSoft : C.bg} stroke={sel ? C.accent : C.line} strokeWidth={sel ? 1.5 : 1} />
            <Ring cx={nx + 55} cy={ny + 44} r={18} color={sel ? C.accent : C.ink} />
            <Sk x={nx + 22} y={ny + 78} w={66} />
            {k < 2 && (
              <g>
                <Arrow x1={nx + 116} x2={nx + 160} y={ny + 50} />
                <Sk x={nx + 118} y={ny + 32} w={40} h={6} />
                <Sk x={nx + 124} y={ny + 60} w={28} h={6} />
              </g>
            )}
            <T x={nx + 55} y={ny + 124} size={11} weight={600} fill={C.sub} anchor="middle">
              {`Step ${k + 1}`}
            </T>
          </g>
        )
      })}
      {/* hover toolbar on the selected step */}
      <g>
        <rect x={x0 + 108} y={Y0 + 92} width={300} height={40} rx={10} fill={C.ink} />
        {["Change reagent", "Modify conditions"].map((l, i) => (
          <T key={l} x={x0 + 124 + i * 118} y={Y0 + 117} size={12} weight={500} fill="#fff">
            {l}
          </T>
        ))}
        <Icon icon={Sparkles} x={x0 + 378} y={Y0 + 104} s={16} color="#C9C3FF" />
        <path d={`M${x0 + 238},${Y0 + 132} l7,8 l7,-8 Z`} fill={C.ink} />
      </g>
      {/* add actions */}
      <Pill x={x0 + 20} y={Y0 + 330} label="Add compound" icon={Plus} />
      <Pill x={x0 + 160} y={Y0 + 330} label="Add reaction" icon={Plus} />
      <Label x={x0 + 20} y={Y0 + 400}>
        MANAGE STEPS
      </Label>
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <rect x={x0 + 20} y={Y0 + 410 + k * 40} width={470} height={32} rx={8} fill={k === 1 ? C.accentSoft : C.bg2} />
          <T x={x0 + 34} y={Y0 + 430 + k * 40} size={12} weight={600} fill={k === 1 ? C.accent : C.ink}>
            {`Step ${k + 1}`}
          </T>
          <Sk x={x0 + 90} y={Y0 + 422 + k * 40} w={[200, 240, 180][k]} />
        </g>
      ))}
      {/* form panel */}
      <rect x={split} y={Y0} width={W - split} height={H - Y0 - 1} fill={C.bg2} />
      <line x1={split} x2={split} y1={Y0} y2={H} stroke={C.line} />
      <T x={split + 28} y={Y0 + 46} size={15} weight={600}>
        Step 2
      </T>
      <Sk x={split + 28} y={Y0 + 58} w={180} h={6} />
      {["Reagents", "Solvents", "Conditions"].map((f, i) => (
        <g key={f}>
          <Label x={split + 28} y={Y0 + 104 + i * 76}>
            {f.toUpperCase()}
          </Label>
          <rect x={split + 28} y={Y0 + 114 + i * 76} width={W - split - 56} height={38} rx={8} fill={C.bg} stroke={i === 0 ? C.accent : C.line} />
          <Sk x={split + 42} y={Y0 + 129 + i * 76} w={[150, 110, 170][i]} />
        </g>
      ))}
      <Btn x={split + 28} y={H - 130} w={W - split - 56} label="Ask the AI for another approach" icon={Sparkles} />
      <Btn x={split + 28} y={H - 84} w={W - split - 56} label="Apply changes" primary />
    </Frame>
  )
}

function ScaleView() {
  const x0 = X0 + 32
  const cols = ["Compound", "MW", "mmol", "Mass", "Equivalents"]
  const colX = [0, 300, 420, 540, 660]
  const rows = [
    { step: "Step 1", n: 3 },
    { step: "Step 2", n: 2 },
  ]
  let y = Y0 + 200
  return (
    <Frame title="Scale">
      <T x={x0} y={Y0 + 46} size={20} weight={600}>
        Scale the route
      </T>
      <Sk x={x0} y={Y0 + 60} w={220} />
      {/* target quantity */}
      <Label x={x0} y={Y0 + 104}>
        TARGET QUANTITY
      </Label>
      <rect x={x0} y={Y0 + 114} width={220} height={40} rx={8} fill={C.bg} stroke={C.accent} strokeWidth={1.5} />
      <Sk x={x0 + 14} y={Y0 + 130} w={60} h={10} fill="#DCD8FB" />
      <T x={x0 + 196} y={Y0 + 139} size={13} weight={500} fill={C.sub} anchor="end">
        g
      </T>
      <Label x={x0 + 250} y={Y0 + 104}>
        LIMITING REAGENT
      </Label>
      <rect x={x0 + 250} y={Y0 + 114} width={220} height={40} rx={8} fill={C.bg2} />
      <Ring cx={x0 + 272} cy={Y0 + 134} r={10} color={C.accent} />
      <Sk x={x0 + 292} y={Y0 + 130} w={120} />
      <Btn x={W - 190} y={Y0 + 118} w={150} label="Recalculate" primary />
      {/* table */}
      <rect x={x0} y={Y0 + 172} width={W - x0 - 32} height={30} rx={6} fill={C.bg2} />
      {cols.map((c, i) => (
        <Label key={c} x={x0 + 16 + colX[i]} y={Y0 + 191}>
          {c.toUpperCase()}
        </Label>
      ))}
      {rows.map((r) => {
        const group = (
          <g key={r.step}>
            <T x={x0 + 16} y={y + 30} size={12} weight={600} fill={C.accent}>
              {r.step}
            </T>
            {Array.from({ length: r.n }, (_, k) => {
              const ry = y + 44 + k * 40
              const limiting = r.step === "Step 1" && k === 0
              return (
                <g key={k}>
                  {limiting && <rect x={x0} y={ry - 4} width={W - x0 - 32} height={36} rx={6} fill={C.accentSoft} />}
                  <Ring cx={x0 + 30} cy={ry + 14} r={9} color={limiting ? C.accent : C.ink} />
                  <Sk x={x0 + 50} y={ry + 10} w={[140, 110, 120][k] ?? 120} />
                  {limiting && <Pill x={x0 + 210} y={ry + 3} label="Limiting" primary size={10} h={22} />}
                  {colX.slice(1).map((cx, j) => (
                    <Sk key={j} x={x0 + 16 + cx} y={ry + 10} w={[46, 38, 50, 30][j]} />
                  ))}
                  <line x1={x0} x2={W - 32} y1={ry + 34} y2={ry + 34} stroke={C.line} />
                </g>
              )
            })}
          </g>
        )
        y += 44 + r.n * 40 + 8
        return group
      })}
    </Frame>
  )
}

function SourcesView() {
  const x0 = X0 + 32
  const listW = 560
  return (
    <Frame title="Sources">
      <T x={x0} y={Y0 + 46} size={20} weight={600}>
        Sources &amp; evidence
      </T>
      <Pill x={x0} y={Y0 + 66} label="Route A · Step 2" active icon={Waypoints} size={11} h={24} />
      <Tabs x={x0} y={Y0 + 124} items={["All", "Literature", "Patents"]} active={1} />
      {[0, 1, 2].map((i) => {
        const y = Y0 + 156 + i * 128
        const patent = i === 2
        return (
          <g key={i}>
            <Card x={x0} y={y} w={listW} h={116} />
            <Pill x={x0 + 16} y={y + 14} label={patent ? "Patent" : "Literature"} active={!patent} size={10} h={20} icon={patent ? ScrollText : FileText} />
            <Sk x={x0 + 16} y={y + 46} w={[420, 380, 400][i]} h={10} fill="#DDDDE2" />
            <T x={x0 + 16} y={y + 76} size={11} fill={C.sub}>
              Year
            </T>
            <Sk x={x0 + 46} y={y + 69} w={30} h={7} />
            <T x={x0 + 96} y={y + 76} size={11} fill={C.sub}>
              Publisher
            </T>
            <Sk x={x0 + 150} y={y + 69} w={90} h={7} />
            <Sk x={x0 + 16} y={y + 90} w={500} h={6} />
            <Sk x={x0 + 16} y={y + 102} w={360} h={6} />
            <rect x={x0 + listW - 50} y={y + 12} width={34} height={30} rx={8} fill={i === 0 ? C.accent : C.bg} stroke={i === 0 ? "none" : C.line} />
            <Icon icon={Bookmark} x={x0 + listW - 41} y={y + 19} s={16} color={i === 0 ? "#fff" : C.sub} />
          </g>
        )
      })}
      {/* abstract drawer */}
      <rect x={x0 + listW + 24} y={Y0 + 24} width={W - (x0 + listW + 24) - 24} height={H - Y0 - 48} rx={12} fill={C.bg2} />
      <Label x={x0 + listW + 44} y={Y0 + 56}>
        ABSTRACT
      </Label>
      {[220, 240, 210, 236, 180, 226, 120].map((sw, k) => (
        <Sk key={k} x={x0 + listW + 44} y={Y0 + 70 + k * 16} w={Math.min(sw, 196)} h={6} />
      ))}
      <Label x={x0 + listW + 44} y={Y0 + 214}>
        SUPPORTING REFERENCES
      </Label>
      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          <T x={x0 + listW + 44} y={Y0 + 244 + k * 32} size={11} weight={600} fill={C.accent}>
            {`[${k + 1}]`}
          </T>
          <Sk x={x0 + listW + 70} y={Y0 + 237 + k * 32} w={[170, 150, 180, 130][k]} h={7} />
        </g>
      ))}
      <Btn x={x0 + listW + 44} y={H - 84} w={W - (x0 + listW + 44) - 44} label="Save to Research Vault" primary icon={Bookmark} />
    </Frame>
  )
}

function VaultView() {
  const x0 = X0 + 32
  const filters = ["Saved research", "Saved sources", "Saved routes"]
  let fx = x0
  const gridW = 560
  return (
    <Frame active="vault" title="Research Vault">
      <T x={x0} y={Y0 + 46} size={20} weight={600}>
        Research Vault
      </T>
      <rect x={x0} y={Y0 + 66} width={gridW} height={38} rx={10} fill={C.bg2} />
      <Icon icon={Search} x={x0 + 12} y={Y0 + 77} s={16} />
      <Sk x={x0 + 38} y={Y0 + 81} w={160} />
      {filters.map((f, i) => {
        const x = fx
        fx += tw(f, 12) + 32
        return <Pill key={f} x={x} y={Y0 + 120} label={f} active={i === 0} />
      })}
      {Array.from({ length: 6 }, (_, i) => {
        const col = i % 3
        const row = Math.floor(i / 3)
        const x = x0 + col * 192
        const y = Y0 + 168 + row * 150
        const icons = [FlaskConical, FileText, Waypoints]
        return (
          <g key={i}>
            <Card x={x} y={y} w={176} h={136} />
            <rect x={x + 14} y={y + 14} width={30} height={30} rx={8} fill={C.accentSoft} />
            <Icon icon={icons[(i + row) % 3]} x={x + 21} y={y + 21} s={16} color={C.accent} />
            <Sk x={x + 14} y={y + 60} w={130} h={9} fill="#DDDDE2" />
            <Sk x={x + 14} y={y + 76} w={100} />
            <Sk x={x + 14} y={y + 112} w={56} h={6} />
          </g>
        )
      })}
      {/* history */}
      <line x1={x0 + gridW + 24} x2={x0 + gridW + 24} y1={Y0 + 24} y2={H - 24} stroke={C.line} />
      <T x={x0 + gridW + 48} y={Y0 + 46} size={15} weight={600}>
        History
      </T>
      <Label x={x0 + gridW + 48} y={Y0 + 86}>
        PREVIOUS INVESTIGATIONS
      </Label>
      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          <Icon icon={History} x={x0 + gridW + 48} y={Y0 + 102 + k * 54} s={15} />
          <Sk x={x0 + gridW + 72} y={Y0 + 106 + k * 54} w={[160, 140, 170, 120][k]} />
          <Sk x={x0 + gridW + 72} y={Y0 + 122 + k * 54} w={70} h={6} />
        </g>
      ))}
      <Btn x={x0 + gridW + 48} y={H - 84} w={W - (x0 + gridW + 48) - 32} label="Continue Research" primary icon={ArrowRight} />
    </Frame>
  )
}

const views: Record<MockView, { el: () => ReactNode; label: string }> = {
  home: { el: HomeView, label: "Research Home: a focused question box with quick actions, suggested prompts and recent research" },
  workspace: { el: WorkspaceView, label: "Research workspace: routes on the left (70%) with the AI conversation kept open on the right (30%)" },
  molecule: { el: MoleculeView, label: "Molecule resolution for aspirin: structure, compound name, CAS, molecular weight, InChIKey and SMILES with a Continue Research action" },
  routes: { el: RoutesView, label: "Three route cards side by side with steps, yield, route score, reaction sequence, rationale and evidence; Route A is recommended" },
  modify: { el: ModifyView, label: "Modify Path: a reaction scheme with a hover toolbar on the selected step and a form view for reagents, solvents and conditions" },
  scale: { el: ScaleView, label: "Scale: target quantity and limiting reagent above a step-by-step table of molecular weight, mmol, mass and equivalents" },
  sources: { el: SourcesView, label: "Sources: literature and patent cards linked to a route step, with an abstract drawer and Save to Research Vault" },
  vault: { el: VaultView, label: "Research Vault: search, filters for saved research, sources and routes, and a history of previous investigations" },
}

export function ProductMockSvg({ view, className }: { view: MockView; className?: string }) {
  const V = views[view]
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={`${inter.className} h-auto w-full ${className ?? ""}`} role="img" aria-label={V.label}>
      <V.el />
    </svg>
  )
}
