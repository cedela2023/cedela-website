import type { Pillar } from "./types";

export const pillars: Pillar[] = [
  {
    slug: "strategy-advisory",
    title: "Strategy & Advisory",
    shortTitle: "Strategy",
    tagline: "Shaping the future with confidence",
    summary:
      "Helping organizations align strategy, governance, risk, AI and digital transformation with business objectives.",
    intro:
      "In a fast-changing environment, leadership teams need more than operational support. Our Strategy & Advisory practice helps boards, executives and senior leaders define priorities, strengthen governance, manage risk and align technology investment with the outcomes that matter.",
    icon: "compass",
    image: { src: "/images/team-boardroom.jpg", alt: "Leadership team in a strategy session around a boardroom table" },
    outcomes: ["Clear strategic direction", "Stronger governance and oversight", "Technology aligned with business value", "Confident, evidence-based decisions"],
  },
  {
    slug: "technology-solutions",
    title: "Technology Solutions",
    shortTitle: "Technology",
    tagline: "Enabling intelligent enterprises",
    summary:
      "Delivering enterprise software, cloud services, systems integration, payment platforms, data analytics, IoT and intelligent automation.",
    intro:
      "Technology creates value only when it is aligned with business objectives and implemented well. Our Technology Solutions practice modernises infrastructure, builds digital platforms, integrates enterprise systems, unlocks data and puts emerging technology to practical use.",
    icon: "cpu",
    image: { src: "/images/engineers-monitor.jpg", alt: "Engineers collaborating in front of a monitor showing code" },
    outcomes: ["Modern, scalable platforms", "Connected systems and data", "Lower operating cost", "Faster service delivery"],
  },
  {
    slug: "cybersecurity-digital-trust",
    title: "Cybersecurity & Digital Trust",
    shortTitle: "Cybersecurity",
    tagline: "Building confidence in a connected world",
    summary:
      "Protecting organizations through managed security, incident response, governance, risk, compliance, threat intelligence and resilience.",
    intro:
      "As organizations become more digital, cybersecurity has moved from a technical concern to a strategic business imperative. Our Cybersecurity & Digital Trust practice strengthens resilience, protects critical assets, supports regulatory compliance and builds stakeholder confidence.",
    icon: "shield",
    image: { src: "/images/soc-operations.jpg", alt: "Security analysts working at monitoring stations" },
    outcomes: ["Reduced cyber risk", "Faster detection and response", "Regulatory confidence", "Stronger stakeholder trust"],
  },
  {
    slug: "learning-innovation-research",
    title: "Learning, Innovation & Research",
    shortTitle: "Learning & Innovation",
    tagline: "Developing future-ready organizations",
    summary:
      "Developing leaders and professionals through executive education, certifications, innovation labs, research and product incubation.",
    intro:
      "Transformation succeeds only when people have the skills and confidence to embrace change. Our Learning, Innovation & Research practice develops leaders, professionals and organizations through world-class education, applied research, innovation and product development.",
    icon: "graduation",
    image: { src: "/images/women-workshop.jpg", alt: "Professionals in a collaborative learning workshop" },
    outcomes: ["Future-ready workforce", "Leaders who drive change", "Ideas turned into products", "Insight that informs decisions"],
  },
];

export function getPillar(slug: string) {
  return pillars.find((p) => p.slug === slug);
}
