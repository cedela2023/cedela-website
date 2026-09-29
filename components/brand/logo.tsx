import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Official CEDELA logo assets live in /public/logo:
 *   cedela-logo.png          primary lockup (sky mark, navy wordmark), transparent
 *   cedela-logo-white.png    all-white lockup for dark backgrounds
 *   cedela-mark.png          cycle mark only (sky), transparent
 *   cedela-mark-white.png    cycle mark only (white)
 */
export const LOGO_RATIO = 2000 / 358;

/**
 * The cycle mark, rendered as a CSS mask over the official mark artwork so it
 * can take any brand colour (used for decorative background marks too).
 */
export function LogoMark({ className, color = "var(--color-sky)" }: { className?: string; color?: string }) {
  const style: CSSProperties = {
    backgroundColor: color,
    WebkitMaskImage: "url(/logo/cedela-mark.png)",
    maskImage: "url(/logo/cedela-mark.png)",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  };
  return <span aria-hidden className={cn("inline-block shrink-0", className)} style={style} />;
}

export function Logo({
  className,
  tone = "default",
  height = 36,
  priority,
}: {
  className?: string;
  tone?: "default" | "light";
  /** Rendered height in pixels. Brand minimum width is 120px (height 22px). */
  height?: number;
  priority?: boolean;
}) {
  const width = Math.round(height * LOGO_RATIO);
  return (
    <span className={cn("relative inline-flex items-center", className)}>
      <Image
        src={tone === "light" ? "/logo/cedela-logo-white.png" : "/logo/cedela-logo.png"}
        alt="CEDELA Tech Park Solutions"
        width={width}
        height={height}
        priority={priority}
        className="h-auto max-w-none"
        style={{ width, height }}
      />
    </span>
  );
}
