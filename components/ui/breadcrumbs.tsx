import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { absoluteUrl, cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: absoluteUrl(c.href) } : {}),
    })),
  };
  return (
    <nav aria-label="Breadcrumb">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <ol className={cn("flex flex-wrap items-center gap-1.5 text-sm", tone === "dark" ? "text-white/60" : "text-muted")}>
        {all.map((c, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden />}
            {c.href && i < all.length - 1 ? (
              <Link href={c.href} className={cn("transition-colors", tone === "dark" ? "hover:text-white" : "hover:text-navy")}>
                {c.label}
              </Link>
            ) : (
              <span aria-current={i === all.length - 1 ? "page" : undefined} className={tone === "dark" ? "text-white/90" : "text-ink"}>
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
