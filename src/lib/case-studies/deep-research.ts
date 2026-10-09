import type { CaseStudy } from "./types"

// Source: Sathi's own case study write-up for SCINODE Deep Research (Scimplify), Oct 2026.
// Condensed at her request: short, simple wording, framed as designing a GenAI product.
// It is a 0 → 1 product with no published adoption metrics, so the overview shows scope facts
// from the write-up, not impact numbers. Do not add percentages without real research data.
// Product visuals are real: screenshots and clips taken from Sathi's Deep Research walkthrough
// video (public/case-studies/deep-research/screens and /clips). The hero places a real screenshot
// on the monitor of a lab photo she supplied. Palette hexes are sampled from those screenshots.
// Persona: Prem Kumar, a scientist at Scimplify (photo and name supplied by Sathi).

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
    src: "/case-studies/deep-research/hero-lab.jpg",
    alt: "A chemist in a lab suit at a workstation, using SCINODE Deep Research to modify a synthesis route",
    width: 2000,
    height: 1125,
  },
  // Deep Research purple (from Sathi). Light, so text uses a darker shade and fills carry dark text.
  accent: { purple: "#B79CEC", purpleInk: "#6B4CB8", purpleSoft: "#F1EBFC", onPurple: "#2B2150" },
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
          layout: "board",
          items: [
            {
              name: "Prem Kumar",
              role: "Senior Scientist, Scimplify",
              photo: {
                src: "/case-studies/deep-research/persona-prem-face.jpg",
                alt: "Prem Kumar, a scientist at Scimplify, in a lab coat and safety glasses, examining a flask",
                width: 400,
                height: 400,
              },
              facts: [
                { label: "Experience", value: "16–20 years" },
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
      id: "ideation",
      nav: "Ideation",
      title: "Sketched before it was prompted",
      blocks: [
        {
          type: "p",
          text: "Before any screen or prompt, I worked the product out on paper: how routes branch, what a route card needs, where the agent shows progress, and how an edit becomes a new route. Stakeholder feedback went into the same notebook and was ticked off one by one.",
        },
        {
          type: "pegboard",
          title: "From my notebook",
          items: [
            { src: "/case-studies/deep-research/sketches/idea-39.jpg", width: 1100, height: 1795, alt: "Notebook sketch: Mapping the route system: one compound, routes A–E, and the edit loop", caption: "Route system map" },
            { src: "/case-studies/deep-research/sketches/idea-47.jpg", width: 1085, height: 1549, alt: "Notebook sketch: End-to-end flow: sign up → research → pick a route → step tools", caption: "Core flow" },
            { src: "/case-studies/deep-research/sketches/idea-40.jpg", width: 1100, height: 1679, alt: "Notebook sketch: The route card: actions for step, graph, path and stoichiometry", caption: "Route card" },
            { src: "/case-studies/deep-research/sketches/idea-43.jpg", width: 1100, height: 1633, alt: "Notebook sketch: Generating routes: compound header and a buckyball loader", caption: "Loading screen" },
            { src: "/case-studies/deep-research/sketches/idea-42.jpg", width: 1100, height: 1300, alt: "Notebook sketch: Edit a value, then save, or save as a new route", caption: "Create a variant" },
            { src: "/case-studies/deep-research/sketches/idea-44.jpg", width: 1100, height: 1616, alt: "Notebook sketch: Route tabs: a thin scroll slider, expand and split view", caption: "Workspace controls" },
            { src: "/case-studies/deep-research/sketches/idea-41.jpg", width: 1100, height: 1967, alt: "Notebook sketch: Route A splits into graph and step; first icon doodles", caption: "Route structure" },
            { src: "/case-studies/deep-research/sketches/idea-45.jpg", width: 1048, height: 1527, alt: "Notebook sketch: Stakeholder feedback, worked through and ticked off", caption: "Feedback round" },
          ],
        },
      ],
    },
    {
      id: "visual-design",
      nav: "Typography & colour",
      title: "Typography and colour",
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
            { label: "CAS", value: "16409-43-1" },
            { label: "Molecular weight", value: "154.1358 g/mol" },
            { label: "SMILES", value: "CC(C)=CC1CC(C)CCO1" },
          ],
        },
        {
          type: "palette",
          intro: "A warm, light base keeps the science readable. Deep green carries primary actions and the conversation; purple marks the tools, modes and steps you edit.",
          items: [
            { name: "Deep green", hex: "#1F392D", use: "Primary actions, chat and selected route", featured: true },
            { name: "Ink", hex: "#171717", use: "Headings and scientific content", featured: true },
            { name: "Purple", hex: "#4A307D", use: "Active modes and toggles", featured: true },
            { name: "Lavender", hex: "#B79CEC", use: "Quick actions, step badges and tools", featured: true },
            { name: "Warm white", hex: "#FCFAF6", use: "Workspace background" },
            { name: "Lavender tint", hex: "#EFEDFB", use: "Tool chips" },
            { name: "Border", hex: "#E6E6E6", use: "Cards and dividers" },
            { name: "Secondary text", hex: "#6B6B6B", use: "Labels and metadata" },
          ],
        },
      ],
    },
    {
      id: "design",
      nav: "Key decisions",
      title: "Seven design decisions that shaped the product",
      blocks: [
        { type: "h3", text: "1. Conversation first, workspace when needed" },
        {
          type: "p",
          text: "I designed a conversational, natural-language entry point: one question starts the research. The full workspace, with research on one side and the AI chat on the other, opens only when the task needs it.",
        },
        {
          type: "kioskStage",
          title: "Deep Research",
          notes: [
            {
              title: "Home screen",
              items: [
                "Recent searches reopen in one click",
                "My Repository and History sit in the top bar",
                "A usage meter tracks molecules used",
                "Link a live project so findings flow into project stages and reports",
              ],
            },
            {
              title: "Ask in your own words",
              items: [
                "Describe a molecule, material, sequence or question in natural language",
                "Or start from a quick action: Generate Routes, Literature, Patents & Prior Art, Molecule Builder",
              ],
            },
          ],
          image: {
            src: "/case-studies/deep-research/screens/home-light.jpg",
            alt: "Deep Research home screen: Turn your next scientific question into a breakthrough, with a research session box and quick actions",
            width: 1728,
            height: 1080,
          },
        },
        {
          type: "media",
          heading: "2. The agent gets to work",
          intro: "When research starts, the AI agent first confirms what it is working on, so it never builds routes for the wrong compound.",
          note: {
            title: "The agent",
            color: "lavender",
            side: "right",
            items: [
              "Resolves the molecule: name, CAS, molecular weight, InChIKey and SMILES",
              "Confirms the structure before any route is generated",
              "Progress stays visible while routes are built",
            ],
          },
          items: [
            {
              kind: "image",
              src: "/case-studies/deep-research/screens/resolving.jpg",
              width: 2258,
              height: 1080,
              alt: "The agent resolving the target molecule: name, CAS, molecular weight and SMILES at the top, a buckyball loader and the message We're locking in the target",
              caption: "The agent locks in the target before generating routes.",
            },
          ],
        },
        {
          type: "media",
          heading: "3. Every route, ranked and diagrammed",
          intro: "The AI generates several synthesis routes and ranks them, so researchers can compare options at a glance instead of reading pages of output.",
          note: {
            title: "Routes",
            color: "mint",
            side: "right",
            items: [
              "Compare routes on steps, yield and score",
              "The best route is flagged, with its rationale in plain language",
              "A full reaction diagram for each route, details one click away",
            ],
          },
          items: [
            {
              kind: "image",
              src: "/case-studies/deep-research/screens/routes-ranked.jpg",
              width: 2258,
              height: 1080,
              alt: "Routes A to E ranked by steps, yield and score; Route A is flagged Best with its rationale and a reaction diagram from start material to target",
              caption: "Routes ranked side by side, the best one flagged.",
            },
          ],
        },
        {
          type: "media",
          heading: "4. Edit the route, not just read it",
          intro: "AI output is a starting point, not a final answer. Researchers stay in control and can reshape any route themselves.",
          note: {
            title: "Modify the path",
            color: "peach",
            side: "right",
            items: [
              "Switch between Scheme and Form views",
              "Click any step to change reagents, solvents and conditions",
              "Add a compound or a reaction, or open full screen",
              "Want a different approach? Ask the agent for another one",
            ],
          },
          items: [
            { kind: "video", src: "/case-studies/deep-research/clips/modify.mp4", poster: "/case-studies/deep-research/clips/modify-poster-v2.jpg", width: 1600, height: 766, alt: "Modify Path: switching from scheme view to form view, changing the mode to continuous, adding a solvent and reviewing the changes", caption: "Edit any step, then review the changes." },
          ],
        },
        {
          type: "media",
          heading: "5. From mmol to batch quantities",
          intro: "Researchers see what a route needs in practice, without manual stoichiometry in a spreadsheet.",
          note: {
            title: "Scale it",
            color: "sky",
            side: "right",
            items: [
              "Set a target quantity and amounts are calculated per step",
              "Equivalents are editable for each reagent",
              "Molecular weight, mmol and mass for every compound, with the limiting reagent shown",
            ],
          },
          items: [
            { kind: "video", src: "/case-studies/deep-research/clips/scale.mp4", poster: "/case-studies/deep-research/clips/scale-poster-v2.jpg", width: 1600, height: 766, alt: "Stoichiometry: changing equivalents updates mmol and quantities for every compound in the step", caption: "Change an equivalent and every quantity updates." },
          ],
        },
        {
          type: "media",
          heading: "6. Every route traced to its evidence",
          intro: "Trust in AI output comes from provenance. Every route links back to the literature and patents behind it.",
          note: {
            title: "Sources",
            color: "pink",
            side: "right",
            items: [
              "All literature and sources in one panel",
              "Title, year, publisher and an abstract for each reference",
              "Save any reference to your vault",
            ],
          },
          items: [
            { kind: "image", src: "/case-studies/deep-research/screens/sources-v2.jpg", width: 2258, height: 1080, alt: "Route A sources drawer listing the literature cited for each step, with DOIs", caption: "Sources for every route." },
          ],
        },
        { type: "h3", text: "7. A research partner that gets better as you work", spaced: true },
        {
          type: "lead",
          text: "Published chemistry captures what succeeded.",
          emphasis: "Your bench captures what actually happened.",
        },
        {
          type: "cycle",
          items: [
            { title: "Your results, kept", text: "Every run, including the ones that did not work.", icon: "database" },
            { title: "Nothing is wasted", text: "Failed conditions are evidence, not noise.", icon: "recycle" },
            { title: "The plan improves", text: "Each result changes what Scinode proposes next.", icon: "trend" },
            { title: "Every cycle starts ahead", text: "Each investigation begins where the last one ended.", icon: "forward" },
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
    {
      id: "launch",
      nav: "Launch week",
      title: "The first week live",
      blocks: [
        {
          type: "p",
          text: "Real adoption from the first week after launch (30 Sep – 6 Oct 2026), from the product's usage dashboard.",
        },
        {
          type: "stats",
          items: [
            { value: "18", label: "active users in the first week" },
            { value: "29", label: "research threads started" },
            { value: "13", label: "users researched a molecule" },
          ],
        },
        {
          type: "markedImage",
          image: {
            src: "/case-studies/deep-research/launch-dash-marked.jpg",
            alt: "Usage dashboard for 30 Sep to 6 Oct 2026, mostly blurred, with hand-drawn circles and notes on 18 active users, 29 threads and 13 users who researched a molecule",
            width: 2625,
            height: 1707,
          },
          caption: "From the usage dashboard. Cost, usage and user details are blurred.",
          marks: [
            { circle: { cx: 100, cy: 240, rx: 80, ry: 58 }, text: "18 users\nin week one!", textAt: [470, 190], note: { x: 455, y: 215 }, arrowTo: [195, 232], bend: -0.25, tilt: -5 },
            { circle: { cx: 1405, cy: 240, rx: 78, ry: 58 }, text: "29 research\nthreads", textAt: [1760, 190], note: { x: 1745, y: 215 }, arrowTo: [1495, 232], bend: -0.25, tilt: -3 },
            { circle: { cx: 288, cy: 735, rx: 92, ry: 190 }, text: "13 users\nresearched\na molecule", textAt: [520, 680], note: { x: 505, y: 760 }, arrowTo: [395, 760], bend: 0.2, tilt: -4, size: 60 },
          ],
        },
      ],
    },
  ],
}
