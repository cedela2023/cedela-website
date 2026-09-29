import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/icon";
import { categoryLabel } from "@/content/insights";
import type { IconName, Insight } from "@/content/types";
import { cn, formatDate } from "@/lib/utils";

export function LinkCard({
  href,
  icon,
  title,
  body,
  kicker,
  className,
  tone = "light",
}: {
  href: string;
  icon?: IconName | string;
  title: string;
  body?: ReactNode;
  kicker?: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl p-7 transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 sm:p-8",
        dark
          ? "bg-white/[0.04] ring-1 ring-white/10 hover:bg-white/[0.08] hover:ring-sky/40"
          : "bg-white ring-1 ring-line hover:shadow-[0_30px_60px_-30px_rgb(10_27_196/0.35)] hover:ring-navy/25",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        {icon ? (
          <span
            className={cn(
              "inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-colors duration-500",
              dark ? "bg-sky/10 text-sky group-hover:bg-sky group-hover:text-midnight" : "bg-tint text-navy group-hover:bg-navy group-hover:text-white",
            )}
          >
            <Icon name={icon} className="h-6 w-6" />
          </span>
        ) : (
          <span />
        )}
        <ArrowUpRight
          className={cn(
            "h-5 w-5 -translate-x-1 translate-y-1 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100",
            dark ? "text-sky" : "text-navy",
          )}
          aria-hidden
        />
      </div>
      {kicker && <p className={cn("mt-6 text-xs font-bold uppercase tracking-[0.18em]", dark ? "text-sky" : "text-navy")}>{kicker}</p>}
      <h3 className={cn("text-[1.45rem] leading-snug", kicker ? "mt-2" : "mt-6")}>{title}</h3>
      {body && <div className={cn("mt-3 text-[0.99rem] leading-relaxed", dark ? "text-white/65" : "text-muted")}>{body}</div>}
    </Link>
  );
}

export function ImageCard({
  href,
  image,
  title,
  body,
  kicker,
  className,
  aspect = "aspect-[4/5]",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  href: string;
  image: { src: string; alt: string };
  title: string;
  body?: string;
  kicker?: string;
  className?: string;
  aspect?: string;
  sizes?: string;
}) {
  return (
    <Link href={href} className={cn("group relative isolate block overflow-hidden rounded-3xl bg-midnight text-white", aspect, className)}>
      <Image src={image.src} alt={image.alt} fill sizes={sizes} className="-z-20 object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-midnight via-midnight/40 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
      <div className="flex h-full flex-col justify-end p-7">
        {kicker && <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-sky">{kicker}</p>}
        <div className="flex items-end justify-between gap-4">
          <h3 className="text-2xl leading-tight text-white">{title}</h3>
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur transition-all duration-500 group-hover:bg-sky group-hover:text-midnight">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>
        {body && <p className="mt-3 max-h-0 overflow-hidden text-[0.97rem] text-white/75 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">{body}</p>}
      </div>
    </Link>
  );
}

export function InsightCard({ insight, className, size = "md" }: { insight: Insight; className?: string; size?: "md" | "lg" }) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      className={cn("group flex h-full flex-col", size === "lg" && "lg:grid lg:grid-cols-12 lg:items-center lg:gap-14", className)}
    >
      <div className={cn("relative overflow-hidden rounded-3xl bg-tint", size === "lg" ? "aspect-[16/10] lg:col-span-7" : "aspect-[3/2]")}>
        {insight.image ? (
          <Image
            src={insight.image.src}
            alt={insight.image.alt}
            fill
            sizes={size === "lg" ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
          />
        ) : (
          <div className="grid-lines-light absolute inset-0" />
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-navy backdrop-blur">
          {categoryLabel(insight.category)}
        </span>
      </div>
      <div className={cn("mt-6 flex flex-1 flex-col", size === "lg" && "lg:col-span-5 lg:mt-0")}>
        <p className="text-sm text-muted">
          <time dateTime={insight.publishedAt}>{formatDate(insight.publishedAt)}</time>
          <span className="mx-2">·</span>
          {insight.author.name}
        </p>
        <h3 className={cn("mt-3 leading-snug transition-colors group-hover:text-navy", size === "lg" ? "text-3xl sm:text-4xl" : "text-[1.45rem]")}>{insight.title}</h3>
        <p className="mt-3 line-clamp-3 text-[0.99rem] leading-relaxed text-muted">{insight.excerpt}</p>
      </div>
    </Link>
  );
}
