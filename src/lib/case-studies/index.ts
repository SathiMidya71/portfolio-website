import { arcConnectApp } from "./arc-connect-app"
import { arcConnectPortal } from "./arc-connect-portal"
import { biwazeVent } from "./biwaze-vent"
import { deepResearch } from "./deep-research"
import type { CaseStudy } from "./types"

// Add new case studies here (e.g. Scimplify). Order = order shown in "More work".
export const caseStudyPages: CaseStudy[] = [deepResearch, biwazeVent, arcConnectApp, arcConnectPortal]

export function getCaseStudy(slug: string) {
  return caseStudyPages.find((c) => c.slug === slug)
}

export type { CaseStudy } from "./types"
