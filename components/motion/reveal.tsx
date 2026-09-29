"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
  once?: boolean;
  as?: "div" | "section" | "li" | "article" | "span";
} & Omit<HTMLMotionProps<"div">, "children">;

export function Reveal({ children, delay = 0, y = 28, x = 0, className, once = true, as = "div", ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  const Cmp = motion[as] as typeof motion.div;
  return (
    <Cmp
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease }}
      {...rest}
    >
      {children}
    </Cmp>
  );
}

export function Stagger({
  children,
  className,
  gap = 0.08,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
  as?: "div" | "ul" | "ol";
}) {
  const Cmp = motion[as] as typeof motion.div;
  return (
    <Cmp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </Cmp>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
  y?: number;
}) {
  const reduce = useReducedMotion();
  const Cmp = motion[as] as typeof motion.div;
  return (
    <Cmp
      className={className}
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
      }}
    >
      {children}
    </Cmp>
  );
}
