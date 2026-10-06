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
  | {
      type: "findings"
      items: {
        title: string
        text: string
        /** Roles the finding was heard from */
        source?: string
        /** Design principle this finding fed into */
        principle?: string
        visual?: FindingVisual
      }[]
    }
  | { type: "chips"; items: string[] }
  /** Who took part in research. `count` per group is optional: only show numbers that are known. */
  | {
      type: "interviews"
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
  | {
      type: "phases"
      items: { phase: string; items: string[]; stat?: { value: string; unit: string } }[]
    }
  | {
      type: "visualSystem"
      colors: { name: string; hex: string }[]
      typeface: { name: string; weights: string }
      /** Optional type scale in px, largest first */
      scale?: number[]
      /** Optional icon set image */
      icons?: Img
    }
  /** Bento design-system board: colour, typography scale and a Lucide icon set */
  | {
      type: "designSystem"
      /** Brand colours; `image` shows where the colour appears in the product (object-position tunes the crop) */
      brand: { name: string; hex: string; image?: { src: string; alt: string; position?: string } }[]
      neutrals: { name: string; hex: string }[]
      typeface: string
      weights: string[]
      scale: number[]
      icons: { icon: import("@/components/case-study/design-system").IconKey; label: string; primary?: boolean }[]
    }
  /** A hand-coded diagram component, referenced by name */
  | { type: "diagram"; name: "arc-user-flow" }
  /** A user flow shown as phone screens in sequence */
  | { type: "phoneFlow"; title: string; text: string; tone: Tone; screens: { image: Img; label: string }[] }
  /** Illustration components with where each one is used */
  | { type: "illustrations"; items: { image: Img; name: string; usedIn: string; background: string }[] }
  /** Looping, muted video (converted from the original GIFs) */
  | {
      type: "video"
      src: string
      poster: string
      width: number
      height: number
      caption?: string
      /** "phone" renders narrow and centred, "wide" fills the column */
      layout: "phone" | "wide"
      background?: string
      /** Optional full-width coloured stage behind a phone video, with a title shown on it */
      stage?: { color: string; title: string; text?: string }
    }

export type FindingVisual = "distance" | "alarm" | "waveform" | "navigation" | "settings"

export type Tone = "green" | "orange" | "purple" | "blue"

/** A headline result shown as a metric card. The chart is decorative, not plotted data. */
export type Metric = {
  label: string
  value: string
  trend?: "up" | "down"
  /** One word in the trend chip, e.g. "fewer" */
  change?: string
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

/** A related project card ("More from …"). Links to a case study page or an external page such as Behance. */
export type WorkCard = {
  title: string
  meta: string
  summary: string
  thumbnail: Img
  href: string
  external?: boolean
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
  /** Heading above the metric cards (defaults to "Impact overview") */
  impactTitle?: string
  sections: Section[]
  /** Other projects from the same company, shown at the end of the page */
  moreWork?: { heading: string; items: WorkCard[] }
}
