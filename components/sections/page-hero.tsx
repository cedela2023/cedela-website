import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Breadcrumbs, type Crumb } from "@/components/ui/breadcrumbs";
import { LogoMark } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  image,
  actions,
  tone = "dark",
  highlight,
  aside,
  compact,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  crumbs: Crumb[];
  image?: { src: string; alt: string };
  actions?: ReactNode;
  tone?: "dark" | "light";
  highlight?: string[];
  aside?: ReactNode;
  compact?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        dark ? "on-dark grain bg-midnight text-white" : "bg-mist",
        compact ? "pb-16 pt-36 sm:pt-40" : "pb-20 pt-36 sm:pb-24 sm:pt-44 lg:pb-32",
      )}
    >
      {dark && image && (
        <>
          <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="-z-20 object-cover opacity-45" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-midnight via-midnight/90 to-midnight/40" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-midnight to-transparent" />
        </>
      )}
      {dark && !image && (
        <>
          <div className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_70%)]" />
          <div className="absolute -right-40 -top-40 -z-10 h-[38rem] w-[38rem] rounded-full bg-navy/40 blur-[120px]" />
        </>
      )}
      {!dark && <div className="grid-lines-light absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent)]" />}
      {!image && (
        <LogoMark
          className="pointer-events-none absolute -right-24 top-24 -z-10 hidden h-[30rem] w-[30rem] animate-spin-slow opacity-[0.07] lg:block"
          color={dark ? "#77D4FC" : "#0A1BC4"}
        />
      )}

      <div className="container-x">
        <Reveal y={10}>
          <Breadcrumbs items={crumbs} tone={dark ? "dark" : "light"} />
        </Reveal>
        <div className={cn("mt-10 grid gap-12", aside ? "lg:grid-cols-12 lg:items-end" : "")}>
          <div className={cn(aside ? "lg:col-span-7" : "max-w-4xl")}>
            {eyebrow && (
              <Reveal delay={0.05}>
                <p className="eyebrow mb-6">{eyebrow}</p>
              </Reveal>
            )}
            <SplitText text={title} highlight={highlight} className="text-hero font-serif font-bold tracking-[-0.02em]" delay={0.1} />
            {intro && (
              <Reveal delay={0.35}>
                <div className={cn("mt-7 max-w-2xl text-lg leading-relaxed sm:text-xl", dark ? "text-white/75" : "text-muted")}>{intro}</div>
              </Reveal>
            )}
            {actions && (
              <Reveal delay={0.45}>
                <div className="mt-10 flex flex-wrap gap-3">{actions}</div>
              </Reveal>
            )}
          </div>
          {aside && (
            <Reveal delay={0.4} className="lg:col-span-5">
              {aside}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
