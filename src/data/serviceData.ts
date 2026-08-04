export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceProcess {
  phase: string;
  title: string;
  desc: string;
}

export interface ServiceDetails {
  id: string;
  title: string;
  categoryLabel: string;
  shortDesc: string;
  homepageDesc: string;
  description: string;
  iconName: string;
  imageUrl: string;
  heroText: string;
  overview: string;
  challenges: string[];
  solutions: string[];
  benefits: { label: string; value: string }[];
  technologies: string[];
  process: ServiceProcess[];
  faq: ServiceFAQ[];
}

export const services: ServiceDetails[] = [
  {
    id: 'website-development',
    title: 'Website Development',
    categoryLabel: 'WEB',
    shortDesc: 'Premium websites built for speed.',
    homepageDesc: 'Premium websites engineered for performance, speed, and lasting brand impact.',
    description: 'We design and engineer bespoke web experiences that capture attention, convey authority, and deliver flawless performance. No templates. No shortcuts.',
    iconName: 'Laptop',
    imageUrl: '/images/services/web-development.png',
    heroText: 'High-performance websites engineered for growth and\nlasting impressions.',
    overview: 'A great website does more than represent your brand. It drives business growth. We build custom websites that combine thoughtful design, high-performance engineering, and seamless user experiences to help businesses stand out and grow with confidence.',
    challenges: [
      'Slow websites that lose visitors.',
      'Generic designs that fail to represent your brand.',
      'Poor mobile experiences that frustrate users.',
      'Websites that become outdated over time.',
    ],
    solutions: [
      'Fast, high-performance websites optimized for speed and growth.',
      'Custom websites designed around your unique business identity.',
      'Fully responsive experiences across every device.',
      'Scalable solutions built to grow alongside your business.',
    ],
    benefits: [
      { label: 'Performance Metric', value: '98+ Lighthouse score average' },
      { label: 'User Engagement', value: '+42% time on site' },
      { label: 'SEO Visibility', value: 'Double-digit organic growth' },
    ],
    technologies: ['React', 'TypeScript', 'GSAP', 'Lenis', 'Vite', 'Node.js', 'Vercel Edge API'],
    process: [
      { phase: '01', title: 'Discover', desc: 'Understanding your business, goals, audience, and project requirements.' },
      { phase: '02', title: 'Strategy & Planning', desc: 'Creating a roadmap that defines the structure, features, and user experience.' },
      { phase: '03', title: 'Build & Launch', desc: 'Crafting a custom website that combines beautiful design with reliable functionality.' },
      { phase: '04', title: 'Testing & Launch', desc: 'Testing across devices, optimizing performance, and preparing for a successful launch.' },
      { phase: '05', title: 'Ongoing Support', desc: 'Providing updates, improvements, and technical support as your business grows.' },
    ],
    faq: [
      { question: 'Can you build a website that matches my brand?', answer: 'Yes. Every website is custom designed to reflect your brand, goals, and audience.' },
      { question: 'Will my website work on mobile devices?', answer: 'Absolutely. Every website is fully responsive and optimized for desktop, tablet, and mobile.' },
      { question: 'Can my website grow as my business grows?', answer: 'Yes. We build scalable websites that can be expanded with new features whenever needed.' },
    ]
  },
  {
    id: 'e-commerce',
    title: 'E-Commerce Stores',
    categoryLabel: 'E-COMMERCE',
    shortDesc: 'High-converting online stores.',
    homepageDesc: 'High-converting online stores built to scale and maximize every sale.',
    description: 'We construct high-end digital shopping boutiques that blend luxury product editorial displays with robust, lightning-fast checkout structures.',
    iconName: 'ShoppingBag',
    imageUrl: '/images/services/e-commerce.png',
    heroText: 'High-converting online stores built for seamless shopping\nand business growth.',
    overview: 'A successful online store does more than sell products. It builds trust and drives growth. We develop custom e-commerce stores that combine seamless shopping experiences, secure payments, and high-performance technology to maximize conversions.',
    challenges: [
      'Low online sales and abandoned carts.',
      'Slow stores that discourage customers.',
      'Complicated checkout experiences.',
      'Platforms that struggle as the business grows.',
    ],
    solutions: [
      'Seamless shopping experiences designed to increase conversions.',
      'Fast-loading online stores with smooth navigation.',
      'Simple, secure, and user-friendly purchasing journeys.',
      'Scalable e-commerce solutions built for long-term success.',
    ],
    benefits: [
      { label: 'Conversion Rate', value: '+35% cart checkouts' },
      { label: 'Load Speed', value: '70% faster transition times' },
      { label: 'Scalability', value: 'Support for 10k+ requests/sec' },
    ],
    technologies: ['Headless Shopify API', 'React', 'TypeScript', 'Stripe API', 'GraphQL', 'Tailored CSS', 'Vercel Serverless'],
    process: [
      { phase: '01', title: 'Discover', desc: 'Understanding your products, customers, and business objectives.' },
      { phase: '02', title: 'Store Planning', desc: 'Planning your store structure, shopping journey, and conversion strategy.' },
      { phase: '03', title: 'Store Development', desc: 'Building a secure, high-performance online store tailored to your brand.' },
      { phase: '04', title: 'Testing & Payments', desc: 'Testing checkout, payments, responsiveness, and the complete shopping experience.' },
      { phase: '05', title: 'Growth & Support', desc: 'Providing ongoing improvements, updates, and support as your store expands.' },
    ],
    faq: [
      { question: 'Can you build an online store for my business?', answer: 'Yes. We create secure, user-friendly online stores tailored to your products and customers.' },
      { question: 'Will customers be able to pay online safely?', answer: 'Yes. We integrate trusted and secure payment gateways for a smooth checkout experience.' },
      { question: 'Can I manage products myself?', answer: "Yes. You'll be able to add, update, and manage products with ease." },
    ]
  },
  {
    id: 'custom-apps',
    title: 'Custom Web Applications',
    categoryLabel: 'WEB APP',
    shortDesc: 'Tailored business applications.',
    homepageDesc: 'Tailored web applications designed around your unique business workflows.',
    description: 'We develop secure, responsive, and robust software products that solve critical workflows and delight power users.',
    iconName: 'Cpu',
    imageUrl: '/images/services/custom-apps.png',
    heroText: 'Tailored software engineered to streamline operations and\naccelerate growth.',
    overview: 'Custom web applications should be powerful, intuitive, and built to scale. We develop secure, high-performance business software, client portals, dashboards, and SaaS platforms that streamline operations and support long-term growth.',
    challenges: [
      'Manual workflows that waste valuable time.',
      'Multiple disconnected systems.',
      'Software that cannot adapt to changing needs.',
      'Performance issues as usage increases.',
    ],
    solutions: [
      'Custom applications that automate everyday operations.',
      'Integrated platforms that simplify business processes.',
      'Flexible solutions tailored specifically to your workflows.',
      'Secure, scalable applications built for future growth.',
    ],
    benefits: [
      { label: 'Developer Velocities', value: 'Modular, self-documenting code' },
      { label: 'Security Level', value: 'Zero high-vulnerability ratings' },
      { label: 'Responsiveness', value: 'Sub-100ms UI interaction latency' },
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL Schema Design', 'Zustand State Management', 'REST/GraphQL APIs'],
    process: [
      { phase: '01', title: 'Discover', desc: 'Understanding your workflows, challenges, and business requirements.' },
      { phase: '02', title: 'Solution Planning', desc: 'Designing a scalable application architecture tailored to your operations.' },
      { phase: '03', title: 'Application Development', desc: 'Developing secure, reliable software that streamlines everyday processes.' },
      { phase: '04', title: 'Testing & Deployment', desc: 'Ensuring performance, security, and seamless deployment across environments.' },
      { phase: '05', title: 'Continuous Improvement', desc: 'Enhancing features, performance, and functionality as your business evolves.' },
    ],
    faq: [
      { question: 'Can you build software specifically for my business?', answer: 'Yes. Every application is developed around your unique business processes and requirements.' },
      { question: 'Can the application connect with other systems?', answer: 'Yes. We can integrate your application with existing tools and third-party services.' },
      { question: 'Will the application be secure?', answer: 'Yes. Security and reliability are built into every solution from the start.' },
    ]
  },
  {
    id: 'digital-marketing',
    title: 'Social Media Marketing',
    categoryLabel: 'MARKETING',
    shortDesc: 'Campaigns that drive growth.',
    homepageDesc: 'Strategic campaigns that strengthen your brand and drive measurable growth.',
    description: 'We construct premium brand narratives, design creative assets, and build custom sharing frameworks that drive engagement.',
    iconName: 'Share2',
    imageUrl: '/images/services/digital-marketing.png',
    heroText: 'Creative content and campaigns designed to build awareness\nand drive engagement.',
    overview: 'Social media is where brands build lasting relationships. We design impactful campaigns and engaging content that strengthen your brand, grow your audience, and drive meaningful results.',
    challenges: [
      'Low engagement across social platforms.',
      'Inconsistent brand presence.',
      'Difficulty reaching the right audience.',
      'Content that delivers little business impact.',
    ],
    solutions: [
      'Creative content that captures attention and builds trust.',
      'Strategic campaigns with consistent messaging.',
      'Targeted marketing designed to increase visibility.',
      'Performance-focused strategies that support measurable growth.',
    ],
    benefits: [
      { label: 'Organic Growth', value: 'Double-digit audience expansions' },
      { label: 'Publish Efficiency', value: 'Automated cross-platform scheduling' },
      { label: 'Brand Alignment', value: 'Unified creative design layouts' },
    ],
    technologies: ['Figma API', 'Dynamic OG Image Generation', 'Buffer/Hootsuite Integration', 'Analytical API hooks', 'Tailored SVG templates'],
    process: [
      { phase: '01', title: 'Discover', desc: 'Understanding your brand, audience, and marketing objectives.' },
      { phase: '02', title: 'Strategy & Content', desc: 'Developing a content plan and campaign strategy tailored to your business.' },
      { phase: '03', title: 'Creative Execution', desc: 'Producing engaging content that strengthens your digital presence.' },
      { phase: '04', title: 'Campaign Management', desc: 'Publishing, monitoring, and optimizing campaigns across social platforms.' },
      { phase: '05', title: 'Performance Growth', desc: 'Measuring results and refining strategies to achieve long-term success.' },
    ],
    faq: [
      { question: 'Which social media platforms do you support?', answer: 'We create strategies and content for the platforms that best suit your business and audience.' },
      { question: 'Can you manage my social media accounts?', answer: 'Yes. We can help plan, publish, and optimize your social media content.' },
      { question: 'How do you measure campaign success?', answer: 'We track engagement, reach, and other key performance metrics to measure results.' },
    ]
  },
  {
    id: 'ai-solutions',
    title: 'AI-Powered Solutions',
    categoryLabel: 'AI',
    shortDesc: 'Intelligent AI automation.',
    homepageDesc: 'Intelligent AI solutions that automate processes and accelerate business growth.',
    description: 'We weave machine learning and artificial intelligence capabilities directly into your web applications, optimizing operational throughput.',
    iconName: 'Sparkles',
    imageUrl: '/images/services/ai-solutions.png',
    heroText: 'Intelligent AI solutions that automate workflows\nand accelerate business growth.',
    overview: 'AI should simplify work, not complicate it. We build intelligent AI-powered solutions that automate tasks, improve decision-making, and help businesses operate faster, smarter, and more efficiently.',
    challenges: [
      'Repetitive tasks reducing productivity.',
      'Slow decision-making due to manual work.',
      'Limited customer support availability.',
      'Business processes that cannot scale efficiently.',
    ],
    solutions: [
      'AI automation that saves time and improves efficiency.',
      'Intelligent tools that deliver faster insights.',
      'AI assistants that provide instant responses around the clock.',
      'AI-powered systems designed to grow with your business.',
    ],
    benefits: [
      { label: 'API Latency', value: 'Immediate token streaming (<200ms TTFT)' },
      { label: 'Operation Savings', value: '40%+ customer support case deflection' },
      { label: 'Data Security', value: 'Private namespace data handling' },
    ],
    technologies: ['OpenAI / Anthropic APIs', 'React Streams', 'LangChain', 'Pinecone Vector Store', 'Node.js Serverless Functions'],
    process: [
      { phase: '01', title: 'Discover', desc: 'Understanding your business processes and automation opportunities.' },
      { phase: '02', title: 'AI Strategy', desc: 'Identifying the right AI solutions to achieve your business goals.' },
      { phase: '03', title: 'Solution Development', desc: 'Building intelligent tools that automate tasks and improve efficiency.' },
      { phase: '04', title: 'Testing & Integration', desc: 'Validating accuracy and integrating AI seamlessly into your existing workflows.' },
      { phase: '05', title: 'Optimization', desc: 'Continuously improving AI performance through monitoring and refinement.' },
    ],
    faq: [
      { question: 'How can AI help my business?', answer: 'AI can automate repetitive tasks, improve customer experiences, and help your team work more efficiently.' },
      { question: 'Can AI be integrated into my existing systems?', answer: 'Yes. We develop AI solutions that work seamlessly with your current business processes.' },
      { question: 'Do I need technical knowledge to use AI?', answer: 'No. We build AI solutions that are simple, intuitive, and easy to use.' },
    ]
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    categoryLabel: 'DATA',
    shortDesc: 'Actionable insights from data.',
    homepageDesc: 'Transform complex data into actionable insights for smarter business decisions.',
    description: 'We translate complex backend tracking into beautiful, interactive, and understandable charts and graphics.',
    iconName: 'BarChart3',
    imageUrl: '/images/services/data-analytics.png',
    heroText: 'Interactive dashboards and analytics built\nfor informed decision-making.',
    overview: 'Data is most valuable when it leads to better decisions. We transform complex business data into interactive dashboards, meaningful reports, and actionable insights that help organizations monitor performance and drive growth.',
    challenges: [
      'Large amounts of difficult-to-read data.',
      'Delayed reporting and manual analysis.',
      'Important trends hidden within spreadsheets.',
      'Decisions based on assumptions instead of data.',
    ],
    solutions: [
      'Clear dashboards with actionable business insights.',
      'Real-time analytics for faster decision-making.',
      'Interactive reports that highlight what matters most.',
      'Reliable reporting that supports confident business decisions.',
    ],
    benefits: [
      { label: 'Render Speeds', value: '<16ms frame redraws' },
      { label: 'Data Capacity', value: 'Flawless 100k+ data point displays' },
      { label: 'Insight Latency', value: 'Real-time WebSocket data updates' },
    ],
    technologies: ['D3.js', 'Recharts', 'React', 'TypeScript', 'WebSockets', 'Tailored SVG', 'Node.js Streams'],
    process: [
      { phase: '01', title: 'Discover', desc: 'Understanding your business objectives, data sources, and reporting needs.' },
      { phase: '02', title: 'Data Assessment', desc: 'Organizing and preparing data for meaningful analysis and reporting.' },
      { phase: '03', title: 'Dashboard Development', desc: 'Creating interactive dashboards and reports with clear business insights.' },
      { phase: '04', title: 'Validation & Testing', desc: 'Verifying accuracy and ensuring reliable, actionable reporting.' },
      { phase: '05', title: 'Continuous Insights', desc: 'Keeping dashboards updated to support ongoing business decisions.' },
    ],
    faq: [
      { question: 'Can you create custom business dashboards?', answer: 'Yes. We design dashboards that present your data in a clear and meaningful way.' },
      { question: 'Can dashboards update with new data?', answer: 'Yes. We can build dashboards that display real-time or regularly updated information.' },
      { question: 'Will the reports be easy to understand?', answer: 'Absolutely. Our reports are designed to help you make informed business decisions quickly.' },
    ]
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    categoryLabel: 'UI/UX',
    shortDesc: 'Intuitive experiences users love.',
    homepageDesc: 'Intuitive interfaces that create seamless experiences and stronger user engagement.',
    description: 'We craft high-fidelity interface layouts, typography pairings, and micro-interaction prototypes that convert.',
    iconName: 'Palette',
    imageUrl: '/images/services/ui-ux-design.png',
    heroText: 'Thoughtfully crafted interfaces that blend\nbeauty with usability.',
    overview: 'Exceptional user experiences begin with thoughtful design. We create modern, intuitive interfaces that combine visual elegance with usability to help businesses engage users and build lasting trust.',
    challenges: [
      'Confusing interfaces that frustrate users.',
      'Low engagement caused by poor usability.',
      'Inconsistent branding across products.',
      'Difficult navigation that reduces conversions.',
    ],
    solutions: [
      'Intuitive experiences designed around user needs.',
      'Clean, user-friendly designs that encourage interaction.',
      'Cohesive interfaces that strengthen brand identity.',
      'Thoughtfully structured experiences that guide users naturally.',
    ],
    benefits: [
      { label: 'Usability Rate', value: '96% customer satisfaction' },
      { label: 'Conversion Lift', value: '+30% user retention' },
      { label: 'Development Speed', value: '40% faster engineering handoff' },
    ],
    technologies: ['Figma Prototyping', 'Design Systems', 'Atomic Components', 'Custom SVG', 'Micro-Animations'],
    process: [
      { phase: '01', title: 'Research', desc: 'Understanding your users, business goals, and product requirements.' },
      { phase: '02', title: 'Wireframing', desc: 'Planning intuitive user journeys and interface layouts.' },
      { phase: '03', title: 'Visual Design', desc: 'Designing engaging interfaces that reflect your brand and improve usability.' },
      { phase: '04', title: 'User Testing', desc: 'Validating designs through testing and refining the overall experience.' },
      { phase: '05', title: 'Design Handover', desc: 'Delivering development-ready designs with ongoing implementation support.' },
    ],
    faq: [
      { question: 'Why is UI/UX design important?', answer: 'Good design makes your product easier to use, improves customer satisfaction, and increases engagement.' },
      { question: 'Can you redesign an existing website or application?', answer: 'Yes. We can improve existing interfaces while preserving your brand identity.' },
      { question: 'Will the designs be ready for development?', answer: 'Yes. We provide development-ready designs with clear specifications and assets.' },
    ]
  }
];
