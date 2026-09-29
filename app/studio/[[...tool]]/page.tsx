import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";
import { isSanityConfigured } from "../../../sanity/env";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#08123f", color: "#fff", fontFamily: "Calibri, system-ui, sans-serif", padding: 24 }}>
        <div style={{ maxWidth: 560 }}>
          <p style={{ color: "#77D4FC", letterSpacing: 3, fontSize: 12, fontWeight: 700, textTransform: "uppercase" }}>Content Studio</p>
          <h1 style={{ fontFamily: "Cambria, Georgia, serif", fontSize: 40, margin: "12px 0" }}>Connect a Sanity project</h1>
          <p style={{ opacity: 0.75, lineHeight: 1.6 }}>
            Add NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET to your environment, then restart the server. The website keeps showing its built-in
            content until then. See README.md for the full setup.
          </p>
        </div>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
