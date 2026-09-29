import type { Platform, Solution } from "./types";

/** Featured signature solutions shown on the home page and /solutions */
export const solutions: Solution[] = [
  {
    slug: "digital-readiness-assessment",
    title: "Digital Readiness Assessment",
    kicker: "Assessment",
    icon: "gauge",
    summary: "Understand your digital maturity and get a prioritised transformation roadmap.",
    href: "/solutions/digital-readiness-assessment",
    body: "Digital transformation begins with an honest view of where you stand today. Our Digital Readiness Assessment benchmarks your organization across eight dimensions and gives leadership a clear, prioritised path forward.",
    areas: ["Digital maturity", "Technology infrastructure", "Business processes", "Leadership readiness", "Workforce capability", "Data governance", "Cybersecurity", "Innovation culture"],
    deliverables: ["Maturity score across eight dimensions", "Benchmarking insights", "Prioritised recommendations", "Transformation roadmap", "Executive presentation"],
    format: [
      { label: "Typical duration", value: "4 to 6 weeks" },
      { label: "Format", value: "Workshops, interviews, surveys and document review" },
      { label: "Audience", value: "Executive leadership and board" },
    ],
  },
  {
    slug: "cyber-maturity-assessment",
    title: "Cyber Maturity Assessment",
    kicker: "Assessment",
    icon: "shield",
    summary: "Measure your cybersecurity posture against recognised standards and know what to fix first.",
    href: "/solutions/cyber-maturity-assessment",
    body: "A structured, evidence-based evaluation of your cybersecurity posture across ten domains, producing a prioritised roadmap aligned with the NIST Cybersecurity Framework and ISO/IEC 27001.",
    areas: ["Governance", "Risk management", "Security controls", "Identity and access management", "Network security", "Cloud security", "Security operations", "Incident response", "Business continuity", "Regulatory compliance"],
    deliverables: ["Maturity rating by domain", "Gap analysis against NIST CSF and ISO/IEC 27001", "Risk-ranked findings", "Prioritised improvement roadmap", "Board-ready summary"],
    format: [
      { label: "Typical duration", value: "3 to 5 weeks" },
      { label: "Format", value: "Interviews, technical review and evidence sampling" },
      { label: "Audience", value: "Board, executive team and security leadership" },
    ],
  },
  {
    slug: "ai-readiness-assessment",
    title: "AI Readiness Assessment",
    kicker: "Assessment",
    icon: "brain",
    summary: "Prepare for AI adoption responsibly, with a roadmap tailored to your priorities.",
    href: "/solutions/ai-readiness-assessment",
    body: "Artificial intelligence presents significant opportunities, but successful adoption requires careful preparation. We examine eight readiness factors and produce an enterprise AI adoption roadmap tailored to your strategy.",
    areas: ["Business objectives", "Data quality", "Technology infrastructure", "Governance", "Ethical AI practices", "Workforce skills", "Risk management", "Regulatory considerations"],
    deliverables: ["AI readiness score", "Prioritised use case portfolio", "Responsible AI guardrails", "Skills and operating model recommendations", "Enterprise AI adoption roadmap"],
    format: [
      { label: "Typical duration", value: "3 to 4 weeks" },
      { label: "Format", value: "Leadership workshops, data review and use case sessions" },
      { label: "Audience", value: "Executive leadership, data and technology teams" },
    ],
  },
  {
    slug: "ciso-as-a-service",
    title: "CISO as a Service",
    kicker: "Managed leadership",
    icon: "user-check",
    summary: "Executive cybersecurity leadership on a flexible model, without a full-time hire.",
    href: "/services/cybersecurity-digital-trust/ciso-as-a-service",
  },
  {
    slug: "soc-as-a-service",
    title: "SOC as a Service",
    kicker: "Managed security",
    icon: "radar",
    summary: "24/7 monitoring, detection and response from our Security Operations Centre.",
    href: "/services/cybersecurity-digital-trust/soc-as-a-service",
  },
  {
    slug: "ires",
    title: "iRES",
    kicker: "Flagship platform",
    icon: "siren",
    summary: "Intelligent Response & Emergency Service. Our 24/7 Cyber Incident Response Centre.",
    href: "/products/ires",
  },
  {
    slug: "digital-transformation-office",
    title: "Digital Transformation Office",
    kicker: "Programme governance",
    icon: "layout",
    summary: "A central hub that coordinates, tracks and drives enterprise-wide transformation.",
    href: "/solutions/digital-transformation-office",
    body: "Successful transformation requires disciplined governance and programme management. Our Digital Transformation Office acts as the central coordination hub for enterprise-wide programmes, keeping leadership informed and delivery on track.",
    areas: ["Coordinating transformation initiatives", "Monitoring implementation progress", "Managing strategic portfolios", "Tracking key performance indicators", "Reporting to executive leadership", "Supporting change management"],
    deliverables: ["DTO charter and governance model", "Portfolio and benefits tracking", "Executive dashboards and reporting", "Change and adoption support", "Vendor and dependency management"],
    format: [
      { label: "Engagement model", value: "Embedded team or hybrid with your staff" },
      { label: "Typical duration", value: "6 to 24 months" },
      { label: "Audience", value: "Executive sponsor and steering committee" },
    ],
  },
  {
    slug: "executive-strategy-retreat",
    title: "Executive Strategy Retreat",
    kicker: "Leadership alignment",
    icon: "compass",
    summary: "Facilitated retreats that align boards and leadership teams on priorities and action.",
    href: "/solutions/executive-strategy-retreat",
    body: "We design and facilitate executive strategy retreats that help boards and senior leadership teams align on priorities, transformation initiatives and performance objectives. Sessions combine strategic facilitation, industry insight, risk analysis and collaborative planning to produce actionable outcomes.",
    areas: ["Strategic priorities and ambition", "Digital and AI opportunities", "Cyber risk and resilience", "Operating model and capabilities", "Performance objectives", "Implementation planning"],
    deliverables: ["Pre-retreat diagnostic and interviews", "Tailored agenda and industry briefings", "Expert facilitation", "Retreat outcomes report", "90-day action plan"],
    format: [
      { label: "Duration", value: "1 to 3 days" },
      { label: "Format", value: "Offsite or onsite, in person" },
      { label: "Audience", value: "Board members and executive leadership" },
    ],
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}

/** Solutions with their own detail page under /solutions/[slug] */
export const solutionPages = solutions.filter((s) => s.href.startsWith("/solutions/"));

export const futurePlatforms: Platform[] = [
  { slug: "ai-governance", title: "AI Governance Platform", icon: "brain", status: "in-development", summary: "Inventory, assess and monitor AI systems against responsible AI policies and emerging regulation." },
  { slug: "grc", title: "GRC Platform", icon: "clipboard-check", status: "in-development", summary: "One place to manage risks, controls, policies, audits and regulatory obligations." },
  { slug: "executive-dashboard", title: "Executive Dashboard", icon: "bar-chart", status: "planned", summary: "Real-time view of strategy execution, cyber posture and transformation KPIs for leadership." },
  { slug: "compliance-automation", title: "Compliance Automation", icon: "refresh", status: "planned", summary: "Continuous control monitoring and automated evidence collection for audits." },
  { slug: "risk-management", title: "Risk Management Platform", icon: "gauge", status: "planned", summary: "Enterprise risk registers, heat maps and treatment tracking with predictive insight." },
];

export const productCategories: { title: string; body: string }[] = [
  { title: "Cybersecurity Platforms", body: "Incident response, monitoring, resilience and digital trust." },
  { title: "Governance, Risk & Compliance", body: "Governance, compliance, risk management and assurance." },
  { title: "Artificial Intelligence", body: "AI adoption, intelligent automation and decision support." },
  { title: "Digital Transformation", body: "Enterprise digital platforms and modernisation." },
  { title: "Data & Analytics", body: "Business intelligence, executive dashboards and insight." },
  { title: "Learning & Innovation", body: "Digital learning, research and professional development." },
];
