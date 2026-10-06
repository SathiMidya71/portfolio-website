// Arc Connect user flow, redrawn as SVG from the Behance board so it sits on the page
// background. Same layout: starburst nodes, solid connectors, dashed shortcuts, blue main areas.

type Node = { x: number; y: number; label: string; main?: boolean; r?: number }

const nodes: Node[] = [
  { x: 355, y: 88, label: "Start\nScreen", r: 37 },
  { x: 322, y: 222, label: "Login" },
  { x: 390, y: 222, label: "Onboarding" },
  { x: 458, y: 222, label: "Skip" },
  { x: 390, y: 294, label: "Registration" },
  // main areas
  { x: 226, y: 409, label: "Home", main: true },
  { x: 312, y: 409, label: "My\nConnections", main: true },
  { x: 398, y: 409, label: "Invitations", main: true },
  { x: 484, y: 409, label: "Profile", main: true },
  // home
  { x: 113, y: 131, label: "Edit User\nProfile" },
  { x: 113, y: 203, label: "User\nAdherence\nscore" },
  { x: 113, y: 275, label: "Adherence\nscore\nHistory" },
  { x: 113, y: 347, label: "Device\nconnection\nStatus" },
  { x: 113, y: 412, label: "Set\nTherapy\nGoals" },
  { x: 113, y: 484, label: "Send\nInvite" },
  // connections & invitations
  { x: 240, y: 492, label: "See\nConnections\nHealth Data" },
  { x: 312, y: 492, label: "Search\nConnection" },
  { x: 398, y: 492, label: "Sent\nInvitations" },
  { x: 398, y: 564, label: "Received\nInvitations" },
  // profile
  { x: 484, y: 492, label: "Personal\ninfo" },
  { x: 484, y: 564, label: "Medical\nSummary" },
  { x: 484, y: 642, label: "Details\nof the\ndevice" },
  { x: 484, y: 714, label: "Settings" },
  { x: 612, y: 284, label: "First\nName" },
  { x: 612, y: 355, label: "Last\nName" },
  { x: 612, y: 426, label: "Date\nof\nBirth" },
  { x: 612, y: 497, label: "Address" },
  { x: 612, y: 568, label: "Height" },
  { x: 612, y: 640, label: "Weight" },
  { x: 612, y: 711, label: "Gender" },
  { x: 612, y: 782, label: "Blood\nType" },
  { x: 612, y: 854, label: "Diagnosis\n1, 2, 3" },
  { x: 612, y: 926, label: "Allergies\n1, 2, 3" },
  { x: 275, y: 814, label: "Change\nmeasuring\nunits" },
  { x: 348, y: 814, label: "Update\npassword" },
  { x: 420, y: 814, label: "Update\nmobile\nnumber" },
  { x: 493, y: 814, label: "Update\nemail\naddress" },
]

// Solid connectors (orthogonal polylines)
const lines = [
  "M322,110 V192", "M390,110 V192", "M420,222 H428", "M390,252 V264",
  "M322,252 V340", "M390,324 V340", "M226,340 H484", "M226,340 V374", "M312,340 V374", "M398,340 V374", "M484,340 V374",
  // home branch
  "M143,131 H162 V484 H143", "M143,203 H162", "M143,275 H162", "M143,347 H162", "M143,412 H191", "M162,409 H191",
  // connections / invitations
  "M312,444 V462", "M270,492 H282", "M398,444 V534",
  // profile branch
  "M484,444 V684", "M514,492 H548", "M548,284 V497", "M548,284 H582", "M548,355 H582", "M548,426 H582", "M548,497 H582",
  "M514,564 H548", "M548,568 V926", "M548,568 H582", "M548,640 H582", "M548,711 H582", "M548,782 H582", "M548,854 H582", "M548,926 H582",
  "M484,744 V759", "M275,759 H493", "M275,759 V784", "M348,759 V784", "M420,759 V784", "M493,759 V784",
]

// Dashed shortcuts between areas
const dashed = ["M113,101 V33 H502 V378", "M83,347 H38 V642 H454", "M83,484 H56 V528 H358 V438"]

/** Starburst ("seal") outline around a centre point. */
function burst(cx: number, cy: number, r: number, spikes = 30) {
  const pts: string[] = []
  for (let i = 0; i < spikes * 2; i++) {
    const a = (Math.PI * i) / spikes
    const rr = i % 2 ? r * 0.9 : r
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`)
  }
  return `M${pts.join(" L")} Z`
}

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
          <filter id="flow-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#102018" floodOpacity="0.12" />
          </filter>
        </defs>

        {dashed.map((d) => (
          <path key={d} d={d} fill="none" stroke="#3aa9c9" strokeWidth={1.4} strokeDasharray="5 4" />
        ))}
        {lines.map((d) => (
          <path key={d} d={d} fill="none" stroke="var(--ink)" strokeOpacity={0.35} strokeWidth={1.1} />
        ))}

        {/* Illustration cut from the original board, in its original corner */}
        <image href="/case-studies/arc-connect-app/flow-illustration.png" x={0} y={655} width={250} height={213} />

        {nodes.map((n) => {
          const r = n.r ?? (n.main ? 35 : 30)
          const linesOfText = n.label.split("\n")
          const size = n.main ? 11 : 8.4
          return (
            <g key={n.label} filter="url(#flow-shadow)">
              <path d={burst(n.x, n.y, r)} fill={n.main ? "#1fa9e1" : "#ffffff"} stroke={n.main ? "none" : "rgba(52,64,84,0.12)"} />
              <text
                x={n.x}
                y={n.y - ((linesOfText.length - 1) * size * 1.15) / 2 + size * 0.35}
                textAnchor="middle"
                fontSize={size}
                fontWeight={n.main ? 500 : 400}
                fill={n.main ? "#ffffff" : "var(--ink)"}
              >
                {linesOfText.map((t, i) => (
                  <tspan key={i} x={n.x} dy={i === 0 ? 0 : size * 1.15}>
                    {t}
                  </tspan>
                ))}
              </text>
            </g>
          )
        })}
      </svg>
      <figcaption className="mt-3 text-center text-[15px] font-medium text-soft">
        User flow covering every screen in the four main areas.
      </figcaption>
    </figure>
  )
}
