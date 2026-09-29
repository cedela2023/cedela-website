import { InsightsBrowser } from "@/components/insights/insights-browser";
import { Reveal } from "@/components/motion/reveal";
import { InsightCard } from "@/components/sections/cards";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { getInsights } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Insights",
  description: "Articles, white papers, research reports, case studies, webinars, regulatory updates and cyber threat advisories from CEDELA's practitioners.",
  path: "/insights",
});

export default async function InsightsPage() {
  const insights = await getInsights();
  const lead = insights.find((i) => i.featured) ?? insights[0];
  const rest = insights.filter((i) => i.slug !== lead?.slug);

  return (
    <>
      <PageHero
        compact
        crumbs={[{ label: "Insights" }]}
        eyebrow="Knowledge hub"
        title="Insights for leaders navigating digital change"
        intro="Articles, research, cyber advisories, regulatory updates and AI perspectives from our practitioners across strategy, technology and security."
      />
      {lead && (
        <Section spacing="tight" className="pt-16 sm:pt-20">
          <Reveal>
            <InsightCard insight={lead} size="lg" />
          </Reveal>
        </Section>
      )}
      <Section tone="mist">
        <InsightsBrowser insights={rest} />
      </Section>
    </>
  );
}
