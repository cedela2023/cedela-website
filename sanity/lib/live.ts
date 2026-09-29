import "server-only";
import { defineLive } from "next-sanity/live";
import { client } from "./client";
import { readToken } from "./token";

/**
 * Sanity Live: `sanityFetch` tags every query with sync tags and
 * `<SanityLive />` listens to the Live Content API. When an editor publishes,
 * only the affected pages are revalidated, and open browsers refresh instantly.
 */
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: readToken || false,
  browserToken: readToken || false,
});
