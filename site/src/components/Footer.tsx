"use client";

import Link from "next/link";
import { ShieldCheck, Heart, Mail, ArrowUpRight, Lock, Sparkles, MapPin } from "lucide-react";
import Logo from "./Logo";
import { brand, pillars } from "@/lib/site-content";

export default function Footer() {
  return (
    <footer className="bg-[#061A29] text-white border-t border-white/10 pt-20 pb-14">
      <div className="site-container">
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center shadow-sm">
                <Logo variant="symbol" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold tracking-tight text-white flex items-center gap-2 leading-none">
                  PREVENTA <span className="text-[#17B8C4] text-xs px-2 py-0.5 rounded bg-[#17B8C4]/20 border border-[#17B8C4]/30">AI</span>
                </span>
                <span className="text-[10px] text-slate-400 font-bold tracking-wider mt-1 uppercase">
                  Canada&apos;s Public Health AI Infrastructure
                </span>
              </div>
            </Link>
            
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Empowering governments, organizations, communities, and health scholars to use AI responsibly to transform health and healthcare across Canada.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-200 flex items-center gap-1.5 font-medium">
                <ShieldCheck size={14} className="text-[#17B8C4]" /> First Nations OCAP® Aligned
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-200 flex items-center gap-1.5 font-medium">
                <Lock size={14} className="text-[#17B8C4]" /> Canadian Sovereign Cloud (PHIPA/PIPEDA)
              </span>
            </div>
          </div>

          {/* Col 2: Platform Programs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#17B8C4] mb-4">
              Platform Programs
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {pillars.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="hover:text-white transition-colors">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Governance & Ethics */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#17B8C4] mb-4">
              Governance &amp; Trust
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/indigenous-health" className="hover:text-white transition-colors">
                  Indigenous Data Sovereignty (OCAP®)
                </Link>
              </li>
              <li>
                <Link href="/ai-transparency" className="hover:text-white transition-colors">
                  Algorithmic Transparency
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Architecture (PHIPA/PIPEDA)
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="hover:text-white transition-colors">
                  Accessibility (WCAG 2.2 AA)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Institutional Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Institutional Connect */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#17B8C4] mb-4">
              Institutional Connect
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Book Advisory Consultation
                </Link>
              </li>
              <li>
                <Link href="/contact?tier=community" className="hover:text-white transition-colors">
                  Sponsored Community Tier
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition-colors">
                  University In The Box Academy
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Preventa AI
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Canadian Indigenous Land Acknowledgement (CPHA Standard) */}
        <div className="py-7 border-b border-white/10 text-xs text-slate-300 leading-relaxed">
          <div className="flex items-start gap-2.5">
            <span className="text-red-400 text-sm mt-0.5">🍁</span>
            <div>
              <strong className="text-white font-semibold">Land &amp; Territory Acknowledgement:</strong> Preventa AI honors and respects the Indigenous Peoples of Turtle Island — First Nations, Inuit, and Métis — whose ancestral lands span across Canada. We are dedicated to advancing Indigenous self-determination, health equity, cultural safety, and data sovereignty in accordance with the OCAP® principles and the Truth and Reconciliation Commission Calls to Action.
            </div>
          </div>
        </div>

        {/* Public Health Medical Notice */}
        <div className="py-6 border-b border-white/10 text-center lg:text-left">
          <p className="text-[11px] text-slate-400 leading-relaxed">
            <strong className="text-slate-300">Public Health Regulatory Notice:</strong> Preventa AI is an evidence-informed public health and health promotion technology platform engineered for population-level decision support, program logic modeling, risk stratification, and workforce capability building. It does not provide individual clinical diagnosis, prescription, or acute psychiatric emergency care. If you are experiencing an acute medical emergency, please contact 911 or your local regional emergency service immediately.
          </p>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} {brand.displayName} &bull; All Rights Reserved. Sovereign Canadian Public Health Technology.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
            <Link href="/ai-transparency" className="hover:text-white transition-colors">AI Transparency</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
