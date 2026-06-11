// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: 'Services', href: '/#services' },
  { label: 'BreakPoint', href: '/breakpoint' },
  { label: 'StockPulse', href: '/stockpulse' },
  { label: 'Perspectives', href: '/#perspectives' },
]

// ─── Hero ─────────────────────────────────────────────────────────────────────

export const HERO = {
  badge: null,
  headline: [
    'Your numbers,',
    'decoded.',
    'Your profit,',
    'unleashed.',
  ],
  subheadline:
    'Financial clarity. AI implementation. Operational intelligence. Zaser & Co is the consultancy that doesn\'t just advise — we build.',
  primaryCTA: 'Request a diagnostic',
  secondaryCTA: 'Explore our services',
}

// ─── Ticker — real market observations ──────────────────────────────────────

export const TICKER_ITEMS = [
  'Most online businesses track revenue but not real margin',
  '30–40% of a business owner\'s time can be automated with current AI tools',
  '15–25% of inventory capital is typically locked in near-zero-velocity products',
  'Fewer than 1 in 5 online businesses can name their real net margin',
  'Margin drops of 2–3% per quarter compound invisibly over 18 months',
]

// ─── The Problem ─────────────────────────────────────────────────────────────

export const PROBLEM_SECTION = {
  headline: [
    'Every online business hits the same wall.',
    'Most don\'t see it until it\'s too late.',
  ],
  body: [
    'Revenue climbs. Operations expand. The team grows. And somewhere in the middle of all that progress, the business starts bleeding in places nobody is watching.',
    'Margins shrink by 2% per quarter and nobody notices until the year is over. Inventory ties up cash in products that stopped selling three months ago. The team spends hours on tasks that an AI workflow could handle in seconds. Content goes quiet for weeks because nobody has time to write. A new hire starts with no onboarding and takes two months to become useful.',
    'These aren\'t dramatic failures. They\'re quiet erosions. And they compound.',
    'Zaser & Co exists to make every one of them visible — and then fix them.',
  ],
}

export const PROBLEM_STATS = [
  {
    title: 'The margin you don\'t track',
    body: 'Most online businesses can name their revenue to the taka. Fewer than 1 in 5 can name their real net margin. The gap between those two numbers is where growth dies.',
  },
  {
    title: 'The hours you can\'t see',
    body: 'The average small business owner spends 30–40% of their working hours on tasks that can be partially or fully automated with current AI tools. That\'s 2–3 days a week of recoverable time.',
  },
  {
    title: 'The inventory that\'s eating your cash',
    body: 'At any given time, a typical online seller has 15–25% of their inventory capital locked in products with near-zero sales velocity. That\'s not stock — it\'s frozen cash.',
  },
]

// ─── Ghost Profit decomposition layers (used in pinned animation) ────────────

export const GHOST_PROFIT_LAYERS = [
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
    id: 'financial-clarity',
    number: '01',
    title: 'Financial Clarity',
    tagline: 'You can\'t grow what you can\'t measure.',
    description:
      'We make the financial truth of your business visible. Real margins. Real break-even. Real cash flow. Delivered through hands-on advisory and two proprietary tools — BreakPoint™ for break-even intelligence and StockPulse™ for inventory intelligence — that keep working after we leave.',
    problems: [
      'I\'m doing strong revenue but there\'s never enough cash at month-end',
      'I don\'t know which of my products are actually profitable',
      'I have no idea what my break-even point is',
    ],
  },
  {
    id: 'margin-operations',
    number: '02',
    title: 'Margin & Operations Improvement',
    tagline: 'Growth without margin is just expensive hope.',
    description:
      'We find where your business is quietly losing money and fix it. Pricing that\'s too low. Products with hidden losses. Processes that waste hours. Costs that climb without anyone noticing. We diagnose, restructure, and implement — not just recommend.',
    problems: [
      'My revenue is growing but my margins are falling',
      'My return rate is killing my profit but I don\'t know what\'s causing it',
      'I think I\'m underpricing but I\'m afraid to raise prices',
    ],
  },
  {
    id: 'ai-audit',
    number: '03',
    title: 'AI Audit & Implementation',
    tagline: 'AI that works in your business, not in a pitch deck.',
    description:
      'We assess where AI can make the biggest difference in your business, then build the systems. Customer service automation. Financial reporting. Competitor monitoring. Fraud screening. Real workflows that save real hours — not theoretical AI strategy decks.',
    problems: [
      'I spend 3 hours a day answering the same customer questions',
      'I don\'t know where to start with AI for my business',
      'My team is doing manual work that could be automated',
    ],
  },
  {
    id: 'content-generation',
    number: '04',
    title: 'Content Generation',
    tagline: 'Content that converts, at a pace you can\'t manually match.',
    description:
      'We build content systems that produce consistent, on-brand, conversion-focused content — product descriptions, social posts, ad copy, customer communications — using AI to deliver what would normally require a full marketing team.',
    problems: [
      'I know I need to post consistently but I never have time to write',
      'My product descriptions are copied from my supplier — they don\'t convert',
      'My ads all say the same thing and I\'ve run out of ideas',
    ],
  },
  {
    id: 'hr-training',
    number: '05',
    title: 'HR & AI Training',
    tagline: 'Your team is your operating system. We help you upgrade it.',
    description:
      'We train your team to work with the AI tools we\'ve built, and help growing businesses create the HR foundations — onboarding, SOPs, policies, performance systems — that prevent scaling from becoming chaos.',
    problems: [
      'I installed AI tools but my team doesn\'t know how to use them',
      'Nothing in my business is documented — everything is in my head',
      'I need HR policies but I can\'t afford an HR manager',
    ],
  },
]

export const SERVICE_PILLAR_IMAGES: Record<string, string> = {
  'financial-clarity':
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1400&h=900&fit=crop&q=85',
  'margin-operations':
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&h=900&fit=crop&q=85',
  'ai-audit':
    'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1400&h=900&fit=crop&q=85',
  'content-generation':
    'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1400&h=900&fit=crop&q=85',
  'hr-training':
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&h=900&fit=crop&q=85',
}

// ─── How We Think (process steps) ───────────────────────────────────────────

export const METHODOLOGY_PILLARS = [
  {
    number: '01',
    title: 'Diagnose',
    description:
      'We don\'t start with assumptions. We start with your Clarity Score — a structured assessment across financial health, operational maturity, AI readiness, team capability, and growth trajectory. It tells us exactly where you are and what matters most.',
  },
  {
    number: '02',
    title: 'Prioritise',
    description:
      'Not everything needs fixing at once. We identify the 2–3 changes that will create the most impact with the least disruption, and we build a roadmap that sequences them in an order that compounds.',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'This is where we diverge from every other consultancy. We don\'t hand you a recommendation and walk away. We build the dashboards, the workflows, the SOPs, the content systems, the training programs. Advisory that builds.',
  },
  {
    number: '04',
    title: 'Sustain',
    description:
      'Everything we build is designed to run after we leave. Dashboards update automatically. AI workflows process data without manual intervention. SOPs document the knowledge so it doesn\'t live in one person\'s head. And when you need us again — we pick up exactly where we left off.',
  },
]

// ─── The Patterns (editorial stories) ───────────────────────────────────────

export const MARKET_PATTERNS = [
  {
    id: 'illusion',
    headline: 'The Revenue Illusion',
    category: 'Financial Clarity',
    pattern:
      'An online business does ৳10 lakh in monthly revenue. The owner checks their payment dashboard daily and sees healthy numbers. Growth is steady. They\'re considering hiring, expanding product lines, increasing ad spend.',
    insight:
      'When the full cost structure is decomposed — product cost, packaging, shipping, returns, ad spend, platform fees, payment processing, team costs — the actual net margin is 4.7%. That\'s ৳47,000 on ৳10,00,000 in revenue. A single bad month erases two months of profit.\n\nThe owner didn\'t know because they never built a real P&L. Revenue was their only metric. Revenue is the most dangerous number in business when it\'s the only number you track.',
    approach:
      'A BreakPoint dashboard showing the real break-even in real-time. Daily visibility into whether today was profitable — not a month-end surprise. Scenario modeling before any spending decision. The difference between "I think we\'re doing well" and "I know we\'re doing well."',
  },
  {
    id: 'margin-collapse',
    headline: 'The Slow Margin Collapse',
    category: 'Margin & Operations',
    pattern:
      'A growing online brand has been operating for two years. Revenue has doubled. The team has tripled. The owner feels successful — and they are, by most measures.\n\nBut margin has dropped from 22% to 11% over 18 months. Nobody noticed because revenue growth masked it. Each quarter, costs grew slightly faster than revenue — 2–3% faster, barely visible in any single month.',
    insight:
      'The margin collapse came from four compounding sources: rising customer acquisition costs, a shift in product mix toward lower-margin items, logistics costs that scaled non-linearly with volume, and two hires that added fixed costs without proportional revenue contribution.\n\nNone of these were mistakes. All of them were invisible without a system that tracks margin at the product, channel, and period level.',
    approach:
      'Monthly margin decomposition showing exactly where each percentage point went. Product-level profitability analysis that reveals which items are growing revenue but shrinking profit. A financial narrative that says "your margin fell 1.8% this month — here\'s why and here are three specific things to adjust."',
  },
  {
    id: 'ai-gap',
    headline: 'The AI Gap',
    category: 'AI Implementation',
    pattern:
      'A business owner hears about AI constantly — in the news, on LinkedIn, from competitors. They\'ve tried ChatGPT a few times. Maybe they signed up for an AI tool that promised to automate something. It didn\'t stick.\n\nThey know AI matters. They don\'t know where to start. The gap between "AI is transforming business" and "here\'s how AI fits into MY business" feels enormous.',
    insight:
      'Most online businesses have 5–8 processes that are ideal for AI automation — but they don\'t know which ones, in what order, or with what tools. The highest-impact AI implementations are rarely the most exciting ones. They\'re the boring, repetitive, time-consuming tasks: answering customer questions, categorising expenses, generating product descriptions, monitoring competitors.\n\nAutomating these frees 10–15 hours per week — time the owner can redirect toward strategic work that actually grows the business.',
    approach:
      'An AI Audit that scores readiness across five dimensions and produces a prioritised implementation roadmap. Then — crucially — the actual implementation. Not a strategy deck. Working systems deployed in the business within weeks.',
  },
]

// ─── BreakPoint Module ────────────────────────────────────────────────────────

export const BREAKPOINT_MODULE = {
  tag: 'BreakPoint — Break-Even Intelligence',
  headline: 'Know your Zero Day.',
  description:
    'Real-time break-even tracking. AI-powered financial narratives. Scenario modeling for every major decision. Alerts that tell you the moment you cross from loss into profit — your Zero Day. BreakPoint answers the question you think about every night: "Am I actually making money?"',
  features: [
    { icon: '◉', text: 'Real-time break-even progress — see your Profit Pulse at a glance' },
    { icon: '✦', text: 'AI-powered daily flash insights — what happened and what to do tomorrow' },
    { icon: '→', text: 'Smart WhatsApp alerts when you hit 50%, 80%, or cross Zero Day' },
    { icon: '⊞', text: 'Scenario modeling — "What if I hire someone? What if I raise prices 10%?"' },
    { icon: '▤', text: 'The Burn Calendar™ — see exactly when cash runs out at current pace' },
    { icon: '◧', text: 'Monthly PDF report with AI narrative — hand it to your partner or investor' },
  ],
  quote:
    '"Your break-even point isn\'t just a number.\nIt\'s the line between working for free and building wealth."',
}

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
    title: 'The metric that matters more than revenue',
    body: 'Revenue is the number every business owner knows by heart. But contribution margin — the amount left after variable costs on each sale — is the number that determines whether growth makes you richer or just busier. Here\'s how to calculate yours in five minutes.',
  },
  {
    title: 'Why your first AI implementation should be boring',
    body: 'The most impactful AI project for most businesses isn\'t a chatbot or a recommendation engine. It\'s automating the 3 hours of daily admin work that nobody notices but everyone suffers from. Start with the mundane. The strategic follows.',
  },
  {
    title: 'The three hires that break a business',
    body: 'Going from 2 people to 5 is the most dangerous transition in a growing company. Each new salary raises your break-even by more than the salary itself. Here\'s the math — and the framework for deciding when a hire is an investment versus a risk.',
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
    'Built by someone who studies business',
    'for a living — and builds it as a calling.',
  ],
  body: [
    'Zaser & Co was founded by Syed Zain bin Noor — a business, accounting, and economics specialist who saw a gap nobody was filling: the online businesses driving Bangladesh\'s digital economy had no access to affordable, intelligent, hands-on consulting.',
    'Large firms serve corporates. Freelance advisors give opinions. Nobody was combining rigorous financial analysis, AI-powered tooling, and hands-on implementation into a single practice designed for the businesses that need it most.',
    'That\'s what Zaser & Co is. A consultancy that advises and builds. For businesses that are growing and need someone who can see what they can\'t.',
  ],
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export const FAQ_ITEMS = [
  {
    q: 'Who is this for?',
    a: 'Any online business that wants to grow — whether you run a fashion brand, a freelance agency, an education platform, a SaaS product, or a services company. If you sell, serve, or operate online and you want someone who can see what you can\'t, we\'re built for you.',
  },
  {
    q: 'What is the Clarity Score?',
    a: 'A structured diagnostic across five dimensions: financial visibility, operational efficiency, AI readiness, growth trajectory, and team capability. It takes 30 minutes, costs nothing, and tells you more about your business than most founders learn in a year of operating. Most businesses score between 20 and 35 on their first diagnostic.',
  },
  {
    q: 'How are you different from other consultancies?',
    a: 'Most consultancies advise — they produce a report, present a deck, and leave. Zaser & Co advises AND builds. When we identify a margin problem, we install a system that tracks it in real-time. When we audit your AI readiness, we build the workflows. When we say your content isn\'t working, we generate the content that does. Advisory that builds.',
  },
  {
    q: 'What are BreakPoint and StockPulse?',
    a: 'Two proprietary intelligence tools within our Financial Clarity practice. BreakPoint tracks your daily revenue against your break-even point with AI-powered insights and scenario modeling. StockPulse monitors inventory velocity and fires reorder alerts before stockouts happen. Both are configured specifically for each client and keep generating value after our direct engagement ends.',
  },
  {
    q: 'Do I need all five services?',
    a: 'No. Every engagement starts with a Clarity Score diagnostic that tells us exactly where you stand. We identify the 2–3 changes that will create the most impact and build a roadmap from there. Some clients need financial clarity. Others need AI implementation. Most need a combination — and that range is the point.',
  },
  {
    q: 'What does it cost?',
    a: 'The diagnostic is free. After that, engagements are scoped and priced based on what your business needs. We don\'t sell generic packages. If we cannot show you a clear ROI path in the diagnostic, we\'ll tell you.',
  },
  {
    q: 'Do you work with businesses outside Bangladesh?',
    a: 'We\'re based in Dhaka but we work with online businesses regardless of geography. Our tools and workflows are language-flexible and platform-agnostic. If your business operates online, we can help.',
  },
]
