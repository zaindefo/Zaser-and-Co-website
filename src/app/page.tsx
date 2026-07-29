import { Hero } from '@/components/home/Hero'
import { ServicesSection } from '@/components/home/ServicesSection'
import { CaseStudies } from '@/components/home/CaseStudies'
import { Insights } from '@/components/home/Insights'
import { ClarityScore } from '@/components/home/ClarityScore'
import { Founder } from '@/components/home/Founder'
import { FAQ } from '@/components/home/FAQ'
import { ContactInline } from '@/components/home/ContactInline'

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesSection />
      <CaseStudies />
      <Insights />
      <ClarityScore />
      <Founder />
      <FAQ />
      <ContactInline />
    </main>
  )
}
