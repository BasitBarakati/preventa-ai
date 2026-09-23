"use client";

import React, { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";

export interface FolioItem {
  id: string;
  num: string;
  pageNum: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

interface BookFolioContainerProps {
  folios: FolioItem[];
}

export default function BookFolioContainer({ folios }: BookFolioContainerProps) {
  const [activeFolioIndex, setActiveFolioIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      folios.forEach((folio, idx) => {
        const el = document.getElementById(folio.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveFolioIndex(idx);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [folios]);

  const scrollToFolio = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="book-folio-stack relative w-full">
      
      {/* Luxury Floating Bookmark Ribbon HUD (Desktop) */}
      <nav 
        aria-label="Folio Navigation" 
        className="book-ribbon-hud"
      >
        <div className="p-3 rounded-2xl bg-white/90 backdrop-blur-xl border border-[#0B3D5F]/12 shadow-card flex flex-col items-center gap-2">
          
          <div className="flex items-center gap-1.5 pb-2 border-b border-[#0B3D5F]/8">
            <Bookmark size={13} className="text-[#C5A059]" />
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#062235]">
              FOLIO {folios[activeFolioIndex]?.num}
            </span>
          </div>

          {/* Quick-Jump Folio Nodes */}
          <div className="flex flex-col gap-1.5 py-1">
            {folios.map((folio, idx) => {
              const isActive = activeFolioIndex === idx;
              return (
                <button
                  key={folio.id}
                  type="button"
                  onClick={() => scrollToFolio(folio.id)}
                  aria-label={`Jump to Folio ${folio.num}: ${folio.title}`}
                  className={`group relative flex items-center justify-end gap-2.5 p-1 transition-all cursor-pointer ${
                    isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
                  }`}
                >
                  {/* Tooltip on Hover */}
                  <span className="hidden group-hover:inline-block absolute right-6 px-2.5 py-1 rounded-md bg-[#062235] text-white text-[10.5px] font-medium whitespace-nowrap shadow-sm">
                    {folio.num} &bull; {folio.title}
                  </span>
                  
                  {/* Indicator Dot */}
                  <span 
                    className={`block rounded-full transition-all ${
                      isActive 
                        ? "w-2.5 h-6 bg-gradient-to-b from-[#0D9488] to-[#0A4D34] shadow-xs" 
                        : "w-2 h-2 bg-[#94A3B8] group-hover:bg-[#062235]"
                    }`} 
                  />
                </button>
              );
            })}
          </div>

          {/* Page Counter */}
          <span className="text-[9.5px] font-mono font-bold text-[#64748B] pt-1 border-t border-[#0B3D5F]/8">
            {folios[activeFolioIndex]?.pageNum} / 0{folios.length}
          </span>
        </div>
      </nav>

      {/* Render Stacked Folios */}
      {folios.map((folio, index) => {
        const isFirst = index === 0;
        // Higher z-index for later folios so they stack cleanly over earlier ones
        const zIndex = 10 + index * 5;

        return (
          <section
            key={folio.id}
            id={folio.id}
            style={{ zIndex }}
            className={`book-folio ${
              !isFirst ? "book-page-leaf" : ""
            } overflow-hidden`}
          >
            {/* Running Editorial Header inside each Folio */}
            <div className="site-container pt-4 pb-2">
              <div className="book-running-header">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
                  <span>PREVENTA AI &bull; SOVEREIGN HEALTH DOSSIER</span>
                </span>
                
                <span className="hidden sm:inline font-bold text-[#062235]">
                  FOLIO {folio.num} &mdash; {folio.title.toUpperCase()}
                </span>
                
                <span className="font-mono text-[#0D9488] font-bold">
                  PAGE {folio.pageNum} / 0{folios.length}
                </span>
              </div>
            </div>

            {/* Folio Main Contents */}
            <div className="w-full">
              {folio.content}
            </div>

          </section>
        );
      })}

      {/* Mobile-Friendly Floating Folio Pill (Bottom-Right, Tap to Turn Page) */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button
          type="button"
          onClick={() => {
            const nextIdx = (activeFolioIndex + 1) % folios.length;
            scrollToFolio(folios[nextIdx].id);
          }}
          aria-label="Turn to next folio chapter"
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#062235]/95 backdrop-blur-md text-white border border-[#14B8A6]/40 shadow-xl text-[10.5px] font-mono cursor-pointer active:scale-95 transition-transform"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0D9488]"></span>
          </span>
          <span className="font-bold text-[#14B8A6]">FOLIO {folios[activeFolioIndex]?.num}</span>
          <span className="text-white/40">|</span>
          <span className="text-white/90">PAGE {folios[activeFolioIndex]?.pageNum}/0{folios.length}</span>
          <span className="text-[#14B8A6] font-bold text-xs pl-0.5">&rarr;</span>
        </button>
      </div>

    </div>
  );
}
