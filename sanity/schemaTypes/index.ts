import type { SchemaTypeDefinition } from "sanity";
import { legalPage, partner, testimonial, vacancy } from "./company";
import { homePage } from "./homePage";
import { insight } from "./insight";
import { industry, service } from "./offerings";
import { author, teamMember } from "./people";
import { imageWithAlt, richText, seoFields } from "./shared";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  imageWithAlt,
  richText,
  seoFields,
  // singletons
  siteSettings,
  homePage,
  // documents
  insight,
  author,
  teamMember,
  vacancy,
  partner,
  testimonial,
  service,
  industry,
  legalPage,
];

export const singletonTypes = new Set(["siteSettings", "homePage"]);
