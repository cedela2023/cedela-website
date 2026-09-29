import type { Insight, InsightCategory } from "./types";

export const insightCategories: { value: InsightCategory; label: string }[] = [
  { value: "article", label: "Articles" },
  { value: "white-paper", label: "White Papers" },
  { value: "research", label: "Research Reports" },
  { value: "case-study", label: "Case Studies" },
  { value: "webinar", label: "Webinars" },
  { value: "video", label: "Videos" },
  { value: "regulatory-update", label: "Regulatory Updates" },
  { value: "cyber-advisory", label: "Cyber Advisories" },
  { value: "ai-update", label: "AI Updates" },
];

const singular: Record<InsightCategory, string> = {
  article: "Article",
  "white-paper": "White Paper",
  research: "Research Report",
  "case-study": "Case Study",
  webinar: "Webinar",
  video: "Video",
  "regulatory-update": "Regulatory Update",
  "cyber-advisory": "Cyber Advisory",
  "ai-update": "AI Update",
};

export function categoryLabel(value: string) {
  return singular[value as InsightCategory] ?? value;
}

/**
 * Seed insights. These render until real posts are published in Sanity and
 * can be imported with `npm run seed`. Edit or replace them freely.
 */
export const seedInsights: Insight[] = [
  {
    slug: "why-digital-transformation-stalls",
    title: "Why digital transformation stalls, and how leaders can restart it",
    excerpt:
      "Most transformation programmes do not fail because of technology. They fail because strategy, governance, people and delivery drift apart. Here is how to bring them back together.",
    category: "article",
    publishedAt: "2026-09-08",
    author: { name: "CEDELA Strategy & Advisory" },
    image: { src: "/images/team-boardroom.jpg", alt: "Leadership team meeting around a table" },
    featured: true,
    tags: ["Digital transformation", "Leadership", "Governance"],
    body: [
      { _type: "p", text: "Across the continent, governments and enterprises are investing heavily in digital technology. Yet many leaders tell us the same story: a promising start, a flurry of projects, and then a slow loss of momentum as benefits fail to appear." },
      { _type: "p", text: "In our experience, the root cause is rarely the technology itself. Transformation stalls when strategy, governance, people and delivery drift apart. Each department buys its own tools, no one owns the end-to-end outcome, and staff are asked to change how they work without the skills or support to do so." },
      { _type: "h2", text: "Four signs your programme is drifting" },
      { _type: "ul", items: ["Projects are reported by activity completed rather than value delivered.", "Several teams are solving the same problem with different systems.", "Security and compliance teams are consulted at the end, not the beginning.", "Frontline staff describe the new systems as extra work."] },
      { _type: "h2", text: "Restarting with purpose" },
      { _type: "p", text: "The organizations that recover momentum do three things well. First, they re-anchor every initiative to a small number of measurable outcomes that leadership genuinely cares about. Second, they create a single point of coordination, often a Digital Transformation Office, with the authority to prioritise, sequence and stop work. Third, they invest as much in people and change as they do in platforms." },
      { _type: "quote", text: "Technology alone does not transform organizations. Vision, strategy, trusted partnerships and resilient execution do." },
      { _type: "h2", text: "Where to begin" },
      { _type: "p", text: "Start with an honest baseline. A structured digital readiness assessment across leadership, processes, data, technology, security and culture shows where the real constraints are. From there, a sequenced roadmap with clear ownership turns ambition back into progress." },
    ],
  },
  {
    slug: "ransomware-readiness-checklist",
    title: "Ransomware readiness: a practical checklist for leadership teams",
    excerpt:
      "Ransomware remains one of the most disruptive threats facing African organizations. This advisory sets out the preparation every executive team should confirm today.",
    category: "cyber-advisory",
    publishedAt: "2026-08-21",
    author: { name: "CEDELA Cybersecurity Practice" },
    image: { src: "/images/circuit-security.jpg", alt: "Illuminated circuit board representing cybersecurity" },
    tags: ["Ransomware", "Incident response", "iRES"],
    body: [
      { _type: "p", text: "Ransomware attacks are designed to cause maximum disruption in minimum time. Attackers increasingly combine encryption with data theft, threatening to publish sensitive information unless a ransom is paid. The organizations that recover fastest are those that prepared before the attack." },
      { _type: "h2", text: "Questions every leadership team should be able to answer" },
      { _type: "ul", items: ["Do we have offline or immutable backups, and have we tested restoring them in the last quarter?", "Is multi-factor authentication enforced on email, remote access and administrator accounts?", "Do we know which systems and data are most critical to keep operating?", "Is there an incident response plan with named decision-makers and out-of-band contact details?", "Do we have access to experienced incident responders at any hour?", "Have we rehearsed a ransomware scenario with the executive team?"] },
      { _type: "h2", text: "If you are attacked" },
      { _type: "p", text: "Isolate affected systems from the network without powering them off, preserve evidence, switch to trusted communication channels and contact incident responders immediately. Avoid engaging with attackers or making payment decisions before you understand the scope of the incident and your legal obligations." },
      { _type: "p", text: "The iRES 24/7 Cyber Incident Response Centre provides rapid triage, containment, forensics coordination and recovery support, alongside executive situation reporting and regulatory notification guidance." },
    ],
  },
  {
    slug: "responsible-ai-adoption",
    title: "Responsible AI adoption starts with governance, not tools",
    excerpt:
      "Generative AI has moved from novelty to boardroom agenda. Organizations that set clear guardrails early move faster and with fewer surprises.",
    category: "ai-update",
    publishedAt: "2026-08-04",
    author: { name: "CEDELA AI Centre of Excellence" },
    image: { src: "/images/engineers-monitor.jpg", alt: "Two engineers reviewing work on a computer monitor" },
    tags: ["Artificial intelligence", "Governance", "Risk"],
    body: [
      { _type: "p", text: "Employees are already using AI tools, whether or not their organization has a policy. That makes governance urgent. Without it, sensitive data can leak into public models, decisions can be made on inaccurate outputs, and bias can creep into processes that affect customers and citizens." },
      { _type: "h2", text: "Five guardrails to put in place now" },
      { _type: "ul", items: ["An acceptable use policy that sets out approved tools and prohibited data.", "An inventory of AI systems in use, including those embedded in vendor products.", "A risk assessment process proportionate to the impact of each use case.", "Human oversight for decisions that materially affect people.", "Training so staff understand both the value and the limits of AI."] },
      { _type: "h2", text: "Governance as an accelerator" },
      { _type: "p", text: "Good governance does not slow innovation. It gives teams the confidence to experiment within clear boundaries and helps leaders prioritise the use cases most likely to create value. International frameworks such as ISO/IEC 42001 and the NIST AI Risk Management Framework offer a strong foundation that can be adapted to local context." },
    ],
  },
  {
    slug: "data-protection-compliance-nigeria",
    title: "Data protection in Nigeria: what organizations should prioritise",
    excerpt:
      "The Nigeria Data Protection Act has raised expectations for how personal data is collected, used and secured. A practical guide to the priorities for compliance teams.",
    category: "regulatory-update",
    publishedAt: "2026-07-16",
    author: { name: "CEDELA Governance, Risk & Compliance" },
    image: { src: "/images/strategy-session.jpg", alt: "Professionals discussing documents in a meeting" },
    tags: ["Data protection", "Compliance", "Regulation"],
    body: [
      { _type: "p", text: "The Nigeria Data Protection Act 2023 established a comprehensive legal framework for personal data and created the Nigeria Data Protection Commission. For many organizations, it has turned data protection from a policy exercise into an operational discipline." },
      { _type: "h2", text: "Priorities for compliance teams" },
      { _type: "ul", items: ["Map the personal data you hold, why you hold it and where it flows.", "Confirm a lawful basis for each processing activity.", "Review privacy notices so they are clear and accurate.", "Strengthen security controls proportionate to the sensitivity of the data.", "Put a breach response process in place that meets notification timelines.", "Assess vendors and partners who process personal data on your behalf."] },
      { _type: "h2", text: "Building compliance into operations" },
      { _type: "p", text: "Sustainable compliance comes from embedding privacy into everyday processes rather than relying on annual reviews. Integrating data protection with your information security management system avoids duplicated effort and gives leadership a single view of risk." },
      { _type: "p", text: "This article provides general information and is not legal advice. Organizations should seek guidance specific to their circumstances." },
    ],
  },
  {
    slug: "case-for-ciso-as-a-service",
    title: "The case for CISO as a Service in growing organizations",
    excerpt:
      "Executive security leadership is no longer optional, but a full-time CISO is not always practical. How a fractional model can close the gap.",
    category: "white-paper",
    publishedAt: "2026-06-30",
    author: { name: "CEDELA Cybersecurity Practice" },
    image: { src: "/images/executive-advisor.jpg", alt: "Executive seated in a thoughtful pose" },
    tags: ["CISO as a Service", "Cyber governance"],
    body: [
      { _type: "p", text: "Regulators, investors and customers increasingly expect organizations to demonstrate accountable cybersecurity leadership. For mid-sized institutions, however, recruiting and retaining an experienced Chief Information Security Officer is both costly and competitive." },
      { _type: "h2", text: "What a fractional CISO delivers" },
      { _type: "ul", items: ["A security strategy tied to business risk.", "Policies and governance aligned to recognised standards.", "Clear reporting to the board and regulators.", "Oversight of vendors and third-party risk.", "Mentoring that builds internal capability."] },
      { _type: "h2", text: "When the model works best" },
      { _type: "p", text: "CISO as a Service is particularly effective for organizations building their first security programme, preparing for certification or regulatory review, or bridging the gap while recruiting a permanent leader. The goal is always to leave the organization stronger and more self-sufficient." },
    ],
  },
  {
    slug: "building-africas-cyber-talent",
    title: "Building Africa's cybersecurity talent pipeline",
    excerpt:
      "The skills gap is one of the biggest barriers to digital resilience. Closing it will take employers, educators and governments working together.",
    category: "research",
    publishedAt: "2026-06-12",
    author: { name: "CEDELA Learning, Innovation & Research" },
    image: { src: "/images/classroom.jpg", alt: "Students learning in a classroom" },
    tags: ["Skills", "Education", "Workforce"],
    body: [
      { _type: "p", text: "Africa has one of the youngest populations in the world and a rapidly expanding digital economy. Yet organizations consistently report difficulty hiring people with practical cybersecurity, cloud and data skills." },
      { _type: "h2", text: "What works" },
      { _type: "ul", items: ["Industry-informed curricula that teach hands-on skills alongside theory.", "Structured graduate programmes with real project experience.", "Recognised certifications that signal capability to employers.", "Mentorship from experienced practitioners.", "Inclusive pathways that open the profession to more women and young people."] },
      { _type: "p", text: "Through executive education, professional certification and graduate development programmes, CEDELA is working with partners to build a stronger, more inclusive talent pipeline for the continent." },
    ],
  },
];
