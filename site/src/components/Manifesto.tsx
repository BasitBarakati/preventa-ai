"use client";

import { Aurora, Parallax, SplitWords } from "./motion";

/** Editorial manifesto band — oversized Fraunces statement, word-by-word
 *  reveal, a parallaxing ghost glyph, and three margin annotations. */
export default function Manifesto() {
  return (
    <section className="relative overflow-hidden py-32 sm:py-40" aria-label="Our philosophy">
      <Aurora />
      {/* parallax ghost glyph */}
      <Parallax speed={0.16} className="pointer-events-none absolute inset-0">
        <span
          className="letter-ghost absolute -right-10 top-1/2 -translate-y-1/2 select-none font-display text-[38vw] leading-none font-bold lg:text-[26vw]"
          style={{ "--stroke": "#0B3D5F" } as React.CSSProperties}
          aria-hidden="true"
        >
          Φ
        </span>
      </Parallax>

      <div className="wrap relative grid gap-12 lg:grid-cols-[0.32fr_0.68fr]">
        {/* margin rail */}
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-terra"
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

          <p className="mt-10 max-w-xl text-[16px] leading-[1.75] text-ink/70">
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
