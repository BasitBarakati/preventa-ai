"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, ShieldCheck, Sparkles, GraduationCap } from "lucide-react";
import Logo from "./Logo";
import { navigation } from "@/lib/site-content";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`site-header transition-all duration-300 ${
        scrolled 
          ? "shadow-sm bg-[#FAF8F5]/95 backdrop-blur-xl border-b border-[#0B3D5F]/10" 
          : "bg-[#FAF8F5]/85 backdrop-blur-md"
      }`}
    >
      <div className="site-container h-full flex items-center justify-between gap-4">
        {/* Brand Logo Lockup with Luxury Treatment */}
        <Link 
          href="/" 
          className="flex items-center gap-3.5 group py-1 focus-visible:outline-none"
          aria-label="Preventa AI Home"
        >
          <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-[#0B3D5F]/12 flex items-center justify-center p-1 transition-transform group-hover:scale-105">
            <Logo variant="symbol" priority />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-display text-xl font-bold tracking-tight text-[#0B3D5F]">
                PREVENTA
              </span>
              <span className="text-[#0A4D34] text-[11px] font-extrabold tracking-wider px-1.5 py-0.5 rounded bg-[#0A4D34]/10 border border-[#0A4D34]/20">
                AI
              </span>
            </div>
            <span className="text-[9.5px] text-[#536474] font-bold tracking-wider mt-1 uppercase">
              Public Health Intelligence &bull; Canada
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1" aria-label="Main Navigation">
          {navigation.map((item) => {
            const isAcademy = item.href === "/#university-in-the-box";
            return (
              <Link
                key={item.label}
                href={item.href}
                className="px-3.5 py-2 text-[0.88rem] font-semibold text-[#2C3E50] hover:text-[#0B3D5F] rounded-lg hover:bg-black/[0.03] transition-all flex items-center gap-1.5"
              >
                <span>{item.label}</span>
                {isAcademy && (
                  <span className="text-[9.5px] font-extrabold bg-[#C5A059]/15 text-[#8C6D27] px-1.5 py-0.5 rounded uppercase tracking-wider border border-[#C5A059]/30">
                    Academy
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Medium Screen Nav (truncated) */}
        <nav className="hidden lg:flex xl:hidden items-center gap-1" aria-label="Compact Main Navigation">
          <Link href="/situation-assessment" className="px-2.5 py-2 text-[0.85rem] font-semibold text-[#2C3E50] hover:text-[#0B3D5F]">
            Assessment
          </Link>
          <Link href="/health-and-wellness" className="px-2.5 py-2 text-[0.85rem] font-semibold text-[#2C3E50] hover:text-[#0B3D5F]">
            Wellbeing
          </Link>
          <Link href="/indigenous-health" className="px-2.5 py-2 text-[0.85rem] font-semibold text-[#2C3E50] hover:text-[#0B3D5F]">
            Indigenous Health
          </Link>
          <Link href="/courses" className="px-2.5 py-2 text-[0.85rem] font-semibold text-[#2C3E50] hover:text-[#0B3D5F] flex items-center gap-1">
            <span>Academy</span>
            <span className="text-[9px] bg-[#C5A059]/20 text-[#8C6D27] px-1 rounded font-bold">New</span>
          </Link>
        </nav>

        {/* Right Actions & CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="px-3.5 py-2 text-[0.88rem] font-bold text-[#0B3D5F] hover:text-[#1F8A8A] transition-colors"
          >
            Advisory Intake
          </Link>
          <Link
            href="/#assessment-wizard"
            className="btn-teal !bg-[#0A4D34] hover:!bg-[#0B3D5F] !py-2.5 !px-4.5 !text-[0.86rem] !rounded-xl shadow-xs"
          >
            <Sparkles size={14} className="text-[#17B8C4]" />
            <span>Launch Studio</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-xl text-[#0B3D5F] hover:bg-[#0B3D5F]/5 transition-colors focus-visible:outline-none"
          aria-expanded={open}
          aria-label={open ? "Close Navigation" : "Open Navigation"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#0B3D5F]/10 px-5 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 text-[0.95rem] font-semibold text-[#111E28] hover:text-[#1F8A8A] hover:bg-black/[0.02] rounded-xl transition-all flex items-center justify-between"
              >
                <span>{item.label}</span>
                {item.href === "/#university-in-the-box" && (
                  <span className="text-[10px] font-bold bg-[#C5A059]/20 text-[#8C6D27] px-2 py-0.5 rounded">
                    Workforce Academy
                  </span>
                )}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-[#0B3D5F]/10 flex flex-col gap-3">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="btn-secondary !w-full justify-center !py-3 font-bold"
              >
                Book Advisory Consultation
              </Link>
              <Link
                href="/#assessment-wizard"
                onClick={() => setOpen(false)}
                className="btn-teal !bg-[#0A4D34] !w-full justify-center !py-3 font-bold"
              >
                <Sparkles size={16} className="text-[#17B8C4]" />
                <span>Launch Free Assessment Studio</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
