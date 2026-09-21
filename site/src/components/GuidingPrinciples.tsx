"use client";

import Link from "next/link";
import { ShieldCheck, Target, ArrowRight, CheckCircle2 } from "lucide-react";
import { principles, strategicGoals } from "@/lib/site-content";

export default function GuidingPrinciples() {
  return (
    <section className="py-24 md:py-32 bg-white border-b border-[#0B3D5F]/6" aria-label="Governance & Principles">
      <div className="site-container">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold text-[#0D9488] uppercase tracking-widest block mb-2">
            Foundational Integrity
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062235] tracking-tight mb-4">
            Seven Guiding Principles. Four Strategic Goals.
          </h2>
          <p className="text-base sm:text-lg text-[#334155] leading-relaxed">
            Every algorithmic model, community partnership, and platform workflow at Preventa AI is held strictly accountable to these commitments.
          </p>
        </div>

        {/* 7 Guiding Principles Clean Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {principles.map((item, idx) => (
            <div 
              key={item.title} 
              className="p-7 rounded-2xl bg-[#FAF8F5] border border-[#0B3D5F]/8 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-bold text-[#0D9488] block mb-3">
                  0{idx + 1} &bull; Principle
                </span>
                <h3 className="font-display text-xl font-bold text-[#062235] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}

          {/* Strategic Goals Callout Card */}
          <div className="p-7 rounded-2xl bg-[#062235] text-white flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#14B8A6] mb-3">
                <Target size={16} />
                <span>Our Four Strategic Goals</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-4">
                What We Are Building Toward Across Canada
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
                {strategicGoals.map((goal, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2">
                    <span className="text-[#14B8A6] font-bold">&bull;</span>
                    <span className="leading-relaxed">{goal}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400">Verbatim from Preventa AI Governance Blueprint</span>
              <Link href="/about" className="text-xs font-bold text-[#14B8A6] hover:underline flex items-center gap-1">
                <span>Read Full Governance Dossier</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
