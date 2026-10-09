// All site copy lives here so content can be edited without touching components.

export const profile = {
  name: "Sathi Midya",
  firstName: "Sathi",
  role: "Product Designer",
  location: "Bangalore",
  email: "virgosathi71@gmail.com",
  photo: "/sathi.jpg",
  resume: "/Sathi_Midya_Resume.pdf",
  status: "Open to Product Design roles · Bangalore",
  links: {
    linkedin: "https://linkedin.com/in/sathimidya",
    behance: "https://behance.net/virgosathi0041",
    github: "https://github.com/SathiMidya71",
    instagram: "", // add the Instagram profile URL to show it on the site
  },
  /** Shown on hover over the Instagram sticker in the journal, e.g. "@sathi.designs" */
  instagramHandle: "",
}

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
]

// Fanned cards under the hero intro. The "video" card shows `heroVideo` once it exists.
export const heroVideo = "" // e.g. "/intro.mp4" (place the file in /public)

export type HeroCard =
  | { kind: "video" }
  | {
      kind: "card"
      title: string
      text: string
      cta: string
      href: string
      color: string
      external?: boolean
    }

export const heroCards: HeroCard[] = [
  {
    kind: "card",
    title: "Recent work",
    text: "See how I turn complex enterprise workflows into products people adopt.",
    cta: "Read Case Studies",
    href: "#work",
    color: "#ffd6ae",
  },
  { kind: "video" },
  {
    kind: "card",
    title: "Visual explorations",
    text: "UI concepts, dashboards and visual design experiments I share on Behance.",
    cta: "View My Behance",
    href: "https://behance.net/virgosathi0041",
    color: "#d9d6fe",
    external: true,
  },
  {
    kind: "card",
    title: "How I work",
    text: "Research first: interviews, usability tests and A/B experiments behind every decision.",
    cta: "See My Process",
    href: "#skills",
    color: "#b2ddff",
  },
]

// "About me" journal, below the case studies
export const journal = {
  experienceYears: "9+ years", // from the résumé: 9+ years total experience
  today: "Designing GenAI tools for chemists at Scimplify, and building them in code with Claude Code.",
}

export const about = {
  eyebrow: "A bit about me",
  headline: ["Research is how I listen.", "Design is how I answer."],
  body: "I started out designing fashion accessories in Bangalore and Milan, where I learned to sketch, prototype and obsess over details. Today I bring that same maker's mindset to digital products. I work side by side with PMs and engineers so that every screen is grounded in real user insight and tied to a business outcome.",
}

export type CaseStudy = {
  slug: string
  year: string
  title: string
  summary: string
  result: string
  tags: string[]
  cover: string // CSS background, shown behind the image (or alone until one is added)
  image?: { src: string; alt: string }
  /** Link to the full case study page */
  href?: string
  /** Company logo shown instead of the year label; links to the company's website */
  logo?: { src: string; alt: string; width: number; height: number; href: string }
  locked?: boolean
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "biwaze-vent",
    year: "ABM Respiratory Care",
    title: "BiWaze Vent Ventilator UI",
    summary: "A touchscreen interface for a life-support ventilator, designed so clinicians can read critical values and act fast.",
    result: "↓ ~30% user errors · ↓ ~25% dev time · 70+ screens",
    tags: ["Healthcare", "Medical device"],
    cover: "#000229",
    image: { src: "/case-studies/biwaze-vent/cover.jpg", alt: "BiWaze Vent: A Mechanical Ventilator, UI/UX case study cover" },
    href: "/work/biwaze-vent",
    logo: {
      src: "/logos/abm.png",
      alt: "ABM Respiratory Care",
      width: 200,
      height: 106,
      href: "https://abmrc.com/",
    },
  },
  {
    slug: "arc-connect-app",
    year: "ABM Respiratory Care",
    title: "Arc Connect Lung Health App",
    summary: "A mobile app that connects patients, caregivers and clinicians around lung therapy, with friendly illustration and motion.",
    result: "35 screens · 4 core areas · illustration & motion",
    tags: ["Healthcare", "Mobile app"],
    cover: "#eef6f2",
    image: { src: "/case-studies/arc-connect-app/hero.jpg", alt: "Arc Connect app screens" },
    href: "/work/arc-connect-app",
    logo: {
      src: "/logos/abm.png",
      alt: "ABM Respiratory Care",
      width: 200,
      height: 106,
      href: "https://abmrc.com/",
    },
  },
  {
    slug: "deep-research",
    year: "Scimplify",
    title: "SCINODE Deep Research",
    summary: "Designing a GenAI product: a research workspace that takes chemists from a question to an evidence-backed decision.",
    result: "New GenAI product, concept to launch · end-to-end UX · design to code",
    tags: ["GenAI", "AI UX", "Product launch"],
    cover: "linear-gradient(140deg,#eeecfd,#e3e8fb)",
    image: { src: "/case-studies/deep-research/hero-lab.jpg", alt: "A chemist in a lab using SCINODE Deep Research on a desktop monitor" },
    href: "/work/deep-research",
  },
  {
    slug: "rnd-visibility-dashboard",
    year: "2025",
    title: "R&D Visibility Dashboard",
    summary: "A role-based dashboard that gives research, sourcing and ops teams a single view of project status.",
    result: "↑ Adoption 0% → 75% · 40% faster lookups",
    tags: ["B2B SaaS", "Dashboard"],
    cover: "linear-gradient(135deg,#02594e,#3f8f7f)",
  },
  {
    slug: "cro-onboarding",
    year: "2025",
    title: "CRO Onboarding & Design System",
    summary: "An onboarding module and component library that made partner profile setup faster and more consistent.",
    result: "↓ Setup time for 60% of users",
    tags: ["Onboarding", "Design System"],
    cover: "linear-gradient(135deg,#2f6f63,#9cc4b5)",
  },
  {
    slug: "multi-step-forms",
    year: "2024",
    title: "Smarter Multi-step Forms",
    summary: "Redesigned friction-heavy forms using usability tests and A/B experiments on mandatory fields.",
    result: "↑ 30% completion · data completeness 30% → 65%",
    tags: ["Forms", "A/B Testing"],
    cover: "linear-gradient(135deg,#344054,#02594e)",
    locked: true,
  },
]

export const experience = [
  { when: "2024 to now", company: "Scimplify", role: "Product Designer · User Research & Product Design", tag: "B2B SaaS" },
  { when: "2021 to 2024", company: "ABM Respiratory Care", role: "UI/UX Designer · User Research & Product Design", tag: "Healthcare" },
  { when: "2019 to 2021", company: "Pinnium Brands", role: "UI, Graphic & Accessories Designer", tag: "E-commerce" },
  { when: "2016 to 2019", company: "Sai Lakshmi Industries", role: "Fashion & Accessories Designer", tag: "Product Design" },
]

export const skills = [
  {
    title: "Product design",
    items: ["End-to-end UX", "Interaction design", "Information architecture", "Prototyping", "Design systems", "Responsive design", "WCAG 2.1"],
  },
  {
    title: "User research",
    items: ["User interviews", "Usability testing", "A/B testing", "Surveys", "Personas", "Journey maps", "Research synthesis"],
  },
  {
    title: "Tools",
    items: ["Figma", "FigJam", "Miro", "Maze", "Hotjar", "Google Analytics", "Adobe XD", "Illustrator"],
  },
]

// Placeholders: replace with real quotes.
export const testimonials = [
  { quote: "Testimonial placeholder. Add a quote from a manager or PM about your research and design impact.", name: "Name Surname", title: "Product Manager, Company", initials: "AB" },
  { quote: "Testimonial placeholder. A quote from an engineer about handoff, specs and collaboration works well here.", name: "Name Surname", title: "Engineering Lead, Company", initials: "CD" },
  { quote: "Testimonial placeholder. A quote from a stakeholder about outcomes and how you present your work.", name: "Name Surname", title: "Head of Operations, Company", initials: "EF" },
]
