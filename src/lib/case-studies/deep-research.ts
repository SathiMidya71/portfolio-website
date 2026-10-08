import type { CaseStudy } from "./types"

// Source: Sathi's own case study write-up for SCINODE Deep Research (Scimplify), Oct 2026.
// Condensed at her request: short, simple wording, framed as designing a GenAI product.
// It is a 0 → 1 product with no published adoption metrics, so the overview shows scope facts
// from the write-up, not impact numbers. Do not add percentages without real research data.
// Visuals are coded (components/case-study/deep-research). Real product screens can replace any
// wireframe by adding `image` to its productMock block.
// Persona (Dr. Maya Rao) is the design persona from the write-up, not a real person.

export const deepResearch: CaseStudy = {
  slug: "deep-research",
  company: "Scimplify",
  eyebrow: "Scimplify · Designing a GenAI product",
  title: ["SCINODE Deep Research", "a GenAI workspace for chemists"],
  seo: {
    title: "Designing a GenAI Product: SCINODE Deep Research | AI UX Case Study | Sathi Midya",
    description:
      "AI UX case study: how I designed SCINODE Deep Research, a GenAI research workspace for chemists, from 0 → 1. End-to-end product design, UX research, user flows, interaction design and design to code with Claude Code.",
  },
  meta: {
    overview:
      "A GenAI research workspace that takes chemists from a scientific question to a clear, evidence-backed decision, with literature, patents, molecules and synthesis routes in one place.",
    role: "Senior Product Designer, end to end: product definition, UX research, user flows, interaction and visual design, prototyping, and building in code with Claude Code.",
    team: [
      { initials: "Me", label: "Design" },
      { initials: "PM", label: "Product" },
      { initials: "ENG", label: "Engineering" },
      { initials: "RES", label: "Research" },
    ],
    timeline: "0 → 1 · from idea to production",
  },
  hero: {
    // Static render of the coded hero, used for thumbnails and link previews
    src: "/case-studies/deep-research/cover.png",
    alt: "SCINODE Deep Research workspace: route cards on the left with the AI conversation open on the right",
    width: 1600,
    height: 1000,
  },
  heroVisual: "deep-research",
  impactTitle: "Project at a glance",
  impact: [
    {
      label: "Product stage",
      value: "0 → 1",
      change: "new product",
      note: "built from scratch",
      pointer: "Defined how the product works, not just how it looks.",
      tone: "purple",
      visual: { kind: "line", shape: "rising" },
    },
    {
      label: "Research journey",
      value: "8",
      change: "steps",
      note: "one workspace",
      pointer: "From the first question to a saved, evidence-backed decision.",
      tone: "green",
      visual: { kind: "bar", fill: 100 },
    },
    {
      label: "Core screens",
      value: "9",
      change: "designed",
      note: "home → vault",
      pointer: "Each screen built around one clear decision.",
      tone: "blue",
      visual: { kind: "bar", fill: 100 },
    },
    {
      label: "Ownership",
      value: "UX → code",
      note: "with Claude Code",
      pointer: "Shipped my designs straight into the production codebase.",
      tone: "orange",
      visual: { kind: "line", shape: "rising" },
    },
  ],
  sections: [
    {
      id: "overview",
      nav: "Overview",
      title: "Designing a GenAI product from 0 → 1",
      blocks: [
        {
          type: "lead",
          text: "Chemists don't need another search box. They need help turning a question into a decision they can trust. I designed Deep Research to do exactly that.",
        },
        { type: "flow", items: ["Ask", "Explore", "Compare", "Modify", "Scale", "Verify"] },
        {
          type: "list",
          items: [
            "Owned the product experience end to end, from a blank page to production",
            "Turned an open-ended AI idea into a clear, structured workflow",
            "Designed how humans and AI work together, with researchers always in control",
            "Built the interface in code with Claude Code, alongside engineering",
          ],
        },
      ],
    },
    {
      id: "problem",
      nav: "Problem",
      title: "Problem and solution",
      blocks: [
        {
          type: "problemSolution",
          problem: {
            text: "The information exists. Turning it into a clear research path is the hard part.",
            items: [
              { big: "Fragmented", text: "Research is spread across literature, patents, molecule tools, spreadsheets and notes." },
              { big: "Lost context", text: "Findings drift away from the question that started them." },
              { big: "No continuity", text: "Good work from one session doesn't carry into the next." },
            ],
          },
          solution: {
            text: "One GenAI workspace that connects literature, patents, molecules, synthesis routes and evidence into a single flow.",
            chips: ["GenAI workspace", "Literature", "Patents", "Synthesis routes", "Evidence", "Research Vault"],
          },
        },
        {
          type: "principle",
          label: "The opportunity",
          text: "What if research felt like one continuous investigation, not a pile of searches?",
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "What we learned about researchers",
      blocks: [
        {
          type: "p",
          text: "As a 0 → 1 product, there was no interface to test yet. I studied how research really happens.",
        },
        { type: "chips", items: ["Stakeholder interviews", "Workflow mapping", "Competitive analysis", "Prototype reviews"] },
        {
          type: "insights",
          items: [
            {
              title: "Research is a journey, not a search",
              text: "Questions change as researchers learn, so the product has to keep the context.",
              trail: [
                "How can I synthesize this molecule?",
                "What routes exist?",
                "Which route is more practical?",
                "Can I modify this step?",
                "What evidence supports this route?",
              ],
            },
            {
              title: "Depth varies",
              text: "Some questions need a quick answer. Others need routes, papers, patents and maths.",
              chips: ["Quick answers", "Deep dives"],
            },
            {
              title: "Trust needs evidence",
              text: "If AI suggests a route, researchers need to see why, and where it came from.",
              chips: ["Why?", "Source?"],
            },
            {
              title: "Work should carry on",
              text: "Findings and sources should be easy to pick up again later.",
              chips: ["History", "Saved research"],
            },
          ],
        },
        {
          type: "personas",
          items: [
            {
              name: "Dr. Maya Rao",
              role: "Senior Research Scientist",
              facts: [
                { label: "Experience", value: "7–12 years" },
                { label: "AI confidence", value: "Medium–High" },
              ],
              about: "Comfortable with scientific tools, but tired of jumping between them for every investigation.",
              goals: ["Find reliable answers fast", "Compare synthesis routes", "Check what the AI suggests", "Keep evidence with decisions"],
              frustrations: ["Too many tools", "Too much irrelevant literature", "Manual calculations", "Losing context between sessions"],
              needs: ["Confidence", "Control", "Context", "Continuity"],
              quote: "Don't just give me an answer. Help me understand why this is the right direction.",
            },
          ],
        },
      ],
    },
    {
      id: "journey",
      nav: "Journey & flow",
      title: "From question to decision",
      blocks: [
        { type: "diagram", name: "dr-journey-map" },
        {
          type: "journey",
          stages: [
            { stage: "Ask", goal: "Start research", action: "Type a question", response: "AI reads the intent", pain: "Question may be vague" },
            { stage: "Resolve", goal: "Confirm subject", action: "Check the molecule", response: "Confirms the compound", pain: "Wrong compound" },
            { stage: "Explore", goal: "Find options", action: "Generate routes", response: "AI explores routes", pain: "Too many options" },
            { stage: "Compare", goal: "Pick a direction", action: "Compare routes", response: "Scores + evidence", pain: "Hard to judge" },
            { stage: "Modify", goal: "Refine", action: "Edit reagents", response: "Editable route", pain: "AI misses constraints" },
            { stage: "Scale", goal: "Make it practical", action: "Set a quantity", response: "Auto calculations", pain: "Manual maths" },
            { stage: "Verify", goal: "Build trust", action: "Open sources", response: "Linked evidence", pain: "Unclear sources" },
            { stage: "Continue", goal: "Keep the work", action: "Save research", response: "History + Vault", pain: "Work gets lost" },
          ],
        },
      ],
    },
    {
      id: "design",
      nav: "Key decisions",
      title: "Four design decisions that shaped the product",
      blocks: [
        { type: "h3", text: "1. Conversation first, workspace when needed" },
        {
          type: "p",
          text: "It starts with one simple question. When the task needs more, like comparing routes, the screen opens into a workspace: 70% research, 30% AI chat.",
        },
        { type: "productMock", view: "workspace", caption: "The AI chat stays open beside the research." },
        { type: "h3", text: "2. Confirm before the AI generates" },
        {
          type: "p",
          text: "The product shows the molecule (name, CAS, structure, identifiers) before generating anything, so the AI never works on the wrong compound.",
        },
        { type: "productMock", view: "molecule", caption: "Molecule check for the aspirin example." },
        { type: "h3", text: "3. Show the reasoning, keep humans in control" },
        {
          type: "p",
          text: "Routes are easy to compare, and the recommended one explains why. Researchers can then edit any step, or ask the AI for another approach.",
        },
        { type: "productMock", view: "routes", caption: "Compare routes side by side." },
        { type: "productMock", view: "modify", caption: "Edit any step visually or in a form." },
        { type: "h3", text: "4. Evidence and memory built in" },
        {
          type: "p",
          text: "Every route links to its literature and patents. Useful sources and findings are saved to the Research Vault, so the next investigation starts ahead.",
        },
        { type: "productMock", view: "sources", caption: "Sources linked to the step they support." },
        { type: "productMock", view: "vault", caption: "Research Vault and History." },
      ],
    },
    {
      id: "visual-design",
      nav: "Visual design",
      title: "Calm, precise, AI-native",
      blocks: [
        {
          type: "p",
          text: "Dense scientific data, without visual noise: a clear type scale in Inter, and colour used only when it means something.",
        },
        {
          type: "typeHierarchy",
          font: "Inter",
          levels: [
            { name: "Display", size: "48–56px", weight: "Bold / Semibold", use: "Product statements" },
            { name: "H1", size: "32–40px", weight: "Semibold", use: "Workspace headings" },
            { name: "H2", size: "24–28px", weight: "Semibold", use: "Sections" },
            { name: "H3", size: "18–20px", weight: "Semibold", use: "Cards" },
            { name: "Body", size: "14–16px", weight: "Regular", use: "Research content" },
            { name: "Metadata", size: "12–13px", weight: "Regular / Medium", use: "CAS, sources, timestamps" },
          ],
          samples: [
            { label: "CAS", value: "50-78-2" },
            { label: "InChIKey", value: "BSYNRYMUTXBXSQ-UHFFFAOYSA-N" },
            { label: "SMILES", value: "CC(=O)OC1=CC=CC=C1C(=O)O" },
          ],
        },
        {
          type: "palette",
          intro: "A light, neutral base keeps the science readable. Purple marks actions and AI; green is saved for success.",
          items: [
            { name: "Primary background", hex: "#FFFFFF", use: "Workspace surfaces" },
            { name: "Secondary background", hex: "#F7F7F8", use: "Panels and inputs" },
            { name: "Primary text", hex: "#171717", use: "Headings and content" },
            { name: "Secondary text", hex: "#6B6B6B", use: "Labels and metadata" },
            { name: "Border", hex: "#E6E6E6", use: "Cards and dividers" },
            { name: "Primary accent", tone: "purple", use: "Actions, selections and AI" },
            { name: "Success", tone: "green", use: "Completed states" },
          ],
        },
      ],
    },
    {
      id: "outcome",
      nav: "Outcome",
      title: "What the product delivers",
      blocks: [
        {
          type: "cards",
          items: [
            { title: "One connected workflow", text: "Question, molecule, routes, edits, scale and evidence in one place." },
            { title: "Trust built in", text: "Every recommendation can be traced back to its sources." },
            { title: "Human + AI", text: "AI speeds research up; researchers make the decisions." },
            { title: "Design → code", text: "I built the interface in the production codebase, not just in Figma." },
          ],
        },
        { type: "shift", label: "What changed", from: "“What can I find?”", to: "“What should I investigate next?”" },
      ],
    },
    {
      id: "learnings",
      nav: "Learnings",
      title: "What I learned",
      blocks: [
        {
          type: "cards",
          items: [
            { title: "0 → 1 is product definition", text: "With no pattern to follow, I was designing the system, not just screens." },
            { title: "Good AI has clear limits", text: "People need to see what the AI is doing, question it and take over." },
            { title: "Structure beats simplifying", text: "Scientific data can't always be cut, but it can be layered: summary → detail → evidence." },
            { title: "Building changes the design", text: "Working in code revealed details no prototype showed." },
          ],
        },
        {
          type: "principle",
          label: "Closing",
          text: "Every result is context. Every failed condition is evidence. Every investigation should start ahead of the last.",
        },
      ],
    },
  ],
}
