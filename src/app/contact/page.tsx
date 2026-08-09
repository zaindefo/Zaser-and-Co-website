import type { Metadata } from 'next'
import { LeadForm } from '../../components/shared/LeadForm'
import { SectionLabel } from '../../components/editorial/SectionLabel'
import { SITE } from '../../content/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a focused conversation with Zaser & Co about AI implementation or operational performance.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <main>
      <section className="contact-page" data-nav-theme="light">
        <div className="contact-page__copy">
          <SectionLabel>Contact</SectionLabel>
          <h1 className="display display--xl">Where does the business <span className="authority">feel stuck?</span></h1>
          <p className="lede">Share the operating tension. We’ll respond by email and tell you whether one of the two Zaser engagements fits.</p>
          <div className="contact-details"><span>Email</span><a href={`mailto:${SITE.email}`}>{SITE.email}</a><span>Location</span><p>{SITE.location}</p><span>Response</span><p>Within 24 business hours</p></div>
        </div>
        <div className="contact-page__form"><LeadForm inquiryType="general" sourcePage="/contact" /></div>
      </section>
    </main>
  )
}
