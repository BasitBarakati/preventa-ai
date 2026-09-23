"use client";

import Link from "next/link";
import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { principles } from "@/lib/site-content";

export default function GuidingPrinciples() {
  return (
    <section className="py-24 md:py-36 bg-white border-b border-[#0B3D5F]/8" aria-label="Governance & Principles">
      <div className="site-container max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D9488]/10 text-[#0D9488] text-[11px] font-extrabold uppercase tracking-widest mb-4">
            <ShieldCheck size={13} />
            <span>Ethical Foundation</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-[#062235] tracking-tight leading-[1.1] mb-6">
            Seven Principles for <br />
            <span className="font-serif-italic font-normal text-[#0D9488]">
              Accountable Intelligence.
            </span>
          </h2>

          <p className="text-base sm:text-xl text-[#334155] font-normal leading-relaxed">
            Every algorithmic parameter, community partnership, and policy logic model at Preventa AI is bound by these foundational commitments.
          </p>
        </div>

        {/* 7 Guiding Principles Clean Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {principles.map((item, idx) => (
            <div 
              key={item.title} 
              className="p-7 rounded-2xl bg-[#FAF8F5] border border-[#0B3D5F]/6 hover:border-[#0D9488]/30 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#0D9488]">
                    0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono text-[#94A3B8] uppercase">Principle</span>
                </div>

                <h3 className="font-display text-xl font-bold text-[#062235] mb-2.5 group-hover:text-[#0D9488] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#0B3D5F]/6 flex items-center gap-1.5 text-[11px] text-[#0A4D34] font-medium">
                <CheckCircle2 size={13} className="text-[#14B8A6]" />
                <span>Audited Policy Standard</span>
              </div>
            </div>
          ))}

          {/* Full Governance Dossier Anchor */}
          <div className="p-7 rounded-2xl bg-[#062235] text-white flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-bold text-[#14B8A6] block mb-3">
                Full Charter
              </span>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                Sovereign Governance Dossier
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                Review our complete ethical governance framework, including OCAP® principles alignment, algorithmic bias auditing protocols, and non-diagnostic public health boundaries.
              </p>
            </div>

            <Link 
              href="/about" 
              className="btn-primary !bg-[#14B8A6] !text-[#062235] hover:!bg-[#17B8C4] !py-2.5 !px-5 text-xs font-bold self-start inline-flex items-center gap-2"
            >
              <span>Read Full Governance Dossier</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
