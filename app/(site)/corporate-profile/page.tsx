import Image from "next/image";
import { ProfileRequestForm } from "@/components/forms/forms";
import { Reveal } from "@/components/motion/reveal";
import { CheckList } from "@/components/sections/lists";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { getSiteSettings } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Corporate Profile",
  description: "Download the CEDELA Tech Park Solutions corporate profile: who we are, our business, products, methodology, industries and Vision 2030.",
  path: "/corporate-profile",
});

export default async function CorporateProfilePage() {
  const settings = await getSiteSettings();
  return (
    <>
      <PageHero compact crumbs={[{ label: "Corporate profile" }]} eyebrow="Investor, enterprise & government edition" title="Our corporate profile" intro="Innovating Today. Securing Tomorrow. A complete introduction to CEDELA, our capabilities and our ambition for Africa." />
      <Section>
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <div className="on-dark relative mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-2xl bg-midnight p-8 text-white shadow-[30px_40px_80px_-30px_rgb(8_18_63/0.6)] [transform:perspective(1200px)_rotateY(-8deg)]">
              <Image src="/images/lagos-aerial.jpg" alt="" fill sizes="384px" className="object-cover opacity-30" />
              <div className="relative flex h-full flex-col justify-between">
                <p className="font-serif text-3xl font-bold">Cedela</p>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky">Corporate profile</p>
                  <p className="mt-3 font-serif text-3xl font-bold leading-tight">Building Africa&apos;s Digital Future</p>
                </div>
              </div>
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl">Inside the profile</h2>
            <div className="mt-8">
              <CheckList columns={2} items={["Our story and journey", "Vision, mission and values", "Four business divisions", "Products and platforms, including iRES", "Industry solutions", "The CEDELA Transformation Framework", "Innovation and research", "Leadership and governance", "ESG and sustainability", "Investment opportunity and Vision 2030"]} />
            </div>
            <div className="mt-10 rounded-[2rem] bg-mist p-8 ring-1 ring-line">
              {settings.corporateProfileUrl ? (
                <>
                  <p className="font-serif text-2xl font-bold">Download the PDF</p>
                  <p className="mt-2 text-muted">The latest edition of our corporate profile.</p>
                  <div className="mt-6">
                    <ButtonLink href={settings.corporateProfileUrl} external>
                      Download corporate profile
                    </ButtonLink>
                  </div>
                </>
              ) : (
                <>
                  <p className="mb-6 font-serif text-2xl font-bold">Request your copy</p>
                  <ProfileRequestForm />
                </>
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
