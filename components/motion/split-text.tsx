"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Reveals a heading word by word with a soft rise, used for hero headlines.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  as = "h1",
  highlight,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p";
  /** Words (exact match, case-insensitive) rendered in the accent style */
  highlight?: string[];
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const words = text.split(" ");
  const hl = new Set((highlight ?? []).map((w) => w.toLowerCase()));

  return (
    <Tag
      className={cn(className)}
      initial="hidden"
      animate="show"
      aria-label={text}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={cn("inline-block", hl.has(word.toLowerCase().replace(/[^a-z&']/g, "")) && "italic text-sky")}
            variants={{
              hidden: reduce ? { opacity: 0 } : { y: "105%", opacity: 0 },
              show: { y: "0%", opacity: 1, transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
