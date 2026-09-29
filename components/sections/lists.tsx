import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export function CheckList({ items, className, columns = 1, tone = "light" }: { items: string[]; className?: string; columns?: 1 | 2 | 3; tone?: "light" | "dark" }) {
  return (
    <Stagger as="ul" gap={0.04} className={cn("grid gap-x-8 gap-y-3.5", columns === 2 && "sm:grid-cols-2", columns === 3 && "sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item) => (
        <StaggerItem as="li" key={item} y={10} className="flex items-start gap-3">
          <span className={cn("mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full", tone === "dark" ? "bg-sky/15 text-sky" : "bg-tint text-navy")}>
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
          <span className={cn("text-[1.02rem] leading-relaxed", tone === "dark" ? "text-white/80" : "text-ink-soft")}>{item}</span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function TagList({ items, className, tone = "light" }: { items: string[]; className?: string; tone?: "light" | "dark" }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((i) => (
        <li
          key={i}
          className={cn(
            "rounded-full px-4 py-2 text-[0.92rem] font-semibold",
            tone === "dark" ? "bg-white/5 text-white/85 ring-1 ring-white/10" : "bg-white text-ink ring-1 ring-line",
          )}
        >
          {i}
        </li>
      ))}
    </ul>
  );
}

export function NumberedList({ items, tone = "light" }: { items: { title: string; body: string }[]; tone?: "light" | "dark" }) {
  return (
    <Stagger as="ol" className="grid gap-px overflow-hidden rounded-3xl bg-line sm:grid-cols-2 [.on-dark_&]:bg-white/10">
      {items.map((it, i) => (
        <StaggerItem as="li" key={it.title} className={cn("p-8 sm:p-10", tone === "dark" ? "bg-midnight" : "bg-white")}>
          <span className={cn("font-serif text-sm font-bold", tone === "dark" ? "text-sky" : "text-navy")}>{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-4 text-2xl">{it.title}</h3>
          <p className={cn("mt-3 leading-relaxed", tone === "dark" ? "text-white/65" : "text-muted")}>{it.body}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
