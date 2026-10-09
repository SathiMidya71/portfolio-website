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
  | {
      type: "personas"
      items: {
        name: string
        role: string
        goals: string[]
        frustrations: string[]
        /** Optional richer persona details */
        about?: string
        facts?: { label: string; value: string }[]
        needs?: string[]
        quote?: string
      }[]
    }
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
  | { type: "diagram"; name: "arc-user-flow" | "dr-user-flow" | "dr-fragmented" | "dr-journey-map" }
  /** A sequence of steps shown as connected pills, e.g. Ask → Explore → Verify */
  | { type: "flow"; items: string[]; label?: string }
  /** A design principle or key insight, shown as a pull quote */
  | { type: "principle"; text: string; label?: string }
  /** A before → after reframe */
  | { type: "shift"; from: string; to: string; label?: string }
  /** Numbered insights; `trail` shows a question evolving, `chips` show what a case needs */
  | { type: "insights"; items: { title: string; text: string; trail?: string[]; chips?: string[] }[] }
  /** Journey map: one column per stage */
  | { type: "journey"; stages: { stage: string; goal: string; action: string; response: string; pain: string }[] }
  /** Information architecture as a tree of groups */
  | { type: "tree"; root: string; groups: { title: string; note?: string; items: string[] }[] }
  /** Screen specifications: purpose, elements and primary action per screen */
  | { type: "specs"; items: { name: string; purpose: string; elements: string[]; cta?: string; layout?: string }[] }
  /** Typography hierarchy rendered in the product's own typeface */
  | {
      type: "typeHierarchy"
      font: string
      levels: { name: string; size: string; weight: string; use: string }[]
      /** Scientific identifiers shown in the data style */
      samples?: { label: string; value: string }[]
    }
  /** Colour palette with usage notes. Leave `hex` out when the exact value is not confirmed. */
  | {
      type: "palette"
      /** Short paragraph shown beside the "Colour" title */
      intro?: string
      /** `featured` colours are shown as the large swatches (up to 4, in order) */
      items: { name: string; hex?: string; tone?: Tone; use: string; featured?: boolean }[]
    }
  /** Presentation mockup: huge faint title behind a tilted touchscreen monitor; the screen is a real screenshot */
  | { type: "kioskStage"; title: string; image: Img; caption?: string; notes?: { title: string; items: string[] }[]; prompt?: string }
  /** Numbered icon cards in a row (last one dark) */
  | { type: "cycle"; items: { title: string; text: string; icon: "database" | "recycle" | "trend" | "forward" }[] }
  /** Big-number stat cards (first one dark). Only real figures. */
  | { type: "stats"; items: { value: string; label: string }[] }
  /** Real product media in a browser frame: one item full width, two side by side */
  | {
      type: "media"
      /** Sticky note taped over the top corner of the first item, listing the section's key points */
      /** Section heading and intro shown beside the note (left), so the note and text share one row */
      heading?: string
      intro?: string
      note?: { title: string; items: string[]; side: "left" | "right"; color?: "lavender" | "mint" | "peach" | "sky" | "pink" | "butter" }
      items: {
        kind: "image" | "video"
        src: string
        /** Video poster */
        poster?: string
        width: number
        height: number
        alt: string
        caption: string
      }[]
    }
  /** Problem (big statements, left), a coded centre visual, and the solution with chips (right) */
  | {
      type: "problemSolution"
      problem: { text: string; items: { big: string; text: string }[] }
      solution: { text: string; chips: string[] }
    }
  /** Vertical numbered steps */
  | { type: "steps"; items: { title: string; text: string }[] }
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
    }
  /**
   * Home screen board: looping phone recording beside coded copy (title, illustration, tagline, paragraph).
   */
  | {
      type: "homeBoard"
      title: string
      video: { src: string; poster: string; width: number; height: number; label: string }
      illustration: Img
      tagline: { text: string; color: string }[]
      subtitle: string
      text: string
    }
  /**
   * A looping presentation video (e.g. an original Behance GIF, upscaled) with coded text:
   * an eyebrow label, a large faint display word and a paragraph, on an optional dark container.
   */
  | {
      type: "showcase"
      title: string
      eyebrow?: string
      display?: string
      /** Container colour; should match the video's own background so the edges disappear */
      background?: string
      text: string[]
      video: { src: string; poster: string; width: number; height: number; label: string }
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
  /** Overrides the purple accent on this page: fill, text shade (readable on cream) and soft tint */
  accent?: { purple: string; purpleInk: string; purpleSoft: string; onPurple: string }
  impact: Metric[]
  /** Heading above the metric cards (defaults to "Impact overview") */
  impactTitle?: string
  sections: Section[]
  /** Other projects from the same company, shown at the end of the page */
  moreWork?: { heading: string; items: WorkCard[] }
}
