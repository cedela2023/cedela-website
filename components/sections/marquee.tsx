import { LogoMark } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

export function Marquee({ items, className, tone = "light" }: { items: string[]; className?: string; tone?: "light" | "dark" }) {
  const row = [...items, ...items];
  return (
    <div className={cn("relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]", className)} aria-hidden>
      <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10 hover:[animation-play-state:paused]">
        {row.map((item, i) => (
          <span key={i} className={cn("flex items-center gap-10 whitespace-nowrap font-serif text-2xl sm:text-3xl", tone === "dark" ? "text-white/80" : "text-ink/80")}>
            {item}
            <LogoMark className="h-5 w-5" color={tone === "dark" ? "#77D4FC" : "#0A1BC4"} />
          </span>
        ))}
      </div>
    </div>
  );
}
