import { Hero } from '@/components/home/Hero'
import { ServicePanel } from '@/components/home/ServicesSection'
import { CaseStudies } from '@/components/home/CaseStudies'
import { Insights } from '@/components/home/Insights'
import { ClarityScore } from '@/components/home/ClarityScore'
import { Founder } from '@/components/home/Founder'
import { FAQ } from '@/components/home/FAQ'
import { ContactInline } from '@/components/home/ContactInline'
import { ContactFooterPanel } from '@/components/home/ContactFooterPanel'
import { StackingPanels } from '@/components/shared/StackingPanels'

/**
 * The stacking-panel transition is deliberately used at two boundaries only —
 * services → insights, and FAQ → contact. Every other section keeps the standard
 * scroll reveal, so the effect stays an accent rather than the whole page.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <ServicePanel index={0} />

      <StackingPanels>
        <ServicePanel index={1} />
        <Insights />
      </StackingPanels>

      <CaseStudies />
      <ClarityScore />
      <Founder />

      <StackingPanels>
        <FAQ />
        <ContactInline />
      </StackingPanels>

      <ContactFooterPanel />
    </main>
  )
}
