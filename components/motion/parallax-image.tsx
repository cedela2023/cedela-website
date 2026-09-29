"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  strength = 60,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-strength, strength]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y }} className="absolute -inset-y-[80px] inset-x-0">
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={cn("object-cover", imgClassName)} />
      </motion.div>
    </div>
  );
}
