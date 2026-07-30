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

export default function Home() {
  return (
    <main>
      <StackingPanels>
        <Hero />
        <ServicePanel index={0} />
        <ServicePanel index={1} />
        <CaseStudies />
        <Insights />
        <ClarityScore />
        <Founder />
        <FAQ />
        <ContactInline />
        <ContactFooterPanel />
      </StackingPanels>
    </main>
  )
}
