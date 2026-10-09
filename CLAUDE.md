# Sathi Midya portfolio website: project guide for Claude

You are helping me, **Sathi Midya** (Product Designer, Bangalore), continue building my personal portfolio website. The code already exists; work on top of it, don't start over.

## Where things live
- **Repo:** https://github.com/SathiMidya71/portfolio-website (my personal account, branch `main`). Never use my work GitHub account `sathi-design`.
- **Local folder:** `~/Desktop/Sathi Portfolio Website`
- **Run locally:** `npm install`, then `npm run dev -- -p 3000` and open http://localhost:3000
- **Before committing:** run `npx tsc --noEmit` and `npx eslint src`. Don't run `next build` while the dev server is running, because it corrupts `.next`. If that happens, stop the server, run `rm -rf .next` and restart.

## Stack
- Next.js 15 (App Router, Turbopack), React 19, TypeScript
- Tailwind CSS v4: tokens via `@theme inline` in `src/app/globals.css`, and the `!` suffix for important
- shadcn/ui (radix-nova preset) for Badge, Button, Card, Separator and Sonner
- lucide-react for icons; brand icons are hand-written SVGs
- No backend. All content is typed data in `src/lib/`.

## Design direction
The site is inspired by https://www.benshih.design/: its layout patterns, type scale and colour feel. **Never copy its text.**

**Fonts** (next/font; the CSS variables must sit on `<html>`, not `<body>`):
- Headings: Bricolage Grotesque, standing in for Acorn, which is a sans-serif
- Body: Figtree
- Handwritten notes: Caveat
- Roboto is used only inside the Arc Connect case study, because it is the app's own typeface.

**Colours** (`globals.css`):
- Page: cream `#f9f4ed`, brand green `#02594e`
- Text: ink `#344054`, body `#4c6763`, soft `#6b7f7c`, line `#ece4d8`, sand `#f2ece3`
- Tones (charts and accents): green `#02594e`, orange `#e8833a`, purple `#6e62e5`, blue `#2e90fa`
- Pastel accents: `#ffd6ae`, `#d9d6fe`, `#b2ddff`
- Hover accent for links and footer: purple (`--tone-purple`)

**Header** (`site-header.tsx`):
- Left: my photo and name.
- Centre: a white pill (Home, Work, About, Experience). The active item is filled with brand green and follows the section in view; on `/work/*` pages, Work is active.
- Right: a black "Say hello" button (mailto) and a LinkedIn button.
- On scroll, the name and buttons fade out and only the pill stays sticky, with a shadow.

**Home page** sections:
- Hero: gradient H1, company chips, and a fan of 4 tilted hero cards. The video card has a focus/blur hover, a play button and a Caveat annotation.
- Case studies: compact cards, text on the left (`1.5fr`) and thumbnail on the right (`1fr`). ABM cards show the ABM logo plus "abmrc.com ↗".
- About, Experience, Skills, Testimonials, Contact, Footer.

## Content rules (important)
- **Keep everything authentic.** Never invent metrics, quotes, research or team details. If something is missing, leave a clearly marked placeholder and ask me.
- BiWaze Vent uses my résumé metrics: ~30% fewer errors, ~20% higher engagement, ~25% less dev time, 100% on-time delivery.
- Arc Connect has no published outcome metrics. It shows "Project at a glance" scope facts instead: 35 screens, 4 core areas, 14-day adherence history, 2 care settings.
- Prefer coded visuals (SVG/HTML) over screenshots. Code the text in presentation boards as real text; keep only the phone screens and illustrations as images.
- Use free-licence images only (Unsplash/Pexels), never random Google images.
- My contact details:
  - Email: virgosathi71@gmail.com
  - LinkedIn: https://linkedin.com/in/sathimidya
  - Behance: https://behance.net/virgosathi0041
  - The résumé PDF in `public/` is intentionally published, including my phone number.

## Architecture
- `src/lib/content.ts`: all home page copy, including profile, nav, hero cards, case study cards, experience, skills and testimonials.
- `src/lib/case-studies/types.ts`: the `CaseStudy` type and a `Block` union. Each case study is a list of sections made of typed blocks.
- Block types:
  - Text: `p`, `lead`, `h3`, `list`, `cards`, `chips`
  - Images and diagrams: `figure`, `problemVisual`, `diagram`, `illustrations`
  - Research: `findings`, `interviews`, `quotes`, `perspective`, `personas`, `quadrants`
  - Process and systems: `phases`, `visualSystem`, `designSystem`
  - Mobile and motion: `phoneFlow`, `video`, `showcase`, `homeBoard`
  - Added for Deep Research (generic, reusable): `flow`, `principle`, `shift`, `insights`, `journey`, `tree`, `media` (real screenshots and demo clips in a browser frame with a soft layered shadow, straight on the page background, no container, extra top spacing when it carries a section heading; always one per row at full width; videos are click-to-play, never autoplay; optional `note` = a taped, tilted yellow sticky note with the section's pointers above the first item at the right, overlapping only its top bars (browser bar + app header), each note a different pastel; the section `heading` + `intro` sit beside the note on the left (stacked on phones)), `kioskStage` (huge faint beige title on the page background, partly hidden behind a coded, tilted touchscreen monitor on a stand; optional `notes` groups (Home screen, Ask in your own words) form a panel overlapping its bottom edge; the screen is a real screenshot; style from a Behance reference, rebuilt in code because that image isn't free to use), `specs`, `typeHierarchy`, `palette` (rendered as a colour stage), `problemSolution`, `steps`, `stats` (big-number cards, real figures only), `markedImage` (notebook-style pen circles, arrows and handwritten notes over an image, in image coordinates), `lessons` (big faint numerals, divider, no cards), `finale` (closing lines in ink/green/purple + handwritten sign-off), `pegboard` (pinned sketches with tilts, push pins and handwritten tags), `cycle` (presentation-board loop: huge faint numerals, pastel icon discs, dotted connectors and a handwritten return arc; last title in brand green), `lead.emphasis` (editorial statement with a green second sentence), `h3.spaced`; `personas` also accepts `about`, `facts`, `needs`, `quote` for a rich single-persona card
- `src/lib/case-studies/*.ts` hold the case study data files; register new ones in `index.ts`.
- Page template: `src/app/work/[slug]/page.tsx`. It shows:
  - Header meta: overview, role, team, timeline
  - Hero image (`object-contain` 16/9 when `background: "transparent"`)
  - Impact metrics (compact 2×2 cards with a pointer line)
  - A sticky table of contents with scrollspy
  - Sections, then "More work" (cards plus a gradient "Let's talk" banner with brand icons)
- `src/components/case-study/` holds the block renderers:
  - `blocks.tsx`: the switch
  - `impact-metrics.tsx`, `toc.tsx`, `research-blocks.tsx`, `process-timeline.tsx`, `more-work.tsx`
  - `ventilator-problem-visual.tsx`: coded SVG
  - `arc-user-flow.tsx`: coded SVG flowchart with scalloped "burst" nodes, colour-coded by area, and dashed shortcuts
  - `design-system.tsx`: typography, colour capsules with photos, and Lucide icon grid
  - `mobile-blocks.tsx`: PhoneFlowView, VideoView, ShowcaseView, HomeBoardView
  - `deep-research/`: `blocks.tsx` (the new block renderers), `media.tsx` + `demo-video.tsx` (screenshots open full size; clips are click-to-play with a large Play button, pause when scrolled away, MP4 with a WebM fallback), `diagrams.tsx` (core research flow lanes), `fonts.ts` (Inter), `showcase.tsx` (reference-board styles: problem/solution split, pill-and-connector user flow `dr-journey-map`, colour stage)
  - `loop-video.tsx`: client component that sets `muted` and calls `play()`, because React doesn't SSR `muted`; it respects reduced motion

## Case studies so far
1. **BiWaze Vent** (`/work/biwaze-vent`), a ventilator UI for ABM Respiratory Care. Source: https://www.behance.net/gallery/188179087/
   - It covers: problem visual, interviews (participant summary only), staggered serif quotes, a findings bento (separators only, no containers), and a process timeline on the page background (3 months / 64 hours / 70+ screens).
2. **Arc Connect lung health app** (`/work/arc-connect-app`). Source: https://www.behance.net/gallery/174251777/
   - Sections:
     - Context: acute and home care
     - Structure: coded user flow
     - Design system: Roboto; brand Green `#A9D158`, Blue `#3798BF`, Sky `#6CE3FF`, Orange `#F26930`; neutrals
     - Screens: see the list below
     - Outcome
   - Screens:
     - The onboarding `showcase`: the original Behance animation upscaled 2×, on a `#2d2d2d` container that matches how Chrome renders the video's background, with feathered edges. The "Authentication" label, the large faint "Onboarding" word and the paragraph are coded.
     - Phone flows: sign-up/login, device registration, home and adherence.
     - The Home `homeBoard`: a 2× phone recording on a white card, with coded "Home", "We care for you", subtitle and paragraph. The illustration is the original 600px Behance asset.
     - Therapy goals, invitations and connections, and Profile (Edit profile, Personal info, Medical condition, Settings).
3. **SCINODE Deep Research** (`/work/deep-research`), Scimplify, 0 → 1 AI research workspace for chemists. Source: Sathi's own write-up (Oct 2026).
   - Condensed (Oct 2026) at Sathi's request: short, simple words, framed as "Designing a GenAI product"; never write "0 → 1", use "new product", "built from the ground up" or "concept to launch", sections in order: Overview, Problem, Research (ends with an h3 "Persona" above the persona board), Empathy map (`empathyMap`: says/thinks/does/feels on a dashed cross around Prem's portrait, plus pains/gains, derived from the write-up and persona), Journey & flow, Ideation (pegboard of 10 notebook pages incl. chemist feedback and an A/B test of new vs old UI, `sketches/idea-*.jpg`, cropped and enhanced: paper whitened by dividing out the background, ink saturated and sharpened), Typography & colour, Key decisions (7), Launch week, Learnings (Outcome section deleted as repetitive; Learnings trimmed to 2 `lessons` + a `finale` statement with a handwritten "Thanks for reading", no cards). Launch week: (30 Sep – 6 Oct 2026: 18 active users, 29 research threads, 13 users researched a molecule. Sathi does NOT want cost, tokens, model calls or waste shown. `launch-dash-marked.jpg` is her dashboard with everything blurred except Users, Threads and Molecules per user (cost hints and the email table blurred too), shown via `markedImage` with red pen circles, yellow curvy arrows and handwritten notes; never use the unblurred original). Keep it scannable; don't re-add long lists.
   - Visual style follows her reference boards, but every board sits on the page background (no lavender stages or tinted containers): large light headings, pill nodes, rounded colour squares. Reference charts with percentages (validation, sentiment, usability groups) are NOT used until she provides real results.
   - Real product media only (never recreate product UI): from Sathi's walkthrough video (5:12, 1080p). The source video has non-square pixels (SAR 1629:1384): always extract with `scale=trunc(iw*sar/2)*2:ih,setsar=1`, giving 2258×1080 stills and 1600×766 clips (H.264 CRF 25 + VP9 WebM, muted, waits sped up, posters `*-poster-v2.jpg` at 35%). Sathi prefers one video per feature over screenshot + video. Removed at her request: My Repository video, route analysis screenshot, new-variant video.
   - `screens/home-light.jpg` (true aspect, 16:10 crop) is shown in the section 1 kiosk mockup.
   - Hero `hero-lab.jpg`: Sathi's lab stock photo with the Modify Path screenshot perspective-warped onto the green screen (OpenCV); glass tubes in front are kept by chroma-keying only the bottom-left. Also used as the home card and link preview image.
   - Purple for this case study is #B79CEC (Sathi), set via `accent` on the CaseStudy: it overrides --tone-purple on <main>, with --tone-purple-ink #6B4CB8 for text on cream and --on-purple #2B2150 for text on purple fills (white on #B79CEC is unreadable). Palette: deep green #1F392D, purple #4A307D, lavender #B79CEC, warm white #FCFAF6.
   - Persona: Prem Kumar, Senior Scientist at Scimplify, 16–20 years, AI confidence Medium–High. `personas.layout: "board"` renders `persona-board.tsx`: an illustrated desk scene (face crop `persona-prem-face.jpg` in a dashed AI halo with sparkles, speech-bubble quote, name plate on a line-drawn desk with flask, papers, mug and laptop, handwritten blue notes with dotted leaders for experience, AI confidence meter, goals, frustrations and needs). Phones show the rich card instead.
   - Key decisions follow Sathi's product slides: 1 Home + Ask (kiosk), 2 The agent gets to work, 3 Every route ranked and diagrammed, 4 Edit the route, 5 From mmol to batch quantities, 6 Every route traced to its evidence, 7 A research partner that gets better as you work.
   - No adoption metrics: "Project at a glance" shows scope facts (0 → 1, 8 stages, 9 screens, UX → code).
- Card for **Arc Connect Web Portal** links to Behance: https://www.behance.net/gallery/181423391/Arc-Connect-Web-Portal

## Asset pipeline (how existing assets were made)
- **Tools:** Python with PIL and OpenCV, and ffmpeg. Everything goes in `public/case-studies/<slug>/`.
- **Phone screens:**
  - Cut from the Behance boards at 560px wide, as RGBA PNGs with transparency outside the phone.
  - Orange presentation arrows are removed with OpenCV inpainting.
  - Text the arrows covered is redrawn in Roboto.
  - The bezel and header can be copied from a clean phone, since all phones share the same frame.
- **GIFs to MP4:**
  - Crop, then denoise only the colourful areas (median + NL-means masked by saturation) so text stays sharp.
  - Upscale 2× with Lanczos and a mild unsharp mask.
  - Encode H.264 with bt709 tags (`yuv420p`, `+faststart`).
- **Overwritten files:** after overwriting an image under the same name, rename it, because the Next image cache serves stale versions.

## Open items (ask me)
- Instagram URL (`profile.links.instagram` in `content.ts`)
- BiWaze: per-role interview counts, US marketing team feedback, and confirmation of team, year and "64 hours"
- Scimplify logo (for the Deep Research card on the home page)
- Deep Research: confirm the sampled palette, the year/duration, and any real validation or usability results (would unlock the reference-style insight charts). The video doesn't show the Scale/target-quantity input or Optimization (marked "coming soon").
- Role title: Deep Research says "Senior Product Designer", the Experience section says "Product Designer" at Scimplify. Confirm which is right.
- An original high-resolution export (Lottie/After Effects/MP4) of the Arc Connect logo animation, to replace the upscaled GIF
- I must delete the empty repo `sathi-design/portfolio-website` myself.

## How to work with me
- Make small, verified changes. After each change, check the page in the browser at desktop and phone width, then commit and push to `main` with a clear message.
- When I send a screenshot reference, match its layout and interaction closely, but use my content.
- Give a short summary after each change: what changed, what I should look at, and anything you couldn't do.
