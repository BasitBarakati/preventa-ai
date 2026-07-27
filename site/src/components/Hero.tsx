"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import NeuralGlobe from "./NeuralGlobe";
import { CountUp, Parallax, Scramble, useMagnetic } from "./motion";
import { openAssessment } from "./modalEvents";
import { ArrowIcon, EyeIcon, LockIcon, PulseIcon, ShieldIcon } from "./icons";

const STATS = [
  { to: 9, suffix: "", label: "wellness domains" },
  { to: 4, suffix: "", label: "assessment lenses" },
  { to: 6, suffix: "", label: "functions strengthened" },
  { to: 100, suffix: "%", label: "human-led decisions" },
];

const CHIPS = [
  { icon: PulseIcon, title: "Health Promotion", sub: "upstream · community-led", pos: "top-[8%] -left-2 lg:left-0", delay: "0s" },
  { icon: ShieldIcon, title: "Equity by default", sub: "stratified by design", pos: "top-[38%] -right-2 lg:-right-6", delay: "1.2s" },
  { icon: LockIcon, title: "Privacy by design", sub: "PHIPA · de-identified", pos: "bottom-[10%] left-[6%]", delay: "2.4s" },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const ctaRef = useMagnetic<HTMLButtonElement>(0.24);

  /* Staggered entrance — GSAP only *animates*, markup stays readable. */
  useEffect(() => {
    if (!root.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* wait for the pre-loader curtain so the choreography lands in sync */
    let ctx: gsap.Context | null = null;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      ctx = gsap.context(() => {
        gsap.fromTo(
          ".hero-el",
          { y: 44, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.05, ease: "power3.out", stagger: 0.11, delay: 0.1 },
        );
        /* word-by-word headline rise */
        gsap.fromTo(
          "[data-hero-word]",
          { yPercent: 118 },
          { yPercent: 0, duration: 1.05, ease: "power4.out", stagger: 0.07, delay: 0.2 },
        );
        gsap.fromTo(
          ".hero-chip",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, ease: "power3.out", stagger: 0.16, delay: 0.9 },
        );
      }, root);
    };

    window.addEventListener("phronesis:ready", start);
    const safety = window.setTimeout(start, 3200);
    return () => {
      window.removeEventListener("phronesis:ready", start);
      window.clearTimeout(safety);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-dvh items-center overflow-hidden pt-32 pb-16"
    >
      {/* layered ambient background — restrained, so the type and globe lead */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(60rem_42rem_at_78%_30%,rgba(31,138,138,0.11),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(46rem_36rem_at_12%_82%,rgba(232,168,124,0.09),transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(38rem_30rem_at_45%_8%,rgba(11,61,95,0.07),transparent_65%)]" />
        {/* fine meridian grid */}
        <div className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(11,61,95,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(11,61,95,0.05)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(60rem_60rem_at_50%_40%,black,transparent_75%)]" />
      </div>

      {/* vertical standards rail */}
      <div className="absolute left-5 top-1/2 z-10 hidden -translate-y-1/2 items-center gap-4 xl:flex">
        <span className="h-24 w-px bg-ocean/20" aria-hidden="true" />
        <p
          className="font-mono text-[10px] uppercase tracking-[0.34em] text-ocean/50"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          WHO aligned · Ottawa Charter · PHAC · OCAP® principles
        </p>
      </div>

      <div className="wrap relative z-10 grid items-center gap-10 lg:grid-cols-[1.04fr_0.96fr]">
        {/* ————— Left: message ————— */}
        <div>
          <p className="hero-el inline-flex items-center gap-3 rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5">
            <span className="ai-dot h-1.5 w-1.5 rounded-full bg-amber" aria-hidden="true" />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-teal">
              <Scramble text="φρόνησις · practical wisdom" />
            </span>
          </p>

          <h1 className="mt-7 font-display text-[clamp(3.3rem,7.4vw,6.6rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-ocean">
            <span className="block">
              <span className="mask-line mr-[0.26em] inline-block">
                <span data-hero-word className="inline-block will-change-transform">Transforming</span>
              </span>
              <span className="mask-line inline-block">
                <span data-hero-word className="inline-block will-change-transform">Health</span>
              </span>
            </span>
            <span className="block">
              <span className="mask-line mr-[0.26em] inline-block">
                <span data-hero-word className="inline-block will-change-transform">and</span>
              </span>
              <span className="mask-line inline-block">
                <span data-hero-word className="inline-block will-change-transform">
                  <em className="relative inline-block font-medium text-teal">
                    Wellness.
                    <svg
                      className="absolute -bottom-2 left-0 w-full"
                      viewBox="0 0 320 14"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 10.5C70 3.5 190 2.5 316 8.5"
                        stroke="#E8A87C"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </em>
                </span>
              </span>
            </span>
          </h1>

          <p className="hero-el mt-8 max-w-xl text-[17.5px] leading-[1.65] text-ink/70">
            <strong className="font-semibold text-ink">Phronesis AI</strong>{" "}
            is the health intelligence platform where evidence becomes action — population assessment,
            health promotion and community wellness, unified in one system built for
            institutions that can&apos;t afford to guess. Always{" "}
            <em className="font-display text-teal">human-led</em>.
          </p>
          {/* AEO/SEO — keyword context for crawlers and answer engines */}
          <p className="sr-only">
            Phronesis AI is a public health AI and health intelligence platform for population
            health assessment, Ottawa Charter-aligned health promotion, OCAP principles
            compliance, community wellness programs and evidence-based health judgments —
            serving health units, NGOs, healthcare institutions and governments.
          </p>

          <div className="hero-el mt-9 flex flex-wrap items-center gap-4">
            <button
              ref={ctaRef}
              onClick={() => openAssessment()}
              className="sheen group inline-flex items-center gap-2.5 rounded-full bg-ocean px-7 py-3.5 text-[14.5px] font-semibold text-cream shadow-[0_18px_40px_-16px_rgba(11,61,95,0.65)] transition-all duration-300 will-change-transform hover:-translate-y-0.5 hover:bg-[#0d4a73]"
            >
              <span className="relative z-10 inline-flex items-center gap-2.5">
                Start Free Assessment
                <ArrowIcon size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
            <a
              href="#pillars"
              className="group inline-flex items-center gap-2.5 rounded-full border border-ocean/20 bg-white/50 px-7 py-3.5 text-[14.5px] font-semibold text-ocean backdrop-blur transition-all duration-300 hover:border-teal hover:text-teal"
            >
              Explore Services
              <span className="block h-4 w-px rotate-12 bg-ocean/30 transition-colors group-hover:bg-teal/40" aria-hidden="true" />
            </a>
          </div>

          {/* live stats */}
          <dl className="hero-el mt-12 grid max-w-xl grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="border-l-2 border-amber/70 pl-3.5">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-mono text-[26px] font-semibold leading-none text-ocean">
                  <CountUp to={s.to} suffix={s.suffix} />
                </dd>
                <dd className="mt-1.5 text-[11.5px] font-medium uppercase tracking-[0.14em] text-ink/55">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ————— Right: neural globe + floating evidence chips ————— */}
        <div className="hero-el relative mx-auto h-[420px] w-full max-w-[620px] sm:h-[520px] lg:h-[680px] lg:max-w-none lg:-mr-8 xl:-mr-16">
          {/* breathing halo */}
          <div
            className="breathe absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(31,138,138,0.22),rgba(232,168,124,0.10)_55%,transparent_72%)]"
            aria-hidden="true"
          />
          <Parallax
            speed={-0.14}
            className="pointer-events-none absolute inset-0"
          >
            <div
              className="absolute left-1/2 top-1/2 h-[96%] w-[96%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-ocean/15"
              aria-hidden="true"
            />
            <div
              className="absolute left-1/2 top-1/2 h-[108%] w-[108%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ocean/[0.06]"
              aria-hidden="true"
            />
          </Parallax>
          <NeuralGlobe className="h-full w-full" />
          <p className="sr-only">
            Interactive 3D visualization of a neural globe: hundreds of connected nodes
            representing global population health networks, rotating gently and responding to
            your cursor. It is decorative and carries no information.
          </p>

          {CHIPS.map((c) => (
            <div
              key={c.title}
              className={`hero-chip glass absolute ${c.pos} flex items-center gap-3 rounded-2xl px-4 py-3`}
              style={{ animationDelay: c.delay }}
            >
              <span className="floaty grid h-9 w-9 place-items-center rounded-xl bg-ocean text-amber" style={{ animationDelay: c.delay }}>
                <c.icon size={17} />
              </span>
              <span>
                <span className="flex items-center gap-1.5 text-[12.5px] font-semibold text-ocean">
                  <EyeIcon size={12} className="text-teal" />
                  {c.title}
                </span>
                <span className="font-mono text-[10.5px] text-ink/55">{c.sub}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/45">
          scroll to decode
        </span>
        <span className="relative block h-10 w-px overflow-hidden bg-ocean/15" aria-hidden="true">
          <span className="absolute inset-x-0 top-0 h-4 animate-[floaty_1.8s_ease-in-out_infinite] bg-teal" />
        </span>
      </div>
    </section>
  );
}
