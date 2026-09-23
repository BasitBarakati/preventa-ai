"use client";

import Link from "next/link";
import { Building2, UsersRound, GraduationCap, ArrowRight, ShieldCheck, Activity, Award } from "lucide-react";

export default function ExecutiveOverview() {
  return (
    <section className="py-24 bg-white border-b border-[#0B3D5F]/6" aria-label="Stakeholder Pathways">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold text-[#0D9488] uppercase tracking-widest block mb-2">
            Strategic Alignment
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062235] tracking-tight mb-4">
            A Unified Platform for Three Crucial Stakeholders
          </h2>
          <p className="text-base sm:text-lg text-[#334155] leading-relaxed">
            Public health transformation succeeds only when governance, communities, and scientific expertise operate on the same evidence continuum.
          </p>
        </div>

        {/* 3 Clear Stakeholder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Governments & Health Units */}
          <div className="card-executive p-8 sm:p-9 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#062235] text-white flex items-center justify-center mb-6 shadow-2xs">
                <Building2 size={24} className="text-[#14B8A6]" />
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0D9488] block mb-2">
                Public Sector &amp; Health Units
              </span>
              <h3 className="font-display text-2xl font-bold text-[#062235] mb-3">
                Governments &amp; Health Authorities
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed mb-6">
                Rapidly assess district population health needs, detect chronic risk clusters, and auto-generate evidence-informed intervention plans aligned with the Ottawa Charter and PHAC guidelines.
              </p>
              
              <ul className="space-y-2.5 text-xs text-[#334155] mb-8 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
                  <span>District-wide situation assessments</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
                  <span>Automated program logic models &amp; indicator banks</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
                  <span>Designed for PHIPA &amp; PIPEDA sovereign cloud alignment</span>
                </li>
              </ul>
            </div>

            <Link
              href="/situation-assessment"
              className="text-xs font-bold text-[#062235] hover:text-[#0D9488] flex items-center gap-1.5 group pt-4 border-t border-[#0B3D5F]/8"
            >
              <span>Explore Assessment Systems</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Card 2: Communities & First Nations */}
          <div className="card-executive p-8 sm:p-9 flex flex-col justify-between bg-gradient-to-b from-white to-[#FAF8F5]">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0A4D34] text-white flex items-center justify-center mb-6 shadow-2xs">
                <UsersRound size={24} className="text-[#A7F3D0]" />
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0A4D34] block mb-2">
                Grassroots &amp; Indigenous Leadership
              </span>
              <h3 className="font-display text-2xl font-bold text-[#062235] mb-3">
                Communities &amp; First Nations
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed mb-6">
                Direct community self-determination. Full adherence to First Nations OCAP® principles ensuring zero extractive data practices, paired with culturally safe health promotion.
              </p>
              
              <ul className="space-y-2.5 text-xs text-[#334155] mb-8 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0A4D34]" />
                  <span>100% First Nations data sovereignty (OCAP®)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0A4D34]" />
                  <span>Two-Eyed Seeing (Etuaptmumk) frameworks</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0A4D34]" />
                  <span>100% Subsidized Sponsored Community Tier</span>
                </li>
              </ul>
            </div>

            <Link
              href="/indigenous-health"
              className="text-xs font-bold text-[#0A4D34] hover:text-[#062235] flex items-center gap-1.5 group pt-4 border-t border-[#0B3D5F]/8"
            >
              <span>Explore Indigenous Sovereignty</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Card 3: Scholars & Health Workforce */}
          <div className="card-executive p-8 sm:p-9 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#C5A059] text-[#062235] flex items-center justify-center mb-6 shadow-2xs">
                <GraduationCap size={24} className="text-[#062235]" />
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#8C6D27] block mb-2">
                Workforce Capability &amp; Research
              </span>
              <h3 className="font-display text-2xl font-bold text-[#062235] mb-3">
                Health Scholars &amp; Workforce
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed mb-6">
                Build practical, operational AI capacity with University In The Box. Six specialized applied tracks with verifiable Canadian micro-credentials and sandbox computing.
              </p>
              
              <ul className="space-y-2.5 text-xs text-[#334155] mb-8 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                  <span>6 Applied Public Health &amp; AI Tracks</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                  <span>Public health professional development &amp; micro-credentials</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                  <span>Self-paced or university-partnered cohort learning</span>
                </li>
              </ul>
            </div>

            <Link
              href="/courses"
              className="text-xs font-bold text-[#8C6D27] hover:text-[#062235] flex items-center gap-1.5 group pt-4 border-t border-[#0B3D5F]/8"
            >
              <span>Explore Workforce Academy</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
