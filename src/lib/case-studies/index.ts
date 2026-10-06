import { biwazeVent } from "./biwaze-vent"
import type { CaseStudy } from "./types"

// Add new case studies here (e.g. Scimplify). Order = order shown in "More work".
export const caseStudyPages: CaseStudy[] = [biwazeVent]

export function getCaseStudy(slug: string) {
  return caseStudyPages.find((c) => c.slug === slug)
}

export type { CaseStudy } from "./types"
