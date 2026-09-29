import { defineArrayMember, defineField, defineType } from "sanity";

export const iconOptions = [
  "compass", "cpu", "shield", "graduation", "landmark", "banknote", "umbrella", "heart-pulse", "zap", "flame",
  "factory", "radio-tower", "school", "handshake", "store", "sprout", "scale", "clipboard-check", "file-search",
  "lock", "brain", "briefcase", "target", "rocket", "code", "network", "cloud", "credit-card", "bar-chart",
  "sparkles", "wifi", "server", "life-buoy", "user-check", "radar", "fingerprint", "siren", "eye", "link",
  "refresh", "users", "megaphone", "book", "award", "flask", "lightbulb", "search", "layout", "gauge", "globe", "leaf",
];

export const iconField = defineField({
  name: "icon",
  title: "Icon",
  type: "string",
  options: { list: iconOptions },
});

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description: "Describe the image for screen readers and search engines.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
  ],
});

export const stringList = (name: string, title: string, description?: string) =>
  defineField({ name, title, description, type: "array", of: [defineArrayMember({ type: "string" })] });

export const seoFields = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: "title", title: "Meta title", type: "string", validation: (r) => r.max(70) }),
    defineField({ name: "description", title: "Meta description", type: "text", rows: 3, validation: (r) => r.max(170) }),
    defineField({ name: "image", title: "Social share image", type: "image" }),
  ],
});

export const richText = defineType({
  name: "richText",
  title: "Rich text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      marks: {
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              { name: "href", type: "url", title: "URL", validation: (r) => r.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }) },
            ],
          },
        ],
      },
    }),
    defineArrayMember({ type: "imageWithAlt" }),
    defineArrayMember({
      name: "callout",
      title: "Callout",
      type: "object",
      fields: [
        { name: "tone", type: "string", title: "Tone", options: { list: ["info", "warning", "success"] }, initialValue: "info" },
        { name: "text", type: "text", title: "Text", rows: 3 },
      ],
      preview: { select: { title: "text", subtitle: "tone" } },
    }),
  ],
});
