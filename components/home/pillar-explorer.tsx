"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import type { Pillar } from "@/content/types";
import { cn } from "@/lib/utils";

type Item = Pillar & { services: { title: string; href: string }[]; count: number };

export function PillarExplorer({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-6" role="tablist" aria-label="Business pillars" aria-orientation="vertical">
        {items.map((p, i) => {
          const isActive = i === active;
          return (
            <div key={p.slug} className="border-b border-line first:border-t">
              <button
                type="button"
                role="tab"
                id={`pillar-tab-${i}`}
                aria-selected={isActive}
                aria-controls={`pillar-panel-${i}`}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className="group flex w-full items-center gap-5 py-7 text-left"
              >
                <span className={cn("font-serif text-sm font-bold transition-colors", isActive ? "text-navy" : "text-muted")}>{String(i + 1).padStart(2, "0")}</span>
                <span className={cn("flex-1 font-serif text-2xl font-bold transition-colors sm:text-[2rem]", isActive ? "text-navy" : "text-ink/45 group-hover:text-ink")}>{p.title}</span>
                <span className={cn("inline-flex h-11 w-11 items-center justify-center rounded-full transition-all duration-500", isActive ? "bg-navy text-white" : "bg-mist text-ink/40")}>
                  <Icon name={p.icon} className="h-5 w-5" />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pl-10">
                      <p className="max-w-lg text-[1.05rem] leading-relaxed text-muted">{p.summary}</p>
                      <Link href={`/services/${p.slug}`} className="group mt-5 inline-flex items-center gap-2 font-semibold text-navy">
                        Explore {p.count} services
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="lg:col-span-6" role="tabpanel" id={`pillar-panel-${active}`} aria-labelledby={`pillar-tab-${active}`}>
        <div className="sticky top-28">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-midnight sm:aspect-[5/5]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image src={current.image.src} alt={current.image.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/30 to-transparent" />
            <div className="on-dark absolute inset-x-0 bottom-0 p-7 sm:p-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.slug}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45 }}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky">{current.tagline}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {current.services.map((s) => (
                      <li key={s.href}>
                        <Link href={s.href} className="inline-flex rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-white ring-1 ring-white/15 backdrop-blur transition hover:bg-white hover:text-navy">
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
