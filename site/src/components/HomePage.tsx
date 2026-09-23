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
    a: "Preventa AI is an AI-enabled public health transformation platform focused on moving from intelligence to practical action. Rather than calculating opaque proprietary risk scores or offering clinical diagnoses, our platform synthesizes verified public health evidence, respects First Nations OCAP® principles, generates customizable Ottawa Charter logic models, and enforces mandatory human review before any consequential public health action is taken.",
  },
  {
    q: "How does Preventa AI respect First Nations, Inuit, and Métis data sovereignty?",
    a: "Implementation is relationship-based and community-governed. We respect First Nations OCAP® principles (Ownership, Control, Access, and Possession) and Two-Eyed Seeing (Etuaptmumk). Preventa AI does not speak on behalf of any Nation or community. Indigenous communities retain complete ownership, authority, and possession of their health knowledge, and community data is never extracted or monetized for commercial AI model training.",
  },
  {
    q: "How is Preventa AI designed to support PHIPA and PIPEDA privacy requirements?",
    a: "Preventa AI is engineered from the ground up to support compliance with Ontario's Personal Health Information Protection Act (PHIPA) and the federal Personal Information Protection and Electronic Documents Act (PIPEDA). Our platform applies privacy-by-design, data minimization, role-based access control, comprehensive audit logging, and Canadian data residency. We do not use community or personal health information to train commercial large language models.",
  },
  {
    q: "How does the Community Tier operate for grassroots organizations?",
    a: "Through our institutional equity cross-subsidy pool, non-profit community health organizations, grassroots public health initiatives, and remote First Nations health authorities can access platform features with zero subscription fees, supported through our enterprise and academic partnerships.",
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
