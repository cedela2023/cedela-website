import { cyberServices, learningServices } from "./services-cyber-learning";
import { strategyServices, technologyServices } from "./services-strategy-technology";
import type { PillarSlug, Service } from "./types";

export const services: Service[] = [
  ...strategyServices,
  ...technologyServices,
  ...cyberServices,
  ...learningServices,
];

export function getServicesByPillar(pillar: PillarSlug | string) {
  return services.filter((s) => s.pillar === pillar);
}

export function getService(pillar: string, slug: string) {
  return services.find((s) => s.pillar === pillar && s.slug === slug);
}

export function findServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function serviceHref(s: Pick<Service, "pillar" | "slug">) {
  return `/services/${s.pillar}/${s.slug}`;
}
