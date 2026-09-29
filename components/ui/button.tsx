import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light" | "sky";
type Size = "md" | "lg" | "sm";

const variants: Record<Variant, string> = {
  primary: "bg-navy text-white hover:bg-navy-700 shadow-[0_10px_30px_-12px_rgb(10_27_196/0.6)]",
  secondary: "bg-white text-ink ring-1 ring-inset ring-line hover:ring-navy/40 hover:text-navy",
  ghost: "text-navy hover:bg-tint",
  light: "bg-white text-midnight hover:bg-tint",
  "outline-light": "text-white ring-1 ring-inset ring-white/30 hover:bg-white/10 hover:ring-white/60",
  sky: "bg-sky text-midnight hover:bg-sky-300",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.92rem]",
  md: "h-12 px-6 text-[0.98rem]",
  lg: "h-14 px-7 text-[1.04rem]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "group/btn relative inline-flex select-none items-center justify-center gap-2.5 overflow-hidden rounded-full font-semibold tracking-[0.005em] transition-all duration-300 ease-[var(--ease-out-expo)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
}

function Arrow({ external }: { external?: boolean }) {
  const I = external ? ArrowUpRight : ArrowRight;
  return (
    <span className="relative -mr-1 inline-flex h-5 w-5 overflow-hidden">
      <I className="absolute inset-0 h-5 w-5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-5" aria-hidden />
      <I className="absolute inset-0 h-5 w-5 -translate-x-5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-0" aria-hidden />
    </span>
  );
}

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  external?: boolean;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function ButtonLink({ href, children, variant, size, arrow = true, className, external, ...rest }: LinkButtonProps) {
  const isExternal = external ?? /^https?:|^mailto:|^tel:/.test(href);
  const cls = buttonClasses(variant, size, className);
  if (isExternal) {
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        <span>{children}</span>
        {arrow && <Arrow external={href.startsWith("http")} />}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      <span>{children}</span>
      {arrow && <Arrow />}
    </Link>
  );
}

export function Button({
  children,
  variant,
  size,
  arrow = false,
  className,
  ...rest
}: { variant?: Variant; size?: Size; arrow?: boolean } & ComponentProps<"button">) {
  return (
    <button className={buttonClasses(variant, size, className)} {...rest}>
      <span className="inline-flex items-center gap-2">{children}</span>
      {arrow && <Arrow />}
    </button>
  );
}

export function TextLink({ href, children, className, tone = "navy" }: { href: string; children: ReactNode; className?: string; tone?: "navy" | "sky" | "white" }) {
  return (
    <Link
      href={href}
      className={cn(
        "group/tl inline-flex items-center gap-2 font-semibold",
        tone === "navy" && "text-navy",
        tone === "sky" && "text-sky",
        tone === "white" && "text-white",
        className,
      )}
    >
      <span className="link-underline">{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/tl:translate-x-1" aria-hidden />
    </Link>
  );
}
