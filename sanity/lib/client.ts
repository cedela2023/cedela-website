import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId, studioUrl } from "../env";

export const client = createClient({
  // A syntactically valid placeholder keeps the client constructible before
  // the project is created. No request is made while isSanityConfigured is false.
  projectId: isSanityConfigured ? projectId : "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: { studioUrl },
});
