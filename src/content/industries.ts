import type { IndustryPage } from './types'

export const INDUSTRIES: IndustryPage[] = [
  {
    slug: 'ecommerce', title: 'E-Commerce Businesses', metaDescription: 'Operational strategy and practical AI implementation for growing e-commerce businesses.', headline: 'Turn order volume into an operation you can actually see.', intro: 'E-commerce complexity accumulates across pricing, advertising, fulfilment, returns, inventory, and customer support. The useful question is not whether the store is busy. It is whether each part of the operation reinforces profitable growth.',
    tensions: [{ title: 'Margin visibility', description: 'Delivery, returns, platform fees, promotions, and advertising can disconnect sales volume from contribution margin.' }, { title: 'Inventory decisions', description: 'Reorder and assortment decisions become expensive when velocity and cash exposure are unclear.' }, { title: 'Manual coordination', description: 'Order exceptions, reporting, and customer communication often scale faster than the systems supporting them.' }],
    diagnostic: ['Map contribution margin by product or category.', 'Trace order and exception workflows.', 'Identify the most credible automation opportunities.'],
  },
  {
    slug: 'education-businesses', title: 'Education Businesses', metaDescription: 'Management strategy and practical AI implementation for education and learning businesses.', headline: 'Build the system behind the learning experience.', intro: 'Education businesses coordinate content, acquisition, enrolment, delivery, learner support, and retention. A stronger operation makes those moving parts visible without flattening the human experience.',
    tensions: [{ title: 'Content operations', description: 'Production can become founder-dependent when research, drafting, review, and publishing lack a repeatable system.' }, { title: 'Learner visibility', description: 'Acquisition, engagement, completion, and retention need a connected operating view.' }, { title: 'Support load', description: 'Repetitive enrolment and learner questions can absorb time better used on teaching and improvement.' }],
    diagnostic: ['Map the learner lifecycle.', 'Separate high-value human work from repeatable coordination.', 'Prioritise improvements by operational impact.'],
  },
  {
    slug: 'service-businesses', title: 'Service Businesses', metaDescription: 'Management strategy and AI implementation for agencies and professional service businesses.', headline: 'Create leverage without losing the quality clients buy.', intro: 'Service businesses grow through expertise, but delivery can become increasingly dependent on the founder. Clear scope, pricing logic, handoffs, and knowledge systems allow quality to scale more deliberately.',
    tensions: [{ title: 'Pricing logic', description: 'Price can drift away from delivery cost, complexity, and the value created for the client.' }, { title: 'Founder dependency', description: 'Approvals, client communication, and problem-solving can concentrate around one person.' }, { title: 'Delivery variation', description: 'Unclear scope and inconsistent handoffs quietly consume margin and team capacity.' }],
    diagnostic: ['Trace the engagement lifecycle.', 'Map where founder intervention is truly necessary.', 'Build clearer pricing, process, and knowledge systems.'],
  },
  {
    slug: 'retail-businesses', title: 'Retail Businesses', metaDescription: 'Operational strategy and inventory intelligence for retail businesses.', headline: 'Make every stock and operating decision easier to defend.', intro: 'Retail connects purchasing, inventory, pricing, staffing, and channel operations. Better visibility turns those daily decisions from instinct into a manageable operating rhythm.',
    tensions: [{ title: 'Working capital', description: 'Cash becomes difficult to manage when inventory velocity and assortment performance are fragmented.' }, { title: 'Cost pressure', description: 'Rent, staffing, handling, and shrinkage need to be understood alongside product margin.' }, { title: 'Channel complexity', description: 'Physical and online activity can create duplicate processes and inconsistent information.' }],
    diagnostic: ['Map stock velocity and cash exposure.', 'Connect operating cost to product and channel decisions.', 'Identify where practical automation improves visibility.'],
  },
]

export const getIndustry = (slug: string) => INDUSTRIES.find((industry) => industry.slug === slug)
