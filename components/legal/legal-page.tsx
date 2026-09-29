import { RichBody } from "@/components/insights/rich-body";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { legalDefaults } from "@/content/legal";
import { getLegalPage } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export async function LegalPage({ slug }: { slug: "privacy" | "terms" }) {
  const doc = await getLegalPage(slug);
  const fallback = legalDefaults[slug];
  const title = doc?.title || fallback.title;
  const updated = doc?.updatedAt || fallback.updatedAt;
  const body = doc?.body?.length ? doc.body : fallback.body;
  return (
    <>
      <PageHero compact crumbs={[{ label: title }]} eyebrow="Legal" title={title} intro={`Last updated ${formatDate(updated)}`} />
      <Section>
        <div className="mx-auto max-w-3xl">
          <RichBody body={body} />
        </div>
      </Section>
    </>
  );
}
