export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-10-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export const studioUrl = "/studio";

/**
 * The site ships with complete seed content, so it renders fully before a
 * Sanity project exists. As soon as a project ID is provided, content is read
 * from Sanity and anything published there takes precedence.
 */
export const isSanityConfigured = /^[a-z0-9-]+$/.test(projectId);
