import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Home, ChevronRight } from "lucide-react";
import type { PageDefinition } from "@/lib/site-content";
import GlassCard from "./ui/GlassCard";
import GlowingButton from "./ui/GlowingButton";
import InquiryForm from "./InquiryForm";

export default function GenericPage({ page }: { page: PageDefinition }) {
  const isContact = page.path === "/contact";

  return (
    <main id="main-content" className="min-h-screen bg-[#FAF7F2]">
      {/* Page Header */}
      <section className="pt-12 pb-14 bg-white border-b border-[#0B3D5F]/8">
        <div className="site-container">
          <nav className="flex items-center gap-2 text-xs text-[#5D7185] mb-6 font-medium" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#0B3D5F] flex items-center gap-1">
              <Home size={13} />
              <span>Home</span>
            </Link>
            <ChevronRight size={12} />
            <span className="text-[#0B3D5F] font-bold">{page.label}</span>
          </nav>

          <span className="badge-pill badge-teal mb-3">{page.eyebrow}</span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3D5F] tracking-tight max-w-3xl mb-4 leading-tight">
            {page.title}
          </h1>
          <p className="text-base sm:text-lg text-[#33485C] max-w-2xl leading-relaxed mb-6">
            {page.description}
          </p>

          {!isContact && (
            <div className="flex flex-wrap items-center gap-3">
              <GlowingButton href="/contact" variant="primary">
                <span>Get in Touch</span>
                <ArrowRight size={16} />
              </GlowingButton>
              <GlowingButton href="/" variant="secondary">
                Back to Homepage
              </GlowingButton>
            </div>
          )}
        </div>
      </section>

      {/* Notice Banner if any */}
      {page.notice && (
        <div className="site-container pt-8">
          <div className="p-4 rounded-2xl bg-[#EBF3E7] border border-[#7FB069]/40 flex items-start gap-3 text-xs text-[#3E692D]">
            <ShieldCheck size={18} className="shrink-0 mt-0.5" />
            <p className="font-medium leading-relaxed">{page.notice}</p>
          </div>
        </div>
      )}

      {/* Highlights Grid */}
      <section className="site-container py-12">
        <div className="mb-6">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0B3D5F]">
            Core Commitments &amp; Highlights
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {page.highlights.map((item, index) => (
            <div key={item} className="card-clean p-5 flex items-start gap-3 bg-white">
              <span className="w-7 h-7 rounded-lg bg-[#FAF7F2] text-[#0B3D5F] font-mono-data font-bold text-xs flex items-center justify-center shrink-0 border border-[#0B3D5F]/10">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-xs sm:text-sm text-[#33485C] font-medium leading-relaxed pt-0.5">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Policy Specific Text */}
      {page.kind === "policy" && (
        <section className="site-container pb-14">
          <div className="card-clean p-8 bg-white border border-[#0B3D5F]/10 space-y-4">
            <h2 className="font-display text-xl font-bold text-[#0B3D5F]">
              Implementation &amp; Regulatory Alignment
            </h2>
            <p className="text-xs sm:text-sm text-[#5D7185] leading-relaxed">
              This document outlines the product direction for Preventa AI. Production controls, institutional data agreements, retention schedules, and compliance certifications are formalized prior to deploying personal or organizational workflows in clinical and public health jurisdictions.
            </p>
            <p className="text-xs sm:text-sm text-[#5D7185] leading-relaxed">
              For governance inquiries or accessibility questions, please connect via our <Link href="/contact" className="font-bold text-[#1F8A8A] underline">contact form</Link>.
            </p>
          </div>
        </section>
      )}

      {/* Contact Form Section if Contact page */}
      {isContact && (
        <section className="site-container pb-16" id="contact-form">
          <div className="card-clean p-8 sm:p-10 bg-white">
            <InquiryForm />
          </div>
        </section>
      )}

      {/* FAQs if present */}
      {page.faqs && (
        <section className="site-container pb-16">
          <div className="space-y-4">
            {page.faqs.map((faq) => (
              <details key={faq.question} className="card-clean p-6 bg-white group">
                <summary className="font-display text-base font-bold text-[#0B3D5F] cursor-pointer list-none flex justify-between items-center">
                  <span>{faq.question}</span>
                  <span className="text-[#1F8A8A] text-lg font-bold">+</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-[#33485C] leading-relaxed border-t border-[#0B3D5F]/6 pt-3">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
