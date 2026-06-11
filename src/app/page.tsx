import { Hero } from '@/components/home/Hero'
import { BlindGrowth } from '@/components/home/BlindGrowth'
import { ServicesSection } from '@/components/home/ServicesSection'
import { HowWeWork } from '@/components/home/HowWeWork'
import { PainStories } from '@/components/home/PainStories'
import { ClarityScore } from '@/components/home/ClarityScore'
import { ModuleCards } from '@/components/home/ModuleCards'
import { Testimonials } from '@/components/home/Testimonials'
import { Founder } from '@/components/home/Founder'
import { FAQ } from '@/components/home/FAQ'
import { ContactInline } from '@/components/home/ContactInline'
import { SectionDivider } from '@/components/shared/SectionDivider'

export default function Home() {
  return (
    <main>
      <Hero />
      <SectionDivider type="line" />
      <BlindGrowth />
      <ServicesSection />
      <SectionDivider type="line" />
      <HowWeWork />
      <SectionDivider type="grid" />
      <PainStories />
      <SectionDivider type="pulse" />
      <ClarityScore />
      <SectionDivider type="line" />
      <ModuleCards />
      <SectionDivider type="pulse" />
      <Testimonials />
      <SectionDivider type="line" />
      <Founder />
      <SectionDivider type="grid" />
      <FAQ />
      <ContactInline />
    </main>
  )
}
