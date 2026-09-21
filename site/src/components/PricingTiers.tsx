"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight, ShieldCheck, HeartHandshake } from "lucide-react";
import { subscriptionTiers } from "@/lib/site-content";

export default function PricingTiers() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="py-20 bg-white border-b border-[#0B3D5F]/8">
      <div className="site-container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F8A8A]/10 text-[#1F8A8A] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={14} />
            <span>Equitable &amp; Transparent Plans</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3D5F] tracking-tight mb-4">
            Public Health Intelligence for Every Scale
          </h2>
          <p className="text-base sm:text-lg text-[#33485C] leading-relaxed mb-8">
            From individual health scholars to provincial ministries. No community or grassroots organization is ever priced out of evidence-based health transformation.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-[#FAF7F2] border border-[#0B3D5F]/10">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                !annual ? "bg-[#0B3D5F] text-white shadow-xs" : "text-[#5D7185] hover:text-[#0B3D5F]"
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                annual ? "bg-[#0B3D5F] text-white shadow-xs" : "text-[#5D7185] hover:text-[#0B3D5F]"
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 rounded-full bg-[#7FB069] text-white text-[10px] font-extrabold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 4 Core Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {subscriptionTiers.slice(0, 4).map((tier) => {
            const price = annual ? tier.priceAnnual : tier.priceMonthly;
            const isPopular = tier.popular;

            return (
              <div
                key={tier.name}
                className={`rounded-3xl p-7 flex flex-col justify-between transition-all border ${
                  isPopular
                    ? "bg-[#0B3D5F] text-white border-[#0B3D5F] shadow-xl scale-[1.02] relative"
                    : "bg-white text-[#1A2530] border-[#0B3D5F]/10 hover:border-[#0B3D5F]/20 hover:shadow-lg"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#17B8C4] text-[#062235] text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                    ★ Most Popular
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-display text-xl font-bold ${isPopular ? "text-white" : "text-[#0B3D5F]"}`}>
                      {tier.name}
                    </h3>
                    {tier.badge && !isPopular && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#1F8A8A]/10 text-[#1F8A8A]">
                        {tier.badge}
                      </span>
                    )}
                  </div>

                  <p className={`text-xs mb-6 min-h-[32px] ${isPopular ? "text-slate-300" : "text-[#5D7185]"}`}>
                    {tier.target}
                  </p>

                  <div className="mb-6 pb-6 border-b border-black/[0.08]">
                    <div className="flex items-baseline gap-1">
                      <span className={`font-display text-3xl sm:text-4xl font-extrabold ${isPopular ? "text-white" : "text-[#0B3D5F]"}`}>
                        {price}
                      </span>
                      {price !== "Custom" && price !== "$0" && (
                        <span className={`text-xs ${isPopular ? "text-slate-300" : "text-[#5D7185]"}`}>
                          CAD / mo
                        </span>
                      )}
                    </div>
                    <span className={`text-[11px] block mt-1 ${isPopular ? "text-slate-300" : "text-[#5D7185]"}`}>
                      {tier.period}
                    </span>
                  </div>

                  {/* Feature List */}
                  <ul className="space-y-3 text-xs mb-8">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check 
                          size={15} 
                          className={`shrink-0 mt-0.5 ${isPopular ? "text-[#17B8C4]" : "text-[#1F8A8A]"}`} 
                        />
                        <span className={isPopular ? "text-slate-200" : "text-[#33485C]"}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={tier.href}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    isPopular
                      ? "bg-[#17B8C4] text-[#062235] hover:bg-white shadow-md"
                      : "bg-[#0B3D5F] text-white hover:bg-[#144E75]"
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Community Sponsored Tier Banner */}
        {(() => {
          const commTier = subscriptionTiers[4];
          return (
            <div className="p-8 rounded-3xl bg-gradient-to-r from-[#FAF7F2] via-white to-[#EBF3E7] border-2 border-[#7FB069]/40 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-center lg:text-left">
                <div className="w-14 h-14 rounded-2xl bg-[#7FB069] text-white flex items-center justify-center shrink-0">
                  <HeartHandshake size={28} />
                </div>
                <div>
                  <div className="flex items-center gap-2 justify-center lg:justify-start mb-1">
                    <span className="badge-pill badge-sage text-[10px]">Equity Guarantee</span>
                    <span className="text-xs font-bold text-[#0B3D5F]">Sponsored Community Access Tier</span>
                  </div>
                  <h4 className="font-display text-xl sm:text-2xl font-bold text-[#0B3D5F]">
                    Grassroots, Non-Profit &amp; First Nations Communities
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5D7185] mt-1 max-w-2xl">
                    Full Organization-tier capabilities funded through our cross-subsidy pool. Community retains 100% data authority under OCAP® principles with zero licensing fees.
                  </p>
                </div>
              </div>

              <Link
                href={commTier.href}
                className="btn-teal !py-3 !px-6 text-xs font-bold whitespace-nowrap shrink-0"
              >
                <span>{commTier.cta}</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
