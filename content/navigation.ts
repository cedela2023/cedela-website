import { industries } from "./industries";
import { pillars } from "./pillars";
import { getServicesByPillar, serviceHref } from "./services";
import { solutions } from "./solutions";

export type NavLink = { label: string; href: string; description?: string };

export type MegaColumn = { title: string; href?: string; links: NavLink[] };

export type NavItem =
  | { label: string; href: string; kind: "link" }
  | {
      label: string;
      href: string;
      kind: "mega";
      intro: { title: string; body: string; cta: NavLink };
      columns: MegaColumn[];
    };

export const mainNav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    kind: "mega",
    intro: {
      title: "Four practices, one partner",
      body: "Strategy, technology, cybersecurity and capability building, integrated from first conversation to lasting results.",
      cta: { label: "Explore all services", href: "/services" },
    },
    columns: pillars.map((p) => ({
      title: p.title,
      href: `/services/${p.slug}`,
      links: getServicesByPillar(p.slug)
        .slice(0, 6)
        .map((s) => ({ label: s.title, href: serviceHref(s) })),
    })),
  },
  {
    label: "Solutions",
    href: "/solutions",
    kind: "mega",
    intro: {
      title: "Signature solutions",
      body: "Focused offerings that help leaders assess, secure and accelerate, including our flagship iRES platform.",
      cta: { label: "View all solutions", href: "/solutions" },
    },
    columns: [
      {
        title: "Assess",
        links: solutions
          .filter((s) => s.kicker === "Assessment")
          .map((s) => ({ label: s.title, href: s.href, description: s.summary })),
      },
      {
        title: "Secure and lead",
        links: solutions
          .filter((s) => ["ciso-as-a-service", "soc-as-a-service", "ires"].includes(s.slug))
          .map((s) => ({ label: s.title, href: s.href, description: s.summary })),
      },
      {
        title: "Transform",
        links: [
          ...solutions
            .filter((s) => ["digital-transformation-office", "executive-strategy-retreat"].includes(s.slug))
            .map((s) => ({ label: s.title, href: s.href, description: s.summary })),
          { label: "Our methodology", href: "/approach", description: "The CEDELA Transformation Framework" },
        ],
      },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    kind: "mega",
    intro: {
      title: "Sector depth",
      body: "Every industry has its own regulation, risks and realities. We bring sector knowledge to every engagement.",
      cta: { label: "All industries", href: "/industries" },
    },
    columns: [
      { title: "Public and social", links: industries.filter((i) => ["government", "education", "healthcare", "development-partners"].includes(i.slug)).map((i) => ({ label: i.title, href: `/industries/${i.slug}` })) },
      { title: "Financial and services", links: industries.filter((i) => ["banking-financial-services", "insurance", "telecommunications", "smes"].includes(i.slug)).map((i) => ({ label: i.title, href: `/industries/${i.slug}` })) },
      { title: "Industrial", links: industries.filter((i) => ["energy-utilities", "oil-gas", "manufacturing", "agriculture"].includes(i.slug)).map((i) => ({ label: i.title, href: `/industries/${i.slug}` })) },
    ],
  },
  { label: "Products", href: "/products", kind: "link" },
  { label: "Insights", href: "/insights", kind: "link" },
  {
    label: "Company",
    href: "/about",
    kind: "mega",
    intro: {
      title: "Built in Africa, for Africa",
      body: "From a social enterprise in 2016 to an innovation and technology company with regional ambition.",
      cta: { label: "About CEDELA", href: "/about" },
    },
    columns: [
      {
        title: "Who we are",
        links: [
          { label: "About us", href: "/about" },
          { label: "Leadership & governance", href: "/about/leadership" },
          { label: "Our approach", href: "/approach" },
          { label: "Sustainability & ESG", href: "/sustainability" },
        ],
      },
      {
        title: "Ecosystem",
        links: [
          { label: "Innovation & research", href: "/innovation" },
          { label: "Partnerships", href: "/partnerships" },
          { label: "Investors", href: "/investors" },
        ],
      },
      {
        title: "Join us",
        links: [
          { label: "Careers", href: "/careers" },
          { label: "Contact", href: "/contact" },
          { label: "Client portal", href: "/portal" },
        ],
      },
    ],
  },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Our approach", href: "/approach" },
      { label: "Careers", href: "/careers" },
      { label: "Investors", href: "/investors" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "What we do",
    links: [
      { label: "Services", href: "/services" },
      { label: "Solutions", href: "/solutions" },
      { label: "Products", href: "/products" },
      { label: "iRES", href: "/products/ires" },
      { label: "Industries", href: "/industries" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "Innovation", href: "/innovation" },
      { label: "Partnerships", href: "/partnerships" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Client portal", href: "/portal" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
];
