import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

type Tone = "white" | "mist" | "tint" | "midnight" | "navy";

const tones: Record<Tone, string> = {
  white: "bg-white",
  mist: "bg-mist",
  tint: "bg-tint",
  midnight: "on-dark bg-midnight text-white",
  navy: "on-dark bg-navy text-white",
};

export function Section({
  children,
  className,
  tone = "white",
  id,
  container = true,
  spacing = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: Tone;
  id?: string;
  container?: boolean;
  spacing?: "default" | "tight" | "none";
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        tones[tone],
        spacing === "default" && "py-20 sm:py-24 lg:py-32",
        spacing === "tight" && "py-14 sm:py-16 lg:py-20",
        className,
      )}
    >
      {container ? <div className="container-x">{children}</div> : children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  titleClassName,
  as = "h2",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center" | "split";
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2";
  children?: ReactNode;
}) {
  const Tag = as;
  if (align === "split") {
    return (
      <div className={cn("grid gap-8 lg:grid-cols-12 lg:gap-12", className)}>
        <Reveal className="lg:col-span-7">
          {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
          <Tag className={cn("text-4xl leading-[1.08] sm:text-5xl lg:text-[3.5rem]", titleClassName)}>{title}</Tag>
        </Reveal>
        {(intro || children) && (
          <Reveal delay={0.1} className="flex flex-col justify-end gap-6 lg:col-span-5">
            {intro && <p className="text-lg leading-relaxed text-muted [.on-dark_&]:text-white/70">{intro}</p>}
            {children}
          </Reveal>
        )}
      </div>
    );
  }
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className={cn("eyebrow mb-5", align === "center" && "justify-center")}>{eyebrow}</p>}
      <Tag className={cn("text-4xl leading-[1.08] sm:text-5xl lg:text-[3.5rem]", titleClassName)}>{title}</Tag>
      {intro && <p className="mt-6 text-lg leading-relaxed text-muted [.on-dark_&]:text-white/70">{intro}</p>}
      {children}
    </Reveal>
  );
}
