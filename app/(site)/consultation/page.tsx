import { CalendarCheck, MessagesSquare, Route, UserCheck } from "lucide-react";
import { ConsultationForm } from "@/components/forms/forms";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Book a Consultation",
  description: "Talk to a CEDELA expert about strategy, digital transformation, cybersecurity, AI or capability building.",
  path: "/consultation",
});

const steps = [
  { icon: MessagesSquare, title: "Share your priorities", body: "Tell us about your organization, objectives and challenges." },
  { icon: UserCheck, title: "Meet the right expert", body: "We match you with a specialist in your sector and topic." },
  { icon: CalendarCheck, title: "A focused conversation", body: "A no-obligation session, in person or virtual, at a time that suits you." },
  { icon: Route, title: "Clear next steps", body: "You leave with practical recommendations and options." },
];

export default async function ConsultationPage({ searchParams }: PageProps<"/consultation">) {
  const sp = await searchParams;
  const interest = typeof sp.interest === "string" ? sp.interest : undefined;
  return (
    <>
      <PageHero
        compact
        crumbs={[{ label: "Book a consultation" }]}
        eyebrow="Talk to an expert"
        title="Book a consultation"
        intro="Whether you are shaping strategy, strengthening cyber resilience, adopting AI or building capability, a conversation with the right specialist is the best first step."
      />
      <Section>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow mb-6">What to expect</p>
              <h2 className="text-4xl">A conversation, not a sales pitch.</h2>
            </Reveal>
            <Stagger className="mt-10 space-y-6">
              {steps.map((s, i) => (
                <StaggerItem key={s.title} className="flex gap-5">
                  <span className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-tint text-navy">
                    <s.icon className="h-5 w-5" />
                    <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-navy font-mono text-[0.65rem] text-white">{i + 1}</span>
                  </span>
                  <div>
                    <h3 className="text-xl">{s.title}</h3>
                    <p className="mt-1 text-muted">{s.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <Reveal delay={0.1} className="rounded-[2rem] bg-mist p-8 ring-1 ring-line sm:p-10 lg:col-span-7">
            <ConsultationForm key={interest} defaultInterest={interest} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
