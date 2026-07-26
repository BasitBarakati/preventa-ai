"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CommunityIcon, EyeIcon, LeafIcon, LockIcon, ShieldIcon } from "./icons";
import { LogoLockup } from "./Logo";

const LETTERS = [
  ["P", "#1F8A8A"],
  ["H", "#7FB069"],
  ["R", "#E8A87C"],
  ["O", "#C38D6B"],
  ["N", "#1F8A8A"],
  ["E", "#E8A87C"],
  ["S", "#7FB069"],
  ["I", "#C38D6B"],
  ["S", "#1F8A8A"],
] as const;

const PLATFORM = [
  ["Assessment Suite", "#assess"],
  ["Wellness Modules", "#wellness"],
  ["Capacity Building", "#capacity"],
  ["Evaluation Lifecycle", "#evaluate"],
  ["AI Co-Pilot", "#copilot"],
];

const PRINCIPLES = [
  ["World Health Organization", "https://www.who.int"],
  ["Ottawa Charter for Health Promotion", "https://www.who.int/tools/health-promotion"],
  ["Public Health Agency of Canada", "https://www.canada.ca/en/public-health.html"],
  ["OCAP® — First Nations Data Governance", "https://ocap.ca"],
];

const BADGES = [
  { icon: EyeIcon, label: "WCAG 2.2 AA" },
  { icon: LockIcon, label: "PHIPA" },
  { icon: ShieldIcon, label: "HIPAA" },
  { icon: LockIcon, label: "GDPR" },
  { icon: LeafIcon, label: "OCAP®" },
];

/** Newsletter + live waitlist counter (backed by /api/assessments). */
function Subscribe() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [count, setCount] = useState<number | null>(null);

  const refresh = async () => {
    try {
      const r = await fetch("/api/assessments");
      const d = (await r.json()) as { assessments: number | null };
      setCount(d.assessments);
    } catch {
      /* counter is decorative — stay silent */
    }
  };
  // Fetch-on-mount, inlined per React's documented data-fetching-effect
  // pattern (an `ignore` flag guards against a stale response landing
  // after unmount or a newer request superseding it).
  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const r = await fetch("/api/assessments");
        const d = (await r.json()) as { assessments: number | null };
        if (!ignore) setCount(d.assessments);
      } catch {
        /* counter is decorative — stay silent */
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setState("error");
      return;
    }
    setState("busy");
    try {
      const r = await fetch("/api/assessments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "subscribe", email }),
      });
      setState(r.ok ? "done" : "error");
      if (r.ok) {
        setEmail("");
        refresh();
      }
    } catch {
      setState("error");
    }
  };

  return (
    <div>
      <p className="text-[13px] leading-relaxed text-cream/60">
        One letter a month — evidence briefs, module updates, zero noise.
      </p>
      <form onSubmit={submit} className="mt-4 flex gap-2">
        <label htmlFor="nl-email" className="sr-only">
          Email address
        </label>
        <input
          id="nl-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state !== "idle") setState("idle");
          }}
          placeholder="you@healthunit.ca"
          className="w-full rounded-full border border-cream/20 bg-cream/[0.07] px-4 py-2.5 text-[13px] text-cream placeholder:text-cream/35 focus:border-amber focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === "busy"}
          className="sheen shrink-0 rounded-full bg-amber px-5 py-2.5 text-[13px] font-semibold text-ocean transition-colors hover:bg-[#e29a68] disabled:opacity-60"
        >
          <span className="relative z-10">{state === "busy" ? "…" : "Join"}</span>
        </button>
      </form>
      {state === "done" && (
        <p className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-sage">
          ✓ welcome aboard — first brief next month
        </p>
      )}
      {state === "error" && (
        <p className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-amber">
          please enter a valid email
        </p>
      )}
      <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.16em] text-cream/40">
        {count === null ? "teams are requesting assessments" : (
          <>
            <span className="text-amber">{count}</span> free assessment
            {count === 1 ? "" : "s"} requested
          </>
        )}
      </p>
    </div>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-ocean pt-20 pb-10 text-cream">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_40rem_at_85%_-10%,rgba(31,138,138,0.3),transparent_60%),radial-gradient(40rem_30rem_at_0%_110%,rgba(232,168,124,0.12),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="wrap relative">
        {/* acronym ribbon */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 border-b border-cream/10 pb-8" aria-label="PHRONESIS acronym">
          {LETTERS.map(([l, c], i) => (
            <span key={`${l}-${i}`} className="flex items-center gap-2.5">
              <span className="font-display text-[26px] leading-none font-bold" style={{ color: c }}>
                {l}
              </span>
              {i < LETTERS.length - 1 && <span className="h-1 w-1 rounded-full bg-cream/25" aria-hidden="true" />}
            </span>
          ))}
          <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/40">
            · practical wisdom, operationalized
          </span>
        </div>

        <div className="grid gap-12 py-12 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_1fr]">
          {/* brand */}
          <div>
            <LogoLockup size={40} light />
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-cream/60">
              The AI-powered brain trust for public health — bridging evidence-based judgment
              with community action. Human-led, AI-assisted, equity by default.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {BADGES.map((b) => (
                <span
                  key={b.label}
                  className="flex items-center gap-1.5 rounded-full border border-cream/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-cream/65"
                >
                  <b.icon size={12} className="text-sage" />
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* platform */}
          <nav aria-label="Platform">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-amber">Platform</p>
            <ul className="mt-4 space-y-2.5">
              {PLATFORM.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-[13.5px] text-cream/65 transition-colors hover:text-amber"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* principles */}
          <nav aria-label="Alignment">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-amber">Aligned with</p>
            <ul className="mt-4 space-y-2.5">
              {PRINCIPLES.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13.5px] text-cream/65 underline decoration-cream/20 underline-offset-4 transition-colors hover:text-amber hover:decoration-amber/50"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-2 pt-1 text-[13.5px] text-cream/65">
                <CommunityIcon size={14} className="text-sage" />
                Community data stays community-owned
              </li>
            </ul>
          </nav>

          {/* newsletter */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-amber">Stay wise</p>
            <div className="mt-4">
              <Subscribe />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-cream/10 pt-7">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-cream/40">
            © 2026 Phronesis AI · built on a simple belief — wisdom &gt; data
          </p>
          <p className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-cream/40">
            <span className="ai-dot h-1.5 w-1.5 rounded-full bg-sage" aria-hidden="true" />
            all systems human-led
          </p>
        </div>
      </div>
    </footer>
  );
}
