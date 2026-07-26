"use client";

import { useState } from "react";
import { Reveal, SectionHeading } from "./motion";

/* Single source of truth — rendered as an accordion AND emitted as
 * FAQPage JSON-LD so answer engines can cite us verbatim. */
const FAQS = [
  {
    q: "What is Phronesis AI?",
    a: "Phronesis AI is an AI health promotion platform for public health teams. It combines population health assessment, health promotion planning, capacity building and rigorous evaluation in one evidence-based system — named for the Aristotelian idea of phronesis, or practical wisdom: the judgment to act well on evidence in complex situations.",
  },
  {
    q: "How does AI support health promotion without replacing practitioners?",
    a: "The platform is human-led and AI-assisted. The AI retrieves evidence, drafts profiles, flags data gaps and suggests interventions — always with citations. A practitioner must approve, revise or reject every suggestion before it reaches a report or a community. Nothing ships on machine authority alone.",
  },
  {
    q: "What does the PHRONESIS acronym stand for?",
    a: "P — Population Assessment & Surveillance. H — Health Promotion & Disease Prevention. R — Resilience & Emergency Preparedness. O — Operations & Policy Review. N — Networked Collaboration. E — Evidence & AI. S — Systems for Health Protection. I — Intelligence & Analytics. S — Strengthening the six core public health functions.",
  },
  {
    q: "Is Phronesis AI compliant with PHIPA, HIPAA and GDPR?",
    a: "Yes. The platform is privacy by design: inputs are de-identified, access is role-based and audited, and data residency options cover PHIPA (Ontario), HIPAA (United States) and GDPR (European Union) requirements. Compliance documentation is available on Enterprise plans.",
  },
  {
    q: "How does Phronesis AI respect OCAP® principles?",
    a: "Community data remains under community Ownership, Control, Access and Possession. First Nations and community partners govern their own data through built-in agreements, validation sessions precede publication, and the platform technically enforces the access rules communities set.",
  },
  {
    q: "How much does Phronesis AI cost?",
    a: "Paid plans start at $49 per seat per month (Basic) and $129 (Professional); the Organization tier is $349 per seat per month with annual billing discounts. A fully sponsored Community tier is free for community-led groups, funded by partner organizations.",
  },
];

function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(48rem_36rem_at_92%_15%,rgba(127,176,105,0.10),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="wrap relative grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="answers, plainly"
            tone="sage"
            title={
              <>
                Questions teams <em className="font-medium text-sage">actually ask.</em>
              </>
            }
            copy="Written for humans and machines alike — direct answers, no brochure-speak. If your question isn't here, the free assessment is the fastest way to get one."
          />
        </div>

        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <article
                  className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    isOpen ? "border-teal/40 bg-white" : "border-ocean/10 bg-white/70 hover:border-teal/30"
                  }`}
                >
                  <h3>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                    >
                      <span className="font-display text-[17px] font-semibold leading-snug text-ocean">
                        {f.q}
                      </span>
                      <span
                        className={`relative grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                          isOpen ? "rotate-45 border-teal bg-teal text-cream" : "border-ocean/20 text-ocean"
                        }`}
                        aria-hidden="true"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                          <path d="M6 1v10M1 6h10" />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <div
                    className="grid transition-all duration-500 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-[14px] leading-[1.75] text-ink/70">{f.a}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
      <JsonLd />
    </section>
  );
}
