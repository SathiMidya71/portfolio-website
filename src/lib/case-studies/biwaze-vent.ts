import type { CaseStudy } from "./types"

// Sources: Behance case study "The BiWaze Vent Mechanical Ventilator" (Sathi Midya, Jan 2024)
// for process, personas and visuals; impact metrics from Sathi's résumé (ABM Respiratory Care),
// attributed to this project at her direction.

const dir = "/case-studies/biwaze-vent"

export const biwazeVent: CaseStudy = {
  slug: "biwaze-vent",
  company: "ABM Respiratory Care",
  eyebrow: "ABM Respiratory Care · Medical device UI",
  title: ["Designing the BiWaze Vent", "ventilator interface"],
  seo: {
    title: "BiWaze Vent Ventilator UI | Case Study | Sathi Midya",
    description:
      "How I designed the touchscreen interface for ABM's BiWaze Vent mechanical ventilator: research with clinicians, a clearer information hierarchy and 70+ screens delivered in 3 months.",
  },
  meta: {
    overview:
      "Designed the touchscreen interface for the BiWaze Vent, a microprocessor-controlled ventilator that provides pressure support, pressure control and volume control ventilation for patients who need mechanical ventilation.",
    role: "UI/UX Designer: user research, information architecture, interaction design, visual design and style guide, developer handover.",
    team: [
      { initials: "Me", label: "UI/UX Designer" },
      { initials: "SH", label: "Stakeholders" },
      { initials: "DEV", label: "Engineering" },
    ],
    timeline: "3 months · Discover → Design → Deliver",
  },
  hero: {
    src: `${dir}/hero.jpg`,
    alt: "BiWaze Vent ventilator showing the redesigned monitoring screen with live pressure, flow and volume waveforms",
    width: 1920,
    height: 1080,
    background: "#000229",
  },
  impact: [
    {
      label: "User errors",
      value: "~30%",
      trend: "down",
      change: "fewer",
      note: "20+ interviews & tests",
      text: "~30% fewer user errors after restructuring the information hierarchy, informed by 20+ interviews, surveys and usability testing.",
      tone: "green",
      visual: { kind: "line", shape: "falling" },
    },
    {
      label: "Engagement",
      value: "~20%",
      trend: "up",
      change: "higher",
      note: "new hi-fi UI & flows",
      text: "~20% higher engagement with the new hi-fi UI, prototypes and interaction flows built in Figma.",
      tone: "purple",
      visual: { kind: "line", shape: "rising" },
    },
    {
      label: "Development time",
      value: "~25%",
      trend: "down",
      change: "less",
      note: "annotated Figma specs",
      text: "~25% less development time thanks to annotated Figma specs and a streamlined handover to engineering.",
      tone: "orange",
      visual: { kind: "bar", fill: 25 },
    },
    {
      label: "On-time delivery",
      value: "100%",
      trend: "up",
      change: "on time",
      note: "70+ screens · 3 months",
      text: "100% on-time delivery across every sprint, taking 70+ screens from discovery to handover in 3 months.",
      tone: "blue",
      visual: { kind: "bar", fill: 100 },
    },
  ],
  sections: [
    {
      id: "context",
      nav: "Context",
      title: "A screen that has to be read in critical moments",
      blocks: [
        {
          type: "lead",
          text: "The ventilator interface showed an overwhelming amount of data. Medical staff struggled to quickly identify and prioritise critical patient information during complex treatments or adjustments.",
        },
        {
          type: "p",
          text: "Ventilators are used in high-stress environments where quick, accurate decisions matter. Before designing anything, I framed the problem around four constraints that would shape every decision:",
        },
        {
          type: "cards",
          items: [
            {
              title: "Complexity and criticality",
              text: "Intricate settings and controls need a balance between detailed information and a simple interface clinicians can use in critical situations.",
            },
            {
              title: "Information overload",
              text: "A multitude of parameters can overwhelm users, so information has to be prioritised and presented in a digestible format.",
            },
            {
              title: "Accessibility",
              text: "The UI must be easy to navigate and accessible, especially in emergencies when every second counts.",
            },
            {
              title: "Regulatory compliance",
              text: "Stringent medical regulations add complexity to the process and require extensive testing and validation.",
            },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Understanding who relies on the ventilator",
      blocks: [
        {
          type: "p",
          text: "I ran 20+ user and stakeholder interviews, backed by surveys and an analysis centred on the product's intended audience, to understand their challenges and needs.",
        },
        {
          type: "figure",
          image: {
            src: `${dir}/research-session.jpg`,
            alt: "Hands arranging handwritten research notes on a table during synthesis",
            width: 1312,
            height: 721,
          },
          caption: "Synthesising research notes during discovery.",
        },
        { type: "h3", text: "Four user groups" },
        {
          type: "p",
          text: "The ventilator is used by people with very different training and goals, from specialists adjusting settings to caregivers who need reassurance.",
        },
        { type: "chips", items: ["Respiratory Therapist", "Pulmonologist", "ICU Nurse", "Caregiver"] },
        { type: "h3", text: "Personas" },
        {
          type: "personas",
          items: [
            {
              name: "Sarah Mathur",
              role: "Respiratory Therapist",
              goals: [
                "Assist patients as quickly and efficiently as possible.",
                "See critical information from up to 10 feet away.",
                "Communicate information to colleagues.",
              ],
              frustrations: ["Spends too much time navigating the UI.", "Waveforms are too complex."],
            },
            {
              name: "Sachin Verma",
              role: "Pulmonologist",
              goals: [
                "Gather patient information quickly from therapists and nurses.",
                "Change patient inputs quickly.",
              ],
              frustrations: [
                "A complex UI wastes time.",
                "Patients should be able to understand the UI to a degree.",
              ],
            },
            {
              name: "Deepshikha Singh",
              role: "ICU Nurse",
              goals: [
                "Change patient information without delays.",
                "See critical information from outside the patient's room.",
              ],
              frustrations: ["Figuring out how to silence alarms.", "Waveforms move too quickly."],
            },
            {
              name: "Rajesh Sharma",
              role: "Caregiver",
              goals: [
                "Assist the patient as quickly and efficiently as possible.",
                "Communicate information to colleagues.",
              ],
              frustrations: [
                "The interface and technical aspects are hard to navigate.",
                "Figuring out how to silence alarms.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "findings",
      nav: "Key findings",
      title: "What the research told us",
      blocks: [
        {
          type: "p",
          text: "Across the personas and the empathy map, the same themes kept coming back. These became the brief for the redesign.",
        },
        {
          type: "findings",
          items: [
            {
              title: "Critical values must be readable from a distance",
              text: "Therapists and nurses need to read a patient's status from up to 10 feet away, or from outside the room.",
              source: "Respiratory Therapist, ICU Nurse",
            },
            {
              title: "Alarms cause anxiety, and silencing them is hard",
              text: "Users feel anxious when alarms go off, and both nurses and caregivers struggled to find how to silence them.",
              source: "ICU Nurse, Caregiver",
            },
            {
              title: "Waveforms are hard to follow",
              text: "Graphs were described as too complex and moving too quickly to interpret under pressure.",
              source: "Respiratory Therapist, ICU Nurse",
            },
            {
              title: "Navigation costs time that clinicians don't have",
              text: "Users spent too long navigating, often falling back on manuals, guides or colleagues to complete tasks.",
              source: "Empathy map",
            },
            {
              title: "Settings need to change without delay",
              text: "Pulmonologists and nurses need to adjust patient inputs quickly and with confidence.",
              source: "Pulmonologist, ICU Nurse",
            },
          ],
        },
        { type: "h3", text: "Empathy map" },
        {
          type: "quadrants",
          items: [
            {
              title: "Say",
              items: [
                "“It's overwhelming to manage all this data.”",
                "“I feel anxious when alarms go off, especially without immediate help.”",
                "“I wish it were easier to understand and use the interface.”",
              ],
            },
            {
              title: "Think & feel",
              items: [
                "Worried about missing critical information.",
                "Frustrated by complex interfaces.",
                "Determined to provide the best care possible.",
              ],
            },
            {
              title: "Do",
              items: [
                "Refer to manuals or guides frequently.",
                "Ask colleagues or online resources for help.",
                "Monitor the ventilator closely for changes or alarms.",
              ],
            },
            {
              title: "Hear",
              items: [
                "Alarms and notifications from the ventilator.",
                "Guidance from supervisors and experienced users.",
                "Information about available training and support.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "process",
      nav: "Process",
      title: "From findings to design principles",
      blocks: [
        {
          type: "p",
          text: "The project ran in three phases over three months.",
        },
        {
          type: "phases",
          items: [
            { phase: "Discover", items: ["User & stakeholder interviews", "Problem finding", "Define"] },
            {
              phase: "Design",
              items: ["Wireframes", "Style guide", "Visual design", "User testing", "Validation"],
            },
            { phase: "Deliver", items: ["Handover", "Developer collaboration", "Long-term support"] },
          ],
        },
        { type: "h3", text: "Four design principles" },
        {
          type: "p",
          text: "Each principle answers a problem users reported:",
        },
        {
          type: "cards",
          items: [
            {
              title: "Simplify the interface",
              text: "Show essential information prominently in a digestible format, and cut unnecessary clutter.",
            },
            {
              title: "Prioritise critical data",
              text: "Highlight or group critical patient information so it stands out during complex treatments or adjustments.",
            },
            {
              title: "Customisable displays",
              text: "Let staff arrange and display the data most relevant to a specific patient or treatment scenario.",
            },
            {
              title: "Visual cues and alerts",
              text: "Draw immediate attention to vital information and changes in patient status, to support fast decisions.",
            },
          ],
        },
        { type: "h3", text: "Mapping the core user flow" },
        {
          type: "p",
          text: "I mapped the full journey around the device, from power-on and system checks through monitoring and alarm response to preparing a patient for weaning. This set the navigation model for the whole interface.",
        },
        {
          type: "figure",
          dark: true,
          image: {
            src: `${dir}/user-flow.jpg`,
            alt: "Circular user flow around the ventilator: power on, accessory checks, system checks, patient management, ventilation and alarm settings, monitoring, alarm response, troubleshooting, assessment, recording and weaning",
            width: 1400,
            height: 880,
          },
          caption: "The core user flow: twelve steps from power-on to weaning.",
        },
      ],
    },
    {
      id: "iterations",
      nav: "Iterations",
      title: "Sketch, wireframe, specify",
      blocks: [
        {
          type: "p",
          text: "I explored layouts as hand sketches first, to work out the information hierarchy before committing to pixels.",
        },
        {
          type: "figure",
          image: {
            src: `${dir}/hand-sketches.jpg`,
            alt: "Hand-drawn ventilator screen sketches on a tablet",
            width: 1312,
            height: 722,
          },
          caption: "Hand sketches of the main screen, ventilation modes and settings.",
        },
        {
          type: "p",
          text: "The sketches became hi-fi wireframes covering the main monitoring view, alarm settings, device settings, Bluetooth pairing and step-by-step assembly instructions.",
        },
        {
          type: "figure",
          dark: true,
          image: {
            src: `${dir}/hifi-wireframes.jpg`,
            alt: "Hi-fi wireframes of the ventilator: main screen, assembly instructions, monitoring values, alarm settings, Bluetooth settings and device settings",
            width: 1400,
            height: 870,
          },
          caption: "Hi-fi wireframes across monitoring, configuration and setup.",
        },
        {
          type: "p",
          text: "Finally, I documented every zone of the main screen in an annotated spec, from the status bar (circuit type, patient profile, alarm pill, connectivity, power) to the quick-access ventilation parameters, so engineering could build it precisely.",
        },
        {
          type: "figure",
          dark: true,
          image: {
            src: `${dir}/specs-layout.jpg`,
            alt: "Annotated layout of the main ventilator screen labelling each zone",
            width: 1400,
            height: 940,
          },
          caption: "Display panel spec used for developer handover.",
        },
      ],
    },
    {
      id: "final",
      nav: "Final design",
      title: "The final interface",
      blocks: [
        {
          type: "lead",
          text: "The home screen puts what matters first: live patient values on the left, waveforms in the centre, and the most-used controls one tap away.",
        },
        {
          type: "list",
          items: [
            "Key parameters display: respiratory rate, tidal volume, oxygen saturation and pressure settings, shown prominently.",
            "Mode control: quick access to ventilation modes for immediate adjustments.",
            "Alarm visuals: clear, colour-coded cues for alarms and critical alerts.",
            "Settings access: easy changes to parameters such as FiO2, PEEP and alarm thresholds.",
          ],
        },
        {
          type: "figure",
          dark: true,
          image: {
            src: `${dir}/home-screen.jpg`,
            alt: "The final BiWaze Vent home screen on the device",
            width: 742,
            height: 810,
          },
          caption: "The final home screen on the BiWaze Vent.",
        },
        { type: "h3", text: "Visual system" },
        {
          type: "p",
          text: "A dark background keeps waveforms and values legible, while a strong blue and a clear green separate interactive controls from confirmations.",
        },
        {
          type: "visualSystem",
          colors: [
            { name: "Primary", hex: "#1068E7" },
            { name: "Secondary", hex: "#61D72D" },
            { name: "Background", hex: "#252F4A" },
          ],
          typeface: { name: "Roboto", weights: "Light, Regular, Medium, Bold, Black" },
        },
        {
          type: "figure",
          dark: true,
          image: {
            src: `${dir}/other-screens.jpg`,
            alt: "Collage of ventilator screens: patient setup, graph options, ventilation mode selection, alarm log, assembly instructions and alarm settings",
            width: 1400,
            height: 1150,
          },
          caption: "A selection of the 70+ screens: patient setup, ventilation modes, graphs, alarm log and settings.",
        },
      ],
    },
    {
      id: "impact",
      nav: "Impact",
      title: "Impact and results",
      blocks: [
        {
          type: "p",
          text: "The redesign made the ventilator easier to read and safer to operate, and faster for the team to build:",
        },
        {
          type: "list",
          items: [
            "Reduced user errors by ~30%, with every major decision traced back to research with four user groups.",
            "Increased product engagement by ~20% through clearer hierarchy, interaction flows and high-fidelity UI.",
            "Cut development time by ~25% with a reusable style guide, annotated display specs and a streamlined handover.",
            "Delivered 70+ screens on time in every sprint, from discovery to handover in 3 months.",
            "Applied WCAG standards and inclusive design so critical information stays legible and accessible under pressure.",
          ],
        },
        { type: "h3", text: "Reflection" },
        {
          type: "p",
          text: "Designing for a medical device taught me that clarity is a safety feature. Every value, colour and alert on screen has to earn its place, because the person reading it may have seconds to act.",
        },
      ],
    },
  ],
}
