"use client";

import { useState } from "react";
import { Reveal, SectionHeading } from "./motion";
import { openAssessment } from "./modalEvents";
import { CheckIcon, LeafIcon } from "./icons";

type Tier = {
  name: string;
  tagline: string;
  monthly: number | null; // null = custom
  features: string[];
  cta: string;
  featured?: boolean;
  sponsored?: boolean;
  span: string; // grid span classes
};

const TIERS: Tier[] = [
  {
    name: "Community",
    tagline: "For community-led groups — fully sponsored by partner funders.",
    monthly: 0,
    features: [
      "Community assessment lens",
      "3 wellness modules",
      "OCAP® data governance kit",
      "Quarterly capacity lab",
    ],
    cta: "Apply for a sponsored seat",
    sponsored: true,
    span: "lg:col-span-3",
  },
  {
    name: "Basic",
    tagline: "For small teams starting their evidence journey.",
    monthly: 49,
    features: [
      "Individual & family lenses",
      "2 wellness modules",
      "Co-Pilot: 200 prompts / mo",
      "Community forum access",
    ],
    cta: "Start Free",
    span: "lg:col-span-2",
  },
  {
    name: "Professional",
    tagline: "For health units running full promotion programs.",
    monthly: 129,
    features: [
      "All four assessment lenses",
      "All 9 wellness modules",
      "Co-Pilot: unlimited prompts",
      "Formative + process evaluation",
      "Priority evidence desk",
    ],
    cta: "Start Free",
    span: "lg:col-span-2",
  },
  {
    name: "Organization",
    tagline: "For institutions embedding wisdom across every program.",
    monthly: 349,
    features: [
      "Everything in Professional",
      "Outcome + summative evaluation",
      "Custom indicator frameworks",
      "Train-the-trainer studio",
      "Networked collaboration hubs",
      "Board-ready analytics suite",
    ],
    cta: "Start Free",
    featured: true,
    span: "lg:col-span-2",
  },
  {
    name: "Enterprise",
    tagline: "For governments & networks — on-prem, SSO, dedicated team.",
    monthly: null,
    features: [
      "On-prem or private-cloud deploy",
      "SSO / SCIM provisioning",
      "Custom model fine-tuning",
      "Dedicated implementation lead",
      "24/7 emergency preparedness line",
    ],
    cta: "Talk to us",
    span: "lg:col-span-3",
  },
];

const annualPrice = (m: number) => Math.round(m * 0.8);

export default function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="relative overflow-hidden py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(54rem_40rem_at_50%_110%,rgba(232,168,124,0.14),transparent_62%),radial-gradient(40rem_30rem_at_90%_0%,rgba(31,138,138,0.10),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="wrap relative">
        <SectionHeading
          align="center"
          eyebrow="subscription tiers"
          tone="amber"
          title={
            <>
              Priced for <em className="font-medium text-amber">every tier of the system.</em>
            </>
          }
          copy="From a single practitioner to a national network — and a sponsored tier that keeps community-led groups at the table for free. Every paid plan starts with a free assessment."
        />

        {/* billing toggle */}
        <Reveal className="mt-8 flex justify-center">
          <div className="glass flex items-center gap-1 rounded-full p-1.5">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-5 py-2 text-[12.5px] font-semibold transition-all duration-300 ${
                !annual ? "bg-ocean text-cream" : "text-ink/60 hover:text-ocean"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`rounded-full px-5 py-2 text-[12.5px] font-semibold transition-all duration-300 ${
                annual ? "bg-ocean text-cream" : "text-ink/60 hover:text-ocean"
              }`}
            >
              Annual <span className="ml-1 font-mono text-[10.5px] text-sage">−20%</span>
            </button>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-6">
          {TIERS.map((t, i) => {
            const price = t.monthly === null ? null : annual ? annualPrice(t.monthly) : t.monthly;
            return (
              <Reveal key={t.name} delay={i * 0.07} className={`${t.span} h-full`}>
                <article
                  className={`relative flex h-full flex-col overflow-hidden rounded-3xl border p-7 transition-all duration-500 hover:-translate-y-1.5 ${
                    t.featured
                      ? "border-amber bg-white shadow-[0_40px_80px_-32px_rgba(232,168,124,0.75)]"
                      : t.sponsored
                        ? "border-sage/40 bg-sage/[0.08]"
                        : "border-ocean/10 bg-white/75 hover:shadow-[0_30px_60px_-32px_rgba(11,61,95,0.4)]"
                  }`}
                >
                  {t.featured && (
                    <>
                      <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber via-terra to-amber" aria-hidden="true" />
                      <span className="absolute right-5 top-5 -rotate-2 rounded-full bg-amber px-3 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em] text-ocean shadow-md">
                        most adopted
                      </span>
                    </>
                  )}
                  {t.sponsored && (
                    <span className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full border border-sage/50 bg-cream px-3 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em] text-sage">
                      <LeafIcon size={11} /> sponsored
                    </span>
                  )}

                  <h3 className="font-display text-[22px] font-semibold text-ocean">{t.name}</h3>
                  <p className="mt-1.5 min-h-10 text-[12.5px] leading-snug text-ink/60">{t.tagline}</p>

                  <p className="mt-5 flex items-baseline gap-1.5">
                    {price === null ? (
                      <span className="font-display text-[34px] font-semibold text-ocean">Custom</span>
                    ) : price === 0 ? (
                      <span className="font-display text-[34px] font-semibold text-sage">Free</span>
                    ) : (
                      <>
                        <span className="font-display text-[34px] font-semibold text-ocean">
                          ${price}
                        </span>
                        <span className="font-mono text-[11px] text-ink/45">
                          / seat / mo{annual ? " · billed annually" : ""}
                        </span>
                      </>
                    )}
                  </p>

                  <ul className="mt-6 flex-1 space-y-2.5 border-t border-ocean/10 pt-5">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[13px] text-ink/70">
                        <span
                          className={`mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full ${
                            t.featured ? "bg-amber/25 text-[#a5643a]" : "bg-teal/15 text-teal"
                          }`}
                          style={{ height: 18, width: 18 }}
                        >
                          <CheckIcon size={10} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => openAssessment({ plan: t.name })}
                    className={`mt-7 w-full rounded-full py-3 text-[13.5px] font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                      t.featured
                        ? "bg-amber text-ocean shadow-[0_14px_30px_-12px_rgba(232,168,124,0.9)] hover:bg-[#e29a68]"
                        : t.sponsored
                          ? "border border-sage/60 text-sage hover:bg-sage hover:text-cream"
                          : "border border-ocean/20 text-ocean hover:border-teal hover:text-teal"
                    }`}
                  >
                    {t.cta}
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2} className="mt-10 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">
            all paid tiers begin with the free assessment · no card required · cancel anytime
          </p>
        </Reveal>
      </div>
    </section>
  );
}
