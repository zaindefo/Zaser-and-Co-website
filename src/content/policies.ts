import type { Policy } from './types'

export const POLICIES: Policy[] = [
  {
    id: 'scope', number: '01', title: 'Scope of Engagement', summary: 'The signed agreement defines the work.',
    paragraphs: [
      'Every engagement begins with a written Engagement Agreement signed by both parties. It defines the service, deliverables, timeline, included revision rounds, and payment terms.',
      'Work outside the defined scope requires a written scope amendment. When an out-of-scope request arises, the team pauses, documents it, and issues a revised proposal before proceeding.',
      'Verbal agreements, informal messages, and implied understandings do not alter scope. Only the signed agreement and written amendments govern the engagement.',
    ],
  },
  {
    id: 'confidentiality', number: '02', title: 'Confidentiality & Data Protection', summary: 'Client information remains protected and controlled.',
    paragraphs: [
      'Financial records, operational data, strategic plans, team information, customer data, and all other information shared during an engagement are strictly confidential.',
      'Zaser & Co will not disclose, publish, reference, or share client information externally without explicit written consent, including in social media, case studies, portfolios, or prospective-client conversations.',
      'Client data is stored only in the firm’s designated secure cloud system. It must not be stored on personal devices, transferred through unsecured channels, or kept in personal email accounts.',
      'At completion or termination, data is archived securely. A client deletion request will be completed within 14 business days with written confirmation. Violations trigger immediate review and may remove a team member from client-facing work.',
    ],
  },
  {
    id: 'intellectual-property', number: '03', title: 'Intellectual Property', summary: 'Clients own paid deliverables; Zaser retains its frameworks.',
    paragraphs: [
      'Reports, roadmaps, dashboards, automations, presentations, scorecards, and documentation created for an engagement become the client’s intellectual property after full payment.',
      'Zaser & Co retains its proprietary frameworks, templates, and methodologies, including the five-dimension AI Readiness Audit and Operations Diagnostic framework, and may reuse anonymised, non-attributable versions across engagements.',
      'Clients may use all deliverables internally without restriction but may not resell, sublicense, or commercially distribute Zaser proprietary frameworks or templates.',
    ],
  },
  {
    id: 'conduct', number: '04', title: 'Professional Conduct & Ethics', summary: 'Evidence, accuracy, and professional judgment are mandatory.',
    paragraphs: [
      'Client communication must be clear, factual, and free of speculation. Unknowns are acknowledged with a stated resolution timeline.',
      'The firm’s capabilities may not be overstated, credentials may not be fabricated, and outcomes may not be promised beyond the agreed scope.',
      'Findings, data, and recommendations must be accurate and verifiable. Fabricated data, inflated metrics, or unverified information presented as fact are terminable offences.',
      'Team members must be punctual and notify clients before a deadline is at risk. Personal opinions about a client’s business, staff, or decisions do not belong in client-facing work; analysis must remain structured and evidence-based.',
    ],
  },
  {
    id: 'conflicts', number: '05', title: 'Conflict of Interest', summary: 'Active clients are protected from undisclosed competitive conflicts.',
    paragraphs: [
      'No team member may advise a direct competitor of an active client during the engagement or for six months after completion.',
      'Potential conflicts arising from relationships, prior work, or overlapping industry connections must be disclosed immediately to the engagement lead for assessment and possible reassignment.',
      'Zaser & Co will not knowingly accept simultaneous engagements from direct competitors in the same segment unless both clients are informed and provide written consent.',
    ],
  },
  {
    id: 'communication', number: '06', title: 'Communication Standards', summary: 'Communication is timely, documented, and professional.',
    paragraphs: [
      'Client messages are acknowledged within four business hours and receive a substantive response within 24 business hours. If resolution requires longer, an interim response states the expected timeline.',
      'Communication uses the agreed email, project-management tool, or scheduled calls. WhatsApp and personal social media are not engagement channels unless explicitly agreed in writing.',
      'Written communication is precise, factual, and professional. Client-facing messages avoid emojis, exclamation marks, and casual language.',
      'Calls, meetings, and significant decisions are documented within 24 hours and shared for confirmation. Concerns are escalated within two business hours; the engagement lead responds within 24 hours with an acknowledgement and resolution plan.',
    ],
  },
  {
    id: 'deliverables', number: '07', title: 'Deliverable Standards', summary: 'Every deliverable is accurate, complete, reviewed, and usable.',
    paragraphs: [
      'Deliverables follow the Zaser brand system: approved colors, Bebas Neue, Instrument Serif, Plus Jakarta Sans, DM Mono, and correct logo use.',
      'At least one team member other than the author reviews every deliverable before delivery. Data, calculations, charts, and figures are verified against source data; estimates are clearly labeled.',
      'Deliverables include an executive summary, clear structure, and actionable recommendations. Reports are normally delivered as PDF, while working models and dashboards are delivered in their native format with client access.',
    ],
  },
  {
    id: 'payment', number: '08', title: 'Payment Terms', summary: 'Engagements use fixed fees and defined milestones.',
    paragraphs: [
      'The payment structure is fixed-fee and milestone-based as defined in the Engagement Agreement. A deposit is required and confirmed before work begins.',
      'The remaining balance is due when final deliverables have been presented and shared. Work may pause after a payment is overdue by more than 14 business days, following written notice.',
      'The deposit is non-refundable after work begins. On early termination, the client receives completed deliverables and pays for completed phases.',
      'Travel, software, and third-party expenses require written pre-approval and are invoiced separately at cost without markup.',
    ],
  },
  {
    id: 'termination', number: '09', title: 'Engagement Termination', summary: 'Either party may end an engagement through a documented process.',
    paragraphs: [
      'A client may terminate with seven days’ written notice and receives work completed through the termination date; payment remains due for completed phases.',
      'Zaser & Co may terminate when required data or access remains unavailable for 14 days, a client is abusive or threatening, or payment remains unmet after two written reminders. Seven days’ written notice is provided.',
      'Completed work, documentation, and client data are handed over within 10 business days. Both parties agree not to make public disparaging statements following termination.',
    ],
  },
  {
    id: 'revisions', number: '10', title: 'Revision & Feedback Policy', summary: 'Feedback stays consolidated and within the agreed scope.',
    paragraphs: [
      'Each major deliverable normally includes two revision rounds. One round means one consolidated set of feedback received within five business days of submission.',
      'Feedback is supplied through one consolidated document or message. Fragmented feedback across channels does not constitute a formal round.',
      'Revisions adjust the existing deliverable within scope. New analysis, additional deliverables, or scope changes require a written amendment.',
      'Revised work is normally returned within five business days. Additional rounds may be scoped and agreed in writing before work proceeds.',
    ],
  },
  {
    id: 'case-studies', number: '11', title: 'Case Studies & Testimonials', summary: 'Nothing is published without explicit client permission.',
    paragraphs: [
      'No case study, testimonial, portfolio reference, or public client mention is made without explicit written consent.',
      'The client reviews and approves content before publication and may request changes or decline participation entirely.',
      'Where requested, material is anonymised to industry, company size, and geography without identifying details. Approved material may be used on the website, social channels, proposals, and direct prospective-client conversations.',
    ],
  },
  {
    id: 'training', number: '12', title: 'Team Training & Competency', summary: 'Client delivery requires demonstrated service competence.',
    paragraphs: [
      'Every team member completes the internal Skill Tree: 45 nodes across 189 training hours in Prerequisite, Foundational, Intermediate, and Delivery-Ready tiers with mandatory simulation gates.',
      'No team member may lead or independently deliver client work until completing the relevant service tree and passing the mandatory Forage simulation gate.',
      'Training progress, completion dates, and competency status are logged and reviewed quarterly. Team members dedicate at least two hours each week to skills maintenance, tool evaluation, or framework development outside active delivery.',
    ],
  },
  {
    id: 'quality-assurance', number: '13', title: 'Quality Assurance & Internal Review', summary: 'Every completed engagement becomes a learning loop.',
    paragraphs: [
      'A post-delivery review assesses deliverable quality, timeline adherence, client satisfaction, complaint resolution, and lessons for future frameworks, templates, and training.',
      'The review is completed within 10 business days of engagement closure and stored in the firm’s internal knowledge base.',
    ],
  },
  {
    id: 'anti-bribery', number: '14', title: 'Anti-Bribery & Anti-Corruption', summary: 'Zaser operates with zero tolerance for improper influence.',
    paragraphs: [
      'No team member may offer, promise, give, request, or accept payment, gifts, hospitality, or favors intended to influence a decision, secure work, or obtain preferential treatment.',
      'Modest, infrequent hospitality in the normal course of business is acceptable only when reasonable and free from obligation or expectation.',
      'Potential bribery or corruption concerns must be reported immediately to firm leadership.',
    ],
  },
  {
    id: 'governing-law', number: '15', title: 'Governing Law & Dispute Resolution', summary: 'Engagements are governed by the laws of Bangladesh.',
    paragraphs: [
      'Engagement Agreements and the professional relationship are governed by the laws of the People’s Republic of Bangladesh.',
      'Disputes first move through good-faith negotiation. If unresolved after 30 days, the matter proceeds to mediation; if mediation fails, either party may pursue resolution through the appropriate courts of Dhaka, Bangladesh.',
      'Zaser & Co maintains professional indemnity awareness appropriate to its scale and will obtain formal professional indemnity insurance as the firm grows.',
    ],
  },
]
