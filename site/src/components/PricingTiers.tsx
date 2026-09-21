"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight, ShieldCheck, HeartHandshake } from "lucide-react";

export default function PricingTiers() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 md:py-32 bg-white border-b border-[#0B3D5F]/6">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold text-[#0D9488] uppercase tracking-widest block mb-2">
            Equitable &amp; Transparent Access
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062235] tracking-tight mb-4">
            Public Health Intelligence for Every Scale
          </h2>
          <p className="text-base sm:text-lg text-[#334155] leading-relaxed mb-8">
            From grassroots community initiatives to provincial ministries. No community is ever priced out of evidence-based health transformation.
          </p>

          {/* Billing Switcher */}
          <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-[#FAF8F5] border border-[#0B3D5F]/10">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                !annual ? "bg-[#062235] text-white shadow-xs" : "text-[#64748B] hover:text-[#062235]"
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                annual ? "bg-[#062235] text-white shadow-xs" : "text-[#64748B] hover:text-[#062235]"
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 rounded-full bg-[#0A4D34] text-white text-[10px] font-extrabold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Clear Executive Tiers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Tier 1: Community & Grassroots */}
          <div className="card-executive p-8 sm:p-9 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-2xl font-bold text-[#062235]">
                  Community &amp; Public
                </h3>
                <span className="text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF8F5] text-[#0A4D34] border border-[#0A4D34]/15">
                  100% Free
                </span>
              </div>
              <p className="text-xs text-[#64748B] mb-6">
                For individuals, students, community advocates, and grassroots local leaders.
              </p>

              <div className="mb-6 pb-6 border-b border-[#0B3D5F]/8">
                <span className="font-display text-4xl font-extrabold text-[#062235]">$0</span>
                <span className="text-xs text-[#64748B] block mt-1">Forever free for the public</span>
              </div>

              <ul className="space-y-3 text-xs text-[#334155] mb-8">
                {[
                  "Personal & Family Wellbeing self-assessment",
                  "Access to public health literacy guides",
                  "Verified health evidence library queries",
                  "Local browser memory evaluation (zero tracking)",
                  "Printable personal vitality action summaries",
                ].map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check size={15} className="text-[#0D9488] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/#assessment-wizard"
              className="btn-secondary !w-full justify-center !py-3 text-xs font-bold"
            >
              Start Free Assessment
            </Link>
          </div>

          {/* Tier 2: Organization & Health Unit (Featured) */}
          <div className="card-luxury p-8 sm:p-9 flex flex-col justify-between bg-[#062235] text-white relative shadow-xl scale-[1.02]">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#14B8A6] text-[#062235] text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
              ★ Health Authority Standard
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 mt-2">
                <h3 className="font-display text-2xl font-bold text-white">
                  Organization
                </h3>
                <span className="text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-[#14B8A6]">
                  Full Suite
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-6">
                For clinics, public health units, schools, NGOs, and municipal health boards.
              </p>

              <div className="mb-6 pb-6 border-b border-white/10">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-4xl font-extrabold text-white">
                    {annual ? "$249" : "$299"}
                  </span>
                  <span className="text-xs text-slate-300">CAD / month</span>
                </div>
                <span className="text-xs text-slate-400 block mt-1">
                  {annual ? "Billed annually ($2,988/yr)" : "Billed monthly"}
                </span>
              </div>

              <ul className="space-y-3 text-xs text-slate-200 mb-8">
                {[
                  "Everything in Community + up to 10 team seats",
                  "Full Organization & Community Assessment modules",
                  "AI Co-Pilot Logic Model & Policy Generator",
                  "Continuous 4-stage evaluation indicator bank",
                  "Custom population health dashboard export",
                  "University In The Box micro-credential access",
                ].map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check size={15} className="text-[#14B8A6] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/contact?tier=organization"
              className="btn-teal !w-full justify-center !py-3 text-xs font-bold !bg-[#14B8A6] !text-[#062235] hover:!bg-white"
            >
              Start Organization Pilot
            </Link>
          </div>

          {/* Tier 3: Enterprise & Provincial */}
          <div className="card-executive p-8 sm:p-9 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-2xl font-bold text-[#062235]">
                  Enterprise
                </h3>
                <span className="text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF8F5] text-[#062235] border border-[#0B3D5F]/15">
                  Institutional
                </span>
              </div>
              <p className="text-xs text-[#64748B] mb-6">
                For provincial ministries, regional health networks, universities, and hospitals.
              </p>

              <div className="mb-6 pb-6 border-b border-[#0B3D5F]/8">
                <span className="font-display text-4xl font-extrabold text-[#062235]">Custom</span>
                <span className="text-xs text-[#64748B] block mt-1">Tailored institutional deployment</span>
              </div>

              <ul className="space-y-3 text-xs text-[#334155] mb-8">
                {[
                  "Unlimited multi-department seats & SSO integration",
                  "Dedicated Canadian sovereign cloud region",
                  "Custom on-premise or sovereign LLM deployment",
                  "Full EHR/HIS API data integration",
                  "Continuous algorithmic bias auditing",
                  "Dedicated epidemiologist & SLA guarantee (99.9%)",
                ].map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check size={15} className="text-[#0D9488] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/contact?tier=enterprise"
              className="btn-primary !w-full justify-center !py-3 text-xs font-bold"
            >
              Contact Advisory Team
            </Link>
          </div>

        </div>

        {/* First Nations & Community Guarantee Banner */}
        <div className="p-7 rounded-2xl bg-[#FAF8F5] border border-[#0A4D34]/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-[#EAF4EE] text-[#0A4D34] flex items-center justify-center shrink-0">
              <HeartHandshake size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start mb-0.5">
                <span className="badge-pill badge-forest text-[10px] font-bold">100% Subsidized</span>
                <span className="text-xs font-bold text-[#062235]">Sponsored Community Access Tier</span>
              </div>
              <h4 className="font-display text-lg font-bold text-[#062235]">
                First Nations, Inuit, Métis &amp; Non-Profit Communities
              </h4>
              <p className="text-xs text-[#64748B] mt-0.5 max-w-2xl">
                Full Organization-tier capabilities funded through our institutional cross-subsidy pool. Community retains 100% data authority under OCAP® principles with zero licensing fees.
              </p>
            </div>
          </div>

          <Link
            href="/contact?tier=community"
            className="btn-secondary !py-2.5 !px-5 text-xs font-bold whitespace-nowrap shrink-0"
          >
            <span>Apply for Community Subsidy</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}
