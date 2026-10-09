import type { CaseStudy, Img } from "./types"

// Source: Behance case study "Arc Connect Web Portal" (Sathi Midya, published Oct 2023, designed
// 2022): https://www.behance.net/gallery/181423391/Arc-Connect-Web-Portal
// All copy comes from the board text, lightly edited for grammar. The architecture, type scale and
// colours are coded; screens were cropped from the boards without their baked-in text, and the
// annotation arrows were removed from the medical record so the notes can be coded beside it.
// No outcome metrics were published, so the overview shows project scope, not impact.

const dir = "/case-studies/arc-connect-portal"
const appDir = "/case-studies/arc-connect-app"

const comp = (name: string, alt: string, width: number, height: number): Img => ({ src: `${dir}/components/${name}.png`, alt, width, height })
const img = (name: string, alt: string, width: number, height: number): Img => ({ src: `${dir}/${name}.jpg`, alt, width, height })

export const arcConnectPortal: CaseStudy = {
  slug: "arc-connect-portal",
  company: "ABM Respiratory Care",
  eyebrow: "ABM Respiratory Care · Web portal",
  title: ["Arc Connect", "web portal for care teams"],
  seo: {
    title: "Arc Connect Web Portal | Case Study | Sathi Midya",
    description:
      "How I designed the Arc Connect Portal, a web portal that helps care teams manage lung therapy patients by exception: architecture, dashboard, notifications, medical records, messaging and invitations.",
  },
  meta: {
    overview:
      "Designed the Arc Connect Portal, the web side of Arc Connect for BiWaze. It helps healthcare teams manage patients by exception, so patients who need attention are prioritised, and gives an overview of completed therapy, goals and each patient's health information.",
    role: "UI/UX Design Engineer: information architecture, interaction design, visual design and components, requirement notes for development.",
    team: [
      { initials: "Me", label: "UI/UX Designer" },
      { initials: "SH", label: "Stakeholders" },
      { initials: "DEV", label: "Engineering" },
    ],
    timeline: "2022 · web portal",
  },
  hero: img(
    "hero-v2",
    "Arc Connect Portal screens laid out around a laptop showing the welcome screen, with the Arc Connect for BiWaze logo on a blue background",
    2400,
    1600
  ),
  impactTitle: "Project at a glance",
  impact: [
    {
      label: "Key screens",
      value: "11",
      change: "designed",
      note: "log in to clinician profile",
      pointer: "From log in and the dashboard to medical records, messaging, invitations and care site settings.",
      tone: "blue",
      visual: { kind: "bar", fill: 100 },
    },
    {
      label: "Alert rules",
      value: "3",
      change: "per care site",
      note: "adherence · SpO2 · deviation",
      pointer: "Admins choose the adherence and SpO2 ranges and whether therapy deviations trigger a notification.",
      tone: "orange",
      visual: { kind: "bar", fill: 75 },
    },
    {
      label: "Adherence score",
      value: "14",
      change: "days",
      note: "recent therapy weighs more",
      pointer: "The score looks back over 14 days and compares completed therapy with the goals set in Arc Connect.",
      tone: "purple",
      visual: { kind: "line", shape: "rising" },
    },
    {
      label: "Invite roles",
      value: "3",
      change: "roles",
      note: "patient · clinician · site admin",
      pointer: "Care site admins invite patients, clinicians and other site admins into the portal.",
      tone: "green",
      visual: { kind: "bar", fill: 100 },
    },
  ],
  sections: [
    {
      id: "overview",
      nav: "Overview",
      title: "Patient management by exception",
      blocks: [
        {
          type: "lead",
          text: "Arc Connect Portal helps care teams manage patients by exception,",
          emphasis: "so the patients who need attention come first.",
        },
        {
          type: "p",
          text: "The portal gives healthcare teams an overview of each patient's completed therapy, goals and additional health information. It is the web side of Arc Connect: patients use the mobile app with their BiWaze device, and their care team follows along here.",
        },
        { type: "h3", text: "Designed to help those who are essential to our wellbeing" },
        {
          type: "photos",
          items: [
            {
              image: img("photo-child", "A smiling young child with a tracheostomy tube, sitting on a sofa", 1100, 1501),
              caption: "The Arc Connect platform gives a direct line of sight into lung therapy adherence and brings healthcare professionals, caregivers and patients together.",
            },
            {
              image: img("photo-caregiver", "A caregiver smiling beside a young patient in a wheelchair who holds a therapy mask", 1100, 1509),
              caption: "Patients can also share their data with their caregivers through the Arc Connect Portal.",
            },
          ],
        },
      ],
    },
    {
      id: "architecture",
      nav: "Architecture",
      title: "Mapping the portal",
      blocks: [
        {
          type: "p",
          text: "Everything starts from the dashboard. I grouped the portal into five areas: an overview of care, notifications, patient records, communication and invitations, so each role can reach what they need in one step.",
        },
        { type: "diagram", name: "arc-portal-architecture" },
      ],
    },
    {
      id: "visual-system",
      nav: "Visual system",
      title: "Visual system",
      blocks: [
        {
          type: "p",
          text: "The portal shares its visual language with the Arc Connect app: Roboto across a clear type scale, Arc Connect's green and blue, and orange for the things that need attention.",
        },
        {
          type: "designSystem",
          brand: [
            { name: "Green", hex: "#A9D158", image: { src: `${appDir}/abm-green.jpg`, alt: "Woman breathing freely in a green forest, from abmrc.com" } },
            { name: "Blue", hex: "#3798BF", image: { src: `${appDir}/abm-blue.jpg`, alt: "Blue-toned photo of a tablet with contact icons, from abmrc.com" } },
            { name: "Sky", hex: "#6CE3FF", image: { src: `${appDir}/abm-sky.jpg`, alt: "Clinician in a light blue coat, from abmrc.com" } },
            { name: "Orange", hex: "#F26930", image: { src: `${appDir}/orange-care.jpg`, alt: "Woman in an orange hoodie walking with a mobility walker (photo: Unsplash, @rollzint)" } },
          ],
          neutrals: [
            { name: "Grey", hex: "#5C5A5A" },
            { name: "Mist", hex: "#F2F7F8" },
            { name: "White", hex: "#FFFFFF" },
          ],
          typeface: "Roboto",
          weights: ["Regular", "Medium", "Bold"],
          scale: [48, 32, 24, 20, 16, 12],
          icons: [
            { icon: "home", label: "Dashboard", primary: true },
            { icon: "mail", label: "Messages", primary: true },
            { icon: "invitations", label: "Invitations", primary: true },
            { icon: "profile", label: "Profile", primary: true },
            { icon: "settings", label: "Settings" },
            { icon: "add", label: "Invite" },
            { icon: "lock", label: "Password" },
            { icon: "device-details", label: "Device" },
          ],
        },
        { type: "h3", text: "Components", spaced: true },
        {
          type: "p",
          text: "A small set of components carries the whole portal: adherence buckets, today's adherence score, pressure and duration charts, enrolment and invitation cards, and the notification range sliders.",
        },
        {
          type: "componentBoard",
          items: [
            { image: comp("adherence-score", "Today's adherence score of 90 with 14 days of bars", 1200, 376), label: "Adherence score", span: 2, tilt: -1 },
            {
              image: comp("goals-updated", "Updated therapy goals: 5", 636, 116),
              more: [comp("with-deviations", "Transmissions with deviations: 10", 635, 127), comp("without-deviations", "Transmissions without deviations: 220", 637, 125)],
              label: "Quick filters",
              tilt: 1.5,
            },
            { image: comp("therapy", "Therapy card with patients below 25%, 50% and 75% adherence", 943, 850), label: "Therapy buckets", tilt: 1 },
            { image: comp("pressure", "Pressure chart with pause, inspiratory and expiratory pressure for five cycles", 1200, 1196), label: "Pressure by cycle", tilt: -1 },
            { image: comp("enrolled", "Enrolled patients 1,325 with View and Invite buttons", 636, 576), label: "Enrolment", tilt: 2 },
            { image: comp("duration", "Duration chart over a month", 944, 645), label: "Therapy duration", span: 2, tilt: -1 },
            { image: comp("invitation", "New invitation card with a Create button", 635, 583), label: "Invitations", tilt: -1 },
            { image: comp("slider-adherence", "Adherence notification range slider set to 0–75%", 723, 387), label: "Adherence range", tilt: -1.5 },
            { image: comp("slider-spo2", "SpO2 notification range slider set to 0–90%", 724, 387), label: "SpO2 range", tilt: 1 },
            { image: comp("therapy-deviation", "Therapy deviation toggle switched on", 723, 387), label: "Deviation alert", tilt: -1 },
          ],
        },
      ],
    },
    {
      id: "dashboard",
      nav: "Dashboard",
      title: "Dashboard: who needs attention first",
      blocks: [
        { type: "p", text: "The home page gives an overview of the key information, sorted by exception:" },
        {
          type: "list",
          items: [
            "Pick a care site and download the list of patients who meet the exception criteria.",
            "See patients with an adherence score below 25%, 50% or 75%.",
            "Find patients whose device never transmitted a therapy log, or who missed three or more days.",
            "Check which patients transmitted therapy with or without deviations.",
          ],
        },
        {
          type: "figure",
          image: img(
            "dashboard",
            "Dashboard for Apollo Clinic: Therapy, Patients and Transmission cards with counts by exception, and announcements below",
            1800,
            1255
          ),
        },
      ],
    },
    {
      id: "notifications",
      nav: "Notifications",
      title: "Notifications on the team's schedule",
      blocks: [
        {
          type: "p",
          text: "Admins decide when the portal should speak up. For each care site they set the notification schedule and recipients, the range of adherence scores and the range of SpO2.",
        },
        {
          type: "figure",
          image: img(
            "notification-settings",
            "Notification settings: care site, the days of the week to send emails, recipients and an adherence range slider",
            1800,
            1414
          ),
        },
        {
          type: "p",
          text: "On the scheduled days the system emails the recipients a link to the Notification Summary: the current settings and the list of patients who fall inside them.",
        },
        {
          type: "figure",
          image: img(
            "notification-summary",
            "Notification summary: current adherence, SpO2 and therapy deviation settings above a patient list with adherence, SpO2 and deviation columns",
            1800,
            1415
          ),
        },
      ],
    },
    {
      id: "statistics",
      nav: "Statistics",
      title: "Statistics at a glance",
      blocks: [
        {
          type: "p",
          text: "Charts give quick access to patient information and make it easy to interpret: therapy duration over time, adherence percentage, pressure for every cycle, the active therapy goal and invitation counts.",
        },
        {
          type: "figure",
          image: img(
            "statistics",
            "Statistics cards: duration and percentage charts, a pressure chart by cycle, the active therapy goal and invitation cards",
            1800,
            1401
          ),
        },
      ],
    },
    {
      id: "medical-record",
      nav: "Medical record",
      title: "A full view of a patient's health",
      blocks: [
        {
          type: "p",
          text: "The medical record brings everything about one patient onto a single page, from their health summary to every therapy session. These are the requirement notes I wrote beside the design.",
        },
        {
          type: "annotatedScreen",
          image: img(
            "medical-record",
            "Patient medical record: profile with medical condition and personal information, adherence score, pressure chart, therapy goal and history, hour meter reading graph and adherence score history",
            886,
            3405
          ),
          notes: [
            { text: "Display the health summary the patient set in the app.", side: "left", x: 0.335, y: 0.054, noteY: 0.0 },
            { text: "To update the patient ID.", side: "right", x: 0.5, y: 0.041, noteY: 0.0 },
            { text: "Display the patient's personal information.", side: "left", x: 0.335, y: 0.068, noteY: 0.05 },
            { text: "Shows whether the patient is active or inactive.", side: "right", x: 0.82, y: 0.074, noteY: 0.045 },
            {
              text: "The adherence score looks back over the past 14 days. It compares the therapy completed with the goals set in Arc Connect; recent therapy, completed or missed, weighs more than last week's.",
              side: "left",
              x: 0.11,
              y: 0.133,
              noteY: 0.11,
            },
            {
              text: "Display the pressure settings (pause, inspiratory and expiratory pressure) of each cycle for every therapy session, with its date. The graph also shows when a cycle or therapy was not performed.",
              side: "right",
              x: 0.5,
              y: 0.25,
              noteY: 0.23,
            },
            {
              text: "Display the patient's therapy goal, and let care site admins and clinicians update it if needed.",
              side: "right",
              x: 0.83,
              y: 0.442,
              noteY: 0.43,
            },
            { text: "Display the trend of hour meter reading (HMR) data as a graph.", side: "left", x: 0.2, y: 0.69, noteY: 0.67 },
            {
              text: "Show which therapies were performed against the goal on a specific day, so the clinician understands the patient's adherence score.",
              side: "right",
              x: 0.65,
              y: 0.85,
              noteY: 0.82,
            },
            { text: "Generate a report with a summary of the patient's therapy data.", side: "left", x: 0.12, y: 0.984, noteY: 0.95 },
          ],
        },
      ],
    },
    {
      id: "messaging",
      nav: "Messaging",
      title: "Messaging",
      blocks: [
        {
          type: "p",
          text: "Users can message anyone on their contact list, one to one or in groups, and open the profile of anyone on their connection list.",
        },
        {
          type: "figure",
          image: img("messaging", "Messaging screen with a list of chats, group avatars and a conversation thread", 1800, 1264),
        },
      ],
    },
    {
      id: "invitations",
      nav: "Invitations",
      title: "Invitations and care sites",
      blocks: [
        {
          type: "p",
          text: "Care site admins see every sent and received invitation. To invite someone, they type the invitee's email address and choose the clinic.",
        },
        {
          type: "figure",
          image: img("invitations", "Invitations screen with new, sent (120) and received (30) invitation cards above a table of sent invitations", 1800, 1261),
        },
        {
          type: "p",
          text: "Admins can invite other care site administrators, clinicians and patients.",
        },
        {
          type: "figure",
          image: img("invitation-new", "New invitation form: email address, a choice of patient, clinician or site admin, care site and Send invitations", 1800, 1419),
        },
        { type: "h3", text: "Care site settings", spaced: true },
        {
          type: "p",
          text: "Care site settings list the enrolled patients, clinicians and care site admins, with their counts, across every care site the admin manages.",
        },
        {
          type: "figure",
          image: img("care-site-settings", "Care site settings for Apollo Clinic: enrolled patients 1,325, clinicians 30 and care site admins 3, above the care site's address and details", 1800, 1258),
        },
        { type: "p", text: "Admins can also save a clinician's profile, with their specialties, licence number and accreditation." },
        {
          type: "figure",
          image: img("clinician-profile", "Clinician profile form: name, specialties, licence number, accreditation, address, phone and email", 1800, 1431),
        },
      ],
    },
    {
      id: "log-in",
      nav: "Log in",
      title: "Log in",
      blocks: [
        {
          type: "p",
          text: "The welcome screens set the tone for the whole portal: get connected, stay informed, and collaborate with your patients and their caregivers.",
        },
        {
          type: "figure",
          image: img("login", "Welcome to Arc Connect screens: log in with username and password, and create a password", 1785, 2523),
        },
      ],
    },
  ],
  moreWork: { heading: "More from ABM Respiratory Care", items: [] },
}
