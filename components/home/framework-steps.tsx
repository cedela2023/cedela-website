"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/content/types";
import { cn } from "@/lib/utils";

type Phase = { phase: string; title: string; summary: string; body: string; items: string[]; icon: IconName };

const INTERVAL = 4500;

export function FrameworkSteps({ phases }: { phases: Phase[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const reduce = useReducedMotion();

  // Steps through the phases on its own while on screen. Pauses while a mouse
  // is over it or a step has keyboard focus, so there is time to read.
  useEffect(() => {
    if (!inView || paused || reduce) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % phases.length), INTERVAL);
    return () => clearTimeout(id);
  }, [active, inView, paused, reduce, phases.length]);

  return (
    <div
      ref={ref}
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={(e) => e.target.matches(":focus-visible") && setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative">
        <div className="absolute left-0 right-0 top-6 hidden h-px bg-white/15 md:block" />
        <motion.div
          className="absolute left-0 top-6 hidden h-px bg-sky md:block"
          animate={{ width: `${(active / (phases.length - 1)) * 100}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
        <ol className="relative grid grid-cols-4 gap-y-6 md:grid-cols-7">
          {phases.map((ph, i) => (
            <li key={ph.title} className="flex flex-col items-start md:items-center">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className="group flex flex-col items-start gap-3 md:items-center"
              >
                <span
                  className={cn(
                    "relative inline-flex h-12 w-12 items-center justify-center rounded-full ring-1 transition-all duration-500",
                    i <= active ? "bg-sky text-midnight ring-sky" : "bg-midnight text-white/60 ring-white/20 group-hover:ring-sky/60",
                  )}
                >
                  <Icon name={ph.icon} className="h-5 w-5" />
                </span>
                <span className={cn("font-serif text-lg font-bold transition-colors", i === active ? "text-white" : "text-white/55")}>{ph.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      {/* All phases share one grid cell, so the panel keeps a constant height as it changes */}
      <div className="mt-14 grid">
        {phases.map((p, i) => (
          <motion.div
            key={p.title}
            aria-hidden={i !== active}
            initial={false}
            animate={{ opacity: i === active ? 1 : 0, y: i === active ? 0 : 16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "col-start-1 row-start-1 grid gap-10 rounded-3xl bg-white/[0.04] p-8 ring-1 ring-white/10 sm:p-10 lg:grid-cols-12",
              i !== active && "pointer-events-none",
            )}
          >
            <div className="lg:col-span-6">
              <p className="font-mono text-sm text-sky">Phase {p.phase}</p>
              <h3 className="mt-3 text-3xl sm:text-4xl">{p.summary}</h3>
              <p className="mt-4 text-lg leading-relaxed text-white/70">{p.body}</p>
            </div>
            <ul className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-6">
              {p.items.map((it) => (
                <li key={it} className="rounded-2xl bg-white/[0.05] px-5 py-4 text-[0.98rem] text-white/85 ring-1 ring-white/10">
                  {it}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
