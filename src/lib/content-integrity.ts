import { AUDITS } from '../content/audits'
import { INDUSTRIES } from '../content/industries'
import { INSIGHTS } from '../content/insights'
import { ENGAGEMENT_OUTPUTS } from '../content/outputs'
import { POLICIES } from '../content/policies'
import { SERVICES } from '../content/services'
import { SITE } from '../content/site'

const bannedClaims = [
  'Glow by Rina',
  'FreshKart',
  'StyleHive',
  '8801700000000',
  'zasernco@gmail.com',
]

export function auditContentIntegrity(): string[] {
  const violations: string[] = []
  if (SERVICES.length !== 2) violations.push(`Expected 2 services; found ${SERVICES.length}.`)

  const content = JSON.stringify({ AUDITS, INDUSTRIES, INSIGHTS, ENGAGEMENT_OUTPUTS, POLICIES, SERVICES, SITE })
  for (const claim of bannedClaims) {
    if (content.includes(claim)) violations.push(`Unapproved claim or contact detail: ${claim}`)
  }

  return violations
}
