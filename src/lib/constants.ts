// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: 'Services', href: '/#services' },
  { label: 'BreakPoint', href: '/breakpoint' },
  { label: 'StockPulse', href: '/stockpulse' },
  { label: 'Insights', href: '/#insights' },
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
  '5 disciplines, one partner: strategy that sticks',
  'Financial clarity · Operational rigour · AI implementation',
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
    id: 'financial-clarity',
    number: '01',
    title: 'Financial Clarity',
    tagline: 'Your strategic partner in financial intelligence.',
    description:
      'Strategy without financial visibility is guesswork. We give you the real numbers — margins, break-even, cash flow — through hands-on advisory and two proprietary systems, BreakPoint™ and StockPulse™. So every growth decision you make is backed by data, not instinct.',
    problems: [
      'I make decisions based on revenue, not profit — because I don\'t know my profit',
      'I need a financial strategy, not just a spreadsheet',
      'I want someone who understands my numbers and tells me what they mean',
    ],
  },
  {
    id: 'margin-operations',
    number: '02',
    title: 'Margin & Operations',
    tagline: 'Your strategic partner in operational performance.',
    description:
      'Operational inefficiency is a strategy problem, not an admin problem. We diagnose your cost structure, identify where margin is being lost, and implement targeted restructuring — pricing, process, and resource allocation — so your growth translates into actual profit.',
    problems: [
      'My costs are rising but I don\'t have a strategy to control them',
      'I need someone to look at my operations objectively and tell me what to restructure',
      'I want a structured plan for improving my margins, not generic advice',
    ],
  },
  {
    id: 'ai-audit',
    number: '03',
    title: 'AI Audit & Implementation',
    tagline: 'Your strategic partner in AI transformation.',
    description:
      'AI adoption without strategy is wasted budget. We assess your business across five dimensions of AI readiness, identify the highest-impact opportunities, and build working systems — customer automation, financial reporting, competitor intelligence — that integrate into your actual operation.',
    problems: [
      'I need a strategy for AI in my business, not just another system to try',
      'I want someone to audit my workflow and tell me exactly where AI fits',
      'I need the implementation done for me, not a recommendation to do it myself',
    ],
  },
  {
    id: 'content-generation',
    number: '04',
    title: 'Content Generation',
    tagline: 'Your strategic partner in content marketing.',
    description:
      'Content without strategy is noise. We build content systems aligned to your brand positioning, audience segments, and conversion goals — producing product copy, social content, ad campaigns, and customer communications with the consistency of a full marketing department.',
    problems: [
      'I need a content strategy, not just someone to write posts',
      'I want content that is aligned with my business goals, not random topics',
      'I need a system that produces consistently, not a one-time batch',
    ],
  },
  {
    id: 'hr-training',
    number: '05',
    title: 'HR & AI Training',
    tagline: 'Your strategic partner in people and capability.',
    description:
      'Your team is the execution layer of every strategy. We build the management infrastructure — SOPs, onboarding, performance frameworks, AI training — that turns a group of individuals into a scalable, self-sufficient operation. So your business runs on systems, not on you.',
    problems: [
      'I need management structure, not just HR documents',
      'I want my team trained strategically on the systems we use',
      'I need someone to partner with me in building an organisation, not just fill roles',
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
        'We set a Zero Day — the date each month when you stop losing money and start making it, so you always know where you stand',
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
        'We build you a Burn Calendar™ — a simple view showing how much cash you will have 3 months from now, so there are no surprises',
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
    q: 'What are BreakPoint and StockPulse?',
    a: 'Two proprietary systems we built to solve specific strategic problems. BreakPoint provides real-time break-even intelligence — so you always know where you stand financially. StockPulse delivers inventory intelligence and tells you when to reorder before you run out. Both are configured specifically for your business and keep working after the engagement.',
  },
  {
    q: 'Do I need all five services?',
    a: 'No. We start with your Clarity Score — a free strategic assessment that tells us exactly where the gaps are. From there, we prioritise the 2–3 disciplines that will make the biggest difference and start there. Some businesses need financial clarity. Others need AI implementation. Most need a structured combination — and we design that together.',
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