"use client";

/**
 * Sanity Studio, mounted at /studio.
 */
import { visionTool } from "@sanity/vision";
import { createElement } from "react";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes, singletonTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "cedela",
  title: "CEDELA",
  icon: () => createElement("img", { src: "/logo/cedela-mark.png", alt: "", style: { width: "100%", height: "100%", objectFit: "contain" } }),
  basePath: "/studio",
  projectId: projectId || "placeholder",
  dataset,
  schema: {
    types: schemaTypes,
    // Singletons cannot be created from the "new document" menu
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : input,
  },
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: { previewMode: { enable: "/api/draft-mode/enable" } },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
