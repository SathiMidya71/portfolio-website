// Arc Connect user flow, redrawn as SVG from the Behance board so it sits on the page
// background. Same layout as the original (starburst nodes, connectors, dashed shortcuts),
// colour-coded by area using the site's tone palette.

type Group = "start" | "auth" | "home" | "connections" | "invitations" | "profile"
type Node = { x: number; y: number; label: string; group: Group; main?: boolean }

const palette: Record<Group, { strong: string; soft: string; text: string }> = {
  start: { strong: "#344054", soft: "#ffffff", text: "#344054" },
  auth: { strong: "#344054", soft: "#ffffff", text: "#344054" },
  home: { strong: "#02594e", soft: "#dcefe7", text: "#02594e" },
  connections: { strong: "#6e62e5", soft: "#e7e4fc", text: "#4b3fc4" },
  invitations: { strong: "#2e90fa", soft: "#ddecfe", text: "#1666c4" },
  profile: { strong: "#e8833a", soft: "#fde5d1", text: "#9a4a12" },
}

const nodes: Node[] = [
  { x: 355, y: 88, label: "Start\nScreen", group: "start", main: true },
  { x: 322, y: 222, label: "Login", group: "auth" },
  { x: 390, y: 222, label: "Onboarding", group: "auth" },
  { x: 458, y: 222, label: "Skip", group: "auth" },
  { x: 390, y: 294, label: "Registration", group: "auth" },
  // main areas
  { x: 226, y: 409, label: "Home", group: "home", main: true },
  { x: 312, y: 409, label: "My\nConnections", group: "connections", main: true },
  { x: 398, y: 409, label: "Invitations", group: "invitations", main: true },
  { x: 484, y: 409, label: "Profile", group: "profile", main: true },
  // home
  { x: 113, y: 131, label: "Edit User\nProfile", group: "home" },
  { x: 113, y: 203, label: "User\nAdherence\nScore", group: "home" },
  { x: 113, y: 275, label: "Adherence\nScore\nHistory", group: "home" },
  { x: 113, y: 347, label: "Device\nConnection\nStatus", group: "home" },
  { x: 113, y: 409, label: "Set\nTherapy\nGoals", group: "home" },
  { x: 113, y: 484, label: "Send\nInvite", group: "home" },
  // connections & invitations
  { x: 240, y: 492, label: "See\nConnections'\nHealth Data", group: "connections" },
  { x: 312, y: 492, label: "Search\nConnection", group: "connections" },
  { x: 398, y: 492, label: "Sent\nInvitations", group: "invitations" },
  { x: 398, y: 564, label: "Received\nInvitations", group: "invitations" },
  // profile
  { x: 484, y: 492, label: "Personal\nInfo", group: "profile" },
  { x: 484, y: 564, label: "Medical\nSummary", group: "profile" },
  { x: 484, y: 642, label: "Device\nDetails", group: "profile" },
  { x: 484, y: 714, label: "Settings", group: "profile" },
  { x: 612, y: 284, label: "First\nName", group: "profile" },
  { x: 612, y: 355, label: "Last\nName", group: "profile" },
  { x: 612, y: 426, label: "Date of\nBirth", group: "profile" },
  { x: 612, y: 497, label: "Address", group: "profile" },
  { x: 612, y: 568, label: "Height", group: "profile" },
  { x: 612, y: 640, label: "Weight", group: "profile" },
  { x: 612, y: 711, label: "Gender", group: "profile" },
  { x: 612, y: 782, label: "Blood\nType", group: "profile" },
  { x: 612, y: 854, label: "Diagnosis\n1, 2, 3", group: "profile" },
  { x: 612, y: 926, label: "Allergies\n1, 2, 3", group: "profile" },
  { x: 275, y: 814, label: "Measuring\nUnits", group: "profile" },
  { x: 348, y: 814, label: "Update\nPassword", group: "profile" },
  { x: 420, y: 814, label: "Update\nMobile", group: "profile" },
  { x: 493, y: 814, label: "Update\nEmail", group: "profile" },
]

// Solid connectors grouped by branch colour
const lines: { group: Group; d: string[] }[] = [
  {
    group: "auth",
    d: ["M322,118 V192", "M390,118 V192", "M420,222 H428", "M390,252 V264", "M322,252 V340", "M390,324 V340", "M226,340 H484"],
  },
  { group: "home", d: ["M226,340 V374", "M143,131 H162 V484 H143", "M143,203 H162", "M143,275 H162", "M143,347 H162", "M143,409 H191"] },
  { group: "connections", d: ["M312,340 V374", "M312,444 V462", "M270,492 H282"] },
  { group: "invitations", d: ["M398,340 V374", "M398,444 V534"] },
  {
    group: "profile",
    d: [
      "M484,340 V374", "M484,444 V684", "M514,492 H548", "M548,284 V497", "M548,284 H582", "M548,355 H582", "M548,426 H582", "M548,497 H582",
      "M514,564 H548", "M548,568 V926", "M548,568 H582", "M548,640 H582", "M548,711 H582", "M548,782 H582", "M548,854 H582", "M548,926 H582",
      "M484,744 V759", "M275,759 H493", "M275,759 V784", "M348,759 V784", "M420,759 V784", "M493,759 V784",
    ],
  },
]

// Dashed shortcuts between areas
const dashed = ["M113,101 V33 H502 V378", "M83,347 H38 V642 H454", "M83,484 H56 V528 H358 V438"]

/**
 * Soft scalloped badge: alternating outer/inner points joined with quadratic curves
 * (each point is a control point, the curve passes through the midpoints), so tips and
 * valleys are rounded instead of sharp.
 */
function burst(cx: number, cy: number, r: number, spikes = 22) {
  const pts: [number, number][] = []
  for (let i = 0; i < spikes * 2; i++) {
    const a = (Math.PI * i) / spikes - Math.PI / 2
    const rr = i % 2 ? r * 0.9 : r
    pts.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)])
  }
  const mid = (p: [number, number], q: [number, number]) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]
  const f = (n: number) => n.toFixed(1)
  const start = mid(pts[pts.length - 1], pts[0])
  let d = `M${f(start[0])},${f(start[1])}`
  pts.forEach((p, i) => {
    const m = mid(p, pts[(i + 1) % pts.length])
    d += ` Q${f(p[0])},${f(p[1])} ${f(m[0])},${f(m[1])}`
  })
  return `${d} Z`
}

const legend: { group: Group; label: string }[] = [
  { group: "home", label: "Home" },
  { group: "connections", label: "My Connections" },
  { group: "invitations", label: "Invitations" },
  { group: "profile", label: "Profile" },
]

export function ArcUserFlow() {
  return (
    <figure className="my-2">
      <svg
        viewBox="0 0 670 960"
        className="mx-auto h-auto w-full font-sans"
        role="img"
        aria-label="Arc Connect user flow: from the start screen through login, onboarding and registration to four main areas (Home, My Connections, Invitations and Profile) and every screen within them."
      >
        <defs>
          <filter id="flow-shadow" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.4" floodColor="#102018" floodOpacity="0.16" />
          </filter>
        </defs>

        {dashed.map((d) => (
          <path key={d} d={d} fill="none" stroke="#6e62e5" strokeOpacity={0.7} strokeWidth={1.5} strokeDasharray="6 5" />
        ))}
        {lines.map((l) =>
          l.d.map((d) => (
            <path key={l.group + d} d={d} fill="none" stroke={palette[l.group].strong} strokeOpacity={0.55} strokeWidth={1.4} />
          ))
        )}

        {nodes.map((n) => {
          const c = palette[n.group]
          const r = n.main ? 37 : 31
          const textLines = n.label.split("\n")
          const size = n.main ? (textLines.length > 1 ? 9.6 : 10.6) : textLines.length > 2 ? 7.6 : 8.2
          const lh = size * 1.18
          return (
            <g key={n.label} filter="url(#flow-shadow)">
              <path
                d={burst(n.x, n.y, r)}
                fill={n.main ? c.strong : c.soft}
                stroke={n.main ? "none" : c.strong}
                strokeOpacity={0.5}
                strokeWidth={1.1}
              />
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={size}
                fontWeight={n.main ? 700 : 600}
                fill={n.main ? "#ffffff" : c.text}
              >
                {textLines.map((t, i) => (
                  <tspan key={i} x={n.x} y={n.y + (i - (textLines.length - 1) / 2) * lh}>
                    {t}
                  </tspan>
                ))}
              </text>
            </g>
          )
        })}
      </svg>

      <figcaption className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] font-medium text-body">
        {legend.map((l) => (
          <span key={l.group} className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-full" style={{ background: palette[l.group].strong }} />
            {l.label}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5">
          <span className="w-5 border-t-2 border-dashed" style={{ borderColor: "#6e62e5" }} />
          Shortcut between areas
        </span>
      </figcaption>
    </figure>
  )
}
