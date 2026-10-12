import type { IconName, SiteSettings } from "./types";

export const company = {
  name: "CEDELA Tech Park Solutions Ltd.",
  shortName: "CEDELA",
  tagline: "Empowering Organizations. Securing the Future. Transforming Africa.",
  description:
    "CEDELA Tech Park Solutions Ltd. is an innovation, technology and consulting company that helps governments, businesses and institutions accelerate digital transformation, strengthen cybersecurity, harness artificial intelligence and build resilient digital ecosystems.",
  founded: 2016,
  incorporated: 2023,
  vision:
    "To become Africa's leading innovation, technology and consulting partner of choice, enabling organizations to thrive through secure, intelligent and sustainable digital transformation.",
  mission:
    "To empower organizations to thrive in the digital age by delivering innovative strategy, technology, cybersecurity, artificial intelligence and capacity-building solutions tailored to local realities.",
  promise:
    "We help organizations transform to a future state using the power of digital, technology and data, delivering solutions that are innovative, secure, scalable and sustainable.",
  purpose:
    "To empower governments, enterprises and institutions to harness technology, innovation, artificial intelligence, cybersecurity and data to solve complex challenges, strengthen resilience, improve lives and create sustainable economic and social value.",
};

export const siteSettings: SiteSettings = {
  email: "info@cedelatechpark.ng",
  phones: ["+234 915 795 1812", "+234 806 322 8775"],
  iresHotlines: ["+234 903 891 8044", "+234 814 914 9802"],
  offices: [
    {
      name: "Abuja",
      label: "Corporate Headquarters",
      lines: ["Plot 1606 Oka Akoko Close, Off Lagos Street", "Garki II, Abuja", "Federal Capital Territory, Nigeria"],
      mapQuery: "Oka Akoko Close, Garki II, Abuja, Nigeria",
      image: { src: "/images/abuja-architecture.jpg", alt: "Modern architecture in Abuja" },
    },
    {
      name: "Lagos",
      label: "Lagos Office",
      lines: ["5th Floor, Skywater Tower", "Ikeja, Lagos", "Nigeria"],
      mapQuery: "Skywater Tower, Ikeja, Lagos, Nigeria",
      image: { src: "/images/lagos-bridge.jpg", alt: "Aerial view of Lagos waterfront and bridge" },
    },
  ],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "X", href: "https://x.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
  corporateProfileUrl: undefined,
  investorMemorandumUrl: undefined,
  announcement: {
    text: "iRES 24/7 Cyber Incident Response is live. Report an incident any time of day.",
    href: "/products/ires",
  },
};

export const values: { letter: string; title: string; body: string; icon: IconName }[] = [
  {
    letter: "P",
    title: "Professionalism",
    icon: "briefcase",
    body: "We uphold the highest standards of competence, ethics and accountability, and deliver every engagement with discipline, integrity and respect.",
  },
  {
    letter: "L",
    title: "Leadership",
    icon: "compass",
    body: "We lead through vision, innovation and example. We challenge conventional thinking and help clients navigate complexity with clarity and purpose.",
  },
  {
    letter: "I",
    title: "Innovation",
    icon: "lightbulb",
    body: "We continuously explore emerging technologies, creative approaches and new business models to solve evolving challenges and unlock future opportunities.",
  },
  {
    letter: "S",
    title: "Service",
    icon: "handshake",
    body: "Our success is measured by the value we create for our clients. We are committed to exceptional service, long-term partnerships and outcomes that exceed expectations.",
  },
];

export const timeline: { year: string; title: string; body: string }[] = [
  {
    year: "2016",
    title: "Founded as a social enterprise",
    body: "CEDELA begins its journey with a mission to bridge the gap between technology, innovation and societal development.",
  },
  {
    year: "2017–2020",
    title: "Building capacity",
    body: "Consulting, training and digital capacity-building programmes expand across multiple sectors.",
  },
  {
    year: "2021–2022",
    title: "Cyber and advisory depth",
    body: "Capabilities strengthen in cybersecurity, governance, digital transformation and technology advisory.",
  },
  {
    year: "2023",
    title: "Incorporated",
    body: "CEDELA Tech Park Solutions Ltd. is incorporated, marking the transition to a private technology and consulting company.",
  },
  {
    year: "2024",
    title: "Portfolio expansion",
    body: "The service portfolio grows to include AI strategy, managed cybersecurity services, digital platforms and enterprise technology solutions.",
  },
  {
    year: "2025",
    title: "iRES and regional growth",
    body: "Proprietary solutions advance, including the iRES 24/7 Cyber Incident Response Centre, alongside new partnerships and regional ambition.",
  },
  {
    year: "2030",
    title: "Vision 2030",
    body: "A leading African innovation and technology company, trusted by governments, enterprises and development partners across the continent.",
  },
];

export const differentiators: { title: string; body: string; icon: IconName; benefits: string[] }[] = [
  {
    title: "Strategy-led transformation",
    icon: "target",
    body: "Every engagement begins with your objectives, not with technology. We align investment with business priorities so transformation lasts.",
    benefits: ["Business and technology in step", "Stronger return on investment", "Sustainable change"],
  },
  {
    title: "Cybersecurity by design",
    icon: "shield",
    body: "Governance, privacy, resilience and security controls are built in from the first workshop, never bolted on at the end.",
    benefits: ["Reduced cyber risk", "Improved compliance", "Stronger digital trust"],
  },
  {
    title: "End-to-end capabilities",
    icon: "network",
    body: "Strategy, technology, cybersecurity and capability building under one roof, so you work with a single accountable partner.",
    benefits: ["Less complexity", "Consistent governance", "Faster implementation"],
  },
  {
    title: "Local insight, global standards",
    icon: "globe",
    body: "Deep understanding of African markets combined with internationally recognised frameworks and best practice.",
    benefits: ["Globally aligned, locally relevant", "Lower implementation risk", "Regulatory readiness"],
  },
  {
    title: "Research and innovation",
    icon: "flask",
    body: "We invest in research, emerging technologies and proprietary platforms so our clients benefit from practical, future-ready solutions.",
    benefits: ["Faster innovation", "Increased competitiveness", "Future-ready capabilities"],
  },
  {
    title: "Client-centred delivery",
    icon: "users",
    body: "We tailor every engagement to your maturity, sector and context, and we measure success by the outcomes you achieve.",
    benefits: ["Solutions that fit", "Knowledge transfer built in", "Long-term partnership"],
  },
];

export const transformationFramework: { phase: string; title: string; summary: string; body: string; items: string[]; icon: IconName }[] = [
  {
    phase: "01",
    title: "Discover",
    summary: "Understanding the business",
    icon: "search",
    body: "Every successful engagement begins with listening. We work with executive leadership and key stakeholders to understand where the organization is today and where it intends to be.",
    items: ["Business objectives", "Strategic priorities", "Operating model", "Technology landscape", "Regulatory obligations", "Organizational culture"],
  },
  {
    phase: "02",
    title: "Assess",
    summary: "Evaluating current capability",
    icon: "gauge",
    body: "Structured assessments determine maturity across multiple domains and give leadership a clear, evidence-based baseline.",
    items: ["Digital readiness", "Cybersecurity maturity", "AI readiness", "Governance and risk", "Infrastructure", "Skills"],
  },
  {
    phase: "03",
    title: "Design",
    summary: "Creating the roadmap",
    icon: "layout",
    body: "We work collaboratively to shape a practical transformation roadmap, business case and target architecture aligned with organizational priorities.",
    items: ["Strategic planning", "Enterprise architecture", "Business cases", "Operating model design", "Security architecture", "Change strategy"],
  },
  {
    phase: "04",
    title: "Deliver",
    summary: "Implementing solutions",
    icon: "rocket",
    body: "Execution is where strategy becomes reality. We implement technology, security and business change with disciplined programme management.",
    items: ["Systems integration", "Software development", "Cloud migration", "SOC deployment", "Programme management", "Vendor coordination"],
  },
  {
    phase: "05",
    title: "Secure",
    summary: "Embedding digital trust",
    icon: "lock",
    body: "Security, privacy, governance and resilience are embedded throughout the lifecycle rather than treated as a separate activity.",
    items: ["Risk management", "Secure development", "Identity management", "Compliance", "Business continuity", "Operational resilience"],
  },
  {
    phase: "06",
    title: "Enable",
    summary: "Empowering people",
    icon: "graduation",
    body: "Technology alone does not transform organizations. People do. We invest heavily in knowledge transfer and capability development.",
    items: ["Executive coaching", "User training", "Certifications", "Cyber awareness", "AI literacy", "Operating procedures"],
  },
  {
    phase: "07",
    title: "Sustain",
    summary: "Continuous improvement",
    icon: "refresh",
    body: "Transformation is a continuous journey. We stay alongside our clients to measure, optimise and keep value compounding.",
    items: ["Managed services", "Continuous monitoring", "KPI reporting", "Governance reviews", "Strategic advisory", "Quarterly health checks"],
  },
];

export const deliveryPrinciples: { title: string; body: string }[] = [
  { title: "Client-centric", body: "Every solution is designed around client objectives." },
  { title: "Secure by design", body: "Security is embedded from day one." },
  { title: "Innovation first", body: "Emerging technologies are used where they create measurable value." },
  { title: "Data-driven", body: "Decisions are based on evidence, analytics and measurable outcomes." },
  { title: "Collaborative", body: "We work with our clients, not simply for them." },
  { title: "Outcome focused", body: "Success is measured by business outcomes rather than project completion." },
];

export const commitments: { title: string; body: string }[] = [
  { title: "We listen first", body: "We begin by understanding your vision, objectives, operating environment and long-term aspirations." },
  { title: "We design thoughtfully", body: "Solutions are tailored to your priorities, culture, regulatory environment and operational realities." },
  { title: "We deliver excellence", body: "Recognised frameworks, proven methods and experienced professionals deliver measurable results." },
  { title: "We build capability", body: "Lasting transformation depends on people, so knowledge transfer and mentoring are part of every engagement." },
  { title: "We create sustainable value", body: "Our success is measured by the long-term value you create, not simply by the completion of projects." },
];

export const challenges: { title: string; body: string; icon: IconName }[] = [
  { title: "Fragmented digital strategies", icon: "layout", body: "Technology investments made department by department lead to duplication, inefficiency and poor return on investment." },
  { title: "Escalating cyber threats", icon: "siren", body: "Ransomware, phishing, insider threats and supply chain attacks make cybersecurity a strategic business imperative." },
  { title: "Regulatory complexity", icon: "scale", body: "Expanding rules on privacy, data protection, financial services and operational resilience demand specialist expertise." },
  { title: "Technology skills gap", icon: "graduation", body: "Shortages in cybersecurity, AI, cloud and data skills stop technology investments delivering their intended outcomes." },
  { title: "Legacy systems", icon: "server", body: "Outdated infrastructure limits innovation, raises operating costs and increases exposure to risk." },
  { title: "Innovation execution", icon: "lightbulb", body: "Good ideas stall without the structured processes, governance and investment needed to scale them." },
];

export const philosophy: { title: string; body: string }[] = [
  { title: "Human-centred", body: "Designed to improve lives and empower people." },
  { title: "Secure by design", body: "Cybersecurity embedded from the outset." },
  { title: "Innovation-led", body: "Emerging technologies embraced responsibly." },
  { title: "Data-driven", body: "Informed decisions through trusted insight." },
  { title: "Inclusive", body: "Opportunity for organizations and communities alike." },
  { title: "Sustainable", body: "Long-term economic, social and environmental value." },
];

export const vision2030Pillars: { title: string; body: string; icon: IconName; items: string[] }[] = [
  { title: "Trusted advisory", icon: "compass", body: "A preferred strategic partner helping organizations make confident, informed and future-focused decisions.", items: ["Business strategy", "Digital transformation", "Governance, risk and compliance", "Artificial intelligence"] },
  { title: "Technology leadership", icon: "cpu", body: "Modern technology solutions that improve productivity, resilience and service delivery.", items: ["Cloud computing", "Enterprise applications", "Data and AI", "Intelligent automation"] },
  { title: "Cybersecurity and digital trust", icon: "shield", body: "One of Africa's most trusted cybersecurity practices, with iRES as its cornerstone.", items: ["Managed security", "Security operations", "Digital forensics", "Threat intelligence"] },
  { title: "Innovation and research", icon: "flask", body: "Research translated into proprietary products and services that create measurable value.", items: ["Responsible AI", "Smart government", "Digital public infrastructure", "Digital trust"] },
  { title: "Talent and leadership", icon: "graduation", body: "A high-performing workforce and an employer of choice for technology professionals.", items: ["Executive education", "Graduate development", "Leadership academies", "Mentorship"] },
  { title: "Regional expansion", icon: "globe", body: "Growth across West Africa first, then broader African markets, through careful selection and strong local partnerships.", items: ["Strategic partnerships", "Representative offices", "Regional delivery hubs", "Digital service platforms"] },
  { title: "Sustainable impact", icon: "leaf", body: "Commercial success and societal impact that reinforce one another.", items: ["Digital inclusion", "Entrepreneurship", "Cyber awareness", "Institutional capacity"] },
];

export const ecosystem2030: string[] = [
  "Strategy & Advisory Practice",
  "Technology Solutions Practice",
  "Cybersecurity & Digital Trust Practice",
  "Learning, Innovation & Research Practice",
  "CEDELA Tech Park",
  "Innovation Labs",
  "AI Centre of Excellence",
  "Cybersecurity Centre of Excellence",
  "Executive Leadership Academy",
  "Research Institute",
  "Startup Incubation Programme",
  "iRES Intelligent Response & Emergency Service",
  "Digital Platforms & SaaS Solutions",
];

export const growthStrategy: { title: string; body: string }[] = [
  { title: "Expand advisory services", body: "Strengthen our position as a trusted advisor in strategy, governance, digital transformation and cybersecurity." },
  { title: "Scale technology solutions", body: "Grow software engineering, cloud, AI, data and systems integration to serve larger enterprise and government clients." },
  { title: "Grow managed services", body: "Expand recurring revenue through managed security, managed cloud, IT operations and continuous advisory." },
  { title: "Develop proprietary platforms", body: "Invest in scalable intellectual property including iRES, GRC platforms, AI decision support and executive dashboards." },
  { title: "Build the innovation ecosystem", body: "Develop Innovation Labs, Centres of Excellence, research, executive education and startup incubation." },
  { title: "Regional expansion", body: "Extend beyond Nigeria into strategic African markets through partnerships, delivery hubs and digital platforms." },
];

export const revenueStreams: { title: string; body: string }[] = [
  { title: "Strategy & Advisory", body: "Consulting engagements, executive advisory, assessments and transformation programmes." },
  { title: "Technology Solutions", body: "Software development, cloud services, systems integration, data analytics and infrastructure modernisation." },
  { title: "Cybersecurity & Digital Trust", body: "Security consulting, managed security, incident response, GRC, SOC as a Service and digital forensics." },
  { title: "Learning, Innovation & Research", body: "Executive education, professional training, certification programmes, innovation labs and research." },
  { title: "Managed Services", body: "Ongoing operational support, monitoring, governance and recurring advisory services." },
  { title: "Digital Platforms", body: "Subscription products, SaaS offerings and proprietary platforms such as iRES." },
];

export const investmentHighlights: { title: string; body: string; icon: IconName }[] = [
  { title: "Market opportunity", icon: "bar-chart", body: "Growing demand for digital transformation, AI, cybersecurity and cloud services across Africa." },
  { title: "Integrated business model", icon: "network", body: "Consulting, technology, managed services, training and proprietary platforms under one brand." },
  { title: "Scalable intellectual property", icon: "sparkles", body: "Investment in products such as iRES and a pipeline of future digital platforms." },
  { title: "Experienced leadership", icon: "users", body: "Multidisciplinary expertise across strategy, technology, governance and cybersecurity." },
  { title: "Innovation-led growth", icon: "flask", body: "Research, Centres of Excellence and Innovation Labs supporting continuous development." },
  { title: "Regional ambition", icon: "globe", body: "Expansion through partnerships and scalable delivery models across African markets." },
];

export const marketTrends: { title: string; body: string }[] = [
  { title: "Digital transformation", body: "Organizations continue to invest in modern technology to improve efficiency, service delivery and competitiveness." },
  { title: "Cybersecurity", body: "Growing threats and regulatory expectations are increasing investment in resilience, governance and incident response." },
  { title: "Artificial intelligence", body: "AI is moving from experimentation to enterprise adoption, creating demand for strategy, governance and skills." },
  { title: "Digital public infrastructure", body: "Governments are expanding digital identity, payments and citizen services, and need trusted partners." },
  { title: "Skills development", body: "The digital economy needs a workforce equipped with advanced technology and cybersecurity capability." },
];

export const governanceCommittees: { title: string; body: string }[] = [
  { title: "Audit & Risk Committee", body: "Oversight of financial reporting, internal controls, risk management and compliance." },
  { title: "Strategy & Innovation Committee", body: "Guidance on strategic direction, investment priorities, research and product development." },
  { title: "Remuneration & Governance Committee", body: "Stewardship of board effectiveness, leadership succession and remuneration policy." },
];

export const governanceFocus: string[] = [
  "Strategic oversight",
  "Ethical business conduct",
  "Risk management",
  "Regulatory compliance",
  "Financial stewardship",
  "Information security",
  "Data privacy",
  "Operational resilience",
  "Stakeholder engagement",
];

export const leadershipPrinciples: { title: string; body: string }[] = [
  { title: "Lead with integrity", body: "Conduct business honestly, transparently and ethically." },
  { title: "Inspire innovation", body: "Encourage creativity, experimentation and continuous improvement." },
  { title: "Focus on clients", body: "Place client success at the centre of every decision." },
  { title: "Empower people", body: "Develop future leaders through mentoring, coaching and knowledge sharing." },
  { title: "Deliver excellence", body: "Pursue the highest standards of quality, professionalism and accountability." },
];

export const leadershipExpertise: string[] = [
  "Strategy & Management Consulting",
  "Digital Transformation",
  "Cybersecurity",
  "Artificial Intelligence",
  "Technology Architecture",
  "Governance, Risk & Compliance",
  "Project & Programme Management",
  "Data & Analytics",
  "Enterprise Architecture",
  "Innovation & Research",
];

export const esg = {
  pillars: [
    { title: "Environmental", icon: "leaf" as IconName, body: "Responsible technology practices that minimise environmental impact and encourage sustainable resource use.", items: ["Paper-light, digital-first operations", "Energy-efficient technology choices", "Cloud strategies that optimise resources", "Virtual collaboration to cut travel", "Responsible e-waste management", "Sustainable procurement"] },
    { title: "Social", icon: "users" as IconName, body: "Empowering people and communities through digital inclusion, education, innovation and skills development.", items: ["Digital skills development", "Youth empowerment and internships", "Community cyber awareness", "Digital inclusion programmes", "Support for entrepreneurs", "Hackathons and innovation challenges"] },
    { title: "Governance", icon: "scale" as IconName, body: "The highest standards of ethics, transparency, accountability and responsible business conduct.", items: ["Ethical leadership", "Data privacy and information security", "Anti-corruption and anti-bribery", "Responsible AI practices", "Risk management", "Stakeholder engagement"] },
  ],
  responsibleAI: ["Fairness and non-discrimination", "Transparency and explainability", "Human oversight", "Privacy and data protection", "Cybersecurity by design", "Accountability", "Regulatory compliance", "Continuous monitoring"],
  indicators: ["Professionals trained", "Students reached", "Organizations supported", "Research publications", "Innovation projects launched", "Community outreach programmes", "Partnerships established", "Cybersecurity awareness campaigns", "Volunteer hours"],
  priorities: [
    "Expanding digital skills development across Africa",
    "Establishing Innovation Labs and Centres of Excellence",
    "Supporting government digital transformation",
    "Advancing responsible AI adoption",
    "Promoting cybersecurity awareness",
    "Developing secure digital public services",
    "Encouraging entrepreneurship and innovation",
    "Strengthening ESG governance across our operations",
    "Investing in research and knowledge creation",
  ],
};

export const partnershipTypes: { slug: string; title: string; icon: IconName; body: string; items: string[] }[] = [
  { slug: "technology", title: "Technology alliances", icon: "cpu", body: "Strategic relationships with global technology providers give our clients access to leading platforms, enablement programmes and joint innovation.", items: ["Cloud platforms", "Cybersecurity technologies", "Artificial intelligence", "Data and analytics", "Enterprise applications", "Digital identity"] },
  { slug: "academic", title: "Academic collaborations", icon: "school", body: "Universities, polytechnics and research centres help us bridge research and practice while developing future technology leaders.", items: ["Joint research", "Industry-focused curricula", "Postgraduate research support", "Innovation laboratories", "Internships and graduate programmes", "Conferences and workshops"] },
  { slug: "professional", title: "Professional memberships", icon: "award", body: "Engagement with recognised professional bodies reinforces our commitment to standards, ethics and lifelong learning.", items: ["Best practice promotion", "Professional certification", "Policy contributions", "Knowledge sharing", "Continuous learning", "Professional networks"] },
  { slug: "government", title: "Government engagements", icon: "landmark", body: "We support national digital transformation agendas alongside ministries, agencies and regulators.", items: ["National cybersecurity", "Digital government", "Smart cities", "Digital identity", "AI policy", "Critical infrastructure protection"] },
  { slug: "industry", title: "Industry associations", icon: "network", body: "Industry networks let us share insight, shape standards and collaborate on challenges that no single organization can solve alone.", items: ["Sector working groups", "Standards development", "Executive roundtables", "Thought leadership", "Innovation forums", "Communities of practice"] },
  { slug: "development", title: "Development partners", icon: "handshake", body: "Multilateral institutions, donor agencies and foundations partner with us to advance digital inclusion and institutional capacity.", items: ["Digital inclusion", "Cybersecurity capacity building", "Youth skills development", "Public sector modernisation", "AI for development", "Digital public infrastructure"] },
];

export const collaborationPrinciples: { title: string; body: string }[] = [
  { title: "Shared vision", body: "Alignment on purpose, objectives and expected outcomes." },
  { title: "Trust", body: "Open communication, integrity and mutual accountability." },
  { title: "Excellence", body: "Commitment to quality and continuous improvement." },
  { title: "Innovation", body: "Joint exploration of emerging opportunities and technologies." },
  { title: "Sustainability", body: "Long-term relationships that generate enduring value for everyone involved." },
];

export const partnershipLifecycle = ["Identify opportunity", "Strategic alignment", "Partnership design", "Formal agreement", "Joint delivery", "Performance review", "Innovation and growth"];

export const careers = {
  culture: ["Collaboration", "Curiosity", "Professional growth", "Diversity of thought", "Continuous learning", "Innovation", "Client-centricity", "Accountability"],
  development: ["Technical certifications", "Leadership development", "Executive coaching", "AI and data literacy", "Cybersecurity specialisations", "Project management", "Innovation workshops", "Mentorship programmes"],
  inclusion: ["Equal opportunity", "Merit-based advancement", "Respect and inclusion", "Cross-functional collaboration", "Gender diversity", "Youth development"],
};

export const frameworksCatalogue: string[] = [
  "ISO/IEC 27001",
  "ISO 22301",
  "ISO/IEC 20000",
  "NIST Cybersecurity Framework",
  "COBIT",
  "ITIL",
  "TOGAF",
  "PMBOK",
  "CIS Controls",
  "PCI DSS",
  "SABSA",
  "ISO/IEC 42001",
];
