import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { LogoMark } from "@/components/brand/logo";

export function CtaBand({
  eyebrow = "Let us talk",
  title = "Ready to transform your organization?",
  body = "Whether you are shaping strategy, strengthening cyber resilience or building new capability, our team is ready to help.",
  primary = { label: "Book a consultation", href: "/consultation" },
  secondary = { label: "Contact us", href: "/contact" },
  image = { src: "/images/lagos-sunset.jpg", alt: "Sunset over Lagos rooftops" },
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
  image?: { src: string; alt: string };
}) {
  return (
    <section className="bg-white px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="on-dark grain relative isolate overflow-hidden rounded-[2rem] bg-midnight text-white">
        <Image src={image.src} alt={image.alt} fill sizes="100vw" className="-z-20 object-cover opacity-35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-midnight via-midnight/90 to-navy/60" />
        <LogoMark className="absolute -right-20 -top-20 -z-10 h-96 w-96 animate-spin-slow opacity-10" color="#77D4FC" />
        <div className="container-x py-20 sm:py-28">
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-6">{eyebrow}</p>
            <h2 className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">{title}</h2>
            <p className="mt-6 max-w-2xl text-lg text-white/75">{body}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={primary.href} variant="sky" size="lg">
                {primary.label}
              </ButtonLink>
              {secondary && (
                <ButtonLink href={secondary.href} variant="outline-light" size="lg">
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
