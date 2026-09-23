"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import BookFolioContainer, { FolioItem } from "./BookFolioContainer";
import Hero from "./Hero";
import InstitutionalMandate from "./InstitutionalMandate";
import InteractiveAIStudio from "./InteractiveAIStudio";
import PlatformPavilion from "./PlatformPavilion";
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
];

export default function HomePage() {
  const folios: FolioItem[] = [
    {
      id: "folio-1",
      num: "I",
      pageNum: "01",
      title: "Frontispiece & Platform Biome",
      subtitle: "Canada's Sovereign Public Health Intelligence Platform",
      content: <Hero />,
    },
    {
      id: "folio-2",
      num: "II",
      pageNum: "02",
      title: "The Institutional Charter",
      subtitle: "Vision, Strategic Goals & Seven Ethical Principles",
      content: <InstitutionalMandate />,
    },
    {
      id: "folio-3",
      num: "III",
      pageNum: "03",
      title: "Sovereign AI Decision Studio",
      subtitle: "Transparent Canadian Evidence Kernel v4.2",
      content: <InteractiveAIStudio />,
    },
    {
      id: "folio-4",
      num: "IV",
      pageNum: "04",
      title: "National Programs & Academy",
      subtitle: "Five Sovereign Programs & University In The Box",
      content: <PlatformPavilion />,
    },
    {
      id: "folio-5",
      num: "V",
      pageNum: "05",
      title: "Equity Access & Executive Intake",
      subtitle: "Transparent Matrix, Governance FAQs & Briefing Booking",
      content: (
        <div className="space-y-12">
          {/* Transparent Access Matrix */}
          <PricingTiers />

          {/* Curated Governance FAQ Spreads */}
          <div className="site-container max-w-4xl mx-auto pt-8 border-t border-[#0B3D5F]/10">
            <div className="text-center mb-8">
              <span className="text-xs font-bold text-[#0D9488] uppercase tracking-widest block mb-1">
                Governance &amp; Assurance
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#062235]">
                Frequently Asked Questions
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 max-w-lg mx-auto">
                Straightforward answers regarding our AI models, clinical boundaries, OCAP® data sovereignty, and Canadian privacy laws.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-white p-5 rounded-2xl border border-[#0B3D5F]/8 shadow-2xs transition-all open:ring-2 open:ring-[#0D9488]/20"
                >
                  <summary className="flex items-center justify-between font-display text-sm sm:text-base font-bold text-[#062235] cursor-pointer list-none select-none">
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={16}
                      className="text-[#0D9488] transition-transform duration-200 group-open:rotate-180 shrink-0 ml-3"
                    />
                  </summary>
                  <p className="mt-3 text-xs text-[#334155] leading-relaxed border-t border-[#0B3D5F]/6 pt-3">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* Executive Consultation & Intake */}
          <InquirySection />
        </div>
      ),
    },
  ];

  return (
    <main id="main-content" className="min-h-screen bg-[#FCFBF9]">
      <BookFolioContainer folios={folios} />
    </main>
  );
}
