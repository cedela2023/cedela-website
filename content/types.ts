/**
 * Shared content shapes. Local seed content in /content and documents coming
 * from Sanity both resolve to these types, so every page renders the same way
 * whether a field was edited in the Studio or not.
 */

export type IconName =
  | "compass"
  | "cpu"
  | "shield"
  | "graduation"
  | "landmark"
  | "banknote"
  | "umbrella"
  | "heart-pulse"
  | "zap"
  | "flame"
  | "factory"
  | "radio-tower"
  | "school"
  | "handshake"
  | "store"
  | "sprout"
  | "scale"
  | "clipboard-check"
  | "file-search"
  | "lock"
  | "brain"
  | "briefcase"
  | "target"
  | "rocket"
  | "code"
  | "network"
  | "cloud"
  | "credit-card"
  | "bar-chart"
  | "sparkles"
  | "wifi"
  | "server"
  | "life-buoy"
  | "user-check"
  | "radar"
  | "fingerprint"
  | "siren"
  | "eye"
  | "link"
  | "refresh"
  | "users"
  | "megaphone"
  | "book"
  | "award"
  | "flask"
  | "lightbulb"
  | "search"
  | "layout"
  | "gauge"
  | "globe"
  | "leaf";

export type ImageRef = {
  /** Local path in /public or a fully qualified Sanity CDN URL */
  src: string;
  alt: string;
};

export type PillarSlug =
  | "strategy-advisory"
  | "technology-solutions"
  | "cybersecurity-digital-trust"
  | "learning-innovation-research";

export type Pillar = {
  slug: PillarSlug;
  title: string;
  shortTitle: string;
  tagline: string;
  summary: string;
  intro: string;
  icon: IconName;
  image: ImageRef;
  outcomes: string[];
};

export type Service = {
  slug: string;
  pillar: PillarSlug;
  title: string;
  icon: IconName;
  summary: string;
  challenge: string;
  approach: { title: string; body: string }[];
  deliverables: string[];
  benefits: string[];
  frameworks: string[];
  image?: ImageRef;
};

export type Industry = {
  slug: string;
  title: string;
  icon: IconName;
  tagline: string;
  summary: string;
  image: ImageRef;
  challenges: { title: string; body: string }[];
  solutions: string[];
  outcomes: string[];
  services: string[]; // service slugs
};

export type Solution = {
  slug: string;
  title: string;
  kicker: string;
  icon: IconName;
  summary: string;
  href: string;
  body?: string;
  areas?: string[];
  deliverables?: string[];
  format?: { label: string; value: string }[];
};

export type Platform = {
  slug: string;
  title: string;
  icon: IconName;
  summary: string;
  status: "live" | "in-development" | "planned";
};

export type InsightCategory =
  | "article"
  | "white-paper"
  | "research"
  | "case-study"
  | "webinar"
  | "video"
  | "regulatory-update"
  | "cyber-advisory"
  | "ai-update";

export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  category: InsightCategory;
  publishedAt: string;
  author: { name: string; role?: string; image?: ImageRef };
  image?: ImageRef;
  readingMinutes?: number;
  featured?: boolean;
  /** Portable Text from Sanity, or a simple list of blocks for seed content */
  body: PortableBlock[] | SimpleBlock[];
  tags?: string[];
  attachmentUrl?: string;
  videoUrl?: string;
};

export type SimpleBlock =
  | { _type: "p"; text: string }
  | { _type: "h2"; text: string }
  | { _type: "h3"; text: string }
  | { _type: "ul"; items: string[] }
  | { _type: "quote"; text: string };

// Loose Portable Text typing to avoid a hard dependency in shared types
export type PortableBlock = { _type: string; _key?: string; [key: string]: unknown };

export type TeamMember = {
  name: string;
  role: string;
  group: "executive" | "board" | "advisory";
  bio?: string;
  image?: ImageRef;
  linkedin?: string;
};

export type Vacancy = {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  closingDate?: string;
};

export type Partner = {
  name: string;
  category: "technology" | "academic" | "professional" | "government" | "industry" | "development";
  logo?: ImageRef;
  url?: string;
};

export type Office = {
  name: string;
  label: string;
  lines: string[];
  mapQuery: string;
  image: ImageRef;
};

export type SiteSettings = {
  email: string;
  phones: string[];
  /** iRES 24/7 emergency hotline, kept separate from the general phone numbers */
  iresHotlines: string[];
  offices: Office[];
  socials: { label: string; href: string }[];
  corporateProfileUrl?: string;
  investorMemorandumUrl?: string;
  announcement?: { text: string; href?: string } | null;
};
