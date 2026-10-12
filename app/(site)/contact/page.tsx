import { Briefcase, Mail, Megaphone, Phone, Users } from "lucide-react";
import { OfficeMap } from "@/components/contact/office-map";
import { ContactForm } from "@/components/forms/forms";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { getSiteSettings } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact CEDELA in Abuja or Lagos for general enquiries, business development, media and careers.",
  path: "/contact",
});

const types = ["general", "business", "media", "careers", "partnership", "investor"];

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const settings = await getSiteSettings();
  const sp = await searchParams;
  const requested = typeof sp.type === "string" && types.includes(sp.type) ? sp.type : undefined;

  const channels = [
    { icon: Mail, title: "General enquiries", body: "Questions about CEDELA and our work.", type: "general" },
    { icon: Briefcase, title: "Business development", body: "New engagements, proposals and tenders.", type: "business" },
    { icon: Megaphone, title: "Media enquiries", body: "Press, interviews and speaking requests.", type: "media" },
    { icon: Users, title: "Careers", body: "Roles, internships and the graduate programme.", type: "careers" },
  ];

  return (
    <>
      <PageHero
        compact
        crumbs={[{ label: "Contact" }]}
        eyebrow="Contact us"
        title="Let us start a conversation"
        intro="Tell us what you are working on. We respond to every enquiry within one business day."
        aside={
          <div className="space-y-3">
            {settings.phones.map((p) => (
              <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="flex items-center gap-4 rounded-2xl bg-white/[0.06] px-5 py-4 ring-1 ring-white/10 transition hover:bg-white/10">
                <Phone className="h-5 w-5 text-sky" />
                <span className="font-serif text-xl font-bold">{p}</span>
              </a>
            ))}
            <a href={`mailto:${settings.email}`} className="flex items-center gap-4 rounded-2xl bg-white/[0.06] px-5 py-4 ring-1 ring-white/10 transition hover:bg-white/10">
              <Mail className="h-5 w-5 text-sky" />
              <span className="font-serif text-xl font-bold">{settings.email}</span>
            </a>
          </div>
        }
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="How can we help?" title="Choose the right team" titleClassName="!text-4xl" />
            <Stagger className="mt-10 grid gap-3">
              {channels.map((c) => (
                <StaggerItem key={c.title}>
                  <a href={`/contact?type=${c.type}#form`} className="group flex items-center gap-5 rounded-2xl p-5 ring-1 ring-line transition hover:bg-tint hover:ring-navy/25">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-tint text-navy transition group-hover:bg-navy group-hover:text-white">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-serif text-xl font-bold">{c.title}</span>
                      <span className="text-[0.96rem] text-muted">{c.body}</span>
                    </span>
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
            <p className="mt-8 rounded-2xl bg-alert/5 p-5 text-[0.97rem] text-ink ring-1 ring-alert/20">
              <strong className="text-alert">Experiencing a cyber incident?</strong> Do not use this form.{" "}
              <a href="/products/ires/report" className="font-semibold text-alert underline underline-offset-2">
                Report it to iRES
              </a>{" "}
              or call{" "}
              {settings.iresHotlines.map((h, i) => (
                <span key={h}>
                  {i > 0 && " or "}
                  <a href={`tel:${h.replace(/\s/g, "")}`} className="font-semibold text-alert">
                    {h}
                  </a>
                </span>
              ))}
              .
            </p>
          </div>
          <Reveal delay={0.1} id="form" className="scroll-mt-32 rounded-[2rem] bg-mist p-8 ring-1 ring-line sm:p-10 lg:col-span-7">
            <h2 className="mb-8 text-3xl">Send us a message</h2>
            <ContactForm key={requested} defaultType={requested} />
          </Reveal>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeading eyebrow="Our offices" title="Visit us in Abuja or Lagos" />
        <div className="mt-12">
          <OfficeMap offices={settings.offices} />
        </div>
      </Section>
    </>
  );
}
