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
  | { type: "findings"; items: { title: string; text: string; source?: string }[] }
  | { type: "chips"; items: string[] }
  | { type: "personas"; items: { name: string; role: string; goals: string[]; frustrations: string[] }[] }
  | { type: "quadrants"; items: { title: string; items: string[] }[] }
  | { type: "phases"; items: { phase: string; items: string[] }[] }
  | {
      type: "visualSystem"
      colors: { name: string; hex: string }[]
      typeface: { name: string; weights: string }
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
  impact: { label: string; text: string }[]
  sections: Section[]
}
