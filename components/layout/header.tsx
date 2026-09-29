"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowRight, ChevronDown, Menu, Plus, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { mainNav, type NavItem } from "@/content/navigation";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

export function Header({ announcement }: { announcement?: { text: string; href?: string } | null }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    // Hide on scroll down, reveal on scroll up, never while a menu is open
    if (!open && !mobileOpen) setHidden(y > 400 && y > prev + 4);
    if (y < prev - 4) setHidden(false);
  });

  // Close menus on navigation (state adjustment during render, no effect needed)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 160);
  }, []);
  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const solid = scrolled || open !== null || mobileOpen;
  const activeMega = mainNav.find((n) => n.label === open && n.kind === "mega") as Extract<NavItem, { kind: "mega" }> | undefined;

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.45, ease }}
        className="fixed inset-x-0 top-0 z-50"
        onMouseLeave={scheduleClose}
        onMouseEnter={cancelClose}
      >
        {announcement && !scrolled && (
          <div className="on-dark hidden bg-navy text-white md:block">
            <div className="container-x flex h-10 items-center justify-center gap-3 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sky" />
              </span>
              <span className="text-white/85">{announcement.text}</span>
              {announcement.href && (
                <Link href={announcement.href} className="group inline-flex items-center gap-1 font-semibold text-sky">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              )}
            </div>
          </div>
        )}

        <div
          className={cn(
            "transition-[background-color,box-shadow,backdrop-filter] duration-500",
            solid ? "bg-white/95 shadow-[0_1px_0_rgb(22_25_46/0.06),0_12px_40px_-24px_rgb(22_25_46/0.25)] backdrop-blur-xl" : "bg-transparent",
          )}
        >
          <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
            <Link href="/" aria-label="CEDELA home" className="relative z-10 shrink-0">
              <span className="relative block">
                <Logo height={32} priority className={cn("transition-opacity duration-500", solid ? "opacity-100" : "opacity-0")} />
                <Logo height={32} priority tone="light" className={cn("absolute inset-0 transition-opacity duration-500", solid ? "opacity-0" : "opacity-100")} />
              </span>
            </Link>

            <nav aria-label="Main" className="hidden items-center lg:flex">
              <ul className="flex items-center gap-0.5">
                {mainNav.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                  const base = cn(
                    "relative inline-flex h-10 items-center gap-1 rounded-full px-3.5 text-[0.97rem] font-semibold transition-colors",
                    solid ? "text-ink hover:text-navy" : "text-white/85 hover:text-white",
                    isActive && (solid ? "text-navy" : "text-white"),
                  );
                  if (item.kind === "link") {
                    return (
                      <li key={item.label}>
                        <Link href={item.href} className={base} onMouseEnter={() => setOpen(null)}>
                          {item.label}
                          {isActive && <ActiveDot solid={solid} />}
                        </Link>
                      </li>
                    );
                  }
                  const expanded = open === item.label;
                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        className={base}
                        aria-expanded={expanded}
                        aria-controls="mega-panel"
                        onMouseEnter={() => {
                          cancelClose();
                          setOpen(item.label);
                        }}
                        onClick={() => setOpen(expanded ? null : item.label)}
                      >
                        {item.label}
                        <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", expanded && "rotate-180")} aria-hidden />
                        {isActive && <ActiveDot solid={solid} />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/products/ires/report"
                className={cn(
                  "hidden items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors xl:inline-flex",
                  solid ? "text-alert hover:bg-alert/5" : "text-white hover:bg-white/10",
                )}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-alert opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-alert" />
                </span>
                Report an incident
              </Link>
              <ButtonLink href="/consultation" size="sm" variant={solid ? "primary" : "light"} className="hidden sm:inline-flex">
                Talk to an expert
              </ButtonLink>
              <button
                type="button"
                className={cn("inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden", solid ? "text-ink hover:bg-mist" : "text-white hover:bg-white/10")}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {activeMega && (
              <motion.div
                id="mega-panel"
                key="mega"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease }}
                className="hidden overflow-hidden border-t border-line/70 lg:block"
                onMouseEnter={cancelClose}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMega.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3, ease }}
                    className="container-x grid grid-cols-12 gap-10 py-10"
                  >
                    <div className="col-span-3 flex flex-col justify-between rounded-2xl bg-tint p-7">
                      <div>
                        <p className="font-serif text-2xl font-bold text-ink">{activeMega.intro.title}</p>
                        <p className="mt-3 text-[0.97rem] leading-relaxed text-muted">{activeMega.intro.body}</p>
                      </div>
                      <Link href={activeMega.intro.cta.href} className="group mt-8 inline-flex items-center gap-2 font-semibold text-navy">
                        {activeMega.intro.cta.label}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                    <div className={cn("col-span-9 grid gap-8", activeMega.columns.length === 4 ? "grid-cols-4" : "grid-cols-3")}>
                      {activeMega.columns.map((col) => (
                        <div key={col.title}>
                          {col.href ? (
                            <Link href={col.href} className="group mb-4 inline-flex items-center gap-1.5 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-navy">
                              {col.title}
                              <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                            </Link>
                          ) : (
                            <p className="mb-4 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-muted">{col.title}</p>
                          )}
                          <ul className="space-y-1">
                            {col.links.map((l) => (
                              <li key={l.href}>
                                <Link href={l.href} className="group -mx-3 block rounded-xl px-3 py-2 transition-colors hover:bg-mist">
                                  <span className="block text-[0.97rem] font-semibold text-ink group-hover:text-navy">{l.label}</span>
                                  {l.description && <span className="mt-0.5 block text-sm leading-snug text-muted">{l.description}</span>}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <AnimatePresence>{mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}</AnimatePresence>
    </>
  );
}

function ActiveDot({ solid }: { solid: boolean }) {
  return <span className={cn("absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full", solid ? "bg-navy" : "bg-sky")} />;
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-40 bg-white pt-[var(--header-h)] lg:hidden"
      data-lenis-prevent
    >
      <div className="h-full overflow-y-auto pb-10">
        <nav aria-label="Mobile" className="container-x pt-4">
          <ul className="divide-y divide-line">
            {mainNav.map((item, i) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * i, duration: 0.5, ease }}
              >
                {item.kind === "link" ? (
                  <Link href={item.href} onClick={onClose} className="flex items-center justify-between py-5 font-serif text-2xl font-bold">
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                      className="flex w-full items-center justify-between py-5 font-serif text-2xl font-bold"
                      aria-expanded={expanded === item.label}
                    >
                      {item.label}
                      <Plus className={cn("h-5 w-5 transition-transform duration-300", expanded === item.label && "rotate-45")} />
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-6 pb-6">
                            <Link href={item.href} onClick={onClose} className="inline-flex items-center gap-2 font-semibold text-navy">
                              {item.intro.cta.label} <ArrowRight className="h-4 w-4" />
                            </Link>
                            {item.columns.map((col) => (
                              <div key={col.title}>
                                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-muted">{col.title}</p>
                                <ul className="space-y-2.5">
                                  {col.links.map((l) => (
                                    <li key={l.href}>
                                      <Link href={l.href} onClick={onClose} className="text-[1.02rem] text-ink">
                                        {l.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </motion.li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <ButtonLink href="/consultation" size="lg" className="w-full">
              Talk to an expert
            </ButtonLink>
            <ButtonLink href="/products/ires/report" size="lg" variant="secondary" className="w-full !text-alert">
              Report a cyber incident
            </ButtonLink>
          </div>
        </nav>
      </div>
    </motion.div>
  );
}
