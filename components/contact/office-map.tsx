"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { MapPin } from "lucide-react";
import { useState } from "react";
import type { Office } from "@/content/types";
import { cn } from "@/lib/utils";

export function OfficeMap({ offices }: { offices: Office[] }) {
  const [active, setActive] = useState(0);
  const [loadMap, setLoadMap] = useState(false);
  const office = offices[active];
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(office.mapQuery)}&z=15&output=embed`;

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="space-y-4 lg:col-span-5">
        {offices.map((o, i) => (
          <button
            key={o.name}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className={cn(
              "group flex w-full gap-5 overflow-hidden rounded-3xl p-4 text-left ring-1 transition",
              i === active ? "bg-white shadow-[0_30px_60px_-35px_rgb(10_27_196/0.45)] ring-navy/30" : "bg-white/60 ring-line hover:bg-white",
            )}
          >
            <span className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl sm:h-28 sm:w-28">
              <Image src={o.image.src} alt={o.image.alt} fill sizes="112px" className="object-cover" />
            </span>
            <span className="py-1">
              <span className="block text-xs font-bold uppercase tracking-[0.18em] text-navy">{o.label}</span>
              <span className="mt-1 block font-serif text-2xl font-bold text-ink">{o.name}</span>
              <span className="mt-1 block text-[0.95rem] leading-snug text-muted">{o.lines.join(", ")}</span>
            </span>
          </button>
        ))}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapQuery)}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 pl-2 font-semibold text-navy underline decoration-sky decoration-2 underline-offset-4"
        >
          <MapPin className="h-4 w-4" /> Get directions to our {office.name} office
        </a>
      </div>
      <div className="relative min-h-[22rem] overflow-hidden rounded-[2rem] bg-tint ring-1 ring-line lg:col-span-7">
        {loadMap ? (
          <AnimatePresence mode="wait">
            <motion.iframe
              key={src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              title={`Map showing CEDELA ${office.name} office`}
              src={src}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 grayscale-[35%]"
            />
          </AnimatePresence>
        ) : (
          <button type="button" onClick={() => setLoadMap(true)} className="group absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="grid-lines-light absolute inset-0" />
            <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-navy text-white shadow-xl transition group-hover:scale-105">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-navy/40" />
              <MapPin className="relative h-7 w-7" />
            </span>
            <span className="relative font-semibold text-ink">Load interactive map</span>
            <span className="relative text-sm text-muted">Loads Google Maps</span>
          </button>
        )}
      </div>
    </div>
  );
}
