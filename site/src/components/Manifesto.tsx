"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Aurora, Parallax, SplitWords, usePrefersReducedMotion } from "./motion";

/** Editorial manifesto band — oversized Fraunces statement, word-by-word
 *  reveal, a parallaxing + cursor-tilted ghost glyph, and three margin
 *  annotations behind an ink-bleed reveal. */
export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const glyphRef = useRef<HTMLSpanElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const reduced = usePrefersReducedMotion();

  /* cursor-tilt on the ghost Φ — independent of Parallax's own scroll-scrub
     transform, since it targets the inner glyph span, not the wrapper. */
  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const glyph = glyphRef.current;
    if (!section || !glyph) return;
    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      glyph.style.transform = `perspective(1400px) rotateY(${px * 10}deg) rotateX(${-py * 8}deg)`;
    };
    const onLeave = () => {
      glyph.style.transform = "perspective(1400px) rotateY(0deg) rotateX(0deg)";
    };
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  /* ink-bleed reveal on the pull-quote — spreads into focus rather than a
     plain fade, echoing ink settling into paper. */
  useEffect(() => {
    if (reduced) return;
    const el = quoteRef.current;
    if (!el) return;
    const tween = gsap.fromTo(
      el,
      { opacity: 0, filter: "blur(9px)" },
      { opacity: 1, filter: "blur(0px)", duration: 1.3, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-32 sm:py-40" aria-label="Our philosophy">
      <Aurora />
      {/* parallax ghost glyph */}
      <Parallax speed={0.16} className="pointer-events-none absolute inset-0">
        <span
          ref={glyphRef}
          className="letter-ghost absolute -right-10 top-1/2 -translate-y-1/2 select-none font-display text-[38vw] leading-none font-bold will-change-transform lg:text-[26vw]"
          style={{ "--stroke": "#0B3D5F", transition: "transform 0.4s cubic-bezier(.2,.8,.2,1)" } as React.CSSProperties}
          aria-hidden="true"
        >
          Φ
        </span>
      </Parallax>

      <div className="wrap relative grid gap-12 lg:grid-cols-[0.32fr_0.68fr]">
        {/* margin rail */}
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-terra-ink"
            style={{ writingMode: "vertical-rl" }}
          >
            the phronesis doctrine · est. on a simple belief
          </p>
        </aside>

        {/* statement */}
        <div>
          <h2 className="font-display text-[clamp(2.6rem,6.4vw,5.6rem)] leading-[1.03] font-semibold tracking-[-0.03em] text-ocean">
            <SplitWords text="Data tells you" />
            <br />
            <SplitWords text="what is happening." delay={0.2} />
            <br />
            <span className="text-teal">
              <SplitWords text="Wisdom decides" delay={0.45} />
            </span>
            <br />
            <span className="text-teal">
              <SplitWords text="what to do about it." delay={0.6} />
            </span>
          </h2>

          <p ref={quoteRef} className="mt-10 max-w-xl text-[16px] leading-[1.75] text-ink/70">
            That is the whole argument. Every model we ship, every indicator we surface and
            every brief we draft exists to shorten the distance between{" "}
            <strong className="font-semibold text-ink">evidence</strong> and{" "}
            <strong className="font-semibold text-ink">action</strong> — without ever removing
            the human hand from the wheel.
          </p>

          {/* annotations */}
          <dl className="mt-14 grid gap-8 sm:grid-cols-3">
            {[
              ["Evidence-informed", "Living syntheses with auditable retrieval — every claim cites its source."],
              ["Community-validated", "Data is checked with the people it describes before it is acted on."],
              ["Equity by default", "Indicators arrive disaggregated, so no community is averaged away."],
            ].map(([t, c], i) => (
              <div key={t} className="border-t-2 pt-4" style={{ borderColor: ["#1F8A8A", "#E8A87C", "#7FB069"][i] }}>
                <dt className="font-display text-[17px] font-semibold text-ocean">{t}</dt>
                <dd className="mt-2 text-[13px] leading-relaxed text-ink/60">{c}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
