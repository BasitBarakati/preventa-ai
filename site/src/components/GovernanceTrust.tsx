"use client";

import Link from "next/link";
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  FileCheck, 
  Scale, 
  Landmark 
} from "lucide-react";
import { indigenousHealth } from "@/lib/site-content";

export default function GovernanceTrust() {
  return (
    <section id="indigenous-health" className="py-20 bg-[#FAF7F2] border-b border-[#0B3D5F]/8">
      <div className="site-container">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3E692D]/10 text-[#3E692D] text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck size={14} />
            <span>Ethical Governance &amp; Cultural Safety</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3D5F] tracking-tight mb-4">
            Trust Is Foundational, <br className="hidden sm:inline" />
            <span className="text-[#1F8A8A] font-normal italic">Not a Feature Checkbox.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#33485C] leading-relaxed">
            Healthcare transformation without ethical guardrails causes harm. Preventa AI is engineered from day one to respect community data sovereignty, strict Canadian privacy statutes, and Indigenous self-determination.
          </p>
        </div>

        {/* 3 Core Trust Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Pillar 1: Indigenous Governance & OCAP */}
          <div className="card-clean p-8 border-2 border-[#C38D6B]/30 bg-white flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#FDF3EB] text-[#C38D6B] flex items-center justify-center mb-5">
                <Landmark size={24} />
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="badge-pill badge-amber text-[10px]">OCAP® Principles</span>
                <span className="badge-pill badge-amber text-[10px]">Two-Eyed Seeing</span>
              </div>
              <h3 className="font-display text-xl font-bold text-[#0B3D5F] mb-3">
                Indigenous Data Sovereignty
              </h3>
              <p className="text-xs sm:text-sm text-[#5D7185] leading-relaxed mb-4">
                Communities retain absolute ownership, control, access, and possession of their health data. Zero extractive algorithms; models are co-developed with Knowledge Keepers.
              </p>
            </div>
            <Link 
              href="/indigenous-health"
              className="text-xs font-bold text-[#A35B29] hover:underline flex items-center gap-1 mt-2"
            >
              <span>Explore Indigenous Framework</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Pillar 2: Canadian Health Privacy */}
          <div className="card-clean p-8 border border-[#0B3D5F]/10 bg-white flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#1F8A8A]/10 text-[#1F8A8A] flex items-center justify-center mb-5">
                <Lock size={24} />
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="badge-pill badge-teal text-[10px]">PHIPA (Ontario)</span>
                <span className="badge-pill badge-teal text-[10px]">PIPEDA (Federal)</span>
              </div>
              <h3 className="font-display text-xl font-bold text-[#0B3D5F] mb-3">
                Canadian Sovereign Privacy
              </h3>
              <p className="text-xs sm:text-sm text-[#5D7185] leading-relaxed mb-4">
                Architecture designed for localized Canadian cloud regions. Data minimization, granular consent registries, de-identification buffers, and AES-256 encryption.
              </p>
            </div>
            <Link 
              href="/privacy" 
              className="text-xs font-bold text-[#1F8A8A] hover:underline flex items-center gap-1 mt-2"
            >
              <span>Read Privacy Architecture</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Pillar 3: Human Oversight & Transparency */}
          <div className="card-clean p-8 border border-[#0B3D5F]/10 bg-white flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#0B3D5F]/10 text-[#0B3D5F] flex items-center justify-center mb-5">
                <Scale size={24} />
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="badge-pill badge-navy text-[10px]">Human-in-the-Loop</span>
                <span className="badge-pill badge-navy text-[10px]">Bias Auditing</span>
              </div>
              <h3 className="font-display text-xl font-bold text-[#0B3D5F] mb-3">
                Accountability &amp; Verification
              </h3>
              <p className="text-xs sm:text-sm text-[#5D7185] leading-relaxed mb-4">
                Every AI output cites peer-reviewed literature. No autonomous clinical diagnosis. Practitioners retain final authorization on all logic models and policies.
              </p>
            </div>
            <Link 
              href="/ai-transparency" 
              className="text-xs font-bold text-[#0B3D5F] hover:underline flex items-center gap-1 mt-2"
            >
              <span>View Transparency Standards</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Institutional Statement Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0B3D5F] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#17B8C4]">
              Institutional Ethics Charter
            </span>
            <h4 className="font-display text-xl sm:text-2xl font-bold">
              Want to review our algorithmic impact assessment or OCAP® charter?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              We welcome formal governance reviews from public health units, First Nations health authorities, and university research ethics boards (REBs).
            </p>
          </div>
          <Link
            href="/contact?topic=governance"
            className="btn-teal !py-3 !px-6 text-sm whitespace-nowrap shrink-0"
          >
            <span>Request Governance Dossier</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
