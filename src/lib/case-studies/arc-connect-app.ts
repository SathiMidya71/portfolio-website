import type { CaseStudy, Img } from "./types"

// Source: Behance case study "Arc Connect Lung Health Management App" (Sathi Midya).
// Copy, screens, illustrations and motion come from that project. Screens were cut out of the
// Behance boards and the presentation arrows removed; GIFs were converted to looping MP4s.
// No outcome metrics were published, so the overview shows project scope, not impact.

const dir = "/case-studies/arc-connect-app"

const screen = (name: string, alt: string, height: number): Img => ({
  src: `${dir}/${name}.png`,
  alt,
  width: 560,
  height,
})

export const arcConnectApp: CaseStudy = {
  slug: "arc-connect-app",
  company: "ABM Respiratory Care",
  eyebrow: "ABM Respiratory Care · Mobile app",
  title: ["Arc Connect", "lung health management app"],
  seo: {
    title: "Arc Connect Lung Health App | Case Study | Sathi Midya",
    description:
      "How I designed Arc Connect, a mobile app that connects patients, caregivers and healthcare teams around lung therapy, from user flows and design system to illustration, motion and 35 screens.",
  },
  meta: {
    overview:
      "Designed Arc Connect, a mobile app that gives patients, caregivers and healthcare teams a shared view of lung therapy. Patients connect their BiWaze Cough device, track their adherence and share therapy data with the people who care for them.",
    role: "UI/UX Designer: user flows, interaction design, visual design, illustration and motion, design specifications.",
    team: [
      { initials: "Me", label: "UI/UX Designer" },
      { initials: "SH", label: "Stakeholders" },
      { initials: "DEV", label: "Engineering" },
    ],
    timeline: "2021 · 35 screens",
  },
  hero: {
    src: `${dir}/hero.png`,
    alt: "Three Arc Connect screens: log in, home with today's adherence score, and therapy goals",
    width: 1296,
    height: 990,
    background: "transparent",
  },
  impactTitle: "Project at a glance",
  impact: [
    {
      label: "Screens",
      value: "35",
      change: "designed",
      note: "sign-up to profile",
      pointer: "Every flow designed end to end, from registration to the medical profile.",
      tone: "blue",
      visual: { kind: "bar", fill: 100 },
    },
    {
      label: "Core areas",
      value: "4",
      change: "main tabs",
      note: "home · connections · invitations · profile",
      pointer: "A simple structure so patients always know where their therapy and people live.",
      tone: "green",
      visual: { kind: "bar", fill: 100 },
    },
    {
      label: "Adherence history",
      value: "14",
      change: "days",
      note: "scored from device therapy",
      pointer: "Adherence is calculated from therapy completed on the device, with 14 days of history.",
      tone: "purple",
      visual: { kind: "line", shape: "rising" },
    },
    {
      label: "Care settings",
      value: "2",
      change: "supported",
      note: "hospital & home care",
      pointer: "Designed for acute care in hospitals and for patients recovering at home.",
      tone: "orange",
      visual: { kind: "line", shape: "rising" },
    },
  ],
  sections: [
    {
      id: "context",
      nav: "Context",
      title: "One app for patients, caregivers and clinicians",
      blocks: [
        {
          type: "lead",
          text: "Arc Connect gives a direct line of sight into lung therapy adherence and brings healthcare professionals, caregivers and patients together.",
        },
        {
          type: "p",
          text: "The goal was an ecosystem for lung therapy management that patients can use from anywhere, at any time. Patients connect their BiWaze Cough device so completed therapy, goals and health information reach their healthcare team, and they can share their data with caregivers through the app.",
        },
        { type: "h3", text: "Designed for two care settings" },
        {
          type: "cards",
          items: [
            {
              title: "Acute care",
              text: "Hospitals, clinics and surgical centres, where clinicians are always available. Patients receive short-term treatment for a severe injury or illness, an urgent condition, or recovery from surgery.",
            },
            {
              title: "Home care",
              text: "Where the patient lives, or anywhere they are. Care comes from trained practitioners such as nurses, or from family caregivers, to help patients live independently and avoid hospitalisation.",
            },
          ],
        },
      ],
    },
    {
      id: "structure",
      nav: "Structure",
      title: "Mapping the app",
      blocks: [
        {
          type: "p",
          text: "I mapped every path from the start screen through onboarding, login and registration into four main areas. Each area holds the tasks patients repeat most: checking their score, managing their device, sharing data and keeping their profile up to date.",
        },
        { type: "chips", items: ["Home", "My Connections", "Invitations", "Profile"] },
        {
          type: "figure",
          dark: true,
          image: {
            src: `${dir}/user-flow.jpg`,
            alt: "Arc Connect user flow from the start screen through onboarding and login to Home, My Connections, Invitations and Profile, with every sub-screen",
            width: 1400,
            height: 2092,
          },
          caption: "User flow covering every screen in the four main areas.",
        },
      ],
    },
    {
      id: "design-system",
      nav: "Design system",
      title: "A calm, friendly visual language",
      blocks: [
        {
          type: "p",
          text: "The palette pairs Arc Connect's green and blue with a warm orange accent, while a single typeface across a clear type scale keeps health data easy to read.",
        },
        {
          type: "visualSystem",
          colors: [
            { name: "Green", hex: "#A9D158" },
            { name: "Blue", hex: "#3798BF" },
            { name: "Sky", hex: "#6CE3FF" },
            { name: "Orange", hex: "#F26930" },
            { name: "Grey", hex: "#5C5A5A" },
            { name: "Black", hex: "#000000" },
            { name: "White", hex: "#FFFFFF" },
          ],
          typeface: { name: "Roboto", weights: "Regular, Medium, Bold" },
          scale: [36, 32, 24, 20, 18, 16, 14, 12],
          icons: { src: `${dir}/icons.png`, alt: "Arc Connect icon set: home, share, invitations, back, mail, device, lock, units, profile, device details, add and settings", width: 900, height: 331 },
        },
      ],
    },
    {
      id: "illustration",
      nav: "Illustration & motion",
      title: "Illustration and motion that feel human",
      blocks: [
        {
          type: "p",
          text: "Health apps can feel cold and technical. I created a set of illustrations and a logo animation so the key moments, from logging in to sharing data with family, feel warm and reassuring.",
        },
        {
          type: "illustrations",
          items: [
            {
              name: "Welcome character",
              usedIn: "Log in",
              background: "#ffffff",
              image: { src: `${dir}/illus-login.png`, alt: "Illustration of a woman checking the Arc Connect login screen on her phone", width: 900, height: 808 },
            },
            {
              name: "Registration character",
              usedIn: "Register your mobile number",
              background: "#232323",
              image: { src: `${dir}/illus-registration.png`, alt: "Illustration of a smiling woman holding up her phone with Arc Connect open", width: 700, height: 676 },
            },
            {
              name: "Verification code",
              usedIn: "Verify your mobile number",
              background: "#232323",
              image: { src: `${dir}/illus-otp.png`, alt: "Illustration of hands holding a phone showing a verification code", width: 600, height: 592 },
            },
            {
              name: "Device scan",
              usedIn: "Register your device",
              background: "#232323",
              image: { src: `${dir}/illus-device-scan.png`, alt: "Illustration of a hand pointing to the UDI barcode on the back of the BiWaze Cough device", width: 700, height: 464 },
            },
            {
              name: "We care for you",
              usedIn: "Home and sharing",
              background: "#ffffff",
              image: { src: `${dir}/illus-care.png`, alt: "Illustration of a woman hugging herself surrounded by hearts", width: 600, height: 556 },
            },
          ],
        },
        { type: "h3", text: "Logo animation and onboarding" },
        {
          type: "p",
          text: "The splash screen animates the Arc Connect mark, its layers shifting and blending, before onboarding introduces the app and its terms. Onboarding guides users through the interface so they learn how to navigate it and start with a positive first experience.",
        },
        {
          type: "video",
          layout: "phone",
          src: `${dir}/logo-animation.mp4`,
          poster: `${dir}/logo-animation-poster.jpg`,
          width: 568,
          height: 1168,
          caption: "Logo animation on the splash screen.",
        },
        {
          type: "video",
          layout: "wide",
          src: `${dir}/onboarding.mp4`,
          poster: `${dir}/onboarding-poster.jpg`,
          width: 1000,
          height: 1000,
          caption: "Splash, onboarding and terms of use.",
        },
      ],
    },
    {
      id: "screens",
      nav: "Screens",
      title: "Key flows",
      blocks: [
        {
          type: "phoneFlow",
          title: "Sign up and log in",
          tone: "green",
          text: "Patients register with their mobile number and a one-time code, or log in with email and password.",
          screens: [
            { label: "Register", image: screen("auth-register", "Register your mobile number screen with illustration", 1166) },
            { label: "Verify", image: screen("auth-verify", "Verify your mobile number screen with a 4-digit code", 1161) },
            { label: "Log in", image: screen("auth-login", "Log in screen with email and password", 1156) },
          ],
        },
        {
          type: "phoneFlow",
          title: "Register a device",
          tone: "blue",
          text: "Patients pair their BiWaze Cough device by scanning the UDI barcode on its label. Each user connects one device at a time, and its name and serial number then appear on Home.",
          screens: [
            { label: "Instructions", image: screen("device-register", "Register your device screen explaining how to scan the UDI barcode", 1166) },
            { label: "Scan", image: screen("device-scan", "Barcode scanner screen", 1155) },
          ],
        },
        {
          type: "phoneFlow",
          title: "Home and adherence score",
          tone: "purple",
          text: "Home shows today's adherence score and the last seven days. The score comes from therapy completed on the device; patients can open a 14-day history or the details of their connected device.",
          screens: [
            { label: "Home", image: screen("profile-home", "Home screen showing the patient's adherence score of 85 and the last seven days", 1159) },
            { label: "Score history", image: screen("home-adherence-history", "Adherence score history screen", 1148) },
            { label: "Device", image: screen("home-device-details", "BiWaze Cough System device details screen", 1163) },
          ],
        },
        {
          type: "video",
          layout: "wide",
          background: "#ffffff",
          src: `${dir}/home-scroll.mp4`,
          poster: `${dir}/home-scroll-poster.jpg`,
          width: 1000,
          height: 1000,
          caption: "Scrolling the home screen: score, weekly view, device and therapy goals.",
        },
        {
          type: "phoneFlow",
          title: "Therapy goals",
          tone: "orange",
          text: "Patients choose which days to do therapy and how many sessions per day. Goals set by the healthcare team in the Arc Connect Portal appear here too.",
          screens: [
            { label: "Goals", image: screen("therapy-goals", "Therapy goals screen with active and inactive goals", 1156) },
            { label: "New goal", image: screen("therapy-set-goal", "Set a new therapy goal screen with days and therapies per day", 1156) },
          ],
        },
        {
          type: "phoneFlow",
          title: "Invitations and connections",
          tone: "green",
          text: "Patients invite caregivers and doctors, manage sent and received invitations, and share their medical data with their care team.",
          screens: [
            { label: "Share", image: screen("connections-share", "Home screen section inviting the patient to share information with their care team", 1159) },
            { label: "Invitations", image: screen("connections-invitations", "Invitations screen with sent invitations", 1166) },
            { label: "Connections", image: screen("connections-list", "My Connections screen listing a doctor and a hospital", 1156) },
          ],
        },
        {
          type: "phoneFlow",
          title: "Profile",
          tone: "blue",
          text: "Patients keep their personal information and medical summary up to date in one place.",
          screens: [{ label: "Personal info", image: screen("profile-personal-info", "Personal information screen", 1163) }],
        },
      ],
    },
    {
      id: "outcome",
      nav: "Outcome",
      title: "Outcome",
      blocks: [
        {
          type: "list",
          items: [
            "35 screens designed across sign-up, device registration, home, therapy goals, connections and profile.",
            "A connected loop with the Arc Connect Portal: goals set by clinicians appear in the app, and therapy data flows back to the care team.",
            "An illustration set and logo animation that give the app a warm, recognisable personality.",
            "Requirement notes and specifications for every flow, ready for development.",
          ],
        },
      ],
    },
  ],
  moreWork: {
    heading: "More from ABM Respiratory Care",
    items: [
      {
        title: "Arc Connect: Web Portal",
        meta: "Web portal · 2022",
        summary:
          "A clinician portal for managing patients by exception, giving healthcare teams an overview of therapy, goals and patient health information.",
        thumbnail: { src: "/case-studies/thumbs/arc-connect-portal.png", alt: "Arc Connect web portal cover", width: 808, height: 632 },
        href: "https://www.behance.net/gallery/181423391/Arc-Connect-Web-Portal",
        external: true,
      },
    ],
  },
}
