// Shape of a case study. Each project is one data file; the page template renders any of them.

export type Img = {
  src: string
  alt: string
  width: number
  height: number
}

export type Block =
  | { type: "p"; text: string }
  | { type: "lead"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "figure"; image: Img; caption?: string; dark?: boolean }
  | { type: "cards"; items: { title: string; text: string }[] }
  /** Problem pointers beside the ventilator illustration (expects 4 items, in illustration order) */
  | { type: "problemVisual"; items: { title: string; text: string }[] }
  | { type: "findings"; items: { title: string; text: string; source?: string }[] }
  | { type: "chips"; items: string[] }
  /**
   * Illustrated interview call (faces replaced by camera-off placeholders) plus who took part.
   * `count` per group is optional: only show numbers that are known.
   */
  | {
      type: "interviews"
      tiles: { role: string; moderator?: boolean }[]
      caption: string
      total: string
      totalLabel: string
      groups: { label: string; count?: string }[]
    }
  /** Verbatim participant quotes, shown as staggered cards */
  | { type: "quotes"; items: { quote: string; by: string }[] }
  /** Stakeholder perspective block (e.g. a team's view of the users). Only add real feedback. */
  | { type: "perspective"; from: string; context: string; items: string[] }
  | { type: "personas"; items: { name: string; role: string; goals: string[]; frustrations: string[] }[] }
  | { type: "quadrants"; items: { title: string; items: string[] }[] }
  | { type: "phases"; items: { phase: string; items: string[] }[] }
  | {
      type: "visualSystem"
      colors: { name: string; hex: string }[]
      typeface: { name: string; weights: string }
    }

export type Tone = "green" | "orange" | "purple" | "blue"

/** A headline result shown as a metric card. The chart is decorative, not plotted data. */
export type Metric = {
  label: string
  value: string
  trend: "up" | "down"
  /** One word in the trend chip, e.g. "fewer" */
  change: string
  /** Short muted context beside the chip */
  note: string
  /** Brief pointer shown under the card divider, explaining what drove the number */
  pointer: string
  tone: Tone
  visual: { kind: "line"; shape: "rising" | "falling" } | { kind: "bar"; fill: number }
}

export type Section = {
  id: string
  /** Short label for the "On this page" nav */
  nav: string
  title: string
  blocks: Block[]
}

export type CaseStudy = {
  slug: string
  company: string
  /** Shown above the title, e.g. "Healthcare · Medical device UI" */
  eyebrow: string
  title: [string, string]
  seo: { title: string; description: string }
  meta: {
    overview: string
    role: string
    team: { initials: string; label: string }[]
    timeline: string
  }
  hero: Img & { background?: string }
  impact: Metric[]
  sections: Section[]
}
