"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Hero from "./Hero";
import InstitutionalMandate from "./InstitutionalMandate";
import InteractiveAIStudio from "./InteractiveAIStudio";
import PlatformPavilion from "./PlatformPavilion";
import GuidingPrinciples from "./GuidingPrinciples";
import PricingTiers from "./PricingTiers";
import InquirySection from "./InquirySection";

const faqs = [
  {
    q: "What makes Preventa AI fundamentally different from commercial health tech?",
    a: "Preventa AI is purpose-engineered as Canada's sovereign public health intelligence infrastructure. Rather than calculating opaque proprietary risk scores, every AI synthesis cites verified Canadian and WHO peer-reviewed evidence, respects First Nations OCAP® principles, generates customizable Ottawa Charter logic models, and enforces mandatory human epidemiologist authorization before any consequential output is finalized.",
  },
  {
    q: "How does Preventa AI respect First Nations, Inuit, and Métis data sovereignty?",
    a: "We strictly enforce OCAP® principles (Ownership, Control, Access, and Possession) and the Two-Eyed Seeing (Etuaptmumk) conceptual framework. First Nations and Indigenous communities retain 100% legal ownership and sovereign possession of their data. We do not aggregate, monetize, or train commercial large language models on community-held health information.",
  },
  {
    q: "Is Preventa AI compliant with Canadian federal and provincial privacy legislation?",
    a: "Yes. Preventa AI's security architecture complies with Ontario's Personal Health Information Protection Act (PHIPA), the federal Personal Information Protection and Electronic Documents Act (PIPEDA), and provincial public sector privacy regulations. All data storage, computation, and encryption ledgers reside exclusively on Canadian soil in SOC 2 Type II certified sovereign cloud regions.",
  },
  {
    q: "How does the Sponsored Community Tier operate for grassroots organizations?",
    a: "Through our institutional equity cross-subsidy pool, non-profit community health organizations, grassroots public health initiatives, and First Nations health authorities can access Organization-tier features with zero subscription fees, funded through our enterprise and government partnerships.",
  },
  {
    q: "Does Preventa AI provide clinical diagnoses or replace emergency medical triage?",
    a: "No. Preventa AI is an evidence-informed public health, health promotion, and population epidemiology decision-support platform. It is engineered to assist healthcare executives, public health units, researchers, and community practitioners. It does not replace individual clinical medical diagnosis, prescription, or acute psychiatric emergency care.",
  },
];

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#FCFBF9]">
      
      {/* 1. Monumental Executive Hero (Spacious, Uncluttered, Pure Gravitas) */}
      <Hero />

      {/* 2. Institutional Mandate: Vision, Mission & Four Strategic Goals */}
      <InstitutionalMandate />

      {/* 3. Flagship Interactive AI Studio (The "Out of the Box" AI Intelligence Workbench) */}
      <InteractiveAIStudio />

      {/* 4. The Five Connected Pillars (Spacious Editorial Flow) */}
      <PlatformPavilion />

      {/* 5. Seven Guiding Principles (Ethical Foundation) */}
      <GuidingPrinciples />

      {/* 6. Equitable & Transparent Pricing Matrix */}
      <PricingTiers />

      {/* 7. Frequently Asked Questions (Clarity & Assurance) */}
      <section className="py-24 md:py-36 bg-[#FAF8F5] border-b border-[#0B3D5F]/8" id="faq">
        <div className="site-container max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-[#0D9488] uppercase tracking-widest block mb-2">
              Clarity &amp; Assurance
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062235] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] mt-3 max-w-xl mx-auto">
              Straightforward answers regarding our AI models, clinical boundaries, OCAP® data sovereignty, and Canadian privacy laws.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white p-6 sm:p-7 rounded-2xl border border-[#0B3D5F]/8 shadow-xs transition-all open:ring-2 open:ring-[#0D9488]/20"
              >
                <summary className="flex items-center justify-between font-display text-base sm:text-lg font-bold text-[#062235] cursor-pointer list-none select-none">
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className="text-[#0D9488] transition-transform duration-200 group-open:rotate-180 shrink-0 ml-4"
                  />
                </summary>
                <p className="mt-4 text-xs sm:text-sm text-[#334155] leading-relaxed border-t border-[#0B3D5F]/6 pt-4">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Final Executive Consultation Intake */}
      <InquirySection />

    </main>
  );
}
