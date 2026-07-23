import { Hero } from '@/components/home/Hero'
import { ServicesSection } from '@/components/home/ServicesSection'
import { Insights } from '@/components/home/Insights'
import { ClarityScore } from '@/components/home/ClarityScore'
import { ModuleCards } from '@/components/home/ModuleCards'
import { Testimonials } from '@/components/home/Testimonials'
import { Founder } from '@/components/home/Founder'
import { FAQ } from '@/components/home/FAQ'
import { ContactInline } from '@/components/home/ContactInline'

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesSection />
      <Insights />
      <ClarityScore />
      <ModuleCards />
      <Testimonials />
      <Founder />
      <FAQ />
      <ContactInline />
    </main>
  )
}
