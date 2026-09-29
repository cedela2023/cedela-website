"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { InsightCard } from "@/components/sections/cards";
import { insightCategories } from "@/content/insights";
import type { Insight } from "@/content/types";
import { cn } from "@/lib/utils";

export function InsightsBrowser({ insights }: { insights: Insight[] }) {
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");

  const available = useMemo(() => insightCategories.filter((c) => insights.some((i) => i.category === c.value)), [insights]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return insights.filter(
      (i) => (category === "all" || i.category === category) && (!q || i.title.toLowerCase().includes(q) || i.excerpt.toLowerCase().includes(q) || i.tags?.some((t) => t.toLowerCase().includes(q))),
    );
  }, [insights, category, query]);

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Filter by type">
          {[{ value: "all", label: "All" }, ...available].map((c) => (
            <button
              key={c.value}
              type="button"
              role="tab"
              aria-selected={category === c.value}
              onClick={() => setCategory(c.value)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-[0.94rem] font-semibold transition",
                category === c.value ? "bg-navy text-white" : "bg-white text-ink ring-1 ring-line hover:ring-navy/40",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
        <label className="relative block lg:w-72">
          <span className="sr-only">Search insights</span>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search insights" className="field !rounded-full !py-2.5" type="search" />
        </label>
      </div>

      <motion.div layout className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((i) => (
            <motion.div key={i.slug} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.4 }}>
              <InsightCard insight={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {filtered.length === 0 && <p className="mt-12 text-center text-lg text-muted">No insights match your selection yet.</p>}
    </div>
  );
}
