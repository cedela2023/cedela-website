"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Accordion({ items, defaultOpen = 0, tone = "light" }: { items: { title: string; content: ReactNode; meta?: string }[]; defaultOpen?: number | null; tone?: "light" | "dark" }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <div className={cn("divide-y border-y", tone === "dark" ? "divide-white/10 border-white/10" : "divide-line border-line")}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.title}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="group flex w-full items-center gap-6 py-6 text-left"
              >
                {item.meta && <span className={cn("w-10 shrink-0 font-serif text-sm font-bold", tone === "dark" ? "text-sky" : "text-navy")}>{item.meta}</span>}
                <span className={cn("flex-1 font-serif text-xl font-bold transition-colors sm:text-2xl", tone === "dark" ? "text-white" : "text-ink group-hover:text-navy")}>{item.title}</span>
                <span
                  className={cn(
                    "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1 transition-all duration-500",
                    isOpen ? (tone === "dark" ? "rotate-45 bg-sky text-midnight ring-sky" : "rotate-45 bg-navy text-white ring-navy") : tone === "dark" ? "ring-white/20" : "ring-line",
                  )}
                >
                  <Plus className="h-5 w-5" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className={cn("pb-8", item.meta && "sm:pl-16")}>{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
