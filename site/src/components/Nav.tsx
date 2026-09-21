"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, ShieldCheck } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { label: "Mandate", href: "/#mandate" },
  { label: "AI Studio", href: "/#ai-studio" },
  { label: "The Platform", href: "/#platform" },
  { label: "Workforce Academy", href: "/courses" },
  { label: "Indigenous OCAP®", href: "/indigenous-health" },
  { label: "Pricing", href: "/#pricing" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`site-header transition-all duration-300 ${
        scrolled 
          ? "shadow-sm bg-[#FCFBF9]/95 backdrop-blur-2xl border-b border-[#0B3D5F]/10" 
          : "bg-[#FCFBF9]/85 backdrop-blur-xl"
      }`}
    >
      <div className="site-container h-full flex items-center justify-between gap-6">
        
        {/* Brand Identity Lockup */}
        <Link 
          href="/" 
          className="flex items-center gap-3 group py-1 focus-visible:outline-none"
          aria-label="Preventa AI Homepage"
        >
          <div className="w-10 h-10 rounded-xl bg-white shadow-2xs border border-[#0B3D5F]/10 flex items-center justify-center p-1 transition-transform group-hover:scale-105">
            <Logo variant="symbol" priority />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-display text-xl font-bold tracking-tight text-[#062235]">
                PREVENTA
              </span>
              <span className="text-[#0A4D34] text-[11px] font-extrabold tracking-wider px-1.5 py-0.5 rounded bg-[#0A4D34]/10 border border-[#0A4D34]/20">
                AI
              </span>
            </div>
            <span className="text-[9.5px] text-[#64748B] font-semibold tracking-wider mt-0.5 uppercase">
              Public Health Intelligence &bull; Canada
            </span>
          </div>
        </Link>

        {/* Streamlined Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-3.5 py-2 text-[0.88rem] font-medium text-[#334155] hover:text-[#062235] hover:bg-black/[0.03] rounded-lg transition-all"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Executive Action */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="btn-primary !py-2.5 !px-5 !text-[0.85rem] !rounded-xl"
          >
            <span>Book Executive Briefing</span>
            <ArrowRight size={14} className="text-[#14B8A6]" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-xl text-[#062235] hover:bg-black/[0.04] transition-colors focus-visible:outline-none"
          aria-expanded={open}
          aria-label={open ? "Close Navigation" : "Open Navigation"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="lg:hidden bg-[#FCFBF9] border-b border-[#0B3D5F]/10 px-6 pt-4 pb-7 shadow-lg animate-in slide-in-from-top-3 duration-200">
          <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 text-base font-semibold text-[#0F172A] hover:text-[#0D9488] hover:bg-black/[0.02] rounded-xl transition-all"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-[#0B3D5F]/8">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="btn-primary !w-full justify-center !py-3"
              >
                Book Executive Briefing
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
