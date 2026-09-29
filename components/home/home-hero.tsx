"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Download } from "lucide-react";
import { useRef } from "react";
import { LogoMark } from "@/components/brand/logo";
import { SplitText } from "@/components/motion/split-text";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/content/types";

const ease = [0.16, 1, 0.3, 1] as const;

const pillars: { label: string; icon: IconName; href: string }[] = [
  { label: "Strategy & Advisory", icon: "compass", href: "/services/strategy-advisory" },
  { label: "Technology Solutions", icon: "cpu", href: "/services/technology-solutions" },
  { label: "Cybersecurity & Digital Trust", icon: "shield", href: "/services/cybersecurity-digital-trust" },
  { label: "Learning, Innovation & Research", icon: "graduation", href: "/services/learning-innovation-research" },
];

export function HomeHero({
  eyebrow,
  title,
  subtitle,
  image,
  profileUrl,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: { src: string; alt: string };
  profileUrl?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.08, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -80]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="on-dark grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-midnight text-white">
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 -z-30">
        <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(100deg,var(--color-midnight)_18%,rgb(8_18_63/0.86)_48%,rgb(8_18_63/0.35)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-20 h-2/5 bg-gradient-to-t from-midnight via-midnight/70 to-transparent" />
      <div className="grid-lines absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_20%_40%,black,transparent_65%)]" />

      <motion.div style={{ y: contentY, opacity: fade }} className="container-x flex flex-1 flex-col justify-center pb-16 pt-40 lg:pt-44">
        <div className="grid items-end gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="eyebrow mb-8">
              {eyebrow}
            </motion.p>
            <SplitText
              text={title}
              highlight={["digital", "trust"]}
              className="text-display font-serif font-bold tracking-[-0.025em]"
              delay={0.15}
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease }}
              className="mt-8 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl"
            >
              {subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85, ease }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <ButtonLink href="/services" variant="sky" size="lg">
                Explore our services
              </ButtonLink>
              <ButtonLink href="/consultation" variant="outline-light" size="lg">
                Request a consultation
              </ButtonLink>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.05 }}
              className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-[0.97rem] text-white/70"
            >
              <Link href="/contact?type=business" className="link-underline hover:text-white">
                Talk to an expert
              </Link>
              <Link href={profileUrl || "/corporate-profile"} className="inline-flex items-center gap-2 hover:text-white" {...(profileUrl ? { target: "_blank" } : {})}>
                <Download className="h-4 w-4" aria-hidden />
                <span className="link-underline">Download corporate profile</span>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.9, ease }}
            className="hidden lg:col-span-4 lg:block"
          >
            <div className="relative rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/15 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3ddc97] opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#3ddc97]" />
                  </span>
                  <span className="text-sm font-semibold">iRES Response Centre</span>
                </div>
                <span className="rounded-full bg-white/10 px-2.5 py-1 font-mono text-[0.7rem] tracking-wider text-sky">24/7</span>
              </div>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-white/70">Round-the-clock cyber incident response for governments, banks and enterprises.</p>
              <Link href="/products/ires" className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky">
                Discover iRES
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <LogoMark className="absolute -right-6 -top-6 h-16 w-16 animate-spin-slow opacity-80" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="relative border-t border-white/10 bg-midnight/60 backdrop-blur-md">
        <div className="container-x grid grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 + i * 0.08, ease }}
              className="border-white/10 [&:not(:last-child)]:border-r max-lg:[&:nth-child(2)]:border-r-0 max-lg:[&:nth-child(-n+2)]:border-b"
            >
              <Link href={p.href} className="group flex items-center gap-3 px-2 py-5 transition-colors hover:bg-white/[0.04] sm:px-6 sm:py-6">
                <Icon name={p.icon} className="h-5 w-5 shrink-0 text-sky" />
                <span className="text-[0.92rem] font-semibold text-white/85 group-hover:text-white sm:text-[0.98rem]">{p.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.a
        href="#intro"
        aria-label="Scroll to content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-28 right-8 hidden h-12 w-12 items-center justify-center rounded-full ring-1 ring-white/25 transition hover:bg-white/10 xl:inline-flex"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </motion.a>
    </section>
  );
}
