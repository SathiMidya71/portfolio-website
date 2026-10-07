import type { CaseStudy } from "./types"

// Source: Sathi's own case study write-up for SCINODE Deep Research (Scimplify), Oct 2026.
// Copy follows that write-up. It is a 0 → 1 product with no published adoption metrics, so the
// overview shows scope facts taken from the write-up, not impact numbers.
// Visuals are coded wireframes (components/case-study/deep-research). Real product screens can
// replace any wireframe by adding `image` to its productMock block.
// Persona (Dr. Maya Rao) is the design persona from the write-up, not a real person.

export const deepResearch: CaseStudy = {
  slug: "deep-research",
  company: "Scimplify",
  eyebrow: "Scimplify · AI research workspace",
  title: ["SCINODE Deep Research", "from question to clear direction"],
  seo: {
    title: "SCINODE Deep Research | AI Research Workspace Case Study | Sathi Midya",
    description:
      "How I designed SCINODE Deep Research from 0 → 1: an AI research workspace that takes chemists from a scientific question to an evidence-backed research decision, from product definition and UX to production code.",
  },
  meta: {
    overview:
      "SCINODE Deep Research is an AI research workspace for chemists that brings scientific literature, patents, molecules, synthesis routes and evidence into one connected workflow.",
    role: "Senior Product Designer: product experience, research workflow, information architecture, interaction and visual design, prototyping, and building in the production codebase with Claude Code.",
    team: [
      { initials: "Me", label: "Design" },
      { initials: "PM", label: "Product" },
      { initials: "ENG", label: "Engineering" },
      { initials: "RES", label: "Research" },
    ],
    timeline: "0 → 1 product development · definition to production",
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
      change: "from scratch",
      note: "no existing model",
      pointer: "Defined the Deep Research workflow and interaction model where none existed.",
      tone: "purple",
      visual: { kind: "line", shape: "rising" },
    },
    {
      label: "Research journey",
      value: "8",
      change: "stages",
      note: "ask → continue",
      pointer: "Ask, resolve, explore, compare, modify, scale, verify and continue in one workspace.",
      tone: "green",
      visual: { kind: "bar", fill: 100 },
    },
    {
      label: "Core screens",
      value: "9",
      change: "specified",
      note: "home → vault",
      pointer: "Each screen designed around one clear research decision.",
      tone: "blue",
      visual: { kind: "bar", fill: 100 },
    },
    {
      label: "Ownership",
      value: "UX → code",
      note: "built with Claude Code",
      pointer: "Took the work beyond prototypes into the production codebase.",
      tone: "orange",
      visual: { kind: "line", shape: "rising" },
    },
  ],
  sections: [
    {
      id: "overview",
      nav: "Overview",
      title: "Making the shortest path from a scientific question to a research decision",
      blocks: [
        {
          type: "lead",
          text: "I worked on Deep Research from the ground up: from defining the product experience and research workflow to designing the UX and translating it into the production codebase.",
        },
        {
          type: "principle",
          label: "The goal",
          text: "Make the shortest path from a scientific question to an actionable, evidence-backed research decision.",
        },
        {
          type: "p",
          text: "Scientific research rarely starts with a perfectly defined task. A researcher might begin with a molecule, a material, a synthesis problem or simply a question. Finding the answer can mean moving between literature databases, patents, molecular tools, spreadsheets, calculations and internal notes.",
        },
        {
          type: "p",
          text: "The information exists. The problem is turning it into a coherent research path. Deep Research connects these fragmented activities into one continuous experience, so research becomes a connected journey instead of a series of searches:",
        },
        { type: "flow", items: ["Ask", "Explore", "Evaluate", "Modify", "Scale", "Verify"] },
        { type: "h3", text: "My role" },
        {
          type: "p",
          text: "As Senior Product Designer, I owned the product experience across strategy, UX, interaction design and implementation. The role went beyond interface design: I helped shape what the product needed to be.",
        },
        {
          type: "list",
          items: [
            "Defining the product experience and core research workflow",
            "Translating an ambiguous product opportunity into a structured UX",
            "Information architecture, user journeys and workflow design",
            "Route synthesis and scientific workflow design",
            "Research, sources and evidence experiences",
            "Interaction and visual design, prototyping and iteration",
            "Collaborating with Product, Engineering and Research",
            "Working directly in the production codebase using Claude Code",
          ],
        },
      ],
    },
    {
      id: "problem",
      nav: "Problem",
      title: "Researchers don't need another search box",
      blocks: [
        {
          type: "lead",
          text: "Scientific researchers already have access to enormous amounts of information. The challenge is what happens after the search.",
        },
        {
          type: "flow",
          label: "A typical research problem",
          items: ["Find information", "Validate it", "Understand the chemistry", "Compare approaches", "Modify a route", "Calculate quantities", "Trace evidence", "Make a decision"],
        },
        { type: "p", text: "These activities are spread across different tools and workflows." },
        { type: "diagram", name: "dr-fragmented" },
        { type: "h3", text: "Three problems" },
        {
          type: "cards",
          items: [
            {
              title: "Fragmented research",
              text: "Researchers move between literature databases, patent platforms, molecular tools, spreadsheets and notes.",
            },
            {
              title: "Loss of context",
              text: "As research progresses, findings, sources and decisions can become disconnected from the original question.",
            },
            {
              title: "Limited continuity",
              text: "A research session may produce useful findings, but they are not always structured for the next investigation.",
            },
          ],
        },
        {
          type: "principle",
          label: "The opportunity",
          text: "What if research could behave more like a continuous investigation than a collection of searches?",
        },
      ],
    },
    {
      id: "goal",
      nav: "Product goal",
      title: "From information retrieval to research progression",
      blocks: [
        {
          type: "p",
          text: "The goal was to make Deep Research the shortest path from a scientific question to an actionable research decision. The product needed to help researchers:",
        },
        {
          type: "list",
          items: [
            "Start with an imperfect question",
            "Understand what they are researching",
            "Generate possible directions and compare scientific approaches",
            "Modify and refine those approaches",
            "Calculate practical quantities",
            "Trace conclusions back to evidence",
            "Continue the investigation later",
          ],
        },
        {
          type: "shift",
          label: "The shift",
          from: "Searching for information",
          to: "Building evidence-backed scientific decisions",
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Understanding how scientific research actually happens",
      blocks: [
        {
          type: "p",
          text: "Because Deep Research was a 0 → 1 product, research was not limited to validating an existing interface. It focused on how researchers frame questions, where they search, how they evaluate sources and compare synthesis approaches, where they make decisions, how they verify AI-generated information and what they need to keep after a session.",
        },
        { type: "h3", text: "Research approach" },
        {
          type: "cards",
          items: [
            {
              title: "Stakeholder interviews",
              text: "With research, product and domain stakeholders: existing scientific workflows, business and product goals, expected AI capabilities, scientific constraints and important research outputs.",
            },
            {
              title: "Workflow mapping",
              text: "Mapped the journey a researcher follows when investigating a synthesis problem, which revealed repeated transitions between question, search, source, chemistry, calculation and decision.",
            },
            {
              title: "Competitive and workflow analysis",
              text: "Reviewed how scientific and AI research tools handle search, literature, patents, molecular information, synthesis routes, evidence and history: not to copy patterns, but to find the gaps between them.",
            },
            {
              title: "Iterative validation",
              text: "Early flows and prototypes were reviewed continuously with Product, Engineering and Research to validate hierarchy, route interaction, workspace behaviour, source visibility, AI patterns, terminology and progressive disclosure.",
            },
          ],
        },
        {
          type: "flow",
          label: "The pattern workflow mapping revealed",
          items: ["Question", "Search", "Source", "Chemistry", "Calculation", "Decision"],
        },
        {
          type: "principle",
          label: "Research takeaway",
          text: "Researchers don't think in isolated searches. Their questions evolve throughout the investigation.",
        },
      ],
    },
    {
      id: "insights",
      nav: "Insights",
      title: "What shaped the product",
      blocks: [
        {
          type: "insights",
          items: [
            {
              title: "Research is a journey, not a search",
              text: "A researcher's question keeps changing as they learn. The product needed to preserve context throughout the investigation.",
              trail: [
                "How can I synthesize this molecule?",
                "What routes exist?",
                "Which route is more practical?",
                "Can I modify this step?",
                "What evidence supports this route?",
              ],
            },
            {
              title: "Research depth varies by question",
              text: "A simple question may need a quick answer. A complex synthesis problem needs much more, so a single rigid interaction model would not work for both.",
              chips: ["Multiple routes", "Literature", "Patents", "Calculations", "Iterations"],
            },
            {
              title: "Evidence must stay connected to decisions",
              text: "If AI recommends a route, researchers need to understand it. Evidence became part of the workflow rather than an external step.",
              chips: ["Why this route?", "What supports it?", "Where is it from?"],
            },
            {
              title: "Research should continue beyond a session",
              text: "A good research experience shouldn't end when an answer appears. This led to the Research Vault and research continuity concepts.",
              chips: ["History", "Previous findings", "Sources", "Saved research"],
            },
          ],
        },
      ],
    },
    {
      id: "persona",
      nav: "Persona",
      title: "Designing for the research chemist",
      blocks: [
        {
          type: "personas",
          items: [
            {
              name: "Dr. Maya Rao",
              role: "Senior Research Scientist · primary persona",
              facts: [
                { label: "Experience", value: "7–12 years" },
                { label: "Primary goal", value: "Reliable, practical approaches, fast" },
                { label: "Technical confidence", value: "High" },
                { label: "AI confidence", value: "Medium–High" },
              ],
              about:
                "Maya works on molecular research and spends a lot of time investigating existing chemistry before choosing a direction. She is comfortable with scientific tools but doesn't want to move between multiple systems for every investigation.",
              goals: [
                "Find reliable scientific information quickly",
                "Compare multiple synthesis approaches",
                "Understand route feasibility",
                "Modify proposed chemistry",
                "Validate AI-generated recommendations",
                "Keep evidence attached to decisions",
                "Continue research later",
              ],
              frustrations: [
                "Information spread across multiple tools",
                "Too much irrelevant literature",
                "Difficulty comparing routes",
                "Repeated manual calculations",
                "Unclear provenance of AI-generated information",
                "Losing context between research sessions",
              ],
              needs: ["Confidence", "Control", "Context", "Continuity"],
              quote: "Don't just give me an answer. Help me understand why this is the right direction.",
            },
          ],
        },
      ],
    },
    {
      id: "journey",
      nav: "User journey",
      title: "From question to research decision",
      blocks: [
        {
          type: "journey",
          stages: [
            { stage: "Ask", goal: "Start research", action: "Enter scientific question", response: "AI interprets intent", pain: "Question may be ambiguous" },
            { stage: "Resolve", goal: "Confirm subject", action: "Review molecule / context", response: "Product confirms scientific object", pain: "Risk of researching the wrong compound" },
            { stage: "Explore", goal: "Find approaches", action: "Generate routes / research", response: "AI investigates possibilities", pain: "Too many possibilities" },
            { stage: "Compare", goal: "Choose direction", action: "Compare routes", response: "Route scoring + evidence", pain: "Difficult to evaluate options" },
            { stage: "Modify", goal: "Refine approach", action: "Change reagents / conditions", response: "Interactive route editing", pain: "AI output may not fit constraints" },
            { stage: "Scale", goal: "Test practicality", action: "Enter target quantity", response: "Calculate quantities", pain: "Manual calculations" },
            { stage: "Verify", goal: "Build confidence", action: "Inspect sources", response: "Literature / patent evidence", pain: "Provenance can be disconnected" },
            { stage: "Continue", goal: "Preserve knowledge", action: "Save research", response: "History + Vault", pain: "Research otherwise gets lost" },
          ],
        },
        { type: "principle", label: "Journey principle", text: "Every step should move the researcher closer to a decision." },
      ],
    },
    {
      id: "structure",
      nav: "IA & flows",
      title: "Structuring the research workspace",
      blocks: [
        {
          type: "p",
          text: "The information architecture follows the researcher's mental model rather than individual product features: one current investigation in focus, with persistent knowledge around it.",
        },
        {
          type: "tree",
          root: "Deep Research",
          groups: [
            {
              title: "Primary structure",
              items: ["Research Home", "Current Investigation", "Routes", "Route Details", "Modify Path", "Scale", "Sources", "Research Vault", "History"],
            },
            {
              title: "Current investigation",
              note: "Question → evidence",
              items: ["Question", "Scientific Context", "Routes", "Route Analysis", "Modify Path", "Scale", "Evidence"],
            },
            { title: "Research Vault", note: "Persistent knowledge", items: ["Saved Sources", "Saved Routes", "Research Findings"] },
            { title: "History", note: "Persistent knowledge", items: ["Previous Investigations", "Recent Research", "Continue Research"] },
          ],
        },
        {
          type: "principle",
          label: "IA principle",
          text: "Keep the current research context visible while allowing users to move deeper into individual scientific tasks.",
        },
        { type: "h3", text: "Core research flow" },
        { type: "diagram", name: "dr-user-flow" },
        {
          type: "flow",
          label: "Route-specific flow",
          items: ["Question", "Molecule resolution", "Route generation", "Route A / B / C", "Compare", "Best route", "Modify path", "Manage steps", "Stoichiometry", "Optimization", "Evidence"],
        },
      ],
    },
    {
      id: "entry",
      nav: "Entry & workspace",
      title: "The product starts with a question",
      blocks: [
        {
          type: "p",
          text: "Instead of presenting a complex dashboard immediately, the experience begins with a focused conversational entry point. Researchers describe what they want in natural language, for example “Generate retrosynthesis routes for aspirin.”, and the system turns it into a structured research task.",
        },
        {
          type: "p",
          text: "For researchers who already know their intent, quick actions go straight to Generate Routes, Literature, Patents & Prior Art and Molecule Builder. This supports both open-ended exploration and direct scientific workflows.",
        },
        { type: "productMock", view: "home", caption: "Research Home: start or continue an investigation." },
        { type: "h3", text: "Progressive complexity instead of instant complexity" },
        {
          type: "p",
          text: "Showing every research capability at once would create unnecessary cognitive load, so the workspace expands as the research becomes more complex. It starts as a focused AI conversation. Only when a request benefits from structured analysis, like a route-synthesis request, does it open into the research workspace: 70% workspace and 30% AI conversation.",
        },
        {
          type: "p",
          text: "Researchers can inspect the scientific output, ask follow-up questions and change direction while the AI context stays available.",
        },
        { type: "productMock", view: "workspace", caption: "The research workspace keeps the AI conversation open beside the output." },
        { type: "shift", label: "Key interaction decision", from: "Full-screen conversation", to: "A structured research workspace, when it's needed" },
        { type: "principle", text: "The interface should become more powerful only when the researcher needs more power." },
      ],
    },
    {
      id: "routes",
      nav: "Route synthesis",
      title: "Confirm, compare, modify, scale",
      blocks: [
        { type: "h3", text: "Resolving the molecule" },
        {
          type: "p",
          text: "Before generating a synthesis route, the product confirms the molecule being researched: compound name, CAS, molecular weight, InChIKey, SMILES and structure. This early checkpoint reduces ambiguity and builds confidence that the AI is working on the intended compound.",
        },
        { type: "productMock", view: "molecule", caption: "Molecule resolution for the aspirin example, with public reference identifiers." },
        { type: "principle", text: "Confirm the scientific object before generating scientific output." },
        { type: "h3", text: "Every route should be comparable" },
        {
          type: "p",
          text: "Researchers can review the number of steps, yield, route score, reaction sequence, rationale and supporting information for each route. The recommended route is visually prioritised while alternatives stay accessible, with enough context to understand why a route is surfaced.",
        },
        { type: "productMock", view: "routes", caption: "Routes: the recommendation is prioritised, never hidden behind." },
        { type: "principle", text: "Don't hide the reasoning behind the recommendation." },
        { type: "h3", text: "Modify Path: AI shouldn't lock researchers into its first answer" },
        {
          type: "p",
          text: "A generated route is a starting point, and researchers need control over the chemistry. Modify Path lets them change reagents, solvents and conditions, add compounds and reactions, review individual steps, or ask the AI for another approach.",
        },
        {
          type: "p",
          text: "Two modes balance high-level understanding with precise control: Scheme View shows the reaction pathway visually, and Form View edits individual reaction parameters.",
        },
        { type: "productMock", view: "modify", caption: "Modify Path: hover a step for contextual actions, or edit it precisely in the form." },
        { type: "h3", text: "Scaling the chemistry" },
        {
          type: "p",
          text: "The Scale experience translates the selected route into practical quantities at a target amount: molecular weight, mmol, mass, equivalents, the limiting reagent and quantities at each step.",
        },
        { type: "productMock", view: "scale", caption: "Scale: from molecular reasoning to practical quantities." },
        { type: "shift", from: "“Could this route work?”", to: "“What would this route look like at scale?”" },
      ],
    },
    {
      id: "evidence",
      nav: "Evidence & vault",
      title: "Every route needs evidence",
      blocks: [
        {
          type: "p",
          text: "Scientific trust depends on provenance. The Sources experience connects research output with supporting literature and patents, with title, year, publisher, abstract and references, and sources can be saved to the Research Vault.",
        },
        { type: "productMock", view: "sources", caption: "Sources stay linked to the route step they support." },
        { type: "principle", text: "Evidence shouldn't be an appendix to the research. It should be part of the research." },
        { type: "h3", text: "Research shouldn't disappear when the session ends" },
        {
          type: "p",
          text: "The Research Vault is a persistent space for useful sources, findings, routes, references and previous investigations, so researchers can pick up where they left off.",
        },
        { type: "productMock", view: "vault", caption: "Research Vault and History: knowledge that carries into the next investigation." },
        { type: "principle", label: "Product idea", text: "Every research cycle should make the next one more informed." },
      ],
    },
    {
      id: "screens",
      nav: "Screen specs",
      title: "Designing each screen around a clear user decision",
      blocks: [
        {
          type: "specs",
          items: [
            {
              name: "Research Home",
              purpose: "Start or continue an investigation.",
              elements: ["AI research input", "Suggested prompts", "Quick actions", "Recent research", "Research Vault access"],
              cta: "Start Research",
            },
            {
              name: "Molecule Resolution",
              purpose: "Confirm the scientific object.",
              elements: ["Molecular structure", "Compound name", "CAS", "Molecular weight", "SMILES", "InChIKey", "Confirm action"],
              cta: "Continue Research",
            },
            {
              name: "Research Workspace",
              purpose: "Explore the research output while keeping the AI conversation.",
              layout: "70% Research Workspace | 30% AI Conversation",
              elements: ["Research tabs", "Current investigation", "AI conversation", "Contextual actions"],
            },
            {
              name: "Routes",
              purpose: "Compare generated synthesis routes.",
              elements: ["Route cards", "Route score", "Step count", "Yield", "Route rationale", "Evidence", "Recommended indicator"],
              cta: "Analyze Route",
            },
            {
              name: "Route Analysis",
              purpose: "Understand a selected route.",
              elements: ["Reaction sequence", "Individual steps", "Conditions", "Yield", "Route summary", "Evidence", "Modify Path"],
            },
            {
              name: "Modify Path",
              purpose: "Edit the proposed chemistry.",
              elements: ["Scheme View", "Form View", "Reagents", "Solvents", "Conditions", "Add reaction", "Modify step", "AI assistance"],
            },
            {
              name: "Scale",
              purpose: "Calculate practical quantities.",
              elements: ["Target quantity", "Limiting reagent", "Molecular weight", "mmol", "Mass", "Equivalents", "Step-by-step quantities"],
            },
            {
              name: "Sources",
              purpose: "Verify research evidence.",
              elements: ["Literature", "Patents", "Source cards", "Title", "Publisher", "Year", "Abstract", "References"],
            },
            {
              name: "Research Vault",
              purpose: "Preserve useful research for future investigations.",
              elements: ["Saved research", "Saved sources", "Saved routes", "Search", "Filters", "Research history"],
            },
          ],
        },
      ],
    },
    {
      id: "visual-design",
      nav: "Visual design",
      title: "Scientific density without visual overload",
      blocks: [
        {
          type: "p",
          text: "The interface needed to communicate scientific credibility while still feeling like a modern AI product.",
        },
        { type: "chips", items: ["Scientific", "Premium", "Precise", "AI-native"] },
        { type: "h3", text: "Typography" },
        {
          type: "p",
          text: "The hierarchy separates research context, scientific information, supporting metadata and actions. Inter was chosen for its legibility, UI performance, clear numerals and strong hierarchy in dense scientific interfaces. Identifiers such as SMILES, InChIKey, CAS numbers and molecular values use consistent spacing and formatting so they are easy to scan and copy.",
        },
        {
          type: "typeHierarchy",
          font: "Inter",
          levels: [
            { name: "Display / Hero", size: "48–56px", weight: "Bold / Semibold", use: "Major product statements and landing messaging" },
            { name: "H1", size: "32–40px", weight: "Semibold", use: "Major workspace headings" },
            { name: "H2", size: "24–28px", weight: "Semibold", use: "Primary sections" },
            { name: "H3", size: "18–20px", weight: "Semibold", use: "Cards and subsections" },
            { name: "Body", size: "14–16px", weight: "Regular", use: "Research content and descriptions" },
            { name: "Metadata", size: "12–13px", weight: "Regular / Medium", use: "CAS, source information, timestamps, supporting data" },
            { name: "Button", size: "13–14px", weight: "Medium / Semibold", use: "Clear action hierarchy" },
          ],
          samples: [
            { label: "CAS", value: "50-78-2" },
            { label: "InChIKey", value: "BSYNRYMUTXBXSQ-UHFFFAOYSA-N" },
            { label: "SMILES", value: "CC(=O)OC1=CC=CC=C1C(=O)O" },
          ],
        },
        { type: "h3", text: "Colour: light, precise and research-focused" },
        {
          type: "p",
          text: "The system avoids excessive colour so scientific information stays the focus. Purple marks action and AI-related interactions; neutral surfaces keep scientific content readable.",
        },
        {
          type: "palette",
          items: [
            { name: "Primary background", hex: "#FFFFFF", use: "Workspace surfaces" },
            { name: "Secondary background", hex: "#F7F7F8", use: "Panels, rails and inputs" },
            { name: "Primary text", hex: "#171717", use: "Headings and scientific content" },
            { name: "Secondary text", hex: "#6B6B6B", use: "Metadata and labels" },
            { name: "Border", hex: "#E6E6E6", use: "Cards and dividers" },
            { name: "Primary accent", tone: "purple", use: "Primary CTAs, active states, selected routes, AI interactions, progress" },
            { name: "Success", tone: "green", use: "Completed states and positive validation, used selectively" },
          ],
        },
        { type: "principle", label: "Colour principle", text: "Colour should communicate meaning, not decorate the interface." },
        { type: "h3", text: "Interaction and component principles" },
        {
          type: "cards",
          items: [
            { title: "Buttons", text: "Clear primary and secondary hierarchy, consistent height, medium corner radius and strong hover and active states." },
            { title: "Cards", text: "Subtle borders, controlled radius, clear information hierarchy and progressive disclosure." },
            { title: "Tabs and drawers", text: "Tabs separate research contexts without new pages; drawers add detail without losing the current context." },
            { title: "Hover states and motion", text: "Hover reveals route modifications and contextual controls. Motion stays subtle and functional: workspace transitions, AI processing, route loading and state changes." },
          ],
        },
      ],
    },
    {
      id: "process",
      nav: "Process",
      title: "Complex doesn't have to mean cluttered",
      blocks: [
        {
          type: "p",
          text: "Scientific products naturally contain dense information. The solution wasn't to remove complexity, it was to structure it with progressive disclosure, so researchers go deeper only when necessary.",
        },
        { type: "flow", label: "Progressive disclosure", items: ["Summary", "Detail", "Edit", "Evidence"] },
        { type: "h3", text: "Constantly challenging the first solution" },
        {
          type: "cards",
          items: [
            { title: "Entry experience", text: "How much should users see before starting research?" },
            { title: "Workspace structure", text: "When should the interface move from conversation to workspace?" },
            { title: "Split-screen behaviour", text: "How should the research workspace and AI conversation coexist?" },
            { title: "Route interaction", text: "Should users inspect, edit or ask the AI to modify a route?" },
            { title: "Information density", text: "How can complex scientific information remain readable?" },
            { title: "Evidence and navigation", text: "Where should sources appear, and how do researchers move between current research, past investigations and saved knowledge without losing context?" },
          ],
        },
        { type: "h3", text: "From design to code" },
        {
          type: "p",
          text: "I didn't stop at the prototype. Deep Research was built from scratch, and I worked directly in the production codebase alongside Engineering, using Claude Code to translate the product and UX direction into working interfaces. Testing interaction decisions in the real product let me refine details that were hard to judge in static prototypes.",
        },
        { type: "flow", items: ["Design", "Build", "Review", "Refine"] },
        { type: "h3", text: "Building a 0 → 1 product" },
        {
          type: "p",
          text: "The biggest design challenge wasn't the interface. It was defining the product itself, because there was no established Deep Research interaction model. The work meant answering fundamental questions:",
        },
        {
          type: "list",
          items: [
            "What is the starting point, and what does research mean inside the product?",
            "When does conversation become a workspace?",
            "What should AI do automatically, and where should researchers stay in control?",
            "How should routes be compared and evidence connected?",
            "What should persist, and how do researchers continue an investigation?",
          ],
        },
      ],
    },
    {
      id: "outcome",
      nav: "Outcome",
      title: "One continuous research environment",
      blocks: [
        {
          type: "steps",
          items: [
            { title: "Ask", text: "Describe the problem naturally." },
            { title: "Resolve", text: "Establish the correct scientific context." },
            { title: "Explore", text: "Generate and investigate approaches." },
            { title: "Compare", text: "Evaluate routes and understand reasoning." },
            { title: "Modify", text: "Take control of the scientific pathway." },
            { title: "Scale", text: "Translate the route into practical quantities." },
            { title: "Verify", text: "Trace the work back to evidence." },
            { title: "Continue", text: "Save and build on the research later." },
          ],
        },
        { type: "h3", text: "Measuring a new product differently" },
        {
          type: "p",
          text: "As a 0 → 1 product, traditional adoption or conversion metrics were not yet the strongest measure of success. The early impact was in what the product enabled:",
        },
        {
          type: "cards",
          items: [
            { title: "0 → 1", text: "Established the core Deep Research workflow and interaction model from scratch." },
            { title: "One connected workflow", text: "Connected the question, molecule resolution, route generation, route modification, scaling and evidence." },
            { title: "Scientific evidence built in", text: "Made literature and source provenance part of the research workflow." },
            { title: "Research continuity", text: "Introduced History and the Research Vault so investigations continue beyond a single session." },
            { title: "Human + AI collaboration", text: "Designed AI as an accelerator while keeping researchers in control of scientific decisions." },
            { title: "Design → implementation", text: "Extended the work from high-fidelity design into the production codebase." },
          ],
        },
        {
          type: "shift",
          label: "What changed",
          from: "“What information can I find?”",
          to: "“What should I investigate next?”",
        },
        { type: "flow", label: "Deep Research connects", items: ["Discovery", "Reasoning", "Experimentation", "Evidence"] },
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
            {
              title: "0 → 1 design is product definition",
              text: "When there is no established product pattern, the designer isn't just solving interface problems. You are defining the system itself.",
            },
            {
              title: "AI products need clear boundaries",
              text: "The most useful AI experience isn't the one that automates everything. Researchers need to understand what the system is doing, challenge its output and take control when required.",
            },
            {
              title: "Complexity needs structure, not simplification",
              text: "Scientific workflows can't always be simplified by removing information. Hierarchy and progressive disclosure work better.",
            },
            {
              title: "Implementation changes the design",
              text: "Working in the codebase exposed interaction and visual details that weren't obvious in prototypes. Designing and building together created a tighter feedback loop.",
            },
          ],
        },
        { type: "h3", text: "The bigger idea: research should compound" },
        {
          type: "p",
          text: "Published chemistry captures what succeeded. A researcher's own work captures what actually happened. The long-term opportunity is to connect both, so every investigation contributes knowledge to the next.",
        },
        {
          type: "principle",
          label: "The direction behind Deep Research",
          text: "Every result is context. Every failed condition is evidence. Every investigation should start ahead of the last.",
        },
        {
          type: "p",
          text: "Deep Research started as an opportunity to rethink how scientists interact with information, and became a 0 → 1 product experience connecting questions, chemistry, research, routes, evidence and decisions. My role was to take an ambiguous opportunity and help turn it into a structured, designed and implemented experience.",
        },
        {
          type: "principle",
          label: "Closing",
          text: "Not just designing the interface, but helping define the product around the way research actually happens.",
        },
      ],
    },
  ],
}
