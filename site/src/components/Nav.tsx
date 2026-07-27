"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LogoLockup } from "./Logo";
import { useMagnetic } from "./motion";
import { openAssessment } from "./modalEvents";
import { FireIcon } from "./icons";

const LINKS = [
  { label: "Assess", href: "#assess", note: "four lenses" },
  { label: "Wellness", href: "#wellness", note: "nine domains" },
  { label: "Capacity", href: "#capacity", note: "skills that stay" },
  { label: "Evaluate", href: "#evaluate", note: "four phases" },
  { label: "Co-Pilot", href: "#copilot", note: "ai sandbox" },
  { label: "Seven Fires", href: "/seven-fires", note: "indigenous-led path", flame: true },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const magneticRef = useMagnetic<HTMLButtonElement>(0.3);
  const pathname = usePathname();
  const resolveHref = (href: string) =>
    href.startsWith("#") && pathname !== "/" ? `/${href}` : href;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* lock scroll while the mobile overlay is open */
  useEffect(() => {
    document.body.classList.toggle("preload-lock", open);
    return () => document.body.classList.remove("preload-lock");
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
      <div className={`transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
        <div
          className={`wrap flex items-center justify-between rounded-full px-5 transition-all duration-500 ${
            scrolled ? "glass py-2" : "border border-transparent py-3"
          }`}
        >
          <a href={pathname === "/" ? "#top" : "/"} className="group flex items-center" aria-label="Phronesis AI home">
            <span className="transition-transform duration-500 group-hover:scale-105">
              <LogoLockup size={scrolled ? 32 : 36} />
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={resolveHref(l.href)}
                className={`group relative flex items-center gap-1.5 text-[13.5px] font-medium tracking-wide transition-colors ${
                  l.flame ? "text-terra-ink hover:text-amber-ink" : "text-ink/75 hover:text-ocean"
                }`}
              >
                {l.flame && <FireIcon size={13} />}
                {l.label}
                <span
                  className={`absolute -bottom-1 left-1/2 h-[1.5px] w-0 -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-full ${
                    l.flame ? "bg-terra" : "bg-amber"
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              ref={magneticRef}
              onClick={() => openAssessment()}
              className="sheen hidden rounded-full bg-amber px-5 py-2.5 text-[13.5px] font-semibold text-ocean shadow-[0_10px_30px_-12px_rgba(232,168,124,0.9)] transition-colors duration-300 hover:bg-[#e29a68] will-change-transform sm:inline-flex"
            >
              <span className="relative z-10">Start Free</span>
            </button>
            <button
              className="grid h-10 w-10 place-items-center rounded-full border border-ocean/15 lg:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 top-0 h-[1.5px] w-full bg-ocean transition-transform duration-300 ${open ? "translate-y-[5.5px] rotate-45" : ""}`}
                />
                <span
                  className={`absolute left-0 top-[5.5px] h-[1.5px] w-full bg-ocean transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`absolute left-0 top-[11px] h-[1.5px] w-full bg-ocean transition-transform duration-300 ${open ? "-translate-y-[5.5px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Reading progress hairline */}
        <div className="mx-auto mt-2 h-[2px] w-[min(1180px,92vw)] overflow-hidden rounded-full">
          <div
            className="h-full origin-left bg-gradient-to-r from-teal via-sage to-amber"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </div>

      {/* ————— Full-screen mobile overlay ————— */}
      <div
        className={`fixed inset-0 -z-10 bg-cream/85 backdrop-blur-2xl transition-opacity duration-500 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_30rem_at_80%_15%,rgba(31,138,138,0.14),transparent_60%),radial-gradient(36rem_28rem_at_10%_90%,rgba(232,168,124,0.16),transparent_62%)]"
          aria-hidden="true"
        />
        <nav
          className="flex h-full flex-col justify-center px-8 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-28"
          aria-label="Mobile"
        >
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={resolveHref(l.href)}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className={`group flex items-baseline justify-between border-b border-ocean/10 py-5 transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
            >
              <span
                className={`flex items-center gap-2.5 font-display text-[clamp(1.8rem,8vw,2.6rem)] font-semibold transition-colors group-active:text-teal ${
                  l.flame ? "text-terra-ink" : "text-ocean"
                }`}
              >
                {l.flame && <FireIcon size={24} />}
                {l.label}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/70">
                {l.note}
              </span>
            </a>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              openAssessment();
            }}
            tabIndex={open ? 0 : -1}
            className={`mt-8 rounded-full bg-amber px-6 py-4 text-center text-[15px] font-semibold text-ocean shadow-[0_16px_40px_-16px_rgba(232,168,124,0.9)] transition-all duration-500 ${
              open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: open ? "500ms" : "0ms" }}
          >
            Start Free Assessment
          </button>
        </nav>
      </div>
    </header>
  );
}
