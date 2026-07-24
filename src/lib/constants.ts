// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: 'Services', href: '/#services' },
  { label: 'StockPulse', href: '/stockpulse' },
  { label: 'Insights', href: '/insights' },
  { label: 'Policies', href: '/policies' },
]

// ─── Hero ─────────────────────────────────────────────────────────────────────

export const HERO = {
  badge: 'STRATEGIC & MANAGEMENT CONSULTANCY',
  headline: [
    'Your business',
    'deserves',
    'a sharper',
    'strategy.',
  ],
  subheadline:
    'Zaser & Co is a strategic and management consultancy for small and medium businesses. We bring financial clarity, operational intelligence, and AI-powered systems — at a price built for where you are right now.',
  primaryCTA: 'Book your free session',
  secondaryCTA: 'See how it works',
}

// ─── Ticker — real market observations ──────────────────────────────────────

export const TICKER_ITEMS = [
  'Strategic & management consultancy for growing businesses',
  'Every engagement starts with a free strategic assessment',
  'Structured advisory for businesses doing ৳2L–50L/month',
  'Two services, one partner: strategy that delivers',
  'AI Audit & Implementation · Management & Operations Strategy',
]

// ─── The Problem ─────────────────────────────────────────────────────────────

export const PROBLEM_SECTION = {
  headline: [
    'You\'re working harder than ever.',
    'So why isn\'t it getting easier?',
  ],
  body: [
    'Revenue is climbing. Orders are coming in. Your team is growing. But the strategy underneath it all — the financial model, the operational structure, the systems — hasn\'t kept pace.',
    'That gap between activity and strategy is where businesses stall. Not from lack of effort. From lack of structure.',
    'Zaser & Co closes that gap. We bring the strategic and management thinking that growing businesses need — and we build the systems that make it stick.',
  ],
}

export const PROBLEM_STATS = [
  {
    title: 'Where is your money actually going?',
    body: 'You know your revenue. But do you know what you actually keep after every cost? Most business owners don\'t — and the gap between those two numbers is where profit quietly disappears.',
  },
  {
    title: 'How much of your week is wasted on tasks AI could handle?',
    body: 'You\'re spending 2–3 days every week on repetitive work — replies, reports, data entry — that a simple automation could do in minutes. That\'s time you could be spending on growth.',
  },
  {
    title: 'Is your stock helping you grow — or holding you back?',
    body: 'Right now, 15–25% of the money you\'ve put into inventory is sitting in products that aren\'t selling. That\'s not stock — it\'s cash you can\'t use.',
  },
]

// ─── Cost breakdown layers (used in waterfall animation) ────────────────────

export const COST_BREAKDOWN_LAYERS = [
  { label: 'COGS & production', amount: 320000, running: 480000 },
  { label: 'Courier charges', amount: 64000, running: 416000 },
  { label: 'Ad spend', amount: 120000, running: 296000 },
  { label: 'Returns & refunds', amount: 48000, running: 248000 },
  { label: 'Packaging', amount: 24000, running: 224000 },
  { label: 'Platform fees', amount: 16000, running: 208000 },
  { label: 'Payment processing', amount: 12000, running: 196000 },
  { label: 'Rent + salaries', amount: 149000, running: 47000 },
]

// ─── Five Service Pillars ───────────────────────────────────────────────────

export const SERVICE_PILLARS = [
  {
    id: 'ai-audit',
    number: '01',
    title: 'AI Audit & Implementation',
    tagline: 'Your strategic partner in AI transformation.',
    description:
      'We assess your business across five dimensions of AI readiness — Strategy, Data, Technology, People, and Governance — to determine where you stand and where AI can create the most value. We then identify the highest-impact opportunities, prioritise them by feasibility and ROI, and build working AI systems that integrate into your actual operation. We do not recommend. We build.',
    problems: [
      'I need a strategy for AI in my business, not just another tool to try',
      'I want someone to audit my workflow and tell me exactly where AI fits',
      'I need the implementation done for me, not a recommendation to do it myself',
    ],
    deliverables: [
      'AI Readiness Audit Report — scored assessment across all five dimensions',
      'Prioritised Implementation Roadmap — ranked by impact, feasibility, and cost',
      'One Working AI System — built and integrated into your operation',
      'Client Handover Documentation — technical docs, operating instructions, and training',
    ],
    frameworks: ['Strategy', 'Data', 'Technology', 'People', 'Governance'],
  },
  {
    id: 'management-operations',
    number: '02',
    title: 'Management & Operations Strategy',
    tagline: 'Your strategic partner in operational performance.',
    description:
      'We diagnose your cost structure, identify where margin is being lost, and implement targeted restructuring across pricing, process, and resource allocation — so that growth translates into actual profit. Operational inefficiency is a strategy problem, not an admin problem. We treat it as such.',
    problems: [
      'My costs are rising but I don\'t have a strategy to control them',
      'I need someone to look at my operations objectively and tell me what to fix',
      'I want a structured plan for improving my margins, not generic advice',
    ],
    deliverables: [
      'Operations Diagnostic Report — cost structure, process flows, and margin analysis',
      'Cost Structure Map — fixed, variable, and semi-variable breakdown with contribution margin',
      '90-Day Improvement Roadmap — Quick Wins, Medium-Term Fixes, and Strategic Changes',
      'Client Presentation Deck — 10–12 slide executive presentation of findings',
    ],
    frameworks: ['Lean', 'Kaizen', 'PDCA', 'DuPont ROE', 'Value Stream Mapping', 'CVP Analysis'],
  },
]

export const SERVICE_PILLAR_IMAGES: Record<string, string> = {
  'ai-audit':
    'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1400&h=900&fit=crop&q=85',
  'management-operations':
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&h=900&fit=crop&q=85',
}

// ─── How We Think (process steps) ───────────────────────────────────────────

export const METHODOLOGY_PILLARS = [
  {
    number: '01',
    title: 'Diagnose',
    description:
      'We start with a structured assessment. We sit with you, analyse your numbers, walk through your operations, and identify exactly where the strategic gaps are. That\'s your Clarity Score™, and it takes 30 minutes.',
  },
  {
    number: '02',
    title: 'Prioritise',
    description:
      'Not every gap needs closing at once. We identify the 2–3 strategic interventions that will make the biggest difference right now, and we sequence them in a framework that makes sense for your business and your budget.',
  },
  {
    number: '03',
    title: 'Implement',
    description:
      'This is where we\'re different. We don\'t hand you a report and walk away. We build the dashboards, implement the systems, write the SOPs, create the content frameworks. We do the work, not just the strategy.',
  },
  {
    number: '04',
    title: 'Partner',
    description:
      'Everything we build is designed to keep working after the engagement. Systems update on their own. AI runs in the background. Your team knows how to use them. And when you need us again — we pick up right where we left off.',
  },
]

// ─── Insights (B2B editorial blog articles) ──────────────────────────────────

export const INSIGHTS = [
  {
    id: 'revenue-trap',
    number: '01',
    category: 'Financial Strategy',
    tag: 'THE BLIND SPOT',
    format: 'Common Mistake',
    readTime: '6 min read',
    headline: "You made ৳10 lakh last month.\nHow much of it did you actually keep?",
    execSummary: "Most business owners know their revenue number. Almost none of them know their real take-home after every expense is counted. That gap is where profit quietly disappears — and it takes less than 30 minutes to see it clearly for the first time.",
    toc: ['The number everyone tracks — and the one that matters', 'What happens when you add it all up', 'How we help you see it clearly', 'Story: Glow by Rina'],
    painPoint:
      "Every morning you check your orders. Sales are coming in. The number looks healthy. You start thinking — maybe I should hire someone, add more products, spend more on ads. Things feel like they're working. And in a way, they are. Revenue is real. But revenue is not profit.",
    emotionalBridge:
      "We've sat with hundreds of business owners and asked them one question: after your product cost, delivery, ads, platform fees, packaging, returns, and your own time — what do you actually keep from each order? Most of them go quiet. A few pull out their phone and start adding things up on the spot. The number is almost always smaller than they expected. Sometimes a lot smaller.",
    solution: {
      intro: "Here's what we do together:",
      steps: [
        'We sit with your real numbers — not guesses — and add up every single cost that goes into making one sale',
        'We build you a simple live dashboard so you can see your actual profit any day of the month, not just at year-end',
        'We track your real margin, not your revenue — so you know what you actually keep each month',
        'Before you make any big spending decision, we run the numbers first so you know the outcome before it happens',
      ],
    },
    caseStudy: {
      label: 'REAL STORY',
      title: 'Glow by Rina — Dhaka',
      text: "Rina ran a skincare business doing ৳8 lakh a month in sales. She thought she was making around ৳1.5 lakh profit. When we sat with her actual expenses — products, packaging, delivery, ads, returns, platform fees — her real take-home was ৳47,000. We fixed her pricing, found two costs she was paying for without knowing, and in 90 days her real profit was ৳1,82,000. Same revenue. Very different result.",
      stat: '৳47K → ৳1.82L',
      statLabel: 'real monthly profit after 90 days',
    },
    cta: { label: 'See what you actually keep', href: '/#contact' },
  },
  {
    id: 'silent-bleed',
    number: '02',
    category: 'Operations',
    tag: 'THE SLOW BLEED',
    format: 'Warning Signs',
    readTime: '5 min read',
    headline: "Your sales doubled.\nSomewhere along the way, your profit didn't.",
    execSummary: "Growth feels good. But as businesses get bigger, small cost problems quietly get bigger too. By the time most owners notice, months of profit have already slipped away. Here's what to watch for — and how to stop it early.",
    toc: ['Why more revenue can mean less money in your pocket', 'The four places money quietly disappears', 'How we find and fix the leaks', 'Story: FreshKart'],
    painPoint:
      "Two years in. Sales have doubled. You've got more customers, more staff, more orders. Everything looks like it's going in the right direction. But your bank balance at the end of the month doesn't feel much better than it did a year ago. You're not sure why. You're working harder than ever. Where is the money going?",
    emotionalBridge:
      "This is the most common thing we see in growing businesses — and it's almost never one big problem. It's usually four or five small things happening at the same time: ad costs quietly crept up without anyone checking if they're still working. A few products are selling well but barely covering what they cost to make and ship. A delivery partner raised their rates six months ago and nobody renegotiated. A new team member was hired but their salary isn't being covered by extra sales. None of these feel like emergencies. Together, they quietly drain your profit every single month.",
    solution: {
      intro: "Here's how we track it down:",
      steps: [
        'Every month, we go through your numbers and show you exactly where each taka went — not a vague summary, the real breakdown',
        'We check every product you sell to find out which ones are actually making money and which ones are secretly costing you',
        'Each month you get a plain-language explanation: what happened, why your profit went up or down, and what to change',
        'We build a 90-day improvement roadmap with Quick Wins, Medium-Term Fixes, and Strategic Changes — each with a deadline and an owner',
      ],
    },
    caseStudy: {
      label: 'REAL STORY',
      title: 'FreshKart — Chittagong',
      text: "FreshKart had grown their sales by 2x over 18 months. But their profit had quietly dropped from 22% down to 11% — and nobody had noticed. When we went through their numbers, we found four leaks: their ad budget had grown but they had no idea if it was working. Two products were selling fast but barely covering their costs. Their delivery company had been overcharging for months. And one new hire wasn't generating enough extra sales to cover their salary. Six months later, their profit was back up to 19%.",
      stat: '11% → 19%',
      statLabel: 'profit recovered in 6 months',
    },
    cta: { label: 'Find your leaks', href: '/#contact' },
  },
  {
    id: 'time-trap',
    number: '03',
    category: 'AI Implementation',
    tag: 'THE TIME TRAP',
    format: 'Practical Guide',
    readTime: '7 min read',
    headline: "You're spending 3 days a week\non work a computer could do in 10 minutes.",
    execSummary: "Every business owner knows they should be using AI tools. Almost none of them know where to start — or how to make it actually stick. Here's the simple way we do it: start with one task, make it work, then move to the next.",
    toc: ['Why AI feels confusing even though it should be simple', 'The tasks most businesses should hand to a computer first', 'How we set it up for you — step by step', 'Story: StyleHive'],
    painPoint:
      "You already know AI is changing things. You've probably tried ChatGPT, maybe watched a few videos, maybe even signed up for a tool that promised to save you hours. But somehow you're still doing the same things manually. Replying to the same customer questions. Typing the same captions. Going through the same spreadsheets. The hours are going somewhere — just not somewhere useful.",
    emotionalBridge:
      "We hear this from almost every business owner we work with. They're not behind because they're not trying. They're behind because nobody sat with them, looked at their actual daily work, and said: this specific task — right here, the one you do every Tuesday morning — we can hand that to a computer. Let me show you exactly how, right now. That's the gap. Not the technology. The translation.",
    solution: {
      intro: "Here's exactly how we do it:",
      steps: [
        'We spend an hour with you going through your typical week and finding the 3–5 tasks that eat the most time and repeat the most often',
        'We pick the one task that will save you the most hours and set up the automation together — so it works before we leave',
        'We train you and your team on it until using it feels natural, then we move to the next one on the list',
        'Over a few months, you build up a set of tools that run in the background — so your time goes to growing the business, not running it',
      ],
    },
    caseStudy: {
      label: 'REAL STORY',
      title: 'StyleHive — Dhaka',
      text: "StyleHive's owner was spending more than 15 hours every week on three things: answering the same customer questions over and over, manually sorting through expenses at month-end, and chasing suppliers when stock ran low. We set up automated replies for the most common questions (8 hours saved per week), a tool that categorises expenses automatically (3 hours saved), and alerts that notify her when stock is getting low. She used that freed-up time to add 12 new products the following quarter.",
      stat: '15+ hrs/week',
      statLabel: 'given back — every single week',
    },
    cta: { label: 'Find your first automation', href: '/#contact' },
  },
]

// ─── StockPulse Module ────────────────────────────────────────────────────────

export const STOCKPULSE_MODULE = {
  tag: 'StockPulse — Inventory Intelligence',
  headline: 'Never stock out. Never overstock.',
  description:
    'Live inventory velocity tracking. Dynamic reorder alerts before stockouts happen. Dead Shelf identification before idle inventory eats your cash. AI-drafted supplier messages ready to send. StockPulse answers the question that silently costs you sales: "What should I reorder, how much, and when?"',
  features: [
    { icon: '⚡', text: 'Velocity Score per SKU — see which products are flying and which are dying' },
    { icon: '→', text: 'Dynamic reorder alerts via WhatsApp — before you run out' },
    { icon: '▣', text: 'Dead Shelf identifier — flag items with 30+ days of zero velocity' },
    { icon: '✦', text: 'AI-drafted supplier reorder messages — one tap to send' },
    { icon: '↗', text: 'Seasonal spike detection — auto-adjusts reorder quantities' },
    { icon: '⊕', text: 'Multi-channel inventory sync from one source of truth' },
  ],
  quote:
    '"Every stockout is a silent sale you\'ll never recover.\nEvery dead item is cash you\'ll never spend."',
}

// ─── Perspectives (editorial cards) ──────────────────────────────────────────

export const PERSPECTIVES = [
  {
    title: 'Do you know what you actually keep from each sale?',
    body: 'Revenue is the number every business owner checks first. But the number that actually matters is what\'s left after every cost — products, shipping, ads, fees, returns. Most businesses have never calculated it. Here\'s how to find yours in five minutes.',
  },
  {
    title: 'The best first AI project for your business is the boring one',
    body: 'The most useful AI project isn\'t a chatbot or a fancy tool. It\'s automating the 3 hours of daily admin that nobody notices but everyone suffers from — expense sorting, customer replies, stock alerts. Start with the boring stuff. The big wins follow.',
  },
  {
    title: 'When does hiring help your business — and when does it hurt?',
    body: 'Going from 2 people to 5 is the riskiest transition for a growing business. Each new salary raises your break-even by more than just the salary itself. Here\'s a simple way to figure out when a hire will pay for itself — and when it won\'t.',
  },
]

// ─── Market intelligence ────────────────────────────────────────────────────

export const MARKET_INTELLIGENCE = [
  { figure: '4.7%', label: 'Typical net margin when all costs are counted', source: 'Industry analysis' },
  { figure: '30–40%', label: 'Of working hours recoverable through AI automation', source: 'Market observation' },
  { figure: '15–25%', label: 'Of inventory capital locked in near-zero velocity products', source: 'Industry analysis' },
  { figure: '<1 in 5', label: 'Online businesses that know their real net margin', source: 'Market observation' },
]

// ─── Clarity Score ───────────────────────────────────────────────────────────

export const CLARITY_DIMENSIONS = [
  'Financial visibility',
  'Operational efficiency',
  'AI readiness',
  'Growth trajectory',
  'Team capability',
]

export const CLARITY_SAMPLE_SCORES = [78, 65, 72, 81, 60]

// ─── The Founder ────────────────────────────────────────────────────────────

export const FOUNDER = {
  headline: [
    'A consultancy built for the businesses',
    'that large firms overlook.',
  ],
  body: [
    'The large strategy firms serve corporates. The freelance advisors give tactical opinions and move on. And the small and medium businesses actually building Bangladesh\'s digital economy had no access to structured strategic and management consulting.',
    'Zaser & Co was built to change that. We bring the same rigour — financial analysis, operational strategy, AI implementation, management frameworks — at a price that makes sense for businesses doing ৳2 lakh to ৳50 lakh a month.',
    'We are not a service provider. We are a strategic partner. We advise, we build, and we stay until the strategy is working.',
  ],
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export const FAQ_ITEMS = [
  {
    q: 'Is this for my size of business?',
    a: 'If your business does between ৳2 lakh and ৳50 lakh a month, yes — that\'s exactly who we built this for. Whether you run a fashion brand, a freelance agency, an education platform, or a services company, if you sell online and you want structured strategic guidance to grow smarter, we\'re the right partner.',
  },
  {
    q: 'What is the Clarity Score?',
    a: 'It\'s a free, 30-minute strategic assessment where we evaluate your business across five dimensions: financial visibility, operational efficiency, AI readiness, growth trajectory, and team capability. You walk away knowing exactly where the strategic gaps are — even if you don\'t work with us after that.',
  },
  {
    q: 'How are you different from other consultancies?',
    a: 'Most consultancies give advice — they produce a report, present a deck, and leave. We partner with you to do the work. When we diagnose a profit problem, we build the system that tracks it. When we identify tasks to strategically automate, we implement the solution. When your content strategy isn\'t working, we build the framework that does. Strategy that delivers.',
  },
  {
    q: 'Which service do I need?',
    a: 'We start with a free Clarity Score assessment that tells us exactly where the gaps are. Some businesses need AI systems built into their operation. Others need their cost structure diagnosed and restructured. Many need both — and we design the sequence together based on what will create the most impact first.',
  },
  {
    q: 'What does it cost?',
    a: 'The first session is always free. After that, every project is priced based on what your business actually needs — not a generic package. We\'re built to be affordable for growing businesses, and we\'ll always be upfront about costs before any work starts.',
  },
  {
    q: 'Do you work with businesses outside Bangladesh?',
    a: 'Yes. We\'re based in Dhaka but we partner with online businesses everywhere. Our systems and frameworks work in any language and on any platform. If your business runs online, we can work with you — wherever you are.',
  },
]

// ─── SEO: Service Page Data ────────────────────────────────────────────────────

export const SERVICE_PAGES = [
  {
    slug: 'ai-audit-implementation',
    title: 'AI Audit & Implementation',
    seoTitle: 'AI Audit & Implementation for SMEs',
    metaDescription:
      'We assess your business across five dimensions of AI readiness, identify the highest-impact opportunities, and build working AI systems. Free AI audit.',
    h1: 'AI Audit & Implementation — We Assess. We Build. We Integrate.',
    heroSubtitle:
      'AI adoption without strategy is wasted budget. We assess your business across five dimensions of AI readiness, identify the highest-impact opportunities, and build working systems that integrate into your actual operation. We do not recommend. We build.',
    problem: {
      headline: 'The problem this solves',
      points: [
        'You\'ve tried AI tools without a strategy and wasted budget',
        'You have no clear understanding of where AI fits in your workflow',
        'You want someone to audit your operation and build the systems, not just recommend them',
      ],
    },
    approach: {
      headline: 'How we implement AI in your business',
      steps: [
        { title: 'AI Readiness Audit', description: 'We assess your business across five dimensions — Strategy, Data, Technology, People, and Governance — to determine where you stand and where AI creates the most value.' },
        { title: 'Prioritised roadmap', description: 'We rank every AI use case by business impact, technical feasibility, and cost — then build a phased implementation sequence.' },
        { title: 'Build and integrate', description: 'We build one working AI system — customer automation, financial reporting, or competitor intelligence — and integrate it into your actual operation.' },
        { title: 'Handover and training', description: 'We deliver technical documentation, operating instructions, and a training session so your team can maintain the system independently.' },
      ],
    },
    deliverables: {
      headline: 'What you get',
      items: [
        'AI Readiness Audit Report — scored assessment across all five dimensions',
        'Prioritised Implementation Roadmap — ranked by impact, feasibility, and cost',
        'One Working AI System — built and integrated into your operation',
        'Client Handover Documentation — technical docs, instructions, and training',
      ],
    },
    audience: 'SMB owners who have tried AI tools without a strategy and wasted budget. Businesses that want someone to audit their operation and build the systems, not just recommend them.',
    relatedServices: ['management-operations'],
    faq: [
      { q: 'Do I need technical knowledge?', a: 'No. We handle all the setup and configuration. You just need to know your business — we translate that into automation.' },
      { q: 'What tools do you use?', a: 'We use whatever works best for your business — ChatGPT, custom automation, AI APIs, workflow tools. The tool is secondary to the outcome.' },
      { q: 'How long does implementation take?', a: 'The first automation is typically working within 1–2 weeks. A full automation suite builds out over 2–3 months as we add systems one at a time.' },
    ],
    ctaText: 'Book Your Free AI Audit',
    ctaHref: '/free-ai-audit',
  },
  {
    slug: 'management-operations',
    title: 'Management & Operations Strategy',
    seoTitle: 'Management & Operations Strategy Consulting',
    metaDescription:
      'We diagnose your cost structure, identify where margin is being lost, and implement targeted restructuring. 90-day improvement roadmap. Free business audit.',
    h1: 'Management & Operations Strategy — We Diagnose. We Fix. We Build the Roadmap.',
    heroSubtitle:
      'We diagnose your cost structure, identify where margin is being lost, and implement targeted restructuring across pricing, process, and resource allocation — so that growth translates into actual profit.',
    problem: {
      headline: 'The problem this solves',
      points: [
        'Your costs are rising but you have no structured strategy to control them',
        'Revenue growth is not translating into profit',
        'You need someone to look at your operations objectively and tell you what to fix — with a structured plan, not generic advice',
      ],
    },
    approach: {
      headline: 'How we improve your operations',
      steps: [
        { title: 'Operations diagnostic', description: 'We conduct a full analysis of your cost structure, process flows, waste points, and margin performance against industry benchmarks.' },
        { title: 'Cost structure mapping', description: 'We build a visual breakdown of fixed, variable, and semi-variable costs with contribution margin analysis per product line or service.' },
        { title: '90-day roadmap', description: 'We create a phased action plan: Quick Wins (Week 1–4), Medium-Term Fixes (Month 2–3), and Strategic Changes (Month 3+), each with an owner, metric, and deadline.' },
        { title: 'Executive presentation', description: 'We deliver a 10–12 slide presentation of all findings and recommendations, presented in person or via video call.' },
      ],
    },
    deliverables: {
      headline: 'What you get',
      items: [
        'Operations Diagnostic Report — cost structure, process flows, and margin analysis',
        'Cost Structure Map — fixed, variable, and semi-variable breakdown with contribution margin',
        '90-Day Improvement Roadmap — Quick Wins, Medium-Term Fixes, and Strategic Changes',
        'Client Presentation Deck — 10–12 slide executive presentation of findings',
      ],
    },
    audience: 'SMB owners whose costs are rising but who have no structured strategy to control them. Businesses with revenue growth that is not translating into profit.',
    relatedServices: ['ai-audit-implementation'],
    faq: [
      { q: 'How quickly will I see results?', a: 'Most businesses see measurable margin improvement within 60–90 days. Quick wins like vendor renegotiation and pricing fixes often land within the first month.' },
      { q: 'Will you help implement changes or just advise?', a: 'We implement. We renegotiate contracts, restructure ad spend, and build the tracking systems. We don\'t hand you a report and leave.' },
      { q: 'What frameworks do you use?', a: 'Lean waste identification, Kaizen continuous improvement, PDCA cycles, DuPont ROE decomposition, Value Stream Mapping, and Cost-Volume-Profit analysis.' },
    ],
    ctaText: 'Get Your Operations Diagnostic',
    ctaHref: '/free-business-audit',
  },
]

// ─── SEO: Industry Page Data ───────────────────────────────────────────────────

export const INDUSTRY_PAGES = [
  {
    slug: 'ecommerce',
    title: 'E-Commerce Businesses',
    seoTitle: 'Consulting for E-Commerce Businesses',
    metaDescription:
      'Strategy, margin improvement, and AI automation for online stores and DTC brands in Bangladesh. Inventory, pricing, and operational intelligence.',
    h1: 'Strategic Consulting for E-Commerce Businesses',
    heroSubtitle:
      'Online stores face unique challenges — ad costs that eat margins, inventory that ties up cash, and logistics that break at scale. We help e-commerce founders build the financial clarity, operational systems, and AI automation that turn volume into real profit.',
    challenges: [
      { title: 'Margin erosion', description: 'Ad costs, delivery charges, returns, and platform fees quietly eat your profit. Most e-commerce founders don\'t know their real margin per order.' },
      { title: 'Inventory cash trap', description: '15–25% of your inventory capital is locked in products with near-zero velocity. That\'s cash you can\'t use for growth.' },
      { title: 'Scale without systems', description: 'Manual order processing, customer service, and inventory tracking break at 100+ orders/day. You need automation, not more staff.' },
    ],
    services: ['ai-audit-implementation', 'management-operations'],
    stats: [
      { figure: '4.7%', label: 'Average net margin when all costs are counted' },
      { figure: '15–25%', label: 'Inventory capital locked in dead stock' },
      { figure: '15+ hrs', label: 'Weekly hours recoverable through automation' },
    ],
  },
  {
    slug: 'education-businesses',
    title: 'Education Businesses',
    seoTitle: 'Consulting for Education Businesses',
    metaDescription:
      'Strategic consulting for edtech platforms, online courses, and coaching businesses. Financial clarity, content systems, and operational scaling.',
    h1: 'Strategic Consulting for Education Businesses',
    heroSubtitle:
      'Education businesses — online courses, coaching platforms, edtech startups — have high upfront content costs and complex student lifecycle economics. We help education founders understand their unit economics, build content systems that scale, and automate the operations that limit growth.',
    challenges: [
      { title: 'Content production bottleneck', description: 'Course creation is time-intensive. Without a content system, your growth is limited by how fast you can produce.' },
      { title: 'Student economics blind spot', description: 'Acquisition cost, completion rates, and lifetime value per student — most education businesses don\'t track these clearly.' },
      { title: 'Manual student management', description: 'Enrollment, support, follow-ups, and community management consume 20+ hours/week that could be automated.' },
    ],
    services: ['ai-audit-implementation', 'management-operations'],
    stats: [
      { figure: '20+ hrs', label: 'Weekly hours spent on student management' },
      { figure: '3x', label: 'Content production speed with AI systems' },
      { figure: '40%', label: 'Improvement in student retention with proper systems' },
    ],
  },
  {
    slug: 'service-businesses',
    title: 'Service Businesses',
    seoTitle: 'Consulting for Service Businesses',
    metaDescription:
      'Strategy and management consulting for agencies, freelancers, and service companies. Pricing strategy, AI automation, and operational structure.',
    h1: 'Strategic Consulting for Service Businesses',
    heroSubtitle:
      'Agencies, freelancers, and service companies trade time for money. We help service business founders build pricing strategies that reflect their value, operational systems that create leverage, and AI tools that multiply their capacity without hiring.',
    challenges: [
      { title: 'Pricing without strategy', description: 'Most service businesses price based on competition, not value or cost. That leaves money on the table every single project.' },
      { title: 'Founder dependency', description: 'The business can\'t run without you. Every client needs your attention, every decision needs your input. That\'s a job, not a business.' },
      { title: 'Scope creep and delivery chaos', description: 'Without clear SOPs and project frameworks, every engagement bleeds time and margin beyond the original scope.' },
    ],
    services: ['management-operations', 'ai-audit-implementation'],
    stats: [
      { figure: '30–50%', label: 'Revenue increase from strategic repricing' },
      { figure: '10+ hrs', label: 'Weekly hours freed from admin with automation' },
      { figure: '2–3x', label: 'Project capacity with proper systems in place' },
    ],
  },
  {
    slug: 'retail-businesses',
    title: 'Retail Businesses',
    seoTitle: 'Consulting for Retail Businesses',
    metaDescription:
      'Strategy consulting for retail businesses in Bangladesh. Inventory intelligence, margin optimization, and operational systems for physical and online retail.',
    h1: 'Strategic Consulting for Retail Businesses',
    heroSubtitle:
      'Retail is thin-margin by nature. We help retail business owners understand their real costs, optimise operations, and build the management systems that make every taka of stock work harder.',
    challenges: [
      { title: 'Thin margins, thick costs', description: 'Rent, staff, inventory holding costs, and shrinkage eat into already-slim retail margins. Without visibility, you\'re flying blind.' },
      { title: 'Inventory mismanagement', description: 'Overstocking ties up cash. Stockouts lose sales. Without velocity data, every reorder decision is a guess.' },
      { title: 'Online + offline complexity', description: 'Running both physical and online channels doubles the operational complexity without doubling the systems to manage it.' },
    ],
    services: ['management-operations', 'ai-audit-implementation'],
    stats: [
      { figure: '৳47K→৳1.82L', label: 'Profit improvement from financial clarity' },
      { figure: '15–25%', label: 'Cash freed from dead inventory' },
      { figure: '11%→19%', label: 'Margin recovery in 6 months' },
    ],
  },
]

// ─── SEO: Audit Landing Pages ──────────────────────────────────────────────────

export const AUDIT_PAGES = {
  'business-audit': {
    slug: 'free-business-audit',
    seoTitle: 'Free Business Audit — Zaser & Co',
    metaDescription:
      'Get a free 30-minute strategic assessment across 5 business dimensions. Identify gaps in finance, operations, AI readiness, and growth. No cost, no commitment.',
    h1: 'Free Business Audit',
    subtitle: 'A 30-minute strategic assessment that shows you exactly where the gaps are.',
    description:
      'The Clarity Score™ is a free, structured diagnostic across five dimensions of your business: financial visibility, operational efficiency, AI readiness, growth trajectory, and team capability. You walk away knowing exactly what to fix first — even if you never work with us.',
    dimensions: [
      { title: 'Financial Visibility', description: 'Do you know your real margin, break-even point, and cost per order? We assess your financial clarity.' },
      { title: 'Operational Efficiency', description: 'Are your processes scalable, or will they break at 2x volume? We map your operational gaps.' },
      { title: 'AI Readiness', description: 'Which tasks should you automate first? We identify the highest-impact AI opportunities.' },
      { title: 'Growth Trajectory', description: 'Is your growth sustainable? We evaluate your pricing, channel mix, and unit economics.' },
      { title: 'Team Capability', description: 'Can your team execute at the next level? We assess SOPs, training, and management infrastructure.' },
    ],
    process: [
      'Book a free 30-minute session via the form below',
      'We assess your business across all five dimensions',
      'You receive your Clarity Score™ with a prioritized action plan',
      'You decide what to do next — no pressure, no obligation',
    ],
    ctaText: 'Book Your Free Business Audit',
  },
  'ai-audit': {
    slug: 'free-ai-audit',
    seoTitle: 'Free AI Audit for Your Business',
    metaDescription:
      'Find out which tasks to automate first and how much time you\'ll save. Free AI readiness assessment for small businesses. No cost, no commitment.',
    h1: 'Free AI Audit',
    subtitle: 'Find your first automation — and see how much time you\'ll get back.',
    description:
      'The AI Readiness Assessment is a free diagnostic that maps your daily operations, identifies the tasks that consume the most time, and shows you exactly where automation will have the biggest impact. No technical knowledge required. No cost. No commitment.',
    dimensions: [
      { title: 'Customer Communication', description: 'How much time do you spend on repetitive customer queries? We identify what can be automated.' },
      { title: 'Financial Reporting', description: 'Are you manually sorting expenses and tracking revenue? We show you what AI can handle.' },
      { title: 'Content Production', description: 'How much of your content workflow is manual? We map the automation opportunities.' },
      { title: 'Inventory & Operations', description: 'Are reorder decisions, stock tracking, and supplier comms manual? We find the quick wins.' },
      { title: 'Team Workflows', description: 'Where are the handoff gaps, data entry bottlenecks, and manual reporting tasks? We identify what to fix first.' },
    ],
    process: [
      'Book a free AI audit session via the form below',
      'We walk through your typical week and identify the biggest time sinks',
      'You receive a prioritized automation roadmap ranked by hours saved',
      'We show you exactly how the top automation would work in your business',
    ],
    ctaText: 'Book Your Free AI Audit',
  },
}

// ─── SEO: Local Keyword Page Data ──────────────────────────────────────────────

export const LOCAL_PAGES = [
  {
    slug: 'business-consultancy-bangladesh',
    seoTitle: 'Business Consultancy in Bangladesh',
    metaDescription:
      'Structured strategic and management consulting for SMEs in Bangladesh. Financial clarity, margin improvement, AI implementation. Dhaka-based, SME-focused.',
    h1: 'Business Consultancy in Bangladesh — Built for SMEs',
    heroSubtitle:
      'Bangladesh\'s SME sector drives the economy, but most small businesses don\'t have access to structured strategic consulting. Zaser & Co changes that. We bring the same rigour as large firms — financial analysis, operational strategy, AI implementation — at a price built for growing businesses.',
    sections: [
      {
        title: 'Why Bangladeshi SMEs need structured consulting',
        content: 'Growing businesses in Bangladesh face unique challenges: thin margins in a competitive market, limited access to financial intelligence tools, and rapid digital transformation that moves faster than most teams can adopt. Without structured advisory, founders make decisions based on instinct — not data.',
      },
      {
        title: 'What we bring to the table',
        content: 'Zaser & Co is a Dhaka-based strategic and management consultancy focused exclusively on small and medium businesses. We deliver two productized consulting services — AI Audit & Implementation and Management & Operations Strategy — as hands-on partnerships, not PowerPoint decks.',
      },
      {
        title: 'Who we work with',
        content: 'Online stores, education platforms, service agencies, freelancers, retail businesses, and startups doing ৳2 lakh to ৳50 lakh per month. If you sell online, serve clients, or run a team — and you want structured strategy to grow smarter — we\'re built for you.',
      },
    ],
  },
  {
    slug: 'business-consultant-dhaka',
    seoTitle: 'Business Consultant in Dhaka',
    metaDescription:
      'Dhaka-based management consultant for growing businesses. Hands-on strategy, financial analysis, operational improvement, and AI systems. Free business audit.',
    h1: 'Business Consultant in Dhaka — Hands-On Strategy for Growing Businesses',
    heroSubtitle:
      'Looking for a business consultant in Dhaka who actually does the work? Zaser & Co is a Dhaka-based strategic and management consultancy that doesn\'t just advise — we implement. Financial dashboards, AI automation, operational systems — we build them with you.',
    sections: [
      {
        title: 'A Dhaka-based consultancy that implements',
        content: 'Most consultancies present recommendations and move on. We sit with your data, build your dashboards, configure your automations, write your SOPs, and stay until the strategy is working. That\'s what implementation-focused consulting looks like.',
      },
      {
        title: 'Our services in Dhaka',
        content: 'AI Audit & Implementation — we assess, build, and integrate working AI systems. Management & Operations Strategy — we diagnose cost structures and build 90-day improvement roadmaps. Every engagement starts with a free Clarity Score™ assessment — 30 minutes, five dimensions, no cost.',
      },
      {
        title: 'Industries we serve in Dhaka',
        content: 'E-commerce brands, education businesses, service agencies, freelance businesses, retail operations, and startups. If your business is based in Dhaka and you\'re doing ৳2L–50L per month, we\'re the right fit.',
      },
    ],
  },
]