import { Settings as CogIcon } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "contact", title: "Contact", default: true },
    { name: "downloads", title: "Downloads" },
    { name: "banner", title: "Announcement" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "email", title: "General email", type: "string", group: "contact" }),
    defineField({ name: "phones", title: "Phone numbers", type: "array", of: [defineArrayMember({ type: "string" })], group: "contact" }),
    defineField({
      name: "offices",
      title: "Offices",
      type: "array",
      group: "contact",
      of: [
        defineArrayMember({
          type: "object",
          name: "office",
          fields: [
            { name: "name", type: "string", title: "City", validation: (r) => r.required() },
            { name: "label", type: "string", title: "Label", description: "For example: Corporate Headquarters" },
            { name: "lines", type: "array", title: "Address lines", of: [{ type: "string" }] },
            { name: "mapQuery", type: "string", title: "Map search query", description: "Used for the interactive map" },
            { name: "image", type: "imageWithAlt", title: "Photo" },
          ],
          preview: { select: { title: "name", subtitle: "label" } },
        }),
      ],
    }),
    defineField({
      name: "socials",
      title: "Social links",
      type: "array",
      group: "contact",
      of: [
        defineArrayMember({
          type: "object",
          name: "social",
          fields: [
            { name: "label", type: "string", title: "Network", options: { list: ["LinkedIn", "X", "Facebook", "Instagram", "YouTube"] } },
            { name: "href", type: "url", title: "URL" },
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
    defineField({ name: "corporateProfile", title: "Corporate profile (PDF)", type: "file", group: "downloads", options: { accept: "application/pdf" } }),
    defineField({ name: "investorMemorandum", title: "Investor Information Memorandum (PDF)", type: "file", group: "downloads", options: { accept: "application/pdf" }, description: "Leave empty until available. Visitors can request it in the meantime." }),
    defineField({
      name: "announcement",
      title: "Announcement bar",
      type: "object",
      group: "banner",
      fields: [
        { name: "enabled", type: "boolean", title: "Show announcement", initialValue: true },
        { name: "text", type: "string", title: "Text" },
        { name: "href", type: "string", title: "Link", description: "Relative (/products/ires) or absolute URL" },
      ],
    }),
    defineField({ name: "seo", title: "Default SEO", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
