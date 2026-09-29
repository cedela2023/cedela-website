"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ires } from "@/content/ires";
import { cn } from "@/lib/utils";

/**
 * Illustrative walk-through of the iRES workflow. It visualises the process,
 * it does not display live incident data.
 */
export function IresConsole({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const steps = ires.workflow;

  useEffect(() => {
    if (!inView || reduce) return;
    const t = setInterval(() => setStep((s) => (s + 1) % steps.length), 1600);
    return () => clearInterval(t);
  }, [inView, reduce, steps.length]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden rounded-3xl bg-midnight-900/80 ring-1 ring-white/10 backdrop-blur", className)}>
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        </div>
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white/50">iRES response workflow</span>
        <span className="flex items-center gap-2 font-mono text-[0.7rem] text-[#3ddc97]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#3ddc97]" /> Online
        </span>
      </div>
      <ol className="p-3 sm:p-4">
        {steps.map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <li key={s.step} className="relative">
              {active && (
                <motion.span
                  layoutId="ires-active"
                  className="absolute inset-0 rounded-xl bg-sky/10 ring-1 ring-sky/40"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div className="relative flex items-center gap-4 px-3 py-2.5">
                <span
                  className={cn(
                    "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[0.7rem] transition-colors duration-500",
                    active ? "bg-sky text-midnight" : done ? "bg-white/15 text-white" : "bg-white/5 text-white/40",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={cn("w-24 shrink-0 font-semibold transition-colors", active ? "text-white" : done ? "text-white/70" : "text-white/40")}>{s.step}</span>
                <span className={cn("hidden truncate text-sm transition-colors sm:block", active ? "text-white/75" : "text-white/30")}>{s.body}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
