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
  },
}

export const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
]

export const stats = [
  { value: "9+", label: "Years in design" },
  { value: "0→75%", label: "R&D platform adoption" },
  { value: "40%", label: "Faster status lookups" },
  { value: "4+", label: "Healthcare apps shipped" },
]

export const quickLinks = [
  {
    icon: "layout",
    title: "Recent work",
    text: "How I turn messy enterprise problems into shipped, measurable experiences.",
    cta: "Read case studies",
    href: "#work",
  },
  {
    icon: "search",
    title: "Research first",
    text: "Interviews, usability tests and A/B experiments are how every design decision starts.",
    cta: "See my process",
    href: "#skills",
  },
  {
    icon: "sparkles",
    title: "Design systems",
    text: "Component libraries and role-based systems that help teams ship faster and stay consistent.",
    cta: "Where I've worked",
    href: "#experience",
  },
] as const

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
  cover: string // CSS background until real images are added
  locked?: boolean
}

export const caseStudies: CaseStudy[] = [
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
  {
    slug: "healthcare-apps",
    year: "2023",
    title: "Enterprise Healthcare Apps",
    summary: "Research-led redesign of 4+ healthcare apps, guided by 20+ interviews, personas and WCAG standards.",
    result: "↓ ~30% user errors · ↑ ~20% engagement",
    tags: ["Healthcare", "Accessibility"],
    cover: "linear-gradient(135deg,#4c6763,#a9c2b8)",
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
